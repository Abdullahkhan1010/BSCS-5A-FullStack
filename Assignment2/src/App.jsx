/**
 * App Component - Main Application File with Code Splitting
 * 
 * This is the root component of the BookNest application.
 * It sets up the routing structure using React Router v6 with performance optimization.
 * 
 * PERFORMANCE OPTIMIZATION - CODE SPLITTING:
 * We use React.lazy() to implement code splitting, which means:
 * - Each page is loaded only when the user navigates to it
 * - Initial bundle size is smaller (faster first load)
 * - Improves performance, especially on slow connections
 * - Users don't download code for pages they never visit
 * 
 * How Code Splitting Works:
 * 1. React.lazy(() => import('./Component')) creates a lazy-loaded component
 * 2. Component code is bundled separately during build
 * 3. When user visits a route, that route's code downloads
 * 4. Suspense shows fallback UI while code is downloading
 * 
 * What is React Router?
 * - A library that handles navigation in React applications
 * - Allows us to create Single Page Applications (SPA)
 * - Users can navigate between pages without full page reloads
 * - URL changes, but the page doesn't refresh (faster and smoother)
 * 
 * Key React Router Components Used:
 * 1. BrowserRouter: Wraps the entire app to enable routing
 * 2. Routes: Container for all Route components
 * 3. Route: Defines a path and which component to show
 * 4. Outlet: Renders child routes (used in Layout component)
 * 
 * Folder Structure Explanation:
 * /assets - Images, icons, and mock data (books.json)
 * /components - Reusable UI components (Navbar, Footer, BookCard, Button)
 * /context - Context API files for global state management
 * /pages - Full page components for each route
 * /styles - CSS files (global.css with Tailwind)
 */

// Import React for lazy loading and Suspense
import { lazy, Suspense } from 'react';

// Import React Router components for navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import global styles (includes Tailwind CSS)
import './styles/global.css';

// Import Layout component (contains Navbar, Footer, and Outlet)
// Layout is NOT lazy-loaded because it's needed on every page
import Layout from './components/Layout';

/**
 * LAZY LOADING - Code Splitting Implementation
 * 
 * React.lazy() dynamically imports components only when needed.
 * This creates separate JavaScript bundles for each page.
 * 
 * Benefits:
 * - Faster initial page load (smaller bundle)
 * - Better performance on slow networks
 * - Automatic code splitting by Vite/Webpack
 * - Progressive loading as user navigates
 * 
 * Syntax: const Component = lazy(() => import('./path'))
 * - lazy() takes a function that calls import()
 * - import() returns a Promise that resolves to the component
 * - Component only downloads when first rendered
 */

// React.lazy and Suspense help load pages only when needed, improving performance.
const Home = lazy(() => import('./pages/Home'));
const Browse = lazy(() => import('./pages/Browse'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Reservations = lazy(() => import('./pages/Reservations'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ReservationConfirmation = lazy(() => import('./pages/ReservationConfirmation'));
const History = lazy(() => import('./pages/History'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Loading Fallback Component
 * 
 * Shown by Suspense while a lazy component is being downloaded.
 * This provides visual feedback during code splitting delays.
 * 
 * In production, you might show:
 * - Skeleton screens
 * - Spinner animations
 * - Progress bars
 * 
 * For this assignment, we use a simple centered loading message.
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Loading spinner using Tailwind CSS */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading page...</p>
      </div>
    </div>
  );
}

/**
 * Main App Component
 * 
 * Sets up routing with code splitting and layout structure.
 * All routes are wrapped in Suspense to handle lazy loading.
 */
function App() {
  return (
    // BrowserRouter enables routing for the entire application
    // It uses the HTML5 history API to keep UI in sync with the URL
    <BrowserRouter>
      {/*
        Suspense Component:
        - Required wrapper for lazy-loaded components
        - Shows fallback UI while component code is downloading
        - fallback prop: What to display during loading
        - Can wrap entire Routes or individual Route components
        
        Why wrap all Routes?
        - Simpler code (one Suspense for all lazy components)
        - Consistent loading experience
        - Prevents layout shift
      */}
      <Suspense fallback={<LoadingFallback />}>
        {/* Routes component contains all Route definitions */}
        <Routes>
          {/*
            Layout Route:
            - Parent route that provides common structure (Navbar, Footer)
            - Uses <Outlet /> to render child routes
            - All child routes inherit the Layout
            - Layout is NOT lazy-loaded (needed immediately)
          */}
          <Route path="/" element={<Layout />}>
            {/* Home Page - Default route (index route) */}
            <Route index element={<Home />} />
            
            {/* Browse Page - Shows all books with search/filter */}
            <Route path="browse" element={<Browse />} />
            
            {/* Dashboard Page - User profile and borrowing overview */}
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* 
              Book Details Page - Dynamic route with book ID
              :id is a URL parameter that can be accessed in the component
              Example: /book/1, /book/2, etc.
              
              To access in component:
              import { useParams } from 'react-router-dom';
              const { id } = useParams();
            */}
            <Route path="book/:id" element={<BookDetails />} />
            
            {/* Wishlist Page - Shows user's saved books to read later */}
            <Route path="wishlist" element={<Wishlist />} />
            
            {/* Reservations Page - Shows user's cart/reserved books */}
            <Route path="reservations" element={<Reservations />} />
            
            {/* Checkout Page - Review and confirm reservation */}
            <Route path="checkout" element={<Checkout />} />
            
            {/* Confirmation Page - Shows reservation confirmation with QR code */}
            <Route path="confirmation" element={<ReservationConfirmation />} />
            
            {/* History Page - Shows user's borrowing history */}
            <Route path="history" element={<History />} />
            
            {/* Contact Page - Contact form and library information */}
            <Route path="contact" element={<Contact />} />
            
            {/* Login Page - User authentication form */}
            <Route path="login" element={<Login />} />
            
            {/* 
              404 Not Found Page - Catch-all route
              The * matches any route not defined above
              Must be the last route in the list
            */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Export App component so it can be imported in main.jsx
export default App;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is code splitting?
 * A: Breaking the application into smaller chunks that load on-demand.
 *    Instead of one large JavaScript file, we have multiple smaller files
 *    that download only when needed.
 * 
 * Q: How does React.lazy work?
 * A: React.lazy() takes a function that returns a dynamic import().
 *    The component code is bundled separately and loaded when first rendered.
 *    Example: lazy(() => import('./Home')) creates a separate bundle for Home.
 * 
 * Q: What is Suspense?
 * A: A React component that handles loading states for lazy components.
 *    While component code is downloading, Suspense shows the fallback UI.
 *    Once loaded, it renders the actual component.
 * 
 * Q: Why not lazy-load Layout?
 * A: Layout (Navbar/Footer) is needed immediately on every page.
 *    Lazy-loading it would delay the initial render with no benefit.
 *    We only lazy-load page components that aren't immediately visible.
 * 
 * Q: What is the performance benefit?
 * A: - Smaller initial bundle (faster first page load)
 *    - Progressive loading (download as needed)
 *    - Better experience on slow connections
 *    - Users don't download code they never use
 * 
 * Q: What is the Layout route pattern?
 * A: Layout is a parent route that wraps all child routes.
 *    It provides common structure (Navbar, Footer) using <Outlet />.
 *    Child routes render inside the Outlet.
 * 
 * Q: How does Outlet work?
 * A: Outlet is a placeholder where child routes render.
 *    Layout renders: <Navbar /> <Outlet /> <Footer />
 *    When on /browse, Outlet becomes <Browse />
 *    When on /contact, Outlet becomes <Contact />
 */
