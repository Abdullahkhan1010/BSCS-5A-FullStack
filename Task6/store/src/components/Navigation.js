import React from 'react';
import { NavLink } from 'react-router-dom';

// Modern Navigation component using React Router NavLink
function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🛍️</span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              E-Store
            </h1>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              📦 Products
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              ➕ Add Product
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
