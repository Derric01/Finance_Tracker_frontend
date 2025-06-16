import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  // Always use dark mode
  const theme = 'financedark';
  
  useEffect(() => {
    // Set dark mode on the document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage for persistence
    localStorage.setItem('theme', theme);
    
    setMounted(true);
  }, []);

  if (!mounted) {
    // Apply dark theme directly to avoid flash of wrong theme
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    return <div className="min-h-screen bg-base-200"></div>;
  }

  return (
    <div data-theme={theme}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
