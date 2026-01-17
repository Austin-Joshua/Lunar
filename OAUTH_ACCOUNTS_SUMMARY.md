# 👥 OAUTH Accounts & Database Structure Summary

Quick reference for understanding all account types and the database schema.

---

## 📊 ACCOUNT TYPES MAINTAINED

### 1. **Email/Password Account** ✉️

```
Database Fields:
├── email: "user@example.com"
├── password: "$2a$10$hashedpassword..." (hashed with bcryptjs)
├── oauth_provider: NULL
├── oauth_id: NULL
└── profile_image: NULL

Login Method:
└── Email + Password

Features:
├── ✅ Can change password
├── ✅ Uses email for verification
└── ❌ No profile picture from provider
```

**Use Case:** Traditional sign-up process

---

### 2. **Google OAuth Account** 🔵

```
Database Fields:
├── email: "user@gmail.com"
├── password: "auto_generated_random_string" (never used)
├── oauth_provider: "google"
├── oauth_id: "118234567890..."
└── profile_image: "https://lh3.googleusercontent.com/..."

Login Method:
└── Google Account Only

Features:
├── ✅ Profile picture from Google
├── ✅ Auto-login if already Google signed in
├── ❌ Cannot change password (auto-generated)
└── ✅ Can link to email account later
```

**Use Case:** One-click Google login

---

### 3. **Apple OAuth Account** 🍎

```
Database Fields:
├── email: "user@icloud.com" (may be hidden)
├── password: "auto_generated_random_string" (never used)
├── oauth_provider: "apple"
├── oauth_id: "001234567890..."
├── profile_image: NULL
└── name: "Apple User" (fallback if not provided)

Login Method:
└── Apple ID Only

Features:
├── ✅ Private email forwarding support
├── ✅ Auto-login if already Apple signed in
├── ❌ No profile picture available
├── ❌ Cannot change password
└── ✅ Can link to email account later
```

**Use Case:** One-click Apple login on iOS/Mac

---

### 4. **Linked Account (Email + Google)** 🔗

```
Database Fields:
├── email: "user@example.com"
├── password: "$2a$10$hashedpassword..." (original password)
├── oauth_provider: "google" (latest linked)
├── oauth_id: "118234567890..."
└── profile_image: "https://lh3.googleusercontent.com/..."

Login Methods:
├── Email + Password
└── Google Sign-In

Features:
├── ✅ Multiple login options
├── ✅ Can change password
├── ✅ Profile picture from Google
└── ✅ Best of both worlds
```

**Creation Path:**
1. User signs up with email/password
2. Later clicks "Link Google"
3. Database is updated with OAuth data
4. Now can login with either method

---

### 5. **Linked Account (Email + Apple)** 🔗

```
Database Fields:
├── email: "user@example.com"
├── password: "$2a$10$hashedpassword..." (original password)
├── oauth_provider: "apple" (latest linked)
├── oauth_id: "001234567890..."
└── profile_image: NULL

Login Methods:
├── Email + Password
└── Apple Sign-In

Features:
├── ✅ Multiple login options
├── ✅ Can change password
├── ❌ No profile picture
└── ✅ Secure Apple ID linking
```

**Creation Path:**
1. User signs up with email/password
2. Later clicks "Link Apple"
3. Database is updated with OAuth data
4. Now can login with either method

---

## 🗄️ COMPLETE DATABASE STRUCTURE

### Users Table Schema

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255),                         -- NULL for OAuth-only users
  role ENUM('user', 'admin') DEFAULT 'user',
  oauth_provider VARCHAR(50),                    -- 'google', 'apple', NULL
  oauth_id VARCHAR(255),                         -- Provider's unique ID
  profile_image VARCHAR(500),                    -- Profile picture URL
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_email (email),
  UNIQUE KEY unique_oauth_id (oauth_provider, oauth_id),
  INDEX idx_role (role),
  INDEX idx_oauth_provider (oauth_provider),
  INDEX idx_created_at (created_at)
);
```

---

### Categories Table

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  gender ENUM('men', 'women', 'kids') NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_category (name, gender),
  INDEX idx_gender (gender)
);

-- Sample Data:
-- Men: Shirts, Pants, Footwear, Accessories
-- Women: Tops, Pants, Skirts, Footwear
-- Kids: Boys, Girls, Footwear
```

---

### Products Table

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  gender ENUM('men', 'women', 'kids') NOT NULL,
  category_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  colors JSON,                                   -- ["Red", "Blue"]
  sizes JSON,                                    -- ["S", "M", "L"]
  is_active BOOLEAN DEFAULT true,
  ratings DECIMAL(3, 2),
  review_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_gender (gender),
  INDEX idx_category_id (category_id),
  INDEX idx_price (price),
  INDEX idx_brand (brand),
  FULLTEXT INDEX ft_search (name, brand, description)
);
```

---

### Orders Table

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address JSON,                         -- Address details
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

---

### Order Items Table

```sql
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
);
```

---

## 🔄 Authentication Flow Comparison

### Email/Password Flow
```
User Form
    ↓
Enter Email + Password
    ↓
Hash password with bcryptjs
    ↓
Compare with DB
    ↓
Generate JWT
    ↓
Return token + user data
    ↓
Store in localStorage
```

### Google OAuth Flow
```
Click "Sign in with Google"
    ↓
Google OAuth popup
    ↓
User selects Google account
    ↓
Google returns ID token
    ↓
POST to /api/auth/oauth/google/callback
    ↓
Backend checks if user exists
    ↓
If exists: link Google data
If new: create account
    ↓
Generate JWT
    ↓
Return token + user data
    ↓
Store in localStorage
```

### Apple OAuth Flow
```
Click "Sign in with Apple"
    ↓
Apple Sign-in popup
    ↓
User authenticates with Face/Touch ID
    ↓
Apple returns ID token
    ↓
POST to /api/auth/oauth/apple/callback
    ↓
Backend checks if user exists
    ↓
If exists: link Apple data
If new: create account
    ↓
Generate JWT
    ↓
Return token + user data
    ↓
Store in localStorage
```

---

## 📋 Quick Reference: Account Comparison

| Feature | Email/Password | Google | Apple | Linked (Email+Google) | Linked (Email+Apple) |
|---------|---|---|---|---|---|
| Password Required | ✅ | ❌ | ❌ | ✅ | ✅ |
| Profile Picture | ❌ | ✅ | ❌ | ✅ | ❌ |
| Auto-login | ❌ | ✅ | ✅ | ✅ | ✅ |
| Change Password | ✅ | ❌ | ❌ | ✅ | ✅ |
| Multiple Login Methods | ❌ | ❌ | ❌ | ✅ | ✅ |
| 2FA Option | 🚀 | ✅ | ✅ | ✅ | ✅ |
| Email Verification | 🚀 | ✅ | ✅ | ✅ | ✅ |

Legend: ✅ = Yes, ❌ = No, 🚀 = Future feature

---

## 🌐 Database Relationships

```
users (1) ──────→ (many) orders
          ├─ user_id (FK)
          └─ role: admin/user
          ├─ oauth_provider: 'google'/'apple'/NULL
          └─ oauth_id: provider_specific_id

products (1) ──────→ (many) order_items
           ├─ product_id (FK)
           └─ gender: men/women/kids

categories (1) ──────→ (many) products
            ├─ category_id (FK)
            ├─ gender: men/women/kids
            └─ Example: Men's Shirts, Women's Tops

orders (1) ──────→ (many) order_items
        ├─ order_id (FK)
        ├─ user_id (FK)
        └─ status: pending/shipped/delivered/cancelled
```

---

## 🔐 Security Notes

### Password Security
- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ Never stored in plain text
- ✅ OAuth users get auto-generated random passwords
- ✅ Cannot authenticate with OAuth user's password

### JWT Security
- ✅ Signed with `JWT_SECRET`
- ✅ Expires in 7 days
- ✅ Stored in localStorage on frontend
- ✅ Sent with Authorization header
- ✅ 401 errors trigger logout

### OAuth Security
- ✅ OAuth tokens never stored
- ✅ Only ID tokens exchanged for JWT
- ✅ Unique constraint on (oauth_provider, oauth_id)
- ✅ Prevents duplicate OAuth accounts

---

## 📊 Sample Data Queries

### Find user by email (login)
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

### Find user by Google ID (OAuth login)
```sql
SELECT * FROM users 
WHERE oauth_provider = 'google' AND oauth_id = '118...';
```

### Get all Google-connected users
```sql
SELECT * FROM users WHERE oauth_provider = 'google';
```

### Get user with their orders
```sql
SELECT u.*, o.* FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.id = 1;
```

### Get product recommendations by gender
```sql
SELECT * FROM products 
WHERE gender = 'men' AND is_active = true 
ORDER BY ratings DESC 
LIMIT 10;
```

---

## 🚀 Future Enhancements

### To Implement Next
- [ ] Email verification on signup
- [ ] Two-factor authentication (2FA)
- [ ] OAuth token refresh handling
- [ ] Multiple OAuth accounts per user
- [ ] Social profile sync (name, picture updates)
- [ ] Forgot password flow
- [ ] Account linking UI in settings

### Advanced Features
- [ ] Single Sign-On (SSO)
- [ ] SAML support for enterprise
- [ ] LinkedIn OAuth
- [ ] GitHub OAuth (developer community)

---

## 📞 Support Resources

- **Database Setup:** See `DATABASE_STRUCTURE.md`
- **OAuth Setup:** See `OAUTH_IMPLEMENTATION_GUIDE.md`
- **API Endpoints:** See backend README
- **Frontend Integration:** See `Frontend/src/services/oauth.ts`

---

**Created:** January 2026  
**Status:** ✅ Complete  
**Version:** 1.0
