/**
 * BookContext - Book Data & Cart Management
 * 
 * PURPOSE:
 * This context manages the entire book catalog and reservation cart (shopping cart).
 * It's the "brain" of our library application, handling all book-related operations.
 * 
 * RESPONSIBILITIES:
 * 1. Load and provide book data to all components
 * 2. Manage cart/reservation state (add, remove, persist)
 * 3. Provide search and filter functionality
 * 4. Handle cart limit (max 5 books) and duplicate prevention
 * 
 * WHY CONTEXT?
 * We use Context so that all components can access book data and cart
 * without prop drilling. Home, Browse, BookDetails, Reservations, and
 * Navbar all need this data.
 * 
 * KEY CONCEPTS FOR VIVA:
 * 1. useState: Manages books array and cart array
 * 2. useEffect: Loads books on mount, syncs cart to localStorage
 * 3. localStorage: Persists cart across browser sessions
 * 4. Array methods: filter, find, map for data operations
 * 5. Context API: Makes book data globally accessible
 */

import { createContext, useContext, useState, useEffect } from 'react';
// Import the mock book data
import booksData from '../assets/books.json';

// Step 1: Create the Context
const BookContext = createContext();

/**
 * BookProvider Component
 * 
 * Wraps the application to provide book and cart functionality.
 * Loads book data and manages the reservation cart with persistence.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function BookProvider({ children }) {
  /**
   * Books State
   * 
   * Stores the complete catalog of all books.
   * Loaded from books.json on initial render.
   * In a real app, this would come from an API: fetch('/api/books')
   */
  const [books, setBooks] = useState([]);

  /**
   * Cart State (Reservation Cart)
   * 
   * Stores books that user has reserved/added to cart.
   * Array of book objects that user intends to borrow.
   * 
   * Initial value loads from localStorage to restore previous cart.
   * Format: [{ id, title, author, coverUrl, ... }, ...]
   */
  const [cart, setCart] = useState(() => {
    // Try to load saved cart from localStorage
    const savedCart = localStorage.getItem('booknest-cart');
    
    // Parse JSON string back to array, or return empty array if no saved cart
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /**
   * History State (Borrowing History)
   * 
   * Stores completed reservations/borrowings with full details.
   * Allows users to view their past borrowing activity.
   * 
   * Each history item includes:
   * - book: The book object
   * - borrowDate: When book was borrowed (pickup date)
   * - dueDate: When book must be returned
   * - duration: Number of days borrowed for
   * - reservationId: Unique ID for the reservation
   * - status: 'borrowed' or 'returned'
   * - returnDate: When book was returned (if returned)
   * 
   * Initial value loads from localStorage to persist history.
   */
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('booknest-history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
      return [];
    }
  });

  /**
   * Loading State
   * 
   * Indicates if book data is being loaded.
   * Useful for showing loading spinners in components.
   */
  const [loading, setLoading] = useState(true);

  /**
   * useEffect: Load Books on Mount
   * 
   * Runs once when component first renders (empty dependency array []).
   * Loads book data from the imported JSON file.
   * 
   * In a real app, this would be an async API call:
   * const response = await fetch('/api/books');
   * const data = await response.json();
   */
  useEffect(() => {
    // Simulate loading delay (optional, for realism)
    // In production, this would be actual API loading time
    const loadBooks = () => {
      try {
        // Set the books from imported JSON data
        setBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading books:', error);
        setLoading(false);
      }
    };

    // Small delay to simulate network request (optional)
    setTimeout(loadBooks, 300);
  }, []); // Empty array = run once on mount

  /**
   * useEffect: Persist Cart to localStorage
   * 
   * Whenever cart changes, save it to localStorage.
   * This ensures reservations persist across:
   * - Page refreshes
   * - Browser restarts
   * - Navigation between pages
   * 
   * Runs every time 'cart' array changes.
   */
  useEffect(() => {
    // Save cart to localStorage as JSON string
    // localStorage only stores strings, so we stringify the array
    localStorage.setItem('booknest-cart', JSON.stringify(cart));
  }, [cart]); // Dependency: runs when cart changes

  /**
   * useEffect: Persist History to localStorage
   * 
   * Whenever history changes, save it to localStorage.
   * This ensures borrowing history persists across sessions.
   */
  useEffect(() => {
    try {
      localStorage.setItem('booknest-history', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
    }
  }, [history]); // Dependency: runs when history changes

  /**
   * addToCart Function
   * 
   * Adds a book to the reservation cart with validation.
   * 
   * BUSINESS RULES:
   * 1. Maximum 5 books in cart (library policy)
   * 2. No duplicate books (can't reserve same book twice)
   * 3. Only available books can be added (copiesAvailable > 0)
   * 
   * @param {Object} book - The book object to add to cart
   * @returns {Object} Result object with success status and message
   * 
   * For Viva: Explain each validation check and why it's important.
   */
  const addToCart = (book) => {
    // Validation 1: Check cart limit (max 5 books)
    if (cart.length >= 5) {
      return {
        success: false,
        message: 'Cart limit reached! You can only reserve up to 5 books at a time.',
      };
    }

    // Validation 2: Check for duplicates
    // Array.some() returns true if any element passes the test
    const isDuplicate = cart.some((item) => item.id === book.id);
    if (isDuplicate) {
      return {
        success: false,
        message: 'This book is already in your cart!',
      };
    }

    // Validation 3: Check if book is available
    if (book.status !== 'Available' || book.copiesAvailable <= 0) {
      return {
        success: false,
        message: 'Sorry, this book is currently not available.',
      };
    }

    // All validations passed: Add book to cart
    // Use spread operator to create new array (React best practice - immutability)
    setCart((prevCart) => [...prevCart, book]);

    return {
      success: true,
      message: `"${book.title}" added to your cart!`,
    };
  };

  /**
   * removeFromCart Function
   * 
   * Removes a book from cart by its ID.
   * Uses Array.filter() to create new array without the removed book.
   * 
   * @param {number} bookId - The ID of the book to remove
   * 
   * Why filter?
   * - Creates a new array with all books except the one with matching ID
   * - Immutable approach (doesn't modify original array)
   * - Triggers React re-render because it's a new array reference
   */
  const removeFromCart = (bookId) => {
    // filter returns new array with all items except where id === bookId
    setCart((prevCart) => prevCart.filter((book) => book.id !== bookId));
  };

  /**
   * clearCart Function
   * 
   * Removes all books from cart.
   * Useful for "Clear All" button or after successful checkout.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * getBookById Function
   * 
   * Finds and returns a specific book by its ID.
   * Used in BookDetails page to display individual book information.
   * 
   * @param {number} id - The book ID to search for
   * @returns {Object|undefined} The book object if found, undefined otherwise
   * 
   * Array.find() returns the first element that matches the condition.
   */
  const getBookById = (id) => {
    // Convert id to number in case it comes as string from URL params
    const bookId = parseInt(id);
    return books.find((book) => book.id === bookId);
  };

  /**
   * searchBooks Function
   * 
   * Searches books by title, author, or category.
   * Case-insensitive search using toLowerCase().
   * 
   * @param {string} query - The search term entered by user
   * @returns {Array} Filtered array of matching books
   * 
   * For Viva: Explain how the search works across multiple fields.
   */
  const searchBooks = (query) => {
    // If query is empty, return all books
    if (!query || query.trim() === '') {
      return books;
    }

    // Convert query to lowercase for case-insensitive search
    const searchTerm = query.toLowerCase().trim();

    // Filter books where title, author, or category includes search term
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
  };

  /**
   * filterByCategory Function
   * 
   * Filters books by a specific category/genre.
   * Used for category-based filtering in Browse page.
   * 
   * @param {string} category - The category to filter by
   * @returns {Array} Array of books in that category
   */
  const filterByCategory = (category) => {
    // If no category or "All", return all books
    if (!category || category === 'All') {
      return books;
    }

    // Return books matching the specified category
    return books.filter((book) => book.category === category);
  };

  /**
   * filterByStatus Function
   * 
   * Filters books by availability status (Available/Borrowed).
   * Useful for showing only available books.
   * 
   * @param {string} status - "Available" or "Borrowed"
   * @returns {Array} Array of books with that status
   */
  const filterByStatus = (status) => {
    if (!status) {
      return books;
    }

    return books.filter((book) => book.status === status);
  };

  /**
   * getAllCategories Function
   * 
   * Gets a unique list of all categories/genres in the catalog.
   * Used to populate category filter dropdown.
   * 
   * @returns {Array} Array of unique category names
   * 
   * For Viva: Explain how Set creates unique values and spread converts back to array.
   */
  const getAllCategories = () => {
    // Extract all category values
    const categories = books.map((book) => book.category);
    
    // Set automatically removes duplicates
    // Spread operator [...] converts Set back to array
    return [...new Set(categories)];
  };

  /**
   * isInCart Function
   * 
   * Checks if a book is already in the cart.
   * Used to disable "Add to Cart" button or show "Already Added" message.
   * 
   * @param {number} bookId - The book ID to check
   * @returns {boolean} true if book is in cart, false otherwise
   */
  const isInCart = (bookId) => {
    return cart.some((book) => book.id === bookId);
  };

  /**
   * addToHistory Function
   * 
   * Adds a completed reservation to borrowing history.
   * Called when user confirms their reservation.
   * 
   * @param {Object} historyItem - Object containing:
   *   - book: The book object
   *   - borrowDate: Date when borrowed (string)
   *   - dueDate: Date when due (string)
   *   - duration: Number of days
   *   - reservationId: Unique ID
   * @returns {Object} Result with success status
   */
  const addToHistory = (historyItem) => {
    try {
      const newHistoryItem = {
        ...historyItem,
        status: 'borrowed', // Initial status is borrowed
        addedDate: new Date().toISOString(), // Track when added to history
        extended: false, // Track if borrowing period has been extended
        pickedUp: false, // Track if reservation has been picked up
      };

      setHistory(prevHistory => [...prevHistory, newHistoryItem]);

      return {
        success: true,
        message: 'Reservation added to history'
      };
    } catch (error) {
      console.error('Error adding to history:', error);
      return {
        success: false,
        message: 'Failed to add to history'
      };
    }
  };

  /**
   * markAsReturned Function
   * 
   * Marks a borrowed book as returned in the history.
   * 
   * @param {string} reservationId - The reservation ID to mark as returned
   * @returns {Object} Result with success status
   */
  const markAsReturned = (reservationId) => {
    try {
      setHistory(prevHistory => 
        prevHistory.map(item => 
          item.reservationId === reservationId
            ? { ...item, status: 'returned', returnDate: new Date().toISOString() }
            : item
        )
      );

      return {
        success: true,
        message: 'Book marked as returned'
      };
    } catch (error) {
      console.error('Error marking as returned:', error);
      return {
        success: false,
        message: 'Failed to update return status'
      };
    }
  };

  /**
   * getHistory Function
   * 
   * Returns the complete borrowing history.
   * Can be filtered by status if needed.
   * 
   * @param {string} status - Optional: 'borrowed' or 'returned' to filter
   * @returns {Array} History items, optionally filtered
   */
  const getHistory = (status = null) => {
    if (!status) {
      return history;
    }
    return history.filter(item => item.status === status);
  };

  /**
   * extendBorrowingPeriod Function
   * 
   * Extends the due date by 7 days (one-time only).
   * Can only extend if not already extended and book is still borrowed.
   * 
   * @param {string} reservationId - The reservation ID to extend
   * @returns {Object} Result with success status and message
   */
  const extendBorrowingPeriod = (reservationId) => {
    try {
      let extended = false;
      let message = '';

      setHistory(prevHistory => 
        prevHistory.map(item => {
          if (item.reservationId === reservationId) {
            // Check if already extended
            if (item.extended) {
              message = 'This borrowing period has already been extended once.';
              return item;
            }
            
            // Check if already returned
            if (item.status === 'returned') {
              message = 'Cannot extend a returned book.';
              return item;
            }

            // Extend due date by 7 days
            const currentDueDate = new Date(item.dueDate);
            const newDueDate = new Date(currentDueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            
            extended = true;
            message = 'Borrowing period extended by 7 days!';
            
            return {
              ...item,
              dueDate: newDueDate.toISOString(),
              extended: true,
              extensionDate: new Date().toISOString()
            };
          }
          return item;
        })
      );

      return {
        success: extended,
        message: message || 'Reservation not found'
      };
    } catch (error) {
      console.error('Error extending borrowing period:', error);
      return {
        success: false,
        message: 'Failed to extend borrowing period'
      };
    }
  };

  /**
   * cancelReservation Function
   * 
   * Cancels a reservation that hasn't been picked up yet.
   * Only works for borrowed items that haven't been picked up.
   * 
   * @param {string} reservationId - The reservation ID to cancel
   * @returns {Object} Result with success status and message
   */
  const cancelReservation = (reservationId) => {
    try {
      let cancelled = false;
      let message = '';

      setHistory(prevHistory => {
        const item = prevHistory.find(h => h.reservationId === reservationId);
        
        if (!item) {
          message = 'Reservation not found';
          return prevHistory;
        }

        // Check if already picked up
        if (item.pickedUp) {
          message = 'Cannot cancel a reservation that has already been picked up.';
          return prevHistory;
        }

        // Check if already returned/cancelled
        if (item.status === 'returned' || item.status === 'cancelled') {
          message = 'This reservation has already been processed.';
          return prevHistory;
        }

        cancelled = true;
        message = 'Reservation cancelled successfully!';

        // Update status to cancelled
        return prevHistory.map(h => 
          h.reservationId === reservationId
            ? { ...h, status: 'cancelled', cancelDate: new Date().toISOString() }
            : h
        );
      });

      return {
        success: cancelled,
        message: message || 'Failed to cancel reservation'
      };
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      return {
        success: false,
        message: 'Failed to cancel reservation'
      };
    }
  };

  /**
   * markAsPickedUp Function
   * 
   * Marks a reservation as picked up.
   * 
   * @param {string} reservationId - The reservation ID
   * @returns {Object} Result with success status
   */
  const markAsPickedUp = (reservationId) => {
    try {
      setHistory(prevHistory => 
        prevHistory.map(item => 
          item.reservationId === reservationId
            ? { ...item, pickedUp: true, pickupDate: new Date().toISOString() }
            : item
        )
      );

      return {
        success: true,
        message: 'Marked as picked up'
      };
    } catch (error) {
      console.error('Error marking as picked up:', error);
      return {
        success: false,
        message: 'Failed to mark as picked up'
      };
    }
  };

  /**
   * getTotalBorrowedCount Function
   * 
   * Returns the lifetime total of borrowed books.
   * 
   * @returns {number} Total number of books borrowed (excluding cancelled)
   */
  const getTotalBorrowedCount = () => {
    return history.filter(item => item.status !== 'cancelled').length;
  };

  /**
   * getCurrentlyBorrowedBooks Function
   * 
   * Returns books that are currently borrowed (not returned or cancelled).
   * 
   * @returns {Array} Currently borrowed books
   */
  const getCurrentlyBorrowedBooks = () => {
    return history.filter(item => item.status === 'borrowed');
  };

  /**
   * clearHistory Function
   * 
   * Clears all borrowing history.
   * Use with caution - this is permanent.
   * 
   * @returns {Object} Result with success status
   */
  const clearHistory = () => {
    try {
      setHistory([]);
      return {
        success: true,
        message: 'History cleared successfully'
      };
    } catch (error) {
      console.error('Error clearing history:', error);
      return {
        success: false,
        message: 'Failed to clear history'
      };
    }
  };

  /**
   * Context Value Object
   * 
   * All these values and functions become accessible to consuming components.
   * Components import useBooks() and destructure what they need.
   */
  const value = {
    // Data
    books,              // Array: All books in catalog
    cart,               // Array: Books in reservation cart
    loading,            // Boolean: Is data loading?
    history,            // Array: Borrowing history
    
    // Cart Operations
    addToCart,          // Function: Add book to cart (with validation)
    removeFromCart,     // Function: Remove book from cart by ID
    clearCart,          // Function: Empty the entire cart
    isInCart,           // Function: Check if book is in cart
    
    // History Operations
    addToHistory,              // Function: Add completed reservation to history
    markAsReturned,            // Function: Mark borrowed book as returned
    getHistory,                // Function: Get history (optionally filtered)
    clearHistory,              // Function: Clear all history
    extendBorrowingPeriod,     // Function: Extend due date by 7 days (one-time)
    cancelReservation,         // Function: Cancel unpicked reservations
    markAsPickedUp,            // Function: Mark reservation as picked up
    getTotalBorrowedCount,     // Function: Get lifetime borrowed count
    getCurrentlyBorrowedBooks, // Function: Get currently borrowed books
    
    // Book Operations
    getBookById,        // Function: Get specific book by ID
    searchBooks,        // Function: Search books by query
    filterByCategory,   // Function: Filter by category
    filterByStatus,     // Function: Filter by availability status
    getAllCategories,   // Function: Get unique list of categories
  };

  // Provider: Makes all book functionality available to child components
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

/**
 * useBooks Custom Hook
 * 
 * Convenience hook for accessing book context.
 * Provides clean API and error handling.
 * 
 * Usage in components:
 * const { books, cart, addToCart, searchBooks } = useBooks();
 * 
 * @returns {Object} Book context value with all data and functions
 * @throws {Error} If used outside BookProvider
 */
export function useBooks() {
  const context = useContext(BookContext);
  
  // Error handling: Ensures component is wrapped in BookProvider
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  
  return context;
}

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What does BookContext do?
 * A: It manages the entire book catalog and reservation cart. It provides
 *    book data and cart operations to all components without prop drilling.
 * 
 * Q: Why use Context for books?
 * A: Many components need book data (Home, Browse, BookDetails, Navbar cart count).
 *    Context prevents passing books through every component in the tree.
 * 
 * Q: How does cart persistence work?
 * A: When cart changes, useEffect saves it to localStorage as JSON string.
 *    On app load, useState initializer reads from localStorage to restore cart.
 *    This survives page refreshes and browser restarts.
 * 
 * Q: What are the cart business rules?
 * A: 1) Maximum 5 books (library policy)
 *    2) No duplicates (can't reserve same book twice)
 *    3) Only available books (copiesAvailable > 0)
 * 
 * Q: How does the search function work?
 * A: It uses Array.filter() to create new array of books where title, author,
 *    or category includes the search term (case-insensitive using toLowerCase()).
 * 
 * Q: What is the difference between filter, find, and some?
 * A: - filter(): Returns new array with all matching elements
 *    - find(): Returns first matching element or undefined
 *    - some(): Returns true/false if any element matches
 * 
 * Q: Why use spread operator [...prevCart, book]?
 * A: React requires immutability. We create a new array instead of modifying
 *    the old one. This ensures React detects the change and re-renders.
 * 
 * Q: What happens if books.json fails to load?
 * A: The try-catch in useEffect catches errors, logs them to console, and
 *    sets loading to false. Books array stays empty, preventing app crash.
 */
