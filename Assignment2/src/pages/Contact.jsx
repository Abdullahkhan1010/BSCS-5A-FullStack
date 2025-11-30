/**
 * Contact Page Component - Contact Form with Validation
 * 
 * PURPOSE:
 * Allows users to send messages to the library administration.
 * Includes form validation to ensure data quality.
 * 
 * FEATURES:
 * 1. Contact form with 4 fields (Name, Email, Subject, Message)
 * 2. Client-side validation (no external libraries)
 * 3. Error display for invalid inputs
 * 4. Success message and form reset on valid submission
 * 5. Library contact information display
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useState: Managing form fields and validation errors
 * - Controlled inputs: Form values controlled by React state
 * - Form validation: Checking data before submission
 * - Event handling: onSubmit, onChange
 * - Conditional rendering: Showing errors only when needed
 */

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

function Contact() {
  const { showToast } = useToast();
  
  /**
   * STEP 1: Form State Management
   * 
   * Using useState to manage form field values.
   * Each field has its own state property.
   * 
   * Initial State: All fields empty strings
   * 
   * Why separate object?
   * - Organizes related data
   * - Easy to reset all fields at once
   * - Can spread in one update
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  /**
   * STEP 2: Validation Errors State
   * 
   * Stores error messages for each field.
   * Only populated when validation fails.
   * 
   * Structure: { fieldName: 'error message' }
   * Empty object = no errors
   * 
   * Example: { email: 'Email must contain @' }
   */
  const [errors, setErrors] = useState({});

  /**
   * STEP 3: Handle Input Changes
   * 
   * Updates form state when user types in any field.
   * Works for all inputs using the 'name' attribute.
   * 
   * @param {Event} e - Input change event
   * 
   * How it works:
   * 1. Extract field name and value from event
   * 2. Update only that specific field in state
   * 3. Clear error for that field (if any)
   * 
   * Computed Property Name:
   * [e.target.name] - Uses variable as object key
   * Example: If name="email", becomes { email: value }
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * STEP 4: Validation Function
   * 
   * ===== VALIDATION LOGIC =====
   * 
   * This function checks if form data is valid before submission.
   * Returns true if all validations pass, false otherwise.
   * 
   * VALIDATION RULES:
   * 1. Name: Must not be empty (length > 0)
   * 2. Email: Must contain "@" symbol (basic email check)
   * 3. Message: Must be longer than 5 characters (meaningful message)
   * 4. Subject: Optional, no validation required
   * 
   * How it works:
   * - Create empty errors object
   * - Check each field against its rule
   * - If invalid, add error message to errors object
   * - If errors object is empty, validation passed
   * - Otherwise, validation failed
   * 
   * @returns {boolean} - true if valid, false if invalid
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate Name: Must not be empty
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate Email: Must contain @ symbol
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }

    // Validate Message: Must be longer than 5 characters
    if (formData.message.length <= 5) {
      newErrors.message = 'Message must be longer than 5 characters';
    }

    // Update errors state
    setErrors(newErrors);

    // Return true if no errors (object is empty)
    // Object.keys() returns array of object keys
    // If length is 0, no errors exist
    return Object.keys(newErrors).length === 0;
  };

  /**
   * STEP 5: Handle Form Submission
   * 
   * Triggered when user clicks Submit button.
   * 
   * @param {Event} e - Form submit event
   * 
   * Process:
   * 1. Prevent default form submission (page refresh)
   * 2. Validate form data
   * 3. If invalid: Show errors (already set by validateForm)
   * 4. If valid: Show success alert and clear form
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Run validation
    if (validateForm()) {
      // Valid: Show success message
      showToast('Message sent to Librarian! We will get back to you soon.', 'success');
      
      // Clear form (reset to initial state)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear any remaining errors
      setErrors({});
    } else {
      // Invalid: Errors are already shown (set by validateForm)
      // User can see red error messages under each invalid field
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black  mb-3">
          Contact Us
        </h1>
        <p className="text-gray-600  max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* 
        Two-Column Layout:
        - Left: Contact Form
        - Right: Contact Information
        
        Responsive: Stacked on mobile, side by side on desktop
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 
          ===== LEFT COLUMN: CONTACT FORM =====
        */}
        <div className="bg-white  rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-black  mb-6">
            Send us a Message
          </h2>

          {/* 
            Contact Form
            - onSubmit: Handles form submission
            - Controlled inputs: All values from state
          */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 
              NAME INPUT
              Controlled input bound to formData.name
            */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-semibold text-gray-700  mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 min-h-[44px] border rounded-xl focus:outline-none focus:ring-2  text-base ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200  focus:ring-black'
                }`}
                placeholder="Your full name"
              />
              {/* 
                Error Message Display
                - Conditional rendering: Only shows if error exists
                - Red text for visibility
              */}
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* 
              EMAIL INPUT
              Controlled input bound to formData.email
            */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-gray-700  mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 min-h-[44px] border rounded-xl focus:outline-none focus:ring-2  text-base ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200  focus:ring-black'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 
              SUBJECT INPUT
              Optional field - no validation required
            */}
            <div>
              <label 
                htmlFor="subject" 
                className="block text-sm font-semibold text-gray-700  mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-200  rounded-xl focus:outline-none focus:ring-2 focus:ring-black  text-base"
                placeholder="What is this about?"
              />
            </div>

            {/* 
              MESSAGE TEXTAREA
              Controlled textarea bound to formData.message
            */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-semibold text-gray-700  mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2  resize-none text-base ${
                  errors.message 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200  focus:ring-black'
                }`}
                placeholder="Write your message here..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message}
                </p>
              )}
              {/* Character count helper */}
              <p className="mt-1 text-xs text-gray-500 ">
                {formData.message.length} characters (minimum 6 required)
              </p>
            </div>

            {/* 
              SUBMIT BUTTON
              - type="submit": Triggers form onSubmit
              - Prominent styling for primary action
            */}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 min-h-[44px] bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-base"
            >
              <Send size={20} />
              <span>Send Message</span>
            </button>

            {/* Required fields note */}
            <p className="text-xs text-gray-500  text-center">
              * Required fields
            </p>
          </form>
        </div>

        {/* 
          ===== RIGHT COLUMN: CONTACT INFORMATION =====
          Static information about library
        */}
        <div className="space-y-6">
          
          {/* Library Address */}
          <div className="bg-white  rounded-xl shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-xl">
                <MapPin className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black  mb-2">
                  Library Address
                </h3>
                <p className="text-gray-600 ">
                  University Library Building<br />
                  Main Campus, Room 101<br />
                  City, State 12345
                </p>
              </div>
            </div>
          </div>

          {/* Email Contact */}
          <div className="bg-white  rounded-xl shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-xl">
                <Mail className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black  mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 ">
                  abdullah.khan1010@gmail.com<br />
                  support@booknest.com
                </p>
              </div>
            </div>
          </div>

          {/* Phone Contact */}
          <div className="bg-white  rounded-xl shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-xl">
                <Phone className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black  mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600 ">
                  Main: (555) 123-4567<br />
                  Support: (555) 123-4568
                </p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white  rounded-xl shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-xl">
                <Clock className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black  mb-2">
                  Operating Hours
                </h3>
                <p className="text-gray-600 ">
                  Monday - Friday: 8:00 AM - 8:00 PM<br />
                  Saturday: 9:00 AM - 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Contact;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is form validation and why is it needed?
 * A: Form validation checks if user input is correct before processing.
 *    Prevents bad data (empty names, invalid emails, short messages).
 *    Improves data quality and user experience.
 *    We use client-side validation (JavaScript) for instant feedback.
 * 
 * Q: How does the form state management work?
 * A: We use useState with an object containing all form fields:
 *    formData = { name: '', email: '', subject: '', message: '' }
 *    All inputs are controlled (value from state, onChange updates state).
 *    Single handleChange function updates any field using [name] syntax.
 * 
 * Q: Explain the validation logic step by step.
 * A: validateForm() function:
 *    1. Create empty errors object: const newErrors = {}
 *    2. Check name: If empty (.trim() removes spaces), add error
 *    3. Check email: If no @ symbol (.includes('@')), add error
 *    4. Check message: If length <= 5, add error
 *    5. Set errors state: setErrors(newErrors)
 *    6. Return true if no errors: Object.keys(newErrors).length === 0
 *    If errors exist, they're displayed below inputs in red.
 * 
 * Q: What are the three validation rules?
 * A: 1. Name must not be empty: !formData.name.trim()
 *    2. Email must contain @: !formData.email.includes('@')
 *    3. Message must be > 5 characters: formData.message.length <= 5
 *    Subject is optional (no validation).
 * 
 * Q: How does handleChange work for multiple inputs?
 * A: Universal handler using computed property names:
 *    1. Extract name and value from event: const { name, value } = e.target
 *    2. Update that specific field: { ...prev, [name]: value }
 *    3. [name] uses variable as key (if name="email", becomes email: value)
 *    4. Also clears error for that field when user starts typing
 *    Works for all inputs because each has unique 'name' attribute.
 * 
 * Q: What happens on form submission?
 * A: handleSubmit():
 *    1. e.preventDefault() - Stop page reload
 *    2. validateForm() - Check all fields
 *    3. If valid (returns true):
 *       - Show success alert
 *       - Clear all form fields (reset to empty strings)
 *       - Clear errors object
 *    4. If invalid (returns false):
 *       - Errors already set by validateForm()
 *       - User sees red error messages
 *       - Form stays filled (user can correct)
 * 
 * Q: How are errors displayed?
 * A: Conditional rendering: {errors.name && <p>{errors.name}</p>}
 *    - && is logical AND operator
 *    - If errors.name exists (truthy), render the <p> tag
 *    - If errors.name is empty/undefined (falsy), render nothing
 *    Error appears in red below the invalid input.
 * 
 * Q: What is a controlled input?
 * A: Input whose value is controlled by React state:
 *    <input value={formData.name} onChange={handleChange} />
 *    - value: Always shows current state (single source of truth)
 *    - onChange: Updates state when user types
 *    React controls the input, not the DOM.
 *    Allows validation, formatting, and state synchronization.
 * 
 * Q: Why use e.preventDefault()?
 * A: Prevents default form submission behavior (page reload).
 *    Without it, form would refresh page and lose data.
 *    We want to handle submission with JavaScript instead.
 * 
 * Q: What is Object.keys() and how is it used?
 * A: Object.keys(obj) returns array of object's keys.
 *    Example: Object.keys({ name: 'error', email: 'error' }) → ['name', 'email']
 *    We check length: if 0, no errors exist.
 *    Used to determine if validation passed.
 * 
 * Q: How does error clearing on typing work?
 * A: In handleChange:
 *    if (errors[name]) { setErrors(prev => ({ ...prev, [name]: '' })) }
 *    When user types in field with error, we clear that error.
 *    Provides immediate feedback that they're fixing the issue.
 *    Other errors remain until user addresses them.
 */

