import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Sri Ram Mirchi Bandi
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-200 transition-colors">
              Home
            </Link>
            <Link to="/menu" className="hover:text-yellow-200 transition-colors">
              Menu
            </Link>
            <Link to="/cart" className="hover:text-yellow-200 transition-colors">
              Cart
            </Link>
            <Link to="/login" className="hover:text-yellow-200 transition-colors">
              Login
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <select className="bg-red-700 text-white px-2 py-1 rounded">
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 