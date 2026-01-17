# Lunar Backend API - Complete Index

## 📚 Documentation Map

### Quick Start (Start Here!)
- **[QUICK_START_BACKEND.md](../QUICK_START_BACKEND.md)** - Get running in 5 minutes

### Setup & Installation
- **[README.md](README.md)** - Installation, configuration, and usage guide
- **[.env](.env)** - Environment configuration file (create this)

### API Documentation
- **[API_EXAMPLES.md](API_EXAMPLES.md)** - 20+ API request/response examples

### Architecture & Design
- **[BACKEND_ARCHITECTURE.md](../BACKEND_ARCHITECTURE.md)** - System design and data flow
- **[BACKEND_SUMMARY.md](BACKEND_SUMMARY.md)** - Implementation overview

### Deployment
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide

### Database
- **[database/schema.sql](database/schema.sql)** - Database schema and tables
- **[database/seed.sql](database/seed.sql)** - Sample data

---

## 📁 File Structure

### Core Application Files

#### Configuration
```
config/
└── db.js              # MySQL connection pool setup
```

#### Middleware
```
middleware/
├── auth.middleware.js # JWT token verification
└── admin.middleware.js # Admin role authorization
```

#### Database Models
```
models/
├── user.model.js      # User operations (CRUD)
├── product.model.js   # Product operations (CRUD)
├── order.model.js     # Order operations (CRUD)
└── category.model.js  # Category operations (CRUD)
```

#### Request Handlers
```
controllers/
├── auth.controller.js       # Authentication (register, login, profile)
├── products.controller.js   # Product management
├── orders.controller.js     # Order management
├── categories.controller.js # Category management
└── users.controller.js      # User management (admin)
```

#### Route Definitions
```
routes/
├── auth.routes.js       # /api/auth routes
├── products.routes.js   # /api/products routes
├── orders.routes.js     # /api/orders routes
├── categories.routes.js # /api/categories routes
└── users.routes.js      # /api/users routes
```

#### Utilities
```
utils/
└── response.js  # Standardized response formatting
```

#### Database
```
database/
├── schema.sql   # Database tables schema
└── seed.sql     # Sample test data
```

#### Entry Point
```
server.js    # Main application file (starts the server)
```

---

## 🔗 API Endpoints Summary

### Authentication (3 endpoints)
```
POST   /api/auth/register          Create new user account
POST   /api/auth/login             User login, get JWT token
GET    /api/auth/profile           Get authenticated user profile
```

### Products (8 endpoints)
```
GET    /api/products                Get all products
GET    /api/products/:id            Get product by ID
GET    /api/products/:gender        Get products by gender
GET    /api/products/:gender/:cat   Get products by gender & category
GET    /api/products/search?q=      Search products
POST   /api/products                Create product (admin only)
PUT    /api/products/:id            Update product (admin only)
DELETE /api/products/:id            Delete product (admin only)
```

### Categories (3 endpoints)
```
GET    /api/categories              Get all categories
GET    /api/categories/:gender      Get categories by gender
POST   /api/categories              Create category (admin only)
```

### Orders (5 endpoints)
```
POST   /api/orders                  Create order
GET    /api/orders/my-orders        Get user's orders
GET    /api/orders/:id              Get order by ID
GET    /api/orders                  Get all orders (admin only)
PUT    /api/orders/:id/status       Update order status (admin only)
```

### Users (1 endpoint)
```
GET    /api/users                   Get all users (admin only)
```

### Admin (1 endpoint)
```
GET    /api/admin/stats             Get dashboard statistics (admin only)
```

**Total: 21 endpoints**

---

## 🗂️ Database Tables

### users
```
id (INT, PK)
name (VARCHAR)
email (VARCHAR, UNIQUE)
password (VARCHAR, hashed)
role (ENUM: user, admin)
created_at (TIMESTAMP)
```

### categories
```
id (INT, PK)
name (VARCHAR)
gender (ENUM: men, women, kids)
created_at (TIMESTAMP)
```

### products
```
id (INT, PK)
name (VARCHAR)
brand (VARCHAR)
description (TEXT)
gender (ENUM)
category_id (INT, FK)
price (DECIMAL)
stock (INT)
image_url (VARCHAR)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### orders
```
id (INT, PK)
user_id (INT, FK)
total_price (DECIMAL)
status (ENUM: pending, shipped, delivered, cancelled)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### order_items
```
id (INT, PK)
order_id (INT, FK)
product_id (INT, FK)
quantity (INT)
price (DECIMAL)
created_at (TIMESTAMP)
```

---

## 📊 Request/Response Format

### Success Response (201, 200)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response (400, 401, 403, 404, 409, 500)
```json
{
  "success": false,
  "message": "Error description",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔐 Authentication

### JWT Token
- Generated on register/login
- Expires in 7 days (configurable)
- Included in `Authorization: Bearer <token>` header
- Contains: id, email, role, iat, exp

### Roles
- `user` - Regular customer
- `admin` - Administrator access

---

## 🚀 Getting Started

### 1. Installation
```bash
cd Backend
npm install
```

### 2. Configuration
Create `.env` file with:
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- PORT, NODE_ENV
- JWT_SECRET, JWT_EXPIRE
- CORS_ORIGIN

### 3. Database Setup
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 4. Start Server
```bash
npm run dev        # Development (with auto-reload)
npm start          # Production
```

---

## 📖 How to Use This Documentation

### I want to...

**Set up the backend locally**
→ Read: [README.md](README.md) → [QUICK_START_BACKEND.md](../QUICK_START_BACKEND.md)

**Understand the API endpoints**
→ Read: [API_EXAMPLES.md](API_EXAMPLES.md)

**Make API requests**
→ Check: [API_EXAMPLES.md](API_EXAMPLES.md) - Copy example cURL or JavaScript

**Understand the architecture**
→ Read: [BACKEND_ARCHITECTURE.md](../BACKEND_ARCHITECTURE.md)

**Deploy to production**
→ Read: [DEPLOYMENT.md](DEPLOYMENT.md)

**Understand the code structure**
→ Read: [BACKEND_SUMMARY.md](BACKEND_SUMMARY.md)

**Access sample data**
→ Use: [database/seed.sql](database/seed.sql)

---

## 📋 Technology Stack

```
Runtime: Node.js (v18+)
Framework: Express.js
Database: MySQL
Auth: JWT (jsonwebtoken)
Security: bcryptjs
CORS: cors package
Validation: express-validator
```

## 📦 Key Dependencies

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "body-parser": "^1.20.2",
  "dotenv": "^16.3.1"
}
```

---

## ✅ Features

### Authentication
- ✅ User registration with validation
- ✅ Secure login with JWT
- ✅ Password hashing with bcryptjs
- ✅ Token expiration
- ✅ Profile retrieval

### Products
- ✅ Browse all products
- ✅ Filter by gender
- ✅ Filter by category
- ✅ Search functionality
- ✅ Admin CRUD operations

### Orders
- ✅ Create orders
- ✅ Track order status
- ✅ View order history
- ✅ Admin order management
- ✅ Stock validation

### Admin Features
- ✅ Product management
- ✅ Category management
- ✅ Order management
- ✅ User management
- ✅ Dashboard statistics

---

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Prepared statements (SQL injection prevention)
- ✅ Password hashing (bcryptjs)
- ✅ Role-based access control
- ✅ CORS enabled
- ✅ Environment variables
- ✅ Error handling
- ✅ Input validation

---

## 🧪 Testing

### Manual Testing
Use provided cURL examples in [API_EXAMPLES.md](API_EXAMPLES.md)

### Postman Testing
Import endpoints into Postman using [API_EXAMPLES.md](API_EXAMPLES.md)

### Frontend Integration
Connect frontend to backend and test full workflows

---

## 🐛 Troubleshooting

### Database Issues
- Check MySQL is running
- Verify credentials in .env
- Run schema.sql: `mysql -u root -p < database/schema.sql`

### Port Conflicts
- Change PORT in .env
- Or kill existing process on port 5000

### CORS Errors
- Check CORS_ORIGIN in .env
- Verify frontend URL matches

### JWT Errors
- Create .env with JWT_SECRET
- Use valid Bearer token in requests

See [README.md](README.md) for more troubleshooting

---

## 📈 Performance

- Connection pooling: 10 connections
- Indexed queries for optimization
- Prepared statements for security & speed
- Response compression ready

---

## 🚀 Deployment Ready

- ✅ Production error handling
- ✅ Environment-based config
- ✅ CORS configured
- ✅ Security measures
- ✅ Database connection pooling
- ✅ Scalable architecture

See [DEPLOYMENT.md](DEPLOYMENT.md) for production setup

---

## 📞 Support Resources

- Node.js Docs: https://nodejs.org/docs
- Express Docs: https://expressjs.com
- MySQL Docs: https://dev.mysql.com/doc
- JWT Docs: https://jwt.io
- bcryptjs: https://github.com/dcodeIO/bcrypt.js

---

## ✨ What's Next

1. **Local Development**
   - Setup backend locally
   - Test all endpoints
   - Integrate with frontend

2. **Testing**
   - Manual API testing
   - Frontend integration testing
   - Load testing

3. **Production**
   - Setup production database
   - Configure environment
   - Deploy to cloud

See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🎯 Quick Navigation

| Need | File |
|------|------|
| Quick setup | [QUICK_START_BACKEND.md](../QUICK_START_BACKEND.md) |
| Installation | [README.md](README.md) |
| API examples | [API_EXAMPLES.md](API_EXAMPLES.md) |
| Architecture | [BACKEND_ARCHITECTURE.md](../BACKEND_ARCHITECTURE.md) |
| Deployment | [DEPLOYMENT.md](DEPLOYMENT.md) |
| Database | [database/schema.sql](database/schema.sql) |
| Summary | [BACKEND_SUMMARY.md](BACKEND_SUMMARY.md) |

---

**Lunar Backend API v1.0 - Complete & Production Ready** 🚀
