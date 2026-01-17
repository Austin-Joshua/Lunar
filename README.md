# 🌙 LUNAR - E-Commerce Fashion Store

A full-stack e-commerce platform built with React, Node.js, and MySQL. Perfect for fashion retail with men's, women's, and kids' categories.

## ✨ Features

### 🛍️ Shopping
- Browse products by gender (Men, Women, Kids) and subcategories
- View detailed product information
- Add/remove items from cart
- Persistent cart (localStorage)
- Checkout and order placement

### 👤 User Management
- User registration and authentication
- JWT token-based security
- Password hashing with bcryptjs
- User profile management
- Dark mode toggle
- Order history tracking

### 🔐 Security
- Secure JWT authentication (15 min access, 7 day refresh tokens)
- Password hashing with bcryptjs
- CORS protection
- Input validation on frontend and backend
- Role-based access control (User/Admin)

### 👨‍💼 Admin Features
- Admin dashboard with analytics
- Product management
- Order management and tracking
- User management
- Order status updates

### 🌍 Localization
- India localization (default)
- INR currency formatting
- Multi-country support ready

### 🎨 UI/UX
- Responsive design (mobile, tablet, desktop)
- Dark/Light mode toggle
- Loading states and error handling
- Smooth animations
- Professional Tailwind CSS styling

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- npm or yarn

### Installation

**1. Clone Repository**
```bash
git clone https://github.com/Austin-Joshua/Lunar.git
cd Lunar
```

**2. Backend Setup**
```bash
cd Backend
npm install

# Create .env file with:
# PORT=5000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=123456
# DB_NAME=lunar_db
# JWT_SECRET=lunar_jwt_secret_key_2024
# NODE_ENV=development
# CORS_ORIGIN=http://localhost:5173

# Initialize database
node scripts/init-db.js

# Start backend
npm run dev
# Backend runs on http://localhost:5000
```

**3. Frontend Setup (New Terminal)**
```bash
cd Frontend
npm install

# Start frontend
npm run dev -- --force
# Frontend runs on http://localhost:5173
```

**4. Open Browser**
```
Go to: http://localhost:5173
```

---

## 🔐 Login Credentials

### Admin Account
```
Email: admin@lunar.com
Password: admin123456
```

### User Account
```
Email: user@lunar.com
Password: user123456
```

### Register New Account
```
Go to: http://localhost:5173/register
Fill in your details and create account
```

---

## 📂 Project Structure

```
Lunar/
├── Backend/
│   ├── config/          # Database & OAuth config
│   ├── controllers/     # Route handlers
│   ├── routes/          # API endpoints
│   ├── models/          # Database models
│   ├── middleware/      # Auth, validation, error handling
│   ├── database/        # Schema and seed files
│   ├── scripts/         # Utility scripts
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point
│   ├── package.json     # Dependencies
│   └── .env             # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── modules/     # Category modules
│   │   ├── context/     # React Context (Auth, Cart, Theme)
│   │   ├── services/    # API client
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utilities and constants
│   │   ├── hooks/       # Custom React hooks
│   │   ├── ui/          # UI component library
│   │   ├── App.tsx      # Root component
│   │   └── main.tsx     # Entry point
│   ├── index.html       # HTML template
│   ├── package.json     # Dependencies
│   ├── vite.config.ts   # Vite configuration
│   └── tailwind.config.ts # Tailwind configuration
│
└── README.md            # This file
```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register       - Create new account
POST   /api/auth/login          - Login user
POST   /api/auth/refresh-token  - Refresh access token
POST   /api/auth/logout         - Logout user
GET    /api/auth/profile        - Get user profile
```

### Products
```
GET    /api/products            - Get all products
GET    /api/products/:gender    - Get products by gender
GET    /api/products/:id        - Get product details
POST   /api/products            - Create product (admin)
PUT    /api/products/:id        - Update product (admin)
DELETE /api/products/:id        - Delete product (admin)
```

### Orders
```
POST   /api/orders              - Create order
GET    /api/orders/my-orders    - Get user's orders
GET    /api/orders/:id          - Get order details
PUT    /api/orders/:id/status   - Update order status (admin)
GET    /api/orders              - Get all orders (admin)
```

### Users
```
GET    /api/users               - Get all users (admin)
GET    /api/users/:id           - Get user details (admin)
PUT    /api/users/:id           - Update user (admin)
DELETE /api/users/:id           - Delete user (admin)
```

---

## 🗄️ Database Schema

**7 Tables:**
1. `users` - User accounts & authentication
2. `categories` - Product categories
3. `products` - Product catalog
4. `orders` - Customer orders
5. `order_items` - Order line items
6. `tokens` - Token management
7. `refresh_tokens` - Refresh token storage

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemon** - Development tool

### DevOps
- **Git** - Version control
- **GitHub** - Repository hosting
- **npm** - Package manager

---

## 📝 Configuration

### Environment Variables

**Backend (.env)**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=lunar_db
JWT_SECRET=lunar_jwt_secret_key_2024
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy automatically
```

### Backend (Railway/Render)
```bash
1. Push code to GitHub
2. Connect repo to Railway/Render
3. Set environment variables
4. Deploy automatically
```

### Database (Railway MySQL)
```bash
1. Create MySQL service
2. Update connection string
3. Run schema.sql
4. Deploy
```

---

## 📊 Key Features Breakdown

### Authentication Flow
1. User registers with email/password
2. Password hashed with bcryptjs
3. User stored in database
4. JWT tokens generated (access + refresh)
5. Tokens stored in localStorage
6. Auto-login on page refresh (if token valid)
7. Token refresh on expiry (15 min)

### Shopping Flow
1. Browse products by category
2. Add items to cart (localStorage)
3. View cart and update quantities
4. Proceed to checkout
5. Place order
6. Order stored in database
7. View order history

### Admin Flow
1. Login with admin credentials
2. Access admin dashboard
3. Manage products (create, edit, delete)
4. View all orders
5. Update order status
6. View analytics

---

## 🐛 Troubleshooting

### Backend won't start
```
1. Check MySQL is running
2. Verify .env file exists and is correct
3. Run: node scripts/init-db.js to initialize database
4. Check port 5000 is not in use
5. Restart: npm run dev
```

### Frontend shows blank page
```
1. Check browser console for errors (F12)
2. Verify backend is running on port 5000
3. Check frontend .env has correct API URL
4. Restart: npm run dev -- --force
```

### "Failed to fetch" error
```
1. Backend not running - start backend server
2. Wrong API URL - check Frontend/.env
3. CORS issue - check Backend CORS config
4. Network issue - check firewall
```

### Database connection error
```
1. MySQL not running - start MySQL service
2. Wrong credentials - check Backend/.env
3. Database doesn't exist - run: node scripts/init-db.js
4. Port 3306 in use - change port in .env
```

---

## 📚 Scripts

### Backend Scripts
```bash
npm run dev         # Start development server with nodemon
npm run seed:admin  # Seed admin user
npm run seed:users  # Seed test users
node scripts/init-db.js  # Initialize database
```

### Frontend Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## 🔒 Security Features

✅ Password hashing with bcryptjs
✅ JWT token authentication
✅ Refresh token rotation
✅ Token expiry (access: 15 min, refresh: 7 days)
✅ CORS protection
✅ Input validation and sanitization
✅ SQL injection prevention (prepared statements)
✅ XSS protection
✅ Error handling without exposing sensitive info
✅ Role-based access control

---

## 📈 Performance

✅ Optimized database queries with indexes
✅ Connection pooling (MySQL)
✅ Lazy loading components (React)
✅ Code splitting with Vite
✅ Minified production builds
✅ Responsive images
✅ Caching strategies

---

## 🤝 Contributing

This is a learning project. Feel free to fork and modify!

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

## 🙋 Support

For issues or questions:
1. Check troubleshooting section above
2. Review Backend/README.md
3. Review Frontend/README.md
4. Check GitHub issues

---

## 🎯 Next Steps

- [ ] Add payment gateway (Stripe/PayPal)
- [ ] Add product reviews and ratings
- [ ] Implement advanced search
- [ ] Add inventory management
- [ ] Email notifications
- [ ] Push notifications
- [ ] Social media integration
- [ ] Analytics dashboard

---

## 📞 Quick Links

```
Frontend:       http://localhost:5173
Login:          http://localhost:5173/login
Register:       http://localhost:5173/register
Admin:          http://localhost:5173/admin
Backend API:    http://localhost:5000/api
Health Check:   http://localhost:5000/health
GitHub:         https://github.com/Austin-Joshua/Lunar
```

---

## ✅ Checklist for First Time

- [ ] Clone repository
- [ ] Install backend dependencies: `cd Backend && npm install`
- [ ] Install frontend dependencies: `cd Frontend && npm install`
- [ ] Create Backend/.env with database credentials
- [ ] Initialize database: `node scripts/init-db.js`
- [ ] Start backend: `npm run dev` (in Backend folder)
- [ ] Start frontend: `npm run dev --force` (in Frontend folder, new terminal)
- [ ] Go to http://localhost:5173
- [ ] Register or login
- [ ] Start shopping!

---

**Last Updated:** January 17, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅

Made with ❤️ for amazing e-commerce experience! 🌙✨
