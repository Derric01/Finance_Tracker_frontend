import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('financelight');  // Fix for Hydration issues with server-side rendering
  useEffect(() => {
    // Clear any potentially corrupted theme data if the app is stuck
    try {
      const currentDataTheme = document.documentElement.getAttribute('data-theme');
      let storedTheme = localStorage.getItem('theme');
      
      if (storedTheme && !['financelight', 'financedark'].includes(storedTheme)) {
        console.log('Invalid theme detected, resetting to financelight');
        localStorage.removeItem('theme');
        storedTheme = null;
      }
      
      // Force light mode as default, regardless of system preference
      let initialTheme = 'financelight';
      
      // Then check if user has a saved preference
      if (storedTheme) {
        initialTheme = storedTheme;
      }
      
      // Set theme in state and on document
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
      
      // Ensure it's saved to localStorage
      localStorage.setItem('theme', initialTheme);
      
      console.log('Initial theme set to:', initialTheme);
    } catch (e) {
      console.error('Error in theme initialization:', e);
      // Fallback to light theme
      setTheme('financelight');
      document.documentElement.setAttribute('data-theme', 'financelight');
    }
    
    setMounted(true);
  }, []);

  // Function to update theme
  const updateTheme = (newTheme) => {
    console.log('Updating theme to:', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  if (!mounted) {
    // Apply theme directly to avoid flash of wrong theme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'financelight';
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    return <div className="min-h-screen bg-base-200"></div>;
  }

  return (
    <div data-theme={theme}>
      <Component {...pageProps} updateTheme={updateTheme} currentTheme={theme} />
    </div>
  );
}

export default MyApp;
