# Lunar Backend API

A complete Node.js + Express.js backend for the Lunar e-commerce platform. Features JWT authentication, admin dashboard support, product management, and order processing.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL Server (v5.7+)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd Backend
npm install
```

2. **Set up environment variables**
Create a `.env` file in the Backend directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lunar_db
DB_USER=root
DB_PASSWORD=your_password

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

3. **Create database and tables**

Open MySQL and run:
```sql
-- Copy and paste the entire schema from database/schema.sql
-- Then optionally seed sample data from database/seed.sql
```

Or use MySQL command line:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

4. **Start the server**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (201):
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get User Profile
**GET** `/auth/profile`

Headers: `Authorization: Bearer <token>`

Response (200):
```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📦 Products Endpoints

### Get All Products
**GET** `/products`

Response (200):
```json
{
  "success": true,
  "message": "Products retrieved successfully.",
  "data": [
    {
      "id": 1,
      "name": "Classic Blue Shirt",
      "brand": "Nike",
      "price": 49.99,
      "description": "Premium blue cotton shirt",
      "gender": "men",
      "category": "Shirts",
      "stock": 50,
      "image": "https://via.placeholder.com/300",
      "inStock": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get Product by ID
**GET** `/products/:id`

Example: `GET /products/1`

### Get Products by Gender
**GET** `/products/:gender`

Example: `GET /products/men`

Query Parameters:
- `gender` (required): `men`, `women`, or `kids`

### Get Products by Gender and Category
**GET** `/products/:gender/:category`

Example: `GET /products/men/shirts`

### Search Products
**GET** `/products/search?q=<query>`

Example: `GET /products/search?q=shirt`

### Create Product (Admin Only)
**POST** `/products`

Headers: `Authorization: Bearer <admin_token>`

Request:
```json
{
  "name": "Premium Jacket",
  "brand": "The North Face",
  "description": "Waterproof winter jacket",
  "gender": "men",
  "category": "Jackets",
  "price": 199.99,
  "stock": 25,
  "image_url": "https://example.com/image.jpg"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": {
    "id": 15,
    "name": "Premium Jacket",
    "brand": "The North Face",
    "price": 199.99,
    "inStock": true
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Update Product (Admin Only)
**PUT** `/products/:id`

Headers: `Authorization: Bearer <admin_token>`

Request (partial update):
```json
{
  "price": 189.99,
  "stock": 30
}
```

### Delete Product (Admin Only)
**DELETE** `/products/:id`

Headers: `Authorization: Bearer <admin_token>`

---

## 🏷️ Categories Endpoints

### Get All Categories
**GET** `/categories`

Response:
```json
{
  "success": true,
  "message": "Categories retrieved successfully.",
  "data": [
    {
      "id": 1,
      "name": "Shirts",
      "gender": "men"
    },
    {
      "id": 6,
      "name": "Tops",
      "gender": "women"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get Categories by Gender
**GET** `/categories/:gender`

Example: `GET /categories/women`

### Create Category (Admin Only)
**POST** `/categories`

Headers: `Authorization: Bearer <admin_token>`

Request:
```json
{
  "name": "Jackets",
  "gender": "men"
}
```

---

## 🛒 Orders Endpoints

### Create Order
**POST** `/orders`

Headers: `Authorization: Bearer <token>`

Request:
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 49.99
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 129.99
    }
  ]
}
```

Response (201):
```json
{
  "success": true,
  "message": "Order created successfully.",
  "data": {
    "id": 4,
    "userId": 2,
    "total": 229.97,
    "status": "pending",
    "items": [
      {
        "id": 10,
        "productId": 1,
        "name": "Classic Blue Shirt",
        "quantity": 2,
        "price": 49.99
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get My Orders
**GET** `/orders/my-orders`

Headers: `Authorization: Bearer <token>`

### Get Order by ID
**GET** `/orders/:id`

Headers: `Authorization: Bearer <token>`

### Get All Orders (Admin Only)
**GET** `/orders`

Headers: `Authorization: Bearer <admin_token>`

### Update Order Status (Admin Only)
**PUT** `/orders/:id/status`

Headers: `Authorization: Bearer <admin_token>`

Request:
```json
{
  "status": "shipped"
}
```

Valid statuses: `pending`, `shipped`, `delivered`, `cancelled`

---

## 👥 Users Endpoints

### Get All Users (Admin Only)
**GET** `/users`

Headers: `Authorization: Bearer <admin_token>`

Response:
```json
{
  "success": true,
  "message": "Users retrieved successfully.",
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@lunar.com",
      "role": "admin",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:32:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📊 Admin Endpoints

### Get Dashboard Stats (Admin Only)
**GET** `/admin/stats`

Headers: `Authorization: Bearer <admin_token>`

Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 15,
    "totalProducts": 28,
    "totalOrders": 45,
    "totalRevenue": 12450.50
  }
}
```

---

## 🛡️ Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden (Admin Access Required) |
| 404 | Not Found |
| 409 | Conflict (e.g., Email Already Exists) |
| 500 | Internal Server Error |

---

## 🔑 Sample Credentials

For testing with seed data:

**Admin Account:**
- Email: `admin@lunar.com`
- Password: `password` (hash provided in seed.sql)

**Regular User:**
- Email: `john@example.com`
- Password: `password`

---

## 📁 Project Structure

```
Backend/
├── config/
│   └── db.js                 # MySQL connection pool config
├── controllers/              # Business logic
│   ├── auth.controller.js
│   ├── products.controller.js
│   ├── orders.controller.js
│   ├── categories.controller.js
│   └── users.controller.js
├── middleware/
│   ├── auth.middleware.js     # JWT verification
│   └── admin.middleware.js    # Admin authorization
├── models/                   # Database operations
│   ├── user.model.js
│   ├── product.model.js
│   ├── order.model.js
│   └── category.model.js
├── routes/                   # API route definitions
│   ├── auth.routes.js
│   ├── products.routes.js
│   ├── orders.routes.js
│   ├── categories.routes.js
│   └── users.routes.js
├── utils/
│   └── response.js          # Consistent response formatter
├── database/
│   ├── schema.sql           # Database schema
│   └── seed.sql             # Sample data
├── server.js                # Main server entry point
├── package.json
├── .env                     # Environment variables (create this)
└── README.md
```

---

## 🔄 Database Schema

### Users Table
- `id` (INT, PK, AI)
- `name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `password` (VARCHAR, hashed)
- `role` (ENUM: 'user', 'admin')
- `created_at` (TIMESTAMP)

### Products Table
- `id` (INT, PK, AI)
- `name` (VARCHAR)
- `brand` (VARCHAR)
- `description` (TEXT)
- `gender` (ENUM: 'men', 'women', 'kids')
- `category_id` (INT, FK)
- `price` (DECIMAL)
- `stock` (INT)
- `image_url` (VARCHAR)
- `created_at` (TIMESTAMP)

### Orders Table
- `id` (INT, PK, AI)
- `user_id` (INT, FK)
- `total_price` (DECIMAL)
- `status` (ENUM: 'pending', 'shipped', 'delivered', 'cancelled')
- `created_at` (TIMESTAMP)

### Order Items Table
- `id` (INT, PK, AI)
- `order_id` (INT, FK)
- `product_id` (INT, FK)
- `quantity` (INT)
- `price` (DECIMAL)

### Categories Table
- `id` (INT, PK, AI)
- `name` (VARCHAR)
- `gender` (ENUM: 'men', 'women', 'kids')

---

## 🔒 Security Features

✅ JWT-based authentication
✅ Password hashing with bcryptjs
✅ Role-based access control (Admin/User)
✅ SQL injection prevention (prepared statements)
✅ CORS configuration
✅ Environment variable protection
✅ Request validation

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",           // Web framework
  "mysql2": "^3.6.5",             // MySQL client
  "dotenv": "^16.3.1",            // Environment variables
  "bcryptjs": "^2.4.3",           // Password hashing
  "jsonwebtoken": "^9.1.2",       // JWT tokens
  "cors": "^2.8.5",               // Cross-origin requests
  "body-parser": "^1.20.2",       // Request body parsing
  "express-validator": "^7.0.0"   // Input validation
}
```

---

## 🚀 Deployment

### Using Vercel, Heroku, or AWS

1. Create a remote MySQL database (AWS RDS, Heroku PostgreSQL, etc.)
2. Update `.env` with remote database credentials
3. Deploy the application
4. Run database migrations on the remote server

### Example .env for Production

```env
DB_HOST=your-remote-db-host.rds.amazonaws.com
DB_PORT=3306
DB_NAME=lunar_db_prod
DB_USER=admin
DB_PASSWORD=strong_password_here
PORT=5000
NODE_ENV=production
JWT_SECRET=very_long_random_secure_string
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
```

---

## 📝 Notes

- Always keep your JWT_SECRET secure
- Change the default admin password in production
- Use HTTPS in production
- Implement rate limiting for production
- Add logging service for monitoring
- Consider adding email verification
- Implement refresh token rotation

---

## 🐛 Troubleshooting

### Database Connection Error
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

### JWT Token Invalid
- Token may be expired
- JWT_SECRET might not match
- Token format should be `Bearer <token>`

### CORS Error
- Check CORS_ORIGIN matches frontend URL
- Ensure credentials flag is set correctly

---

## 📞 Support

For issues or questions, refer to the main repository documentation.

---

**Created for Lunar E-Commerce Platform**
Backend API v1.0
