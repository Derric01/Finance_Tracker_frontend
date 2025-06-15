import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { FiTarget, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import api from '../../utils/api';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    currency: 'USD'
  });

  const priorities = ['Low', 'Medium', 'High'];

  // Fetch goals from the backend
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await api.get('/goals');
      
      if (response.data) {
        setGoals(response.data.data || response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching goals:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError('Failed to load goals. Please try again later.');
      }
        // Set some dummy data for demo purposes when backend is not available
      setGoals([
        { 
          _id: '1', 
          title: 'Emergency Fund', 
          targetAmount: 10000, 
          currentAmount: 6500, 
          deadline: '2023-12-31',
          currency: 'USD',
          description: 'Save for emergencies'
        },
        { 
          _id: '2', 
          title: 'New Car', 
          targetAmount: 25000, 
          currentAmount: 8000, 
          deadline: '2024-06-30',
          currency: 'USD',
          description: 'Save for a new car'
        },
        { 
          _id: '3', 
          title: 'Vacation', 
          targetAmount: 5000, 
          currentAmount: 2800, 
          deadline: '2023-08-15',
          currency: 'USD',
          description: 'Family vacation'
        },
        { 
          _id: '4', 
          title: 'Down Payment', 
          targetAmount: 50000, 
          currentAmount: 15000, 
          deadline: '2025-01-01',
          currency: 'USD',
          description: 'House down payment'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);
  // Handle adding a new goal
  const handleAddGoal = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Format goal data to match backend schema
      const goalData = {
        title: newGoal.title,
        description: newGoal.description || '',
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount || 0),
        deadline: newGoal.deadline,
        currency: newGoal.currency
      };
      
      const response = await api.post('/goals', goalData);
      
      if (response.data) {
        // Reset form and close modal
        setNewGoal({
          title: '',
          description: '',
          targetAmount: '',
          currentAmount: '0',
          deadline: new Date().toISOString().split('T')[0],
          priority: 'Medium',
          currency: 'USD'
        });
        setIsAddingGoal(false);
        
        // Refresh goals
        fetchGoals();
      }
    } catch (err) {
      console.error('Error adding goal:', err);
      alert('Failed to add goal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a goal
  const handleDeleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await api.delete(`/goals/${id}`);
        // Refresh goals
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
        alert('Failed to delete goal. Please try again.');
      }
    }
  };

  // Handle adding funds to a goal
  const handleAddFunds = async (goal) => {
    const amount = prompt(`Enter the amount to add to "${goal.name}" goal:`);
    
    if (amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
      try {
        const newAmount = goal.currentAmount + parseFloat(amount);
        await api.put(`/goals/${goal._id}`, {
          ...goal,
          currentAmount: newAmount
        });
        
        // Refresh goals
        fetchGoals();
      } catch (error) {
        console.error('Error updating goal:', error);
        alert('Failed to update goal. Please try again.');
      }
    }
  };

  // Calculate totals
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const progressPercentage = totalTargetAmount > 0 
    ? Math.round((totalSavedAmount / totalTargetAmount) * 100) 
    : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FiTarget className="mr-2" /> Financial Goals
          </h1>
          <button 
            className="btn btn-primary btn-sm flex items-center gap-2"
            onClick={() => setIsAddingGoal(true)}
          >
            <FiPlus /> Add Goal
          </button>
        </div>

        {error && (
          <div className="alert alert-warning mb-6">
            <div className="flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="stats shadow w-full mb-8">
          <div className="stat">
            <div className="stat-title">Total Goals</div>
            <div className="stat-value">{goals.length}</div>
            <div className="stat-desc">Active financial goals</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Target</div>
            <div className="stat-value">${totalTargetAmount.toLocaleString()}</div>
            <div className="stat-desc">Combined goal amount</div>
          </div>
          <div className="stat">
            <div className="stat-title">Saved So Far</div>
            <div className="stat-value">${totalSavedAmount.toLocaleString()}</div>
            <div className="stat-desc text-success">{progressPercentage}% of target</div>
          </div>
        </div>

        {loading && goals.length === 0 ? (
          <div className="flex justify-center my-8">
            <div className="loader">Loading...</div>
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg mb-4">You don't have any financial goals yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setIsAddingGoal(true)}
            >
              <FiPlus className="mr-2" /> Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div key={goal._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title">{goal.name}</h2>
                    <div className={`badge ${
                      goal.priority === 'High' ? 'badge-error' : 
                      goal.priority === 'Medium' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {goal.priority}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 my-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Target</span>
                      <span className="font-semibold">${goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500">Deadline</span>
                      <span className="font-semibold">{new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <progress 
                      className="progress progress-primary w-full" 
                      value={goal.currentAmount} 
                      max={goal.targetAmount}
                    ></progress>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% complete
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => handleAddFunds(goal)}
                    >
                      <FiCheck className="mr-1" /> Add Funds
                    </button>
                    <button className="btn btn-outline btn-sm btn-square">
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn btn-outline btn-sm btn-square btn-error"
                      onClick={() => handleDeleteGoal(goal._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="alert alert-info shadow-lg mt-8">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold">Goal Setting Tip</h3>
              <div className="text-sm">Make your financial goals SMART: Specific, Measurable, Achievable, Relevant, and Time-bound.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {isAddingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="modal-box relative">
            <button 
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsAddingGoal(false)}
            >
              <FiX />
            </button>
            <h3 className="text-lg font-bold mb-4">Create New Financial Goal</h3>
              <form onSubmit={handleAddGoal}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Goal Title</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="e.g., Emergency Fund, New Car"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description (Optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full" 
                  placeholder="Add more details about your goal"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  rows="2"
                ></textarea>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Target Amount</span>
                </label>
                <div className="input-group">
                  <span>$</span>
                  <input 
                    type="number" 
                    className="input input-bordered w-full" 
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Initial Amount (optional)</span>
                </label>
                <div className="input-group">
                  <span>$</span>
                  <input 
                    type="number" 
                    className="input input-bordered w-full" 
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Currency</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  value={newGoal.currency}
                  onChange={(e) => setNewGoal({...newGoal, currency: e.target.value})}
                  required
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text flex items-center"><FiCalendar className="mr-2" /> Target Date</span>
                </label>
                <input 
                  type="date" 
                  className="input input-bordered w-full" 
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  required
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => setIsAddingGoal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <FiCheck className="mr-2" /> Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
