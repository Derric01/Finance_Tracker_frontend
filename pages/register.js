import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiUser, FiMail, FiLock, FiAlertTriangle, FiUserPlus, FiArrowLeft, FiDollarSign } from 'react-icons/fi';
import api from '../utils/api';
import { saveToken, saveUserData, isAuthenticated } from '../utils/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password,
        defaultCurrency: 'USD' // Default currency
      });      if (response.data.success) {
        // Save the token
        saveToken(response.data.token);
        
        // Make sure we save the user data
        if (response.data.data) {
          console.log('Saving user data:', response.data.data);
          saveUserData(response.data.data);
        }
        
        router.push('/dashboard');
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-4">
              <div className="bg-accent/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-3">
                <FiDollarSign className="text-4xl text-accent" />
              </div>
              <h2 className="text-2xl font-bold">Create Account</h2>
              <p className="text-base-content/70">Sign up to start your financial journey</p>
            </div>
            
            {error && (
              <div className="alert alert-error mb-4 flex items-center">
                <FiAlertTriangle className="flex-shrink-0 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-300 px-3 flex items-center">
                    <FiUser />
                  </span>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="input input-bordered w-full" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-300 px-3 flex items-center">
                    <FiMail />
                  </span>
                  <input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="input input-bordered w-full" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-300 px-3 flex items-center">
                    <FiLock />
                  </span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input input-bordered w-full" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt">At least 6 characters</span>
                </label>
              </div>
              
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-300 px-3 flex items-center">
                    <FiLock />
                  </span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input input-bordered w-full" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-accent w-full ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {!loading && <FiUserPlus className="mr-2" />}
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className="divider">OR</div>
              
              <Link href="/login">
                <a className="btn btn-outline btn-primary w-full">
                  <FiArrowLeft className="mr-2" />
                  Back to Login
                </a>
              </Link>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-4 text-sm text-base-content/70">
          <p>© {new Date().getFullYear()} Smart Personal Finance Tracker</p>
          <p className="mt-1">By signing up, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
