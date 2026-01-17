# 🔧 "Failed to Fetch" - CORS & Port Diagnostic Guide

## 🔍 THE ISSUE

You're getting **"Failed to fetch"** error when trying to login. This could be:

```
❌ Backend not running (most common)
❌ Wrong port number
❌ CORS configuration wrong
❌ Backend crashed
❌ MySQL connection failed
```

---

## 📊 DIAGNOSTIC CHECKLIST

### Step 1: Verify Backend is Running

**Check Terminal 1 (where you ran npm run dev):**

```
Look for this message:
╭─────────────────────────────────────────╮
│   LUNAR API Server Started Successfully │
├─────────────────────────────────────────┤
│  Port: 5000
│  Environment: development
│  CORS Origin: http://localhost:5173
╰─────────────────────────────────────────╯
```

**If you see it → Backend is running ✅**
**If you don't see it → Check Terminal 1 for errors**

---

### Step 2: Test Backend Connection

**Open a NEW Terminal and run:**

```powershell
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "status":"OK",
  "message":"Lunar API is running",
  "timestamp":"2026-01-17T..."
}
```

**If you get response → Backend is accessible ✅**
**If connection refused → Backend not running ❌**

---

### Step 3: Check Port Availability

**Is port 5000 actually available?**

```powershell
netstat -ano | findstr :5000
```

**If nothing returned → Port is free ✅**
**If shows process → Port in use, kill it:**

```powershell
# Find the process ID from output above, then:
taskkill /PID <process_id> /F
```

---

### Step 4: Verify CORS Configuration

**Backend should have CORS enabled for http://localhost:5173**

Check `Backend/server.js` line 27-33:

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
}));
```

✅ This looks correct!

---

## 🎯 STEP-BY-STEP FIX

### Fix 1: Restart Backend Properly

```powershell
# Terminal 1
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend

# Kill any existing process
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force

# Wait 2 seconds
Start-Sleep -Seconds 2

# Start fresh
npm run dev
```

**Wait for "Server running on port 5000"**

---

### Fix 2: Verify Frontend Can Reach Backend

**Frontend tries to reach:** `http://localhost:5000/api`

Check Frontend constants:
```
Frontend/src/utils/constants.ts (Line 2):
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

✅ This is correct!

---

### Fix 3: Check Network Issues

**Windows Firewall might be blocking port 5000:**

```powershell
# Check firewall rules
Get-NetFirewallRule -DisplayName "*5000*"

# If blocked, create allow rule:
New-NetFirewallRule -DisplayName "Allow Node 5000" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5000
```

---

### Fix 4: Verify Database Connection

**Backend needs MySQL to be running:**

```powershell
# Test MySQL connection
mysql -h localhost -u root -p123456

# If connected, check database:
USE lunar_db;
SELECT * FROM users;
```

**If you see users table → Database working ✅**
**If error → Database issue, check MySQL**

---

## 🚨 COMPLETE DEBUGGING STEPS

### A. Kill All Node Processes

```powershell
# Kill all running node processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force

# Verify killed
tasklist | findstr node
# Should show nothing
```

### B. Clear Node Cache

```powershell
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
rm -r node_modules
npm install
```

### C. Restart Backend

```powershell
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm run dev
```

**Wait for:**
```
Server running on port 5000
```

### D. In NEW Terminal, Restart Frontend

```powershell
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
npm run dev -- --force
```

**Wait for:**
```
Local: http://localhost:5173
```

### E. Test in Browser

```
Go to: http://localhost:5173/login
Try login with: admin@lunar.com / admin123456
```

---

## 🧪 DETAILED TESTING GUIDE

### Test 1: Backend Health Check

```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET
$response.StatusCode
# Should return: 200

$response.Content | ConvertFrom-Json
# Should show status "OK"
```

### Test 2: Login API Test

```powershell
$body = @{
    email = "admin@lunar.com"
    password = "admin123456"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$response.StatusCode
# Should return: 200

$response.Content | ConvertFrom-Json
# Should show: accessToken, refreshToken, user data
```

### Test 3: CORS Headers Check

```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET
$response.Headers
# Should include:
# Access-Control-Allow-Origin: http://localhost:5173
```

---

## ❌ COMMON ERRORS & SOLUTIONS

### Error: "Failed to fetch"

**Causes:**
1. Backend not running
2. Wrong port (not 5000)
3. Backend crashed
4. Network blocked

**Solutions:**
- [ ] Check backend terminal for "Server running on port 5000"
- [ ] Test: `curl http://localhost:5000/health`
- [ ] Check logs for errors
- [ ] Restart backend

---

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause:** CORS not configured correctly

**Solution:**
```javascript
// Backend/server.js should have:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

### Error: "Backend refused connection"

**Cause:** Port 5000 not listening

**Solutions:**
- [ ] Kill existing process: `taskkill /PID <id> /F`
- [ ] Check port: `netstat -ano | findstr :5000`
- [ ] Change port in .env if needed
- [ ] Restart backend

---

### Error: "Cannot connect to MySQL"

**Cause:** MySQL not running or wrong credentials

**Solutions:**
- [ ] Start MySQL service
- [ ] Check .env has correct credentials
- [ ] Test: `mysql -u root -p123456`
- [ ] Verify database exists: `USE lunar_db;`

---

## 🎯 QUICK REFERENCE

### Ports
```
Frontend:  http://localhost:5173
Backend:   http://localhost:5000
MySQL:     localhost:3306
```

### Key URLs
```
API Base:        http://localhost:5000/api
Health Check:    http://localhost:5000/health
Login Endpoint:  http://localhost:5000/api/auth/login
Frontend:        http://localhost:5173
Login Page:      http://localhost:5173/login
```

### Environment Variables
```
Backend (.env):
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=123456
  CORS_ORIGIN=http://localhost:5173

Frontend (.env):
  VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📋 VERIFICATION CHECKLIST

- [ ] Backend terminal shows "Server running on port 5000"
- [ ] Frontend terminal shows "Local: http://localhost:5173"
- [ ] `curl http://localhost:5000/health` returns 200
- [ ] Browser shows no "Failed to fetch" error
- [ ] MySQL is running and accessible
- [ ] .env files configured correctly
- [ ] Port 5000 is not blocked by firewall
- [ ] Can navigate to http://localhost:5173/login
- [ ] Can enter credentials
- [ ] Login API works (test with curl)

---

## 🚀 IF EVERYTHING IS CORRECT

But you STILL get "Failed to fetch", check:

### Browser Console (F12)

```
Right-click → Inspect → Console tab

Look for error messages like:
- "CORS error"
- "Connection refused"
- "Failed to fetch"
- "404 Not Found"
```

### Network Tab (F12)

```
Right-click → Inspect → Network tab

Click login and check:
- Request to: http://localhost:5000/api/auth/login
- Status code: 200 or 401 (not network error)
- CORS headers present
```

### Backend Terminal

```
Should show:
POST /api/auth/login

If you don't see this, request never reached backend!
Check:
- Frontend CORS configuration
- Network firewall
- Port binding
```

---

## 🔒 CORS EXPLAINED

### What is CORS?

```
Browser blocks requests from:
  http://localhost:5173

To:
  http://localhost:5000

Unless server explicitly allows it with CORS headers
```

### Our CORS Config

```javascript
app.use(cors({
  origin: 'http://localhost:5173',     // Allow from frontend
  credentials: true,                    // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
}));
```

✅ This allows frontend to access backend!

---

## 📝 DIAGNOSTIC SCRIPT

Create file: `diagnose.ps1`

```powershell
Write-Host "🔍 LUNAR Diagnostic Check" -ForegroundColor Green
Write-Host ""

# Check Backend
Write-Host "Testing Backend Connection..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend is running on port 5000" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend is NOT running" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Yellow
}

# Check Frontend
Write-Host ""
Write-Host "Testing Frontend..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -Method GET -TimeoutSec 5
    Write-Host "✅ Frontend is running on port 5173" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend is NOT running" -ForegroundColor Red
}

# Check MySQL
Write-Host ""
Write-Host "Testing MySQL..."
try {
    $conn = New-Object System.Data.MySqlClient.MySqlConnection
    $conn.ConnectionString = "server=localhost;user=root;password=123456;database=lunar_db"
    $conn.Open()
    Write-Host "✅ MySQL is accessible" -ForegroundColor Green
    $conn.Close()
} catch {
    Write-Host "❌ MySQL is NOT accessible" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Yellow
}

Write-Host ""
```

---

## ✅ SOLUTION SUMMARY

1. **Kill all Node processes** → Clean slate
2. **Restart Backend** → `npm run dev` in Backend folder
3. **Restart Frontend** → `npm run dev --force` in Frontend folder (new terminal)
4. **Test connection** → `curl http://localhost:5000/health`
5. **Try login** → http://localhost:5173/login
6. **Check browser console** → F12 for any errors

---

## 📞 IF YOU STILL HAVE ISSUES

After following all steps above:

1. **Check Terminal 1 output for errors**
2. **Check browser console (F12) for errors**
3. **Check network tab (F12) for API responses**
4. **Verify MySQL is running**
5. **Check .env files are configured**
6. **Look for port conflicts**

---

**Status:** Complete diagnostic guide ready
**Next:** Follow steps above to resolve
**Result:** "Failed to fetch" error will be fixed! ✅
