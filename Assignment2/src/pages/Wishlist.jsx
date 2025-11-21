/*
  ===== WISHLIST PAGE =====
  This page displays all books that the user has added to their reading wishlist.
  
  Purpose:
  - Show all wishlisted books in a grid layout
  - Allow users to remove books from wishlist
  - Provide navigation to book details
  - Move books from wishlist to cart
  
  Features:
  - Display wishlist books in card format
  - Remove from wishlist functionality
  - Add to cart directly from wishlist
  - Empty state when no books in wishlist
  - Responsive grid layout
*/

import { useWishlist } from '../context/WishlistContext';
import { useBooks } from '../context/BookContext';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Trash2 } from 'lucide-react';

/*
  ===== WISHLIST COMPONENT =====
  Main component for the wishlist page
*/
export default function Wishlist() {
  
  /*
    ===== CONTEXT & HOOKS =====
    Access wishlist and books functionality
  */
  const { wishlist, removeFromWishlist, getWishlistCount } = useWishlist();
  const { addToCart } = useBooks();
  const navigate = useNavigate();

  /*
    ===== FUNCTION: HANDLE REMOVE FROM WISHLIST =====
    Removes a book from the wishlist
    
    Parameters:
    - bookId: ID of the book to remove
  */
  const handleRemoveFromWishlist = (bookId) => {
    const result = removeFromWishlist(bookId);
    if (result.success) {
      // Optional: Show success notification
      console.log(result.message);
    }
  };

  /*
    ===== FUNCTION: HANDLE ADD TO CART =====
    Adds book to cart from wishlist
    
    Parameters:
    - book: The book object to add to cart
    
    Note:
    - Does NOT automatically remove from wishlist
    - User may want to keep it in wishlist even after adding to cart
  */
  const handleAddToCart = (book) => {
    const result = addToCart(book);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  /*
    ===== FUNCTION: HANDLE VIEW DETAILS =====
    Navigate to book details page
    
    Parameters:
    - bookId: ID of the book to view
  */
  const handleViewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  /*
    ===== FUNCTION: RENDER STAR RATING =====
    Creates visual star rating display
    
    Parameters:
    - rating: Number (e.g., 4.5)
    
    Returns:
    - Array of star elements (filled or empty)
  */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">⯨</span>
      );
    }

    // Add empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">★</span>
      );
    }

    return stars;
  };

  /*
    ===== RENDER: EMPTY STATE =====
    Shows when wishlist is empty
  */
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Books you want to read later
            </p>
          </div>

          {/* Empty State Message */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <Heart size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding books you want to read to your wishlist!
            </p>
            <button
              onClick={() => navigate('/browse')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
    ===== RENDER: WISHLIST WITH BOOKS =====
    Shows all wishlisted books in grid format
  */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* 
          ===== PAGE HEADER =====
          Shows title and count of wishlisted books
        */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {getWishlistCount()} {getWishlistCount() === 1 ? 'book' : 'books'} in your wishlist
          </p>
        </div>

        {/* 
          ===== WISHLIST GRID =====
          Responsive grid of wishlist books
          - 1 column on mobile
          - 2 columns on tablet
          - 3 columns on desktop
          - 4 columns on large screens
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Map through wishlist books */}
          {wishlist.map((book) => (
            
            <div 
              key={book.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              
              {/* 
                ===== BOOK COVER IMAGE =====
                Shows book cover with fallback
              */}
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={book.coverUrl || '/placeholder-book.jpg'} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                
                {/* 
                  ===== REMOVE FROM WISHLIST BUTTON =====
                  Positioned at top-right corner
                */}
                <button
                  onClick={() => handleRemoveFromWishlist(book.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>

                {/* 
                  ===== STATUS BADGE =====
                  Shows if book is available or borrowed
                */}
                <div className="absolute bottom-2 left-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    book.status === 'Available' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {book.status}
                  </span>
                </div>
              </div>

              {/* 
                ===== BOOK INFORMATION =====
                Details about the book
              */}
              <div className="p-4">
                
                {/* Book Title */}
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
                  {book.title}
                </h3>

                {/* Author Name */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  by {book.author}
                </p>

                {/* Category */}
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {book.category}
                </p>

                {/* Rating Display */}
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(book.rating)}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {book.rating.toFixed(1)}
                  </span>
                </div>

                {/* Copies Available */}
                {book.status === 'Available' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {book.copiesAvailable} {book.copiesAvailable === 1 ? 'copy' : 'copies'} available
                  </p>
                )}

                {/* 
                  ===== ACTION BUTTONS =====
                  View details and add to cart buttons
                */}
                <div className="flex flex-col gap-2">
                  
                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(book.id)}
                    className="flex items-center justify-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye size={18} />
                    <span>View Details</span>
                  </button>

                  {/* Add to Cart Button */}
                  {book.status === 'Available' && (
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="flex items-center justify-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                  )}

                  {/* Borrowed Status Message */}
                  {book.status === 'Borrowed' && (
                    <p className="text-xs text-red-500 dark:text-red-400 text-center">
                      Currently unavailable
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          ===== CLEAR WISHLIST BUTTON =====
          Allows user to remove all books at once
        */}
        {wishlist.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                  wishlist.forEach(book => removeFromWishlist(book.id));
                }
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
