# 🌍 LOCATION & CURRENCY - QUICK IMPLEMENTATION GUIDE

## What You'll Get

```
User in India:                User in USA:              User in Japan:
┌─────────────┐             ┌─────────────┐           ┌─────────────┐
│ T-Shirt     │             │ T-Shirt     │           │ T-Shirt     │
│ ₹599 INR    │             │ $7.19 USD   │           │ ¥1,061 JPY  │
│ [Add Cart]  │             │ [Add Cart]  │           │ [Add Cart]  │
└─────────────┘             └─────────────┘           └─────────────┘
```

---

## ⚡ QUICK IMPLEMENTATION (3.5 Hours)

### Step 1: Create Frontend Context (30 min)

**File: `Frontend/src/context/LocationContext.tsx`**

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';

type Location = 'IN' | 'US' | 'GB' | 'EU' | 'AU' | 'CA' | 'JP' | 'SG';

interface LocationContextType {
  location: Location;
  currency: string;
  symbol: string;
  exchangeRate: number;
  setLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<Location>('IN');
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [exchangeRate, setExchangeRate] = useState(1);

  const locationMap: Record<Location, { currency: string; symbol: string; rate: number }> = {
    IN: { currency: 'INR', symbol: '₹', rate: 1 },
    US: { currency: 'USD', symbol: '$', rate: 0.012 },
    GB: { currency: 'GBP', symbol: '£', rate: 0.0095 },
    EU: { currency: 'EUR', symbol: '€', rate: 0.011 },
    AU: { currency: 'AUD', symbol: 'A$', rate: 0.018 },
    CA: { currency: 'CAD', symbol: 'C$', rate: 0.0165 },
    JP: { currency: 'JPY', symbol: '¥', rate: 1.77 },
    SG: { currency: 'SGD', symbol: 'S$', rate: 0.016 },
  };

  const setLocation = (newLocation: Location) => {
    const settings = locationMap[newLocation];
    if (settings) {
      setLocationState(newLocation);
      setCurrency(settings.currency);
      setSymbol(settings.symbol);
      setExchangeRate(settings.rate);
      localStorage.setItem('preferredLocation', newLocation);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('preferredLocation') as Location | null;
    if (saved) setLocation(saved);
  }, []);

  return (
    <LocationContext.Provider value={{ location, currency, symbol, exchangeRate, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};
```

### Step 2: Create Location Selector Component (20 min)

**File: `Frontend/src/components/LocationSelector.tsx`**

```typescript
import React from 'react';
import { useLocation } from '@/context/LocationContext';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COUNTRIES = [
  { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳' },
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'EU', name: 'Europe', currency: 'EUR', flag: '🇪🇺' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', flag: '🇸🇬' },
];

export const LocationSelector: React.FC = () => {
  const { location, setLocation, currency } = useLocation();

  const currentCountry = COUNTRIES.find(c => c.code === location);

  return (
    <Select value={location} onValueChange={(value: any) => setLocation(value)}>
      <SelectTrigger className="w-[160px] flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <span className="text-xs text-muted-foreground">({country.currency})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
```

### Step 3: Create Price Converter Utility (15 min)

**File: `Frontend/src/utils/priceConverter.ts`**

```typescript
export const CURRENCY_RATES = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  EUR: 0.011,
  AUD: 0.018,
  CAD: 0.0165,
  JPY: 1.77,
  SGD: 0.016,
};

export const convertPrice = (priceInINR: number, targetCurrency: string): number => {
  const rate = CURRENCY_RATES[targetCurrency as keyof typeof CURRENCY_RATES];
  if (!rate) return priceInINR;
  return Math.round(priceInINR * rate * 100) / 100;
};

export const formatPrice = (amount: number, currency: string): string => {
  const locales: Record<string, string> = {
    INR: 'en-IN',
    USD: 'en-US',
    GBP: 'en-GB',
    EUR: 'en-EU',
    AUD: 'en-AU',
    CAD: 'en-CA',
    JPY: 'ja-JP',
    SGD: 'en-SG',
  };

  return new Intl.NumberFormat(locales[currency] || 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
```

### Step 4: Update App.tsx (10 min)

**Modify: `Frontend/src/App.tsx`**

Add LocationProvider at the top level:

```typescript
import { LocationProvider } from '@/context/LocationContext';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationProvider>  {/* Add this wrapper */}
      <ThemeProvider>
        <TooltipProvider>
          {/* Rest of your app */}
        </TooltipProvider>
      </ThemeProvider>
    </LocationProvider>
  </QueryClientProvider>
);
```

### Step 5: Update Navbar to Show Location Selector (15 min)

**Modify: `Frontend/src/components/Navbar.tsx`**

Add LocationSelector to navbar:

```typescript
import { LocationSelector } from '@/components/LocationSelector';

export const Navbar: React.FC = () => {
  // ... existing code ...

  return (
    <header className="...">
      <nav className="lunar-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">LUNAR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* ... existing nav items ... */}
          </div>

          {/* Right Side Actions - ADD LOCATION SELECTOR HERE */}
          <div className="flex items-center gap-4">
            {/* Location Selector */}
            <LocationSelector />
            
            {/* Search, Theme toggle, User, Cart, etc. */}
            {/* ... rest of existing code ... */}
          </div>
        </div>
      </nav>
    </header>
  );
};
```

### Step 6: Update ProductCard to Show Converted Prices (20 min)

**Modify: `Frontend/src/components/ProductCard.tsx`**

Use converted prices:

```typescript
import { useLocation } from '@/context/LocationContext';
import { convertPrice, formatPrice } from '@/utils/priceConverter';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number; // Base price in INR
    image: string;
    rating?: number;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currency, exchangeRate } = useLocation();

  // Convert from INR to target currency
  const convertedPrice = convertPrice(product.price, currency);
  const displayPrice = formatPrice(convertedPrice, currency);

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        
        {/* Price Display - Now with converted currency */}
        <div className="mt-2 flex items-center gap-2">
          <p className="text-2xl font-bold text-primary">{displayPrice}</p>
          {product.price > 0 && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(convertPrice(product.price * 1.5, currency), currency)}
            </p>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
```

### Step 7: Update Cart Display (15 min)

**Modify: `Frontend/src/pages/Cart.tsx`**

Show prices in user's currency:

```typescript
import { useLocation } from '@/context/LocationContext';
import { convertPrice, formatPrice } from '@/utils/priceConverter';

export const Cart: React.FC = () => {
  const { currency } = useLocation();
  const { cartItems, total } = useCart();

  const convertedTotal = convertPrice(total, currency);

  return (
    <div className="...">
      {/* Cart items */}
      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
          <div>
            <h3>{item.name}</h3>
            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
          </div>
          <p className="text-lg font-semibold">
            {formatPrice(convertPrice(item.price * item.quantity, currency), currency)}
          </p>
        </div>
      ))}

      {/* Cart Total */}
      <div className="mt-6 text-right">
        <p className="text-3xl font-bold">
          Total: {formatPrice(convertedTotal, currency)}
        </p>
      </div>
    </div>
  );
};
```

### Step 8: Testing & Verification (30 min)

Test the following:

1. **Location Selector Visible**
   - Check navbar shows location dropdown ✅
   - Shows current country & currency ✅

2. **Currency Conversion Works**
   - Click location in navbar
   - Verify all prices update ✅
   - No page reload needed ✅

3. **Persistence Works**
   - Select USA location
   - Refresh page
   - Should still show USD prices ✅

4. **Different Locations**
   - Test all 8 countries ✅
   - Verify conversion rates ✅
   - Check formatting is correct ✅

5. **Mobile Responsive**
   - Test on mobile device ✅
   - Location selector works ✅
   - Prices display correctly ✅

6. **Dark Mode**
   - Toggle dark mode
   - Location selector still works ✅
   - Prices visible ✅

---

## 📊 EXAMPLE: USER SEES DIFFERENT PRICES

### Same Product, Different Users

**Product: Premium Cotton T-Shirt**
```
Base Price in System: ₹599 (INR)

User in Mumbai, India:
  Sees: ₹599
  Clicks: "Track Order" → /orders

User in New York, USA:
  Sees: $7.19
  Clicks: "Change Location" → Selects "India"
  Sees: ₹599

User in London, UK:
  Sees: £5.69

User in Tokyo, Japan:
  Sees: ¥1,061

All Same Product!
```

---

## 🎯 BEFORE vs AFTER

### Before Implementation:
```
┌──────────────────────┐
│ LUNAR  Home Men Shop │
│                      │
│ T-Shirt         |    │
│ ₹599            |    │
│ [Add to Cart]   |    │
└──────────────────────┘
(Same price for everyone)
```

### After Implementation:
```
┌─────────────────────────────────┐
│ LUNAR  🌍 India ▼  Home Men Shop │
│                                 │
│ T-Shirt                    |    │
│ ₹599                       |    │
│ [Add to Cart]              |    │
│                            |    │
│ Location Selector Shows:   |    │
│ 🇮🇳 India (INR)           |    │
│ 🇺🇸 USA (USD)            |    │
│ 🇬🇧 UK (GBP)             |    │
│ etc...                     |    │
└─────────────────────────────────┘

When user selects USA:
T-Shirt changes to $7.19 ✅
```

---

## ⏱️ TIME BREAKDOWN

```
Context Setup:         30 min
Location Selector:     20 min
Price Converter:       15 min
App.tsx Update:        10 min
Navbar Integration:    15 min
ProductCard Update:    20 min
Cart Update:           15 min
Testing:               30 min
──────────────────────────
TOTAL:                 3.5 hours
```

---

## 🚀 HOW TO PROCEED

### Option A: I Implement (Recommended) - 3.5 hours
```
Say: "Let's implement the location and currency system!"
I'll:
- Create all files
- Update all components
- Test everything
- Commit & push
Result: Complete feature ready to use
```

### Option B: You Implement with Guide
```
Use this document as reference
Follow each step
I'll help if you get stuck
Timeline: 4-5 hours
Learning: High
```

### Option C: Combination
```
I do backend + context setup (1.5 hours)
You do UI components (2 hours)
I handle testing (30 min)
Timeline: Same (3.5 hours)
Learning: Medium
```

---

## 🎯 FINAL RESULT

```
✅ Users can select location/country
✅ Products show prices in user's currency
✅ Prices update instantly when location changes
✅ Works on desktop and mobile
✅ Persists user preference
✅ Professional e-commerce feature
✅ Like real international sites (Amazon, Flipkart, etc.)
```

---

**Status:** Ready to Implement 🚀
**Complexity:** Medium
**Impact:** High (Professional, Multi-Country Feature)
**Time:** 3.5 hours
**Quality:** Production-Ready

---

**What would you like to do?**

A) **"Implement the location system now!"** (I do it)
B) **"Guide me through it"** (You implement)
C) **"Do something else"** (Different priority)

Let me know! 🌍
