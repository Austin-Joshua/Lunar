# Lunar Backend - Complete Architecture & Implementation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
│              http://localhost:5173                               │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ HTTP/CORS
                  │ Bearer Token
                  │
┌─────────────────▼───────────────────────────────────────────────┐
│                   Express.js Server                              │
│              http://localhost:5000                               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Routes Layer                                          │    │
│  ├─ /api/auth → Auth Routes                              │    │
│  ├─ /api/products → Products Routes                      │    │
│  ├─ /api/orders → Orders Routes                          │    │
│  ├─ /api/categories → Categories Routes                  │    │
│  ├─ /api/users → Users Routes                            │    │
│  └─ /api/admin → Admin Routes                            │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Middleware Layer                                      │    │
│  ├─ auth.middleware.js (JWT Verification)                │    │
│  └─ admin.middleware.js (Role Check)                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Controllers Layer                                     │    │
│  ├─ authController (Login, Register, Profile)            │    │
│  ├─ productsController (CRUD Products)                   │    │
│  ├─ ordersController (CRUD Orders)                       │    │
│  ├─ categoriesController (CRUD Categories)               │    │
│  └─ usersController (List Users)                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Models Layer (Database Operations)                    │    │
│  ├─ User.model.js (CRUD Users)                           │    │
│  ├─ Product.model.js (CRUD Products)                     │    │
│  ├─ Order.model.js (CRUD Orders)                         │    │
│  └─ Category.model.js (CRUD Categories)                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Config Layer                                          │    │
│  └─ db.js (MySQL Connection Pool)                        │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ TCP/IP
                  │ Connection Pooling
                  │
┌─────────────────▼───────────────────────────────────────────────┐
│                        MySQL Database                            │
│                    (localhost:3306)                              │
│                                                                  │
│  ┌─────────────┐  ┌───────────────┐  ┌──────────────┐         │
│  │   users     │  │  products     │  │  categories  │         │
│  └─────────────┘  └───────────────┘  └──────────────┘         │
│                                                                  │
│  ┌─────────────┐  ┌───────────────┐                           │
│  │   orders    │  │ order_items   │                           │
│  └─────────────┘  └───────────────┘                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Request Flow

### 1. Authentication Request
```
Frontend Register/Login
    ↓
POST /api/auth/register | login
    ↓
auth.routes.js
    ↓
authController.register | login
    ↓
User.model.findByEmail | create
    ↓
MySQL Query
    ↓
bcrypt hash/compare
    ↓
JWT Sign
    ↓
Response with Token
    ↓
Frontend stores token in localStorage
```

### 2. Authenticated Request
```
Frontend with Token
    ↓
GET /api/products (Authorization: Bearer token)
    ↓
auth.middleware (verify JWT)
    ↓
adminMiddleware (if admin route)
    ↓
productsController.getByGender
    ↓
Product.model.getByGender
    ↓
MySQL Query with Prepared Statement
    ↓
Response with Data
```

### 3. Order Creation Flow
```
Frontend Create Order
    ↓
POST /api/orders with items
    ↓
auth.middleware (verify user)
    ↓
ordersController.create
    ↓
Validate items and stock
    ↓
Order.model.create
    ↓
BEGIN TRANSACTION
  ├─ INSERT into orders
  └─ INSERT into order_items (loop)
COMMIT TRANSACTION
    ↓
Response with Order Details
```

---

## 🔐 Security Flow

```
Request Headers
    ↓
Authorization: Bearer eyJhbGciOi...
    ↓
auth.middleware
    ↓
Extract token
    ↓
jwt.verify(token, JWT_SECRET)
    ↓
Token Valid?
├─ YES → req.user = decoded
└─ NO → 403 Forbidden

For Admin Routes:
    ↓
adminMiddleware
    ↓
Check req.user.role === 'admin'
    ↓
Yes? → Proceed to controller
    ↓
No? → 403 Forbidden
```

---

## 📁 Complete File Tree

```
Lunar/
├── Frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts (API calls)
│   │   ├── types/
│   │   │   └── index.ts (TypeScript types)
│   │   └── ... (React components)
│   └── ... (Frontend files)
│
└── Backend/ ✨ NEW
    ├── config/
    │   └── db.js
    │       ├── Creates MySQL connection pool
    │       ├── Handles connection errors
    │       └── Exports pool for models
    │
    ├── middleware/
    │   ├── auth.middleware.js
    │   │   ├── Verifies JWT tokens
    │   │   ├── Extracts user data
    │   │   └── Attaches user to request
    │   │
    │   └── admin.middleware.js
    │       ├── Checks user role
    │       ├── Verifies admin access
    │       └── Blocks unauthorized users
    │
    ├── models/
    │   ├── user.model.js
    │   │   ├── create(userData)
    │   │   ├── findByEmail(email)
    │   │   ├── findById(id)
    │   │   ├── getAll()
    │   │   └── verifyPassword()
    │   │
    │   ├── product.model.js
    │   │   ├── getAll()
    │   │   ├── getById(id)
    │   │   ├── getByGender(gender)
    │   │   ├── getByGenderAndCategory(gender, category)
    │   │   ├── search(query)
    │   │   ├── create(data)
    │   │   ├── update(id, updates)
    │   │   └── delete(id)
    │   │
    │   ├── order.model.js
    │   │   ├── getAll()
    │   │   ├── getById(id)
    │   │   ├── getByUserId(userId)
    │   │   ├── getOrderItems(orderId)
    │   │   ├── create(userId, items, totalPrice)
    │   │   ├── updateStatus(id, status)
    │   │   └── isOwner(orderId, userId)
    │   │
    │   └── category.model.js
    │       ├── getAll()
    │       ├── getByGender(gender)
    │       ├── create(data)
    │       └── findByNameAndGender(name, gender)
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   │   ├── register() → POST /api/auth/register
    │   │   ├── login() → POST /api/auth/login
    │   │   └── getProfile() → GET /api/auth/profile
    │   │
    │   ├── products.controller.js
    │   │   ├── getAll() → GET /api/products
    │   │   ├── getById() → GET /api/products/:id
    │   │   ├── getByGender() → GET /api/products/:gender
    │   │   ├── getByGenderAndCategory() → GET /api/products/:gender/:category
    │   │   ├── search() → GET /api/products/search?q=query
    │   │   ├── create() → POST /api/products (admin)
    │   │   ├── update() → PUT /api/products/:id (admin)
    │   │   └── deleteProduct() → DELETE /api/products/:id (admin)
    │   │
    │   ├── orders.controller.js
    │   │   ├── getAll() → GET /api/orders (admin)
    │   │   ├── getMyOrders() → GET /api/orders/my-orders
    │   │   ├── getById() → GET /api/orders/:id
    │   │   ├── create() → POST /api/orders
    │   │   └── updateStatus() → PUT /api/orders/:id/status (admin)
    │   │
    │   ├── categories.controller.js
    │   │   ├── getAll() → GET /api/categories
    │   │   ├── getByGender() → GET /api/categories/:gender
    │   │   └── create() → POST /api/categories (admin)
    │   │
    │   └── users.controller.js
    │       └── getAll() → GET /api/users (admin)
    │
    ├── routes/
    │   ├── auth.routes.js
    │   │   ├── POST /register (public)
    │   │   ├── POST /login (public)
    │   │   └── GET /profile (auth)
    │   │
    │   ├── products.routes.js
    │   │   ├── GET / (public)
    │   │   ├── GET /search (public)
    │   │   ├── GET /:gender (public)
    │   │   ├── GET /:id (public)
    │   │   ├── GET /:gender/:category (public)
    │   │   ├── POST / (admin)
    │   │   ├── PUT /:id (admin)
    │   │   └── DELETE /:id (admin)
    │   │
    │   ├── orders.routes.js
    │   │   ├── POST / (auth)
    │   │   ├── GET /my-orders (auth)
    │   │   ├── GET /:id (auth)
    │   │   ├── GET / (admin)
    │   │   └── PUT /:id/status (admin)
    │   │
    │   ├── categories.routes.js
    │   │   ├── GET / (public)
    │   │   ├── GET /:gender (public)
    │   │   └── POST / (admin)
    │   │
    │   └── users.routes.js
    │       └── GET / (admin)
    │
    ├── utils/
    │   └── response.js
    │       ├── success(statusCode, message, data)
    │       └── error(statusCode, message, errors)
    │
    ├── database/
    │   ├── schema.sql
    │   │   ├── CREATE DATABASE lunar_db
    │   │   ├── CREATE TABLE users
    │   │   ├── CREATE TABLE categories
    │   │   ├── CREATE TABLE products
    │   │   ├── CREATE TABLE orders
    │   │   ├── CREATE TABLE order_items
    │   │   └── CREATE INDEX (optimization)
    │   │
    │   └── seed.sql
    │       ├── INSERT sample users
    │       ├── INSERT sample categories
    │       ├── INSERT sample products
    │       ├── INSERT sample orders
    │       └── INSERT sample order_items
    │
    ├── server.js
    │   ├── Initialize Express app
    │   ├── Setup CORS
    │   ├── Setup middleware
    │   ├── Register routes
    │   ├── Error handling
    │   └── Start listening on PORT 5000
    │
    ├── package.json (dependencies)
    │
    ├── .env (local configuration - create this)
    │   ├── DB_HOST=localhost
    │   ├── DB_PORT=3306
    │   ├── DB_NAME=lunar_db
    │   ├── DB_USER=root
    │   ├── DB_PASSWORD=
    │   ├── PORT=5000
    │   ├── NODE_ENV=development
    │   ├── JWT_SECRET=your_secret
    │   ├── JWT_EXPIRE=7d
    │   └── CORS_ORIGIN=http://localhost:5173
    │
    ├── .gitignore
    │
    ├── README.md (Installation & setup guide)
    ├── API_EXAMPLES.md (20+ API examples with cURL & JavaScript)
    ├── DEPLOYMENT.md (Production deployment guide)
    ├── BACKEND_SUMMARY.md (Overview & implementation details)
    └── BACKEND_ARCHITECTURE.md (This file)
```

---

## 🔀 Data Flow Examples

### Example 1: Get Products by Gender
```
1. Frontend calls: GET /api/products/men
2. Request reaches: productsController.getByGender()
3. Controller calls: Product.getByGender('men')
4. Model executes: SELECT * FROM products WHERE gender = 'men'
5. MySQL returns: Array of products
6. Model maps data to: { id, name, price, ... }
7. Controller returns: success(200, "...", products)
8. Response sent to Frontend with products array
9. Frontend renders products list
```

### Example 2: Create Order
```
1. Frontend sends: POST /api/orders with items array
2. auth.middleware verifies token → req.user = { id, email, role }
3. ordersController.create() receives items
4. Validates each item (product exists, stock available)
5. ordersController calls: Order.create(userId, items, totalPrice)
6. Order.model starts transaction:
   - Inserts new order → gets orderId
   - Inserts each order item with orderId
   - Commits transaction
7. Order.model fetches created order details
8. Response sent with complete order data
9. Frontend stores order in state/localStorage
```

### Example 3: Admin Update Product
```
1. Admin frontend sends: PUT /api/products/1 with { price: 99.99 }
2. auth.middleware verifies token
3. adminMiddleware checks role === 'admin' → PASS
4. productsController.update(id, updates)
5. Validates product exists
6. Product.model.update() executes partial UPDATE
7. Fetches updated product from database
8. Response with updated product
9. Frontend updates product in list
```

---

## 💾 Database Relationships

```
users (1) ──→ (many) orders
      ↓
   PK: id
   FK: order.user_id

categories (1) ──→ (many) products
       ↓
   PK: id
   FK: product.category_id

products (1) ──→ (many) order_items
      ↓
   PK: id
   FK: order_item.product_id

orders (1) ──→ (many) order_items
     ↓
  PK: id
  FK: order_item.order_id
```

---

## 🔍 Key Design Decisions

### 1. **MVC Architecture**
- Clear separation of concerns
- Easy to test and maintain
- Scalable structure

### 2. **Async/Await**
- Modern, readable code
- Better error handling
- Promise-based operations

### 3. **Connection Pooling**
- Reuses database connections
- Better performance
- Prevents connection exhaustion

### 4. **JWT Authentication**
- Stateless (no sessions)
- Scalable to microservices
- Secure token-based auth

### 5. **Prepared Statements**
- SQL injection prevention
- Better performance (caching)
- Safer parameterized queries

### 6. **Role-Based Access**
- Clean middleware pattern
- Reusable across routes
- Easy to add new roles

---

## 📊 Performance Optimization

### Indexes
```sql
CREATE INDEX idx_email ON users(email)
CREATE INDEX idx_gender ON products(gender)
CREATE INDEX idx_category_id ON products(category_id)
CREATE INDEX idx_user_id ON orders(user_id)
CREATE FULLTEXT INDEX ft_search ON products(name, brand, description)
```

### Connection Pool
```javascript
connectionLimit: 10
waitForConnections: true
queueLimit: 0
```

### Query Optimization
- Join queries instead of N+1
- Limit fields returned
- Proper indexing
- Pagination ready

---

## 🛡️ Security Layers

```
CORS ─→ Check origin allowed
  ↓
Body Parser ─→ Parse JSON safely
  ↓
Routes ─→ Input validation
  ↓
Auth Middleware ─→ JWT verification
  ↓
Admin Middleware ─→ Role checking
  ↓
Controller ─→ Business logic validation
  ↓
Model ─→ Prepared statements
  ↓
Database ─→ Execute safely
```

---

## 📈 Scalability Path

### Phase 1: Current
- Single Node.js instance
- Single MySQL database
- Local development

### Phase 2: Scale
- Load balancer
- Multiple Node.js instances
- Connection pooling
- Redis cache

### Phase 3: Enterprise
- Database replication
- Read replicas
- Microservices
- Message queues
- CDN for static files

---

## ✅ Implementation Checklist

- ✅ Authentication system complete
- ✅ Product management complete
- ✅ Order management complete
- ✅ Category management complete
- ✅ User management complete
- ✅ Admin dashboard stats
- ✅ Error handling
- ✅ Input validation
- ✅ Database schema
- ✅ Sample data
- ✅ API documentation
- ✅ Deployment guide
- ✅ Security measures
- ✅ CORS configuration
- ✅ Connection pooling

---

**Lunar Backend Architecture - Production Ready**
