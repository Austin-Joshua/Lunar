# 🚀 LUNAR APP - READY TO RUN

**Your Lunar e-commerce application is now fully configured and ready to run!**

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install MySQL (First Time Only)

**Easiest Way - Using XAMPP:**
1. Download: https://www.apachefriends.org/
2. Install (choose MySQL component)
3. Start XAMPP Control Panel
4. Click "Start" for MySQL
5. ✅ MySQL is now running!

**OR Direct MySQL:**
1. Download: https://dev.mysql.com/downloads/mysql/
2. Run installer
3. Set root password to: **123456**
4. Set port to: **3306**
5. ✅ MySQL is now running!

**Detailed instructions:** See `INSTALL_MYSQL_WINDOWS.md`

---

### Step 2: Create Database (First Time Only)

Open Command Prompt in the Lunar folder and run:

```bash
.\QUICK_MYSQL_SETUP.bat
```

This will:
- ✓ Verify MySQL connection
- ✓ Create `lunar_db` database
- ✓ Create all 5 tables
- ✓ Add OAuth support columns
- ✓ Show success message

**If batch file doesn't work, run manually:**
```bash
mysql -u root -p123456 < Backend\database\schema.sql
```

---

### Step 3: Start Backend Server

Open **Command Prompt/PowerShell** and run:

```bash
cd Backend
npm run dev
```

**Expected output:**
```
[nodemon] 3.1.11
[nodemon] watching path(s): *.*
[nodemon] starting `node server.js`

╭─────────────────────────────────────────╮
│   LUNAR API Server Started Successfully │
├─────────────────────────────────────────┤
│  Port: 5000
│  Environment: development
│  CORS Origin: http://localhost:8082
╰─────────────────────────────────────────╯
```

✅ **Backend is running on http://localhost:5000/**

---

### Step 4: Start Frontend Server

Open **another Command Prompt/PowerShell** and run:

```bash
cd Frontend
npm run dev
```

**Expected output:**
```
VITE v5.4.19 ready in 405 ms

  ➜  Local:   http://localhost:8082/
  ➜  Network: http://192.168.1.43:8082/
```

✅ **Frontend is running on http://localhost:8082/**

---

### Step 5: Open in Browser

Visit: **http://localhost:8082/**

🎉 **You should now see the Lunar app homepage!**

---

## 📋 Database Configuration

**File:** `Backend/.env`

```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8082

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
```

---

## 🗄️ Database Structure

### 5 Tables Created:

1. **users** - Customer accounts with OAuth support
   - Email/Password login
   - Google OAuth
   - Apple OAuth
   - Admin accounts

2. **categories** - Product categories
   - Men, Women, Kids categories
   - Subcategories (Shirts, Pants, etc.)

3. **products** - Product catalog
   - Product details, prices, stock
   - Images, descriptions
   - Gender and category filters

4. **orders** - Customer orders
   - Order status tracking
   - Order totals
   - Order dates

5. **order_items** - Items in each order
   - Product quantities
   - Prices at time of order
   - Product references

---

## 🔐 Account Types

Your app supports **5 types of accounts**:

1. **Email/Password** - Traditional login
2. **Google OAuth** - One-click Google login
3. **Apple OAuth** - One-click Apple login
4. **Email + Google** - Linked accounts
5. **Email + Apple** - Linked accounts

---

## 🧪 Testing the App

### 1. Test Frontend
Visit: http://localhost:8082/
- ✓ Homepage loads
- ✓ Navigation works
- ✓ Categories visible
- ✓ Products display

### 2. Test Backend API
Visit: http://localhost:5000/health
- Should return: `{"status":"OK"}`

### 3. Test Database Connection
Backend should connect without errors:
- ✓ No "Database connection failed" errors
- ✓ No "Missing environment variables" errors

### 4. Seed Admin User (Optional)
```bash
cd Backend
npm run seed:admin
```

This creates:
- Email: admin@lunar.com
- Password: password

Then login at: http://localhost:8082/admin/login

---

## 📚 File Locations

```
Lunar/
├── Backend/
│   ├── .env                 ← Database credentials
│   ├── server.js            ← Main server file
│   ├── package.json         ← Dependencies
│   ├── database/
│   │   ├── schema.sql       ← Database schema
│   │   └── seed.sql         ← Sample data
│   ├── controllers/         ← API logic
│   ├── routes/              ← API endpoints
│   ├── models/              ← Database models
│   └── middleware/          ← Auth, validation
│
├── Frontend/
│   ├── .env                 ← Frontend config
│   ├── index.html           ← HTML entry
│   ├── src/
│   │   ├── App.tsx          ← Main component
│   │   ├── main.tsx         ← React entry
│   │   ├── pages/           ← Page components
│   │   ├── components/      ← Reusable components
│   │   └── services/        ← API services
│   └── package.json
│
├── MYSQL_SETUP_GUIDE.md             ← Setup instructions
├── INSTALL_MYSQL_WINDOWS.md         ← MySQL installation
├── QUICK_MYSQL_SETUP.bat            ← Auto setup
├── OAUTH_IMPLEMENTATION_GUIDE.md    ← OAuth setup
├── DATABASE_STRUCTURE.md            ← Database details
└── README.md                        ← Project README
```

---

## 🎯 API Endpoints (Running on port 5000)

### Health Check
```
GET /health
→ Returns API status
```

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/oauth/google/callback
POST /api/auth/oauth/apple/callback
```

### Products
```
GET /api/products
GET /api/products/:id
GET /api/products?gender=men
GET /api/products?gender=men&category=shirts
POST /api/products (admin only)
PUT /api/products/:id (admin only)
DELETE /api/products/:id (admin only)
```

### Orders
```
POST /api/orders
GET /api/orders/my-orders
GET /api/orders (admin only)
PUT /api/orders/:id/status (admin only)
```

### Categories
```
GET /api/categories
```

---

## 🐛 Troubleshooting

### Blank Page on Frontend
- Check browser console (F12)
- Try http://localhost:8082/login directly
- Refresh page (Ctrl+F5)

### "Cannot connect to database"
```bash
# Check MySQL is running
netstat -ano | findstr :3306

# Verify connection
mysql -u root -p123456 -e "SELECT 1"
```

### Backend crashes on start
- Check .env file exists
- Verify MySQL credentials: root / 123456
- Check database was created: `QUICK_MYSQL_SETUP.bat`

### "Port already in use"
```bash
# Find process on port 5000 or 8082
netstat -ano | findstr :5000
netstat -ano | findstr :8082

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Frontend shows blank page
- Open DevTools (F12)
- Check Console for errors
- Check Network tab for failed requests
- Try http://localhost:8082/login

---

## 🚀 Production Deployment

When ready to deploy:

1. **Change MySQL password** from 123456
2. **Update .env** with production database
3. **Set NODE_ENV=production**
4. **Update CORS_ORIGIN** to your domain
5. **Update frontend API URL** to production backend
6. **Build frontend:** `npm run build`
7. **Deploy both frontend and backend**

---

## 📖 Documentation Files

- **README.md** - Project overview
- **INSTALL_MYSQL_WINDOWS.md** - MySQL installation guide
- **MYSQL_SETUP_GUIDE.md** - Database setup guide
- **DATABASE_STRUCTURE.md** - Complete schema documentation
- **OAUTH_IMPLEMENTATION_GUIDE.md** - OAuth setup guide
- **OAUTH_ACCOUNTS_SUMMARY.md** - Account types reference
- **FILES_CREATED_SUMMARY.md** - List of all files

---

## ✨ Features Implemented

✅ **E-Commerce Core**
- Product catalog
- Shopping cart
- Order management
- Category filtering

✅ **Authentication**
- Email/Password login
- Google OAuth
- Apple OAuth
- Admin dashboard

✅ **Database**
- MySQL integration
- OAuth support
- Prepared statements
- Referential integrity

✅ **Security**
- Password hashing (bcryptjs)
- JWT tokens (7-day expiration)
- CORS enabled
- Admin middleware

✅ **Admin Features**
- Product management
- Order tracking
- User management
- Dashboard stats

---

## 📞 Quick Help

**Q: Where is my database?**
A: `lunar_db` on localhost:3306

**Q: How do I add products?**
A: Login to admin dashboard at http://localhost:8082/admin

**Q: Can I change the password from 123456?**
A: Yes, update DB_PASSWORD in Backend/.env (but also update MySQL)

**Q: How do I see my orders?**
A: Login and go to http://localhost:8082/orders

**Q: Can I use this in production?**
A: Yes, but update credentials and deploy properly

---

## 🎉 You're All Set!

Your Lunar app is configured and ready to use!

**Next steps:**
1. ✅ Install MySQL (XAMPP recommended)
2. ✅ Run `QUICK_MYSQL_SETUP.bat`
3. ✅ Start backend: `npm run dev`
4. ✅ Start frontend: `npm run dev`
5. ✅ Open http://localhost:8082/
6. ✅ Enjoy the app!

---

**Happy Coding! 🚀**

For detailed documentation, see the files in the Lunar folder.

Last updated: January 17, 2026
