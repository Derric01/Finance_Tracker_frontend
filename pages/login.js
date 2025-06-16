import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMail, FiLock, FiAlertTriangle, FiLogIn, FiUserPlus, FiDollarSign } from 'react-icons/fi';
import api from '../utils/api';
import { saveToken, saveUserData, isAuthenticated } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
        const response = await api.post('/auth/login', { email, password });
        if (response.data.success) {
        // Save the token
        saveToken(response.data.token);
        
        // Make sure we save the user data
        if (response.data.data) {
          console.log('Saving user data:', response.data.data);
          saveUserData(response.data.data);
        }
        
        router.push('/dashboard');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid credentials. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 bg-gradient-to-br from-base-200 to-base-300">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800">
          <div className="card-body">
            <div className="text-center mb-4">
              <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-3">
                <FiDollarSign className="text-4xl text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-base-content/70">Sign in to your account</p>
            </div>
              {error && (
              <div className="alert alert-error mb-4 flex items-center border border-red-800 bg-error/10">
                <FiAlertTriangle className="flex-shrink-0 mr-2 text-error" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-300 px-3 flex items-center border-y border-l border-gray-700 rounded-l-md">
                    <FiMail className="text-secondary" />
                  </span>
                  <input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="input input-bordered w-full border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>                <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-300 px-3 flex items-center border-y border-l border-gray-700 rounded-l-md">
                    <FiLock className="text-secondary" />
                  </span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input input-bordered w-full border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>                <label className="label">
                  <Link href="/forgot-password">
                    <a className="label-text-alt link link-hover text-primary">Forgot password?</a>
                  </Link>
                </label>
              </div>
                <button 
                type="submit" 
                className={`btn btn-primary w-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {!loading && <FiLogIn className="mr-2" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="divider">OR</div>
              
              <Link href="/register">
                <a className="btn btn-outline btn-secondary w-full hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300">
                  <FiUserPlus className="mr-2" />
                  Create Account
                </a>
              </Link>
            </form>
          </div>
        </div>
          <div className="text-center mt-6 text-sm text-base-content/70">
          <p>© {new Date().getFullYear()} Smart Personal Finance Tracker</p>
          <p className="mt-1">Manage your finances with ease and intelligence</p>
        </div>
      </div>
    </div>
  );
}
