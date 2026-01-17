# 🔐 OAuth Implementation Guide - Lunar

Complete guide for implementing Google and Apple OAuth authentication.

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Database Structure](#database-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Google OAuth Setup](#google-oauth-setup)
6. [Apple OAuth Setup](#apple-oauth-setup)
7. [Environment Variables](#environment-variables)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 OVERVIEW

The Lunar app now supports three authentication methods:

1. **Email/Password** - Traditional registration and login
2. **Google OAuth** - Sign in with Google account
3. **Apple OAuth** - Sign in with Apple ID

Each method creates/updates user records in the same `users` table with OAuth-specific fields.

---

## 🗄️ DATABASE STRUCTURE

### Users Table - OAuth Support

```sql
ALTER TABLE users 
ADD COLUMN oauth_provider VARCHAR(50),        -- 'google', 'apple', or NULL
ADD COLUMN oauth_id VARCHAR(255),             -- Provider's unique ID
ADD COLUMN profile_image VARCHAR(500),        -- Profile picture URL
ADD UNIQUE KEY unique_oauth_id (oauth_provider, oauth_id);

-- Make password nullable for OAuth users
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL;
```

### Account Types Maintained

| Account Type | Password | OAuth Provider | Profile Image | Login Methods |
|---|---|---|---|---|
| Email/Password | ✅ | NULL | ❌ | Email + Password |
| Google Only | 🔄 Auto | google | ✅ Yes | Google |
| Apple Only | 🔄 Auto | apple | ❌ No | Apple |
| Linked (Email + Google) | ✅ | google | ✅ Yes | Email or Google |
| Linked (Email + Apple) | ✅ | apple | ❌ No | Email or Apple |

**Note:** When a user authenticates via OAuth:
- If no account exists, one is created automatically
- If an account with that email exists, OAuth data is linked
- Password is auto-generated for OAuth users (they can't change it)

---

## 🔧 BACKEND SETUP

### 1. Install Dependencies

```bash
cd Backend
npm install jsonwebtoken bcryptjs dotenv cors express
```

### 2. New Files Created

```
Backend/
├── config/
│   └── oauth.config.js              # OAuth configuration
├── controllers/
│   └── oauth.controller.js          # OAuth authentication logic
├── routes/
│   └── oauth.routes.js              # OAuth endpoints
└── models/
    └── user.model.js                # Updated with OAuth support
```

### 3. OAuth Controller Functions

**File:** `Backend/controllers/oauth.controller.js`

```javascript
// Google OAuth callback
POST /api/auth/oauth/google/callback
Body: {
  id: "118...",                    // Google user ID
  email: "user@gmail.com",
  name: "John Doe",
  picture: "https://..."           // Profile picture URL
}
Response: {
  token: "JWT_TOKEN",
  user: {
    id: 1,
    email: "user@gmail.com",
    name: "John Doe",
    role: "user",
    profileImage: "https://..."
  }
}

// Apple OAuth callback
POST /api/auth/oauth/apple/callback
Body: {
  sub: "001...",                   // Apple user ID
  email: "user@icloud.com",
  name: "Jane Doe",
  picture: null                    // Apple doesn't provide
}

// Link social account to existing user
POST /api/auth/oauth/link-social
Headers: Authorization: Bearer JWT_TOKEN
Body: {
  provider: "google" | "apple",
  id: "provider_id",
  picture: "https://..."          // Optional
}
```

### 4. Update Server Routes

**File:** `Backend/server.js`

```javascript
const oauthRoutes = require('./routes/oauth.routes');

// Add to routes section
app.use('/api/auth/oauth', oauthRoutes);
```

### 5. OAuth Configuration

**File:** `Backend/config/oauth.config.js`

Validates that OAuth credentials are present in environment variables.

---

## 🎨 FRONTEND SETUP

### 1. Install Dependencies

```bash
cd Frontend
npm install axios react-router-dom
```

### 2. New Files Created

```
Frontend/
└── src/
    ├── services/
    │   └── oauth.ts              # OAuth service functions
    ├── pages/
    │   └── Login.tsx             # Updated with OAuth buttons
    └── vite-env.d.ts             # Updated with OAuth types
```

### 3. OAuth Service Functions

**File:** `Frontend/src/services/oauth.ts`

```typescript
// Login with Google
loginWithGoogle(googleAuthData): Promise<OAuthLoginResponse>

// Login with Apple
loginWithApple(appleAuthData): Promise<OAuthLoginResponse>

// Link social account
linkSocialAccount(provider, id, picture): Promise<{message}>
```

### 4. Login Component Updates

**File:** `Frontend/src/pages/Login.tsx`

- Loads Google OAuth SDK on mount
- Renders Google Sign-In button
- Adds Apple Sign-In button
- Handles OAuth responses and logs user in

---

## 🔵 GOOGLE OAUTH SETUP

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "Lunar"
3. Enable Google+ API

### Step 2: Create OAuth Credentials

1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Choose **Web application**
3. Add Authorized Redirect URIs:
   - `http://localhost:5000/api/auth/oauth/google/callback` (Dev)
   - `http://localhost:5173` (Frontend Dev)
   - `https://lunar.com` (Production)

4. **Copy Client ID** and **Client Secret**

### Step 3: Environment Variables

```bash
# Backend .env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/oauth/google/callback

# Frontend .env
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
```

### Step 4: Frontend Implementation

The Google Sign-In button is automatically rendered in the Login component using:

```html
<div id="google-signin-btn" />
```

Google's SDK renders the button and handles the OAuth flow.

---

## 🍎 APPLE OAUTH SETUP

### Step 1: Apple Developer Account

1. Go to [Apple Developer](https://developer.apple.com/)
2. Enroll in Apple Developer Program ($99/year)

### Step 2: Create App ID

1. Go to **Certificates, Identifiers & Profiles**
2. Create new App ID: `com.lunar.app`
3. Enable **Sign in with Apple** capability

### Step 3: Create Service ID

1. Create new Service ID: `com.lunar.web`
2. Configure Web Domain and Return URLs:
   - Domain: `localhost` (Dev) or `lunar.com` (Prod)
   - Return URL: `http://localhost:5000/api/auth/oauth/apple/callback`

### Step 4: Create Private Key

1. Go to **Keys**
2. Create new key with **Sign in with Apple** enabled
3. Download `AuthKey_*.p8` file
4. Save to: `Backend/keys/AuthKey_*.p8`

### Step 5: Environment Variables

```bash
# Backend .env
APPLE_TEAM_ID=XXXXXXXXXX          # Your Team ID
APPLE_KEY_ID=XXXXXXXXXX           # From key filename
APPLE_BUNDLE_ID=com.lunar.app
APPLE_KEY_PATH=./keys/AuthKey_*.p8
APPLE_CALLBACK_URL=http://localhost:5000/api/auth/oauth/apple/callback

# Frontend .env
VITE_APPLE_CLIENT_ID=com.lunar.web
VITE_APPLE_TEAM_ID=XXXXXXXXXX
VITE_APPLE_KEY_ID=XXXXXXXXXX
```

---

## 🌍 ENVIRONMENT VARIABLES

### Backend (.env)

```bash
# ============ SERVER ============
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# ============ DATABASE ============
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=lunar_db

# ============ JWT ============
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRE=7d

# ============ GOOGLE OAUTH ============
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/oauth/google/callback

# ============ APPLE OAUTH ============
APPLE_TEAM_ID=XXXXXXXXXX
APPLE_KEY_ID=XXXXXXXXXX
APPLE_BUNDLE_ID=com.lunar.app
APPLE_KEY_PATH=./keys/AuthKey_*.p8
APPLE_CALLBACK_URL=http://localhost:5000/api/auth/oauth/apple/callback
```

### Frontend (.env)

```bash
# ============ API ============
VITE_API_BASE_URL=http://localhost:5000/api

# ============ GOOGLE OAUTH ============
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com

# ============ APPLE OAUTH ============
VITE_APPLE_CLIENT_ID=com.lunar.web
VITE_APPLE_TEAM_ID=XXXXXXXXXX
VITE_APPLE_KEY_ID=XXXXXXXXXX
```

---

## 🧪 TESTING OAUTH

### Test Google OAuth

1. Start backend: `npm run dev`
2. Start frontend: `npm run dev`
3. Go to `http://localhost:5173/login`
4. Click "Sign in with Google"
5. Select a Google account
6. Should redirect to home page and show logged-in state

### Test Apple OAuth

1. Must be on Apple device (iPhone, iPad, Mac)
2. Or use Apple's web development environment
3. Click "Sign in with Apple"
4. Authenticate with Apple ID
5. Should redirect to home page

### Test Account Linking

1. Create account with email/password
2. Login
3. Go to Settings/Profile page (future feature)
4. Click "Link Google" or "Link Apple"
5. Authenticate with provider
6. Next time, can login with either method

---

## 🔍 ENDPOINTS REFERENCE

### Authentication

```bash
# Traditional Auth
POST /api/auth/register
POST /api/auth/login

# OAuth
POST /api/auth/oauth/google/callback      # Google signup/login
POST /api/auth/oauth/apple/callback       # Apple signup/login
POST /api/auth/oauth/link-social          # Link OAuth to existing account (requires JWT)
```

### Example Requests

```bash
# Google OAuth
curl -X POST http://localhost:5000/api/auth/oauth/google/callback \
  -H "Content-Type: application/json" \
  -d '{
    "id": "118...",
    "email": "user@gmail.com",
    "name": "John Doe",
    "picture": "https://..."
  }'

# Apple OAuth
curl -X POST http://localhost:5000/api/auth/oauth/apple/callback \
  -H "Content-Type: application/json" \
  -d '{
    "sub": "001...",
    "email": "user@icloud.com",
    "name": "Jane Doe"
  }'

# Link Account
curl -X POST http://localhost:5000/api/auth/oauth/link-social \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JWT_TOKEN" \
  -d '{
    "provider": "google",
    "id": "118...",
    "picture": "https://..."
  }'
```

---

## 🐛 TROUBLESHOOTING

### Issue: Google button not showing

**Solution:**
- Check `VITE_GOOGLE_CLIENT_ID` is set
- Check Google SDK loaded: `window.google` exists
- Check browser console for errors

### Issue: "Invalid client ID" error

**Solution:**
- Verify Client ID matches your Google project
- Add `http://localhost:5173` to Authorized Origins
- Clear browser cache

### Issue: Apple authentication fails

**Solution:**
- Ensure `AuthKey_*.p8` file exists and path is correct
- Check Team ID, Key ID, Bundle ID match Apple Developer account
- Apple OAuth only works on Apple devices in production

### Issue: User created but not logged in

**Solution:**
- Check JWT token is valid
- Verify token stored in localStorage
- Check AuthContext is retrieving token correctly

### Issue: Profile image not showing

**Solution:**
- Google OAuth: Image URL included automatically
- Apple OAuth: Apple doesn't provide images; use default avatar
- Store in `users.profile_image` column

---

## 📊 USER FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    User Authentication Flow                  │
└─────────────────────────────────────────────────────────────┘

Email/Password:
┌─────────┐      ┌──────────┐      ┌─────────────┐
│ Register│ ───> │  Hash    │ ───> │  Create     │
│ Screen  │      │ Password │      │  User Row   │
└─────────┘      └──────────┘      └─────────────┘

Google OAuth:
┌──────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────┐
│ Google   │ ──> │ Get ID Token│ ──> │ POST to      │ ──> │ Create/  │
│ Sign-In  │     │ (implicit)  │     │ /google/cb   │     │ Link User│
└──────────┘     └─────────────┘     └──────────────┘     └──────────┘

Apple OAuth:
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────┐
│  Apple  │ ──> │ Get ID Token│ ──> │ POST to      │ ──> │ Create/  │
│ Sign-In │     │  (explicit) │     │ /apple/cb    │     │ Link User│
└─────────┘     └─────────────┘     └──────────────┘     └──────────┘

All paths lead to:
┌──────────┐     ┌──────────────┐     ┌────────────┐
│ Generate │ ──> │  Return      │ ──> │ Store JWT  │
│  JWT     │     │  Token + User│     │ in Storage │
└──────────┘     └──────────────┘     └────────────┘
```

---

## 🔒 SECURITY BEST PRACTICES

### ✅ Implemented

- [x] Password hashing with bcryptjs
- [x] JWT token expiration (7 days)
- [x] CORS configured for frontend domain
- [x] Auto-generated passwords for OAuth users
- [x] Prepared statements for SQL queries
- [x] Authorization header validation

### 🚀 To Implement (Future)

- [ ] Refresh token rotation
- [ ] Rate limiting on login attempts
- [ ] 2FA support
- [ ] OAuth token refresh handling
- [ ] Device fingerprinting
- [ ] IP-based fraud detection

---

## 📈 SCALING CONSIDERATIONS

### User Growth Impact

| Users | Action Required |
|-------|---|
| 1K | Current setup sufficient |
| 100K | Add database indexes on oauth columns |
| 1M | Consider OAuth provider integration libraries |

### Performance Optimization

- Add index on `oauth_provider` and `oauth_id`
- Cache OAuth profile pictures locally
- Implement token caching

---

## 📚 REFERENCES

- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign-In Docs](https://developer.apple.com/sign-in-with-apple/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Status:** ✅ Implementation Complete
**Last Updated:** January 2026
**Version:** 1.0
