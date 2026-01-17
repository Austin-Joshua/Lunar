# 🔐 Test Accounts - Login Credentials

Complete list of pre-existing test accounts for the Lunar application.

---

## 📋 Available Test Accounts

### 1️⃣ **ADMIN ACCOUNT**
```
Email:    admin@lunar.com
Password: admin123
Role:     Administrator
Access:   Full admin dashboard, product management, user management, orders
```

**What you can do:**
- Access admin dashboard at `/admin`
- Manage products (add, edit, delete)
- View all orders and users
- Manage categories
- View analytics and statistics

**Test it:**
1. Go to http://localhost:8083/login
2. Enter: `admin@lunar.com`
3. Enter: `admin123`
4. Click "Sign In"
5. Click admin icon (top right) to access admin dashboard

---

### 2️⃣ **DEMO ACCOUNT**
```
Email:    demo@lunar.com
Password: demo123
Role:     Customer
Access:   Regular customer features (browse, shop, orders)
```

**What you can do:**
- Browse all products
- View product details
- Add items to shopping cart
- Place orders
- View your orders
- Access account settings
- Toggle dark mode

**Test it:**
1. Go to http://localhost:8083/login
2. Enter: `demo@lunar.com`
3. Enter: `demo123`
4. Click "Sign In"
5. You're logged in as customer

---

### 3️⃣ **CUSTOMER ACCOUNT**
```
Email:    customer@lunar.com
Password: customer123
Role:     Customer
Access:   Regular customer features (browse, shop, orders)
```

**What you can do:**
- Browse all products
- View product details
- Add items to shopping cart
- Place orders
- View your orders
- Access account settings
- Toggle dark mode

**Test it:**
1. Go to http://localhost:8083/login
2. Enter: `customer@lunar.com`
3. Enter: `customer123`
4. Click "Sign In"
5. You're logged in as customer

---

## 🚀 How to Seed Test Accounts

If the test accounts don't exist in your database, create them by running:

```bash
cd Backend
npm run seed:users
```

**Output:**
```
🌱 Starting user seeding...
✅ Admin user created
   Email: admin@lunar.com
   Password: admin123
✅ Demo user created
   Email: demo@lunar.com
   Password: demo123
✅ Customer user created
   Email: customer@lunar.com
   Password: customer123

✅ User seeding completed successfully!

📋 Available Test Accounts:
...
```

---

## 📱 Test Scenarios

### Scenario 1: Test Admin Features
```
1. Login with admin@lunar.com / admin123
2. Click admin icon → Dashboard
3. View products, orders, users
4. Add a new product
5. View order management
```

### Scenario 2: Test Shopping Features
```
1. Login with demo@lunar.com / demo123
2. Browse categories (Men, Women, Kids)
3. Add items to cart
4. Proceed to checkout
5. Place order
6. View your orders
```

### Scenario 3: Test Settings
```
1. Login with customer@lunar.com / customer123
2. Click user icon → Settings
3. View account information
4. Toggle dark mode
5. Manage notifications
6. Sign out
```

### Scenario 4: Test Dark Mode
```
1. Login with any account
2. Click moon icon in navbar
3. Page toggles to dark mode
4. Go to Settings → Appearance
5. Toggle dark mode
6. Refresh - theme persists
```

---

## 🔄 Account Properties

| Property | Admin | Demo | Customer |
|----------|-------|------|----------|
| Email | admin@lunar.com | demo@lunar.com | customer@lunar.com |
| Password | admin123 | demo123 | customer123 |
| Role | admin | user | user |
| Dashboard | ✅ Admin | ❌ | ❌ |
| Products Management | ✅ | ❌ | ❌ |
| Order Management | ✅ | ❌ | ❌ |
| User Management | ✅ | ❌ | ❌ |
| Shopping | ✅ | ✅ | ✅ |
| Orders | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ |
| Dark Mode | ✅ | ✅ | ✅ |

---

## 🎯 Quick Tests

### Test 1: Admin Login Flow
```
URL: http://localhost:8083/login
Email: admin@lunar.com
Password: admin123
Expected: Redirects to home page
Click admin icon: Should access admin dashboard
```

### Test 2: Customer Login Flow
```
URL: http://localhost:8083/login
Email: demo@lunar.com
Password: demo123
Expected: Redirects to home page
Click user icon: Should show My Orders and Settings
```

### Test 3: Dark Mode Toggle
```
Logged in as any user
Click moon icon in navbar
Expected: Page switches to dark mode
Refresh page: Dark mode should persist
Go to Settings: Toggle button should reflect current theme
```

### Test 4: Settings Page
```
Login with any account
Click user icon → Settings
Expected: See three tabs: Profile, Privacy & Security, Notifications
Toggle dark mode in Appearance section
Switch tabs: Theme should persist
Click Logout: Should confirm and logout
```

---

## 💾 Database Integration

**Important:** These accounts are stored in the MySQL database.

**Database location:** `lunar_db` on `localhost:3306`
**Table:** `users`

To view accounts in database:
```bash
mysql -u root -p123456 lunar_db -e "SELECT id, name, email, role FROM users;"
```

Output:
```
+----+----------------+----------------------+-------+
| id | name           | email                | role  |
+----+----------------+----------------------+-------+
| 1  | Admin User     | admin@lunar.com      | admin |
| 2  | Demo User      | demo@lunar.com       | user  |
| 3  | Customer User  | customer@lunar.com   | user  |
+----+----------------+----------------------+-------+
```

---

## 🔒 Security Notes

**For Development Only:**
- ⚠️ These are test accounts with simple passwords
- ⚠️ Do NOT use in production
- ⚠️ Change all passwords before deploying

**Production Setup:**
- 🔒 Use strong, unique passwords
- 🔒 Hash all passwords with bcryptjs
- 🔒 Use environment variables for credentials
- 🔒 Enable 2FA for admin accounts
- 🔒 Implement rate limiting on login

---

## ✨ Features Enabled with These Accounts

### For Admin:
- ✅ Admin dashboard access
- ✅ Product CRUD operations
- ✅ Order management
- ✅ User management
- ✅ Category management
- ✅ Analytics/stats view

### For Customer:
- ✅ Browse all products
- ✅ Filter by gender and category
- ✅ Add to cart
- ✅ Place orders
- ✅ View order history
- ✅ Account settings
- ✅ Dark mode toggle
- ✅ Notification preferences
- ✅ Profile management

### For All Users:
- ✅ Dark mode toggle (persists across sessions)
- ✅ Settings page with multiple tabs
- ✅ Account information view
- ✅ Safe logout with confirmation
- ✅ Theme preference persistence

---

## 📝 Creating More Test Accounts

**Manually add accounts (without running seed script):**

```sql
-- Connect to database
mysql -u root -p123456 lunar_db

-- Add new user
INSERT INTO users (name, email, password, role, created_at)
VALUES (
  'Test User',
  'test@lunar.com',
  '$2a$10$...',  -- bcryptjs hashed password
  'user',
  NOW()
);
```

Or use the frontend registration:
1. Go to http://localhost:8083/register
2. Fill in the form
3. Account is created automatically

---

## 🆘 Troubleshooting

### Q: Can't login with these accounts?
**A:** Run the seed script:
```bash
npm run seed:users
```

### Q: Wrong password error?
**A:** Double-check spelling (case-sensitive):
- admin123 (not admin or admin123456)
- demo123
- customer123

### Q: Want to reset password?
**A:** Run seed script again to reset all to default:
```bash
npm run seed:users
```

### Q: Want to add more accounts?
**A:** Register via the app or add manually to database.

---

## 📊 Summary

**Total Test Accounts:** 3
- 1 Admin account
- 2 Customer accounts

**All accounts are:**
- ✅ Pre-created in database
- ✅ Ready to use immediately
- ✅ Have full access to their role features
- ✅ Can be used for testing all functionality

---

**Status:** ✅ Ready to Test

Use any of these accounts to test the Lunar application features!

Last updated: January 17, 2026
