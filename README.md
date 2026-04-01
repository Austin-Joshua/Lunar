# 🌙 LUNAR - E-Commerce Fashion Store

A full-stack e-commerce platform rebuilt with **React**, **Golang**, and **Firebase Firestore**. Perfect for fashion retail with men's, women's, and kids' categories.

---

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

### Backend
- **Go 1.25** - Programming language
- **Gin** - Web framework
- **Firebase Admin SDK** - Firestore integration
- **JWT** - Authentication (golang-jwt)
- **bcrypt** - Password hashing (golang.org/x/crypto)

### Database
- **Firebase Firestore** - NoSQL Document Store
- **Firebase Auth** - (Optional integration ready)

---

## ✨ Features

### 🛍️ Shopping
- Browse products by gender (Men, Women, Kids) and categories
- View detailed product information
- Add/remove items from cart
- Persistent cart (localStorage)
- Checkout and order placement
- **Denormalized data** for high-performance reads

### 👤 User Management
- User registration and authentication
- JWT token-based security (15 min access, 7 day refresh)
- Password hashing with bcrypt
- User profile management
- Dark mode toggle
- Order history tracking

### 👨‍💼 Admin Features
- Admin dashboard with real-time analytics
- Product management (CRUD)
- Order management and tracking
- User management
- Order status updates

---

## 📂 Project Structure

```
Lunar/
│
├── Frontend/           # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client (Axios)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── context/     # State management
│   │   ├── types/       # TypeScript definitions
│   │   └── utils/       # Helpers
│   └── package.json
│
├── Backend/            # Go Backend
│   ├── cmd/            # Entry point (main.go)
│   ├── config/         # Firebase initialization
│   ├── controllers/    # API handlers (Renamed from handlers)
│   ├── middlewares/    # Auth, CORS (Renamed from middleware)
│   ├── models/         # Firestore-tagged structures
│   ├── repositories/   # Firestore operations
│   ├── routes/         # API routing
│   ├── services/       # Business logic level
│   ├── utils/          # Shared utilities
│   ├── go.mod          # Dependencies
│   └── .env            # Environment config
│
├── Database/           # Database Documentation
│   └── schema-description.md # Firestore collection structure
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Go 1.21+**
- **Node.js 18+**
- **Firebase Project** with Firestore enabled
- **Service Account Key** (JSON)

### Database Setup (Firebase)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Cloud Firestore** in test mode or production mode.
3. Go to Project Settings > Service Accounts.
4. Click **Generate new private key** and save the JSON file.
5. Place the JSON file in `Backend/config/firebase-service-account.json` (or any path specified in `.env`).

### Backend Setup

```bash
cd Backend
go mod download

# Create/Edit .env file
# Ensure FIREBASE_SERVICE_ACCOUNT points to your JSON file
go run cmd/main.go
# Backend runs on http://localhost:5000
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔒 Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication (Custom implementation)
✅ Refresh token rotation stored in Firestore
✅ Token expiry (access: 15 min, refresh: 7 days)
✅ CORS protection
✅ Input validation
✅ Role-based access control (RBAC)

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

**Last Updated:** April 1, 2026
**Version:** 3.0.0 (Firebase Migration)
**Status:** Production Ready ✅

Made with ❤️ for amazing e-commerce experience! 🌙✨
