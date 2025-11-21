/**
 * 404 Not Found Page Component - Error Page
 * 
 * PURPOSE:
 * Displays when user navigates to a non-existent route.
 * Provides friendly error message and navigation back to safety.
 * 
 * FEATURES:
 * 1. Clear 404 error code display
 * 2. Friendly error message
 * 3. "Back Home" button for easy recovery
 * 4. Optional: Suggestions for what user might be looking for
 * 
 * KEY CONCEPTS FOR VIVA:
 * - Catch-all route: Uses path="*" in App.jsx to match any undefined route
 * - useNavigate: Programmatic navigation
 * - User experience: Helping users recover from errors
 * - React Router: How routing handles missing pages
 */

import { useNavigate } from 'react-router-dom';
import { Home, Search, BookOpen, AlertCircle } from 'lucide-react';

function NotFound() {
  /**
   * Navigation Hook
   * 
   * useNavigate() returns function for programmatic navigation.
   * Used for "Back Home" button.
   * 
   * Alternative: Could use <Link to="/" /> component
   * But button with onClick is more flexible for future enhancements.
   */
  const navigate = useNavigate();

  /**
   * Handle Navigation to Home
   * 
   * Simple function to redirect user to home page.
   * Provides clear path to recovery.
   */
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    /**
     * Full Height Container
     * 
     * min-h-[70vh]: Minimum 70% of viewport height
     * Ensures error message is centered on page
     * Even if no other content exists
     */
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      
      <div className="max-w-2xl w-full text-center">
        
        {/* 
          Error Icon
          - Large alert icon for visual attention
          - Colored for emphasis
        */}
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="text-red-600 dark:text-red-400" size={80} />
          </div>
        </div>

        {/* 
          404 Error Code
          - Very large text for immediate recognition
          - Gray color (not too alarming)
        */}
        <h1 className="text-8xl md:text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">
          404
        </h1>

        {/* 
          Error Message
          - Clear, friendly language
          - Explains what happened
        */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back on track.
        </p>

        {/* 
          Action Buttons
          - Primary: Go Home (most common action)
          - Secondary: Browse Books (alternative action)
          
          Responsive: Stacked on mobile, side by side on desktop
        */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          
          {/* 
            Back Home Button
            - Primary action (blue)
            - Most prominent
          */}
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>

          {/* 
            Browse Books Button
            - Secondary action
            - Alternative recovery path
          */}
          <button
            onClick={() => navigate('/browse')}
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <BookOpen size={20} />
            <span>Browse Books</span>
          </button>
        </div>

        {/* 
          Helpful Suggestions
          - Quick links to common pages
          - Helps user find what they might have been looking for
        */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300 mb-4">
            <Search size={20} />
            <h3 className="text-lg font-semibold">
              Looking for something? Try these:
            </h3>
          </div>
          
          {/* 
            Quick Links Grid
            - Common pages users might want
            - Clickable links for easy navigation
          */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/browse')}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Browse Books
            </button>
            <button
              onClick={() => navigate('/reservations')}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              My Reservations
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* 
          Additional Help Text
          - Provides contact information if user is still lost
        */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Still can't find what you're looking for?{' '}
          <button
            onClick={() => navigate('/contact')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Contact us
          </button>
          {' '}for assistance.
        </p>
      </div>
    </div>
  );
}

export default NotFound;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is a 404 page and when is it shown?
 * A: 404 = HTTP status code for "Not Found"
 *    Shown when user tries to access a URL that doesn't exist.
 *    Examples:
 *    - /book/999 (book doesn't exist)
 *    - /invalid-page (route not defined)
 *    - Typo in URL
 *    Catch-all route (path="*") in App.jsx handles all undefined routes.
 * 
 * Q: How does React Router handle 404 pages?
 * A: In App.jsx routing configuration:
 *    <Route path="*" element={<NotFound />} />
 *    - path="*" is catch-all pattern
 *    - Matches ANY route not matched by other routes
 *    - Must be LAST route (checked only if others don't match)
 *    This is how SPAs handle missing pages (no server 404).
 * 
 * Q: Why provide multiple navigation options?
 * A: Better user experience - gives user choices:
 *    1. Back Home - Most common action (safe default)
 *    2. Browse Books - User might want to find books
 *    3. Quick links - Direct access to main pages
 *    4. Contact - If user is truly lost
 *    Helps user recover from error quickly.
 * 
 * Q: What is the purpose of the helpful suggestions section?
 * A: Anticipates what user might have been looking for:
 *    - Shows common pages (Home, Browse, Reservations, Contact)
 *    - One-click navigation to these pages
 *    - Reduces frustration from dead end
 *    - Keeps user engaged with site
 * 
 * Q: Why use useNavigate instead of Link?
 * A: Both work, but buttons with navigate() are more flexible:
 *    - Can add logic before navigation
 *    - Consistent button styling
 *    - Better for action buttons (Link better for text links)
 *    - Can conditionally navigate
 *    For simple text links, Link is fine.
 * 
 * Q: What makes this a good 404 page?
 * A: User-friendly error handling:
 *    1. Clear error message (not technical jargon)
 *    2. Explains what happened
 *    3. Multiple recovery options (not dead end)
 *    4. Visually appealing (not scary)
 *    5. Helpful suggestions
 *    6. Contact option if still lost
 *    Turns error into positive experience.
 * 
 * Q: Why center the content vertically?
 * A: min-h-[70vh] flex items-center justify-center
 *    - Makes error message focal point
 *    - Looks better than top-aligned
 *    - Professional appearance
 *    - Draws eye to important information
 * 
 * Q: What is the AlertCircle icon for?
 * A: Visual indicator of error:
 *    - Immediately communicates something went wrong
 *    - Red color (warning/error)
 *    - Large size for attention
 *    - But not too alarming (rounded, friendly)
 *    Icons improve communication of page purpose.
 */

