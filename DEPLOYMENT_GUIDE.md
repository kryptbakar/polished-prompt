# Deployment Guide: Railway + Vercel

This guide walks you through deploying the PolishedPrompt application to Railway (backend + database) and Vercel (frontend).

## Prerequisites

- GitHub account (free)
- Railway account (free tier available at https://railway.app)
- Vercel account (free tier available at https://vercel.com)

---

## Step 1: Prepare Your GitHub Repository

### 1.1 Push to GitHub

If your repo isn't on GitHub yet:

```bash
# Add GitHub remote
git remote remove origin  # (if exists)
git remote add origin https://github.com/YOUR_USERNAME/polished-prompt.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 1.2 Update .gitignore

Ensure `.env.local` and `.env` are ignored:

```bash
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Update gitignore"
git push
```

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub (easier)
3. Authorize Railway to access your GitHub

### 2.2 Create PostgreSQL Database on Railway

1. Go to your Railway dashboard
2. Click **"Create New Project"**
3. Select **"Database"** → **"PostgreSQL"**
4. Wait for the database to provision (2-3 minutes)
5. Copy the connection details (you'll need these)

### 2.3 Deploy Express Backend

1. In Railway dashboard, click **"Create New"** → **"From GitHub Repo"**
2. Select your repository: `polished-prompt`
3. Railway will auto-detect it's a Node.js project

### 2.4 Set Environment Variables on Railway

In the Railway dashboard for your app:

1. Go to **Variables** tab
2. Add these environment variables:

```
DATABASE_URL=postgresql://postgres:password@host:5432/railway
SESSION_SECRET=your-random-super-secret-key-here-make-it-long-123456789
REPL_ID=railway-production
ISSUER_URL=https://replit.com/oidc
NODE_ENV=production
```

**Get DATABASE_URL from your Railway PostgreSQL service:**
- Click on your PostgreSQL service in the project
- Go to **Variables** tab
- Copy the `DATABASE_URL` value

### 2.5 Run Database Migrations

After deployment, you need to push your database schema:

1. In Railway dashboard, open your backend service
2. Click the **Deploy** button to trigger a new deployment
3. The build will run `npm run build && npm run start`
4. Check logs to ensure `npm run db:push` runs (update if needed)

**Alternative:** You can run migrations manually using Railway's CLI or by modifying your deployment script.

### 2.6 Get Your Railway URL

Once deployed:
1. Go to your Railway backend service
2. Click **"View Logs"** or **"Settings"**
3. Find your deployment URL (something like: `https://polished-prompt-prod.up.railway.app`)
4. **Copy this URL** - you'll need it for Vercel

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repos

### 3.2 Deploy Frontend

1. In Vercel dashboard, click **"Add New Project"**
2. Select your GitHub repository: `polished-prompt`
3. Vercel will auto-detect the Vite configuration

### 3.3 Configure Build Settings

In Vercel's project settings:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/client`
- **Install Command**: `npm install`

### 3.4 Add Environment Variables

In Vercel, go to **Settings** → **Environment Variables**:

```
VITE_API_URL=https://your-railway-app.up.railway.app
```

Replace `https://your-railway-app.up.railway.app` with your actual Railway URL from Step 2.6

### 3.5 Deploy

1. Click **Deploy**
2. Vercel will build and deploy automatically
3. Your app will be live at a URL like: `https://polished-prompt.vercel.app`

---

## Step 4: Connect Frontend to Backend

### 4.1 Update vercel.json

Edit `vercel.json` and replace:

```json
"destination": "https://your-railway-app.up.railway.app/api/:path*"
```

With your actual Railway URL.

### 4.2 Verify API Connection

1. Go to your Vercel app URL
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Try logging in or making an API request
5. Verify requests go to your Railway backend

---

## Troubleshooting

### Database Connection Error

**Problem**: `Error: DATABASE_URL must be set`

**Solution**:
- Verify `DATABASE_URL` is set in Railway environment variables
- Check the format: `postgresql://user:pass@host:port/database`
- Restart the Railway service

### 404 on Frontend Routes

**Problem**: Refreshing a page shows 404

**Solution**: 
- Make sure `vercel.json` is configured correctly
- Vercel should rewrite all routes to `index.html`

### CORS Error

**Problem**: Frontend can't reach backend

**Solution**:
- Make sure `VITE_API_URL` is set correctly in Vercel
- Update the Railway URL in `vercel.json`
- Add CORS headers in `server/app.ts` if needed:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
```

### Build Fails on Railway

**Problem**: Build command fails

**Solution**:
- Check Railway logs for errors
- Verify all dependencies are in `package.json`
- Run `npm run check` locally to catch TypeScript errors

---

## Post-Deployment Checklist

- [ ] PostgreSQL database created on Railway
- [ ] Backend deployed to Railway with correct DATABASE_URL
- [ ] Database migrations applied (`npm run db:push`)
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL set in Vercel
- [ ] API requests working (check DevTools Network)
- [ ] Login/Authentication working
- [ ] Database operations working (create teams, bookings, etc.)

---

## Useful Links

- Railway Dashboard: https://railway.app/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs

---

## Quick Commands

```bash
# Check for build errors
npm run check

# Build locally
npm run build

# View production build
npm start

# Run database migrations
npm run db:push
```

---

**That's it! Your app should now be live on Vercel with a Railway backend.** 🚀
