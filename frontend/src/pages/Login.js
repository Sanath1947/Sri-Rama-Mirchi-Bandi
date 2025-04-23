import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showOtpInput) {
      // In a real app, this would send OTP to email/phone
      setShowOtpInput(true);
    } else {
      // Verify OTP and login
      console.log('Verifying OTP...');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-red-600 text-center mb-8">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!showOtpInput ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="Enter your phone number"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Enter OTP"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
        >
          {showOtpInput ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-red-600 hover:text-red-700"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Login; 