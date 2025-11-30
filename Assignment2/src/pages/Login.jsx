/**
 * Login Page Component - User Authentication
 * 
 * PURPOSE:
 * Allows users to log in to the library system.
 * Simple username-only authentication (no password for demo).
 * 
 * FEATURES:
 * 1. Username input field
 * 2. Login button
 * 3. Integration with AuthContext
 * 4. Automatic redirect to Home after login
 * 5. Session persistence in localStorage
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useState: Managing username input
 * - useAuth: Accessing authentication context
 * - useNavigate: Programmatic navigation after login
 * - Form submission: Handling login action
 * - Controlled input: Username value from state
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Login() {
  /**
   * STEP 1: Username State
   * 
   * Manages the username input value.
   * Controlled input bound to this state.
   */
  const [username, setUsername] = useState('');

  /**
   * STEP 2: Access Navigation and Auth Context
   * 
   * - navigate: Function to redirect to other pages
   * - login: Function from AuthContext to authenticate user
   */
  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * STEP 3: Handle Login Submission
   * 
   * Called when user clicks "Login" button.
   * 
   * Process:
   * 1. Prevent default form behavior (page reload)
   * 2. Validate username (not empty)
   * 3. Call login() from AuthContext with username
   * 4. Navigate to Home page
   * 
   * @param {Event} e - Form submit event
   * 
   * How login() works (from AuthContext):
   * - Stores username in state
   * - Saves to localStorage for persistence
   * - Sets isAuthenticated to true
   * - Updates user object: { username }
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Simple validation: Username must not be empty
    if (username.trim()) {
      // Call login from AuthContext
      login(username);
      
      // Redirect to home page
      navigate('/');
      
      // Show success message
      showToast(`Welcome, ${username}!`, 'success');
    } else {
      // Show error if username is empty
      showToast('Please enter a username', 'warning');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8 bg-gray-50">
      
      {/* 
        Login Card Container
        - Centered on page
        - Max width for better readability
        - Shadow and rounded corners
      */}
      <div className="w-full max-w-md">
        
        {/* 
          Card Content
          - White background with dark mode support
          - Padding for spacing
        */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
          
          {/* 
            Header Section
            - Icon + Title + Description
            - Centered text
          */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-black rounded-full mb-4">
              <LogIn className="text-white" size={28} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-black  mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access your library account
            </p>
          </div>

          {/* 
            Login Form
            - onSubmit: Handles form submission
            - Single username input (no password for demo)
          */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 
              USERNAME INPUT
              
              Controlled Input:
              - value={username}: Input value from state
              - onChange: Updates state on every keystroke
              
              Icon Integration:
              - User icon positioned inside input
              - Padding adjusted to accommodate icon
            */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-semibold text-gray-700  mb-2"
              >
                Username
              </label>
              <div className="relative">
                {/* User Icon */}
                <User 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={20} 
                />
                {/* Username Input */}
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 min-h-[44px] border border-gray-200  rounded-xl focus:outline-none focus:ring-2 focus:ring-black  text-base"
                  placeholder="Enter your username"
                  autoFocus
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 ">
                For demo purposes, enter any username (no password required)
              </p>
            </div>

            {/* 
              LOGIN BUTTON
              - type="submit": Triggers form onSubmit
              - Full width for prominence
              - Disabled if username is empty (better UX)
            */}
            <button
              type="submit"
              disabled={!username.trim()}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 min-h-[44px] rounded-xl font-semibold transition-colors text-base ${
                username.trim()
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </button>
          </form>

          {/* 
            Demo Info Box
            - Helpful information for users
            - Explains demo nature of login
          */}
          <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-xl">
            <p className="text-sm text-gray-700">
              <strong>Demo Mode:</strong> This is a demonstration login. In a real application, you would need proper authentication with password verification and security measures.
            </p>
          </div>

          {/* 
            Additional Links/Info
            - Could add "Forgot Password" or "Sign Up" links
            - For demo, just informational text
          */}
          <div className="mt-6 text-center text-sm text-gray-600 ">
            <p>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: How does the login system work?
 * A: Simple username-only authentication (demo):
 *    1. User enters username
 *    2. On submit, call login(username) from AuthContext
 *    3. AuthContext stores username in state and localStorage
 *    4. User is marked as authenticated (isAuthenticated = true)
 *    5. Redirect to home page with navigate('/')
 *    No password needed (demonstration only).
 * 
 * Q: What is the login() function doing?
 * A: login() is from AuthContext (line 48-63 in AuthContext.jsx):
 *    1. Creates user object: { username, loginTime }
 *    2. Sets user state: setUser({ username, loginTime })
 *    3. Saves to localStorage: JSON.stringify(user)
 *    4. Sets authenticated flag: setIsAuthenticated(true)
 *    Session persists across page refreshes.
 * 
 * Q: How does navigation after login work?
 * A: navigate('/') from React Router:
 *    - Programmatically changes route to home page
 *    - No page reload (SPA behavior)
 *    - User immediately sees home page after login
 *    Alternative: <Navigate to="/" /> component, but function is more flexible.
 * 
 * Q: What is a controlled input?
 * A: Input whose value is controlled by React state:
 *    <input value={username} onChange={(e) => setUsername(e.target.value)} />
 *    - value: Shows current state (single source of truth)
 *    - onChange: Updates state on every keystroke
 *    React controls the input value, not the DOM.
 * 
 * Q: Why disable the button when username is empty?
 * A: Better UX - prevents invalid submission:
 *    disabled={!username.trim()}
 *    - .trim() removes whitespace
 *    - If empty, button is disabled and grayed out
 *    - Visual feedback that username is required
 *    - Could also validate in handleSubmit, but this is proactive.
 * 
 * Q: What happens if username is empty on submit?
 * A: Two-layer validation:
 *    1. Button is disabled (can't click if empty)
 *    2. handleSubmit checks: if (!username.trim()) { alert(...) }
 *    If somehow submitted empty, shows alert error.
 *    Good to have both UI and logic validation.
 * 
 * Q: Why use e.preventDefault()?
 * A: Prevents default form submission (page reload).
 *    Without it, form would refresh page and lose state.
 *    We handle submission with JavaScript (call login, navigate).
 * 
 * Q: What is the autoFocus attribute?
 * A: HTML attribute that automatically focuses input on page load.
 *    User can start typing immediately without clicking.
 *    Better UX for login forms (cursor ready in username field).
 * 
 * Q: How does session persistence work?
 * A: AuthContext saves to localStorage:
 *    - login() saves: localStorage.setItem('user', JSON.stringify(user))
 *    - On app load: Check localStorage for existing user
 *    - If found: Restore session (isAuthenticated = true)
 *    - If not: User must login
 *    Session survives page refresh and browser close.
 * 
 * Q: Is this authentication secure?
 * A: NO - This is a demonstration only!
 *    Real authentication needs:
 *    - Password with encryption (bcrypt, etc.)
 *    - Server-side validation
 *    - JWT tokens or session cookies
 *    - HTTPS for secure transmission
 *    - Protection against attacks (XSS, CSRF)
 *    This is client-side only (anyone can "login").
 */

