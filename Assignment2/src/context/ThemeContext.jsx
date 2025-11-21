/**
 * ThemeContext - Dark/Light Theme Management
 * 
 * PURPOSE:
 * This context manages the application's theme (light or dark mode).
 * It allows any component to access and change the theme without prop drilling.
 * 
 * WHY CONTEXT?
 * - Theme needs to be accessible throughout the entire app (Navbar, pages, components)
 * - Without Context, we'd have to pass theme props through every component
 * - Context makes the theme globally available
 * 
 * KEY CONCEPTS FOR VIVA:
 * 1. useState: Stores current theme state
 * 2. useEffect: Applies theme changes and saves to localStorage
 * 3. localStorage: Persists theme preference across browser sessions
 * 4. Context API: Makes theme accessible to all components
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the Context
// This creates a "container" that will hold our theme data
const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * 
 * This component wraps our app and provides theme functionality to all children.
 * Any component inside ThemeProvider can access theme state and toggle function.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that need access to theme
 */
export function ThemeProvider({ children }) {
  // useState Hook: Manages the current theme state
  // Initial value comes from localStorage or defaults to 'light'
  // localStorage.getItem returns null if key doesn't exist, so we use || 'light'
  const [theme, setTheme] = useState(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('booknest-theme');
    return savedTheme || 'light'; // Default to 'light' if no saved preference
  });

  /**
   * useEffect Hook: Runs side effects when theme changes
   * 
   * Side effects are operations that interact with things outside React:
   * - Updating the DOM (document.documentElement)
   * - Saving to localStorage
   * - API calls, etc.
   * 
   * Dependency Array [theme]: This effect runs when 'theme' changes
   */
  useEffect(() => {
    // Get the root HTML element (<html>)
    const root = document.documentElement;
    
    // Remove any existing theme class ('light' or 'dark')
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    // This allows Tailwind CSS to apply dark mode styles
    // Example: dark:bg-gray-900 will only apply when 'dark' class exists
    root.classList.add(theme);
    
    // PERSISTENCE: Save theme to localStorage
    // Why localStorage?
    // - Data persists even after closing browser
    // - No backend needed for this simple preference
    // - Automatically loads user's preference on next visit
    localStorage.setItem('booknest-theme', theme);
    
  }, [theme]); // Only re-run when 'theme' value changes

  /**
   * toggleTheme Function
   * 
   * Switches between 'light' and 'dark' theme.
   * Uses a ternary operator: condition ? valueIfTrue : valueIfFalse
   * 
   * Called when user clicks theme toggle button (usually in Navbar)
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      // prevTheme is the current theme value
      // If current theme is 'light', switch to 'dark'
      // If current theme is 'dark', switch to 'light'
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

  /**
   * Context Value Object
   * 
   * Everything in this object becomes accessible to consuming components.
   * Components can destructure these values: const { theme, toggleTheme } = useTheme();
   */
  const value = {
    theme,        // Current theme: 'light' or 'dark'
    toggleTheme,  // Function to switch themes
  };

  // Provider Component: Makes the value available to all children
  // Any component wrapped by ThemeProvider can access these values
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Custom Hook
 * 
 * This is a helper function that makes consuming the context easier.
 * Instead of importing useContext and ThemeContext separately,
 * components can just import and use this hook.
 * 
 * Usage in any component:
 * const { theme, toggleTheme } = useTheme();
 * 
 * @returns {Object} Theme context value containing theme and toggleTheme
 * @throws {Error} If used outside ThemeProvider
 */
export function useTheme() {
  // useContext Hook: Accesses the nearest ThemeContext value
  const context = useContext(ThemeContext);
  
  // Error handling: Ensures ThemeProvider exists
  // If someone tries to use useTheme() without wrapping their component in ThemeProvider,
  // this will throw a helpful error message
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What does ThemeContext do?
 * A: It manages light/dark theme globally so all components can access and change it.
 * 
 * Q: Why use Context instead of props?
 * A: Theme is needed in many components (Navbar, pages, etc.). Context prevents
 *    passing theme props through every single component (prop drilling).
 * 
 * Q: How does localStorage work here?
 * A: When theme changes, we save it to localStorage. When app loads, we read from
 *    localStorage to restore user's preference. Data persists across browser sessions.
 * 
 * Q: What is the 'dark' class for?
 * A: Tailwind CSS uses the 'dark' class on the root element to apply dark mode styles.
 *    Example: dark:bg-gray-900 only applies when <html class="dark"> exists.
 * 
 * Q: What does useEffect do here?
 * A: It runs whenever theme changes, updating the DOM class and localStorage.
 *    The dependency array [theme] means it only runs when theme value changes.
 */
