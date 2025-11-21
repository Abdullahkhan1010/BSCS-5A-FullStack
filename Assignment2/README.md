# 📚 BookNest - Online Library Management System

**A modern, responsive library management system built with React, Vite, and Tailwind CSS.**

---

## 📖 Project Overview

**BookNest** is a comprehensive online library management system designed for university students. It allows users to browse books, make reservations, manage their cart, and contact library administration—all through an intuitive, responsive web interface.

---

## ✨ Features

### 🏠 Core Features
- **Home Page**: Hero section with featured books showcase
- **Browse Books**: Search by title/author + filter by category with responsive grid
- **Book Details**: Comprehensive book information with reserve functionality
- **My Reservations**: Cart management with borrow duration selection (7/14/21 days)
- **Contact Form**: Validated contact form with error handling
- **User Authentication**: Simple login/logout system with session persistence

### 🎨 UI/UX Features
- **Dark Mode**: Toggle between light and dark themes (persists in localStorage)
- **Responsive Design**: Mobile-first design (breakpoints: 768px, 1024px, 1280px)
- **Search & Filter**: Real-time book search with category filtering
- **Cart Management**: 5-book limit with availability validation
- **Loading States**: Suspense fallback with spinner for lazy-loaded pages
- **404 Page**: User-friendly error page with navigation options

### 🔧 Technical Features
- **Code Splitting**: React.lazy() for optimized bundle size
- **Context API**: Global state for theme, auth, and books
- **localStorage**: Persistent cart, theme, and user session
- **Form Validation**: Client-side validation (no external libraries)
- **Accessibility**: All images have alt attributes, semantic HTML

---

## 🛠️ Tech Stack

- **React 19.2.0** - UI library with functional components and hooks
- **Vite 7.2.4** - Fast build tool and development server
- **React Router DOM 7.9.6** - Client-side routing with nested routes
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Lucide React 0.554.0** - Modern icon library

---

## 📂 Folder Structure

```
Assignment2/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Mock data
│   │   └── books.json      # 20 mock books
│   ├── components/         # Reusable UI components
│   │   ├── BookCard.jsx    # Book display card
│   │   ├── Footer.jsx      # Footer component
│   │   ├── Layout.jsx      # Page layout wrapper
│   │   └── Navbar.jsx      # Navigation bar
│   ├── context/            # Context API providers
│   │   ├── AuthContext.jsx # User authentication
│   │   ├── BookContext.jsx # Books & cart management
│   │   └── ThemeContext.jsx# Dark/light theme
│   ├── pages/              # Route page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Browse.jsx      # Book catalog
│   │   ├── BookDetails.jsx # Book details
│   │   ├── Reservations.jsx# Cart management
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Login.jsx       # Login page
│   │   └── NotFound.jsx    # 404 page
│   ├── styles/
│   │   └── global.css      # Tailwind & global styles
│   ├── App.jsx             # Main routing
│   └── main.jsx            # Entry point
├── README.md               # This file
└── package.json            # Dependencies
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Navigate to project directory**
   ```bash
   cd Assignment2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

### Build for Production

```bash
npm run build
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

---

## 🔍 Key Features Explained

### Search & Filter
- Real-time search by title or author
- Category dropdown filter
- Dual filtering (search AND category)

### Cart System
- Maximum 5 books per reservation
- Availability validation
- No duplicate books
- Borrow duration: 7, 14, or 21 days
- Automatic pickup and due date calculation

### Form Validation
- **Contact Form**:
  - Name must not be empty
  - Email must contain "@"
  - Message must be > 5 characters
- Red error messages below invalid fields
- Errors clear when user starts typing

### Authentication
- Simple username login (demo mode)
- Session persists in localStorage
- Conditional UI based on auth state

---

## 📸 Screenshots

_(Screenshots placeholder - Add images of Home, Browse, BookDetails, Reservations, Contact, Dark Mode)_

---

## 🎓 Learning Outcomes

### React Concepts
- ✅ Functional components & hooks
- ✅ useState & useEffect
- ✅ Context API (useContext)
- ✅ React Router (useNavigate, useParams)
- ✅ Code splitting (React.lazy, Suspense)
- ✅ Controlled inputs
- ✅ Conditional rendering

### JavaScript
- ✅ Array methods (map, filter, reduce, slice)
- ✅ ES6+ syntax (destructuring, spread, arrow functions)
- ✅ Date manipulation
- ✅ localStorage API
- ✅ Form validation

### CSS/Tailwind
- ✅ Utility-first CSS
- ✅ Responsive design
- ✅ Flexbox & Grid
- ✅ Dark mode
- ✅ Transitions & hover effects

---

## 📝 Assignment Checklist

### Phase 1-2: Setup & Data ✅
- [x] Vite project with React & Router
- [x] Tailwind CSS configured
- [x] Mock books.json (20 books)
- [x] ThemeContext, AuthContext, BookContext

### Phase 3: Routing & Layout ✅
- [x] Code splitting with React.lazy
- [x] Suspense with LoadingFallback
- [x] Layout with Navbar and Footer
- [x] Nested routing with Outlet

### Phase 4: Home & Browse ✅
- [x] Home with Hero & Featured Books
- [x] Browse with search & filter
- [x] Responsive grid (1/2/4 columns)
- [x] BookCard component

### Phase 5: Details & Reservations ✅
- [x] BookDetails with useParams
- [x] Conditional Reserve button
- [x] Mock available date
- [x] Reservations with cart
- [x] Duration dropdown & date calculations
- [x] Reservation ID generation

### Phase 6: Forms & Validation ✅
- [x] Contact form with validation
- [x] Login page
- [x] Logout functionality
- [x] 404 Not Found page

### Phase 7: Polish & Documentation ✅
- [x] All images have alt attributes
- [x] Hover effects & transitions
- [x] Responsive testing
- [x] Loading states
- [x] README.md
- [x] Comprehensive code comments
- [x] No console errors

---

## 🧪 Testing

All features have been tested:
- ✅ Search & filter functionality
- ✅ Add to cart (with validation)
- ✅ Duration selection & date calculations
- ✅ Form validation & error display
- ✅ Login/logout & session persistence
- ✅ Dark mode toggle
- ✅ Responsive layouts (mobile/tablet/desktop)
- ✅ 404 page for invalid routes

---

## 👨‍💻 Developer Information

**Course**: Full Stack Development (BSCS-5A)  
**Assignment**: Assignment 2 - React Application  
**Tech Stack**: React, Vite, Tailwind CSS, React Router  
**Total Lines**: ~4000+ (including 2500+ comment lines)  

---

## 🎯 Viva Preparation

### Key Concepts to Explain

1. **React**: Component-based UI library with Virtual DOM
2. **Context API**: Global state management without prop drilling
3. **React Router**: Client-side routing for SPAs
4. **Code Splitting**: Lazy loading for performance optimization
5. **Tailwind CSS**: Utility-first CSS framework
6. **localStorage**: Browser API for data persistence
7. **Form Validation**: Client-side validation logic
8. **State Management**: Local (useState) vs Global (Context)

---

## 📄 License

Educational project for university assignment.

---

**Built with ❤️ for learning React and modern web development**
