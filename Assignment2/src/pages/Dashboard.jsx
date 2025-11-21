/**
 * User Dashboard Page Component
 * 
 * PURPOSE:
 * Central user profile showing all borrowing activity and statistics.
 * Provides quick access to current borrowings, history, and wishlist.
 * 
 * FEATURES:
 * 1. User statistics (total books borrowed lifetime)
 * 2. Currently borrowed books with remaining days countdown
 * 3. Quick actions (extend borrowing, cancel reservations)
 * 4. Reservation history overview
 * 5. Wishlist preview
 * 6. Navigation to detailed pages
 * 
 * KEY CONCEPTS FOR VIVA:
 * - Data aggregation from multiple contexts
 * - Date calculations for countdown timers
 * - Conditional rendering based on status
 * - One-time extension enforcement
 * - Cancel logic for unpicked reservations
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import {
  User,
  BookOpen,
  Clock,
  Calendar,
  Heart,
  History,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();
  const {
    getCurrentlyBorrowedBooks,
    getTotalBorrowedCount,
    getHistory,
    extendBorrowingPeriod,
    cancelReservation
  } = useBooks();
  const { getWishlistCount } = useWishlist();

  const [currentTime, setCurrentTime] = useState(new Date());

  /**
   * Update current time every minute for accurate countdowns
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  /**
   * Get dashboard data
   */
  const currentlyBorrowed = getCurrentlyBorrowedBooks();
  const totalBorrowed = getTotalBorrowedCount();
  const recentHistory = getHistory().slice(-5).reverse(); // Last 5 items
  const wishlistCount = getWishlistCount();

  /**
   * Calculate remaining days until due
   */
  const getRemainingDays = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  /**
   * Check if book is overdue
   */
  const isOverdue = (dueDate) => {
    return getRemainingDays(dueDate) < 0;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  /**
   * Handle extend borrowing period
   */
  const handleExtend = (reservationId) => {
    if (window.confirm('Extend borrowing period by 7 days? This can only be done once per book.')) {
      const result = extendBorrowingPeriod(reservationId);
      if (result.success) {
        alert('✅ ' + result.message);
      } else {
        alert('❌ ' + result.message);
      }
    }
  };

  /**
   * Handle cancel reservation
   */
  const handleCancel = (reservationId) => {
    if (window.confirm('Cancel this reservation? This cannot be undone.')) {
      const result = cancelReservation(reservationId);
      if (result.success) {
        alert('✅ ' + result.message);
      } else {
        alert('❌ ' + result.message);
      }
    }
  };

  /**
   * Get status badge color
   */
  const getStatusBadge = (item) => {
    if (item.status === 'cancelled') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
          <XCircle size={12} className="mr-1" />
          Cancelled
        </span>
      );
    }
    if (item.status === 'returned') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
          <CheckCircle size={12} className="mr-1" />
          Returned
        </span>
      );
    }
    if (!item.pickedUp) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
          <Clock size={12} className="mr-1" />
          Not Picked Up
        </span>
      );
    }
    if (isOverdue(item.dueDate)) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
          <AlertCircle size={12} className="mr-1" />
          Overdue
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
        <BookOpen size={12} className="mr-1" />
        Borrowed
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
          <User size={32} className="mr-3" />
          User Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.username || 'Guest'}! Here's your borrowing overview.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Currently Borrowed */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <BookOpen size={32} className="opacity-80" />
            <span className="text-3xl font-bold">{currentlyBorrowed.length}</span>
          </div>
          <h3 className="text-sm font-semibold opacity-90">Currently Borrowed</h3>
          <p className="text-xs opacity-75 mt-1">Active borrowings</p>
        </div>

        {/* Total Books Borrowed */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={32} className="opacity-80" />
            <span className="text-3xl font-bold">{totalBorrowed}</span>
          </div>
          <h3 className="text-sm font-semibold opacity-90">Total Borrowed</h3>
          <p className="text-xs opacity-75 mt-1">Lifetime counter</p>
        </div>

        {/* Wishlist Count */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Heart size={32} className="opacity-80" />
            <span className="text-3xl font-bold">{wishlistCount}</span>
          </div>
          <h3 className="text-sm font-semibold opacity-90">Wishlist Books</h3>
          <p className="text-xs opacity-75 mt-1">Want to read</p>
        </div>

        {/* Overdue Books */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle size={32} className="opacity-80" />
            <span className="text-3xl font-bold">
              {currentlyBorrowed.filter(item => isOverdue(item.dueDate)).length}
            </span>
          </div>
          <h3 className="text-sm font-semibold opacity-90">Overdue Books</h3>
          <p className="text-xs opacity-75 mt-1">Need attention</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Currently Borrowed Books */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Currently Borrowed Books Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <BookOpen size={24} className="mr-2" />
                Currently Borrowed Books
              </h2>
              <Link
                to="/history"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {currentlyBorrowed.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No books currently borrowed
                </p>
                <Link
                  to="/browse"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Books
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {currentlyBorrowed.map((item) => {
                  const remainingDays = getRemainingDays(item.dueDate);
                  const overdue = isOverdue(item.dueDate);
                  
                  return (
                    <div
                      key={item.reservationId}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Book Cover */}
                        <div className="w-16 h-24 flex-shrink-0">
                          <img
                            src={item.book.coverUrl}
                            alt={item.book.title}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64x96?text=No+Cover';
                            }}
                          />
                        </div>

                        {/* Book Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                {item.book.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                by {item.book.author}
                              </p>
                            </div>
                            {getStatusBadge(item)}
                          </div>

                          {/* Dates */}
                          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Calendar size={14} className="mr-1" />
                              <span>Borrowed: {formatDate(item.borrowDate)}</span>
                            </div>
                            <div className={`flex items-center ${overdue ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                              <Clock size={14} className="mr-1" />
                              <span>Due: {formatDate(item.dueDate)}</span>
                            </div>
                          </div>

                          {/* Remaining Days */}
                          <div className="mb-3">
                            {overdue ? (
                              <div className="flex items-center text-red-600 dark:text-red-400 text-sm font-semibold">
                                <AlertCircle size={16} className="mr-2" />
                                <span>Overdue by {Math.abs(remainingDays)} days</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                <Clock size={16} className="mr-2" />
                                <span>
                                  {remainingDays === 0 ? 'Due today' : 
                                   remainingDays === 1 ? '1 day remaining' :
                                   `${remainingDays} days remaining`}
                                </span>
                              </div>
                            )}
                            {item.extended && (
                              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                                <CheckCircle size={12} className="mr-1" />
                                Extended once
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            {/* Extend Button - Only if not extended and not overdue */}
                            {!item.extended && !overdue && item.pickedUp && (
                              <button
                                onClick={() => handleExtend(item.reservationId)}
                                className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                <Plus size={14} className="mr-1" />
                                Extend 7 Days
                              </button>
                            )}

                            {/* Cancel Button - Only if not picked up */}
                            {!item.pickedUp && (
                              <button
                                onClick={() => handleCancel(item.reservationId)}
                                className="flex items-center px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                              >
                                <Minus size={14} className="mr-1" />
                                Cancel Reservation
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Quick Links & Summary */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/browse"
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <BookOpen size={20} className="mr-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Browse Books
                  </span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <Heart size={20} className="mr-3 text-pink-600 dark:text-pink-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    My Wishlist
                  </span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </Link>

              <Link
                to="/history"
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <History size={20} className="mr-3 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Full History
                  </span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </Link>

              <Link
                to="/reservations"
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <Calendar size={20} className="mr-3 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    My Cart
                  </span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Recent Activity
              </h2>
              <Link
                to="/history"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </Link>
            </div>

            {recentHistory.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-4 text-sm">
                No activity yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentHistory.map((item) => (
                  <div
                    key={item.reservationId}
                    className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <div className="w-10 h-14 flex-shrink-0">
                      <img
                        src={item.book.coverUrl}
                        alt={item.book.title}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40x56?text=Book';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {item.book.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {formatDate(item.borrowDate)}
                      </p>
                      <div className="mt-1">
                        {getStatusBadge(item)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  Important Reminder
                </h3>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Late returns incur a fine of $2.00 per day per book. 
                  You can extend borrowing once per book by 7 days.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
