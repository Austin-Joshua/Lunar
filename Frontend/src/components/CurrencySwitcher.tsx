import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

export const CurrencySwitcher: React.FC = () => {
  const { selectedCountry, setSelectedCountry, availableCountries } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
        title="Switch currency and country"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedCountry.flag} {selectedCountry.code}</span>
        <span className="sm:hidden">{selectedCountry.flag}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="p-2 max-h-96 overflow-y-auto">
            <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">
              SELECT COUNTRY & CURRENCY
            </div>
            {availableCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-3 text-sm",
                  selectedCountry.code === country.code
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-accent text-foreground"
                )}
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{country.name}</div>
                  <div className="text-xs opacity-70">{country.currency} ({country.symbol})</div>
                </div>
                {selectedCountry.code === country.code && (
                  <span className="text-lg">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
