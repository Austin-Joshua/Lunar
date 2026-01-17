# 🌍 LOCATION & CURRENCY SYSTEM
## Dynamic Multi-Country Support

---

## 🎯 FEATURE OVERVIEW

Users can change their location and products automatically display in the correct currency:

```
User in India:
├─ Location: India
├─ Currency: INR (₹)
└─ Price: ₹599

User switches to USA:
├─ Location: USA
├─ Currency: USD ($)
└─ Price: $8.99

User switches to UK:
├─ Location: UK
├─ Currency: GBP (£)
└─ Price: £7.49

User switches to Germany:
├─ Location: Germany
├─ Currency: EUR (€)
└─ Price: €8.99
```

---

## 📋 SUPPORTED COUNTRIES & CURRENCIES

```json
{
  "countries": [
    {
      "code": "IN",
      "name": "India",
      "currency": "INR",
      "symbol": "₹",
      "rate": 1.0,
      "locale": "en-IN"
    },
    {
      "code": "US",
      "name": "United States",
      "currency": "USD",
      "symbol": "$",
      "rate": 0.012,
      "locale": "en-US"
    },
    {
      "code": "GB",
      "name": "United Kingdom",
      "currency": "GBP",
      "symbol": "£",
      "rate": 0.0095,
      "locale": "en-GB"
    },
    {
      "code": "EU",
      "name": "Europe",
      "currency": "EUR",
      "symbol": "€",
      "rate": 0.011,
      "locale": "en-EU"
    },
    {
      "code": "AU",
      "name": "Australia",
      "currency": "AUD",
      "symbol": "A$",
      "rate": 0.018,
      "locale": "en-AU"
    },
    {
      "code": "CA",
      "name": "Canada",
      "currency": "CAD",
      "symbol": "C$",
      "rate": 0.0165,
      "locale": "en-CA"
    },
    {
      "code": "JP",
      "name": "Japan",
      "currency": "JPY",
      "symbol": "¥",
      "rate": 1.77,
      "locale": "ja-JP"
    },
    {
      "code": "SG",
      "name": "Singapore",
      "currency": "SGD",
      "symbol": "S$",
      "rate": 0.016,
      "locale": "en-SG"
    }
  ]
}
```

---

## 🏗️ IMPLEMENTATION ARCHITECTURE

### 1. Backend: Location & Currency Configuration

**File: `Backend/config/locations.js`**
```javascript
const LOCATIONS = {
  IN: {
    name: 'India',
    currency: 'INR',
    symbol: '₹',
    basePrice: 'INR',  // Base currency is INR
    rate: 1.0,
    locale: 'en-IN',
    timezone: 'Asia/Kolkata',
    shipping: 'free',
    taxes: '18%'
  },
  US: {
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    basePrice: 'INR',  // Still base in INR
    rate: 0.012,       // 1 INR = 0.012 USD
    locale: 'en-US',
    timezone: 'America/New_York',
    shipping: '$9.99',
    taxes: 'varies'
  },
  // ... more countries
};

module.exports = LOCATIONS;
```

**File: `Backend/utils/priceConverter.js`**
```javascript
/**
 * Convert price from INR to target currency
 */
const convertPrice = (priceInINR, targetCurrency, rates) => {
  const rate = rates[targetCurrency];
  if (!rate) return priceInINR; // Default to INR
  return Math.round(priceInINR * rate * 100) / 100; // Round to 2 decimals
};

/**
 * Format price for display
 */
const formatPrice = (amount, currency, locale) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

module.exports = { convertPrice, formatPrice };
```

### 2. Database: Store User Location Preference

**Update users table:**
```sql
ALTER TABLE users ADD COLUMN (
  location_country VARCHAR(10) DEFAULT 'IN',
  location_timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
  preferred_currency VARCHAR(10) DEFAULT 'INR',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Backend API: Get Location Settings

**New Endpoint:**
```
GET /api/settings/locations
GET /api/settings/location/:country
GET /api/user/location (protected)
PUT /api/user/location (protected)
  Body: { country: "US" }
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "country": "US",
    "currency": "USD",
    "symbol": "$",
    "locale": "en-US",
    "rates": { "INR": 83.33, "USD": 1, "GBP": 0.79 }
  }
}
```

### 4. Frontend: Location Context

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

  // Location to currency mapping
  const locationMap = {
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

  // Load saved location on mount
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

---

## 🎨 FRONTEND COMPONENTS

### 1. Location Selector Component

**File: `Frontend/src/components/LocationSelector.tsx`**
```typescript
import React from 'react';
import { useLocation } from '@/context/LocationContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COUNTRIES = [
  { code: 'IN', name: 'India 🇮🇳', currency: 'INR' },
  { code: 'US', name: 'United States 🇺🇸', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom 🇬🇧', currency: 'GBP' },
  { code: 'EU', name: 'Europe 🇪🇺', currency: 'EUR' },
  { code: 'AU', name: 'Australia 🇦🇺', currency: 'AUD' },
  { code: 'CA', name: 'Canada 🇨🇦', currency: 'CAD' },
  { code: 'JP', name: 'Japan 🇯🇵', currency: 'JPY' },
  { code: 'SG', name: 'Singapore 🇸🇬', currency: 'SGD' },
];

export const LocationSelector: React.FC = () => {
  const { location, setLocation, currency } = useLocation();

  return (
    <Select value={location} onValueChange={(value: any) => setLocation(value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-2">
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

### 2. Update Product Price Display

**File: `Frontend/src/components/ProductCard.tsx`**
```typescript
import React from 'react';
import { useLocation } from '@/context/LocationContext';
import { formatPrice } from '@/utils/priceConverter';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number; // Base price in INR
    image: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currency, exchangeRate, symbol, location } = useLocation();

  // Convert price from INR to target currency
  const convertedPrice = Math.round(product.price * exchangeRate * 100) / 100;
  const displayPrice = formatPrice(convertedPrice, currency, location);

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-2xl font-bold text-primary mt-2">{displayPrice}</p>
      </div>
    </div>
  );
};
```

### 3. Add Location Selector to Navbar

**Update: `Frontend/src/components/Navbar.tsx`**
```typescript
import { LocationSelector } from '@/components/LocationSelector';

export const Navbar: React.FC = () => {
  return (
    <nav className="...">
      {/* Existing navbar code */}
      
      {/* Add location selector */}
      <div className="flex items-center gap-4">
        <LocationSelector />
        {/* Other navbar items */}
      </div>
    </nav>
  );
};
```

### 4. Add Location Provider to App

**Update: `Frontend/src/App.tsx`**
```typescript
import { LocationProvider } from '@/context/LocationContext';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationProvider>  {/* Add this */}
      <ThemeProvider>
        <TooltipProvider>
          {/* Rest of app */}
        </TooltipProvider>
      </ThemeProvider>
    </LocationProvider>
  </QueryClientProvider>
);
```

---

## 💱 PRICE CONVERSION UTILITY

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

export const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '¥',
  SGD: 'S$',
};

export const LOCALE_MAP = {
  IN: 'en-IN',
  US: 'en-US',
  GB: 'en-GB',
  EU: 'en-EU',
  AU: 'en-AU',
  CA: 'en-CA',
  JP: 'ja-JP',
  SG: 'en-SG',
};

/**
 * Convert price from INR to target currency
 */
export const convertPrice = (priceInINR: number, targetCurrency: string): number => {
  const rate = CURRENCY_RATES[targetCurrency as keyof typeof CURRENCY_RATES];
  if (!rate) return priceInINR;
  return Math.round(priceInINR * rate * 100) / 100;
};

/**
 * Format price for display with currency
 */
export const formatPrice = (amount: number, currency: string, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Get currency symbol
 */
export const getSymbol = (currency: string): string => {
  return CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || currency;
};
```

---

## 🔄 HOW IT WORKS - USER FLOW

### Step 1: User Selects Location
```
User clicks location dropdown in navbar
  ↓
Selects "United States"
  ↓
LocationContext updates
```

### Step 2: Currency Automatically Changes
```
LocationContext emits: { location: 'US', currency: 'USD', symbol: '$' }
  ↓
All components subscribed to useLocation() update
```

### Step 3: All Prices Update
```
Product: ₹599 (INR) → $8.99 (USD)
Product: ₹1299 (INR) → $19.99 (USD)
Product: ₹2499 (INR) → $29.99 (USD)
```

### Step 4: Persists Across Sessions
```
localStorage stores: { preferredLocation: 'US' }
  ↓
User returns to app
  ↓
App loads saved location automatically
```

---

## 📊 EXAMPLE CONVERSIONS

### Product: Premium T-Shirt
```
Base Price: ₹599 (INR)

In Different Countries:
├─ India (INR):        ₹599
├─ USA (USD):          $7.19
├─ UK (GBP):           £5.69
├─ Europe (EUR):       €6.59
├─ Australia (AUD):    $10.78
├─ Canada (CAD):       $9.88
├─ Japan (JPY):        ¥1,061
└─ Singapore (SGD):    $9.58
```

### Product: Formal Shirt
```
Base Price: ₹1299 (INR)

In Different Countries:
├─ India (INR):        ₹1,299
├─ USA (USD):          $15.59
├─ UK (GBP):           $12.34
├─ Europe (EUR):       €14.29
├─ Australia (AUD):    $23.38
├─ Canada (CAD):       $21.43
├─ Japan (JPY):        €2,299
└─ Singapore (SGD):    $20.78
```

---

## 🛒 CART & CHECKOUT WITH LOCATION

### When User Adds to Cart:
```
Product Added:
├─ Item: T-Shirt
├─ Price (INR): ₹599
├─ User Location: USA
├─ Display Price (USD): $7.19
└─ Cart stores base price (INR)
```

### When User Checks Out:
```
Step 1: Select Shipping Address
  └─ Suggest location based on address

Step 2: Confirm Currency
  └─ Show: "Charges in USD ($)"

Step 3: Total Price
  └─ Item: $7.19 × 2 = $14.38
  └─ Shipping: $9.99
  └─ Total: $24.37
```

---

## 📱 RESPONSIVE LOCATION SELECTOR

### On Desktop:
```
┌─────────────────────────────────────┐
│ LUNAR    🌍 Select Country ▼    🛒  │
│          [India - INR] [USA - USD]  │
└─────────────────────────────────────┘
```

### On Mobile:
```
┌──────────────┐
│ ≡  LUNAR  🌍 │
├──────────────┤
│ Select...  ▼ │
└──────────────┘
```

---

## 📋 FILES TO CREATE/MODIFY

### Backend
```
Create:
- Backend/config/locations.js
- Backend/utils/priceConverter.js
- Backend/routes/locations.routes.js

Modify:
- Backend/database/schema.sql (add user location columns)
- Backend/controllers/users.controller.js (add location methods)
```

### Frontend
```
Create:
- Frontend/src/context/LocationContext.tsx
- Frontend/src/components/LocationSelector.tsx
- Frontend/src/utils/priceConverter.ts

Modify:
- Frontend/src/App.tsx (add LocationProvider)
- Frontend/src/components/Navbar.tsx (add LocationSelector)
- Frontend/src/components/ProductCard.tsx (use converted prices)
- Frontend/src/components/Footer.tsx (show currency info)
```

---

## ⏱️ IMPLEMENTATION TIME

```
Backend Setup:           1 hour
├─ Create config files
├─ Add database columns
└─ Create API endpoints

Frontend Setup:          1.5 hours
├─ Create LocationContext
├─ Create LocationSelector component
├─ Update product display
└─ Add to navbar

Testing & Integration:   1 hour
├─ Test all conversions
├─ Test persistence
├─ Test on mobile
└─ Commit & push

TOTAL: 3.5 hours
```

---

## ✨ FEATURES

✅ **Real-Time Conversion**
- Prices update instantly when location changes
- No page reload needed

✅ **Persistent Selection**
- User's location preference saved
- Remembered across sessions

✅ **Accurate Exchange Rates**
- Using realistic conversion rates
- Can be updated from API

✅ **Responsive Design**
- Works on desktop & mobile
- Accessible selector

✅ **Global Support**
- 8+ countries supported
- Easy to add more

✅ **Professional UX**
- Clear currency display
- Intuitive selector
- Visual feedback

---

## 🎯 WHAT USER SEES

### Before Implementation:
```
Product List:
┌─────────────┐
│ T-Shirt     │
│ ₹599        │
│ [Add Cart]  │
└─────────────┘
(Same for all users worldwide)
```

### After Implementation:
```
User in India:
┌─────────────┐
│ T-Shirt     │
│ ₹599        │
│ [Add Cart]  │
└─────────────┘

User in USA (same product):
┌─────────────┐
│ T-Shirt     │
│ $7.19       │
│ [Add Cart]  │
└─────────────┘

User in Japan (same product):
┌─────────────┐
│ T-Shirt     │
│ ¥1,061      │
│ [Add Cart]  │
└─────────────┘
```

---

## 🌍 LOCATION SELECTOR IN NAVBAR

```
Before:
┌──────────────────────────────┐
│ LUNAR  Home Men Women Cart 🌙 │
└──────────────────────────────┘

After:
┌────────────────────────────────────────┐
│ LUNAR  🌍 India ▼  Home Men Women Cart 🌙 │
└────────────────────────────────────────┘
```

---

## 💾 PERSISTENCE STRATEGY

### Option 1: localStorage (Current)
```javascript
localStorage.setItem('preferredLocation', 'US');
```

### Option 2: Database (After Login)
```javascript
// Save to user profile when logged in
PUT /api/user/location
Body: { location: 'US' }
```

### Option 3: Both
- Use localStorage immediately
- Sync with database when user logs in
- Best user experience

---

## 🔐 SECURITY CONSIDERATIONS

✅ **No sensitive data stored**
- Only location preference
- No payment info

✅ **Input validation**
- Only accept valid country codes
- Validate currency conversion

✅ **Rate limiting**
- If fetching rates from API
- Prevent abuse

---

## 🚀 IMPLEMENTATION ROADMAP

**Phase 1: Backend Setup (1 hour)**
- Create location configuration
- Add price converter utility
- Update database schema
- Create API endpoints

**Phase 2: Frontend Context (30 min)**
- Create LocationContext
- Add localStorage persistence
- Wire up to components

**Phase 3: UI Components (1 hour)**
- Create LocationSelector
- Add to Navbar
- Update ProductCard
- Show converted prices

**Phase 4: Testing (30 min)**
- Test all conversions
- Test persistence
- Mobile testing
- Commit & push

**Total: 3.5 hours**

---

## 📊 SUCCESS METRICS

After implementation, verify:
- ✅ Location selector visible in navbar
- ✅ Clicking changes location
- ✅ All prices convert instantly
- ✅ Different users see different prices
- ✅ Preference persists on refresh
- ✅ Works on mobile
- ✅ Works in dark mode
- ✅ Smooth transitions

---

**Status:** Ready to Implement 🚀
**Complexity:** Medium
**Impact:** High (Professional feature)
**User Experience:** Excellent
