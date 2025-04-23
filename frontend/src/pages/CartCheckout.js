import React, { useState } from 'react';

const CartCheckout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Sample cart items (in a real app, this would come from state management)
  const cartItems = [
    {
      id: 1,
      name: 'Mirchi',
      price: 20,
      quantity: 2,
    },
    {
      id: 3,
      name: 'Muddha Garelu',
      price: 20,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    // In a real app, this would integrate with Razorpay
    console.log('Processing payment...');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-red-600">Your Order</h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </div>
        ))}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              rows={3}
              placeholder="Enter your delivery address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
      >
        Proceed to Payment (₹{total})
      </button>
    </div>
  );
};

export default CartCheckout; 