# 🔗 LUNAR FRONTEND-BACKEND INTEGRATION GUIDE

Complete guide to connecting your React frontend with Node.js backend securely.

---

## ✅ SETUP CHECKLIST

### Backend Setup
- [ ] Environment variables configured
- [ ] CORS enabled for frontend
- [ ] Auth response format correct
- [ ] Database connection pooling
- [ ] Server running on http://localhost:5000

### Frontend Setup
- [ ] `.env.local` file created with `VITE_API_BASE_URL`
- [ ] `apiClient.ts` created
- [ ] `api.ts` updated with new client
- [ ] `AuthContext.tsx` enhanced
- [ ] `ProtectedRoute.tsx` updated with admin support

---

## 🚀 QUICK START (10 MINUTES)

### Step 1: Backend Environment (2 min)

Create/update `Backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lunar_db
DB_USER=root
DB_PASSWORD=
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Step 2: Backend Database (2 min)

```bash
mysql -u root -p < Backend/database/schema.sql
mysql -u root -p < Backend/database/seed.sql
```

### Step 3: Backend Start (1 min)

```bash
cd Backend
npm install  # if not done
npm run dev
```

✅ Backend on: **http://localhost:5000**

### Step 4: Frontend Environment (2 min)

Create `Frontend/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 5: Frontend Start (1 min)

```bash
cd Frontend
npm run dev
```

✅ Frontend on: **http://localhost:5173**

### Step 6: Test Integration (2 min)

1. Open http://localhost:5173
2. Click Register
3. Create account
4. Should be logged in ✅
5. Browse products ✅
6. Create order (if implemented) ✅

---

## 🔧 BACKEND CONFIGURATION

### 1. Environment Variables

**File: `Backend/.env`**

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lunar_db
DB_USER=root
DB_PASSWORD=

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# CORS (Frontend URL)
CORS_ORIGIN=http://localhost:5173
```

**Loading:**
```javascript
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const port = process.env.PORT || 5000;
```

### 2. CORS Configuration

**File: `Backend/server.js`**

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600, // 1 hour
}));
```

**What this does:**
- ✅ Allows frontend at specified URL
- ✅ Allows credentials (cookies, auth)
- ✅ Allows Authorization header (for JWT)
- ✅ Allows all HTTP methods
- ✅ Caches preflight requests

### 3. Auth Response Format

**File: `Backend/controllers/auth.controller.js`**

Login endpoint returns:
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 💻 FRONTEND CONFIGURATION

### 1. Environment Variables

**File: `Frontend/.env.local`**

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENV=development
```

**Usage:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
// = http://localhost:5000/api
```

### 2. API Client

**File: `Frontend/src/services/apiClient.ts`** (NEW)

Features:
- ✅ Centralized HTTP client
- ✅ Automatic token injection
- ✅ Error handling
- ✅ Request timeout
- ✅ CORS headers

**Usage:**
```typescript
import { apiClient } from '@/services/apiClient';

// GET
const products = await apiClient.get<Product[]>('/products');

// POST
const response = await apiClient.post<AuthResponse>('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});

// PUT
const updated = await apiClient.put<Product>('/products/1', {
  price: 99.99
});

// DELETE
await apiClient.delete('/products/1');
```

### 3. API Service

**File: `Frontend/src/services/api.ts`** (UPDATED)

Uses `apiClient` for all requests:
```typescript
export const authApi = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (name, email, password) => apiClient.post('/auth/register', { name, email, password }),
  getProfile: () => apiClient.get('/auth/profile'),
};

export const productsApi = {
  getAll: () => apiClient.get('/products'),
  getByGender: (gender) => apiClient.get(`/products/${gender}`),
  search: (query) => apiClient.get(`/products/search?q=${query}`),
};

export const ordersApi = {
  create: (data) => apiClient.post('/orders', data),
  getMyOrders: () => apiClient.get('/orders/my-orders'),
};
```

### 4. Auth Context

**File: `Frontend/src/context/AuthContext.tsx`** (ENHANCED)

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;                    // NEW
  login: (user: User, token: string) => void;
  logout: () => void;
}
```

**Usage:**
```typescript
const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

// Check if user is admin
if (isAdmin) {
  // Show admin features
}
```

### 5. Protected Routes

**File: `Frontend/src/components/ProtectedRoute.tsx`** (UPDATED)

```typescript
// User route (authentication required)
<ProtectedRoute>
  <UserDashboard />
</ProtectedRoute>

// Admin route (admin role required)
<ProtectedRoute adminOnly>
  <AdminPanel />
</ProtectedRoute>
```

---

## 🔐 AUTHENTICATION FLOW

### Login Process

```
1. User enters email/password
   ↓
2. Frontend calls: apiClient.post('/auth/login', { email, password })
   ↓
3. Request includes: Headers { 'Content-Type': 'application/json' }
   ↓
4. Backend validates credentials
   ↓
5. Backend generates JWT token
   ↓
6. Response: { token, user: { id, name, email, role } }
   ↓
7. Frontend stores token in localStorage
   ↓
8. Frontend stores user in localStorage
   ↓
9. AuthContext updates
   ↓
10. User redirected to home ✅
```

### Authenticated Request Process

```
1. User makes API request (e.g., create order)
   ↓
2. apiClient.post('/orders', { items: [...] })
   ↓
3. apiClient gets token from localStorage
   ↓
4. Request headers: { Authorization: 'Bearer <token>' }
   ↓
5. Backend receives request
   ↓
6. Backend verifies JWT in Authorization header
   ↓
7. Backend extracts user info from token
   ↓
8. Request proceeds with user data ✅
```

---

## 🧪 TESTING INTEGRATION

### Test 1: Register User

```bash
# Open browser console (Frontend)
import { authApi } from '@/services/api';

const response = await authApi.register(
  'John Doe',
  'john@example.com',
  'password123'
);

console.log(response);
// Expected: { token, user }
```

### Test 2: Login

```typescript
const response = await authApi.login(
  'john@example.com',
  'password123'
);

console.log(response);
// Expected: { token, user with role }
```

### Test 3: Get Products

```typescript
import { productsApi } from '@/services/api';

const products = await productsApi.getAll();
console.log(products);
// Expected: Array of products
```

### Test 4: Create Order (Authenticated)

```typescript
// Must be logged in first
const order = await ordersApi.create({
  items: [
    { productId: 1, quantity: 2, price: 49.99 }
  ]
});
console.log(order);
```

### Test 5: Admin Features

```typescript
// Must be logged in as admin
import { productsApi } from '@/services/api';

// Create product (admin only)
const newProduct = await productsApi.create({
  name: 'New Product',
  brand: 'Nike',
  price: 99.99,
  // ... other fields
});
```

---

## 📊 CORS Request Flow

### Preflight Request (Automatic)

```
Browser sends OPTIONS request:
  - Method: OPTIONS
  - Headers: Origin, Access-Control-Request-Method, etc.

Server responds with:
  - Access-Control-Allow-Origin: http://localhost:5173
  - Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  - Access-Control-Allow-Headers: Content-Type, Authorization
  - Access-Control-Max-Age: 3600

Browser caches for 1 hour
```

### Actual Request

```
Browser sends actual request:
  - Method: POST
  - Headers: Content-Type, Authorization
  - Body: JSON data

Server processes and responds
```

---

## 🐛 TROUBLESHOOTING

### Issue: CORS Error

**Symptom:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/products' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
1. Check `CORS_ORIGIN` in `Backend/.env`
2. Should be: `CORS_ORIGIN=http://localhost:5173`
3. Restart backend: `npm run dev`
4. Check backend logs for CORS configuration

### Issue: 401 Unauthorized

**Symptom:**
```
{ "message": "Access denied. No token provided." }
```

**Solution:**
1. Ensure token is stored in localStorage
2. Check `AUTH_TOKEN_KEY` matches frontend constant
3. Check token is sent in `Authorization` header
4. Token might be expired (expires in 7 days)

### Issue: Token Not Persisting

**Symptom:**
```
User logs out after page refresh
```

**Solution:**
1. Check localStorage in browser DevTools
2. Verify `AUTH_TOKEN_KEY` constant
3. Check localStorage isn't being cleared by browser settings
4. Verify `AuthContext` useEffect runs on mount

### Issue: Admin Routes Not Restricted

**Symptom:**
```
Non-admin users can access admin pages
```

**Solution:**
1. Use `<ProtectedRoute adminOnly>` wrapper
2. Check user has `role === 'admin'` in token
3. Verify backend returns role in login response

---

## 🚀 PRODUCTION DEPLOYMENT

### Backend Production (.env)

```env
DB_HOST=your-db-host.rds.amazonaws.com
DB_PORT=3306
DB_NAME=lunar_db_prod
DB_USER=admin
DB_PASSWORD=strong_password_here
PORT=5000
NODE_ENV=production
JWT_SECRET=very_long_random_secure_string_here
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
```

### Frontend Production (.env.production)

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_ENV=production
```

### SSL/HTTPS

- ✅ Backend: Use HTTPS in production
- ✅ Frontend: Use HTTPS in production
- ✅ Browsers block mixed HTTP/HTTPS
- ✅ Get SSL certificate (Let's Encrypt free)

---

## 📋 KEY CONCEPTS

### Token Storage
- Stored in `localStorage`
- Persists across page refreshes
- Cleared on logout
- Included in all authenticated requests

### CORS Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Request Format
```javascript
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token_here'
  },
  body: JSON.stringify(data)
}
```

### Response Format
```json
{
  "success": true,
  "message": "...",
  "data": { /* response data */ },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ✨ SECURITY BEST PRACTICES

✅ **Do:**
- Store JWT in localStorage
- Include token in Authorization header
- Use HTTPS in production
- Validate all inputs
- Use role-based access
- Set token expiration
- Refresh tokens regularly

❌ **Don't:**
- Store sensitive data in localStorage
- Send password in requests
- Use hardcoded URLs
- Skip CORS configuration
- Trust client-side validation only
- Log sensitive data
- Use weak JWT secrets

---

## 📞 SUPPORT

### Files Modified
- `Backend/config/db.js` - Environment variable validation
- `Backend/server.js` - CORS & middleware config
- `Backend/controllers/auth.controller.js` - Response format
- `Frontend/src/utils/constants.ts` - API URL config
- `Frontend/src/services/api.ts` - Updated to use apiClient
- `Frontend/src/context/AuthContext.tsx` - Added isAdmin
- `Frontend/src/components/ProtectedRoute.tsx` - Added adminOnly

### Files Created
- `Frontend/src/services/apiClient.ts` - New centralized HTTP client
- `Frontend/.env.local` - Environment configuration
- This guide!

### Next Steps
1. Test all API endpoints
2. Verify authentication flow
3. Test admin-only routes
4. Test error handling
5. Deploy to staging

---

**Integration Status: ✅ COMPLETE**

Your Lunar frontend and backend are now connected and ready!
