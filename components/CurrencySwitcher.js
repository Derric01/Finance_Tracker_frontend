import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiGlobe } from 'react-icons/fi';
import { getCurrencySymbol, getCurrencyFlag, getPreferredCurrency, savePreferredCurrency } from '../utils/currency';

export default function CurrencySwitcher({ onChange, initialCurrency = 'USD' }) {
  const [currency, setCurrency] = useState(initialCurrency);
  
  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD', emoji: '🇺🇸' },
    { code: 'EUR', symbol: '€', label: 'EUR', emoji: '🇪🇺' },
    { code: 'INR', symbol: '₹', label: 'INR', emoji: '🇮🇳' },
    { code: 'GBP', symbol: '£', label: 'GBP', emoji: '🇬🇧' },
    { code: 'JPY', symbol: '¥', label: 'JPY', emoji: '🇯🇵' },
  ];
  
  useEffect(() => {
    // Set initial currency from user preferences if available
    const savedCurrency = getPreferredCurrency();
    if (savedCurrency) {
      setCurrency(savedCurrency);
      if (onChange) onChange(savedCurrency);
    }
  }, [onChange]);
  
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    savePreferredCurrency(newCurrency);
    if (onChange) onChange(newCurrency);
    document.activeElement.blur(); // Close dropdown
  };
  
  const getCurrentCurrencySymbol = () => {
    const curr = currencies.find(c => c.code === currency);
    return curr ? `${curr.emoji} ${curr.symbol}` : '🇺🇸 $';
  };
  
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-sm gap-1 normal-case flex items-center">
        <FiGlobe className="text-primary" />
        <span>{getCurrentCurrencySymbol()}</span>
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li className="menu-title">
          <span>Select Currency</span>
        </li>
        {currencies.map(curr => (
          <li key={curr.code}>
            <a 
              className={currency === curr.code ? 'active' : ''} 
              onClick={() => handleCurrencyChange(curr.code)}
            >
              <span className="mr-2">{curr.emoji}</span>
              <span>{curr.symbol} {curr.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
