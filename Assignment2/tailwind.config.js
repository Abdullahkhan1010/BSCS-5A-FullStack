/**
 * Tailwind CSS v4 Configuration File
 * 
 * This file configures Tailwind CSS for the BookNest project.
 * 
 * What is Tailwind CSS?
 * - A utility-first CSS framework that provides pre-built CSS classes
 * - Instead of writing custom CSS, we use classes like "bg-blue-500", "p-4", "flex"
 * - Makes styling faster and consistent across the application
 * 
 * Why use Tailwind?
 * 1. Rapid development: No need to write custom CSS
 * 2. Responsive design: Built-in breakpoints (sm, md, lg, xl)
 * 3. Consistency: Predefined spacing, colors, and sizing
 * 4. Small bundle size: Only includes CSS classes that are actually used
 * 
 * Tailwind v4 Changes:
 * - Simpler configuration using CSS variables
 * - Better performance
 * - Automatic content detection (no need to specify content paths)
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      // Custom breakpoints for responsive design (matching assignment requirements)
      screens: {
        'mobile': {'max': '767px'},     // Mobile: < 768px
        'tablet': '768px',               // Tablet: 768px - 1024px
        'desktop': '1024px',             // Desktop: > 1024px
      },
    },
  },
}
