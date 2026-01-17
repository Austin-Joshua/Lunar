# 🔧 Install MySQL on Windows - Complete Guide

**MySQL is required for the Lunar app to work with the database.**

---

## ⚡ EASIEST METHOD: Using XAMPP (Recommended for Beginners)

XAMPP includes MySQL, Apache, PHP, and everything you need. It's the easiest way to get started.

### Step 1: Download XAMPP
1. Go to: https://www.apachefriends.org/
2. Click "Download" for Windows
3. Choose the latest version (PHP 8.x or higher)

### Step 2: Install XAMPP
1. Run the downloaded `.exe` file
2. Click "Next" through the installation wizard
3. Choose installation folder (default is fine)
4. Make sure to check:
   - ✅ Apache
   - ✅ MySQL
   - ✅ PHP
5. Click "Install"
6. Complete the installation

### Step 3: Start MySQL
1. Open **XAMPP Control Panel** (search for "xampp" in Start menu)
2. Click "Start" button next to **MySQL**
3. It should show green indicating MySQL is running
4. You should see: "MySQL is running"

### Step 4: Verify Installation
Open Command Prompt and run:
```bash
mysql --version
```

Should output something like: `mysql Ver 8.x.x for Win64`

✅ **MySQL is now installed and running!**

---

## 🖥️ DIRECT METHOD: Install MySQL Standalone

If you prefer a direct install without XAMPP:

### Step 1: Download MySQL
1. Go to: https://dev.mysql.com/downloads/mysql/
2. Choose "MySQL Community Server"
3. Select Windows version
4. Download "MySQL Installer for Windows"

### Step 2: Run Installer
1. Double-click `mysql-installer-community-X.X.X.msmsi`
2. Click "Yes" if prompted for admin rights
3. Choose "Setup Type": Select **Developer Default**
4. Click "Next" and continue

### Step 3: Configure MySQL
1. Port: Keep as **3306** (default)
2. Configuration Type: **Development Machine**
3. Click "Next"

### Step 4: MySQL Server Configuration
1. **Server Configuration Setup**
   - Port: 3306
   - Windows Service Name: MySQL80 (or latest version)
   - Start MySQL as service: ✅ Check this
   - Click "Next"

2. **Accounts and Roles**
   - Root Password: **123456**
   - Confirm: **123456**
   - MySQL User Accounts: Leave as default
   - Click "Next"

3. Click "Execute" and wait for configuration
4. Click "Finish"

### Step 5: Verify Installation
Open Command Prompt:
```bash
mysql -u root -p123456 -e "SELECT 1"
```

Should output:
```
+---+
| 1 |
+---+
| 1 |
+---+
```

✅ **MySQL is installed!**

---

## 🔌 Connect Lunar App to MySQL

Once MySQL is running, follow these steps:

### Step 1: Verify MySQL is Running

**Option A: Using Command Prompt**
```bash
mysql -u root -p123456 -e "SELECT 1"
```

**Option B: Using XAMPP**
- Open XAMPP Control Panel
- Look for green indicator next to MySQL

### Step 2: Create Database and Tables

**Method 1: Automatic Script (Easiest)**
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar
.\QUICK_MYSQL_SETUP.bat
```

This will:
- ✓ Verify MySQL connection
- ✓ Create `lunar_db` database
- ✓ Create all 5 tables
- ✓ Show success confirmation

**Method 2: Manual Command**
```bash
mysql -u root -p123456 < "C:\Users\austi\OneDrive\Desktop\Lunar\Backend\database\schema.sql"
```

**Method 3: Using MySQL Workbench (GUI)**
1. Download MySQL Workbench: https://www.mysql.com/products/workbench/
2. Install it
3. Create new connection:
   - Hostname: localhost
   - Username: root
   - Password: 123456
4. Click "Test Connection"
5. In new SQL tab, open: `Backend/database/schema.sql`
6. Press Ctrl+Shift+Enter to execute

### Step 3: Verify Database Creation

```bash
mysql -u root -p123456 -e "SHOW DATABASES;" | grep lunar_db
```

Should show: `lunar_db`

Then verify tables:
```bash
mysql -u root -p123456 lunar_db -e "SHOW TABLES;"
```

Should show:
```
+-----------------+
| Tables_in_lunar_db |
+-----------------+
| categories      |
| order_items     |
| orders          |
| products        |
| users           |
+-----------------+
```

✅ **Database setup complete!**

---

## 🚀 Start the Lunar App

Once MySQL is running and database is created:

### Terminal 1: Start Backend
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
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
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
npm run dev
```

Should show:
```
VITE v5.4.19 ready in 405 ms
Local: http://localhost:8082/
```

### Open in Browser
Visit: **http://localhost:8082/**

✅ **App is running!**

---

## ✅ Troubleshooting

### ❌ "MySQL is not recognized"

**Solution:**
- MySQL is not in your system PATH
- Add to PATH:
  1. Open "Environment Variables" (search in Start menu)
  2. Click "Edit the system environment variables"
  3. Click "Environment Variables" button
  4. Under "System variables", find "Path" and click "Edit"
  5. Click "New" and add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
  6. Click OK, OK, OK
  7. Close and reopen Command Prompt
  8. Try again: `mysql --version`

### ❌ "Can't connect to MySQL server"

**Solutions:**
1. **Check if MySQL is running:**
   - XAMPP: Open Control Panel, check MySQL has green indicator
   - Direct install: Check Services (search "services" in Start menu), look for MySQL80

2. **Verify password:**
   ```bash
   mysql -u root -p
   # Enter password: 123456
   ```

3. **Check port 3306:**
   ```bash
   netstat -ano | findstr :3306
   ```
   Should show something (indicates MySQL is listening)

4. **Restart MySQL:**
   - Windows: `net stop MySQL80` then `net start MySQL80`
   - XAMPP: Stop then Start in Control Panel

### ❌ "Database lunar_db doesn't exist"

**Solution:**
```bash
mysql -u root -p123456 < "C:\Users\austi\OneDrive\Desktop\Lunar\Backend\database\schema.sql"
```

Or use the batch script:
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar
.\QUICK_MYSQL_SETUP.bat
```

---

## 📚 Quick Reference

### Important Credentials
```
Host: localhost
User: root
Password: 123456
Database: lunar_db
Port: 3306
```

### Useful Commands
```bash
# Connect to MySQL
mysql -u root -p123456

# List databases
mysql -u root -p123456 -e "SHOW DATABASES;"

# Create database
mysql -u root -p123456 -e "CREATE DATABASE lunar_db;"

# View tables
mysql -u root -p123456 lunar_db -e "SHOW TABLES;"

# View table structure
mysql -u root -p123456 lunar_db -e "DESCRIBE users;"

# View data
mysql -u root -p123456 lunar_db -e "SELECT * FROM users;"

# Backup database
mysqldump -u root -p123456 lunar_db > backup.sql

# Restore database
mysql -u root -p123456 lunar_db < backup.sql
```

---

## ✨ What to Do Next

After MySQL is installed and running:

1. ✅ Run `QUICK_MYSQL_SETUP.bat` to create database
2. ✅ Start Backend: `cd Backend && npm run dev`
3. ✅ Start Frontend: `cd Frontend && npm run dev`
4. ✅ Visit: http://localhost:8082
5. ✅ Enjoy Lunar App! 🎉

---

## 📞 Need Help?

**MySQL Installation Issues:**
- Official docs: https://dev.mysql.com/doc/refman/8.0/en/
- XAMPP support: https://www.apachefriends.org/support.html

**Lunar App Issues:**
- Check backend logs (Terminal showing `npm run dev`)
- Check browser console (F12 in browser)
- Read error messages carefully!

---

**🎉 You're ready to run the Lunar app!**

Once MySQL is running, the app will connect automatically and you can start shopping!
