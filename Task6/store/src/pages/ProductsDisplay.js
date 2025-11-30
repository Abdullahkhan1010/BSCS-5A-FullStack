import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setPriceFilter, clearFilters } from '../redux/actions/filterActions';
import ProductCard from '../components/ProductCard';

// ProductsDisplay page - receives an array of products as props
function ProductsDisplay({ products }) {
  const dispatch = useDispatch();
  const { searchQuery, maxPrice } = useSelector(state => state.filter);

  // Filter products based on search query and price
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = maxPrice === null || parseFloat(product.price) <= maxPrice;
    
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-3">
            Our Products
          </h2>
          <p className="text-gray-600 text-lg">Browse our collection of premium items</p>
        </div>

        {/* Filter Section using Redux */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🔍 Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                💰 Max Price: ${maxPrice || 'All'}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={maxPrice || 200}
                onChange={(e) => dispatch(setPriceFilter(e.target.value === '200' ? null : parseFloat(e.target.value)))}
                className="w-full"
              />
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={() => dispatch(clearFilters())}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsDisplay;
