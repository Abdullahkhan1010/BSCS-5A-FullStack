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
     * Navbar Container
     * 
     * Tailwind Classes Explained:
     * - bg-white: White background in light mode
     * - dark:bg-gray-800: Dark background in dark mode
     * - shadow-md: Medium shadow for depth
     * - sticky top-0: Sticks to top when scrolling
     * - z-50: High z-index to stay above other content
     */
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* 
          Main Navbar Row
          - flex: Flexbox layout
          - justify-between: Space between logo and actions
          - items-center: Vertical centering
          - h-16: Fixed height
        */}
        <div className="flex justify-between items-center h-16">
          
          {/* ===== LEFT SECTION: Logo ===== */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            {/* BookOpen icon from Lucide */}
            <BookOpen size={28} />
            <span>BookNest</span>
          </Link>

          {/* ===== CENTER SECTION: Desktop Navigation Links ===== */}
          {/* 
            Hidden on mobile (hidden), visible on tablet+ (md:flex)
            This is our desktop navigation menu
          */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              /**
               * NavLink Component
               * 
               * Special Link component from React Router.
               * Automatically adds 'active' class to current route.
               * 
               * className function receives { isActive } prop
               * We use it to style the active/current route differently.
               */
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold' // Active route styling
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' // Inactive route styling
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* ===== RIGHT SECTION: Actions (Wishlist, Cart, History, Theme, Auth) ===== */}
          <div className="flex items-center space-x-4">
            
            {/* 
              Wishlist Button
              - Shows heart icon
              - Displays count badge if wishlist has items
              - Links to /wishlist page
            */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="View wishlist"
            >
              <Heart size={24} />
              {/* Wishlist Count Badge */}
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* 
              Cart/Reservations Button
              - Shows shopping cart icon
              - Displays count badge if cart has items
              - Links to /reservations page
            */}
            <Link
              to="/reservations"
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="View cart"
            >
              <ShoppingCart size={24} />
              {/* 
                Cart Count Badge
                Conditional rendering: Only show if cart has items
                cart.length > 0 evaluates to true/false
              */}
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* 
              History Button
              - Shows history icon
              - Links to /history page
            */}
            <Link
              to="/history"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="View borrowing history"
            >
              <History size={24} />
            </Link>

            {/* 
              Theme Toggle Button
              - Switches between light and dark mode
              - Shows Sun icon in dark mode, Moon icon in light mode
              - Calls toggleTheme() from ThemeContext
            */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {/* 
                Conditional Icon Rendering
                theme === 'dark': Show Sun (switch to light)
                theme === 'light': Show Moon (switch to dark)
              */}
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* 
              Authentication Actions (Desktop)
              Hidden on mobile, visible on tablet+
              
              Conditional rendering based on isAuthenticated():
              - If logged in: Show username and logout button
              - If not logged in: Show login button
            */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated() ? (
                // User is logged in
                <>
                  {/* Display username with user icon */}
                  <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-300">
                    <User size={20} />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  {/* Logout button */}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                // User is not logged in
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* 
              Mobile Menu Toggle Button (Hamburger)
              - Only visible on mobile (md:hidden)
              - Shows Menu icon when closed, X icon when open
              - Toggles isMobileMenuOpen state
            */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 dark:text-gray-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 
          ===== MOBILE MENU =====
          Collapsible navigation menu for mobile devices
          
          Conditional rendering: Only show if isMobileMenuOpen is true
          - Slides in from top when opened
          - Hidden on desktop (md:hidden)
        */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2 mt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu} // Close menu after clicking link
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Authentication Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated() ? (
                // User is logged in (mobile view)
                <div className="space-y-2">
                  {/* Username display */}
                  <div className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300">
                    <User size={20} />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                // User is not logged in (mobile view)
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
