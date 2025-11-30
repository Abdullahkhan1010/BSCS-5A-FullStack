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
     * Modern Footer with Black & White Theme
     */
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* ===== Branding Section ===== */}
          <div>
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="bg-black p-1.5 rounded-lg">
                <BookOpen size={22} className="text-white" />
              </div>
              <span className="text-xl font-semibold text-black">
                BookNest
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your modern digital library. Discover, reserve, and manage your favorite books seamlessly.
            </p>
          </div>

          {/* ===== Quick Links ===== */}
          <div>
            <h3 className="text-base font-semibold text-black mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Library Info ===== */}
          <div>
            <h3 className="text-base font-semibold text-black mb-4">
              Library Info
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>📍 123 Book Street</li>
              <li>📞 (123) 456-7890</li>
              <li>📧 info@booknest.com</li>
              <li>🕒 Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>

          {/* ===== Connect ===== */}
          <div>
            <h3 className="text-base font-semibold text-black mb-4">
              Connect With Us
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Follow us for updates and book recommendations.
            </p>
            <div className="flex space-x-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="border-t border-gray-200 mt-10 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} BookNest. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-3">
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors text-sm"
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
