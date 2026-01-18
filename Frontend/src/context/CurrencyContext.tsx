import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  exchangeRate: number; // Rate relative to USD
  flag: string;
}

export const COUNTRIES: Record<string, Country> = {
  USD: {
    code: 'USD',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    exchangeRate: 1,
    flag: '🇺🇸',
  },
  EUR: {
    code: 'EUR',
    name: 'Europe',
    currency: 'EUR',
    symbol: '€',
    exchangeRate: 0.92,
    flag: '🇪🇺',
  },
  GBP: {
    code: 'GBP',
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    exchangeRate: 0.79,
    flag: '🇬🇧',
  },
  JPY: {
    code: 'JPY',
    name: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    exchangeRate: 149.50,
    flag: '🇯🇵',
  },
  AUD: {
    code: 'AUD',
    name: 'Australia',
    currency: 'AUD',
    symbol: 'A$',
    exchangeRate: 1.52,
    flag: '🇦🇺',
  },
  CAD: {
    code: 'CAD',
    name: 'Canada',
    currency: 'CAD',
    symbol: 'C$',
    exchangeRate: 1.36,
    flag: '🇨🇦',
  },
  INR: {
    code: 'INR',
    name: 'India',
    currency: 'INR',
    symbol: '₹',
    exchangeRate: 83.12,
    flag: '🇮🇳',
  },
  AED: {
    code: 'AED',
    name: 'United Arab Emirates',
    currency: 'AED',
    symbol: 'د.إ',
    exchangeRate: 3.67,
    flag: '🇦🇪',
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore',
    currency: 'SGD',
    symbol: 'S$',
    exchangeRate: 1.35,
    flag: '🇸🇬',
  },
  CHF: {
    code: 'CHF',
    name: 'Switzerland',
    currency: 'CHF',
    symbol: 'CHF',
    exchangeRate: 0.88,
    flag: '🇨🇭',
  },
};

interface CurrencyContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (price: number) => string;
  availableCountries: Country[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES.USD);

  // Load saved country preference from localStorage
  useEffect(() => {
    const savedCountry = localStorage.getItem('lunar_selected_country');
    if (savedCountry && COUNTRIES[savedCountry]) {
      setSelectedCountry(COUNTRIES[savedCountry]);
    }
  }, []);

  // Save country preference to localStorage
  const handleSetSelectedCountry = (country: Country) => {
    setSelectedCountry(country);
    localStorage.setItem('lunar_selected_country', country.code);
  };

  const convertPrice = (priceInUSD: number): number => {
    return Math.round(priceInUSD * selectedCountry.exchangeRate * 100) / 100;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    
    // Format based on currency
    if (selectedCountry.code === 'JPY') {
      // JPY doesn't use decimals typically
      return `${selectedCountry.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    } else if (selectedCountry.code === 'INR') {
      // Indian Rupee formatting
      return `${selectedCountry.symbol}${convertedPrice.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`;
    } else {
      // Standard formatting for other currencies
      return `${selectedCountry.symbol}${convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  const availableCountries = Object.values(COUNTRIES);

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry: handleSetSelectedCountry,
        convertPrice,
        formatPrice,
        availableCountries,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
