/**
 * Utility functions for currency formatting and handling
 */

/**
 * Get the currency symbol for a given currency code
 * @param {string} currencyCode - The currency code (USD, EUR, etc.)
 * @returns {string} The currency symbol
 */
export function getCurrencySymbol(currencyCode) {
  switch(currencyCode) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'INR': return '₹';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    default: return '$'; // Default to USD symbol
  }
}

/**
 * Format an amount with the appropriate currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - The currency code (USD, EUR, etc.)
 * @returns {string} Formatted amount with currency symbol
 */
export function formatCurrency(amount, currencyCode = 'USD') {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Get emoji flag for a currency
 * @param {string} currencyCode - The currency code (USD, EUR, etc.)
 * @returns {string} The emoji flag
 */
export function getCurrencyFlag(currencyCode) {
  switch(currencyCode) {
    case 'USD': return '🇺🇸';
    case 'EUR': return '🇪🇺';
    case 'INR': return '🇮🇳';
    case 'GBP': return '🇬🇧';
    case 'JPY': return '🇯🇵';
    default: return '🇺🇸'; // Default to US flag
  }
}

/**
 * Get user's preferred currency from localStorage
 * @returns {string} The preferred currency code or 'USD' as default
 */
export function getPreferredCurrency() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferredCurrency') || 'USD';
  }
  return 'USD';
}

/**
 * Save user's preferred currency to localStorage
 * @param {string} currencyCode - The currency code to save
 */
export function savePreferredCurrency(currencyCode) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferredCurrency', currencyCode);
  }
}
