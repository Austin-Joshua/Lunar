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

## 📂 Project structure

```
Lunar/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/       # API calls (fetch-based client)
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── admin/          # Admin UI (pages, components, services)
│   │   ├── modules/        # Gender/category sections
│   │   └── types/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── cmd/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
├── Database/
│   ├── firebase-config/    # Service account JSON (local; see README inside)
│   ├── firestore-rules/    # firestore.rules for console deployment
│   ├── schema-description.md
│   └── schema/             # Legacy SQL reference only (optional)
│
├── README.md
└── .env                    # Create from .env.example (gitignored)
```

---

## 🚀 Quick start

### Prerequisites

- **Go 1.21+** (see `Backend/go.mod` for the toolchain used in this repo)
- **Node.js 18+**
- **Firebase project** with Firestore enabled
- **Service account JSON** (Admin SDK)

### Environment

1. Copy `.env.example` to `.env` at the **repository root**.
2. Set `JWT_SECRET`, `FIREBASE_SERVICE_ACCOUNT` (path to your JSON), and optionally `VITE_API_BASE_URL` / `CORS_ORIGIN`.
3. Place the service account file under `Database/firebase-config/` (see `Database/firebase-config/README.md`).

The Go server loads `../.env` then `Backend/.env` when started from `Backend/`. Vite is configured with `envDir` pointing at the repo root so `VITE_*` variables load from the same `.env`.

### Database (Firebase)

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Cloud Firestore**.
3. Deploy rules from `Database/firestore-rules/firestore.rules` (or paste into the Firestore Rules editor). The app uses the **Admin SDK** on the server; these rules keep accidental client SDK access locked down.
4. Collections and fields are documented in `Database/schema-description.md`.

### Backend

```bash
cd Backend
go mod download
go run ./cmd/main.go
```

Default API: `http://localhost:5000` (override with `PORT`). Health check: `GET /health`.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Dev server: `http://localhost:5173` (see `Frontend/vite.config.ts`).

### Windows helper

`START_SERVERS.ps1` offers shortcuts to run the API, the Vite app, copy `.env.example`, or hit `/health`.

---

## 📡 HTTP API

Base path for JSON APIs: **`/api`**. Unless noted, successful JSON responses follow:

`{ "success": true, "message": string, "data": ..., "timestamp": RFC3339 }`

Protected routes expect header: `Authorization: Bearer <accessToken>`.

### Auth — `/api/auth`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | — | Body: `{ "name", "email", "password" }`. Returns tokens + user. |
| POST | `/login` | — | Body: `{ "email", "password" }`. |
| POST | `/refresh-token` | — | Body: `{ "refreshToken" }`. |
| POST | `/logout` | — | Body: `{ "refreshToken" }` (revokes refresh token). |
| GET | `/profile` | User | Current user profile. |
| POST | `/logout-all` | User | Revoke all refresh tokens for user. |

Token payload in `data` includes `accessToken`, `refreshToken`, `expiresIn`, and `user` (see `Backend/services/auth_service.go` / `models`).

### Products — `/api/products`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/search?q=...` | — | Search products. |
| GET | `?limit=&page=` | — | Paginated list. |
| GET | `/:gender/:category` | — | By gender and category slug. |
| GET | `/:gender` | — | By gender (or disambiguated by handler). |
| GET | `/id/:id` | — | Single product. |
| POST | `/` | Admin | Create product. |
| PUT | `/id/:id` | Admin | Update product. |
| DELETE | `/id/:id` | Admin | Delete product. |

### Orders — `/api/orders`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/my-orders` | User | Orders for authenticated user. |
| GET | `/:id` | User | Order by ID (ownership enforced in service layer). |
| POST | `/` | User | Create order. Body: `{ "items": [ { "productId", "quantity", "price" } ] }`. |
| GET | `/` | Admin | All orders. |
| PUT | `/:id/status` | Admin | Update status. |

### Categories — `/api/categories`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | — | All categories. |
| GET | `/:gender` | — | Categories for gender. |
| POST | `/` | Admin | Create category. |

### Users — `/api/users`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | Admin | List users. |

### Notifications — `/api/notifications`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/send` | Admin | Body: `{ "token", "title", "body" }`. FCM enqueue (response shape is handler-specific). |

### Admin stats — `/api/admin/stats`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/admin/stats` | Admin | Dashboard aggregates: users, products, orders, revenue. |

---

## ✅ Testing and validation

- **Backend:** `go run ./cmd/main.go` then `GET http://localhost:5000/health`.
- **Frontend:** `cd Frontend && npm run test` (Vitest).
- **Manual:** Register → browse → cart → checkout → admin login → products/orders/users flows.

---

## 🚢 Production notes

| Layer | Suggested host |
|--------|----------------|
| Frontend | Vercel / Netlify (build: `npm run build`, output `Frontend/dist`) |
| Backend | Railway / Render / Fly.io (container or native Go; set env vars) |
| Database | Firebase (Firestore + optional FCM) |

Set `CORS_ORIGIN` to your deployed frontend URL (comma-separated for multiple origins). Use a strong `JWT_SECRET` and never commit the service account JSON.

---

## 🔒 Security features

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

**Last Updated:** April 9, 2026
**Version:** 3.0.0 (Firebase Migration)
**Status:** Production Ready ✅

Made with ❤️ for amazing e-commerce experience! 🌙✨
