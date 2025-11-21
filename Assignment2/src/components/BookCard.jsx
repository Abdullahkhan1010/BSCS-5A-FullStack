/**
 * BookCard Component - Book Display Card
 * 
 * PURPOSE:
 * Displays a single book's information in a card format.
 * Reusable component used in Home (featured books) and Browse (all books) pages.
 * 
 * FEATURES:
 * 1. Book cover image
 * 2. Title and author information
 * 3. Star rating display
 * 4. Availability status badge
 * 5. Action buttons (View Details, Add to Cart)
 * 
 * PROPS:
 * - book: Object containing book data (title, author, cover, rating, etc.)
 * 
 * RESPONSIVE:
 * - Mobile: Full width card with vertical layout
 * - Desktop: Fixed width card in grid layout
 * 
 * KEY CONCEPTS FOR VIVA:
 * - Props: Receiving data from parent component
 * - Conditional rendering: Different UI based on book status
 * - useNavigate: Programmatic navigation
 * - useBooks: Accessing cart functions from context
 */

import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Eye, CheckCircle, XCircle, Heart } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useWishlist } from '../context/WishlistContext';

/**
 * BookCard Component
 * 
 * Displays a book in a card layout with actions.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.book - Book object with all book data
 */
function BookCard({ book }) {
  /**
   * React Router Navigation Hook
   * 
   * useNavigate returns a function to programmatically navigate.
   * We use it to redirect to book details page when button is clicked.
   * 
   * Alternative: Could use <Link> but button onClick is more flexible.
   */
  const navigate = useNavigate();

  /**
   * Access Cart Functions from BookContext
   * 
   * - addToCart: Function to add book to cart
   * - isInCart: Function to check if book is already in cart
   */
  const { addToCart, isInCart } = useBooks();

  /**
   * Access Wishlist Functions from WishlistContext
   * 
   * - toggleWishlist: Function to add/remove book from wishlist
   * - isInWishlist: Function to check if book is in wishlist
   */
  const { toggleWishlist, isInWishlist } = useWishlist();

  /**
   * Check if book is available for reservation
   * 
   * Available if:
   * 1. Status is "Available"
   * 2. At least one copy is available (copiesAvailable > 0)
   */
  const isAvailable = book.status === 'Available' && book.copiesAvailable > 0;

  /**
   * Check if book is already in user's cart
   */
  const inCart = isInCart(book.id);

  /**
   * Check if book is in user's wishlist
   */
  const inWishlist = isInWishlist(book.id);

  /**
   * handleViewDetails Function
   * 
   * Navigates to the book details page.
   * Uses dynamic route with book ID: /book/:id
   */
  const handleViewDetails = () => {
    navigate(`/book/${book.id}`);
  };

  /**
   * handleAddToCart Function
   * 
   * Adds book to reservation cart.
   * Shows alert with result message (success or error).
   * 
   * addToCart returns: { success: boolean, message: string }
   */
  const handleAddToCart = () => {
    const result = addToCart(book);
    alert(result.message);
  };

  /**
   * handleToggleWishlist Function
   * 
   * Adds or removes book from wishlist.
   * Toggles between wishlisted and not wishlisted states.
   * 
   * toggleWishlist returns: { success: boolean, message: string, action: 'added'|'removed' }
   */
  const handleToggleWishlist = () => {
    const result = toggleWishlist(book);
    // Optional: Show toast notification instead of alert
    console.log(result.message);
  };

  /**
   * renderStars Function
   * 
   * Displays star rating visually.
   * Converts numeric rating (1-5) to star icons.
   * 
   * Logic:
   * - Full stars for whole numbers
   * - Partial star for decimals (visual indicator)
   * - Gray stars for remaining (up to 5 total)
   * 
   * @returns {JSX.Element[]} Array of star icons
   */
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(book.rating); // Whole number part
    const hasHalfStar = book.rating % 1 !== 0; // Check for decimal

    // Add full stars (filled)
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          size={16} 
          className="fill-yellow-400 text-yellow-400" 
        />
      );
    }

    // Add half star if rating has decimal (e.g., 4.5)
    if (hasHalfStar) {
      stars.push(
        <Star 
          key="half" 
          size={16} 
          className="fill-yellow-400 text-yellow-400 opacity-50" 
        />
      );
    }

    // Add empty stars to make 5 total
    const remainingStars = 5 - Math.ceil(book.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          size={16} 
          className="text-gray-300 dark:text-gray-600" 
        />
      );
    }

    return stars;
  };

  return (
    /**
     * Card Container
     * 
     * Tailwind Classes Explained:
     * - bg-white/dark:bg-gray-800: Background adapts to theme
     * - rounded-lg: Rounded corners
     * - shadow-md: Medium shadow for depth
     * - overflow-hidden: Clips content to card boundaries
     * - transition-transform: Smooth hover animation
     * - hover:scale-105: Slight zoom on hover (interactive feedback)
     */
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      
      {/* 
        ===== BOOK COVER IMAGE =====
        - Fixed aspect ratio for consistent card heights
        - Fallback background if image fails to load
        - object-cover: Maintains aspect ratio, crops if needed
      */}
      <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
        <img
          src={book.coverUrl}
          alt={`${book.title} cover`}
          className="w-full h-full object-cover"
          // Fallback for broken images
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
          }}
        />
        
        {/* 
          Wishlist Button (Top Left Corner)
          - Positioned absolutely over cover image
          - Heart icon filled if in wishlist, outline if not
          - Click to toggle wishlist status
        */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 left-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={20} 
            className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}
          />
        </button>

        {/* 
          Availability Badge (Top Right Corner)
          - Positioned absolutely over cover image
          - Green if available, red if borrowed
          - Shows status with icon
        */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
          isAvailable 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {isAvailable ? (
            <>
              <CheckCircle size={14} />
              <span>Available</span>
            </>
          ) : (
            <>
              <XCircle size={14} />
              <span>Borrowed</span>
            </>
          )}
        </div>
      </div>

      {/* 
        ===== CARD CONTENT =====
        Book information and actions
      */}
      <div className="p-4">
        
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded">
            {book.category}
          </span>
        </div>

        {/* 
          Book Title
          - Truncate if too long (line-clamp-2)
          - Shows max 2 lines with ellipsis
        */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
          {book.title}
        </h3>

        {/* Author Name */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          by {book.author}
        </p>

        {/* 
          Rating Display
          - Shows star icons
          - Displays numeric rating
          - Flex layout for horizontal alignment
        */}
        <div className="flex items-center space-x-1 mb-3">
          {renderStars()}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {book.rating.toFixed(1)}
          </span>
        </div>

        {/* 
          Copies Available Info
          - Shows how many copies can be reserved
          - Only visible if book is available
        */}
        {isAvailable && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {book.copiesAvailable} {book.copiesAvailable === 1 ? 'copy' : 'copies'} available
          </p>
        )}

        {/* 
          ===== ACTION BUTTONS =====
          Two buttons: View Details and Add to Cart
          - Full width on mobile, side by side on larger screens
        */}
        <div className="flex flex-col sm:flex-row gap-2">
          
          {/* 
            View Details Button
            - Always enabled (can view details anytime)
            - Primary action (more prominent styling)
          */}
          <button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={18} />
            <span>View Details</span>
          </button>

          {/* 
            Add to Cart Button
            Conditional styling and behavior:
            - Disabled if not available or already in cart
            - Shows "In Cart" if already added
            - Shows "Add to Cart" if can be added
            - Grayed out when disabled
          */}
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || inCart}
            className={`flex-1 flex items-center justify-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
              !isAvailable || inCart
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <ShoppingCart size={18} />
            <span>{inCart ? 'In Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is this component's purpose?
 * A: BookCard displays a single book's information in a card format.
 *    It's reusable - used in both Home (featured books) and Browse (all books).
 *    Shows cover, info, rating, and provides actions (view/add to cart).
 * 
 * Q: How does it receive data?
 * A: Through props. Parent component passes book object as prop.
 *    Example: <BookCard book={bookData} />
 *    We destructure it: function BookCard({ book })
 * 
 * Q: How does the star rating work?
 * A: renderStars() function converts numeric rating to visual stars:
 *    1. Math.floor() gets full stars (4.5 → 4 full stars)
 *    2. Check decimal for half star (4.5 has decimal, so add half star)
 *    3. Calculate remaining empty stars (5 - 4.5 = 0.5, round up to 1)
 *    Returns array of Star components with different styling.
 * 
 * Q: How does Add to Cart work?
 * A: 1. Get addToCart function from BookContext using useBooks()
 *    2. On button click, call addToCart(book)
 *    3. addToCart validates (limit, duplicates, availability)
 *    4. Returns { success, message } object
 *    5. Show alert with message to user
 * 
 * Q: Why disable Add to Cart button?
 * A: Button is disabled if:
 *    - Book is borrowed (!isAvailable)
 *    - Book already in cart (inCart)
 *    Prevents invalid actions and provides visual feedback.
 * 
 * Q: What is line-clamp-2?
 * A: Tailwind utility that limits text to 2 lines with ellipsis.
 *    Long titles won't break card layout - they truncate with "..."
 *    Keeps cards uniform height in grid.
 * 
 * Q: How does navigation work?
 * A: useNavigate() hook from React Router returns navigate function.
 *    navigate(`/book/${book.id}`) programmatically changes route.
 *    Alternative: <Link to={...}> but button with onClick is more flexible.
 * 
 * Q: What is the hover effect?
 * A: hover:scale-105 slightly enlarges card on hover (105% size).
 *    transition-transform makes it smooth animation.
 *    Provides interactive feedback - shows card is clickable.
 * 
 * Q: How does image fallback work?
 * A: onError event fires if image fails to load.
 *    We replace src with placeholder: 'https://via.placeholder.com/...'
 *    Prevents broken image icons, shows "No Cover" instead.
 */
