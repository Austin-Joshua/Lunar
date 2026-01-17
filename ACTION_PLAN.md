# 🎯 ACTION PLAN - Fix "Failed to Fetch" Error

## Your Issue
```
You're seeing: "Failed to fetch" error when trying to login
Possible causes: Backend not running, CORS issue, or port problem
```

---

## 🔍 DIAGNOSIS

To figure out EXACTLY what's wrong, follow this flowchart:

**READ THIS FIRST:** `TROUBLESHOOTING_FLOWCHART.txt`

This will tell you:
- Is backend running?
- Is port accessible?
- Is it a CORS issue?
- Is it a network issue?
- Or database problem?

---

## 📋 YOUR ACTION ITEMS

### Step 1: Identify the Problem (5 minutes)

1. **Open `TROUBLESHOOTING_FLOWCHART.txt`**
2. **Follow the flowchart step by step**
3. **Find where it says "PASS ✅" or "FAIL ❌"**
4. **This tells you the exact problem**

### Step 2: Fix the Problem (10-30 minutes)

Based on what the flowchart says:

| Problem | Solution | File |
|---------|----------|------|
| Backend not running | Start it with `npm run dev` | QUICK_LOGIN_START.txt |
| CORS error | Check config in CORS_AND_PORT_FIX.md | CORS_AND_PORT_FIX.md |
| Port 5000 blocked | Kill process, restart backend | CORS_AND_PORT_FIX.md |
| MySQL not running | Start MySQL service | CORS_AND_PORT_FIX.md |
| Firewall blocking | Add exception for port 5000 | CORS_AND_PORT_FIX.md |

### Step 3: Verify It Works (5 minutes)

1. **Open browser to:** `http://localhost:5173/login`
2. **Enter credentials:**
   - Email: `admin@lunar.com`
   - Password: `admin123456`
3. **Click "Sign in"**
4. **Check result:**
   - ✅ Logged in → Problem solved!
   - ❌ Still error → Go back to flowchart

---

## 📚 REFERENCE GUIDE

### For Quick Start
📄 **QUICK_LOGIN_START.txt**
- Read this: 2 minutes
- Follow it: 3 steps
- Use when: You just want to get it running

### For Complete Setup
📄 **LOGIN_SETUP_GUIDE.md**
- Read this: 10 minutes
- Covers everything: Setup, config, troubleshooting
- Use when: You need full understanding

### For Technical Debugging
📄 **CORS_AND_PORT_FIX.md**
- Read this: 15 minutes
- Deep dive: CORS, ports, network, database
- Use when: Advanced troubleshooting needed

### For Decision Tree
📄 **TROUBLESHOOTING_FLOWCHART.txt**
- Use this: Right now
- Follow it: Step by step
- Use when: Identifying the exact problem

### For Automated Setup
📄 **START_SERVERS.ps1**
- Run this: `.\START_SERVERS.ps1`
- Interactive menu: Choose what to do
- Use when: You prefer menu-driven setup

---

## ⚡ QUICK REFERENCE COMMANDS

### If Backend Won't Start

```powershell
# Kill all node processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force

# Navigate to backend
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend

# Start backend
npm run dev
```

**Expected:** "Server running on port 5000"

### If Frontend Won't Start

```powershell
# Navigate to frontend (NEW TERMINAL)
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend

# Start frontend
npm run dev -- --force
```

**Expected:** "Local: http://localhost:5173"

### If You Can't Connect

```powershell
# Test backend is accessible
curl http://localhost:5000/health

# Should return JSON with "status": "OK"
```

### If CORS Error

```powershell
# Backend CORS config is in Backend/server.js

# It should allow:
# origin: 'http://localhost:5173'
# credentials: true
# methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
```

---

## 🎯 SPECIFIC SCENARIOS

### Scenario 1: "Failed to fetch" with nothing else

**Most likely:** Backend not running

**Fix:**
```powershell
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm run dev
# Wait for "Server running on port 5000"
```

### Scenario 2: "Failed to fetch" + error in backend terminal

**Most likely:** Backend crashed, database error

**Fix:**
1. **Read the error in backend terminal**
2. **Check if MySQL is running**
3. **Check credentials in Backend/.env**
4. **Restart backend**

### Scenario 3: "Failed to fetch" + CORS error in browser console

**Most likely:** Frontend URL doesn't match CORS config

**Fix:**
1. **Check Backend/.env has:** `CORS_ORIGIN=http://localhost:5173`
2. **Or check Backend/server.js CORS config**
3. **Make sure origin matches frontend URL**
4. **Restart backend**

### Scenario 4: "Failed to fetch" + connection refused

**Most likely:** Port 5000 in use or blocked

**Fix:**
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <process_id> /F

# Or change port in Backend/.env
# PORT=5001
# Then restart backend
```

### Scenario 5: Login gets to API but says "Invalid email/password"

**GOOD NEWS!** Backend is working! 🎉

**Problem:** Wrong credentials

**Fix:**
- Use: `admin@lunar.com` / `admin123456`
- Or create new account at `/register`

---

## 📞 DEBUGGING CHECKLIST

### Basic Level
- [ ] Backend running? Check terminal for "Server running on port 5000"
- [ ] Frontend running? Check terminal for "Local: http://localhost:5173"
- [ ] Can access http://localhost:5173/login? Yes? Good!
- [ ] Test credentials correct? admin@lunar.com / admin123456?

### Intermediate Level
- [ ] Backend accessible? Test: `curl http://localhost:5000/health`
- [ ] Port 5000 free? Test: `netstat -ano | findstr :5000`
- [ ] MySQL running? Connect: `mysql -u root -p123456`
- [ ] .env files exist? Check Backend/.env and Frontend/.env

### Advanced Level
- [ ] Browser console shows CORS error? Check CORS_AND_PORT_FIX.md
- [ ] Backend terminal shows error? Read and understand it
- [ ] Network tab shows failed request? Check response
- [ ] Firewall blocking port? Add exception in Windows Defender

---

## 🚀 STEP-BY-STEP FIX PROCESS

### For "Failed to fetch" Error:

1. **Check Backend Terminal**
   ```
   Do you see "Server running on port 5000"?
   - YES → Go to step 2
   - NO → Run: npm run dev in Backend folder
   ```

2. **Test Backend Connection**
   ```
   curl http://localhost:5000/health
   - Returns JSON? → Go to step 3
   - Error/timeout? → Backend not accessible, restart it
   ```

3. **Check Frontend Terminal**
   ```
   Do you see "Local: http://localhost:5173"?
   - YES → Go to step 4
   - NO → Run: npm run dev --force in Frontend folder
   ```

4. **Open Browser Developer Tools (F12)**
   ```
   Go to Console tab
   Do you see CORS error?
   - YES → Go to CORS_AND_PORT_FIX.md
   - NO → Go to step 5
   ```

5. **Try Login Again**
   ```
   Email: admin@lunar.com
   Password: admin123456
   - Works? → SUCCESS! ✅
   - Still fails? → Check Network tab (F12)
   ```

6. **Check Network Tab**
   ```
   Look for request to /api/auth/login
   Status code?
   - 200 with data → It worked! Congratulations! 🎉
   - 401 → Wrong credentials, use ones above
   - 0 or network error → Connection problem, restart both servers
   ```

---

## ✅ SUCCESS INDICATORS

You'll know it's working when:

1. ✅ **Backend Terminal**
   ```
   Shows: "Server running on port 5000"
   ```

2. ✅ **Frontend Terminal**
   ```
   Shows: "Local: http://localhost:5173"
   ```

3. ✅ **Browser**
   ```
   Can access: http://localhost:5173/login
   No errors in console
   ```

4. ✅ **Login**
   ```
   Can enter credentials
   Can click "Sign in"
   No "Failed to fetch" error
   ```

5. ✅ **After Login**
   ```
   Redirected to homepage
   See your name in navbar
   Can click logout
   Redirected to login page
   ```

---

## 📋 COMPLETE ACTION STEPS

### Right Now (Next 5 minutes)

1. **Open Terminal**
2. **Go to:** `C:\Users\austi\OneDrive\Desktop\Lunar`
3. **Read:** `TROUBLESHOOTING_FLOWCHART.txt`
4. **Follow:** The flowchart

### In 5-10 minutes

1. **Identify:** What the flowchart says is wrong
2. **Refer:** To the solution guide for that problem
3. **Execute:** The fix (usually just restart backend/frontend)
4. **Test:** Try logging in again

### In 10-15 minutes

1. **If still not working:** Check browser console (F12)
2. **Look for:** CORS errors or specific error messages
3. **Search:** The guides for that specific error
4. **Apply:** The solution

---

## 🎓 UNDERSTANDING THE SETUP

```
User Browser (http://localhost:5173)
         ↓
   Frontend App (React)
         ↓ HTTP Request
Backend API (http://localhost:5000)
         ↓ SQL Query
   MySQL Database
         ↓ Response
Backend returns token + user
         ↓ JSON Response
Frontend stores token
         ↓
User logged in ✅
```

**For login to work, ALL of these must work:**
- ✅ Frontend server running on port 5173
- ✅ Backend server running on port 5000
- ✅ Can reach backend from frontend (CORS)
- ✅ MySQL running and accessible
- ✅ Valid credentials in database

---

## 🔗 DOCUMENTS TO READ

1. **START HERE:** `TROUBLESHOOTING_FLOWCHART.txt`
2. **Quick Start:** `QUICK_LOGIN_START.txt`
3. **Full Setup:** `LOGIN_SETUP_GUIDE.md`
4. **Technical:** `CORS_AND_PORT_FIX.md`
5. **Reference:** `START_SERVERS.ps1`

---

## 💡 KEY POINTS

- **"Failed to fetch" = Backend not accessible**
- **CORS error = Backend doesn't allow frontend**
- **Port in use = Kill other process or change port**
- **Connection refused = Backend not running**
- **401 error = Wrong credentials (but backend works!)**
- **500 error = Backend crash or database issue**

---

## ✨ FINAL WORDS

You have everything you need to fix this. The guides are comprehensive and the flowchart will identify exactly what's wrong.

**Follow the flowchart first. That's the key.**

Once you know what's wrong, the fix is simple.

**You've got this! 💪**

---

**Created:** January 17, 2026
**Status:** Complete troubleshooting package ready
**Next:** Read TROUBLESHOOTING_FLOWCHART.txt right now!
