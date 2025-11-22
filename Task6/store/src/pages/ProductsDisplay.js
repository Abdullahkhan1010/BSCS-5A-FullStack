import React from 'react';
import ProductCard from '../components/ProductCard';

// ProductsDisplay page - receives an array of products as props
function ProductsDisplay({ products }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-3">
            Our Products
          </h2>
          <p className="text-gray-600 text-lg">Browse our collection of premium items</p>
        </div>
        
        {/* Products Grid - loops through products array */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            // For each product, create a ProductCard and pass data using props
            <ProductCard
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsDisplay;
