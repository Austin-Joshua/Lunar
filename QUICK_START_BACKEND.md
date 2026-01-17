# Lunar Backend - Quick Start Guide (5 Minutes)

## ⚡ Get Backend Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
cd Backend
npm install
```

### Step 2: Create Environment File (30 sec)
Create `.env` file in `Backend/` folder:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lunar_db
DB_USER=root
DB_PASSWORD=
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Create Database (1 min)
Open MySQL and run:
```bash
mysql -u root -p < Backend/database/schema.sql
mysql -u root -p < Backend/database/seed.sql
```

Or use MySQL client:
```mysql
SOURCE Backend/database/schema.sql;
SOURCE Backend/database/seed.sql;
```

### Step 4: Start Server (30 sec)
```bash
npm run dev
```

✅ Backend running on: **http://localhost:5000**

---

## 🧪 Test Backend Immediately

### Test 1: Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test 2: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test 3: Get Products
```bash
curl http://localhost:5000/api/products
```

### Test 4: Get Products by Gender
```bash
curl http://localhost:5000/api/products/men
```

---

## 🔑 Sample Credentials (from seed data)

**Admin Account:**
- Email: admin@lunar.com
- Password: password

**Regular User:**
- Email: john@example.com
- Password: password

---

## 🚀 Connect Frontend to Backend

### In Frontend .env
```env
VITE_API_URL=http://localhost:5000/api
```

### Start Frontend
```bash
cd Frontend
npm run dev
```

Both running:
- ✅ Backend: http://localhost:5000
- ✅ Frontend: http://localhost:5173

---

## 📚 What's Available

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| /api/auth/register | POST | ❌ | Create account |
| /api/auth/login | POST | ❌ | Get JWT token |
| /api/products | GET | ❌ | Get all products |
| /api/products/men | GET | ❌ | Get men's products |
| /api/products/men/shirts | GET | ❌ | Get men's shirts |
| /api/orders | POST | ✅ | Create order |
| /api/orders/my-orders | GET | ✅ | Get my orders |

**✅ = Requires JWT token**

---

## 🐛 Troubleshooting

### "Database connection failed"
```bash
# Check MySQL is running
mysql -u root -p

# If not found, install MySQL:
# Windows: Download from mysql.com
# Mac: brew install mysql
# Linux: sudo apt install mysql-server
```

### "Port 5000 already in use"
```bash
# Change PORT in .env to 5001
# Or kill existing process
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### "Cannot find module 'mysql2'"
```bash
cd Backend
npm install
```

### "JWT_SECRET not found"
```bash
# Create .env file with all variables (see Step 2)
```

---

## 🎯 Next Steps

1. **Review API Documentation**
   - Read: `Backend/API_EXAMPLES.md`

2. **Understand Architecture**
   - Read: `Backend/BACKEND_ARCHITECTURE.md`

3. **Prepare for Production**
   - Read: `Backend/DEPLOYMENT.md`

4. **Test All Endpoints**
   - Import into Postman
   - Or use provided cURL examples

5. **Integrate with Frontend**
   - Check frontend API calls match endpoints
   - Test user flows end-to-end

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| Backend/server.js | Main entry point |
| Backend/.env | Configuration (create this) |
| Backend/package.json | Dependencies |
| Backend/README.md | Full documentation |
| Backend/API_EXAMPLES.md | API request examples |
| Backend/DEPLOYMENT.md | Production guide |

---

## 💡 Common Workflows

### Create a Product (Admin)
```javascript
// First login with admin account
const loginRes = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@lunar.com',
    password: 'password'
  })
});
const { data: { token } } = await loginRes.json();

// Store token, then create product
const productRes = await fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'New Shirt',
    brand: 'Nike',
    description: 'Cool shirt',
    gender: 'men',
    category: 'Shirts',
    price: 49.99,
    stock: 100,
    image_url: 'https://example.com/shirt.jpg'
  })
});
```

### Create an Order
```javascript
// Login with user
const loginRes = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password'
  })
});
const { data: { token } } = await loginRes.json();

// Create order
const orderRes = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    items: [
      { productId: 1, quantity: 2, price: 49.99 },
      { productId: 2, quantity: 1, price: 69.99 }
    ]
  })
});
```

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Database created (lunar_db exists)
- [ ] Sample data inserted (can login with admin@lunar.com)
- [ ] Can fetch products from /api/products
- [ ] Can register new user
- [ ] Can login and get JWT token
- [ ] Frontend can connect to backend
- [ ] CORS not blocking requests
- [ ] All endpoints responding

---

## 📞 Need Help?

1. **Check README.md** - Installation guide
2. **Check API_EXAMPLES.md** - API documentation
3. **Check BACKEND_ARCHITECTURE.md** - System design
4. **Check DEPLOYMENT.md** - Production setup

---

## 🎉 You're Ready!

Your Lunar backend is now:
- ✅ Running locally
- ✅ Connected to MySQL
- ✅ Ready to test
- ✅ Ready to integrate with frontend

**Happy coding! 🚀**

---

**For full documentation, see Backend/README.md**
