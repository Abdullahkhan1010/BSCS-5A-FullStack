/**
 * Navbar Component - Navigation Bar
 * 
 * PURPOSE:
 * The main navigation component that appears at the top of every page.
 * Provides navigation links, cart indicator, theme toggle, and auth actions.
 * 
 * FEATURES:
 * 1. Responsive design (hamburger menu on mobile)
 * 2. Shopping cart count from BookContext
 * 3. Theme toggle button (light/dark mode)
 * 4. Login/Logout based on authentication state
 * 5. Active route highlighting
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile (<768px): Hamburger menu, collapsible navigation
 * - Tablet/Desktop (≥768px): Full horizontal navigation
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useState: Manages mobile menu open/close state
 * - useContext: Accesses theme, auth, and cart data
 * - NavLink: Special Link that knows if route is active
 * - Conditional rendering: Different UI based on state
 */

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// Import Lucide icons for UI elements
import { Menu, X, ShoppingCart, Sun, Moon, User, LogOut, BookOpen, Heart, History } from 'lucide-react';

// Import custom hooks to access context data
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BookContext';
import { useWishlist } from '../context/WishlistContext';

/**
 * Navbar Component
 * 
 * Renders the top navigation bar with responsive design.
 * Integrates with all three contexts for full functionality.
 */
function Navbar() {
  /**
   * Mobile Menu State
   * 
   * Controls whether mobile menu is open or closed.
   * - true: Menu is visible (hamburger clicked)
   * - false: Menu is hidden
   * 
   * Only used on mobile screens (<768px)
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Context Data
   * 
   * Access global state from Context API:
   * - theme, toggleTheme: For dark mode toggle
   * - user, logout, isAuthenticated: For auth display
   * - cart: For cart item count
   * - wishlist: For wishlist item count
   */
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useBooks();
  const { getWishlistCount } = useWishlist();

  /**
   * toggleMobileMenu Function
   * 
   * Opens/closes the mobile navigation menu.
   * Called when hamburger icon is clicked.
   * 
   * Uses functional update: prevState => !prevState
   * This ensures we always toggle based on current state.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * closeMobileMenu Function
   * 
   * Closes mobile menu after navigation link is clicked.
   * Improves UX: menu auto-closes after selecting a page.
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * handleLogout Function
   * 
   * Logs out the user and closes mobile menu.
   * Calls logout() from AuthContext which clears session.
   */
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  /**
   * Navigation Links Array
   * 
   * Defines all navigation menu items.
   * Centralized data makes it easy to add/remove links.
   * 
   * Each link has:
   * - to: Route path
   * - label: Display text
   */
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/reservations', label: 'My Books' },
    { to: '/history', label: 'History' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    /**
     * Modern Navbar Container
     * Black & White theme with clean design
     */
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Row */}
        <div className="flex justify-between items-center h-16">
          
          {/* ===== LEFT SECTION: Modern Logo ===== */}
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 text-xl font-semibold text-black tracking-tight"
          >
            <div className="bg-black p-1.5 rounded-lg">
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="hidden sm:inline">BookNest</span>
          </Link>

          {/* ===== CENTER SECTION: Modern Desktop Navigation ===== */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* ===== RIGHT SECTION: Modern Actions ===== */}
          <div className="flex items-center space-x-3">
            
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="View wishlist"
            >
              <Heart size={20} />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/reservations"
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="View cart"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* History Button */}
            <Link
              to="/history"
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="View borrowing history"
            >
              <History size={20} />
            </Link>

            {/* Theme Toggle - Keep but make subtle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all hidden md:block"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Authentication Actions (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated() ? (
                <>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-lg">
                    <User size={16} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1.5 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ===== MODERN MOBILE MENU ===== */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-1 mt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Authentication */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isAuthenticated() ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <User size={18} className="text-gray-600" />
                    <span className="font-medium text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: How does responsive design work in this Navbar?
 * A: We use Tailwind's responsive prefixes:
 *    - No prefix = mobile (default)
 *    - md: = tablet/desktop (≥768px)
 *    Example: "hidden md:flex" means hidden on mobile, flex on desktop
 * 
 * Q: What is NavLink vs Link?
 * A: Link is for basic navigation. NavLink adds 'active' awareness.
 *    NavLink's className can be a function that receives { isActive }
 *    to style the current route differently.
 * 
 * Q: How does cart count work?
 * A: We access cart from BookContext using useBooks().
 *    cart.length gives us the number of items.
 *    We display it in a badge: {cart.length > 0 && <Badge>{cart.length}</Badge>}
 * 
 * Q: How does theme toggle work?
 * A: We call toggleTheme() from ThemeContext.
 *    ThemeContext updates theme state and applies 'dark' class to <html>.
 *    Tailwind's dark: prefix then activates dark mode styles.
 * 
 * Q: How does authentication display work?
 * A: We use isAuthenticated() from AuthContext to check login state.
 *    Conditional rendering: {isAuthenticated() ? <Logout /> : <Login />}
 *    Shows different UI based on authentication status.
 * 
 * Q: What is the hamburger menu?
 * A: Mobile navigation pattern: Menu icon that toggles navigation links.
 *    Clicking toggles isMobileMenuOpen state (useState).
 *    When true, mobile menu slides in. When false, it's hidden.
 * 
 * Q: Why close menu after clicking link?
 * A: UX improvement. After user selects a page, menu auto-closes.
 *    We call closeMobileMenu() in NavLink's onClick.
 *    Prevents menu from staying open after navigation.
 */
