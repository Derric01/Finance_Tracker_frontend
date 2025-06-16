import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { FiPieChart, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';
import api from '../../utils/api';

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: 'Essential',
    limit: '',
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
    currency: 'USD'
  });

  const categories = ['Essential', 'Non-essential', 'Savings', 'Investment', 'Entertainment', 'Other'];

  // Fetch budgets from the backend
  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/budgets');
      
      if (response.data) {
        setBudgets(response.data.data || response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching budgets:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError('Failed to load budgets. Please try again later.');
      }
        // Set some dummy data for demo purposes when backend is not available
      setBudgets([
        { _id: '1', category: 'Monthly Expenses', limit: 2000, spent: 1500, currency: 'USD', month: '2023-06' },
        { _id: '2', category: 'Entertainment', limit: 500, spent: 350, currency: 'USD', month: '2023-06' },
        { _id: '3', category: 'Groceries', limit: 600, spent: 450, currency: 'USD', month: '2023-06' },
        { _id: '4', category: 'Savings', limit: 1000, spent: 1000, currency: 'USD', month: '2023-06' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);
  // Handle adding a new budget
  const handleAddBudget = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Format budget data to match backend schema
      const budgetData = {
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        month: newBudget.month, // Already in YYYY-MM format
        currency: newBudget.currency
      };
      
      const response = await api.post('/budgets', budgetData);
        if (response.data) {
        // Reset form and close modal
        setNewBudget({
          category: 'Essential',
          limit: '',
          month: new Date().toISOString().slice(0, 7),
          currency: 'USD'
        });
        setIsAddingBudget(false);
        
        // Refresh budgets
        fetchBudgets();
      }
    } catch (err) {
      console.error('Error adding budget:', err);
      alert('Failed to add budget. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a budget
  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await api.delete(`/budgets/${id}`);
        // Refresh budgets
        fetchBudgets();
      } catch (error) {
        console.error('Error deleting budget:', error);
        alert('Failed to delete budget. Please try again.');
      }
    }
  };
  // Calculate totals
  const totalBudget = budgets.reduce((sum, budget) => sum + (budget.limit || 0), 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + (budget.spent || 0), 0);
  const remaining = totalBudget - totalSpent;

  return (    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold flex items-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <FiPieChart className="mr-2 text-primary" /> Budgets
          </h1>
          <button 
            className="btn btn-primary btn-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => setIsAddingBudget(true)}
          >
            <FiPlus /> Add Budget
          </button>
        </div>        {error && (
          <div className="alert alert-warning mb-6 shadow-md animate-fadeIn">
            <div className="flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}        <div className="stats shadow w-full mb-8 bg-gradient-to-r from-base-100 to-base-200 border border-gray-100 animate-fadeIn animation-delay-200">
          <div className="stat">
            <div className="stat-title font-medium">Total Budget</div>
            <div className="stat-value text-primary">${totalBudget.toFixed(2)}</div>
            <div className="stat-desc">For all categories</div>
          </div>
          <div className="stat">
            <div className="stat-title font-medium">Spent</div>
            <div className="stat-value text-secondary">${totalSpent.toFixed(2)}</div>
            <div className="stat-desc text-success">{totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% of budget</div>
          </div>
          <div className="stat">
            <div className="stat-title font-medium">Remaining</div>
            <div className="stat-value text-accent">${remaining.toFixed(2)}</div>
            <div className="stat-desc">{totalBudget > 0 ? Math.round((remaining / totalBudget) * 100) : 0}% of budget</div>
          </div>
        </div>        {loading && budgets.length === 0 ? (
          <div className="flex justify-center my-8 animate-fadeIn animation-delay-300">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : budgets.length === 0 ? (
          <div className="text-center py-8 animate-fadeIn animation-delay-300">
            <p className="text-lg mb-4">You don't have any budgets yet.</p>
            <button 
              className="btn btn-primary shadow-md hover:shadow-lg transition-shadow gap-2"
              onClick={() => setIsAddingBudget(true)}
            >
              <FiPlus /> Create Your First Budget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn animation-delay-300">
            {budgets.map((budget) => (              <div key={budget._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="card-body">
                  <h2 className="card-title text-secondary-content">{budget.category}</h2>
                  <p className="text-sm text-gray-500">{budget.month}</p>
                  <p className="text-sm text-gray-500">{budget.currency}</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Progress</span>
                      <span>${budget.spent || 0} / ${budget.limit}</span>
                    </div>
                    <progress 
                      className={`progress w-full ${
                        budget.spent && budget.spent/budget.limit > 0.9 
                          ? 'progress-error' 
                          : 'progress-primary'
                      }`} 
                      value={budget.spent || 0} 
                      max={budget.limit}
                    ></progress>
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-outline btn-sm btn-square hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-colors">
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn btn-outline btn-sm btn-square btn-error hover:bg-error/10 transition-colors"
                      onClick={() => handleDeleteBudget(budget._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
          <div className="alert alert-info shadow-lg mt-8 bg-gradient-to-r from-info/20 to-info/10 border-info/20 animate-fadeIn animation-delay-500">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold text-secondary-content">Budget Tip</h3>
              <div className="text-sm">Try using the 50/30/20 rule: 50% on needs, 30% on wants, and 20% on savings.</div>
            </div>
          </div>
        </div>
      </div>      {/* Add Budget Modal */}
      {isAddingBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fadeIn">
          <div className="modal-box relative bg-base-100 border border-gray-100 shadow-2xl">
            <button 
              className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-error/10 hover:text-error border-none"
              onClick={() => setIsAddingBudget(false)}
            >
              <FiX />
            </button>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create New Budget</h3>
              <form onSubmit={handleAddBudget}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Budget Category</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full focus:border-primary" 
                  placeholder="e.g., Groceries, Entertainment"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Budget Limit</span>
                </label>
                <div className="input-group">
                  <span className="bg-base-200">$</span>
                  <input 
                    type="number" 
                    className="input input-bordered w-full focus:border-primary" 
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={newBudget.limit}
                    onChange={(e) => setNewBudget({...newBudget, limit: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Month (YYYY-MM)</span>
                </label>
                <input 
                  type="month" 
                  className="input input-bordered w-full focus:border-primary"
                  value={newBudget.month}
                  onChange={(e) => setNewBudget({...newBudget, month: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Currency</span>
                </label>
                <select 
                  className="select select-bordered w-full focus:border-primary" 
                  value={newBudget.currency}
                  onChange={(e) => setNewBudget({...newBudget, currency: e.target.value})}
                  required
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  className="btn btn-ghost hover:bg-base-200"
                  onClick={() => setIsAddingBudget(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary shadow-md hover:shadow-lg transition-shadow gap-2"
                  disabled={loading}
                >
                  <FiCheck /> Create Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
