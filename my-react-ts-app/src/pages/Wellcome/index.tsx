// src/WelcomePage.js
import React from 'react';
import {Link} from 'react-router-dom'

function WelcomePage() {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="max-w-xl bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 font-Pacifico">Welcome to Our Website</h1>
        <p className="mb-4 font-Pacifico">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel turpis nec leo auctor dictum vel ac ligula.</p>
        <div className="flex space-x-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 font-Pacifico">Login</Link>
          <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 font-Pacifico">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
