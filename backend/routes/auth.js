const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const { User } = require('../models');

const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email, phone } = req.body;
    const otp = generateOTP();

    // Store OTP in user's session or temporary storage
    // In a real app, use Redis or similar for OTP storage
    req.session.otp = otp;
    req.session.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Send OTP via SMS
    await twilioClient.messages.create({
      body: `Your Sri Ram Mirchi Bandi OTP is: ${otp}`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP and create/update user
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, phone, otp, name } = req.body;

    // Verify OTP
    if (req.session.otp !== otp || Date.now() > req.session.otpExpiry) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        email,
        phone,
        name,
        password: otp, // In a real app, generate a proper password
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

module.exports = router; 