const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const { Order, OrderItem, MenuItem, User } = require('../models');

const sns = new AWS.SNS();

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.userId);
    if (!req.user) {
      return res.status(404).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, deliveryAddress, phoneNumber } = req.body;

    // Calculate total amount
    const menuItems = await MenuItem.findAll({
      where: { id: items.map(item => item.menuItemId) },
    });

    const totalAmount = items.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      return total + (menuItem.price * item.quantity);
    }, 0);

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      deliveryAddress,
      phoneNumber,
      status: 'pending',
    });

    // Create order items
    await Promise.all(
      items.map(item =>
        OrderItem.create({
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: menuItems.find(mi => mi.id === item.menuItemId).price,
          specialInstructions: item.specialInstructions,
        })
      )
    );

    // Send order confirmation via SNS
    await sns.publish({
      Message: `New order #${order.id} received from ${req.user.name}`,
      TopicArn: process.env.SNS_TOPIC_ARN,
    }).promise();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user's orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [MenuItem],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [MenuItem],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status (admin only)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status });

    // Send status update notification via SNS
    await sns.publish({
      Message: `Order #${order.id} status updated to ${status}`,
      TopicArn: process.env.SNS_TOPIC_ARN,
    }).promise();

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router; 