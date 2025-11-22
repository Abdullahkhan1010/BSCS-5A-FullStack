import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ProductAdd page using React Hooks and React Router
function ProductAdd({ onAddProduct }) {
  const navigate = useNavigate();
  
  // useState Hook: Create separate state for each form field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Check if all fields are filled
    if (name && description && price) {
      // Create new product object
      const newProduct = {
        name: name,
        description: description,
        price: price
      };
      
      // Call the function passed from parent (App.js)
      onAddProduct(newProduct);
      
      // Clear the form by resetting all state variables
      setName('');
      setDescription('');
      setPrice('');
      
      // Navigate back to products page using React Router
      navigate('/');
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-3">
            Add New Product
          </h2>
          <p className="text-gray-600 text-lg">Fill in the details below to add a product</p>
        </div>
        
        {/* Form Container */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg"
              />
            </div>

            {/* Product Description Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                Product Description
              </label>
              <textarea
                placeholder="Describe your product"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg resize-none"
              />
            </div>

            {/* Product Price Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-5 top-4 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 pr-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-lg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg mt-8"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
