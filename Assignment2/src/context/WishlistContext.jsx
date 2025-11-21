/*
  ===== WISHLIST CONTEXT =====
  This context manages the user's reading wishlist functionality.
  
  Purpose:
  - Allow users to save books they want to read later
  - Persist wishlist data in localStorage
  - Provide easy add/remove/toggle operations
  
  Features:
  - Add books to wishlist
  - Remove books from wishlist
  - Toggle wishlist status (add if not in list, remove if already in)
  - Check if a book is in wishlist
  - Clear entire wishlist
  - Persist across browser sessions using localStorage
*/

import { createContext, useContext, useState, useEffect } from 'react';

/*
  Create the Wishlist Context
  - This will be used to share wishlist state across all components
  - Components can access wishlist data and functions via useWishlist hook
*/
const WishlistContext = createContext(undefined);

/*
  ===== WISHLIST PROVIDER COMPONENT =====
  Wraps the app to provide wishlist functionality to all children
*/
export function WishlistProvider({ children }) {
  
  /*
    ===== STATE MANAGEMENT =====
    Wishlist State:
    - Array of book objects that user has wishlisted
    - Initialized from localStorage to persist data
  */
  const [wishlist, setWishlist] = useState(() => {
    /*
      Initialize wishlist from localStorage
      - Check if there's saved wishlist data
      - Parse JSON string back to array
      - Return empty array if no data exists
    */
    try {
      const savedWishlist = localStorage.getItem('bookNestWishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  /*
    ===== EFFECT: PERSIST WISHLIST TO LOCALSTORAGE =====
    Whenever wishlist changes, save to localStorage
    - Converts wishlist array to JSON string
    - Stores in localStorage for persistence
    - Runs every time wishlist state updates
  */
  useEffect(() => {
    try {
      localStorage.setItem('bookNestWishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist]);

  /*
    ===== FUNCTION: ADD TO WISHLIST =====
    Adds a book to the wishlist
    
    Parameters:
    - book: The book object to add
    
    Validation:
    - Checks if book is already in wishlist
    - Prevents duplicates
    
    Returns:
    - Success object with message
  */
  const addToWishlist = (book) => {
    // Check if book already exists in wishlist
    const alreadyInWishlist = wishlist.some(item => item.id === book.id);
    
    if (alreadyInWishlist) {
      return {
        success: false,
        message: 'This book is already in your wishlist'
      };
    }

    // Add book to wishlist
    setWishlist(prevWishlist => [...prevWishlist, book]);
    
    return {
      success: true,
      message: 'Book added to wishlist successfully'
    };
  };

  /*
    ===== FUNCTION: REMOVE FROM WISHLIST =====
    Removes a book from the wishlist
    
    Parameters:
    - bookId: ID of the book to remove
    
    Process:
    - Filters out the book with matching ID
    - Updates wishlist state
  */
  const removeFromWishlist = (bookId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(book => book.id !== bookId)
    );
    
    return {
      success: true,
      message: 'Book removed from wishlist'
    };
  };

  /*
    ===== FUNCTION: TOGGLE WISHLIST =====
    Smart function that adds or removes based on current state
    
    Parameters:
    - book: The book object to toggle
    
    Logic:
    - If book is in wishlist -> remove it
    - If book is NOT in wishlist -> add it
    
    Returns:
    - Success object with message indicating action taken
  */
  const toggleWishlist = (book) => {
    const isInWishlist = wishlist.some(item => item.id === book.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      removeFromWishlist(book.id);
      return {
        success: true,
        message: 'Removed from wishlist',
        action: 'removed'
      };
    } else {
      // Add to wishlist
      addToWishlist(book);
      return {
        success: true,
        message: 'Added to wishlist',
        action: 'added'
      };
    }
  };

  /*
    ===== FUNCTION: IS IN WISHLIST =====
    Check if a specific book is in the wishlist
    
    Parameters:
    - bookId: ID of the book to check
    
    Returns:
    - Boolean: true if in wishlist, false otherwise
    
    Usage:
    - Used to show heart icon as filled/unfilled
    - Conditional rendering in UI
  */
  const isInWishlist = (bookId) => {
    return wishlist.some(book => book.id === bookId);
  };

  /*
    ===== FUNCTION: CLEAR WISHLIST =====
    Removes all books from wishlist
    
    Usage:
    - User wants to start fresh
    - Clear all saved books at once
  */
  const clearWishlist = () => {
    setWishlist([]);
    return {
      success: true,
      message: 'Wishlist cleared successfully'
    };
  };

  /*
    ===== FUNCTION: GET WISHLIST COUNT =====
    Returns the number of books in wishlist
    
    Returns:
    - Number: count of wishlist items
    
    Usage:
    - Display badge count on navbar/wishlist icon
  */
  const getWishlistCount = () => {
    return wishlist.length;
  };

  /*
    ===== CONTEXT VALUE =====
    All functions and data to be shared with components
    - wishlist: Array of wishlisted books
    - Functions to manipulate wishlist
  */
  const value = {
    wishlist,                    // Array of book objects in wishlist
    addToWishlist,              // Add a book to wishlist
    removeFromWishlist,         // Remove a book from wishlist
    toggleWishlist,             // Toggle wishlist status (add/remove)
    isInWishlist,               // Check if book is in wishlist
    clearWishlist,              // Clear entire wishlist
    getWishlistCount,           // Get count of wishlist items
  };

  /*
    Render the Provider
    - Makes wishlist context available to all children
    - Children can access via useWishlist() hook
  */
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

/*
  ===== CUSTOM HOOK: useWishlist =====
  Convenient hook to access wishlist context in components
  
  Usage in components:
  ```
  import { useWishlist } from '../context/WishlistContext';
  
  function MyComponent() {
    const { wishlist, addToWishlist, isInWishlist } = useWishlist();
    // ... use wishlist functions
  }
  ```
  
  Error Handling:
  - Throws error if used outside WishlistProvider
  - Ensures proper context setup
*/
export function useWishlist() {
  const context = useContext(WishlistContext);
  
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  return context;
}
