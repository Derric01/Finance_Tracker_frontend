import React from 'react';
import { 
  FiArrowDown, FiArrowUp, FiEdit, FiTrash2, 
  FiTag, FiCalendar, FiFileText, FiClock
} from 'react-icons/fi';
import { getCurrencySymbol, formatCurrency } from '../utils/currency';

export default function TransactionCard({ transaction, onEdit, onDelete, currency = 'USD' }) {
  const isIncome = transaction.type === 'income';
  
  // Format date
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  
  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formattedDate;
  };
  
  // Get category emoji
  const getCategoryEmoji = (category) => {
    const categories = {
      'Salary': '💼',
      'Freelance': '🧑‍💻',
      'Investments': '📈',
      'Other Income': '💰',
      'Groceries': '🛒',
      'Dining': '🍔',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Transportation': '🚗',
      'Housing': '🏠',
      'Utilities': '💡',
      'Insurance': '🛡️',
      'Healthcare': '⚕️',
      'Education': '🎓',
      'Personal': '👤',
      'Travel': '✈️',
      'Gifts': '🎁',
      'Charity': '🤲',
      'Food': '🍔',
      'Savings': '💰',
      'Income': '💵'
    };
    
    return categories[category] || '💵';
  };
  
  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${isIncome ? 'border-success' : 'border-error'} card-hover`}>
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`p-3 rounded-full mr-4 ${isIncome ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
              {isIncome ? <FiArrowUp className="text-lg" /> : <FiArrowDown className="text-lg" />}
            </div>
            <div>              <h3 className="font-bold flex items-center">
                <span className="mr-2">{getCategoryEmoji(transaction.category)}</span>
                {transaction.category}
              </h3>
              <div className="flex flex-wrap text-xs opacity-70 mt-1 gap-x-3">
                <span className="flex items-center">
                  <FiCalendar className="mr-1" /> {formattedDate}
                </span><span className="flex items-center">
                  <FiClock className="mr-1" /> {getTimeAgo(transaction.date)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold text-lg ${isIncome ? 'text-success' : 'text-error'}`}>
              {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, transaction.currency || currency)}
            </p>
            <p className="text-xs opacity-70 flex items-center justify-end">
              <FiTag className="mr-1" /> {transaction.currency || currency}
            </p>
          </div>
        </div>
        
        {transaction.notes && (
          <div className="mt-3 pt-2 border-t border-base-300">
            <p className="text-sm opacity-80 flex items-start">
              <FiFileText className="mr-2 mt-1 flex-shrink-0" /> 
              {transaction.notes}
            </p>
          </div>
        )}
        
        <div className="card-actions justify-end mt-3 pt-2 border-t border-base-300">
          {onEdit && (
            <button 
              className="btn btn-ghost btn-sm" 
              onClick={() => onEdit(transaction)}
            >
              <FiEdit className="mr-1" /> Edit
            </button>
          )}
          {onDelete && (
            <button 
              className="btn btn-ghost btn-sm text-error" 
              onClick={() => onDelete(transaction._id)}
            >
              <FiTrash2 className="mr-1" /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
