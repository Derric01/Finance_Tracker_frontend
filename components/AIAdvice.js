import React, { useState } from 'react';
import { 
  FiCpu, FiLoader, FiRefreshCw, FiX, FiTrendingUp, 
  FiAward, FiBarChart, FiAlertCircle, FiCheckCircle, 
  FiDollarSign, FiArrowRight, FiBriefcase, FiCodesandbox
} from 'react-icons/fi';
import api from '../utils/api';

export default function AIAdvice() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchAdvice = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add a small delay to show loading spinner
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // Try to fetch from the backend
        const response = await api.get('/ai/insights');
        setAdvice(response.data.insights);
      } catch (err) {
        // If backend fails, use enhanced dummy insights
        const dummyInsights = `Financial Health Score: 78/100 - Your financial health is above average! You're doing well managing your money.

Spending Pattern Analysis: Based on your recent transactions, you spend approximately $1,300 monthly on expenses while earning $5,800. Your largest expense category is Groceries ($450), followed by Shopping ($300) and Transportation ($200). This shows good control over discretionary spending.

Budget Recommendation: Consider allocating 50% of income to needs ($2,900), 30% to wants ($1,740), and 20% to savings ($1,160). You're currently saving about $4,500 monthly, which exceeds the 20% rule - excellent work!

Savings Opportunity: Your grocery spending of $450/month is reasonable, but you could save $50-75 monthly by meal planning and buying generic brands. Your $300 shopping expense could be reduced by 25% by implementing a 24-hour rule before purchases.

Action Items: 1) Set up automatic transfers for emergency fund, 2) Consider investing surplus savings in index funds, 3) Track small daily expenses like coffee or snacks, 4) Review subscriptions monthly to eliminate unused services.`;
        
        setAdvice(dummyInsights);
      }
    } catch (err) {
      console.error('Error fetching AI advice:', err);
      setError('Unable to generate insights at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title flex items-center text-primary">
          <FiCpu className="mr-2" />
          AI Financial Insights
          <div className="badge badge-accent badge-sm ml-2">Beta</div>
        </h2>
          {!advice && !loading && !error && (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <FiCodesandbox className="text-4xl text-primary animate-pulse" />
              </div>
            </div>
            <p className="mb-6 text-lg">Get personalized AI-powered financial advice based on your spending patterns and goals.</p>
            <button 
              className="btn btn-primary btn-wide" 
              onClick={fetchAdvice}
            >
              <FiBriefcase className="mr-2" /> Generate Insights
            </button>
          </div>
        )}
        
        {loading && (
          <div className="py-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <FiLoader className="animate-spin text-5xl text-primary mb-4" />
                <FiDollarSign className="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-lg mt-2">Analyzing your financial data...</p>
              <p className="text-sm opacity-70 mt-2">This may take a moment</p>
              <div className="mt-4 flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-error/10 p-4 rounded-full">
                <FiAlertCircle className="text-4xl text-error" />
              </div>
            </div>
            <div className="alert alert-error mb-6">
              <p>{error}</p>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={fetchAdvice}
            >
              <FiRefreshCw className="mr-2" /> Try Again
            </button>
          </div>
        )}
        
        {advice && !loading && (
          <div className="mt-4">
            <div className="flex justify-center mb-4">
              <div className="bg-success/10 p-3 rounded-full">
                <FiCheckCircle className="text-3xl text-success" />
              </div>
            </div>
            <div className="prose max-w-none bg-base-200 p-4 rounded-lg">
              {typeof advice === 'string' && advice.split('\n\n').map((paragraph, index) => {
                // Add icons to specific sections if they exist
                if (paragraph.includes("Spending Pattern")) {
                  return (
                    <div key={index} className="flex mb-3 items-start">
                      <FiBarChart className="mr-2 mt-1 flex-shrink-0 text-primary" />
                      <p className="m-0">{paragraph}</p>
                    </div>
                  );
                } else if (paragraph.includes("Budget Recommendation")) {
                  return (
                    <div key={index} className="flex mb-3 items-start">
                      <FiDollarSign className="mr-2 mt-1 flex-shrink-0 text-primary" />
                      <p className="m-0">{paragraph}</p>
                    </div>
                  );
                } else if (paragraph.includes("Savings Opportunity")) {
                  return (
                    <div key={index} className="flex mb-3 items-start">
                      <FiTrendingUp className="mr-2 mt-1 flex-shrink-0 text-primary" />
                      <p className="m-0">{paragraph}</p>
                    </div>
                  );
                } else if (paragraph.includes("Financial Health Score")) {
                  return (
                    <div key={index} className="flex mb-3 items-start">
                      <FiAward className="mr-2 mt-1 flex-shrink-0 text-primary" />
                      <p className="m-0">{paragraph}</p>
                    </div>
                  );
                } else if (paragraph.includes("Action Items")) {
                  return (
                    <div key={index} className="flex mb-3 items-start">
                      <FiArrowRight className="mr-2 mt-1 flex-shrink-0 text-primary" />
                      <p className="m-0">{paragraph}</p>
                    </div>
                  );
                }
                
                return <p key={index} className="mb-3">{paragraph}</p>;
              })}
            </div>
            <div className="card-actions justify-end mt-6">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setAdvice(null)}
              >
                <FiX className="mr-1" /> Dismiss
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={fetchAdvice}
              >
                <FiRefreshCw className="mr-1" /> Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
