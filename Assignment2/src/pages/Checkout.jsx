/**
 * Checkout Page Component - Reservation Summary & Confirmation
 * 
 * PURPOSE:
 * Display comprehensive summary of reservation before final confirmation.
 * Users review all details, accept terms, and complete the reservation.
 * 
 * FEATURES:
 * 1. Summary of all reserved books with pickup and due dates
 * 2. Late return policy and fine details ($2 per day per book)
 * 3. Total number of books being reserved
 * 4. Terms and conditions checkbox
 * 5. Navigate to confirmation page after acceptance
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useNavigate: Navigate to confirmation page with state
 * - useState: Manage terms acceptance checkbox
 * - Array.map: Display book summaries
 * - Date formatting: Display readable dates
 * - State passing: Send reservation data to confirmation page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useToast } from '../context/ToastContext';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ShoppingCart, 
  FileText,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, addToHistory } = useBooks();
  const { showToast } = useToast();

  /**
   * State Management
   */
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [defaultPickupDate] = useState(() => new Date(Date.now() + 24 * 60 * 60 * 1000));

  /**
   * Get reservation details from sessionStorage
   * (Set by Reservations page when user clicks "Proceed to Checkout")
   */
  const reservationDetails = JSON.parse(sessionStorage.getItem('reservationDetails') || '{}');
  const { formData = {}, durations = {} } = reservationDetails;

  /**
   * Generate Unique Reservation ID
   */
  const generateReservationId = () => {
    return `RES-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  };

  /**
   * Format Date for Display
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Calculate Due Date
   */
  const calculateDueDate = (pickupDate, duration) => {
    if (!pickupDate) return 'Not specified';
    const pickup = new Date(pickupDate);
    const due = new Date(pickup.getTime() + duration * 24 * 60 * 60 * 1000);
    return due.toISOString();
  };

  /**
   * Handle Final Confirmation
   * 
   * Process:
   * 1. Validate terms accepted
   * 2. Generate reservation ID
   * 3. Add all books to history
   * 4. Clear cart
   * 5. Navigate to confirmation page with data
   */
  const handleFinalConfirmation = () => {
    if (!termsAccepted) {
      showToast('Please accept the terms and conditions to proceed', 'warning');
      return;
    }

    setIsProcessing(true);

    // Generate main reservation ID
    const mainReservationId = generateReservationId();

    // Get pickup date
    const pickupDate = formData.pickupDate 
      ? new Date(formData.pickupDate).toISOString()
      : defaultPickupDate.toISOString();

    // Prepare books with their details
    const reservedBooks = cart.map(book => {
      const duration = durations[book.id] || 7;
      const dueDate = calculateDueDate(pickupDate, duration);
      
      return {
        ...book,
        duration,
        pickupDate,
        dueDate,
        reservationId: generateReservationId()
      };
    });

    // Add each book to history
    reservedBooks.forEach(book => {
      addToHistory({
        book,
        borrowDate: pickupDate,
        dueDate: book.dueDate,
        duration: book.duration,
        reservationId: book.reservationId,
      });
    });

    // Prepare confirmation data
    const confirmationData = {
      reservationId: mainReservationId,
      userDetails: formData,
      books: reservedBooks,
      pickupDate,
      totalBooks: cart.length,
      timestamp: new Date().toISOString()
    };

    // Clear cart
    clearCart();

    // Clear session storage
    sessionStorage.removeItem('reservationDetails');

    // Navigate to confirmation page with data
    navigate('/confirmation', { 
      state: confirmationData,
      replace: true 
    });
  };

  /**
   * Handle Back to Cart
   */
  const handleBack = () => {
    navigate('/reservations');
  };

  /**
   * Redirect if cart is empty
   */
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-black  mb-2">
            No items in cart
          </h2>
          <p className="text-gray-600  mb-6">
            Add books to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
      
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-black  mb-2">
          Checkout & Confirmation
        </h1>
        <p className="text-gray-600 ">
          Review your reservation details before confirming
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* User Details Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-black  mb-4 flex items-center">
              <FileText size={24} className="mr-2" />
              Reservation Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 ">Full Name:</span>
                <p className="font-semibold text-black ">
                  {formData.fullName || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-gray-600 ">Email:</span>
                <p className="font-semibold text-black ">
                  {formData.email || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-gray-600 ">Membership ID:</span>
                <p className="font-semibold text-black ">
                  {formData.membershipId || 'Not specified'}
                </p>
              </div>
              <div>
                <span className="text-gray-600 ">Pickup Date:</span>
                <p className="font-semibold text-black ">
                  {formatDate(formData.pickupDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Reserved Books List */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-black  mb-4 flex items-center">
              <ShoppingCart size={24} className="mr-2" />
              Reserved Books ({cart.length})
            </h2>
            
            <div className="space-y-4">
              {cart.map((book) => {
                const duration = durations[book.id] || 7;
                const dueDate = calculateDueDate(formData.pickupDate, duration);
                
                return (
                  <div 
                    key={book.id}
                    className="flex gap-4 p-4 border border-gray-200  rounded-xl"
                  >
                    {/* Book Cover */}
                    <div className="w-16 h-20 flex-shrink-0">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x80?text=No+Cover';
                        }}
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-black ">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600  mb-2">
                        by {book.author}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center text-gray-600 ">
                          <Clock size={14} className="mr-1" />
                          <span>{duration} days</span>
                        </div>
                        <div className="flex items-center text-gray-600 ">
                          <Calendar size={14} className="mr-1" />
                          <span>Due: {formatDate(dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Late Return Policy */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <AlertTriangle size={24} className="mr-2" />
              Late Return Policy
            </h2>
            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Fine Rate:</strong> $2.00 per day per book for late returns</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Grace Period:</strong> No grace period - fines start immediately after due date</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Maximum Fine:</strong> Up to $50.00 per book (25 days late)</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Payment:</strong> Fines must be paid before borrowing additional books</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Renewal:</strong> Books can be renewed once if no holds exist (adds 7 days)</span>
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-black  mb-4">
              Terms and Conditions
            </h2>
            <div className="text-sm text-gray-600  space-y-2 mb-4 max-h-48 overflow-y-auto border border-gray-200  rounded p-4">
              <p className="font-semibold text-black ">Library Book Borrowing Agreement</p>
              
              <p>By accepting these terms, you agree to:</p>
              
              <ol className="list-decimal ml-4 space-y-1">
                <li>Return all borrowed books by their due dates</li>
                <li>Pay all late fees at the rate of $2.00 per day per book</li>
                <li>Take responsibility for any damage or loss of borrowed books</li>
                <li>Maintain books in good condition (no writing, highlighting, or damage)</li>
                <li>Present valid student ID and membership card at pickup</li>
                <li>Not transfer or lend books to other individuals</li>
                <li>Adhere to library policies regarding noise and conduct</li>
                <li>Report any damaged books immediately upon pickup</li>
                <li>Pay replacement costs for lost or severely damaged books</li>
                <li>Accept that borrowing privileges may be suspended for unpaid fines</li>
              </ol>
              
              <p className="mt-2">
                <strong>Pickup Instructions:</strong> Books must be picked up within 3 days of the 
                reservation date or the reservation will be cancelled automatically.
              </p>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 text-black border-gray-200 rounded focus:ring-2 focus:ring-black"
              />
              <span className="text-sm text-gray-700 ">
                I have read and agree to the terms and conditions, including the late return policy 
                and my responsibilities as a borrower.
              </span>
            </label>
          </div>

        </div>

        {/* Sidebar - Right Column */}
        <div className="lg:col-span-1">
          
          {/* Order Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 border border-gray-200">
            <h2 className="text-xl font-semibold text-black  mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 ">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 ">Total Books:</span>
                <span className="font-semibold text-black ">
                  {cart.length} {cart.length === 1 ? 'book' : 'books'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 ">Pickup Date:</span>
                <span className="font-semibold text-black ">
                  {new Date(formData.pickupDate || defaultPickupDate)
                    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 ">Borrowing Fee:</span>
                <span className="font-semibold text-black">
                  FREE
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 ">Late Fee (if applicable):</span>
                <span className="font-semibold text-red-600">
                  $2.00/day/book
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleFinalConfirmation}
                disabled={!termsAccepted || isProcessing}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 min-h-[44px] rounded-xl font-semibold transition-colors text-base ${
                  termsAccepted && !isProcessing
                    ? 'bg-black hover:bg-gray-800 text-white'
                    : 'bg-gray-300 text-gray-500  cursor-not-allowed'
                }`}
              >
                <CheckCircle size={20} />
                <span>{isProcessing ? 'Processing...' : 'Confirm Reservation'}</span>
                <ArrowRight size={20} />
              </button>

              <button
                onClick={handleBack}
                disabled={isProcessing}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 min-h-[44px] border-2 border-gray-200  text-gray-700  rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base"
              >
                <ArrowLeft size={20} />
                <span>Back to Cart</span>
              </button>
            </div>

            {/* Info Note */}
            <p className="text-xs text-gray-500  mt-4 text-center">
              By confirming, you agree to all terms and policies
            </p>
          </div>

        </div>

      </div>

      </div>
    </div>
  );
}

export default Checkout;
