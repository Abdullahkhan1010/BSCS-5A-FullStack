/**
 * Browse Page Component - Book Catalog with Search & Filter
 * 
 * PURPOSE:
 * Main page for exploring the library's book collection.
 * Users can search, filter, and browse all available books.
 * 
 * FEATURES:
 * 1. Search bar - Filter by title or author
 * 2. Category dropdown - Filter by book category
 * 3. Responsive grid - Display books in cards
 * 4. Empty state - Message when no books match filters
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useState: Managing local state for search and category filters
 * - useBooks: Accessing book data from context
 * - Controlled inputs: Input values controlled by React state
 * - Array filtering: Multiple filter conditions (search AND category)
 * - Responsive grid: Adapts to screen size
 * - Real-time filtering: Results update as user types/selects
 */

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';

function Browse() {
  /**
   * Local State Management
   * 
   * We use useState to manage:
   * 1. searchQuery - What user types in search box
   * 2. selectedCategory - Which category is selected in dropdown
   * 
   * Why local state (not context)?
   * - Search/filter is page-specific (not global)
   * - No need to share with other components
   * - Keeps context clean and focused
   * 
   * useState Syntax:
   * const [value, setValue] = useState(initialValue);
   * - value: Current state
   * - setValue: Function to update state
   * - initialValue: Starting value
   */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  /**
   * Access Books Data from BookContext
   * 
   * books: Array of all books
   * getAllCategories: Function that returns unique categories
   */
  const { books, getAllCategories } = useBooks();

  /**
   * Get All Unique Categories
   * 
   * getAllCategories() returns array of unique category names.
   * We add "All" option at the beginning for showing all books.
   * 
   * Spread Operator (...):
   * ['All', ...categories] creates new array with "All" prepended
   * Example: ['All', 'Fiction', 'Science', 'History']
   */
  const categories = ['All', ...getAllCategories()];

  /**
   * ===== FILTERING LOGIC =====
   * 
   * Apply multiple filters to books array:
   * 1. Search by title or author (case-insensitive)
   * 2. Filter by selected category
   * 
   * Steps:
   * 1. Start with all books
   * 2. Filter by search query (if not empty)
   * 3. Filter by category (if not "All")
   * 
   * Array.filter() creates new array with items passing tests.
   * We chain multiple filters for AND logic (must pass all).
   */
  const filteredBooks = books
    /**
     * FILTER 1: Search Query
     * 
     * Check if book title OR author contains search query.
     * 
     * Logic:
     * - If searchQuery is empty: Include all books (always true)
     * - If searchQuery has text: Check title and author
     * 
     * String Methods:
     * - toLowerCase(): Convert to lowercase for case-insensitive search
     * - includes(): Check if string contains substring
     * 
     * Example:
     * searchQuery = "harry"
     * book.title = "Harry Potter" → "harry potter".includes("harry") → true ✓
     * book.author = "J.K. Rowling" → "j.k. rowling".includes("harry") → false
     * Overall: true (title matches) ✓
     */
    .filter(book => {
      if (!searchQuery) return true; // No search query = show all
      
      const query = searchQuery.toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(query);
      const authorMatch = book.author.toLowerCase().includes(query);
      
      return titleMatch || authorMatch; // Match either title OR author
    })
    /**
     * FILTER 2: Category
     * 
     * Check if book belongs to selected category.
     * 
     * Logic:
     * - If "All" selected: Include all books
     * - If specific category: Include only matching books
     * 
     * Example:
     * selectedCategory = "Fiction"
     * book.category = "Fiction" → true ✓
     * book.category = "Science" → false ✗
     */
    .filter(book => {
      if (selectedCategory === 'All') return true;
      return book.category === selectedCategory;
    });

  /**
   * handleSearchChange Function
   * 
   * Updates search query state when user types.
   * Connected to search input's onChange event.
   * 
   * @param {Event} e - Input change event
   * e.target.value - Current input value
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * handleCategoryChange Function
   * 
   * Updates selected category when user selects from dropdown.
   * Connected to select input's onChange event.
   * 
   * @param {Event} e - Select change event
   */
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* 
        ===== PAGE HEADER =====
        Title and description of Browse page
      */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Browse Books
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our collection of {books.length} books
        </p>
      </div>

      {/* 
        ===== SEARCH & FILTER BAR =====
        Controls for filtering books
        
        Responsive Layout:
        - Mobile: Stacked vertically (flex-col)
        - Tablet/Desktop: Side by side (md:flex-row)
      */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        
        {/* 
          SEARCH INPUT
          
          Controlled Input:
          - value={searchQuery}: Input value is controlled by React state
          - onChange={handleSearchChange}: Updates state on every keystroke
          
          Why controlled?
          - React controls the value (single source of truth)
          - Can manipulate/validate input before setting state
          - Enables real-time filtering
          
          Tailwind Classes:
          - flex-1: Takes remaining space (grows to fill)
          - relative: For positioning icon inside input
        */}
        <div className="flex-1 relative">
          {/* 
            Search Icon
            - Positioned inside input (absolute positioning)
            - left-3: 12px from left
            - top-1/2 -translate-y-1/2: Vertically centered
          */}
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          />
          
          {/* 
            Search Input Field
            - pl-10: Left padding for icon space
            - Placeholder: Hint text
            - onChange: Fires on every keystroke
          */}
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        {/* 
          CATEGORY DROPDOWN
          
          Controlled Select:
          - value={selectedCategory}: Current selected category
          - onChange={handleCategoryChange}: Updates state on selection
          
          Why map categories?
          - Dynamic options based on books data
          - Automatically adapts if categories change
        */}
        <div className="flex items-center space-x-2 md:w-64">
          {/* Filter Icon */}
          <Filter size={20} className="text-gray-400" />
          
          {/* 
            Select Dropdown
            - Controlled by selectedCategory state
            - Maps through categories array to create options
          */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          >
            {/* 
              Map Categories to Options
              
              Array.map() creates <option> for each category.
              Key prop: Unique identifier (category name is unique)
            */}
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 
        ===== RESULTS INFO =====
        Shows how many books match current filters
        Helpful feedback for user
      */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* 
        ===== BOOKS GRID OR EMPTY STATE =====
        
        Conditional Rendering:
        - If filteredBooks has items: Show grid
        - If empty: Show "no results" message
      */}
      {filteredBooks.length > 0 ? (
        /* 
          Responsive Grid Layout
          
          Breakpoints:
          - Default (mobile): 1 column
          - md (≥768px): 2 columns
          - lg (≥1024px): 3 columns
          - xl (≥1280px): 4 columns
          
          gap-6: Space between grid items
          
          Why this layout?
          - Mobile: Single column (better for small screens)
          - Tablet: 2 columns (balance between space and readability)
          - Desktop: 3-4 columns (utilize screen width)
        */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* 
            Map Filtered Books to Cards
            
            Array.map() creates BookCard for each book.
            filteredBooks is already filtered by search and category.
            
            Key Prop:
            - book.id is unique identifier
            - Required for React's reconciliation
          */}
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        // Empty State - Shows when no books match filters
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={64} className="mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Books Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

export default Browse;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is the purpose of the Browse page?
 * A: Browse page displays all library books with search and filter capabilities.
 *    Users can search by title/author and filter by category.
 *    Shows results in responsive grid layout with BookCard components.
 * 
 * Q: What is local state and why use it here?
 * A: Local state is component-specific data (searchQuery, selectedCategory).
 *    We use useState to manage it.
 *    Why local? Search/filter is page-specific, no need to share globally.
 *    Context is for global state (cart, auth, theme).
 * 
 * Q: What are controlled inputs?
 * A: Controlled inputs have their value controlled by React state.
 *    value={searchQuery} - React controls the value
 *    onChange={handleSearchChange} - Updates state on change
 *    Makes React the "single source of truth".
 *    Alternative: Uncontrolled inputs (use refs, DOM controls value).
 * 
 * Q: How does the filtering logic work?
 * A: We chain two filters on books array:
 *    1. Search filter: Checks if title OR author includes query
 *    2. Category filter: Checks if category matches selection
 *    Both must pass (AND logic) for book to appear.
 *    filter() creates new array, doesn't modify original.
 * 
 * Q: Explain the search filter in detail.
 * A: 1. If no searchQuery: Include all books (return true)
 *    2. Convert query and book fields to lowercase (case-insensitive)
 *    3. Check if title includes query: book.title.toLowerCase().includes(query)
 *    4. Check if author includes query: book.author.toLowerCase().includes(query)
 *    5. Return true if EITHER matches (OR logic with ||)
 *    Example: Searching "harry" matches "Harry Potter" (title) or "J.K. Rowling" (no match)
 * 
 * Q: What is includes() method?
 * A: String method that checks if substring exists in string.
 *    Returns boolean (true/false).
 *    Example: "Hello World".includes("World") → true
 *             "Hello World".includes("Goodbye") → false
 *    Case-sensitive! Must use toLowerCase() for case-insensitive search.
 * 
 * Q: How does category filtering work?
 * A: If selectedCategory is "All": Include all books
 *    Otherwise: Include only books where book.category === selectedCategory
 *    Simple equality check (exact match).
 * 
 * Q: Why chain filters instead of one complex filter?
 * A: Cleaner, more readable code. Each filter has single responsibility:
 *    - First filter: Search logic
 *    - Second filter: Category logic
 *    Alternative: One filter with nested if statements (harder to read).
 *    Performance: Similar (both iterate once).
 * 
 * Q: How does onChange work for inputs?
 * A: onChange fires every time input value changes (keystroke, selection).
 *    Receives event object (e) with e.target.value (current input value).
 *    We call setState with new value: setSearchQuery(e.target.value)
 *    This triggers re-render, filtering updates in real-time.
 * 
 * Q: What is the spread operator (...)?
 * A: Spread operator expands array/object.
 *    ['All', ...categories] creates new array with "All" at start.
 *    Example: categories = ['Fiction', 'Science']
 *             ['All', ...categories] → ['All', 'Fiction', 'Science']
 *    Without spread: ['All', categories] → ['All', ['Fiction', 'Science']] (nested!)
 * 
 * Q: How does the responsive grid work?
 * A: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
 *    Mobile (<768px): 1 column
 *    Tablet (768-1024px): 2 columns
 *    Desktop (1024-1280px): 3 columns
 *    Large Desktop (>1280px): 4 columns
 *    Adapts layout based on screen width.
 * 
 * Q: What is the empty state?
 * A: Conditional rendering when filteredBooks.length === 0
 *    Shows message "No Books Found" with icon and suggestions.
 *    Better UX than blank page - tells user why nothing shows.
 * 
 * Q: How does real-time filtering work?
 * A: Every keystroke/selection triggers state update (onChange)
 *    State update causes re-render
 *    Re-render recalculates filteredBooks with new state
 *    Grid updates immediately with new results
 *    No button needed - automatic and instant.
 * 
 * Q: Why show results count?
 * A: User feedback - shows how many books match filters.
 *    "Showing 12 books matching "harry" in Fiction"
 *    Helps user understand search effectiveness.
 *    Dynamic: Updates with filteredBooks.length
 */

