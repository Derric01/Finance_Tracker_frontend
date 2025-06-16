import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('financelight');

  // Fix for Hydration issues with server-side rendering
  useEffect(() => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  // Function to update theme
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
