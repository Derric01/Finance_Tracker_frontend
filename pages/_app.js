import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('financelight');

  // Fix for Hydration issues with server-side rendering
  useEffect(() => {
    // Check for system preference if no saved theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'financedark' : 'financelight';
    
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    
    // Set theme in state and on document
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    localStorage.setItem('theme', savedTheme);
    
    setMounted(true);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        const newTheme = mediaQuery.matches ? 'financedark' : 'financelight';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Function to update theme
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Important: Update the data-theme attribute on the html element
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-base-200"></div>;
  }

  return (
    <div data-theme={theme}>
      <Component {...pageProps} updateTheme={updateTheme} currentTheme={theme} />
    </div>
  );
}

export default MyApp;
