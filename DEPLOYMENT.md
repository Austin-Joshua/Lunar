# 🚀 Deploying LUNAR to Production

This guide explains how to deploy the LUNAR project (Go Backend + Vite Frontend) to cloud platforms.

## 1. Backend (Go) - Recommended: [Render](https://render.com)

1. **Create Web Service**: Connect your GitHub repo.
2. **Environment**: `Go`
3. **Build Command**: `cd Backend && go build -o main ./cmd/main.go`
4. **Start Command**: `./Backend/main`
5. **Environment Variables**:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `PORT` | `5000` | Render will assign this, but you can set a default. |
   | `CORS_ORIGIN` | `https://your-frontend.vercel.app` | Your production frontend URL. |
   | `JWT_SECRET` | `your-long-random-string` | Secret for auth tokens. |
   | `FIREBASE_SERVICE_ACCOUNT_JSON` | `{...}` | Copy the **entire JSON** content of your Firebase service account file here. |

---

## 2. Frontend (Vite/React) - Recommended: [Vercel](https://vercel.com)

1. **New Project**: Connect your GitHub repo.
2. **Root Directory**: Select `Frontend`.
3. **Framework Preset**: `Vite`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://your-api.onrender.com/api` | Your production backend URL. |

---

## 3. Deployment Checklist
- [ ] Backend is live and `https://.../health` returns 200.
- [ ] Frontend `VITE_API_BASE_URL` points to the *live* backend URL.
- [ ] Backend `CORS_ORIGIN` matches the *live* frontend URL.
- [ ] Firebase Service Account JSON is correctly pasted into the backend environment variables.

---

## Local Development vs. Production
- **Local**: Uses `.env` at the repository root. Variables like `FIREBASE_SERVICE_ACCOUNT` (path) are used.
- **Production**: Uses environment variables set in the dashboard. `FIREBASE_SERVICE_ACCOUNT_JSON` is prioritized over the path.
