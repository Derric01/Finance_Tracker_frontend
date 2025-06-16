import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TransactionCard from '../components/TransactionCard';
import AIAdvice from '../components/AIAdvice';
import CurrencySwitcher from '../components/CurrencySwitcher';
import api from '../utils/api';
import { getUserData } from '../utils/auth';
import { formatCurrency, getPreferredCurrency } from '../utils/currency';
import { 
  FiPlusCircle, FiDollarSign, FiTrendingUp, FiTrendingDown, 
  FiTarget, FiPieChart, FiRefreshCw, FiCalendar, FiActivity,
  FiCreditCard, FiShoppingBag, FiArrowRight, FiClock, FiBarChart2,
  FiAlertCircle, FiBookOpen, FiStar, FiAlertTriangle
} from 'react-icons/fi';

// General Finance Tips
const FINANCE_TIPS = [
  {
    title: "50/30/20 Budgeting Rule",
    description: "Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
    iconName: "FiPieChart",
    iconColor: "text-primary"
  },
  {
    title: "Emergency Fund",
    description: "Build an emergency fund covering 3-6 months of living expenses before investing.",
    iconName: "FiTarget",
    iconColor: "text-success"
  },
  {
    title: "Automate Savings",
    description: "Set up automatic transfers to savings accounts to make saving effortless.",
    iconName: "FiRefreshCw",
    iconColor: "text-info"
  },
  {
    title: "Track Your Spending",
    description: "Monitor where your money goes. Small expenses can add up to significant amounts.",
    iconName: "FiBarChart2",
    iconColor: "text-warning"
  },
  {
    title: "Pay Off High-Interest Debt",
    description: "Prioritize paying off credit cards and high-interest loans before investing.",
    iconName: "FiCreditCard",
    iconColor: "text-error"
  },
  {
    title: "Invest for the Long Term",
    description: "Start investing early and stay consistent. Time in the market beats timing the market.",
    iconName: "FiTrendingUp",
    iconColor: "text-primary"
  }
];

export default function Dashboard() {
  const [currency, setCurrency] = useState(getPreferredCurrency());
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState(null);
  const [budgetSummary, setBudgetSummary] = useState({ total: 0, spent: 0 });
  const [budgetsLoading, setBudgetsLoading] = useState(true);
  const [budgetsError, setBudgetsError] = useState(null);
  const [goalsSummary, setGoalsSummary] = useState({ count: 0, completed: 0, inProgress: 0 });
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [goalsError, setGoalsError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Get the user's name from storage
  useEffect(() => {
    const user = getUserData();
    setUserData(user);
    
    // If we don't have user data, try to fetch it
    if (!user) {      const fetchUserData = async () => {
        try {
          const response = await api.get('/auth/me');
          if (response.data && response.data.data) {
            setUserData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
      fetchUserData();
    }
  }, []);

  // Fetch recent transactions
  const fetchTransactions = useCallback(async () => {
    try {
      setTransactionsLoading(true);
      const response = await api.get('/transactions?limit=5');
      
      if (response.data) {
        setRecentTransactions(response.data.data || response.data);
      }
      setTransactionsError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      
      if (err.isNetworkError) {
        setTransactionsError('Cannot connect to server.');
      } else {
        setTransactionsError('Failed to load transactions.');
      }
        // Set some dummy data for demo purposes
      setRecentTransactions([
        { _id: '1', amount: 120, type: 'expense', category: 'Groceries', date: '2023-06-15', notes: 'Weekly groceries', currency: 'USD' },
        { _id: '2', amount: 2000, type: 'income', category: 'Salary', date: '2023-06-01', notes: 'Monthly salary', currency: 'USD' },
        { _id: '3', amount: 45, type: 'expense', category: 'Entertainment', date: '2023-06-10', notes: 'Movie tickets', currency: 'USD' },
        { _id: '4', amount: 500, type: 'expense', category: 'Rent', date: '2023-06-05', notes: 'Monthly rent', currency: 'USD' },
        { _id: '5', amount: 85, type: 'expense', category: 'Utilities', date: '2023-06-07', notes: 'Electricity bill', currency: 'USD' }
      ]);
    } finally {
      setTransactionsLoading(false);
    }
  }, []);

  // Fetch budget summary
  const fetchBudgetSummary = useCallback(async () => {
    try {
      setBudgetsLoading(true);
      const response = await api.get('/budgets');
      
      if (response.data && response.data.data) {
        const budgets = response.data.data;
        const total = budgets.reduce((sum, budget) => sum + budget.limit, 0);
        // This is a placeholder since we don't track spent amount directly
        // In a real app, you would calculate this based on transactions
        const spent = total * 0.7; // Just for demo
        
        setBudgetSummary({ total, spent });
      }
      setBudgetsError(null);
    } catch (err) {
      console.error('Error fetching budgets:', err);
      
      if (err.isNetworkError) {
        setBudgetsError('Cannot connect to server.');
      } else {
        setBudgetsError('Failed to load budgets.');
      }
      
      // Set some dummy data
      setBudgetSummary({ total: 3000, spent: 2100 });
    } finally {
      setBudgetsLoading(false);
    }
  }, []);

  // Fetch goals summary
  const fetchGoalsSummary = useCallback(async () => {
    try {
      setGoalsLoading(true);
      const response = await api.get('/goals');
      
      if (response.data && response.data.data) {
        const goals = response.data.data;
        const count = goals.length;
        const completed = goals.filter(goal => goal.completed).length;
        const inProgress = count - completed;
        
        setGoalsSummary({ count, completed, inProgress });
      }
      setGoalsError(null);
    } catch (err) {
      console.error('Error fetching goals:', err);
      
      if (err.isNetworkError) {
        setGoalsError('Cannot connect to server.');
      } else {
        setGoalsError('Failed to load goals.');
      }
      
      // Set some dummy data
      setGoalsSummary({ count: 4, completed: 1, inProgress: 3 });
    } finally {
      setGoalsLoading(false);
    }
  }, []);

  // Initial data fetching
  useEffect(() => {
    fetchTransactions();
    fetchBudgetSummary();
    fetchGoalsSummary();
  }, [fetchTransactions, fetchBudgetSummary, fetchGoalsSummary]);

  // Function to render icon dynamically
  const renderIcon = (iconName, iconColor) => {
    const iconProps = { className: iconColor };
    switch (iconName) {
      case 'FiPieChart': return <FiPieChart {...iconProps} />;
      case 'FiTarget': return <FiTarget {...iconProps} />;
      case 'FiRefreshCw': return <FiRefreshCw {...iconProps} />;
      case 'FiBarChart2': return <FiBarChart2 {...iconProps} />;
      case 'FiCreditCard': return <FiCreditCard {...iconProps} />;
      case 'FiTrendingUp': return <FiTrendingUp {...iconProps} />;
      default: return <FiDollarSign {...iconProps} />;
    }
  };
  
  return (
    <Layout>      <div className="container mx-auto px-4 py-8">
        {/* Greeting section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fadeIn">
            Welcome, {userData?.name || 'User'}!
          </h1>
          <p className="text-gray-600 mt-1 animate-fadeIn animation-delay-200">
            Here's an overview of your finances
          </p>
        </div>        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeIn animation-delay-300">
          <Link href="/transactions/add">
            <a className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="card-body items-center text-center p-4">
                <div className="rounded-full bg-primary/10 p-3 mb-2">
                  <FiDollarSign className="text-2xl text-primary" />
                </div>
                <h3 className="card-title text-sm">Add Transaction</h3>
              </div>
            </a>
          </Link>
          <Link href="/budgets">
            <a className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="card-body items-center text-center p-4">
                <div className="rounded-full bg-secondary/10 p-3 mb-2">
                  <FiPieChart className="text-2xl text-secondary" />
                </div>
                <h3 className="card-title text-sm">Manage Budgets</h3>
              </div>
            </a>
          </Link>
          <Link href="/goals">
            <a className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="card-body items-center text-center p-4">
                <div className="rounded-full bg-accent/10 p-3 mb-2">
                  <FiTarget className="text-2xl text-accent" />
                </div>
                <h3 className="card-title text-sm">View Goals</h3>
              </div>
            </a>
          </Link>
          <Link href="/transactions">
            <a className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="card-body items-center text-center p-4">
                <div className="rounded-full bg-info/10 p-3 mb-2">
                  <FiActivity className="text-2xl text-info" />
                </div>
                <h3 className="card-title text-sm">All Transactions</h3>
              </div>
            </a>
          </Link>
        </div>

        {/* Main Dashboard Content */}        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn animation-delay-500">
          {/* Left Column - Financial Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Financial Summary */}
            <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Financial Summary</h2>                  <CurrencySwitcher 
                    initialCurrency={currency}
                    onChange={setCurrency}
                  />
                </div>
                
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-gradient-to-r from-base-100 to-base-200">
                  <div className="stat">                    <div className="stat-title font-medium">Budget</div>
                    <div className="stat-value text-primary">
                      {formatCurrency(budgetSummary.total, currency)}
                    </div>
                    <div className="stat-desc">
                      {budgetsError ? (
                        <span className="text-error flex items-center">
                          <FiAlertTriangle className="mr-1" /> Error loading
                        </span>
                      ) : budgetsLoading ? (
                        'Loading...'
                      ) : (
                        `${Math.round((budgetSummary.spent / budgetSummary.total) * 100)}% spent`
                      )}
                    </div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-title font-medium">Goals</div>
                    <div className="stat-value text-secondary">{goalsSummary.count}</div>
                    <div className="stat-desc">
                      {goalsError ? (
                        <span className="text-error flex items-center">
                          <FiAlertTriangle className="mr-1" /> Error loading
                        </span>
                      ) : goalsLoading ? (
                        'Loading...'
                      ) : (
                        `${goalsSummary.completed} completed, ${goalsSummary.inProgress} in progress`
                      )}
                    </div>
                  </div>
                    <div className="stat">
                    <div className="stat-title font-medium">Savings</div>
                    <div className="stat-value text-accent">
                      ${(budgetSummary.total - budgetSummary.spent).toFixed(0)}
                    </div>
                    <div className="stat-desc">Remaining budget</div>
                  </div>
                </div>
              </div>
            </div>            {/* Recent Transactions */}
            <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title font-bold text-xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Recent Transactions</h2>
                  <Link href="/transactions">
                    <a className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 group">
                      View All <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Link>
                </div>
                
                {transactionsError ? (
                  <div className="alert alert-error shadow-lg">
                    <FiAlertTriangle className="mr-2" />
                    {transactionsError}
                  </div>
                ) : transactionsLoading ? (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No transactions yet</p>
                    <Link href="/transactions/add">
                      <a className="btn btn-primary btn-sm gap-2 shadow-md hover:shadow-lg transition-shadow">
                        <FiPlusCircle /> Add Transaction
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map(transaction => (
                      <TransactionCard 
                        key={transaction._id}
                        transaction={transaction}
                        currency={currency}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>          {/* Right Column - AI Advice and Financial Tips */}
          <div className="space-y-8">
            {/* AI Financial Advice */}
            <AIAdvice />
            
            {/* Financial Tips */}
            <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <h2 className="card-title font-bold text-xl bg-gradient-to-r from-accent to-info bg-clip-text text-transparent">Financial Tips</h2>
                <div className="space-y-6 mt-4">
                  {FINANCE_TIPS.slice(0, 3).map((tip, index) => (
                    <div key={index} className="flex items-start hover:translate-x-1 transition-transform">
                      <div className={`p-3 rounded-full ${tip.iconColor.replace('text-', 'bg-')} bg-opacity-10 mr-4`}>
                        {tip.iconName === "FiPieChart" && <FiPieChart className={tip.iconColor} />}
                        {tip.iconName === "FiTarget" && <FiTarget className={tip.iconColor} />}
                        {tip.iconName === "FiRefreshCw" && <FiRefreshCw className={tip.iconColor} />}
                        {tip.iconName === "FiBarChart2" && <FiBarChart2 className={tip.iconColor} />}
                        {tip.iconName === "FiCreditCard" && <FiCreditCard className={tip.iconColor} />}
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-content">{tip.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
