/**
 * Book Details Page Component - Individual Book Information
 * 
 * PURPOSE:
 * Displays comprehensive information about a single book.
 * Users can view all details and reserve the book if available.
 * 
 * FEATURES:
 * 1. Dynamic routing - Gets book ID from URL
 * 2. Full book information display
 * 3. Conditional Reserve button based on availability
 * 4. Mock available date for borrowed books
 * 5. Add to cart functionality with alert feedback
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useParams: Extracting route parameters from URL
 * - Dynamic routing: /book/:id where :id is variable
 * - Conditional rendering: Different UI based on book status
 * - Date manipulation: Calculating future dates
 * - Context integration: Using BookContext for data and cart
 */

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, XCircle, Calendar, BookOpen, User, Hash, Tag, Heart, Building2, CalendarDays, FileText, Clock } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function BookDetails() {
  /**
   * STEP 1: Get Book ID from URL
   * 
   * useParams Hook:
   * Extracts dynamic parameters from URL route.
   * 
   * Example:
   * Route definition: /book/:id
   * Current URL: /book/12
   * useParams() returns: { id: '12' }
   * 
   * We destructure to get just the id:
   * const { id } = useParams();
   * 
   * WHY: Allows dynamic pages based on URL parameter
   */
  const { id } = useParams();
  
  /**
   * Navigation Hook
   * For "Back" button to return to previous page
   */
  const navigate = useNavigate();

  /**
   * STEP 2: Get Book Data and Cart Functions from Context
   * 
   * - getBookById: Function to find book by ID
   * - addToCart: Function to add book to cart
   * - isInCart: Function to check if book is already in cart
   * - history: Array of borrowing history to find current borrower
   * - bookForLater: Function to book a borrowed book for later
   * - getUserBooking: Function to check if user already booked this book
   */
  const { getBookById, addToCart, isInCart, history, bookForLater, getUserBooking } = useBooks();

  /**
   * Get Wishlist Functions from Context
   * 
   * - toggleWishlist: Function to add/remove book from wishlist
   * - isInWishlist: Function to check if book is in wishlist
   */
  const { toggleWishlist, isInWishlist } = useWishlist();

  /**
   * Get current user from Auth Context
   */
  const { user } = useAuth();

  /**
   * Get Toast notification function
   */
  const { showToast } = useToast();

  /**
   * STEP 3: Find the Specific Book
   * 
   * getBookById(id) searches books array for matching ID.
   * Returns book object if found, undefined if not found.
   * 
   * Type Conversion:
   * URL params are strings, book IDs are numbers.
   * getBookById handles conversion internally.
   */
  const book = getBookById(id);

  /**
   * STEP 4: Handle Book Not Found
   * 
   * If book is undefined (not found), show error message.
   * Prevents errors from trying to access properties of undefined.
   * 
   * Early return pattern: Exit function early if condition met.
   */
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-black  mb-4">
            Book Not Found
          </h2>
          <p className="text-gray-600  mb-6">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Browse All Books
          </button>
        </div>
      </div>
    );
  }

  /**
   * STEP 5: Check Availability Status
   * 
   * Book is available if:
   * 1. Status is "Available" (not "Borrowed")
   * 2. At least one copy is available (copiesAvailable > 0)
   * 
   * Boolean logic with AND operator (&&)
   */
  const isAvailable = book.status === 'Available' && book.copiesAvailable > 0;

  /**
   * Check if book is already in cart
   */
  const inCart = isInCart(book.id);

  /**
   * Check if book is in wishlist
   */
  const inWishlist = isInWishlist(book.id);

  /**
   * Helper function to get ALL users' borrowing histories
   * This ensures we find the actual borrower even if it's a different user
   */
  const getAllUsersHistory = () => {
    const allHistories = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('booknest-history-')) {
        try {
          const userHistory = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(userHistory)) {
            allHistories.push(...userHistory);
          }
        } catch (error) {
          console.error(`Error parsing history from ${key}:`, error);
        }
      }
    }
    
    return allHistories;
  };

  /**
   * Find current borrower for this book (if borrowed)
   * Look for active borrowing in ALL users' histories (not just current user)
   * This ensures we show the correct return date regardless of who borrowed it
   */
  const currentBorrowing = getAllUsersHistory().find(
    item => item.book.id === book.id && item.status === 'borrowed'
  );

  /**
   * Check if book is currently borrowed
   * Either from history (app-borrowed) or from book status (pre-borrowed in JSON)
   */
  const isBorrowed = !isAvailable || currentBorrowing;

  /**
   * Check if current user has already booked this book for later
   */
  const userBooking = user ? getUserBooking(book.id, user.username) : null;

  /**
   * STEP 6: Calculate Available Date
   * 
   * For borrowed books, show when they'll be available.
   * Use actual due date from current borrowing if available (INCLUDING extensions), otherwise mock 7 days.
   * The dueDate in currentBorrowing is automatically updated when user extends, so this always shows correct date.
   */
  const availableDate = currentBorrowing 
    ? new Date(currentBorrowing.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  /**
   * STEP 7: Handle Reserve Button Click
   * 
   * When user clicks "Reserve Book":
   * 1. Call addToCart with book object
   * 2. Get result (success/failure message)
   * 3. Show alert with message
   * 
   * addToCart returns: { success: boolean, message: string }
   * 
   * Alert is simple feedback mechanism (could be replaced with toast notification)
   */
  const handleReserve = () => {
    const result = addToCart(book);
    if (result.success) {
      showToast('Book Reserved! Check "My Reservations" to confirm.', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  /**
   * Handle Book for Later Button Click
   * 
   * When user clicks "Book for Later" on a borrowed book:
   * 1. Check if user is logged in
   * 2. For books borrowed through the app: use the actual reservation ID
   * 3. For pre-borrowed books in JSON: create a mock reservation ID
   * 4. Call bookForLater with book ID, user, and reservation ID
   * 5. Show success or error message
   */
  const handleBookForLater = () => {
    if (!user) {
      showToast('Please login to book this book for later.', 'error');
      return;
    }

    if (isAvailable) {
      showToast('This book is available now! You can reserve it directly.', 'info');
      return;
    }

    // Use actual reservation ID if borrowed through app, otherwise create mock ID
    const reservationId = currentBorrowing 
      ? currentBorrowing.reservationId 
      : `SYSTEM-${book.id}-BORROWED`;

    const result = bookForLater(book.id, user.username, reservationId);
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  /**
   * Handle Toggle Wishlist
   * 
   * Adds or removes book from wishlist.
   * Shows alert with action taken.
   */
  const handleToggleWishlist = () => {
    const result = toggleWishlist(book);
    if (result.success) {
      showToast(result.message, result.action === 'added' ? 'success' : 'info');
    } else {
      showToast(result.message, 'error');
    }
  };

  /**
   * Render Star Rating
   * 
   * Same logic as BookCard component.
   * Converts numeric rating to visual star display.
   */
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(book.rating);
    const hasHalfStar = book.rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} size={20} className="fill-yellow-400 text-yellow-400" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={20} className="fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    // Empty stars
    const remainingStars = 5 - Math.ceil(book.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={20} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
      
      {/* 
        Back Button
        - Returns to previous page (usually Browse)
        - navigate(-1) goes back one step in history
      */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center space-x-2 text-black hover:text-gray-600 mb-6 min-h-[44px] px-4 py-2 font-semibold"
      >
        <ArrowLeft size={20} />
        <span>Back to Browse</span>
      </button>

      {/* 
        ===== BOOK DETAILS LAYOUT =====
        
        Two-column layout:
        - Left: Book cover image
        - Right: Book information
        
        Responsive:
        - Mobile: Stacked (flex-col)
        - Desktop: Side by side (lg:flex-row)
      */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 
          ===== LEFT COLUMN: BOOK COVER =====
        */}
        <div className="lg:w-1/3">
          <div className="relative bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* 
              Book Cover Image
              - aspect-[3/4]: Maintains 3:4 aspect ratio (standard book)
              - object-cover: Fills space while maintaining aspect ratio
            */}
            <img
              src={book.coverUrl}
              alt={`${book.title} cover`}
              className="w-full aspect-[3/4] object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
              }}
            />
            
            {/* 
              Availability Badge (Overlay)
              - Positioned at top right of cover
              - Green if available, red if borrowed
            */}
            <div className={`absolute top-4 right-4 px-3 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 ${
              isAvailable 
                ? 'bg-black text-white' 
                : 'bg-gray-800 text-white'
            }`}>
              {isAvailable ? (
                <>
                  <CheckCircle size={18} />
                  <span>Available</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>Borrowed</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 
          ===== RIGHT COLUMN: BOOK INFORMATION =====
        */}
        <div className="lg:w-2/3">
          
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center space-x-1 px-3 py-1 text-sm font-semibold text-black bg-gray-100 rounded-full">
              <Tag size={16} />
              <span>{book.category}</span>
            </span>
          </div>

          {/* Book Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-black  mb-3">
            {book.title}
          </h1>

          {/* Author */}
          <div className="flex items-center space-x-2 text-lg text-gray-600  mb-4">
            <User size={20} />
            <span>by {book.author}</span>
          </div>

          {/* 
            Rating Display
            - Stars + numeric rating
          */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              {renderStars()}
            </div>
            <span className="text-lg font-semibold text-gray-700 ">
              {book.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 ">
              out of 5
            </span>
          </div>

          {/* 
            Book Metadata Grid
            - ISBN, Publisher, Publication Year, Page Count, and Copies Available
            - Responsive: 1 or 2 columns on mobile, up to 3 columns on desktop
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-xl">
            
            {/* ISBN */}
            <div className="flex items-center space-x-2">
              <Hash size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 ">ISBN</p>
                <p className="font-semibold text-black ">{book.isbn}</p>
              </div>
            </div>

            {/* Publisher */}
            <div className="flex items-center space-x-2">
              <Building2 size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 ">Publisher</p>
                <p className="font-semibold text-black ">{book.publisher}</p>
              </div>
            </div>

            {/* Publication Year */}
            <div className="flex items-center space-x-2">
              <CalendarDays size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 ">Published</p>
                <p className="font-semibold text-black ">{book.publicationYear}</p>
              </div>
            </div>

            {/* Page Count */}
            <div className="flex items-center space-x-2">
              <FileText size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 ">Pages</p>
                <p className="font-semibold text-black ">{book.pageCount}</p>
              </div>
            </div>

            {/* Copies Available */}
            <div className="flex items-center space-x-2">
              <BookOpen size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 ">Copies Available</p>
                <p className="font-semibold text-black ">
                  {book.copiesAvailable} {book.copiesAvailable === 1 ? 'copy' : 'copies'}
                </p>
              </div>
            </div>
          </div>

          {/* 
            Book Description
            - Full description text
          */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black  mb-3">
              Description
            </h2>
            <p className="text-gray-600  leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* 
            User Reviews Section
            - Display all reviews for this book
            - Shows username, rating, comment, and date
          */}
          {book.reviews && book.reviews.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-black  mb-4">
                User Reviews ({book.reviews.length})
              </h2>
              <div className="space-y-4">
                {book.reviews.map((review, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white  border border-gray-200  rounded-xl"
                  >
                    {/* Review Header: Username and Date */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User size={18} className="text-gray-400" />
                        <span className="font-semibold text-black ">
                          {review.username}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 ">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Review Rating Stars */}
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                      <span className="text-sm font-semibold text-gray-700  ml-2">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-600  leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 
            ===== CONDITIONAL RESERVE BUTTON =====
            
            THREE STATES:
            1. Available → Green "Reserve Book" button (enabled)
            2. Already in cart → Gray "Already in Cart" button (disabled)
            3. Borrowed → Red disabled button + available date message
          */}
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Wishlist Toggle Button */}
            <button
              onClick={handleToggleWishlist}
              className={`flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 min-h-[44px] rounded-xl font-semibold text-base md:text-lg transition-colors ${
                inWishlist
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Heart 
                size={20} 
                className={inWishlist ? 'fill-white' : ''}
              />
              <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {/* Reserve Button */}
            {isAvailable ? (
            /* 
              STATE 1: Book is Available
              - Show green Reserve button
              - Disabled if already in cart
            */
            <div className="flex-1">
              <button
                onClick={handleReserve}
                disabled={inCart}
                className={`w-full px-6 md:px-8 py-3 md:py-4 min-h-[44px] rounded-xl font-semibold text-base md:text-lg transition-colors ${
                  inCart
                    ? 'bg-gray-300 text-gray-500  cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {inCart ? '✓ Already in Cart' : '📚 Reserve Book'}
              </button>
              {inCart && (
                <p className="mt-3 text-sm text-gray-600 ">
                  Go to "My Reservations" to confirm your reservation.
                </p>
              )}
            </div>
          ) : (
            /* 
              STATE 3: Book is Borrowed
              - Show disabled "Currently Borrowed" button
              - Show expected available date
              - Show "Book for Later" button if not already booked
              
              Date Display:
              - Calendar icon for visual cue
              - availableDate from current borrowing or mock date
            */
            <div className="flex-1 space-y-4">
              <button
                disabled
                className="w-full px-6 md:px-8 py-3 md:py-4 min-h-[44px] bg-gray-300 text-gray-500  rounded-xl font-semibold text-base md:text-lg cursor-not-allowed"
              >
                Currently Borrowed
              </button>
              <div className="flex items-center space-x-2 text-gray-600 ">
                <Calendar size={20} />
                <span>Expected to be available by: <strong>{availableDate}</strong></span>
              </div>
              
              {/* Book for Later Button */}
              {userBooking ? (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-2 text-black">
                    <CheckCircle size={20} />
                    <span className="font-semibold">You have booked this book!</span>
                  </div>
                  <p className="text-sm text-gray-600  mt-2">
                    You will be notified when it becomes available after {availableDate}.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleBookForLater}
                  className="w-full px-6 md:px-8 py-3 md:py-4 min-h-[44px] bg-black text-white rounded-xl font-semibold text-base md:text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Clock size={20} />
                  <span>Book for After {availableDate}</span>
                </button>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default BookDetails;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is useParams and how does it work?
 * A: useParams is a React Router hook that extracts dynamic parameters from the URL.
 *    Route: /book/:id (":id" is dynamic parameter)
 *    URL: /book/12
 *    useParams() returns: { id: '12' }
 *    We destructure: const { id } = useParams()
 *    This allows one component to display different books based on URL.
 * 
 * Q: How do you find the specific book?
 * A: 1. Get book ID from URL using useParams()
 *    2. Call getBookById(id) from BookContext
 *    3. getBookById searches books array for matching ID
 *    4. Returns book object if found, undefined if not found
 *    5. If undefined, show "Book Not Found" message (early return)
 * 
 * Q: Explain the availability logic.
 * A: isAvailable = book.status === 'Available' && book.copiesAvailable > 0
 *    Both conditions must be true (AND operator):
 *    - Status must be "Available" (not "Borrowed")
 *    - At least 1 copy available
 *    This prevents reserving borrowed or out-of-stock books.
 * 
 * Q: How is the available date calculated?
 * A: For borrowed books, we calculate mock available date (7 days from today):
 *    1. Date.now() - Current time in milliseconds
 *    2. 7 * 24 * 60 * 60 * 1000 - 7 days in milliseconds
 *    3. Date.now() + 7days - Future timestamp
 *    4. new Date(timestamp) - Create Date object
 *    5. toLocaleDateString() - Format as readable string
 *    Example: Today is Nov 21 → Available Nov 28
 * 
 * Q: What are the three button states?
 * A: 1. Available & not in cart → Green "Reserve Book" (enabled)
 *    2. Available & in cart → Gray "Already in Cart" (disabled)
 *    3. Borrowed → Gray "Currently Borrowed" (disabled) + available date
 *    Uses conditional rendering with ternary operator.
 * 
 * Q: How does the Reserve button work?
 * A: 1. User clicks "Reserve Book"
 *    2. handleReserve() function fires
 *    3. Calls addToCart(book) from context
 *    4. addToCart validates (limit, duplicates, availability)
 *    5. Returns { success, message }
 *    6. Show alert with success or error message
 *    7. If successful, book is added to cart
 * 
 * Q: What is the layout structure?
 * A: Two-column layout using Flexbox:
 *    - Left column (1/3 width): Book cover image
 *    - Right column (2/3 width): Book information
 *    Responsive:
 *    - Mobile: Stacked vertically (flex-col)
 *    - Desktop: Side by side (lg:flex-row)
 * 
 * Q: What information is displayed?
 * A: 1. Cover image with availability badge
 *    2. Category badge
 *    3. Title and author
 *    4. Star rating (visual + numeric)
 *    5. ISBN number
 *    6. Copies available count
 *    7. Full description
 *    8. Conditional reserve button
 *    All requirements from the prompt are displayed.
 * 
 * Q: What is the Back button for?
 * A: navigate(-1) goes back one step in browser history.
 *    Usually returns to Browse page.
 *    Alternative: navigate('/browse') goes to specific route.
 *    -1 is more flexible (works from any previous page).
 */

