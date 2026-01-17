# 🗄️ LUNAR DATABASE STRUCTURE

Complete database schema documentation for the Lunar e-commerce platform.

---

## 📊 DATABASE OVERVIEW

**Database Name:** `lunar_db`
**Type:** MySQL 8.0+
**Tables:** 5 core tables
**Total Records Supported:** Millions with proper indexing

---

## 📋 CORE TABLES

### 1️⃣ USERS TABLE

**Purpose:** Store user accounts (customers and admins)

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255),                    -- NULL for OAuth users
  role ENUM('user', 'admin') DEFAULT 'user',
  oauth_provider VARCHAR(50),               -- NEW: 'google', 'apple', or NULL
  oauth_id VARCHAR(255),                    -- NEW: OAuth provider's user ID
  profile_image VARCHAR(500),               -- NEW: Profile picture URL
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes for performance
  UNIQUE KEY unique_email (email),
  UNIQUE KEY unique_oauth_id (oauth_provider, oauth_id),
  INDEX idx_role (role),
  INDEX idx_oauth_provider (oauth_provider),
  INDEX idx_created_at (created_at)
);
```

**Fields Explained:**

| Field | Type | Purpose |
|-------|------|---------|
| `id` | INT | Unique identifier (auto-incremented) |
| `name` | VARCHAR(100) | User's display name |
| `email` | VARCHAR(100) | Email address (unique) |
| `password` | VARCHAR(255) | Hashed password (NULL for OAuth) |
| `role` | ENUM | 'user' (customer) or 'admin' |
| `oauth_provider` | VARCHAR(50) | 'google', 'apple', or NULL |
| `oauth_id` | VARCHAR(255) | Provider's unique ID |
| `profile_image` | VARCHAR(500) | Profile picture URL from provider |
| `is_active` | BOOLEAN | Account active status |
| `created_at` | TIMESTAMP | Account creation time |
| `updated_at` | TIMESTAMP | Last update time |

**Sample Data:**

```sql
-- Regular user (email/password)
INSERT INTO users (name, email, password, role)
VALUES ('John Doe', 'john@example.com', '$2a$10$...', 'user');

-- Google OAuth user
INSERT INTO users (name, email, oauth_provider, oauth_id, profile_image)
VALUES ('Jane Doe', 'jane@example.com', 'google', '118...',
        'https://lh3.googleusercontent.com/...');

-- Apple OAuth user
INSERT INTO users (name, email, oauth_provider, oauth_id)
VALUES ('Bob Smith', 'bob@example.com', 'apple', '001...');

-- Admin user
INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@lunar.com', '$2a$10$...', 'admin');
```

**Accounts Maintained:**
- ✅ Email/Password accounts
- ✅ Google OAuth accounts
- ✅ Apple OAuth accounts
- ✅ Linked accounts (email + OAuth)

---

### 2️⃣ CATEGORIES TABLE

**Purpose:** Store product categories organized by gender

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  gender ENUM('men', 'women', 'kids') NOT NULL,
  description TEXT,
  icon VARCHAR(50),                    -- Category icon emoji or name
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Unique combination of name and gender
  UNIQUE KEY unique_category (name, gender),
  INDEX idx_gender (gender),
  INDEX idx_created_at (created_at)
);
```

**Sample Data:**

```sql
-- Men's categories
INSERT INTO categories (name, gender, icon) VALUES
('Shirts', 'men', '👔'),
('Pants', 'men', '👖'),
('Footwear', 'men', '👟'),
('Accessories', 'men', '⌚');

-- Women's categories
INSERT INTO categories (name, gender, icon) VALUES
('Tops', 'women', '👚'),
('Pants', 'women', '👖'),
('Skirts', 'women', '👗'),
('Footwear', 'women', '👠');

-- Kids' categories
INSERT INTO categories (name, gender, icon) VALUES
('Boys', 'kids', '👦'),
('Girls', 'kids', '👧'),
('Footwear', 'kids', '👟');
```

---

### 3️⃣ PRODUCTS TABLE

**Purpose:** Store all product information

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
  colors JSON,                         -- ["Red", "Blue", "Black"]
  sizes JSON,                          -- ["S", "M", "L", "XL"]
  is_active BOOLEAN DEFAULT true,
  ratings DECIMAL(3, 2),
  review_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Relationships and indexes
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_gender (gender),
  INDEX idx_category_id (category_id),
  INDEX idx_price (price),
  INDEX idx_is_active (is_active),
  INDEX idx_brand (brand),
  FULLTEXT INDEX ft_search (name, brand, description)
);
```

**Sample Data:**

```sql
INSERT INTO products (name, brand, description, gender, category_id, price, stock, image_url)
VALUES (
  'Premium Blue Shirt',
  'Nike',
  'High-quality cotton shirt perfect for everyday wear',
  'men',
  1,
  49.99,
  50,
  'https://example.com/shirt.jpg'
);
```

---

### 4️⃣ ORDERS TABLE

**Purpose:** Store customer orders

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address JSON,               -- {"street": "...", "city": "..."}
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Relationships and indexes
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**Sample Data:**

```sql
INSERT INTO orders (user_id, total_price, status, shipping_address)
VALUES (
  1,
  149.97,
  'pending',
  JSON_OBJECT(
    'street', '123 Main St',
    'city', 'New York',
    'state', 'NY',
    'zip', '10001'
  )
);
```

---

### 5️⃣ ORDER_ITEMS TABLE

**Purpose:** Store individual items within orders

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
  
  -- Relationships and indexes
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
);
```

**Sample Data:**

```sql
INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
VALUES (1, 1, 2, 49.99, 'M', 'Blue');
```

---

## 🔐 AUTHENTICATION ACCOUNTS MAINTAINED

### 1. Email/Password Accounts
```
users.email       - User's email (unique)
users.password    - Hashed with bcryptjs
users.oauth_provider - NULL
users.oauth_id    - NULL
```

**Flow:**
1. User registers with email/password
2. Password hashed with bcryptjs (10 salt rounds)
3. Account created in users table
4. User can login with email + password

### 2. Google OAuth Accounts
```
users.oauth_provider - 'google'
users.oauth_id       - Google's user ID (118...)
users.profile_image  - Google profile picture
users.password       - Auto-generated random string
```

**Flow:**
1. User clicks "Login with Google"
2. Google redirects with ID + email + name
3. Check if user exists by email
4. If new: create account
5. If exists: link Google account
6. Generate JWT token
7. Return user data

### 3. Apple OAuth Accounts
```
users.oauth_provider - 'apple'
users.oauth_id       - Apple's user ID
users.profile_image  - NULL (Apple doesn't provide)
users.password       - Auto-generated random string
```

**Flow:**
1. User clicks "Login with Apple"
2. Apple redirects with ID + email + name
3. Check if user exists
4. Create or link account
5. Generate JWT token
6. Return user data

### 4. Linked Accounts
```
-- User with email/password can link Google
UPDATE users SET oauth_provider = 'google', oauth_id = '118...'
WHERE email = 'existing@example.com';

-- Now user can login with both methods
```

---

## 📊 RELATIONSHIPS DIAGRAM

```
users (1) ──→ (many) orders
             ├─ user_id (FK)
             └─ role: admin/user

categories (1) ──→ (many) products
               ├─ category_id (FK)
               └─ gender: men/women/kids

products (1) ──→ (many) order_items
             └─ product_id (FK)

orders (1) ──→ (many) order_items
           └─ order_id (FK)
```

---

## 🔍 INDEXING STRATEGY

| Table | Index | Reason |
|-------|-------|--------|
| users | email | Fast login lookups |
| users | oauth_provider, oauth_id | OAuth provider matching |
| users | role | Admin filtering |
| categories | gender | Category filtering by gender |
| products | category_id | Product filtering |
| products | price | Price range queries |
| products | gender | Gender filtering |
| products | ft_search | Full-text search |
| orders | user_id | User's orders |
| orders | status | Status filtering |
| orders | created_at | Recent orders |
| order_items | order_id | Items per order |

---

## 📈 QUERY EXAMPLES

### Get user by email (login)
```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

### Get user by OAuth provider
```sql
SELECT * FROM users 
WHERE oauth_provider = 'google' AND oauth_id = '118...';
```

### Get all products by gender
```sql
SELECT p.* FROM products p
WHERE p.gender = 'men' AND p.is_active = true
ORDER BY p.created_at DESC;
```

### Get products by category
```sql
SELECT p.* FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.name = 'Shirts' AND p.gender = 'men'
ORDER BY p.price ASC;
```

### Get user's orders
```sql
SELECT o.* FROM orders o
WHERE o.user_id = 1
ORDER BY o.created_at DESC;
```

### Get order details with items
```sql
SELECT 
  o.id, o.total_price, o.status,
  oi.quantity, oi.price, p.name, p.image_url
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.id = 1;
```

### Search products
```sql
SELECT * FROM products
WHERE MATCH(name, brand, description) 
AGAINST('nike shirt' IN NATURAL LANGUAGE MODE)
AND is_active = true;
```

---

## 🛡️ DATA INTEGRITY

### Constraints
- ✅ User email is unique (prevent duplicates)
- ✅ OAuth provider + ID is unique
- ✅ Category name + gender is unique
- ✅ Foreign keys ensure referential integrity
- ✅ ON DELETE CASCADE cleans up orders when user deleted

### Validation (Application Level)
- ✅ Price > 0
- ✅ Stock >= 0
- ✅ Order total matches line items
- ✅ Email format validation
- ✅ Password hashing with bcryptjs

---

## 📊 PERFORMANCE OPTIMIZATION

### Connection Pooling
- Pool size: 10 connections
- Max queue: unlimited
- Connection timeout: automatic reuse

### Query Optimization
- Full-text search on products
- Proper indexes on foreign keys
- EXPLAIN plans for complex queries

### Expected Performance
- User lookup: < 1ms
- Product list (10 items): < 10ms
- Order history: < 50ms
- Complex joins: < 100ms

---

## 🔄 MIGRATION: Adding OAuth Support

**Run this SQL to add OAuth columns to existing users table:**

```sql
ALTER TABLE users 
ADD COLUMN oauth_provider VARCHAR(50),
ADD COLUMN oauth_id VARCHAR(255),
ADD COLUMN profile_image VARCHAR(500),
ADD UNIQUE KEY unique_oauth_id (oauth_provider, oauth_id);

-- Make password nullable for OAuth users
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL;
```

---

## 📝 ACCOUNT TYPES SUMMARY

| Account Type | Password | OAuth Provider | Profile Image | Can Login With |
|--------------|----------|-----------------|--|---|
| Email/Password | ✅ Hashed | None | ❌ | Email + Password |
| Google OAuth | 🔄 Auto-generated | google | ✅ From Google | Google Account |
| Apple OAuth | 🔄 Auto-generated | apple | ❌ | Apple Account |
| Linked (Email + Google) | ✅ Hashed | google | ✅ From Google | Email or Google |
| Linked (Email + Apple) | ✅ Hashed | apple | ❌ | Email or Apple |

---

## 🚀 SCALING CONSIDERATIONS

| Size | Users | Products | Orders | Recommendations |
|------|-------|----------|--------|-----------------|
| Small | 1K | 100 | 1K | Current setup OK |
| Medium | 100K | 10K | 100K | Add read replicas |
| Large | 1M+ | 100K+ | 1M+ | Sharding needed |

---

**Database Status: ✅ Production Ready**

**Last Updated:** January 2026
**Version:** 1.0 (with OAuth support)
