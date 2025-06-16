import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

export default function Layout({ children }) {
  const router = useRouter();
  const publicRoutes = ['/login', '/register'];
  
  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.includes(router.pathname);
  
  // If not authenticated and not on a public route, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated() && !isPublicRoute) {
      router.push('/login');
    }
  }, [router, isPublicRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {!isPublicRoute && <Navbar />}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="flex items-center space-x-2">
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
          <span>Smart Personal Finance Tracker</span>
          <span className="px-2">|</span>
          <span>Powered by</span>
          <span className="text-primary font-semibold">Next.js</span>
          <span>+</span>
          <span className="text-secondary font-semibold">DaisyUI</span>
        </div>
      </footer>
    </div>
  );
}
