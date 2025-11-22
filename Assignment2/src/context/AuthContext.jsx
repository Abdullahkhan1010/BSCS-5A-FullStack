/**
 * AuthContext - User Authentication & Session Management
 * 
 * PURPOSE:
 * We use AuthContext to simulate user session storage since no backend exists.
 * This manages user login state and persists sessions using localStorage.
 * 
 * WHY THIS IS NEEDED:
 * - Many components need to know if a user is logged in (Navbar, protected pages, etc.)
 * - Login state needs to persist across page refreshes
 * - Context prevents passing user data through every component
 * 
 * IN A REAL APP:
 * - We would have a backend API for authentication
 * - We would use JWT tokens or session cookies
 * - Passwords would be encrypted
 * - This is a simplified version for learning purposes
 * 
 * KEY CONCEPTS FOR VIVA:
 * 1. useState: Stores current user information
 * 2. useEffect: Loads saved session on app start
 * 3. localStorage: Persists login session across browser sessions
 * 4. Context API: Makes auth state globally accessible
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the Context
// This is the "container" that will store authentication data
const AuthContext = createContext();

/**
 * AuthProvider Component
 * 
 * Wraps the application to provide authentication functionality.
 * Any component inside AuthProvider can access user state and auth functions.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components needing auth access
 */
export function AuthProvider({ children }) {
  /**
   * User State
   * 
   * Stores current user information:
   * - null: No user logged in
   * - object: User is logged in, contains user data
   * 
   * Initial value loads from localStorage to restore previous session
   */
  const [user, setUser] = useState(() => {
    // Try to load saved user session from localStorage
    const savedUser = localStorage.getItem('booknest-user');
    
    // localStorage stores strings, so we parse JSON back to object
    // If no saved user exists, return null (not logged in)
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /**
   * Loading State
   * 
   * Tracks if we're in the process of checking authentication.
   * Useful for showing loading spinners or preventing premature redirects.
   * Set to false initially since we load from localStorage synchronously.
   * 
   * Note: Currently not used but available for future async authentication
   */
  const [loading] = useState(false);

  /**
   * useEffect: Persist User Session
   * 
   * Whenever the user state changes, save it to localStorage.
   * This ensures the session persists across:
   * - Page refreshes
   * - Closing and reopening the browser
   * - Navigating between pages
   * 
   * Runs every time 'user' value changes
   */
  useEffect(() => {
    if (user) {
      // User is logged in: Save to localStorage
      // JSON.stringify converts the user object to a string for storage
      localStorage.setItem('booknest-user', JSON.stringify(user));
    } else {
      // User is logged out: Remove from localStorage
      localStorage.removeItem('booknest-user');
    }
  }, [user]); // Dependency: runs when 'user' changes

  /**
   * login Function
   * 
   * Simulates user login by storing username and timestamp.
   * In a real app, this would:
   * 1. Send credentials to backend API
   * 2. Receive authentication token
   * 3. Store token securely
   * 4. Fetch user profile data
   * 
   * @param {string} username - The username entered by user
   * @returns {boolean} true if login successful, false otherwise
   * 
   * For Viva: Explain this is simplified - real auth needs password validation,
   * encryption, and backend verification.
   */
  const login = (username) => {
    // Validation: Username must not be empty
    if (!username || username.trim() === '') {
      return false;
    }

    // Create user object with basic information
    const userData = {
      username: username.trim(),        // Remove extra spaces
      loginTime: new Date().toISOString(), // ISO timestamp of login
      id: Date.now(),                    // Simple unique ID (timestamp)
    };

    // Update user state - triggers useEffect to save to localStorage
    setUser(userData);
    
    return true; // Login successful
  };

  /**
   * logout Function
   * 
   * Clears user session and removes data from localStorage.
   * Also clears any user-specific data (cart will be handled by BookContext).
   * 
   * In a real app, this would:
   * 1. Invalidate server session/token
   * 2. Clear all sensitive data
   * 3. Redirect to login page
   */
  const logout = () => {
    // Set user to null (logged out state)
    // This triggers useEffect which removes from localStorage
    setUser(null);
    
    // Optional: Could also clear cart here if needed
    // localStorage.removeItem('booknest-cart');
  };

  /**
   * isAuthenticated Function
   * 
   * Helper function to check if user is currently logged in.
   * Returns boolean for easy conditional rendering.
   * 
   * Usage: if (isAuthenticated()) { show profile } else { show login }
   * 
   * @returns {boolean} true if user is logged in, false otherwise
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  /**
   * Context Value Object
   * 
   * All these values become accessible to any component using useAuth().
   * Components can pick what they need: const { user, login, logout } = useAuth();
   */
  const value = {
    user,              // Current user object or null
    loading,           // Boolean: is authentication being checked?
    login,             // Function: log user in
    logout,            // Function: log user out
    isAuthenticated,   // Function: check if logged in
  };

  // Provider: Makes auth data available to all child components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Custom Hook
 * 
 * Convenience hook for accessing auth context.
 * Makes code cleaner and provides error handling.
 * 
 * Usage in components:
 * const { user, login, logout, isAuthenticated } = useAuth();
 * 
 * @returns {Object} Auth context value with user state and auth functions
 * @throws {Error} If used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  // Error handling: Ensures AuthProvider wraps the component
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What does AuthContext do?
 * A: It manages user authentication state globally. Any component can check if
 *    a user is logged in and access user information without prop drilling.
 * 
 * Q: Why use localStorage for authentication?
 * A: Since we don't have a backend, localStorage simulates session persistence.
 *    In a real app, we'd use JWT tokens or session cookies validated by a server.
 * 
 * Q: Is this authentication secure?
 * A: No, this is for learning purposes only. Real authentication requires:
 *    - Backend API validation
 *    - Encrypted passwords
 *    - Secure tokens (JWT)
 *    - HTTPS protocol
 *    - Protection against XSS and CSRF attacks
 * 
 * Q: What happens when user refreshes the page?
 * A: The useState initializer checks localStorage and restores the session,
 *    so the user stays logged in across page refreshes.
 * 
 * Q: Why use Context instead of just localStorage?
 * A: Context provides:
 *    - Reactive updates (components re-render when login state changes)
 *    - Clean API (login/logout functions)
 *    - Single source of truth
 *    - Easy access from any component
 * 
 * Q: What is JSON.stringify and JSON.parse?
 * A: localStorage only stores strings. JSON.stringify converts objects to strings
 *    for storage. JSON.parse converts strings back to objects when reading.
 */
