import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProductsDisplay from './pages/ProductsDisplay';
import ProductAdd from './pages/ProductAdd';
import Cart from './pages/Cart';

// App component using React Hooks (useState and useEffect)
function App() {
  // products - stores the list of all products
  const [products, setProducts] = useState([
    {
      name: "Wireless Headphones",
      description: "Premium sound quality",
      price: "99.99"
    },
    {
      name: "Smart Watch",
      description: "Track your fitness goals",
      price: "199.99"
    },
    {
      name: "Laptop Stand",
      description: "Ergonomic design",
      price: "49.99"
    },
    {
      name: "USB-C Hub",
      description: "Multiple ports",
      price: "39.99"
    },
    {
      name: "Wireless Mouse",
      description: "Comfortable grip",
      price: "29.99"
    },
    {
      name: "Mechanical Keyboard",
      description: "RGB backlight",
      price: "89.99"
    }
  ]);

  // useEffect Hook: Runs side effects after component renders
  // This runs once when component mounts (empty dependency array [])
  useEffect(() => {
    console.log('App component mounted! Total products:', products.length);
    
    // Example: Load products from localStorage if available
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      console.log('Loaded products from localStorage');
    }
  }, []); // Empty array means this runs only once on mount

  // useEffect Hook: Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
      console.log('Products saved to localStorage');
    }
  }, [products]); // Runs whenever products array changes

  // Function to add a new product
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]); // Add new product to the list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navigation />

      {/* React Router Routes */}
      <Routes>
        <Route path="/" element={<ProductsDisplay products={products} />} />
        <Route path="/add" element={<ProductAdd onAddProduct={addProduct} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
