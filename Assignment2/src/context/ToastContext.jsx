/**
 * Toast Notification Component
 * 
 * PURPOSE:
 * Provides user-friendly notifications for success/error messages.
 * Better UX than browser alerts.
 * 
 * FEATURES:
 * - Auto-dismiss after 3 seconds
 * - Different types: success, error, info, warning
 * - Animated entrance/exit
 * - Positioned at top-right of screen
 * - Can show multiple toasts
 * 
 * USAGE:
 * import { ToastProvider, useToast } from './ToastContext';
 * 
 * const { showToast } = useToast();
 * showToast('Success!', 'success');
 * showToast('Error occurred', 'error');
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * Remove a toast by ID
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Show a toast notification
   * 
   * @param {string} message - The message to display
   * @param {string} type - Type: 'success', 'error', 'info', 'warning'
   * @param {number} duration - How long to show (milliseconds)
   */
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  /**
   * Get icon based on toast type
   */
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  /**
   * Get colors based on toast type
   */
  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const value = {
    showToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              ${getColors(toast.type)}
              px-6 py-4 rounded-lg shadow-lg
              flex items-center space-x-3
              animate-slideIn pointer-events-auto
              min-w-[300px] max-w-[400px]
            `}
          >
            <div className="flex-shrink-0">
              {getIcon(toast.type)}
            </div>
            <p className="flex-1 text-sm font-medium">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Custom hook to use toast notifications
 */
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}
