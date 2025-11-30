/**
 * Reservation Confirmation Page Component
 * 
 * PURPOSE:
 * Display confirmation details after successful reservation.
 * Shows reservation ID, QR code for pickup, and email confirmation.
 * 
 * FEATURES:
 * 1. Unique reservation ID display
 * 2. QR code for pickup (scannable at library)
 * 3. Email confirmation message
 * 4. Complete reservation summary
 * 5. Navigation options (view history, browse more books)
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useLocation: Receive state from previous page
 * - QRCodeSVG: Generate QR code from reservation data
 * - State validation: Redirect if no reservation data
 * - Print functionality: Allow users to print confirmation
 */

import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { 
  CheckCircle, 
  Mail, 
  Calendar, 
  User, 
  IdCard, 
  Download,
  Printer,
  Home,
  BookOpen,
  Clock
} from 'lucide-react';

function ReservationConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get reservation data from navigation state
  const confirmationData = location.state;

  /**
   * Redirect to cart if no confirmation data
   */
  useEffect(() => {
    if (!confirmationData) {
      navigate('/reservations', { replace: true });
    }
  }, [confirmationData, navigate]);

  if (!confirmationData) {
    return null; // Will redirect via useEffect
  }

  const { 
    reservationId, 
    userDetails, 
    books, 
    pickupDate, 
    totalBooks,
    timestamp 
  } = confirmationData;

  /**
   * Format Date for Display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Format Time for Display
   */
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Generate QR Code Data
   * Contains all essential information for library staff
   */
  const qrData = JSON.stringify({
    reservationId,
    name: userDetails.fullName,
    membershipId: userDetails.membershipId,
    pickupDate: pickupDate,
    totalBooks: totalBooks,
    timestamp: timestamp
  });

  /**
   * Handle Print Confirmation
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * Handle Download QR Code
   */
  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `reservation-${reservationId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
      
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-black  mb-2">
          Reservation Confirmed!
        </h1>
        <p className="text-gray-600 ">
          Your books have been successfully reserved
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        
        {/* Reservation ID Card */}
        <div className="bg-black rounded-xl shadow-lg p-6 text-white">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-1">Your Reservation ID</p>
            <p className="text-3xl font-bold tracking-wider mb-2">{reservationId}</p>
            <p className="text-sm opacity-90">
              Please save this ID for your records
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column - User Details */}
          <div className="space-y-6">
            
            {/* User Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-black  mb-4">
                Reservation Details
              </h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <User size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 ">Full Name</p>
                    <p className="font-semibold text-black ">
                      {userDetails.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 ">Email Address</p>
                    <p className="font-semibold text-black ">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <IdCard size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 ">Membership ID</p>
                    <p className="font-semibold text-black ">
                      {userDetails.membershipId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 ">Pickup Date</p>
                    <p className="font-semibold text-black ">
                      {formatDate(pickupDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <BookOpen size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 ">Total Books</p>
                    <p className="font-semibold text-black ">
                      {totalBooks} {totalBooks === 1 ? 'book' : 'books'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 ">Confirmed At</p>
                    <p className="font-semibold text-black ">
                      {formatDate(timestamp)} at {formatTime(timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Confirmation Message */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Mail size={24} className="text-black flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Email Confirmation Sent
                  </h3>
                  <p className="text-sm text-gray-700">
                    A confirmation email has been sent to <strong>{userDetails.email}</strong> with 
                    your reservation details and pickup instructions.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Please check your spam folder if you don't receive it within 5 minutes.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - QR Code */}
          <div className="space-y-6">
            
            {/* QR Code Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-black  mb-4 text-center">
                Pickup QR Code
              </h2>
              
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <QRCodeSVG
                    id="qr-code"
                    value={qrData}
                    size={220}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>

              <div className="text-center text-sm text-gray-600  mb-4">
                <p className="mb-2">Show this QR code at the library to collect your books</p>
                <p className="text-xs">Or provide your Reservation ID: <strong>{reservationId}</strong></p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadQR}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border-2 border-gray-200  text-gray-700  rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  <Printer size={16} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Pickup Instructions */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-3">
                Pickup Instructions
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Bring your student ID and library membership card</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Show this QR code or provide your reservation ID</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Books must be picked up by {formatDate(pickupDate)}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Visit the circulation desk at University Library</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Reserved Books List */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-black  mb-4">
            Reserved Books
          </h2>
          
          <div className="space-y-3">
            {books.map((book, index) => (
              <div 
                key={book.id}
                className="flex items-center gap-4 p-3 border border-gray-200  rounded-xl"
              >
                <span className="text-lg font-bold text-gray-400 w-6">
                  {index + 1}.
                </span>
                <div className="w-12 h-16 flex-shrink-0">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48x64?text=No+Cover';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black  text-sm">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 ">
                    by {book.author}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-gray-600">{book.duration} days</p>
                  <p className="text-gray-500">
                    Due: {new Date(book.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/history"
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold"
          >
            <BookOpen size={20} />
            <span>View History</span>
          </Link>
          <Link
            to="/browse"
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-200  text-gray-700  rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          >
            <BookOpen size={20} />
            <span>Browse More Books</span>
          </Link>
        </div>

        {/* Important Notice */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800 text-center">
            <strong>Important:</strong> Your reservation will be held for 3 days. 
            Books not picked up by then will be released for other users.
          </p>
        </div>

      </div>

      </div>
    </div>
  );
}

export default ReservationConfirmation;
