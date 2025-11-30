import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white p-2.5 rounded-xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <span className="text-white text-2xl font-bold tracking-tight block">Hotel Management</span>
                <span className="text-indigo-100 text-xs">Professional System</span>
              </div>
            </Link>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to="/"
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/')
                  ? 'bg-white text-indigo-700 shadow-xl scale-105'
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/dishes"
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/dishes')
                  ? 'bg-white text-indigo-700 shadow-xl scale-105'
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              Dishes
            </Link>
            <Link
              to="/cooks"
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/cooks')
                  ? 'bg-white text-indigo-700 shadow-xl scale-105'
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              Cooks
            </Link>
            <Link
              to="/customers"
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/customers')
                  ? 'bg-white text-indigo-700 shadow-xl scale-105'
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              Customers
            </Link>
            <Link
              to="/orders"
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/orders')
                  ? 'bg-white text-indigo-700 shadow-xl scale-105'
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
