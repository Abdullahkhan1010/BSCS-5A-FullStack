/**
 * Layout Component - Page Structure Wrapper
 * 
 * PURPOSE:
 * Provides the common structure for all pages in the application.
 * Acts as a wrapper that includes Navbar, Footer, and a placeholder for page content.
 * 
 * WHAT IS A LAYOUT?
 * A layout is a component that defines the consistent structure across pages.
 * Instead of adding Navbar and Footer to every page, we:
 * 1. Create one Layout component with Navbar, Footer, and Outlet
 * 2. Wrap all routes with this Layout in App.jsx
 * 3. Each page renders inside the Outlet
 * 
 * REACT ROUTER PATTERN:
 * This uses the "nested routes" pattern from React Router v6.
 * 
 * Structure:
 * <Layout>           ← This component (always visible)
 *   <Navbar />       ← Top navigation (always visible)
 *   <Outlet />       ← Child route renders here (changes per page)
 *   <Footer />       ← Bottom section (always visible)
 * </Layout>
 * 
 * How it works:
 * - When user visits "/", <Home /> renders in <Outlet />
 * - When user visits "/browse", <Browse /> renders in <Outlet />
 * - Navbar and Footer stay the same, only middle content changes
 * 
 * KEY CONCEPTS FOR VIVA:
 * - Outlet: React Router component that renders child routes
 * - Layout pattern: Common wrapper for consistent page structure
 * - Composition: Building complex UI from smaller components
 * - Flexbox: Creates sticky footer layout (footer at bottom)
 */

import { Outlet } from 'react-router-dom';
// Import the Navbar and Footer components
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component
 * 
 * Renders the page structure that wraps all routes.
 * Ensures every page has Navbar at top and Footer at bottom.
 */
function Layout() {
  return (
    /**
     * Main Container
     * 
     * Flexbox layout for sticky footer:
     * - flex flex-col: Vertical flexbox
     * - min-h-screen: Minimum height of viewport
     * - w-full: Full width to prevent overflow
     * - overflow-x-hidden: Prevent horizontal scroll
     * - This ensures footer stays at bottom even on short pages
     * 
     * How sticky footer works:
     * 1. Container is full viewport height (min-h-screen)
     * 2. Main content area has flex-1 (grows to fill space)
     * 3. Footer has mt-auto (pushes to bottom)
     * Result: Footer always at bottom, even if content is short
     */
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      
      {/* 
        ===== NAVBAR =====
        Top navigation bar
        - Appears on every page (always visible)
        - Sticky positioning (stays at top when scrolling)
        - Contains: logo, navigation links, cart, theme toggle, auth
      */}
      <Navbar />

      {/* 
        ===== MAIN CONTENT AREA =====
        This is where page content renders
        
        Flexbox properties:
        - flex-1: Grow to fill available space
        - w-full: Full width to prevent overflow
        - This pushes footer to bottom
        
        Styling:
        - bg-white/dark:bg-gray-900: Adapts to theme
        - transition-colors: Smooth theme change animation
      */}
      <main className="flex-1 w-full bg-white dark:bg-gray-900 transition-colors">
        {/**
         * OUTLET Component
         * 
         * This is a special component from React Router.
         * It's a placeholder where child routes render.
         * 
         * How it works:
         * - App.jsx defines routes as children of Layout route
         * - When URL changes, React Router finds matching child route
         * - That route's component renders inside <Outlet />
         * 
         * Example flow:
         * 1. User navigates to "/browse"
         * 2. React Router matches <Route path="browse" element={<Browse />} />
         * 3. <Browse /> component renders inside this <Outlet />
         * 4. Navbar and Footer remain unchanged
         * 
         * This is the core of the Layout pattern.
         * One component defines structure, routes fill the content.
         */}
        <Outlet />
      </main>

      {/* 
        ===== FOOTER =====
        Bottom section with info and links
        - Appears on every page (always visible)
        - Contains: copyright, quick links, social media, contact info
        - mt-auto: Pushes to bottom (part of sticky footer pattern)
      */}
      <Footer />
    </div>
  );
}

export default Layout;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is the Layout component?
 * A: A wrapper component that provides consistent page structure.
 *    It includes Navbar, Footer, and Outlet where page content renders.
 *    Every page uses this structure automatically.
 * 
 * Q: What does Outlet do?
 * A: Outlet is from React Router. It's a placeholder where child routes render.
 *    When URL changes, the matching route's component appears in the Outlet.
 *    Layout stays the same, only the Outlet content changes.
 * 
 * Q: How does the Layout pattern work in routing?
 * A: In App.jsx:
 *    <Route path="/" element={<Layout />}>
 *      <Route index element={<Home />} />    ← Renders in Outlet
 *      <Route path="browse" element={<Browse />} />  ← Renders in Outlet
 *    </Route>
 *    
 *    Layout is parent route, pages are child routes.
 *    Layout provides structure, children provide content.
 * 
 * Q: What is the sticky footer pattern?
 * A: CSS technique to keep footer at page bottom even on short pages:
 *    1. Container: min-h-screen (full viewport height)
 *    2. Content: flex-1 (grows to fill space)
 *    3. Footer: mt-auto (automatically pushed to bottom)
 *    
 *    Result: Footer at bottom of viewport or content, whichever is lower.
 * 
 * Q: Why use Layout instead of adding Navbar/Footer to each page?
 * A: DRY principle (Don't Repeat Yourself):
 *    - One place to define structure (easier to maintain)
 *    - Consistent layout across all pages
 *    - Change Layout once, affects all pages
 *    - Better performance (Navbar/Footer don't re-render on navigation)
 * 
 * Q: What happens when theme changes?
 * A: ThemeContext toggles 'dark' class on <html>.
 *    Tailwind applies dark: styles throughout the Layout.
 *    transition-colors creates smooth color change animation.
 *    All components (Navbar, Outlet content, Footer) adapt to theme.
 * 
 * Q: Why is main flex-1?
 * A: In a flexbox column (flex-col), flex-1 means "grow to fill space".
 *    This makes the content area expand between Navbar and Footer.
 *    Pushes Footer to bottom, creating professional layout.
 */
