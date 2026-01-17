# 🔧 "FAILED TO FETCH" ERROR - QUICK FIX

## ⚠️ THE PROBLEM

```
Error: "Failed to fetch"
This means: The frontend (React app) is trying to connect to the backend API
but the backend server is NOT RUNNING or NOT ACCESSIBLE.
```

---

## ✅ THE SOLUTION

### Step 1: Start the Backend Server

```bash
# Navigate to Backend folder
cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend

# Run the backend server
npm run dev
```

**Expected output:**
```
> lunar-backend@1.0.0 dev
> nodemon server.js

[nodemon] running with ts-node
[nodemon] watching directory "."
[nodemon] watching extension: js,json
Server running on port 5000 ✓
```

### Step 2: Verify Backend is Running

Open a new terminal and test:

```bash
# Test the backend is accessible
curl http://localhost:5000/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"test\"}"
```

**If you see a response (even an error), backend is working!** ✅

### Step 3: Keep Frontend Running

Make sure your frontend is ALSO running in another terminal:

```bash
cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
npm run dev
```

---

## 🎯 WHAT'S HAPPENING

### Frontend Setup ✅
```
Frontend: http://localhost:5173 ✅ Running
   ├─ Tries to call: http://localhost:5000/api/register
   └─ Waiting for backend...
```

### Backend Setup ❌ (Currently Missing)
```
Backend: http://localhost:5000 ❌ NOT RUNNING
   ├─ Port 5000: Empty
   ├─ API endpoints: Not accessible
   └─ Result: "Failed to fetch"
```

---

## 🚀 QUICK CHECKLIST

- [ ] Backend server is running on port 5000?
- [ ] Frontend server is running on port 5173?
- [ ] Both are running in separate terminals?
- [ ] Frontend .env has: `VITE_API_BASE_URL=http://localhost:5000/api`?
- [ ] Backend .env has valid database credentials?

---

## 📊 VERIFY BOTH SERVERS

### Terminal 1: Backend
```bash
cd Backend
npm run dev
# Should show: Server running on port 5000
```

### Terminal 2: Frontend
```bash
cd Frontend
npm run dev -- --force
# Should show: Local: http://localhost:5173
```

### Terminal 3: Test API
```bash
# Test if backend is responding
curl http://localhost:5000/api/auth/profile
# Should return: 401 Unauthorized (or error) = Backend working!
# Should NOT return: Failed to fetch = Backend NOT running
```

---

## ✅ IF THIS FIXES IT

1. Go to http://localhost:5173/register
2. Try registering
3. Should see either:
   - ✅ Success → Account created, logged in
   - ✅ Error message → Backend is responding (error is good, it means connection works)
   - ❌ "Failed to fetch" → Backend still not running

---

## 💡 COMMON REASONS FOR "FAILED TO FETCH"

1. **Backend not running** ← Most common!
2. **Wrong port** (check .env)
3. **Network issue** (check firewall)
4. **Backend crashed** (check terminal output)
5. **Database connection failed** (check MySQL)

---

## 🎯 QUICK STEPS

1. **Kill any existing processes:**
   ```bash
   # Close all terminals with npm processes
   # OR use Ctrl+C in each terminal
   ```

2. **Start fresh:**
   ```bash
   # Terminal 1: Backend
   cd C:\Users\austi\OneDrive\Desktop\Lunar\Backend
   npm run dev

   # Terminal 2: Frontend
   cd C:\Users\austi\OneDrive\Desktop\Lunar\Frontend
   npm run dev -- --force
   ```

3. **Test:**
   - Go to http://localhost:5173/register
   - Try creating account
   - Check console for errors

---

## 📞 IF STILL NOT WORKING

Check these:

1. **Is MySQL running?**
   ```bash
   # MySQL should be running
   # Check if database credentials in .env are correct
   ```

2. **Are ports available?**
   ```powershell
   # Check if port 5000 is in use
   netstat -ano | findstr :5000
   
   # Check if port 5173 is in use
   netstat -ano | findstr :5173
   ```

3. **Check environment variables:**
   - Backend `.env` exists?
   - Frontend `.env` exists?
   - Database credentials correct?

---

## ✨ SUMMARY

**"Failed to fetch" = Backend not running**

**Solution: Start backend with `npm run dev` in Backend folder!**

That's it! 🎉

