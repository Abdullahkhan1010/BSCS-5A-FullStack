/**
 * Footer Component - Site Footer
 * 
 * PURPOSE:
 * The footer component that appears at the bottom of every page.
 * Provides copyright information, quick links, and social media links.
 * 
 * FEATURES:
 * 1. Responsive design (stacked on mobile, grid on desktop)
 * 2. Quick navigation links
 * 3. Social media placeholders
 * 4. Copyright notice with current year
 * 5. Adapts to light/dark theme
 * 
 * LAYOUT:
 * - Mobile: Single column, stacked sections
 * - Desktop: Multi-column grid layout
 * 
 * KEY CONCEPTS FOR VIVA:
 * - Static component (no state management needed)
 * - Uses Link for internal navigation
 * - Responsive grid with Tailwind CSS
 * - Dynamic year calculation with JavaScript Date
 */

import { Link } from 'react-router-dom';
// Import Lucide icons for social media and branding
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react';

/**
 * Footer Component
 * 
 * Renders the bottom section of every page.
 * Provides navigation, information, and branding.
 */
function Footer() {
  /**
   * Get Current Year
   * 
   * Dynamically calculates current year for copyright notice.
   * new Date().getFullYear() returns current year as number.
   * 
   * Why dynamic?
   * - Automatically updates each year (no manual changes needed)
   * - Shows we understand JavaScript Date API
   */
  const currentYear = new Date().getFullYear();

  /**
   * Quick Links Array
   * 
   * Navigation links for footer.
   * Centralized data makes it easy to maintain.
   */
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse Books' },
    { to: '/reservations', label: 'My Reservations' },
    { to: '/contact', label: 'Contact Us' },
  ];

  /**
   * Social Media Links (Placeholder)
   * 
   * In a real application, these would link to actual social profiles.
   * For this assignment, they're placeholder "#" links.
   * 
   * Each has:
   * - icon: Lucide icon component
   * - label: For accessibility (screen readers)
   * - href: URL (currently placeholder)
   */
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:info@booknest.com' },
  ];

  return (
    /**
     * Footer Container
     * 
     * Tailwind Classes Explained:
     * - bg-gray-100: Light gray background in light mode
     * - dark:bg-gray-900: Dark background in dark mode
     * - border-t: Top border for visual separation
     * - mt-auto: Pushes footer to bottom (with flex parent)
     */
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* 
          Footer Grid Layout
          - Grid with responsive columns:
          - Mobile: 1 column (grid-cols-1)
          - Tablet: 2 columns (md:grid-cols-2)
          - Desktop: 4 columns (lg:grid-cols-4)
          - gap-8: Spacing between grid items
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ===== SECTION 1: About / Branding ===== */}
          <div>
            {/* Logo and Brand Name */}
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen size={28} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                BookNest
              </span>
            </div>
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your digital library management system. Discover, reserve, and manage your favorite books all in one place.
            </p>
          </div>

          {/* ===== SECTION 2: Quick Links ===== */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Quick Links
            </h3>
            {/* 
              Navigation Links
              - Vertical list of internal navigation
              - Uses Link from react-router-dom for SPA navigation
            */}
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== SECTION 3: Library Info ===== */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Library Info
            </h3>
            {/* 
              Static information about the library
              In a real app, this could be dynamic from a CMS or API
            */}
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>📍 123 Book Street</li>
              <li>📞 (123) 456-7890</li>
              <li>📧 info@booknest.com</li>
              <li>🕒 Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>

          {/* ===== SECTION 4: Connect / Social Media ===== */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Connect With Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Follow us on social media for updates and book recommendations.
            </p>
            {/* 
              Social Media Icons
              - Horizontal row of icon links
              - Circular buttons with hover effects
              - Each opens in new tab (target="_blank")
              - rel="noopener noreferrer" for security
            */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                // Get the icon component from the social object
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* 
          ===== BOTTOM BAR: Copyright Notice =====
          - Separated from main content with top border and margin
          - Centered text
          - Shows current year dynamically
        */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} BookNest. All rights reserved. | Built with React & Tailwind CSS
          </p>
          {/* 
            Additional Footer Links (Terms, Privacy)
            Horizontal list with separators
          */}
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is the purpose of the Footer?
 * A: Provides site-wide information, navigation, and branding that appears
 *    on every page. Common elements include copyright, links, contact info.
 * 
 * Q: How is it made responsive?
 * A: We use Tailwind's responsive grid:
 *    - Mobile (default): 1 column (grid-cols-1)
 *    - Tablet (md:): 2 columns (md:grid-cols-2)
 *    - Desktop (lg:): 4 columns (lg:grid-cols-4)
 *    Layout automatically adapts to screen size.
 * 
 * Q: Why use currentYear dynamically?
 * A: new Date().getFullYear() returns the current year.
 *    This automatically updates each year without code changes.
 *    Shows understanding of JavaScript Date API.
 * 
 * Q: What is mt-auto?
 * A: Tailwind's mt-auto sets margin-top: auto.
 *    When footer is in a flex container, this pushes it to the bottom.
 *    Creates "sticky footer" effect (footer at bottom even on short pages).
 * 
 * Q: What is rel="noopener noreferrer"?
 * A: Security feature for external links (target="_blank").
 *    - noopener: Prevents new page from accessing window.opener
 *    - noreferrer: Doesn't send referrer information
 *    Protects against tab-napping attacks.
 * 
 * Q: Why map over arrays for links?
 * A: DRY principle (Don't Repeat Yourself).
 *    Instead of writing similar JSX for each link, we:
 *    1. Define links in an array
 *    2. Map over array to generate JSX
 *    Makes it easy to add/remove/modify links.
 * 
 * Q: How does dark mode work in Footer?
 * A: We use Tailwind's dark: prefix for dark mode styles.
 *    Example: dark:bg-gray-900 applies only when 'dark' class on <html>.
 *    ThemeContext manages the 'dark' class, Tailwind applies the styles.
 */
