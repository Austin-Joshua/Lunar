# ⚡ INTEGRATION QUICK REFERENCE

## 🚀 Start in 3 Terminal Windows

### Terminal 1: MySQL
```bash
# Ensure MySQL is running
# Windows: Services → MySQL
# Mac: brew services start mysql
# Linux: sudo service mysql start
```

### Terminal 2: Backend
```bash
cd Backend
npm run dev

# Runs on http://localhost:5000
```

### Terminal 3: Frontend
```bash
cd Frontend
npm run dev

# Runs on http://localhost:5173
```

---

## 📝 Environment Files

### Backend `.env`
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lunar_db
DB_USER=root
DB_PASSWORD=
PORT=5000
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env.local`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔑 Key Files

### Backend Setup
| File | Change |
|------|--------|
| `config/db.js` | ✅ Updated (env validation) |
| `server.js` | ✅ Updated (CORS) |
| `controllers/auth.controller.js` | ✅ Updated (response format) |

### Frontend Setup
| File | Change |
|------|--------|
| `services/apiClient.ts` | ✨ NEW (HTTP client) |
| `services/api.ts` | ✅ Updated (use apiClient) |
| `context/AuthContext.tsx` | ✅ Updated (isAdmin) |
| `components/ProtectedRoute.tsx` | ✅ Updated (adminOnly) |
| `utils/constants.ts` | ✅ Updated (VITE_API_BASE_URL) |

---

## 🧪 Quick Tests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lunar.com","password":"password"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get Men's Products
```bash
curl http://localhost:5000/api/products/men
```

---

## 🔐 Sample Credentials

From database seed:
```
Admin:
  Email: admin@lunar.com
  Password: password

User:
  Email: john@example.com
  Password: password
```

---

## 📊 API Quick Reference

### Auth
```
POST   /api/auth/register   # Register user
POST   /api/auth/login      # Login (returns token)
GET    /api/auth/profile    # Get user profile (needs token)
```

### Products
```
GET    /api/products              # All products
GET    /api/products/:id          # By ID
GET    /api/products/:gender      # By gender
GET    /api/products/:gender/:cat # By gender & category
GET    /api/products/search?q=    # Search

POST   /api/products              # Create (admin)
PUT    /api/products/:id          # Update (admin)
DELETE /api/products/:id          # Delete (admin)
```

### Orders
```
POST   /api/orders           # Create order (auth)
GET    /api/orders/my-orders # My orders (auth)
GET    /api/orders/:id       # Order by ID (auth)

GET    /api/orders           # All orders (admin)
PUT    /api/orders/:id/status # Update status (admin)
```

---

## 🔗 Auth Flow

### 1. Register
```javascript
const response = await authApi.register('John', 'john@test.com', 'pass');
// → { token, user }
```

### 2. Store Token
```javascript
const { token, user } = response;
localStorage.setItem('lunar_auth_token', token);
localStorage.setItem('lunar_user', JSON.stringify(user));
```

### 3. Use Token
```javascript
// Automatically attached by apiClient!
const products = await productsApi.getAll();
```

---

## 🛡️ Protected Routes

### Public
```jsx
<Route path="/login" element={<Login />} />
<Route path="/products" element={<Products />} />
```

### User Only
```jsx
<Route path="/orders" element={
  <ProtectedRoute>
    <Orders />
  </ProtectedRoute>
} />
```

### Admin Only
```jsx
<Route path="/admin/dashboard" element={
  <ProtectedRoute adminOnly>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| CORS Error | Check `CORS_ORIGIN` in Backend .env |
| 401 Unauthorized | Token missing or expired |
| Cannot connect | Ensure backend running (npm run dev) |
| API URL not found | Check `VITE_API_BASE_URL` in Frontend .env |
| Admin routes blocked | Ensure role='admin' in token |

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Backend `.env` configured
- [ ] Frontend `.env.local` configured
- [ ] Can register user
- [ ] Can login user
- [ ] Can see products
- [ ] Token stored in localStorage
- [ ] Protected routes work
- [ ] Admin routes restricted

---

## 📱 Testing in Browser

### DevTools Console
```javascript
// Test API directly
import { authApi, productsApi } from '@/services/api';

// Login
await authApi.login('admin@lunar.com', 'password');

// Get products
const products = await productsApi.getAll();
console.log(products);

// Check auth
import { useAuth } from '@/context/AuthContext';
const { user, isAdmin } = useAuth();
console.log(user, isAdmin);
```

---

## 🚀 Deploy Checklist

### Backend
- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET
- [ ] Configure production database
- [ ] Enable HTTPS
- [ ] Set `CORS_ORIGIN` to production domain

### Frontend
- [ ] Update `.env.production` with prod API URL
- [ ] Build: `npm run build`
- [ ] Test build locally: `npm run preview`
- [ ] Deploy `dist/` folder
- [ ] Enable HTTPS

---

## 💡 Pro Tips

1. **Add logging**: Check browser console + terminal for requests
2. **Test with curl**: Easy to test API without frontend
3. **Use Postman**: Import API collection for testing
4. **Check localStorage**: DevTools → Application → LocalStorage
5. **Monitor network**: DevTools → Network tab → watch requests
6. **Token expiry**: Default 7 days, can be changed in JWT_EXPIRE

---

**Status: ✅ READY TO TEST**

Test login flow in browser now!
