# 🔐 LUNAR - Credentials & Configuration Reference

## ✅ All Servers Now STOPPED

All Node.js processes have been terminated.

---

## 📊 DATABASE CREDENTIALS

### MySQL Connection Details
```
Host:               localhost
Port:               3306
Username:           root
Password:           123456
Database Name:      lunar_db
Connection Protocol: TCP/IP
```

### Connection String
```
mysql://root:123456@localhost:3306/lunar_db
```

### Environment Variables (Backend/.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
DB_PORT=3306 (default)
```

---

## 🔑 APPLICATION CREDENTIALS

### Admin Account
```
Email:    admin@lunar.com
Password: admin123456
Role:     admin
```

### Test User Account
```
Email:    user@lunar.com
Password: user123456
Role:     user
```

### Your Personal Account (When Registered)
```
Email:    austinjoshuamj@gmail.com
Password: Austin2006*
Role:     user
```

---

## 🔒 SECURITY TOKENS

### JWT Configuration
```
JWT_SECRET:           lunar_jwt_secret_key_2024
Access Token Expiry:  15 minutes
Refresh Token Expiry: 7 days
Algorithm:            HS256
```

### Token Storage (Frontend)
```
Access Token:   localStorage['lunar_auth_token']
Refresh Token:  localStorage['lunar_refresh_token']
User Data:      localStorage['lunar_user']
Cart Data:      localStorage['lunar_cart']
```

---

## 🌐 SERVER PORTS & URLs

### Backend API
```
Port:               5000
Base URL:           http://localhost:5000
API Base:           http://localhost:5000/api
Health Check:       http://localhost:5000/health
Environment:        development
```

### Frontend Application
```
Port:               5173
Base URL:           http://localhost:5173
Register Page:      http://localhost:5173/register
Login Page:         http://localhost:5173/login
Admin Panel:        http://localhost:5173/admin
Home Page:          http://localhost:5173/home
Shop:               http://localhost:5173
```

---

## 📝 ENVIRONMENT VARIABLES

### Backend (.env file location: Backend/.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
JWT_SECRET=lunar_jwt_secret_key_2024
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env file location: Frontend/.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🗄️ DATABASE TABLES

### 7 Main Tables
1. **users** - User accounts and authentication
   - id, name, email, password, role, created_at, updated_at

2. **categories** - Product categories
   - id, name, gender, created_at

3. **products** - Product catalog
   - id, name, brand, description, gender, category_id, price, stock, image_url

4. **orders** - Customer orders
   - id, user_id, status, total_price, created_at

5. **order_items** - Order line items
   - id, order_id, product_id, quantity, price

6. **tokens** - Token management
   - id, user_id, token_type, created_at

7. **refresh_tokens** - Refresh token storage
   - id, user_id, token, expires_at, created_at

---

## 🚀 STARTUP COMMANDS

### Start Backend Server
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm run dev
# Runs on: http://localhost:5000
```

### Start Frontend Server (New Terminal)
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
npm run dev -- --force
# Runs on: http://localhost:5173
```

### Initialize Database
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
node scripts/init-db.js
# Creates lunar_db with all 7 tables
```

### Seed Test Accounts
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm run seed:users
# Adds admin and test user accounts
```

---

## 🔄 API ENDPOINTS

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
POST   /api/auth/refresh-token  - Refresh access token
POST   /api/auth/logout         - Logout user
GET    /api/auth/profile        - Get user profile
```

### Products
```
GET    /api/products            - Get all products
GET    /api/products/:gender    - Get products by gender
GET    /api/products/:id        - Get product by ID
```

### Orders
```
POST   /api/orders              - Create order
GET    /api/orders/my-orders    - Get user's orders
GET    /api/orders/:id          - Get order by ID
```

---

## 📋 IMPORTANT FILE LOCATIONS

### Backend Files
```
.env file:           Backend/.env
Database schema:     Backend/database/schema.sql
Init script:         Backend/scripts/init-db.js
Server entry:        Backend/server.js
Config:              Backend/config/db.js
```

### Frontend Files
```
.env file:           Frontend/.env
Main config:         Frontend/vite.config.ts
API client:          Frontend/src/services/apiClient.ts
Auth context:        Frontend/src/context/AuthContext.tsx
```

---

## ⚙️ MYSQL CONFIGURATION

### MySQL Service
```
Service Name:       MySQL80 (or MySQL8.0)
Default Port:       3306
Default User:       root
Default Password:   123456
```

### Starting MySQL (if stopped)
```
# Windows Services
net start MySQL80

# Or via MySQL Workbench
# Or via command line
mysql -u root -p123456
```

---

## 🔐 SECURITY NOTES

### Passwords
- Database password: `123456` (for development only)
- JWT Secret: `lunar_jwt_secret_key_2024` (change in production)
- All user passwords are hashed with bcryptjs

### CORS Configuration
- Allowed origin: `http://localhost:5173`
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed headers: Content-Type, Authorization
- Credentials: true

### Token Security
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Tokens stored in localStorage (secure in production)
- JWT algorithm: HS256

---

## 📊 DATABASE STATISTICS

### Tables Count: 7
### Total Fields: 50+
### Indexes: 15+
### Relationships: 5 foreign keys

### Sample Data
```
Admin User:    admin@lunar.com
Test User:     user@lunar.com
Test Products: ~100+ mock products
Test Orders:   Created when you checkout
```

---

## 🛠️ CONFIGURATION SUMMARY

| Setting | Value | Notes |
|---------|-------|-------|
| DB Host | localhost | Local MySQL |
| DB Port | 3306 | Default MySQL |
| DB User | root | Default user |
| DB Pass | 123456 | Development only |
| Backend Port | 5000 | Express.js |
| Frontend Port | 5173 | Vite dev server |
| JWT Expiry | 15m | Access token |
| Refresh Expiry | 7d | Refresh token |
| CORS Origin | localhost:5173 | Frontend URL |
| Node Env | development | Development mode |

---

## 📞 QUICK REFERENCE

### If servers crash
```bash
# Stop all processes
taskkill /F /IM node.exe

# Restart backend
cd Backend && npm run dev

# Restart frontend (new terminal)
cd Frontend && npm run dev -- --force
```

### If database won't connect
```bash
# Check MySQL is running
# Verify credentials in Backend/.env
# Run init script
node Backend/scripts/init-db.js
```

### If can't login
```bash
# Use test credentials:
# Email: admin@lunar.com
# Password: admin123456

# Or register new account
# Go to: http://localhost:5173/register
```

---

## 📝 IMPORTANT REMINDERS

⚠️ **DEVELOPMENT ENVIRONMENT ONLY**
- Don't use `123456` as database password in production
- Change `JWT_SECRET` in production
- Enable HTTPS in production
- Use proper environment variable management
- Implement rate limiting
- Add CAPTCHA for registration

---

## ✅ CHECKLIST

- [ ] Database credentials saved securely
- [ ] Backend .env file created with credentials
- [ ] Frontend .env file created
- [ ] MySQL running and accessible
- [ ] Database initialized (lunar_db created)
- [ ] Tables created (7 tables)
- [ ] Test accounts available
- [ ] Both servers can start successfully
- [ ] API responding on port 5000
- [ ] Frontend accessible on port 5173

---

## 📍 DOCUMENT LOCATION

This file is saved at:
```
C:\Users\austi\OneDrive\Desktop\Lunar\CREDENTIALS.md
```

**Keep this file safe and secure!** 🔒

---

**Last Updated:** January 17, 2026
**Status:** Complete ✅
**Version:** 1.0.0

All credentials and configuration information in one place! 📋
