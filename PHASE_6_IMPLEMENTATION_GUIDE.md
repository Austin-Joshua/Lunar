# 🚀 PHASE 6 - PRODUCTION-LIKE FEATURES
## Implementation Guide: Refresh Token Auth + Stock + Order History

---

## 📋 QUICK SUMMARY

This phase includes 3 critical updates:

| Feature | Impact | Priority |
|---------|--------|----------|
| **Refresh Token Auth** | Professional sessions, auto-refresh | 🔴 CRITICAL |
| **Stock Management** | Real business logic | 🔴 CRITICAL |
| **Order History** | User + admin control | 🔴 CRITICAL |

**Timeline:** 4-6 hours | **Status:** Foundation Ready ✅

---

## 1️⃣ REFRESH TOKEN AUTHENTICATION

### Database Setup

```sql
-- Run this in MySQL
USE lunar_db;

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  is_revoked BOOLEAN DEFAULT false,
  revoked_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_token (token),
  INDEX idx_expires_at (expires_at)
);
```

### Backend Implementation ✅ DONE

**Files Created:**
- ✅ `Backend/models/token.model.js` - Refresh token database operations
- ✅ `Backend/controllers/token.controller.js` - Token management endpoints
- ✅ Updated `Backend/controllers/auth.controller.js` - Now generates both tokens
- ✅ Updated `Backend/routes/auth.routes.js` - New endpoints added

**New API Endpoints:**

```javascript
// 1. Refresh Access Token
POST /api/auth/refresh-token
Body: { "refreshToken": "..." }
Response: {
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "new_jwt_token",
    "expiresIn": "15m"
  }
}

// 2. Logout (Revoke Token)
POST /api/auth/logout
Body: { "refreshToken": "..." }
Response: { "success": true, "message": "Logged out successfully" }

// 3. Logout All Devices
POST /api/auth/logout-all
Headers: { "Authorization": "Bearer access_token" }
Response: { "success": true, "message": "Logged out from all devices" }
```

**Updated Login/Register Response:**

```javascript
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",      // 15-min expiry
    "refreshToken": "eyJhbGc...",     // 7-day expiry
    "expiresIn": "15m",
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@lunar.com",
      "role": "admin"
    }
  }
}
```

### Frontend Implementation (Next Steps)

**Update `Frontend/src/services/apiClient.ts`:**

```typescript
const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  let token = localStorage.getItem('accessToken');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Auto-refresh on 401
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newAccessToken = refreshData.data.accessToken;
          
          // Store new access token
          localStorage.setItem('accessToken', newAccessToken);
          
          // Retry original request
          headers['Authorization'] = `Bearer ${newAccessToken}`;
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (error) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    } else {
      // No refresh token, logout
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};
```

**Update `Frontend/src/context/AuthContext.tsx`:**

```typescript
const login = useCallback((userData: User, accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  setUser(userData);
}, []);

const logout = useCallback(() => {
  // Optionally notify backend
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {});
  }

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem(USER_DATA_KEY);
  setUser(null);
}, []);
```

**Impact:**
- ✅ Sessions auto-refresh (no sudden logout)
- ✅ Interview-level security
- ✅ Professional UX

---

## 2️⃣ STOCK MANAGEMENT LOGIC

### Database Setup

```sql
-- Add stock tracking to products (if not already present)
ALTER TABLE products ADD COLUMN stock_quantity INT DEFAULT 0;

-- Create stock activity log
CREATE TABLE IF NOT EXISTS stock_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  order_id INT,
  quantity_change INT NOT NULL,
  reason VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  INDEX idx_product_id (product_id),
  INDEX idx_order_id (order_id)
);

-- Add indexes for performance
CREATE INDEX idx_products_stock ON products(stock_quantity);
```

### Backend Implementation (Next Steps)

**Update `Backend/models/product.model.js`:**

```javascript
/**
 * Check stock availability
 */
static async checkStock(productId, quantity) {
  const query = 'SELECT stock_quantity FROM products WHERE id = ?';
  const [rows] = await pool.execute(query, [productId]);
  
  if (!rows.length) return false;
  return rows[0].stock_quantity >= quantity;
}

/**
 * Update product stock
 */
static async updateStock(productId, quantityChange) {
  const query = `
    UPDATE products
    SET stock_quantity = stock_quantity + ?
    WHERE id = ?
  `;
  
  const [result] = await pool.execute(query, [quantityChange, productId]);
  return result.affectedRows > 0;
}

/**
 * Get available stock
 */
static async getStock(productId) {
  const query = 'SELECT stock_quantity FROM products WHERE id = ?';
  const [rows] = await pool.execute(query, [productId]);
  return rows[0]?.stock_quantity || 0;
}
```

**Update `Backend/controllers/orders.controller.js`:**

```javascript
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, totalPrice } = req.body;

    // 1. Validate items and check stock
    for (const item of items) {
      const hasStock = await Product.checkStock(item.productId, item.quantity);
      if (!hasStock) {
        const product = await Product.findById(item.productId);
        return res.status(400).json(
          error(400, `Insufficient stock for ${product.name}`)
        );
      }
    }

    // 2. Create order
    const order = await Order.create({
      user_id: userId,
      total_price: totalPrice,
      status: 'pending'
    });

    // 3. Add items and deduct stock
    for (const item of items) {
      // Add order item
      await Order.addItem(order.id, item.productId, item.quantity, item.price);
      
      // Deduct stock
      await Product.updateStock(item.productId, -item.quantity);
      
      // Log stock change
      await StockLog.create({
        product_id: item.productId,
        order_id: order.id,
        quantity_change: -item.quantity,
        reason: 'ORDER_PLACED'
      });
    }

    return res.status(201).json(
      success(201, 'Order created successfully', order)
    );
  } catch (err) {
    console.error('Order creation error:', err);
    return res.status(500).json(error(500, 'Failed to create order'));
  }
};
```

**Frontend - Disable checkout if out of stock:**

```typescript
const handleCheckout = async () => {
  // Check all items have stock
  for (const item of cartItems) {
    if (item.stock === 0 || item.quantity > item.stock) {
      showError(`${item.name} is out of stock`);
      return;
    }
  }

  // Proceed to checkout
  try {
    const response = await api.post('/orders', {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: cartTotal
    });

    // Clear cart on success
    clearCart();
    navigate(`/orders/${response.data.id}`);
  } catch (error) {
    showError(error.message);
  }
};
```

**Impact:**
- ✅ Accurate inventory
- ✅ No overselling
- ✅ Audit trail for reconciliation
- ✅ Business logic maturity

---

## 3️⃣ ORDER HISTORY + ADMIN CONTROL

### Backend Implementation (Next Steps)

**Update `Backend/models/order.model.js`:**

```javascript
/**
 * Get orders for a user
 */
static async getUserOrders(userId) {
  const query = `
    SELECT o.*, 
           GROUP_CONCAT(
             JSON_OBJECT('id', oi.id, 'productId', oi.product_id, 
                        'quantity', oi.quantity, 'price', oi.price)
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `;
  
  const [rows] = await pool.execute(query, [userId]);
  return rows;
}

/**
 * Get all orders (admin)
 */
static async getAllOrders(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const query = `
    SELECT o.*, u.name, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  const [rows] = await pool.execute(query, [limit, offset]);
  return rows;
}

/**
 * Get orders by status
 */
static async getByStatus(status, page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const query = `
    SELECT o.*, u.name, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.status = ?
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  const [rows] = await pool.execute(query, [status, limit, offset]);
  return rows;
}

/**
 * Update order status
 */
static async updateStatus(orderId, status) {
  const query = `
    UPDATE orders
    SET status = ?, updated_at = NOW()
    WHERE id = ?
  `;
  
  const [result] = await pool.execute(query, [status, orderId]);
  return result.affectedRows > 0;
}
```

**New Admin Endpoints:**

```javascript
// GET /api/admin/orders - List all orders
GET /api/admin/orders?page=1&limit=20
Response: {
  "success": true,
  "data": [
    {
      "id": 1,
      "userName": "John Doe",
      "email": "john@example.com",
      "totalPrice": 5000,
      "status": "pending",
      "createdAt": "2026-01-17T10:00:00Z"
    }
  ]
}

// GET /api/admin/orders/:id - Get order details
GET /api/admin/orders/1
Response: {
  "success": true,
  "data": {
    "id": 1,
    "items": [
      {
        "productId": 5,
        "productName": "T-Shirt",
        "quantity": 2,
        "price": 500
      }
    ],
    "totalPrice": 5000,
    "status": "pending"
  }
}

// PUT /api/admin/orders/:id/status - Update order status
PUT /api/admin/orders/1/status
Body: { "status": "shipped" }

// GET /api/admin/orders/filter/:status - Filter by status
GET /api/admin/orders/filter/shipped?page=1
```

### Frontend Implementation (Next Steps)

**Create `Frontend/src/pages/OrderHistory.tsx`:**

```typescript
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/services/apiClient';
import { formatPrice } from '@/utils/currency';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient<any>('/orders/my-orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return <div className="text-center py-12">Please log in to view orders</div>;
  }

  return (
    <div className="lunar-container py-12">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      {loading ? (
        <div className="text-center py-12">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No orders yet</p>
          <Button className="mt-4" variant="outline">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg overflow-hidden hover:shadow-lunar-md transition-shadow"
            >
              <div
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="p-4 cursor-pointer hover:bg-muted flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="font-bold text-lg">{formatPrice(order.totalPrice)}</p>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedOrder === order.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="px-4 py-4 bg-muted border-t space-y-3">
                  {order.items && order.items.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Items</h4>
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm py-1">
                          <span>{item.productName} x{item.quantity}</span>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
```

**Create Admin Order Management Component:**

```typescript
// Frontend/src/pages/AdminOrders.tsx
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      await apiClient(`/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      
      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      
      {/* Filter buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map(status => (
          <Button
            key={status}
            onClick={() => { setFilter(status); setPage(1); }}
            variant={filter === status ? 'default' : 'outline'}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted">
              <th className="text-left p-3 font-semibold">Order ID</th>
              <th className="text-left p-3 font-semibold">Customer</th>
              <th className="text-left p-3 font-semibold">Total</th>
              <th className="text-left p-3 font-semibold">Status</th>
              <th className="text-left p-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-muted">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.userName}</td>
                <td className="p-3 font-semibold">{formatPrice(order.totalPrice)}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

**Impact:**
- ✅ User sees order history
- ✅ Admin manages orders
- ✅ Status tracking
- ✅ Professional UX

---

## ✅ IMPLEMENTATION CHECKLIST

### Backend ✅ DONE
- [x] Token model created
- [x] Token controller created
- [x] Auth controller updated
- [x] Auth routes updated
- [ ] Product model stock methods
- [ ] Order model methods
- [ ] Admin order endpoints

### Frontend (Next)
- [ ] Update apiClient for auto-refresh
- [ ] Update AuthContext for two tokens
- [ ] Create OrderHistory page
- [ ] Create admin order component
- [ ] Add routes for order pages

### Database
- [x] Schema with refresh_tokens table
- [x] Schema with stock_logs table
- [ ] Run migration in MySQL

---

## 🔗 DATABASE MIGRATION

Run these commands in MySQL to set up the new tables:

```bash
# Connect to MySQL
mysql -u root -p

# Select database
USE lunar_db;

# Run migration
source Backend/database/schema.sql;
```

Or manually create the tables using the schema file.

---

## 📊 NEXT STEPS

1. ✅ **Review this guide** - Understand each feature
2. **Implement Frontend Changes** - apiClient, AuthContext, components
3. **Test thoroughly** - Login, refresh, logout, order creation
4. **Commit & Push** - All changes to GitHub
5. **Move to Phase 7** - Checkout flow, product images, etc.

---

**Status:** Foundation Ready ✅ | **Next:** Frontend Implementation
**Expected Completion:** 2-3 days
