import './App.css';
import Header from './components/Header';
import Summary from './components/Summary';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
  // Personal Information
  const personalInfo = {
    name: "Abdullah Khan",
    phone: "+92-314-1966559",
    email: "Email",
    linkedin: "Linkedin",
    github: "Github"
  };

  // Professional Summary
  const summary = "Full Stack Developer with experience in React, Flutter, and database management. Passionate about creating scalable web applications and AI integration.";

  // Education Data
  const education = {
    institution: "Air University",
    degree: "Bachelor of Science in Computer Science",
    location: "Islamabad, Pakistan",
    duration: "Sep. 2023 – Present"
  };

  // Experience Data
  const experiences = [
    {
      title: "Shopify Store Manager",
      company: "Magasin Daata",
      location: "Quebec, Canada, Remote",
      duration: "Apr. 2025 – Present",
      responsibilities: [
        "Developed and launched a fully functional Shopify store with customized design and theme modifications",
        "Managed comprehensive inventory system and optimized product listings for enhanced SEO performance",
        "Implemented custom JavaScript solutions for improved user experience and conversion optimization",
        "Coordinated product catalog management and streamlined order processing workflows"
      ]
    }
  ];

  // Projects Data
  const projects = [
    {
      name: "E-Commerce Clothing Store",
      technologies: "React, MongoDB, JavaScript, HTML/CSS",
      duration: "Apr. 2024",
      description: [
        "Built complete online clothing store using React frontend and MongoDB database integration",
        "Implemented authentication system with secure login and registration functionality",
        "Developed product catalog with search, filtering, and dynamic product display features",
        "Created responsive shopping cart and checkout system with order processing capabilities"
      ]
    },
    {
      name: "Music Player",
      technologies: "C++, HTML/CSS, JavaScript",
      duration: "Dec. 2024 – Jan. 2025",
      description: [
        "Developed web-based music player with C++ backend for audio file management and processing",
        "Created intuitive frontend interface using HTML/CSS and JavaScript for music controls",
        "Implemented playlist functionality and audio streaming capabilities with data structure optimization",
        "Integrated file upload system and metadata extraction for comprehensive music library management"
      ]
    },
    {
      name: "Fitness Tracking Mobile Application",
      technologies: "Flutter, Firebase, Dart",
      duration: "Nov. 2024 – Jan. 2025",
      description: [
        "Built cross-platform fitness tracking application for Android and iOS using Flutter framework",
        "Integrated Google Firebase for real-time database management and user authentication",
        "Implemented workout logging, progress tracking, and data visualization features",
        "Created responsive UI with custom widgets and seamless navigation for enhanced user experience"
      ]
    },
    {
      name: "Restaurant Management System",
      technologies: "C++, OOP",
      duration: "Apr. 2024 – May 2024",
      description: [
        "Developed comprehensive restaurant management system using C++ with object-oriented programming principles",
        "Implemented modules for order processing, employee management, and inventory stock control",
        "Created efficient data structures for menu management and real-time order tracking",
        "Built reporting system for sales analytics and operational performance monitoring"
      ]
    },
    {
      name: "AI-Based Chatbot",
      technologies: "Flutter, APIs, JavaScript",
      duration: "Dec. 2024 – Jan. 2025",
      description: [
        "Created intelligent chatbot application for both web and mobile platforms using Flutter",
        "Integrated third-party AI APIs for natural language processing and image generation capabilities",
        "Implemented real-time messaging interface with conversation history and user session management",
        "Developed responsive cross-platform design ensuring consistent performance across devices"
      ]
    }
  ];

  // Skills Data
  const skillCategories = [
    {
      category: "Backend Technologies",
      skills: "Node.js, C++, C#, .NET, Express.js, RESTful APIs, SQL"
    },
    {
      category: "Frontend Technologies",
      skills: "React.js, HTML5, CSS3, JavaScript (ES6+), Flutter, Blazor"
    },
    {
      category: "Databases",
      skills: "MongoDB, Firebase, MySQL, PostgreSQL"
    },
    {
      category: "Tools & Platforms",
      skills: "Git, VS Code, Shopify, Firebase Console, Postman, Docker"
    },
    {
      category: "Cloud & Deployment",
      skills: "Firebase Hosting, Heroku, Netlify, Google Cloud Platform"
    }
  ];

  return (
    <div className="App">
      {/* Passing data to components using props */}
      <Header 
        name={personalInfo.name}
        phone={personalInfo.phone}
        email={personalInfo.email}
        linkedin={personalInfo.linkedin}
        github={personalInfo.github}
      />
      <Summary text={summary} />
      <Education 
        institution={education.institution}
        degree={education.degree}
        location={education.location}
        duration={education.duration}
      />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Skills skillCategories={skillCategories} />
    </div>
  );
}

export default App;
