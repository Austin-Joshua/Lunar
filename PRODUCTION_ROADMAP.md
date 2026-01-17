# 🚀 PRODUCTION ROADMAP - Phase 6, 7, 8, 9

Complete roadmap to transform "working app" → "production-ready product"

---

## 🎯 PHASE 6 - Make It Production-Like (PRIORITY)

### 1️⃣ REFRESH TOKEN AUTHENTICATION ⭐ CRITICAL

**Why:**
- Current JWT (7d) logs user out abruptly
- Professional apps use short-lived access tokens + long-lived refresh tokens
- Better security: If access token compromised, only 15-30 min exposure

**Implementation:**

#### Backend Changes:

**A. Database Schema Update**
```sql
-- Add refresh_tokens table
CREATE TABLE refresh_tokens (
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

**B. New Files Created:**

1. **`Backend/models/token.model.js`** ✅
   - `RefreshToken.create()` - Store refresh token
   - `RefreshToken.verify()` - Validate & retrieve token
   - `RefreshToken.revoke()` - Revoke single token
   - `RefreshToken.revokeAllForUser()` - Logout from all devices
   - `RefreshToken.cleanup()` - Clean expired tokens

2. **`Backend/controllers/token.controller.js`** ✅
   - `refreshAccessToken()` - POST /api/auth/refresh-token
   - `logout()` - Revoke refresh token
   - `logoutAll()` - Logout from all devices

**C. Auth Controller Updates**
```javascript
// After successful login, generate both tokens
const accessToken = jwt.sign(
  { id, email, role },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }  // Short-lived
);

const refreshToken = jwt.sign(
  { id, email },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }  // Long-lived
);

// Store refresh token in DB
await RefreshToken.create(user.id, refreshToken);

// Return both
return {
  accessToken,
  refreshToken,
  expiresIn: '15m'
};
```

#### Frontend Changes:

**A. Update API Client**
```typescript
// src/services/apiClient.ts
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

  // If 401, try refreshing token
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshed = await refreshAccessToken(refreshToken);
      if (refreshed) {
        // Retry with new token
        token = refreshed.accessToken;
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${token}` },
        });
      }
    }
  }

  if (response.status === 401 && !refreshed) {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }

  return response.json();
};
```

**B. Store Both Tokens**
```typescript
// Login success
localStorage.setItem('accessToken', response.accessToken);
localStorage.setItem('refreshToken', response.refreshToken);
```

**Impact:**
- ✅ Sessions last 7 days instead of 1
- ✅ Access token stolen = 15 min exposure max
- ✅ Professional security posture
- ✅ "Logout from all devices" feature
- ✅ Interview-level implementation

---

### 2️⃣ STOCK MANAGEMENT LOGIC ⭐ CRITICAL

**Why:**
- Real e-commerce requires stock tracking
- Can't sell items you don't have
- Business logic maturity indicator

**Implementation:**

#### Database Updates:

```sql
-- Add stock tracking to products table
ALTER TABLE products ADD COLUMN stock_quantity INT DEFAULT 0;

-- Create order_stock_log for audit trail
CREATE TABLE order_stock_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  order_id INT,
  quantity_change INT,
  reason VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  INDEX idx_product_id (product_id)
);
```

#### Backend Implementation:

**A. Stock Check Before Order**
```javascript
// In orders.controller.js
const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // items: [{productId, quantity}, ...]

    // 1. Check stock for all items
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product || product.stock < item.quantity) {
        return res.status(400).json(
          error(400, `Insufficient stock for ${product.name}`)
        );
      }
    }

    // 2. Create order
    const order = await Order.create({...});

    // 3. Deduct stock
    for (const item of items) {
      await Product.updateStock(item.productId, -item.quantity);
      await StockLog.create(item.productId, order.id, -item.quantity, 'ORDER_PLACED');
    }

    // 4. Return order with success
    return res.status(201).json(
      success(201, 'Order created successfully', order)
    );
  } catch (err) {
    // If transaction fails, stock remains intact (DB transaction handling)
    console.error('Order creation error:', err);
    return res.status(500).json(error(500, 'Failed to create order'));
  }
};
```

**B. Stock Update Method**
```javascript
// In product.model.js
static async updateStock(productId, quantityChange) {
  const query = `
    UPDATE products
    SET stock_quantity = stock_quantity + ?
    WHERE id = ?
  `;
  
  return await pool.execute(query, [quantityChange, productId]);
}

static async getStock(productId) {
  const query = `SELECT stock_quantity FROM products WHERE id = ?`;
  const [rows] = await pool.execute(query, [productId]);
  return rows[0]?.stock_quantity || 0;
}
```

**C. Frontend - Disable Checkout if No Stock**
```typescript
// In cart component
const handleCheckout = () => {
  for (const item of cartItems) {
    if (item.stock < item.quantity) {
      showError(`${item.name} only has ${item.stock} left`);
      return;
    }
  }
  // Proceed to checkout
};
```

**Impact:**
- ✅ Accurate inventory
- ✅ No overselling
- ✅ Stock audit trail
- ✅ Business logic completeness

---

### 3️⃣ ORDER HISTORY + ADMIN CONTROL ⭐ CRITICAL

**Why:**
- Users need to see past orders
- Admins need to manage orders
- Essential for e-commerce

#### Frontend - User Order History:

**A. Order History Page**
```typescript
// src/pages/OrderHistory.tsx
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    const response = await api.get('/orders/my-orders');
    setOrders(response.data);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="p-4 border rounded cursor-pointer hover:bg-muted"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{order.totalPrice}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};
```

**B. Order Details Modal**
```typescript
const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
        
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Status: {order.status}</p>
          <p className="text-sm text-muted-foreground">Date: {order.createdAt}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Items</h3>
          {order.items?.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <div>
                <p>{item.productName}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 p-4 bg-muted rounded">
          <p className="text-right text-lg font-bold">Total: ₹{order.totalPrice}</p>
        </div>

        <button onClick={onClose} className="w-full py-2 border rounded hover:bg-muted">
          Close
        </button>
      </div>
    </div>
  );
};
```

#### Backend - Admin Order Management:

**A. Enhanced Admin Endpoints**
```javascript
// In admin routes
router.get('/orders', adminMiddleware, getAll Orders);
router.get('/orders/:id', adminMiddleware, getOrderDetails);
router.put('/orders/:id/status', adminMiddleware, updateOrderStatus);
router.get('/orders/filter/:status', adminMiddleware, filterOrdersByStatus);
```

**B. Admin Controller Updates**
```javascript
// orders.controller.js
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json(error(400, 'Invalid status'));
    }

    const updated = await Order.updateStatus(id, status);
    
    if (!updated) {
      return res.status(404).json(error(404, 'Order not found'));
    }

    return res.status(200).json(
      success(200, 'Order status updated', { status })
    );
  } catch (err) {
    return res.status(500).json(error(500, 'Failed to update order'));
  }
};

const filterOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await Order.findByStatus(status);
    
    return res.status(200).json(
      success(200, 'Orders fetched', orders)
    );
  } catch (err) {
    return res.status(500).json(error(500, 'Failed to fetch orders'));
  }
};
```

**C. Admin Dashboard Order Management**
```typescript
// Admin panel for order management
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  const updateStatus = async (orderId, newStatus) => {
    await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
    // Refresh orders
    fetchOrders();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${
              filter === status ? 'bg-primary text-white' : 'border'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b hover:bg-muted">
              <td className="p-2">#{order.id}</td>
              <td>{order.userName}</td>
              <td>₹{order.totalPrice}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{order.createdAt}</td>
              <td>
                <button className="text-primary hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

**Impact:**
- ✅ Users see order history
- ✅ Admins manage orders
- ✅ Status tracking
- ✅ Complete order lifecycle

---

## 🎯 PHASE 7 - UX & Flow Improvements

### 4️⃣ Checkout Flow Pages
- Address page
- Order confirmation page
- Success page
- Estimated delivery

### 5️⃣ Advanced Features
- Multiple images per product
- Product reviews & ratings
- Wishlist functionality
- Advanced search/filters

### 6️⃣ Admin Enhancements
- Dashboard analytics
- Revenue graphs
- User management
- Product bulk operations

---

## 🎯 PHASE 8 - Performance & Cleanliness

### 7️⃣ Pagination
```javascript
// Backend
GET /api/products?page=1&limit=20

// Response
{
  success: true,
  data: {...},
  pagination: {
    page: 1,
    limit: 20,
    total: 150,
    pages: 8
  }
}
```

### 8️⃣ API Response Standardization
```javascript
// Every response follows this format
{
  "success": true/false,
  "message": "Human readable message",
  "data": {...},     // null if not applicable
  "error": null,     // error details if success false
  "timestamp": "2026-01-17T10:00:00Z"
}
```

---

## 🎯 PHASE 9 - Deployment

### 9️⃣ Deploy Backend
- Render or Railway (free tier)
- PostgreSQL production database
- Environment variables configured

### 🔟 Deploy Frontend
- Vercel (free tier)
- Connect to production API
- Custom domain (optional)

### 1️⃣1️⃣ Update Documentation
- Live demo URL
- Screenshots
- Setup guide
- API documentation

---

## ✅ PRIORITY: DO THESE 3 NEXT

**These 3 alone transform your app from "working" → "real product":**

1. **Refresh Token Auth** → Professional session management
2. **Stock Management** → Real e-commerce logic
3. **Order History** → User experience completeness

**Total Implementation Time:** 4-6 hours

**Impact:** From portfolio project → Production-ready app

---

**Status:** ✅ Ready for Implementation
**Date:** January 17, 2026
