@echo off
REM ============================================
REM Lunar App - Quick MySQL Setup Script
REM ============================================
REM This script helps set up MySQL for Lunar app
REM Password: 123456

echo.
echo ╔════════════════════════════════════════════════╗
echo ║  LUNAR - Quick MySQL Setup                    ║
echo ║  Database: lunar_db                           ║
echo ║  User: root                                    ║
echo ║  Password: 123456                             ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Check if MySQL is installed
echo [1/4] Checking if MySQL is installed...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL is not installed or not in PATH
    echo Please install MySQL from: https://dev.mysql.com/downloads/mysql/
    echo Or use XAMPP from: https://www.apachefriends.org/
    echo.
    pause
    exit /b 1
)
echo ✓ MySQL found
echo.

REM Check MySQL connection
echo [2/4] Testing MySQL connection...
mysql -h localhost -u root -p123456 -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Cannot connect to MySQL
    echo Troubleshooting:
    echo 1. Make sure MySQL service is running
    echo    - Windows: Check Services (services.msc)
    echo    - XAMPP: Start MySQL from XAMPP Control Panel
    echo 2. Verify password is correct: 123456
    echo 3. Check MySQL is on port 3306
    echo.
    pause
    exit /b 1
)
echo ✓ MySQL connection successful
echo.

REM Create database
echo [3/4] Creating database and tables...
mysql -u root -p123456 < "%CD%\Backend\database\schema.sql"
if %errorlevel% neq 0 (
    echo ❌ Failed to create database
    pause
    exit /b 1
)
echo ✓ Database created successfully
echo.

REM Verify database
echo [4/4] Verifying setup...
mysql -u root -p123456 -e "USE lunar_db; SHOW TABLES;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ All tables created successfully
    echo.
    echo ╔════════════════════════════════════════════════╗
    echo ║  ✅ MySQL Setup Complete!                     ║
    echo ╚════════════════════════════════════════════════╝
    echo.
    echo Database Details:
    echo   Host: localhost
    echo   User: root
    echo   Password: 123456
    echo   Database: lunar_db
    echo.
    echo Tables Created:
    echo   1. users
    echo   2. categories
    echo   3. products
    echo   4. orders
    echo   5. order_items
    echo.
    echo Next Steps:
    echo   1. Open Terminal 1: cd Backend ^& npm run dev
    echo   2. Open Terminal 2: cd Frontend ^& npm run dev
    echo   3. Visit: http://localhost:8082
    echo.
    pause
) else (
    echo ❌ Database verification failed
    pause
    exit /b 1
)
