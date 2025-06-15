import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiDollarSign, FiCalendar, FiFileText, FiTag, FiCheck } from 'react-icons/fi';
import api from '../../utils/api';

export default function AddTransaction() {
  const router = useRouter();  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    currency: 'USD',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    'Food', 'Transportation', 'Housing', 'Entertainment', 
    'Utilities', 'Healthcare', 'Shopping', 'Education', 
    'Personal', 'Investments', 'Income', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert amount to number and adjust sign based on type
      const amount = parseFloat(formData.amount);
        const transactionData = {
        type: formData.type,
        category: formData.category,
        amount: amount,
        currency: formData.currency,
        date: formData.date,
        notes: formData.notes || ''
      };
      
      const response = await api.post('/transactions', transactionData);
      
      if (response.data.success || response.status === 200 || response.status === 201) {
        setSuccess(true);        // Clear form
        setFormData({
          amount: '',
          type: 'expense',
          category: 'Food',
          date: new Date().toISOString().split('T')[0],
          currency: 'USD',
          notes: ''
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/transactions');
        }, 2000);
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to add transaction. Please try again.');
      } else {
        setError('Failed to add transaction. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add Transaction</h1>
        <Link href="/transactions">
          <a className="btn btn-ghost">
            <FiArrowLeft className="mr-2" /> Back to Transactions
          </a>
        </Link>
      </div>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
          
          {error && (
            <div className="alert alert-error mb-4">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
                <label>{error}</label>
              </div>
            </div>
          )}
          
          {success && (
            <div className="alert alert-success mb-4">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <label>Transaction added successfully! Redirecting...</label>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text flex items-center"><FiDollarSign className="mr-2" /> Amount</span>
              </label>
              <div className="input-group">
                <span>$</span>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  placeholder="0.00" 
                  step="0.01" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Currency</span>
              </label>
              <select 
                name="currency" 
                value={formData.currency} 
                onChange={handleChange} 
                className="select select-bordered w-full" 
                required
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Transaction Type</span>
              </label>
              <div className="flex space-x-4">
                <label className="cursor-pointer flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="type" 
                    value="expense" 
                    checked={formData.type === 'expense'} 
                    onChange={handleChange} 
                    className="radio radio-primary" 
                  />
                  <span className="label-text">Expense</span>
                </label>
                <label className="cursor-pointer flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="type" 
                    value="income" 
                    checked={formData.type === 'income'} 
                    onChange={handleChange} 
                    className="radio radio-success" 
                  />
                  <span className="label-text">Income</span>
                </label>
              </div>
            </div>
              <div className="form-control mb-4">
              <label className="label">
                <span className="label-text flex items-center"><FiFileText className="mr-2" /> Notes</span>
              </label>
              <input 
                type="text" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="E.g., Grocery shopping, Salary, etc." 
                className="input input-bordered w-full" 
                required 
              />
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text flex items-center"><FiTag className="mr-2" /> Category</span>
              </label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="select select-bordered w-full" 
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
              <div className="form-control mb-6">
              <label className="label">
                <span className="label-text flex items-center"><FiCalendar className="mr-2" /> Date</span>
              </label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className="input input-bordered w-full" 
                required 
              />
            </div>
              <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Additional Details (optional)</span>
              </label>
              <textarea 
                name="additionalNotes" 
                value={formData.additionalNotes || ''} 
                onChange={handleChange} 
                placeholder="Any additional details about this transaction" 
                className="textarea textarea-bordered w-full" 
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${loading ? 'loading' : ''}`} 
                disabled={loading}
              >
                {!loading && <FiCheck className="mr-2" />}
                {loading ? 'Adding...' : 'Add Transaction'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
