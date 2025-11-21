/**
 * Home Page Component - Landing Page
 * 
 * PURPOSE:
 * First page users see when visiting BookNest.
 * Introduces the library system and shows featured books.
 * 
 * SECTIONS:
 * 1. Hero Section - Welcome banner with call-to-action
 * 2. Featured Books - Showcase of available books
 * 
 * KEY CONCEPTS FOR VIVA:
 * - useBooks hook: Accessing book data from context
 * - Array slice: Getting subset of books for featured section
 * - Component composition: Using BookCard component
 * - Responsive grid: Different columns for different screen sizes
 * - useNavigate: Programmatic navigation to Browse page
 */

import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';

function Home() {
  /**
   * React Router Navigation Hook
   * 
   * useNavigate returns a function for programmatic navigation.
   * We use it for the "Start Browsing" button to go to Browse page.
   * 
   * Why not <Link>?
   * - Could use Link, but button with onClick is more flexible
   * - Can add logic before navigation (e.g., analytics, validation)
   */
  const navigate = useNavigate();

  /**
   * Access Books Data from BookContext
   * 
   * books: Array of all books from books.json
   * We'll use this to display featured books on home page.
   */
  const { books } = useBooks();

  /**
   * Featured Books Selection
   * 
   * Logic: Show first 4 available books as "featured"
   * 
   * Steps:
   * 1. Filter only available books (status === 'Available')
   * 2. Slice first 4 books (0 to 4, not including 4)
   * 
   * Why filter first?
   * - Don't want to feature borrowed books
   * - Encourages users to reserve available books
   * 
   * Array Methods Explained:
   * - filter(): Creates new array with items passing test
   * - slice(start, end): Extracts section of array (non-destructive)
   */
  const featuredBooks = books
    .filter(book => book.status === 'Available')
    .slice(0, 4);

  /**
   * New Arrivals Selection
   * 
   * Logic: Show the 4 most recent books (by publication year)
   * 
   * Steps:
   * 1. Sort books by publication year (newest first)
   * 2. Slice first 4 books
   * 
   * Why sort by publication year?
   * - Shows newest additions to the library
   * - Encourages users to discover recent titles
   */
  const newArrivals = books
    .slice()
    .sort((a, b) => b.publicationYear - a.publicationYear)
    .slice(0, 4);

  /**
   * handleBrowseClick Function
   * 
   * Navigates to Browse page when user clicks "Start Browsing" button.
   * Simple navigation - no parameters or state needed.
   */
  const handleBrowseClick = () => {
    navigate('/browse');
  };

  return (
    <div>
      {/* 
        ===== HERO SECTION =====
        Large banner at top of page with welcome message and CTA
        
        Responsive Design:
        - Mobile: Smaller text, padding
        - Tablet/Desktop: Larger text, more padding
      */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          
          {/* 
            BookOpen Icon
            - Large icon as visual branding
            - Centered above heading
            - mx-auto: Horizontal centering with auto margins
          */}
          <BookOpen size={64} className="mx-auto mb-4" />
          
          {/* 
            Main Heading
            - Responsive text size (text-4xl → md:text-5xl → lg:text-6xl)
            - font-bold: Heavy weight for emphasis
            - mb-4: Margin bottom for spacing
          */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to BookNest
          </h1>
          
          {/* 
            Subtitle/Tagline
            - Explains what the system is
            - Slightly smaller text (text-lg → md:text-xl)
            - mb-8: More spacing before button
          */}
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your university library at your fingertips. Browse, reserve, and manage your book reservations effortlessly.
          </p>
          
          {/* 
            Call-to-Action Button
            - Primary action: Get users to browse books
            - Prominent styling: Large, high contrast
            - Hover effect: Darkens on hover
            - Icon: Arrow for directional cue
            
            Tailwind Classes:
            - inline-flex: Button with flex for icon alignment
            - items-center: Vertically center icon and text
            - space-x-2: Horizontal gap between icon and text
            - px-8 py-4: Large padding for prominence
            - rounded-lg: Rounded corners
            - transition: Smooth color change on hover
          */}
          <button
            onClick={handleBrowseClick}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            <span>Start Browsing</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* 
        ===== FEATURED BOOKS SECTION =====
        Showcase of available books to encourage exploration
      */}
      <section className="container mx-auto px-4 py-12">
        
        {/* 
          Section Header
          - mb-8: Space between heading and grid
          - text-center: Centered heading
        */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Featured Books
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our latest available books
          </p>
        </div>

        {/* 
          Conditional Rendering: Books Grid or Message
          
          If featuredBooks has items: Show grid
          If empty: Show message
          
          Ternary Operator: condition ? trueCase : falseCase
        */}
        {featuredBooks.length > 0 ? (
          /* 
            Responsive Grid Layout
            
            Breakpoints:
            - Default (mobile): grid-cols-1 (1 column)
            - md (≥768px): grid-cols-2 (2 columns)
            - lg (≥1024px): grid-cols-4 (4 columns)
            
            gap-6: Space between grid items
            
            Why this layout?
            - Mobile: Single column for readability
            - Tablet: 2 columns to utilize space
            - Desktop: 4 columns to show all featured books in one row
          */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 
              Map Over Featured Books
              
              Array.map() creates a BookCard for each book.
              
              Key Prop:
              - Required for list items in React
              - Helps React identify which items changed
              - Use unique identifier (book.id)
              
              Why book.id as key?
              - Unique for each book
              - Stable (doesn't change)
              - NOT index (can cause bugs if array reorders)
            */}
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          /* 
            Empty State Message
            - Shows if no available books
            - Centered with gray text
            - py-12: Vertical padding for visual balance
          */
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No featured books available at the moment.
            </p>
          </div>
        )}

        {/* 
          View All Books Link
          - Additional CTA to browse all books
          - Less prominent than hero button (text link vs button)
          - mt-8: Margin top for separation from grid
        */}
        <div className="text-center mt-8">
          <button
            onClick={handleBrowseClick}
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            <span>View All Books</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* 
        ===== NEW ARRIVALS SECTION =====
        Showcase of most recent books added to library
      */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              New Arrivals
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the latest additions to our collection
            </p>
          </div>

          {/* Conditional Rendering: Show books or empty state */}
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No new arrivals at the moment.
              </p>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={handleBrowseClick}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              <span>Explore All Collections</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

/**
 * ===== VIVA EXPLANATION SUMMARY =====
 * 
 * Q: What does the Home page show?
 * A: Has three sections: Hero (welcome banner), Featured Books (top 4 available), 
 *    and New Arrivals (latest 4 books by publication year).
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// Export the component so it can be imported in other files
export default Home;

/**
 * VIVA EXPLANATION SUMMARY:
 * 
 * Q: What is the purpose of the Home page?
 * A: Home page is the landing page - first thing users see.
 *    It introduces BookNest and encourages users to browse books.
 *    Has two sections: Hero (welcome banner) and Featured Books (showcase).
 * 
 * Q: How do you get the books data?
 * A: Use useBooks() hook to access BookContext.
 *    const { books } = useBooks();
 *    books is the array from books.json.
 *    Context provides data without prop drilling.
 * 
 * Q: How are featured books selected?
 * A: Two steps:
 *    1. Filter only available books: books.filter(book => book.status === 'Available')
 *    2. Get first 4: .slice(0, 4)
 *    This ensures we only feature books that can be reserved.
 * 
 * Q: Explain the filter and slice methods.
 * A: filter(): Creates new array with items passing condition.
 *    Example: [1,2,3,4].filter(n => n > 2) → [3,4]
 *    slice(start, end): Extracts portion of array (non-destructive).
 *    Example: [1,2,3,4,5].slice(0, 3) → [1,2,3]
 *    End index is exclusive (0 to 4 means indices 0,1,2,3).
 * 
 * Q: Why use map with key prop?
 * A: map() transforms each array item into JSX.
 *    Key prop is required for list items in React.
 *    React uses keys to track which items changed/added/removed.
 *    Must be unique and stable (book.id is perfect).
 *    DON'T use array index - can cause bugs if list reorders.
 * 
 * Q: What is the gradient background?
 * A: bg-gradient-to-r from-blue-600 to-purple-600
 *    - bg-gradient-to-r: Gradient from left to right
 *    - from-blue-600: Start color (left side)
 *    - to-purple-600: End color (right side)
 *    Creates smooth color transition for visual appeal.
 * 
 * Q: How does responsive text sizing work?
 * A: text-4xl md:text-5xl lg:text-6xl
 *    - text-4xl: Base size (mobile)
 *    - md:text-5xl: Medium screens (≥768px)
 *    - lg:text-6xl: Large screens (≥1024px)
 *    Text scales up as screen size increases.
 * 
 * Q: What is the grid layout logic?
 * A: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
 *    - Mobile: 1 column (stacked vertically)
 *    - Tablet: 2 columns (utilize horizontal space)
 *    - Desktop: 4 columns (show all 4 featured books in one row)
 *    Adapts to screen size for optimal layout.
 * 
 * Q: Why use navigate instead of Link?
 * A: Both work, but navigate() in onClick is more flexible:
 *    - Can add logic before navigation
 *    - Can conditionally navigate
 *    - Better for buttons (Link is better for text links)
 *    For simple navigation, Link is fine, but button onClick is clear.
 * 
 * Q: What is the conditional rendering?
 * A: {featuredBooks.length > 0 ? <grid> : <message>}
 *    Ternary operator: condition ? trueCase : falseCase
 *    If books exist: Show grid with BookCards
 *    If no books: Show "No featured books" message
 *    Prevents empty grid from rendering.
 */

