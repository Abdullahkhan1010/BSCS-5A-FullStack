/**
 * Reservations Page Component - Cart Management
 * 
 * PURPOSE:
 * Displays and manages books in the user's reservation cart.
 * Users can review, configure, and confirm their book reservations.
 * 
 * FEATURES:
 * 1. Display all books in cart
 * 2. Select borrow duration (7, 14, or 21 days)
 * 3. Calculate pickup and due dates
 * 4. Remove books from cart
 * 5. Confirm reservation (generates reservation ID)
 * 6. Clear cart after confirmation
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useState: Managing borrow durations for each book
 * - Array.map: Displaying multiple cart items
 * - Date manipulation: Calculating pickup and due dates
 * - Object state: Storing duration per book ID
 * - Math.random: Generating unique reservation IDs
 * - Context methods: removeFromCart, clearCart
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, CheckCircle, Calendar, Clock, AlertCircle, User, Mail, IdCard } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Reservations() {
  const navigate = useNavigate();
  
  /**
   * STEP 1: Access Cart Data from Context
   * 
   * - cart: Array of books user has added to cart
   * - removeFromCart: Function to remove single book
   * - clearCart: Function to remove all books
   * - addToHistory: Function to save confirmed reservations to history
   */
  const { cart, removeFromCart } = useBooks();
  const { user } = useAuth();
  const { showToast } = useToast();

  /**
   * STEP 2: Manage Borrow Duration State
   * 
   * State Structure: Object with book IDs as keys, durations as values
   * Example: { 1: 7, 5: 14, 8: 21 }
   * 
   * Why Object?
   * - Each book can have different duration
   * - Easy lookup by book ID: durations[book.id]
   * - Default duration: 7 days for all books
   * 
   * Initial State:
   * Create object with all cart books defaulting to 7 days
   * cart.reduce() builds object from array
   */
  const [durations, setDurations] = useState(() => {
    /**
     * Array.reduce() Explanation:
     * 
     * reduce(callback, initialValue)
     * - Iterates through array, building accumulated value
     * - callback(accumulator, currentItem)
     * - Returns final accumulated value
     * 
     * Here:
     * - acc: Accumulated object {}
     * - book: Current book in cart
     * - Return: { ...acc, [book.id]: 7 }
     * - Spread ...acc keeps previous entries
     * - [book.id]: 7 adds new entry (computed property name)
     * 
     * Example:
     * cart = [book1, book2, book3]
     * Result: { 1: 7, 2: 7, 3: 7 }
     */
    return cart.reduce((acc, book) => ({ ...acc, [book.id]: 7 }), {});
  });

  /**
   * STEP 2A: Manage Reservation Form State
   * 
   * Required fields for reservation:
   * - fullName: User's full name
   * - email: User's email address
   * - pickupDate: Preferred pickup date (min 24hrs from now)
   * - membershipId: Library membership ID
   */
  const [formData, setFormData] = useState({
    fullName: user?.username || '',
    email: '',
    pickupDate: '',
    membershipId: ''
  });

  /**
   * Form Errors State
   * Stores validation error messages for each field
   */
  const [formErrors, setFormErrors] = useState({});

  /**
   * Get minimum pickup date (24 hours from now)
   * Used for date input validation
   */
  const getMinPickupDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().split('T')[0];
  };

  /**
   * STEP 3: Handle Duration Change
   * 
   * When user selects different duration from dropdown:
   * 1. Get book ID
   * 2. Get new duration value
   * 3. Update durations state for that specific book
   * 
   * @param {number} bookId - ID of book to update
   * @param {number} days - New duration (7, 14, or 21)
   * 
   * Object Spread Syntax:
   * { ...durations, [bookId]: days }
   * - ...durations: Copy all existing entries
   * - [bookId]: days: Override/add this specific entry
   * - Immutable update (doesn't modify original state)
   */
  const handleDurationChange = (bookId, days) => {
    setDurations(prev => ({
      ...prev,
      [bookId]: days
    }));
  };

  /**
   * STEP 3A: Handle Form Input Change
   * 
   * Updates form data and clears error for that field
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * STEP 3B: Validate Form
   * 
   * Checks all required fields and validates:
   * - Full name is not empty
   * - Email contains @ symbol
   * - Pickup date is at least 24 hours from now
   * - Membership ID is not empty
   * 
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    const errors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate pickup date
    if (!formData.pickupDate) {
      errors.pickupDate = 'Pickup date is required';
    } else {
      const selectedDate = new Date(formData.pickupDate);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 1);
      minDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < minDate) {
        errors.pickupDate = 'Pickup date must be at least 24 hours from now';
      }
    }
    
    // Validate membership ID
    if (!formData.membershipId.trim()) {
      errors.membershipId = 'Library membership ID is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * STEP 4: Calculate Pickup Date
   * 
   * Returns formatted pickup date based on user's selection or tomorrow as default
   * 
   * Format Options:
   * - weekday: 'long' → "Monday"
   * - year: 'numeric' → "2025"
   * - month: 'long' → "November"
   * - day: 'numeric' → "22"
   * 
   * Example Output: "Friday, November 22, 2025"
   */
  const getPickupDate = () => {
    if (formData.pickupDate) {
      const date = new Date(formData.pickupDate);
      date.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Default to tomorrow if no date selected
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return tomorrow.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * STEP 5: Calculate Due Date
   * 
   * Due Date = Pickup Date + Borrow Duration
   * 
   * @param {number} duration - Number of days (7, 14, or 21)
   * @returns {string} Formatted due date
   * 
   * Logic:
   * 1. Start with selected pickup date (or tomorrow if not set)
   * 2. Add duration in milliseconds: duration * 24 * 60 * 60 * 1000
   * 3. Total: Pickup Date + Duration
   * 
   * Example:
   * Pickup: Nov 22
   * Duration: 7 days
   * Due: Nov 29
   */
  const getDueDate = (duration) => {
    let startDate;
    if (formData.pickupDate) {
      startDate = new Date(formData.pickupDate);
      startDate.setHours(12, 0, 0, 0);
    } else {
      startDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    
    // Add duration days to pickup date
    const dueDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    
    return dueDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * STEP 6: Handle Book Removal
   * 
   * Remove single book from cart.
   * 
   * @param {number} bookId - ID of book to remove
   * 
   * Process:
   * 1. Call removeFromCart from context
   * 2. Show confirmation alert
   * 3. Also remove from durations state
   */
  const handleRemove = (bookId) => {
    removeFromCart(bookId);
    // Remove from durations state as well
    setDurations(prev => {
      const newDurations = { ...prev };
      delete newDurations[bookId]; // Remove property
      return newDurations;
    });
    showToast('Book removed from cart', 'info');
  };

  /**
   * STEP 7: Handle Proceed to Checkout
   * 
   * Process:
   * 1. Validate form data (name, email, pickup date, membership ID)
   * 2. Save reservation details to sessionStorage
   * 3. Navigate to checkout page for final review
   */
  const handleProceedToCheckout = () => {
    // Validate form before proceeding
    if (!validateForm()) {
      showToast('Please fill in all required fields correctly before proceeding to checkout', 'warning');
      return;
    }

    // Save reservation details to sessionStorage for checkout page
    const reservationDetails = {
      formData,
      durations
    };
    sessionStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));

    // Navigate to checkout page
    navigate('/checkout');
  };

  /**
   * STEP 9: Render Empty Cart State
   * 
   * If cart is empty, show message instead of empty list.
   * Better UX than blank page.
   */
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          My Reservations
        </h1>
        
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse books and add them to your cart to make a reservation.
          </p>
          <a
            href="/browse"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Books
          </a>
        </div>
      </div>
    );
  }

  /**
   * STEP 10: Render Cart with Books
   */
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
          My Reservations
        </h1>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg">
          <ShoppingCart size={20} />
          <span className="font-semibold">{cart.length} {cart.length === 1 ? 'Book' : 'Books'}</span>
        </div>
      </div>

      {/* 
        ===== RESERVATION FORM =====
        User must provide personal details before confirming reservation
      */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Reservation Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User size={16} className="inline mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                ${formErrors.fullName 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Mail size={16} className="inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                ${formErrors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Pickup Date Input */}
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Calendar size={16} className="inline mr-1" />
              Pickup Date *
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              min={getMinPickupDate()}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                ${formErrors.pickupDate 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200`}
            />
            {formErrors.pickupDate && (
              <p className="text-red-500 text-sm mt-1">{formErrors.pickupDate}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum 24 hours from now
            </p>
          </div>

          {/* Membership ID Input */}
          <div>
            <label htmlFor="membershipId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <IdCard size={16} className="inline mr-1" />
              Membership ID *
            </label>
            <input
              type="text"
              id="membershipId"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleInputChange}
              placeholder="e.g., LIB-12345"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                ${formErrors.membershipId 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                }
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {formErrors.membershipId && (
              <p className="text-red-500 text-sm mt-1">{formErrors.membershipId}</p>
            )}
          </div>
        </div>
      </div>

      {/* 
        Cart Limit Warning
        Shows if cart is at max capacity (5 books)
      */}
      {cart.length >= 5 && (
        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg flex items-start space-x-3">
          <AlertCircle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" size={24} />
          <div>
            <p className="font-semibold text-yellow-800 dark:text-yellow-200">
              Maximum Reservation Limit Reached
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              You can reserve a maximum of 5 books at a time. Remove a book to add another.
            </p>
          </div>
        </div>
      )}

      {/* 
        Pickup Date Information
        Shows when books will be ready for pickup (from form or tomorrow)
      */}
      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
          <Calendar size={20} />
          <span className="font-semibold">Pickup Date: {getPickupDate()}</span>
        </div>
        <p className="text-sm text-green-600 dark:text-green-500 mt-1">
          Books will be ready for pickup at the University Library
        </p>
      </div>

      {/* 
        ===== CART ITEMS LIST =====
        Map through cart array to display each book
      */}
      <div className="space-y-4 mb-8">
        {cart.map((book) => (
          /**
           * Individual Cart Item Card
           * 
           * Key Prop:
           * - Required for list items
           * - Uses book.id as unique identifier
           */
          <div 
            key={book.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6"
          >
            {/* 
              Book Layout: Image + Details
              Responsive: Stacked on mobile, side by side on desktop
            */}
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Book Cover Thumbnail */}
              <div className="md:w-32 h-40 flex-shrink-0">
                <img
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128x160?text=No+Cover';
                  }}
                />
              </div>

              {/* Book Information */}
              <div className="flex-1">
                
                {/* Title and Author */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  by {book.author}
                </p>

                {/* Category Badge */}
                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded mb-4">
                  {book.category}
                </span>

                {/* 
                  Borrow Duration Selector
                  Dropdown to select 7, 14, or 21 days
                */}
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Clock size={16} className="inline mr-1" />
                    Borrow Duration
                  </label>
                  <select
                    value={durations[book.id] || 7}
                    onChange={(e) => handleDurationChange(book.id, Number(e.target.value))}
                    className="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                    <option value={21}>21 days</option>
                  </select>
                </div>

                {/* 
                  Due Date Display
                  Shows when book must be returned
                  Calculated based on selected duration
                */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar size={16} />
                  <span>
                    <strong>Due Date:</strong> {getDueDate(durations[book.id] || 7)}
                  </span>
                </div>

                {/* 
                  Remove Button
                  Removes this specific book from cart
                */}
                <button
                  onClick={() => handleRemove(book.id)}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 
        ===== CONFIRMATION SECTION =====
        Summary and confirm button
      */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        
        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Reservation Summary
          </h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Total Books:</span>
              <span className="font-semibold">{cart.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup Date:</span>
              <span className="font-semibold">{getPickupDate()}</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup Location:</span>
              <span className="font-semibold">University Library</span>
            </div>
          </div>
        </div>

        {/* 
          Proceed to Checkout Button
          - Large, prominent
          - Blue for primary action
          - Navigates to checkout page for final review
        */}
        <button
          onClick={handleProceedToCheckout}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
        >
          <CheckCircle size={24} />
          <span>Proceed to Checkout</span>
        </button>

        {/* Info Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          You'll review all details and accept terms before confirming your reservation.
        </p>
      </div>
    </div>
  );
}

export default Reservations;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is the purpose of the Reservations page?
 * A: Displays books in user's cart (reservation queue).
 *    Users can select borrow duration, view pickup/due dates, remove books, and confirm reservation.
 *    Acts as shopping cart before final confirmation.
 * 
 * Q: How is borrow duration managed?
 * A: Using useState with object structure:
 *    durations = { bookId: days }
 *    Example: { 1: 7, 5: 14, 8: 21 }
 *    Each book has independent duration selection (7, 14, or 21 days).
 *    Controlled select inputs bound to this state.
 * 
 * Q: Explain the durations initialization.
 * A: cart.reduce((acc, book) => ({ ...acc, [book.id]: 7 }), {})
 *    - reduce() builds object from array
 *    - acc: Accumulated object (starts as {})
 *    - For each book: Add entry { [book.id]: 7 }
 *    - Result: { 1: 7, 2: 7, 3: 7 } (all default to 7 days)
 *    Why reduce? Creates object with all cart books in one pass.
 * 
 * Q: How are pickup and due dates calculated?
 * A: Pickup Date = Today + 1 day (tomorrow)
 *    Due Date = Pickup Date + Duration
 *    
 *    Formula:
 *    Pickup: Date.now() + 1 day in milliseconds
 *    Due: Date.now() + (1 + duration) days in milliseconds
 *    
 *    Example:
 *    Today: Nov 21
 *    Pickup: Nov 22 (today + 1)
 *    Duration: 7 days
 *    Due: Nov 29 (pickup + 7)
 * 
 * Q: How is reservation ID generated?
 * A: generateReservationId():
 *    1. Math.random() → 0.123456789
 *    2. .toString(36) → "0.4fzyo..." (base-36: 0-9, a-z)
 *    3. .slice(2, 7) → "4fzyo" (5 characters)
 *    4. .toUpperCase() → "4FZYO"
 *    5. Prepend "RES-" → "RES-4FZYO"
 *    
 *    Why base-36? Compact, readable, alphanumeric.
 *    Note: Not secure, just for demo purposes.
 * 
 * Q: What happens when confirming reservation?
 * A: 1. Generate unique reservation ID
 *    2. Build confirmation message with all book titles
 *    3. Show alert with reservation details
 *    4. Clear entire cart using clearCart()
 *    5. Reset durations state to {}
 *    In real app: Would save to database, send email, update inventory.
 * 
 * Q: How is book removal handled?
 * A: handleRemove(bookId):
 *    1. Call removeFromCart(bookId) from context
 *    2. Remove from durations state: delete newDurations[bookId]
 *    3. Show alert confirmation
 *    Must update both cart (context) and durations (local state).
 * 
 * Q: What is the empty cart state?
 * A: Conditional rendering: if (cart.length === 0)
 *    Shows:
 *    - Shopping cart icon
 *    - "Your cart is empty" message
 *    - Link to Browse page
 *    Better UX than showing empty list.
 * 
 * Q: How does the duration dropdown work?
 * A: Controlled select input:
 *    - value={durations[book.id] || 7} (current duration or default)
 *    - onChange updates state: handleDurationChange(book.id, Number(e.target.value))
 *    - Number() converts string to number
 *    - Updates only that specific book's duration in state object
 * 
 * Q: What information is displayed for each book?
 * A: 1. Cover image (thumbnail)
 *    2. Title and author
 *    3. Category badge
 *    4. Borrow duration dropdown (7/14/21 days)
 *    5. Calculated due date
 *    6. Remove button
 *    All requirements from prompt are displayed.
 * 
 * Q: What is the cart limit warning?
 * A: Conditional rendering: {cart.length >= 5 && ...}
 *    Shows yellow alert box when cart is full (5 books).
 *    Informs user they've reached max limit.
 *    Must remove book to add another.
 */

