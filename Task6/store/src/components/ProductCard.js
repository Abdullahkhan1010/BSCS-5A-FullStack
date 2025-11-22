import React from 'react';

// Modern, clean ProductCard component that receives name, description, and price as props
function ProductCard({ name, description, price }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      {/* Product Icon */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-md">
        📦
      </div>
      
      {/* Product Name - received from props */}
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{name}</h3>
      
      {/* Product Description - received from props */}
      <p className="text-gray-600 text-sm mb-5 text-center h-10">{description}</p>
      
      {/* Product Price - received from props */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl font-bold text-blue-600">${price}</span>
        <span className="text-sm text-gray-500">USD</span>
      </div>
      
      {/* Add to Cart Button */}
      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl w-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
