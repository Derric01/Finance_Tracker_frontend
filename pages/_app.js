import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  // Fix for Hydration issues with server-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-base-200"></div>;
  }

  return (
    <div data-theme="financelight">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
