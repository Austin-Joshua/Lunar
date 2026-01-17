# Lunar API - Request/Response Examples

Complete collection of API request and response examples using cURL, JavaScript, and JSON formats.

## 🔗 Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication

### 1. Register New User

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**JavaScript (Fetch):**
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});
const data = await response.json();
console.log(data);
```

**Response (201):**
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDUzMzA2MDAsImV4cCI6MTcwNTkzNTQwMH0.abcdef123456"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Login User

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response (200):**
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDUzMzA2MDAsImV4cCI6MTcwNTkzNTQwMH0.abcdef123456"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 3. Get User Profile

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**JavaScript:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:5000/api/auth/profile', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

**Response (200):**
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

## 📦 Products

### 4. Get All Products

**cURL:**
```bash
curl -X GET http://localhost:5000/api/products
```

**Response (200):**
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
      "description": "Premium blue cotton shirt for everyday wear",
      "gender": "men",
      "category": "Shirts",
      "stock": 50,
      "image": "https://via.placeholder.com/300",
      "inStock": true
    },
    {
      "id": 2,
      "name": "Black Slim Fit Pants",
      "brand": "Adidas",
      "price": 69.99,
      "description": "Comfortable black pants for work and casual",
      "gender": "men",
      "category": "Pants",
      "stock": 30,
      "image": "https://via.placeholder.com/300",
      "inStock": true
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 5. Get Product by ID

**cURL:**
```bash
curl -X GET http://localhost:5000/api/products/1
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully.",
  "data": {
    "id": 1,
    "name": "Classic Blue Shirt",
    "brand": "Nike",
    "price": 49.99,
    "description": "Premium blue cotton shirt for everyday wear",
    "gender": "men",
    "category": "Shirts",
    "stock": 50,
    "image": "https://via.placeholder.com/300",
    "inStock": true,
    "createdAt": "2024-01-15T09:00:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 6. Get Products by Gender

**cURL:**
```bash
curl -X GET http://localhost:5000/api/products/men
curl -X GET http://localhost:5000/api/products/women
curl -X GET http://localhost:5000/api/products/kids
```

**Response (200):**
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

---

### 7. Get Products by Gender and Category

**cURL:**
```bash
curl -X GET http://localhost:5000/api/products/men/shirts
curl -X GET http://localhost:5000/api/products/women/tops
curl -X GET http://localhost:5000/api/products/kids/boys
```

**Response (200):**
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

---

### 8. Search Products

**cURL:**
```bash
curl -X GET "http://localhost:5000/api/products/search?q=shirt"
curl -X GET "http://localhost:5000/api/products/search?q=nike"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Search completed successfully.",
  "data": [
    {
      "id": 1,
      "name": "Classic Blue Shirt",
      "brand": "Nike",
      "price": 49.99,
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

---

### 9. Create Product (Admin Only)

**cURL:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_here" \
  -d '{
    "name": "Premium Jacket",
    "brand": "The North Face",
    "description": "Waterproof winter jacket for extreme weather",
    "gender": "men",
    "category": "Jackets",
    "price": 199.99,
    "stock": 25,
    "image_url": "https://example.com/jacket.jpg"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": {
    "id": 15,
    "name": "Premium Jacket",
    "brand": "The North Face",
    "price": 199.99,
    "description": "Waterproof winter jacket",
    "gender": "men",
    "category_id": 5,
    "stock": 25,
    "image_url": "https://example.com/jacket.jpg",
    "inStock": true
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 10. Update Product (Admin Only)

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_here" \
  -d '{
    "price": 44.99,
    "stock": 100
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully.",
  "data": {
    "id": 1,
    "name": "Classic Blue Shirt",
    "brand": "Nike",
    "price": 44.99,
    "stock": 100,
    "inStock": true
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 11. Delete Product (Admin Only)

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/products/15 \
  -H "Authorization: Bearer admin_token_here"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully.",
  "data": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🏷️ Categories

### 12. Get All Categories

**cURL:**
```bash
curl -X GET http://localhost:5000/api/categories
```

**Response (200):**
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
      "id": 2,
      "name": "Pants",
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

---

### 13. Get Categories by Gender

**cURL:**
```bash
curl -X GET http://localhost:5000/api/categories/men
curl -X GET http://localhost:5000/api/categories/women
```

**Response (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully.",
  "data": [
    "Shirts",
    "Pants",
    "Footwear",
    "Accessories",
    "Bags"
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 14. Create Category (Admin Only)

**cURL:**
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_here" \
  -d '{
    "name": "Jackets",
    "gender": "men"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully.",
  "data": {
    "id": 20,
    "name": "Jackets",
    "gender": "men"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🛒 Orders

### 15. Create Order

**cURL:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer user_token_here" \
  -d '{
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
  }'
```

**Response (201):**
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
        "brand": "Nike",
        "image": "https://via.placeholder.com/300",
        "quantity": 2,
        "price": 49.99
      },
      {
        "id": 11,
        "productId": 3,
        "name": "Running Shoes Pro",
        "brand": "Puma",
        "image": "https://via.placeholder.com/300",
        "quantity": 1,
        "price": 129.99
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 16. Get My Orders

**cURL:**
```bash
curl -X GET http://localhost:5000/api/orders/my-orders \
  -H "Authorization: Bearer user_token_here"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Orders retrieved successfully.",
  "data": [
    {
      "id": 1,
      "userId": 2,
      "total": 129.98,
      "status": "pending",
      "items": [
        {
          "id": 1,
          "productId": 1,
          "name": "Classic Blue Shirt",
          "quantity": 1,
          "price": 49.99
        }
      ],
      "createdAt": "2024-01-14T15:00:00.000Z"
    },
    {
      "id": 4,
      "userId": 2,
      "total": 229.97,
      "status": "shipped",
      "items": [...],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 17. Get Order by ID

**cURL:**
```bash
curl -X GET http://localhost:5000/api/orders/4 \
  -H "Authorization: Bearer user_token_here"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order retrieved successfully.",
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
        "brand": "Nike",
        "image": "https://via.placeholder.com/300",
        "quantity": 2,
        "price": 49.99
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 18. Get All Orders (Admin Only)

**cURL:**
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer admin_token_here"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Orders retrieved successfully.",
  "data": [
    {
      "id": 1,
      "userId": 2,
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "total": 129.98,
      "status": "delivered",
      "items": [...],
      "createdAt": "2024-01-14T15:00:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 19. Update Order Status (Admin Only)

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/orders/4/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_here" \
  -d '{
    "status": "shipped"
  }'
```

**Valid statuses:** `pending`, `shipped`, `delivered`, `cancelled`

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully.",
  "data": {
    "id": 4,
    "userId": 2,
    "total": 229.97,
    "status": "shipped",
    "items": [...],
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 👥 Users

### 20. Get All Users (Admin Only)

**cURL:**
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer admin_token_here"
```

**Response (200):**
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
      "createdAt": "2024-01-15T09:00:00.000Z"
    },
    {
      "id": 2,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:15:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📊 Admin

### 21. Get Dashboard Stats (Admin Only)

**cURL:**
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer admin_token_here"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 25,
    "totalProducts": 42,
    "totalOrders": 156,
    "totalRevenue": 18750.50
  }
}
```

---

## ❌ Error Examples

### Missing Required Field

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Name, email, and password are required.",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Unauthorized (Missing Token)

**Response (401):**
```json
{
  "success": false,
  "message": "Access denied. No token provided.",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Forbidden (User Not Admin)

**Response (403):**
```json
{
  "success": false,
  "message": "Forbidden. Admin access required.",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Not Found

**Response (404):**
```json
{
  "success": false,
  "message": "Product not found.",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Conflict (Duplicate Email)

**Response (409):**
```json
{
  "success": false,
  "message": "User with this email already exists.",
  "errors": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📝 JavaScript Fetch Examples

### Complete Example - Register and Login

```javascript
// Register
async function registerUser() {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123'
    })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    console.log('Registered successfully');
  }
}

// Login
async function loginUser() {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'john@example.com',
      password: 'SecurePass123'
    })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    console.log('Logged in successfully');
  }
}

// Get Products
async function getProducts() {
  const response = await fetch('http://localhost:5000/api/products');
  const data = await response.json();
  console.log(data.data); // Array of products
}

// Get Products by Gender
async function getProductsByGender(gender) {
  const response = await fetch(`http://localhost:5000/api/products/${gender}`);
  const data = await response.json();
  console.log(data.data);
}

// Create Order
async function createOrder(items) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ items })
  });
  const data = await response.json();
  return data.data;
}
```

---

End of API Examples Document
