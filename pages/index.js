import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiLoader } from 'react-icons/fi';
import { isAuthenticated } from '../utils/auth';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      // Redirect to dashboard if authenticated
      router.push('/dashboard');
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [router]);
  
  // Return a loading state while redirecting
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="relative animate-pulse-slow">
        <FiLoader className="text-6xl text-primary animate-spin" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Loading your financial world...</h2>
    </div>
  );
}
