# Deployment Guide (Frontend on Vercel + Backend on Render)

This guide covers deploying **Fabricate Frontend** on **Vercel** and connecting it with **Fabricate Backend** deployed on **Render**.

---

## 1. Deploying Frontend to Vercel

1. Push your latest code in `Fabricate-Frontend` to GitHub.
2. Log in to [Vercel](https://vercel.com/dashboard).
3. Click **Add New...** -> **Project** and import `Fabricate-Frontend`.
4. Framework Preset: **Vite**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com` (Your Render backend URL, no trailing slash).
6. Click **Deploy**.

---

## 2. Deploying Backend to Render

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Create **New Web Service** pointing to `Fabricate-Backend` repo.
3. Configure settings:
   - **Runtime**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/Fabricate-0.0.1-SNAPSHOT.jar`
4. Set Environment Variables:
   - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://<neon-db-host>/neondb?sslmode=require`
   - `SPRING_DATASOURCE_USERNAME` = `neondb_owner`
   - `SPRING_DATASOURCE_PASSWORD` = `<your-password>`
   - `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app,http://localhost:5174`
   - `JWT_SECRET` = `<your-jwt-secret>`
5. Click **Create Web Service**.

---

## 3. SPA Route Support (`vercel.json`)
The `vercel.json` file in the frontend root contains rewrite rules so React Router subpages reload without 404s:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
