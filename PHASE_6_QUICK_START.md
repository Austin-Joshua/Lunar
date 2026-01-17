# 🚀 PHASE 6 - QUICK START GUIDE

## What's Done ✅

**Backend infrastructure for production-ready authentication:**
- Refresh token system (7-day sessions)
- Short-lived access tokens (15 min)
- Token revocation & logout all
- Database schema ready
- API endpoints ready

## New API Endpoints

```
✅ POST /api/auth/login
   Returns: accessToken, refreshToken, expiresIn, user

✅ POST /api/auth/register  
   Returns: accessToken, refreshToken, expiresIn, user

✅ POST /api/auth/refresh-token
   Body: { refreshToken }
   Returns: accessToken, expiresIn

✅ POST /api/auth/logout
   Body: { refreshToken }
   
✅ POST /api/auth/logout-all (protected)
   Returns: Success message
```

## What's Next (Frontend - 3 Priority Tasks)

### 1️⃣ Update API Client (20 min)
**File:** `Frontend/src/services/apiClient.ts`

Add auto-refresh on 401:
```typescript
if (response.status === 401) {
  // Refresh token
  // Retry request
  // If fails, logout
}
```

### 2️⃣ Update Auth Context (15 min)
**File:** `Frontend/src/context/AuthContext.tsx`

Store both tokens:
```typescript
localStorage.setItem('accessToken', response.accessToken);
localStorage.setItem('refreshToken', response.refreshToken);
```

Update login handler:
```typescript
const login = (user, accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  // ...
};
```

### 3️⃣ Create Order History Page (45 min)
**File:** `Frontend/src/pages/OrderHistory.tsx`

Features:
- Display user's orders
- Show order status
- Expandable order details
- Format prices with INR

## Database Migration

Run in MySQL to create new tables:

```bash
mysql -u root -p lunar_db < Backend/database/schema.sql
```

Or manually:

```sql
USE lunar_db;

-- Create refresh_tokens table
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
  INDEX idx_token (token)
);

-- Create stock_logs table
CREATE TABLE IF NOT EXISTS stock_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  order_id INT,
  quantity_change INT NOT NULL,
  reason VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

## Testing Checklist

After implementation:

- [ ] Login works with new response format
- [ ] Both tokens stored in localStorage
- [ ] Page refresh keeps user logged in
- [ ] Token auto-refreshes on 401
- [ ] Logout clears tokens
- [ ] Logout all revokes all tokens
- [ ] Order history page loads
- [ ] Orders display correctly

## Key Security Features

✅ **Access Token:** 15 minutes (compromised token = 15 min max exposure)
✅ **Refresh Token:** 7 days (stored in DB, can revoke)
✅ **Auto-Refresh:** Seamless UX, no sudden logouts
✅ **Logout Control:** Revoke tokens, logout all devices

## Files to Review

📄 **PRODUCTION_ROADMAP.md** - Full roadmap for Phases 6-9
📄 **PHASE_6_IMPLEMENTATION_GUIDE.md** - Detailed implementation steps
📄 **PHASE_6_SUMMARY.md** - What's been done & what's next

## Documentation

**Token Controller:** See `Backend/controllers/token.controller.js` for API docs
**Token Model:** See `Backend/models/token.model.js` for database operations
**Auth Controller:** See `Backend/controllers/auth.controller.js` for login/register

## Timeline

| Task | Estimate | Status |
|------|----------|--------|
| API Client Update | 20 min | ⏳ Next |
| Auth Context Update | 15 min | ⏳ Next |
| Order History Page | 45 min | ⏳ Next |
| Stock Management | 1 hour | 📋 Backlog |
| Testing & Debugging | 30 min | 📋 Backlog |
| Git Commit & Push | 5 min | 📋 Backlog |

**Total Frontend Implementation: ~2 hours**

## Common Issues & Fixes

### Issue: "Cannot refresh token"
**Fix:** Ensure refresh_tokens table exists in database

### Issue: "Token already exists"
**Fix:** Clean old tokens: `DELETE FROM refresh_tokens WHERE expires_at < NOW();`

### Issue: "401 error persists"
**Fix:** Check if accessToken is being sent in Authorization header

## Next Phases (After Phase 6)

- **Phase 7:** Checkout flow, product images, reviews
- **Phase 8:** Pagination, API standardization
- **Phase 9:** Deployment to production

## Questions?

Refer to:
- `PHASE_6_IMPLEMENTATION_GUIDE.md` for detailed steps
- `PRODUCTION_ROADMAP.md` for architecture
- Code comments in `token.controller.js`

---

**Backend Status:** ✅ 100% Complete
**Frontend Status:** ⏳ Ready for Implementation
**Overall Phase 6:** 30% Complete

Let's get to frontend implementation! 🚀
