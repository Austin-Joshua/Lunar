# Lunar

Fashion e-commerce: **React (Vite)** storefront, **Go** API, **Firebase Firestore** data. Admin tools live under `/admin`.

## Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18, TypeScript, Tailwind CSS, React Router |
| Backend | Go, Gin, Firebase Admin SDK, JWT + bcrypt |
| Data | Cloud Firestore (rules in `Database/firestore-rules/`) |

UI tokens for agents: `Frontend/DESIGN.md`.

## Prerequisites

- Node.js 18+
- Go 1.21+ (see `Backend/go.mod`)
- Firebase project with Firestore enabled
- Service account JSON (Console → Project settings → Service accounts → Generate new private key)

## Configuration

1. Copy `.env.example` to `.env` at the **repository root**.
2. Set **`JWT_SECRET`** (strong random string in production).
3. Set **`FIREBASE_SERVICE_ACCOUNT`** to the path of your JSON file, e.g.  
   `Database/firebase-config/service-account.json`  
   (path is relative to `Backend/` when you run the API from there).  
   Alternatively use **`FIREBASE_SERVICE_ACCOUNT_JSON`** with the raw JSON (common on hosts).
4. Optional: **`CORS_ORIGIN`**, **`VITE_API_BASE_URL`** (defaults suit local dev).

Do not commit `*.json` service account files; they are gitignored.

## Run locally (full stack)

Use **two terminals** from the repo root.

**API (port 5000):**

```bash
cd Backend
go mod download
go run ./cmd/main.go
```

**Web app (port 5173):**

```bash
cd Frontend
npm install
npm run dev
```

- Storefront: [http://localhost:5173](http://localhost:5173)  
- API health: [http://localhost:5000/health](http://localhost:5000/health)  
- Admin login: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

The Go server **requires** valid Firebase credentials; without them the process exits on startup.

On Windows you can use `START_SERVERS.ps1` for guided steps.

## Project layout

```
Lunar/
├── Frontend/          # Vite app (src/, public/)
├── Backend/           # Go API (cmd/, routes/, services/, …)
├── Database/          # Firestore rules, optional SQL reference under schema/
├── .env.example       # Template for root .env
└── README.md
```

## Production (short)

- Build frontend: `cd Frontend && npm run build` → output `Frontend/dist`.
- Run API with the same env vars; set **`CORS_ORIGIN`** to your deployed site origin and **`VITE_API_BASE_URL`** on the frontend to your live **`/api`** base URL.

## Scripts

- Frontend tests: `cd Frontend && npm run test`

## License

MIT
