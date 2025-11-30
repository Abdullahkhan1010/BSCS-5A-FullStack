/**
 * Main Entry Point - main.jsx
 * 
 * This is the first JavaScript file that runs when the application starts.
 * It connects our React application to the HTML DOM and wraps it with Context Providers.
 * 
 * How React Works:
 * 1. The browser loads index.html
 * 2. index.html has a <div id="root"></div>
 * 3. This file finds that div and renders our React App inside it
 * 4. From then on, React controls everything inside that div
 * 
 * CONTEXT PROVIDERS:
 * We wrap the App with multiple Context Providers to make global state
 * available throughout the application. The order matters!
 * 
 * Provider Nesting Order (Outside → Inside):
 * ThemeProvider → AuthProvider → BookProvider → App
 * 
 * Why this order?
 * - ThemeProvider: Outermost because theme affects everything (even auth/book UI)
 * - AuthProvider: Second because authentication state is core to the app
 * - BookProvider: Third because book data depends on theme/auth being ready
 * - App: Innermost - has access to all three contexts
 * 
 * Key Concepts:
 * - StrictMode: Development tool that helps find potential problems
 * - createRoot: Modern React 19 method to render the app
 * - Context Providers: Make global state accessible to all components
 */

// Import StrictMode for development checks and warnings
import { StrictMode } from 'react';

// Import createRoot - the React 19 method to render our app
import { createRoot } from 'react-dom/client';

// Import the main App component (the root of our component tree)
import App from './App.jsx';

// Import Context Providers for global state management
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { BookProvider } from './context/BookContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

/**
 * AppWrapper Component
 * 
 * This inner component has access to AuthContext, so it can use the current user
 * as a key for BookProvider. When user changes, BookProvider remounts with fresh data.
 */
function AppWrapper() {
  const { user } = useAuth();
  
  return (
    // BookProvider key ensures it remounts when user changes, loading user-specific data
    <BookProvider key={user?.username || 'guest'}>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </BookProvider>
  );
}

/**
 * Render the Application with Context Providers
 * 
 * Steps:
 * 1. Find the HTML element with id="root" in index.html
 * 2. Create a React root at that element
 * 3. Render our App wrapped in StrictMode and Context Providers
 * 
 * Provider Hierarchy Explanation:
 * 
 * <ThemeProvider>                    // Provides: theme, toggleTheme
 *   <AuthProvider>                   // Provides: user, login, logout, isAuthenticated
 *     <BookProvider key={username}>  // Provides: books, cart, addToCart, searchBooks, etc.
 *       <App />                      // All components inside App can access all contexts
 *     </BookProvider>
 *   </AuthProvider>
 * </ThemeProvider>
 * 
 * Why StrictMode?
 * - Identifies components with unsafe lifecycles
 * - Warns about deprecated features  
 * - Helps detect side effects
 * - Only runs in development, not in production build
 * 
 * Why key prop on BookProvider?
 * - Forces BookProvider to remount when user changes
 * - Ensures cart and history load user-specific data from localStorage
 * - Prevents data bleeding between different user sessions
 * 
 * For Viva:
 * - Explain that providers give children access to global state
 * - Any component in App can use useTheme(), useAuth(), or useBooks()
 * - This prevents prop drilling (passing props through many components)
 * - Providers use Context API, which is React's built-in state management
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Theme Provider: Makes light/dark theme available everywhere */}
    <ThemeProvider>
      {/* Toast Provider: Makes toast notifications available everywhere */}
      <ToastProvider>
        {/* Auth Provider: Makes user login state available everywhere */}
        <AuthProvider>
          {/* AppWrapper accesses user and applies it as key to BookProvider */}
          <AppWrapper />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
