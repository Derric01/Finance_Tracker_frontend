import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { 
  FiPlusCircle, FiArrowLeft, FiDollarSign, FiCalendar, 
  FiArrowUp, FiArrowDown, FiTrash2, FiEdit, FiFilter
} from 'react-icons/fi';
import TransactionCard from '../../components/TransactionCard';
import api from '../../utils/api';
import { formatCurrency } from '../../utils/currency';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    type: 'all', // 'all', 'income', 'expense'
    category: 'all',
    sortBy: 'date', // 'date', 'amount'
    sortOrder: 'desc' // 'asc', 'desc'
  });
  
  const categories = [
    'All', 'Food', 'Transportation', 'Housing', 'Entertainment', 
    'Utilities', 'Healthcare', 'Shopping', 'Education', 
    'Personal', 'Investments', 'Income', 'Other'
  ];

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/transactions');
      
      if (response.data) {
        setTransactions(response.data.data || response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError('Failed to load transactions. Please try again later.');
      }      // Set some dummy data for demo purposes when backend is not available
      setTransactions([
        { _id: '1', notes: 'Grocery Shopping', amount: 120.50, category: 'Food', date: '2023-06-15', type: 'expense', currency: 'USD' },
        { _id: '2', notes: 'Salary', amount: 3000, category: 'Income', date: '2023-06-01', type: 'income', currency: 'USD' },
        { _id: '3', notes: 'Electric Bill', amount: 85.20, category: 'Utilities', date: '2023-06-10', type: 'expense', currency: 'USD' },
        { _id: '4', description: 'Movie Tickets', amount: 25.00, category: 'Entertainment', date: '2023-06-18', type: 'expense', currency: 'USD' },
        { _id: '5', description: 'Freelance Work', amount: 500, category: 'Income', date: '2023-06-20', type: 'income', currency: 'USD' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle deleting a transaction
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.delete(`/transactions/${id}`);
        // Refresh the transactions list
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Failed to delete transaction. Please try again.');
      }
    }
  };
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      // Filter by type
      if (filter.type === 'income' && transaction.type === 'expense') return false;
      if (filter.type === 'expense' && transaction.type === 'income') return false;
      
      // Filter by category
      if (filter.category !== 'all' && transaction.category.toLowerCase() !== filter.category) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date or amount
      if (filter.sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return filter.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return filter.sortOrder === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      }
    });
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;
  return (    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Transactions</h1>
        <div className="flex space-x-2">
          <Link href="/dashboard">
            <a className="btn btn-ghost btn-sm sm:btn-md hover:bg-base-200 transition-colors">
              <FiArrowLeft className="mr-2" /> Dashboard
            </a>
          </Link>
          <Link href="/transactions/add">
            <a className="btn btn-primary btn-sm sm:btn-md shadow-md hover:shadow-lg transition-shadow gap-2">
              <FiPlusCircle /> New Transaction
            </a>
          </Link>
        </div>
      </div>      {/* Summary Cards */}
      <div className="stats stats-vertical sm:stats-horizontal shadow w-full mb-6 bg-gradient-to-r from-base-100 to-base-200 border border-gray-100 animate-fadeIn animation-delay-200">
        <div className="stat">
          <div className="stat-figure text-primary">
            <div className="rounded-full bg-primary/10 p-3">
              <FiDollarSign className="text-2xl text-primary" />
            </div>
          </div>
          <div className="stat-title font-medium">Balance</div>
          <div className={`stat-value ${balance >= 0 ? 'text-success' : 'text-error'}`}>
            ${balance.toFixed(2)}
          </div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-success">
            <div className="rounded-full bg-success/10 p-3">
              <FiArrowUp className="text-2xl text-success" />
            </div>
          </div>
          <div className="stat-title font-medium">Income</div>
          <div className="stat-value text-success">${totalIncome.toFixed(2)}</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-error">
            <div className="rounded-full bg-error/10 p-3">
              <FiArrowDown className="text-2xl text-error" />
            </div>
          </div>
          <div className="stat-title font-medium">Expenses</div>
          <div className="stat-value text-error">${totalExpense.toFixed(2)}</div>        </div>
      </div>      {/* Filters */}
      <div className="card bg-base-100 shadow-md mb-6 border border-gray-100 hover:shadow-lg transition-all duration-300 animate-fadeIn animation-delay-300">
        <div className="card-body">          <h2 className="card-title text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent flex items-center">
            <FiFilter className="mr-2 text-secondary" /> Filters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Transaction Type</span>
              </label>
              <select 
                className="select select-bordered w-full focus:border-primary" 
                value={filter.type}
                onChange={(e) => setFilter({...filter, type: e.target.value})}
              >
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>
              <select 
                className="select select-bordered w-full focus:border-primary" 
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value.toLowerCase()})}
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Sort By</span>
              </label>              <select 
                className="select select-bordered w-full focus:border-primary" 
                value={filter.sortBy}
                onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Sort Order</span>
              </label>
              <select 
                className="select select-bordered w-full focus:border-primary" 
                value={filter.sortOrder}
                onChange={(e) => setFilter({...filter, sortOrder: e.target.value})}
              >
                <option value="desc">Newest/Highest First</option>
                <option value="asc">Oldest/Lowest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>      {/* Transactions List */}
      <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-fadeIn animation-delay-400">
        <div className="card-body">
          <h2 className="card-title mb-4 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Transaction History</h2>
          
          {error && (
            <div className="alert alert-warning mb-4 shadow-md">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center my-8">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg mb-4">No transactions found.</p>
              <Link href="/transactions/add">
                <a className="btn btn-primary shadow-md hover:shadow-lg transition-shadow gap-2">
                  <FiPlusCircle /> Add Your First Transaction
                </a>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">              <table className="table table-compact sm:table-normal w-full">
                <thead>
                  <tr>
                    <th className="bg-base-200">Date</th>
                    <th className="bg-base-200">Description</th>
                    <th className="bg-base-200 hidden sm:table-cell">Category</th>
                    <th className="bg-base-200">Amount</th>
                    <th className="bg-base-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(transaction => (                    <tr key={transaction._id} className="hover:bg-base-200/30 transition-colors">
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar placeholder">
                            <div className={`bg-${transaction.type === 'income' ? 'success' : 'error'}/10 text-${transaction.type === 'income' ? 'success' : 'error'} rounded-full w-8 sm:w-12 flex items-center justify-center`}>
                              <span className="text-base sm:text-xl">{transaction.type === 'income' ? '+' : '-'}</span>
                            </div>
                          </div>
                          <div className="hidden sm:block">
                            <div className="font-bold">
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="sm:hidden text-xs">
                            {new Date(transaction.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="font-medium text-sm sm:text-base">{transaction.notes}</span>
                          <div className="badge badge-outline badge-sm mt-1 sm:hidden">{transaction.category}</div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <div className="badge badge-outline badge-sm">{transaction.category}</div>
                      </td>                      
                      <td className={transaction.type === 'income' ? 'text-success font-bold' : 'text-error font-bold'}>
                        <div className="text-sm sm:text-base">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                      </td>
                      <td>
                        <div className="flex space-x-1 sm:space-x-2">
                          <Link href={`/transactions/edit/${transaction._id}`}>
                            <a className="btn btn-ghost btn-xs hover:bg-base-200">
                              <FiEdit />
                            </a>
                          </Link>
                          <button 
                            className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                            onClick={() => handleDelete(transaction._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
