# 🗄️ MySQL Setup Guide - Lunar

Complete guide to set up MySQL database for the Lunar e-commerce application.

---

## 📋 Quick Setup (3 Steps)

### Step 1: Install MySQL

**Option A: Direct Download**
1. Go to https://dev.mysql.com/downloads/mysql/
2. Download MySQL Community Server (latest version)
3. Run the installer
4. During installation:
   - Set root password to: **123456**
   - Configure MySQL server to run as service
   - Choose default configuration

**Option B: Using Chocolatey (Windows)**
```bash
choco install mysql -y
# Follow prompts and set password to 123456
```

**Option C: Using XAMPP (Easiest)**
1. Download XAMPP: https://www.apachefriends.org/
2. Install it
3. Start the MySQL module from XAMPP Control Panel
4. MySQL will run with default password (usually empty or "root")

---

### Step 2: Verify MySQL is Running

**Check if MySQL service is running:**
```bash
# Windows Command Prompt/PowerShell
netstat -ano | findstr :3306
```

If you see output, MySQL is running on port 3306 ✅

**Alternative - Start MySQL manually:**
```bash
# If using XAMPP
# Start XAMPP Control Panel and click "Start" for MySQL

# If installed standalone
mysql -u root -p
# Enter password: 123456
```

---

### Step 3: Create Database and Tables

**Option A: Using MySQL Command Line**

1. Open Command Prompt/PowerShell and connect to MySQL:
```bash
mysql -u root -p123456
```

2. Run the schema script:
```bash
mysql -u root -p123456 < "C:\Users\austi\OneDrive\Desktop\Lunar\Backend\database\schema.sql"
```

3. Verify database was created:
```bash
mysql -u root -p123456 -e "SHOW DATABASES;"
```

You should see `lunar_db` in the list ✅

---

**Option B: Using MySQL Workbench (GUI)**

1. Download MySQL Workbench: https://www.mysql.com/products/workbench/
2. Install it
3. Create new connection:
   - Hostname: localhost
   - Username: root
   - Password: 123456
   - Click "Test Connection"
4. Click "New SQL Tab"
5. Open file: `Backend/database/schema.sql`
6. Execute (Ctrl+Shift+Enter)
7. Verify: You should see "lunar_db" in left panel ✅

---

## ✅ Verification Checklist

Run these commands to verify setup:

```bash
# 1. Check MySQL service is running
mysql -u root -p123456 -e "SELECT 1"
# Should output: 1

# 2. Check database exists
mysql -u root -p123456 -e "SHOW DATABASES;" | grep lunar_db
# Should show: lunar_db

# 3. Check tables exist
mysql -u root -p123456 lunar_db -e "SHOW TABLES;"
# Should show: categories, order_items, orders, products, users

# 4. Check users table structure
mysql -u root -p123456 lunar_db -e "DESCRIBE users;"
# Should show all columns including oauth_provider, oauth_id, profile_image
```

---

## 🔌 Backend Configuration

The backend .env file is already configured:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
```

---

## 🚀 Start the Application

### Terminal 1: Start Backend
```bash
cd Backend
npm run dev
```

Should show:
```
✓ Connected to MySQL database!
LUNAR API Server Started Successfully
Port: 5000
```

### Terminal 2: Start Frontend
```bash
cd Frontend
npm run dev
```

Should show:
```
VITE v5.4.19 ready in 405 ms
Local: http://localhost:8082/
```

---

## 📊 Seed Sample Data (Optional)

To add test data to the database:

```bash
# Seed admin user
cd Backend
npm run seed:admin

# Output should show:
# Admin user seeded successfully!
```

**Admin Credentials:**
- Email: admin@lunar.com
- Password: password

---

## 🧪 Test the Integration

1. **Frontend:** http://localhost:8082/
   - Should load the Lunar homepage ✅
   
2. **Backend API:** http://localhost:5000/health
   - Should return: `{"status":"OK","message":"Lunar API is running"}`

3. **Test Login:**
   - Go to http://localhost:8082/login
   - Try with admin credentials (after seeding)

---

## ⚠️ Troubleshooting

### Issue: "Can't connect to MySQL server"

**Solution 1: Check MySQL is running**
```bash
# Windows
net start MySQL80
# or for XAMPP
# Start XAMPP Control Panel and click MySQL Start

# Check port 3306
netstat -ano | findstr :3306
```

**Solution 2: Verify credentials**
```bash
# Test connection
mysql -h localhost -u root -p123456 -e "SELECT 1"
```

**Solution 3: Create database manually**
```bash
mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS lunar_db;"
```

---

### Issue: "Schema not found" error

**Solution:**
```bash
# Run schema manually
mysql -u root -p123456 < Backend\database\schema.sql

# Verify tables
mysql -u root -p123456 lunar_db -e "SHOW TABLES;"
```

---

### Issue: "Port 3306 already in use"

**Solution:**
```bash
# Find process using port 3306
netstat -ano | findstr :3306

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or restart MySQL
net stop MySQL80
net start MySQL80
```

---

## 📝 Database Structure

### Users Table
```sql
id (INT) - Primary Key
name (VARCHAR) - User name
email (VARCHAR) - Unique email
password (VARCHAR) - Hashed password (NULL for OAuth users)
role (ENUM) - 'user' or 'admin'
oauth_provider (VARCHAR) - 'google', 'apple', or NULL
oauth_id (VARCHAR) - OAuth provider ID
profile_image (VARCHAR) - Profile picture URL
created_at (TIMESTAMP) - Account creation time
updated_at (TIMESTAMP) - Last update time
```

### Products Table
```sql
id (INT) - Primary Key
name (VARCHAR) - Product name
brand (VARCHAR) - Brand name
description (TEXT) - Product description
gender (ENUM) - 'men', 'women', 'kids'
category_id (INT) - Foreign Key to categories
price (DECIMAL) - Product price
stock (INT) - Stock quantity
image_url (VARCHAR) - Product image URL
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Orders Table
```sql
id (INT) - Primary Key
user_id (INT) - Foreign Key to users
total_price (DECIMAL) - Order total
status (ENUM) - 'pending', 'shipped', 'delivered', 'cancelled'
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Order Items Table
```sql
id (INT) - Primary Key
order_id (INT) - Foreign Key to orders
product_id (INT) - Foreign Key to products
quantity (INT) - Quantity ordered
price (DECIMAL) - Price at time of order
created_at (TIMESTAMP)
```

### Categories Table
```sql
id (INT) - Primary Key
name (VARCHAR) - Category name
gender (ENUM) - 'men', 'women', 'kids'
created_at (TIMESTAMP)
```

---

## 🔐 Security Notes

- ✅ Passwords are hashed with bcryptjs
- ✅ OAuth users get auto-generated passwords
- ✅ SQL prepared statements prevent injection
- ✅ Foreign keys maintain referential integrity
- ⚠️ Change 123456 password for production!

---

## 📚 Useful Commands

```bash
# Connect to MySQL
mysql -u root -p123456

# Select database
USE lunar_db;

# Show all databases
SHOW DATABASES;

# Show all tables
SHOW TABLES;

# Describe table structure
DESCRIBE users;

# View sample data
SELECT * FROM users LIMIT 5;

# Check row count
SELECT COUNT(*) FROM users;

# Reset/clear database
DROP DATABASE lunar_db;
mysql < Backend/database/schema.sql

# Backup database
mysqldump -u root -p123456 lunar_db > backup.sql

# Restore database
mysql -u root -p123456 lunar_db < backup.sql
```

---

## ✨ What's Next?

1. ✅ MySQL database setup
2. ✅ Backend connected to database
3. ⏭️ Start backend server
4. ⏭️ Start frontend server
5. ⏭️ Test the full application
6. ⏭️ Add sample products
7. ⏭️ Deploy to production

---

## 🎯 Success Indicators

✅ All of these should be true:
- [ ] MySQL service is running
- [ ] Database `lunar_db` exists
- [ ] All 5 tables exist in database
- [ ] Backend starts without database errors
- [ ] Frontend loads on http://localhost:8082/
- [ ] You can access http://localhost:5000/health

---

**Setup Complete!** 🎉

Your Lunar app is now connected to MySQL database!

For questions, refer to the backend README or documentation files.
