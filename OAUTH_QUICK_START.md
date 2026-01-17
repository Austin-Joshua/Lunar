# 🚀 OAuth Quick Start Guide

Get your Lunar app with Google & Apple login running in 5 minutes!

---

## 📋 Quick Overview

Your app now supports:
- ✅ Email/Password login
- ✅ Google OAuth (one-click)
- ✅ Apple OAuth (one-click)

Database maintains 5 account types:
1. Email/Password only
2. Google OAuth only
3. Apple OAuth only
4. Email + Google linked
5. Email + Apple linked

---

## ⚡ 5-Minute Setup

### Step 1: Add Database Columns (1 min)

```sql
ALTER TABLE users 
ADD COLUMN oauth_provider VARCHAR(50),
ADD COLUMN oauth_id VARCHAR(255),
ADD COLUMN profile_image VARCHAR(500),
ADD UNIQUE KEY unique_oauth_id (oauth_provider, oauth_id);

ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL;
```

### Step 2: Create Environment Files (2 min)

**Backend/.env**
```bash
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=lunar_db

JWT_SECRET=your_32_char_secret_min
JWT_EXPIRE=7d

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/oauth/google/callback

APPLE_TEAM_ID=XXXXXXXXXX
APPLE_KEY_ID=XXXXXXXXXX
APPLE_BUNDLE_ID=com.lunar.app
APPLE_KEY_PATH=./keys/AuthKey_*.p8
APPLE_CALLBACK_URL=http://localhost:5000/api/auth/oauth/apple/callback
```

**Frontend/.env**
```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
VITE_APPLE_CLIENT_ID=com.lunar.web
VITE_APPLE_TEAM_ID=XXXXXXXXXX
VITE_APPLE_KEY_ID=XXXXXXXXXX
```

### Step 3: Get Google Credentials (2 min)

1. Go to https://console.cloud.google.com/
2. Create project "Lunar"
3. Enable Google+ API
4. Create OAuth credentials
5. Copy Client ID & Secret to .env

### Step 4: Run It! (1 min)

```bash
# Terminal 1: Backend
cd Backend
npm run dev

# Terminal 2: Frontend
cd Frontend
npm run dev

# Visit http://localhost:5173/login
```

---

## 🎯 What You Get

### Login Page Now Has:
```
┌─────────────────────────────┐
│   LUNAR                     │
│   Welcome back              │
├─────────────────────────────┤
│ Email    [________________] │
│ Password [________________] │
│ [Sign In Button]            │
│ [Try Demo Account]          │
├─────────────────────────────┤
│   or continue with          │
│ [Google Sign-In Button]     │
│ [Apple Sign-In Button]      │
├─────────────────────────────┤
│ Don't have account?         │
│ Create one                  │
└─────────────────────────────┘
```

### Backend Has 3 New Endpoints:
```
POST /api/auth/oauth/google/callback   → Handle Google login
POST /api/auth/oauth/apple/callback    → Handle Apple login  
POST /api/auth/oauth/link-social       → Link OAuth to account
```

### Database Users Table Now Tracks:
```
✓ oauth_provider (google, apple, NULL)
✓ oauth_id (provider's unique ID)
✓ profile_image (from provider)
```

---

## 📊 Account Types at a Glance

| Type | Password | OAuth | Profile Pic | Login Methods |
|------|----------|-------|-------------|---|
| Email Only | ✅ | ❌ | ❌ | Email + Password |
| Google Only | ❌ | ✅ | ✅ | Google |
| Apple Only | ❌ | ✅ | ❌ | Apple |
| Email + Google | ✅ | ✅ | ✅ | Email or Google |
| Email + Apple | ✅ | ✅ | ❌ | Email or Apple |

---

## 🔄 User Journey

### New User - Google OAuth
```
User clicks "Sign in with Google"
        ↓
Selects Google account
        ↓
Backend checks: User exists?
        ├─ YES → Link OAuth
        └─ NO → Create account
        ↓
Generate JWT token
        ↓
User logged in + redirected to home
        ↓
Shows Google profile picture
```

### Existing User - Add Google Later
```
User logged in with email/password
        ↓
Goes to Settings
        ↓
Clicks "Link Google"
        ↓
Authenticates with Google
        ↓
Database updated with OAuth data
        ↓
Now can login with either method
```

---

## 🔐 Security Features Included

✅ Passwords hashed (bcryptjs 10 rounds)
✅ JWT tokens with 7-day expiration
✅ CORS configured for frontend
✅ Auto-generated passwords for OAuth users
✅ SQL injection protection (prepared statements)
✅ Unique email & OAuth constraints
✅ Authorization header validation
✅ 401 errors trigger logout

---

## 📱 What Each Provider Provides

### Google
```javascript
{
  id: "118234567890...",
  email: "user@gmail.com",
  name: "John Doe",
  picture: "https://lh3.googleusercontent.com/...",  // ✅ Included
  verified_email: true
}
```

### Apple
```javascript
{
  sub: "001234567890...",
  email: "user@icloud.com",
  name: "Jane Doe",  // May be hidden
  picture: null      // ❌ Not provided
}
```

---

## 🗄️ Database Changes Summary

```sql
-- NEW COLUMNS
ALTER TABLE users 
ADD oauth_provider VARCHAR(50),      -- 'google', 'apple', NULL
ADD oauth_id VARCHAR(255),           -- Provider's ID
ADD profile_image VARCHAR(500);      -- Picture URL

-- NEW INDEX
ADD UNIQUE KEY unique_oauth_id (oauth_provider, oauth_id);

-- PASSWORD NOW OPTIONAL
MODIFY password VARCHAR(255) NULL;
```

**Result:** Users table now supports all 5 account types!

---

## 🧪 Quick Test

```bash
# Test Email/Password
- Go to Login page
- Register with email/password
- Login works ✅

# Test Google OAuth
- Go to Login page
- Click "Sign in with Google"
- Select Google account
- Auto login works ✅
- Profile picture shows ✅

# Test Apple OAuth (macOS/iOS)
- Go to Login page
- Click "Sign in with Apple"
- Authenticate with Face/Touch ID
- Auto login works ✅
```

---

## 📚 Full Documentation

For detailed setup:
- **Complete Database Schema:** `DATABASE_STRUCTURE.md`
- **Detailed Setup Guide:** `OAUTH_IMPLEMENTATION_GUIDE.md`
- **Account Types:** `OAUTH_ACCOUNTS_SUMMARY.md`
- **Full Details:** `OAUTH_COMPLETE.md`

---

## ⚠️ Important Notes

### For Production:
- [ ] Change `JWT_SECRET` to a strong 32+ char string
- [ ] Use production Google & Apple credentials
- [ ] Set `CORS_ORIGIN` to your domain
- [ ] Use production database credentials
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`

### For Apple OAuth:
- [ ] Requires Apple Developer Program ($99/year)
- [ ] Only works on Apple devices/browsers in production
- [ ] Need private key file (AuthKey_*.p8)

### For Testing:
- [ ] Can use localhost with Google OAuth
- [ ] Apple OAuth needs special test setup
- [ ] Use test Google account
- [ ] Create test Apple ID

---

## 🚨 If Something Doesn't Work

### Google button not showing?
```
1. Check VITE_GOOGLE_CLIENT_ID in Frontend/.env
2. Verify Google SDK loaded: F12 → Console → type window.google
3. Check browser console for errors
```

### OAuth fails with "Invalid client"?
```
1. Verify Client ID matches Google project
2. Add http://localhost:5173 to Authorized Origins
3. Clear browser cache
4. Restart dev server
```

### Users not created?
```
1. Check database columns added (oauth_provider, oauth_id)
2. Verify JWT token generated
3. Check Backend/server.js has oauth routes
4. Check Frontend login component loads OAuth SDKs
```

---

## 📈 Next Steps

1. **Get Credentials:**
   - [ ] Google OAuth credentials
   - [ ] Apple OAuth credentials (if needed)

2. **Setup Environment:**
   - [ ] Create Backend/.env
   - [ ] Create Frontend/.env

3. **Database:**
   - [ ] Run SQL migration

4. **Test:**
   - [ ] Test email/password login
   - [ ] Test Google OAuth
   - [ ] Test Apple OAuth (on Apple device)

5. **Deploy:**
   - [ ] Update production credentials
   - [ ] Set production domains
   - [ ] Deploy backend
   - [ ] Deploy frontend

---

## 💡 Pro Tips

### Tip 1: Test Without OAuth
Use the "Try Demo Account" button to test app without OAuth setup first.

### Tip 2: Quick Credentials for Testing
- Create test Google account
- Use localhost for redirect URL
- No Apple testing without Developer Program

### Tip 3: Link Accounts Feature
Users can link email + Google/Apple for flexibility.

### Tip 4: Profile Pictures
Only Google provides profile pictures. Use default avatar for Apple users.

### Tip 5: Password Reset
OAuth users can't reset password (password auto-generated). Consider allowing "Set Password" for added security.

---

## 📞 Support

**Issues?** Check:
1. OAUTH_COMPLETE.md - Troubleshooting section
2. OAUTH_IMPLEMENTATION_GUIDE.md - Detailed setup
3. DATABASE_STRUCTURE.md - Schema details
4. Browser console for JavaScript errors
5. Backend logs for server errors

---

**Ready to go!** 🚀

Your Lunar app now has modern, secure OAuth authentication! 

👉 Start with Step 1 above and you'll be live in 5 minutes.

Happy coding! 💻
