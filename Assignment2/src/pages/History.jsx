/*
  ===== BORROWING HISTORY PAGE =====
  This page displays the user's complete borrowing history.
  
  Purpose:
  - Show all past and current borrowings
  - Display borrow dates, due dates, and return status
  - Allow filtering by status (borrowed/returned)
  - Mark books as returned
  
  Features:
  - List of all borrowing records
  - Status badges (borrowed/returned)
  - Date information (borrowed, due, returned)
  - Filter by status
  - Mark as returned functionality
  - Clear history option
*/

import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, CheckCircle, Clock, History as HistoryIcon, Trash2 } from 'lucide-react';

/*
  ===== HISTORY COMPONENT =====
  Main component for the borrowing history page
*/
export default function History() {
  
  /*
    ===== CONTEXT & HOOKS =====
    Access history functions and navigation
  */
  const { getHistory, markAsReturned, clearHistory } = useBooks();
  const { showToast } = useToast();
  const navigate = useNavigate();

  /*
    ===== STATE MANAGEMENT =====
    Filter state to show all, borrowed, or returned items
  */
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'borrowed', 'returned'

  /*
    ===== GET FILTERED HISTORY =====
    Get history based on selected filter
  */
  const allHistory = getHistory();
  const filteredHistory = filterStatus === 'all' 
    ? allHistory 
    : getHistory(filterStatus);

  /*
    ===== FUNCTION: HANDLE MARK AS RETURNED =====
    Marks a borrowed book as returned
    
    Parameters:
    - reservationId: ID of the reservation to mark as returned
  */
  const handleReturn = (reservationId) => {
    const result = markAsReturned(reservationId);
    if (result.success) {
      showToast('Book marked as returned!', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  /*
    ===== FUNCTION: HANDLE CLEAR HISTORY =====
    Clears all borrowing history
  */
  const handleClearHistory = () => {
    const result = clearHistory();
    if (result.success) {
      showToast('History cleared successfully!', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  /*
    ===== FUNCTION: FORMAT DATE =====
    Formats ISO date string to readable format
    
    Parameters:
    - dateString: ISO date string
    
    Returns:
    - Formatted date string (e.g., "November 21, 2025")
  */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /*
    ===== FUNCTION: CHECK IF OVERDUE =====
    Checks if a borrowed book is past its due date
    
    Parameters:
    - dueDate: Due date string
    - status: Current status of the book
    
    Returns:
    - Boolean: true if overdue, false otherwise
  */
  const isOverdue = (dueDate, status) => {
    if (status === 'returned') return false;
    const due = new Date(dueDate);
    const today = new Date();
    return today > due;
  };

  /*
    ===== RENDER: EMPTY STATE =====
    Shows when history is empty
  */
  if (allHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50  py-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
              Borrowing History
            </h1>
            <p className="text-gray-600 ">
              Track your reading journey
            </p>
          </div>

          {/* Empty State Message */}
          <div className="bg-white  rounded-xl shadow-md p-12 text-center">
            <HistoryIcon size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
              No borrowing history yet
            </h2>
            <p className="text-gray-600  mb-6">
              Start reserving books to build your borrowing history!
            </p>
            <button
              onClick={() => navigate('/browse')}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
    ===== RENDER: HISTORY WITH RECORDS =====
    Shows all borrowing history records
  */
  return (
    <div className="min-h-screen bg-gray-50  py-8 md:py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 
          ===== PAGE HEADER =====
          Shows title and total count
        */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
            Borrowing History
          </h1>
          <p className="text-gray-600 ">
            {allHistory.length} {allHistory.length === 1 ? 'record' : 'records'} in total
          </p>
        </div>

        {/* 
          ===== FILTER BUTTONS =====
          Toggle between all, borrowed, and returned
        */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 min-h-[44px] rounded-xl font-medium transition-colors text-sm md:text-base ${
              filterStatus === 'all'
                ? 'bg-black text-white'
                : 'bg-white  text-gray-700  hover:bg-gray-100'
            }`}
          >
            All ({allHistory.length})
          </button>
          <button
            onClick={() => setFilterStatus('borrowed')}
            className={`px-4 py-2 min-h-[44px] rounded-xl font-medium transition-colors text-sm md:text-base ${
              filterStatus === 'borrowed'
                ? 'bg-gray-800 text-white'
                : 'bg-white  text-gray-700  hover:bg-gray-100'
            }`}
          >
            Borrowed ({getHistory('borrowed').length})
          </button>
          <button
            onClick={() => setFilterStatus('returned')}
            className={`px-4 py-2 min-h-[44px] rounded-xl font-medium transition-colors text-sm md:text-base ${
              filterStatus === 'returned'
                ? 'bg-black text-white'
                : 'bg-white  text-gray-700  hover:bg-gray-100'
            }`}
          >
            Returned ({getHistory('returned').length})
          </button>

          {/* Clear History Button */}
          {allHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="ml-auto px-4 py-2 min-h-[44px] bg-black text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm md:text-base"
            >
              <Trash2 size={18} />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* 
          ===== HISTORY LIST =====
          Shows filtered history records
        */}
        {filteredHistory.length === 0 ? (
          <div className="bg-white  rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 ">
              No {filterStatus} records found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const overdue = isOverdue(item.dueDate, item.status);

              return (
                <div 
                  key={index}
                  className="bg-white  rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* 
                      ===== BOOK COVER =====
                      Shows book thumbnail
                    */}
                    <div className="flex-shrink-0">
                      <img 
                        src={item.book.coverUrl || '/placeholder-book.jpg'} 
                        alt={item.book.title}
                        className="w-24 h-32 object-cover rounded shadow-md cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate(`/book/${item.book.id}`)}
                      />
                    </div>

                    {/* 
                      ===== BOOK & RESERVATION DETAILS =====
                      Shows all information about the borrowing
                    */}
                    <div className="flex-1">
                      
                      {/* Book Title & Author */}
                      <h3 
                        className="text-xl font-bold text-black  mb-1 cursor-pointer hover:text-gray-600"
                        onClick={() => navigate(`/book/${item.book.id}`)}
                      >
                        {item.book.title}
                      </h3>
                      <p className="text-gray-600  mb-3">
                        by {item.book.author}
                      </p>

                      {/* Reservation ID */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500  mb-3">
                        <BookOpen size={16} />
                        <span>Reservation ID: <strong>{item.reservationId}</strong></span>
                      </div>

                      {/* Date Information Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        
                        {/* Borrow Date */}
                        <div className="flex items-start space-x-2">
                          <Calendar size={18} className="text-black mt-1" />
                          <div>
                            <p className="text-xs text-gray-500 ">Borrowed</p>
                            <p className="text-sm font-semibold text-gray-700 ">
                              {formatDate(item.borrowDate)}
                            </p>
                          </div>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-start space-x-2">
                          <Clock size={18} className={overdue ? 'text-red-500 mt-1' : 'text-orange-500 mt-1'} />
                          <div>
                            <p className="text-xs text-gray-500 ">Due Date</p>
                            <p className={`text-sm font-semibold ${
                              overdue 
                                ? 'text-red-600 dark:text-red-400' 
                                : 'text-gray-700 '
                            }`}>
                              {formatDate(item.dueDate)}
                              {overdue && <span className="ml-2 text-xs">(OVERDUE)</span>}
                            </p>
                          </div>
                        </div>

                        {/* Return Date (if returned) */}
                        {item.status === 'returned' && (
                          <div className="flex items-start space-x-2">
                            <CheckCircle size={18} className="text-green-800 mt-1" />
                            <div>
                              <p className="text-xs text-gray-500 ">Returned</p>
                              <p className="text-sm font-semibold text-gray-700 ">
                                {formatDate(item.returnDate)}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Duration (if not returned) */}
                        {item.status === 'borrowed' && (
                          <div className="flex items-start space-x-2">
                            <Clock size={18} className="text-gray-500 mt-1" />
                            <div>
                              <p className="text-xs text-gray-500 ">Duration</p>
                              <p className="text-sm font-semibold text-gray-700 ">
                                {item.duration} days
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status Badge & Actions */}
                      <div className="flex items-center justify-between">
                        
                        {/* Status Badge */}
                        <span 
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'returned' 
                            ? 'bg-green-100 text-green-900'
                            : overdue
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}>
                          {item.status === 'returned' ? '✓ Returned' : overdue ? '⚠ Overdue' : '📖 Borrowed'}
                        </span>

                        {/* Mark as Returned Button (only for borrowed books) */}
                        {item.status === 'borrowed' && (
                          <button
                            onClick={() => handleReturn(item.reservationId)}
                            className="px-4 py-2 min-h-[44px] bg-black text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm md:text-base"
                          >
                            <CheckCircle size={18} />
                            <span>Mark as Returned</span>
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
  );
}
