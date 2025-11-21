/**
 * PostCSS Configuration File
 * 
 * PostCSS is a tool that processes CSS with JavaScript plugins.
 * It works with Tailwind CSS to transform our styles.
 * 
 * Plugins used:
 * 1. @tailwindcss/postcss: Processes Tailwind utility classes (updated for v4)
 * 2. autoprefixer: Automatically adds vendor prefixes for browser compatibility
 *    (e.g., -webkit-, -moz-) so CSS works across all browsers
 */

export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Enables Tailwind CSS processing (v4)
    autoprefixer: {},             // Adds browser compatibility prefixes
  },
}
