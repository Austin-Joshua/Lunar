/**
 * Currency and Regional Configuration
 */

export const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  name: 'Indian Rupee',
};

export const REGION = {
  country: 'India',
  city: 'Mumbai',
  countryCode: 'IN',
  phoneCode: '+91',
};

// Utility function to format price with INR
export const formatPrice = (amount: number): string => {
  return `${CURRENCY.symbol}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// Alternative format with decimals
export const formatPriceWithDecimals = (amount: number): string => {
  return `${CURRENCY.symbol}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
