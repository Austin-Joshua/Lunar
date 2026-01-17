# 🔐 LUNAR LOGIN - Complete Setup Guide

## ⚠️ THE ISSUE: "Failed to fetch" Error

```
Error: Failed to fetch
Cause: Backend server is NOT RUNNING
```

The login won't work because the frontend can't reach the backend API.

---

## 🚀 STEP-BY-STEP SETUP

### ⭐ MOST IMPORTANT: Start Backend Server First!

#### Step 1: Open Terminal (PowerShell/CMD)

```powershell
# Navigate to Backend folder
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
```

#### Step 2: Install Dependencies (if needed)

```powershell
npm install
```

#### Step 3: Create .env File

Create file: `Backend/.env` with these credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
JWT_SECRET=lunar_jwt_secret_key_2024
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Step 4: Start Backend Server

```powershell
npm run dev
```

**Expected Output:**
```
╭─────────────────────────────────────────╮
│   LUNAR API Server Started Successfully │
├─────────────────────────────────────────┤
│  Port: 5000
│  Environment: development
│  CORS Origin: http://localhost:5173
╰─────────────────────────────────────────╯
```

✅ **If you see this, backend is running!**

---

### Step 5: Start Frontend Server (NEW Terminal)

```powershell
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
npm run dev -- --force
```

**Expected Output:**
```
VITE v5.0.0 ready in 200 ms

➜  Local:   http://localhost:5173/
```

✅ **Frontend is now running!**

---

## 📋 TEST ACCOUNTS

### Admin Account
```
Email: admin@lunar.com
Password: admin123456
Role: admin
```

### User Account
```
Email: user@lunar.com
Password: user123456
Role: user
```

### How to Create These Accounts

#### Option 1: Run Seed Script (Recommended)
```powershell
# In Backend folder
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm run seed:users
```

#### Option 2: Create Manually
1. Go to http://localhost:5173/register
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: your_password
3. Click "Create Account"
4. ✅ Account created!

---

## 🔑 LOGIN PROCESS

### How Login Works

```
User Submits Credentials
    ↓
Frontend sends: POST http://localhost:5000/api/auth/login
    ↓
Backend checks email & password
    ↓
If valid:
  ├─ Generate access token (15 min)
  ├─ Generate refresh token (7 days)
  └─ Return both tokens + user data
    ↓
Frontend stores token in localStorage
    ↓
User logged in ✅
```

### API Endpoint

```
POST /api/auth/login

Body:
{
  "email": "user@lunar.com",
  "password": "user123456"
}

Response (Success):
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "15m",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@lunar.com",
      "role": "user",
      "createdAt": "2026-01-17T12:00:00Z"
    }
  }
}

Response (Failed):
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## ✅ COMPLETE CHECKLIST

### ✓ Backend Setup
- [ ] Navigate to Backend folder
- [ ] Run `npm install`
- [ ] Create `.env` file with correct credentials
- [ ] Run `npm run dev`
- [ ] See "Server running on port 5000"
- [ ] Backend shows ✅ message

### ✓ Frontend Setup
- [ ] Navigate to Frontend folder (NEW TERMINAL)
- [ ] Run `npm run dev -- --force`
- [ ] See "Local: http://localhost:5173"
- [ ] Frontend is accessible

### ✓ Database
- [ ] MySQL is running
- [ ] Database credentials match .env
- [ ] Tables are created (schema.sql)

### ✓ Test Accounts
- [ ] Option A: Run seed script (`npm run seed:users`)
- [ ] OR Option B: Register manually via web form

### ✓ Login Test
- [ ] Go to http://localhost:5173/login
- [ ] Enter test credentials
- [ ] Click "Sign in"
- [ ] ✅ Should login successfully!

---

## 🎯 WHAT TO DO NOW

### 1. Backend Not Starting?

**Check if MySQL is running:**
```powershell
# In a new terminal
mysql -u root -p
# Enter password: 123456
# If it connects, MySQL is running ✅
# Type: exit
```

**Check for port conflicts:**
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If something is using it, kill the process:
taskkill /PID <process_id> /F
```

### 2. Still Getting "Failed to fetch"?

**Verify backend is actually running:**
```powershell
# Open new terminal and test
curl http://localhost:5000/health

# Should return:
# {"status":"OK","message":"Lunar API is running",...}
```

**If it doesn't work:**
- Backend is NOT running ❌
- Go back to Step 4 and check the output

### 3. Login Not Working After Both Servers Run?

**Check backend logs for errors:**
- Look at the Backend terminal output
- Should show requests like: `POST /api/auth/login`

**Verify test credentials exist:**
```powershell
# Connect to MySQL
mysql -u root -p lunar_db
# Enter password: 123456
# Query: SELECT * FROM users;
```

---

## 📊 SERVERS STATUS

### When Everything Works:

```
✅ Terminal 1 (Backend):
   Server running on port 5000
   CORS Origin: http://localhost:5173
   
✅ Terminal 2 (Frontend):
   Local: http://localhost:5173
   
✅ Browser:
   http://localhost:5173/login
   Can login successfully
```

### Common Issues & Fixes:

| Issue | Cause | Fix |
|-------|-------|-----|
| "Failed to fetch" | Backend not running | Start backend: `npm run dev` |
| "Cannot connect to MySQL" | MySQL not running | Start MySQL |
| Port 5000 in use | Another app using port | Kill process or change port |
| 401 Invalid email/password | Wrong credentials | Use test accounts above |
| CORS error | Wrong frontend URL in .env | Set `CORS_ORIGIN=http://localhost:5173` |

---

## 🚀 QUICK START COMMANDS

### Terminal 1: Backend
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm install
npm run dev
```

### Terminal 2: Frontend
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
npm install
npm run dev -- --force
```

### Terminal 3: Create Test Accounts
```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
npm run seed:users
```

---

## ✨ FINAL STEPS

1. **Start Backend** (Terminal 1)
   - `npm run dev`
   - Wait for "Server running on port 5000"

2. **Start Frontend** (Terminal 2)
   - `npm run dev -- --force`
   - Wait for "Local: http://localhost:5173"

3. **Create Test Accounts** (Terminal 3)
   - `npm run seed:users`
   - Or register manually at `/register`

4. **Login** (Browser)
   - Go to http://localhost:5173/login
   - Use test credentials
   - ✅ You're logged in!

---

## 🎓 UNDERSTANDING THE FLOW

### Request Flow:
```
Browser (http://localhost:5173)
    ↓ (HTTP Request)
Frontend App (React)
    ↓ (Fetch with credentials)
Backend API (http://localhost:5000/api)
    ↓ (Query)
MySQL Database (lunar_db)
    ↓ (Response)
Backend returns token + user data
    ↓ (JSON Response)
Frontend stores in localStorage
    ↓ (Redirects)
User sees homepage ✅
```

### Data Flow on Login:
```
User fills form:
  email: "admin@lunar.com"
  password: "admin123456"
         ↓
Frontend validates
         ↓
POST /api/auth/login with credentials
         ↓
Backend receives request
         ↓
Query: SELECT * FROM users WHERE email = ?
         ↓
Found: Check password with bcrypt
         ↓
Password matches ✅
         ↓
Generate JWT tokens
         ↓
Store refresh token in database
         ↓
Return response with tokens
         ↓
Frontend stores accessToken in localStorage
         ↓
Redirect to homepage
         ↓
User logged in ✅
```

---

## 🔒 SECURITY FEATURES

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Refresh token rotation
✅ Token expiry (15 min access, 7 day refresh)
✅ CORS protection
✅ Input validation
✅ Error messages don't leak info

---

## 📞 TROUBLESHOOTING

### Q: Getting "Failed to fetch" error
**A:** Backend is not running. Check Terminal 1 output and restart with `npm run dev`

### Q: Getting "Cannot connect to MySQL"
**A:** MySQL is not running. Start MySQL service and verify credentials in `.env`

### Q: Getting 401 "Invalid email or password"
**A:** Credentials are wrong. Use the test accounts provided above

### Q: Port 5000 already in use
**A:** Another app is using it. Either kill the process or change PORT in `.env`

### Q: CORS error in browser console
**A:** Frontend URL doesn't match CORS setting. Make sure `CORS_ORIGIN=http://localhost:5173` in `.env`

---

## ✅ SUCCESS CRITERIA

You'll know everything works when:

1. ✅ Backend terminal shows "Server running on port 5000"
2. ✅ Frontend terminal shows "Local: http://localhost:5173"
3. ✅ Browser can access http://localhost:5173
4. ✅ Can login with test credentials
5. ✅ No "Failed to fetch" error
6. ✅ Redirected to homepage after login

---

**START WITH STEP 1 AND FOLLOW EACH STEP IN ORDER!**

**Good luck! 🚀**
