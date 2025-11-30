import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Modern Navigation component using React Router NavLink
function Navigation() {
  const totalItems = useSelector(state => state.cart.totalItems);
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
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
