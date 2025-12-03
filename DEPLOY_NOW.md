# 🚀 DEPLOY NOW - Railway & Vercel Setup

Your code is on GitHub! Now let's deploy it. Follow these exact steps.

---

## PART 1: Deploy Backend to Railway (5 minutes)

### Step 1: Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Login"** → Select **"Continue with GitHub"**
3. Click **"Authorize Railway"**
4. You're in! ✅

### Step 2: Create New Project

1. In Railroad dashboard, click **"Create New Project"**
2. Select **"Provision PostgreSQL"**
3. Wait 1-2 minutes for database to create

### Step 3: Add Your GitHub Repository

1. Click **"New"** → **"From GitHub Repo"**
2. Search for and click **`polished-prompt`**
3. Click **"Deploy Now"**
4. Railroad will auto-detect Node.js and start building

### Step 4: Set Environment Variables

While it's building, set up the environment:

1. In your project, click on the **"Variables"** tab
2. Add these variables **exactly**:

```
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/railway
SESSION_SECRET=super-secret-key-make-this-really-long-32-characters-minimum
REPL_ID=railway-prod
NODE_ENV=production
PORT=5000
```

**For DATABASE_URL:**
1. Click on your **PostgreSQL** service (in the same project)
2. Go to **"Variables"** tab  
3. Copy the entire value next to `DATABASE_URL`
4. Paste it into your backend service's DATABASE_URL variable

### Step 5: Verify Deployment

1. Once the build finishes, click on your backend service
2. Look for a public URL (like: `https://polished-prompt-prod.up.railway.app`)
3. **Copy this URL** - you'll need it for Vercel!
4. Check the logs - should say "serving on port 5000"

---

## PART 2: Deploy Frontend to Vercel (5 minutes)

### Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → Select **"Continue with GitHub"**
3. Click **"Authorize"**
4. You're in! ✅

### Step 2: Import Your Repository

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find and click **`polished-prompt`**
3. Click **"Import"**

### Step 3: Configure Build Settings

Vercel should auto-detect, but verify:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/client`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

**IMPORTANT!** Before clicking Deploy:

1. Click on **"Environment Variables"**
2. Add this variable:

```
Name: VITE_API_URL
Value: https://YOUR-RAILWAY-URL.up.railway.app
```

Replace `YOUR-RAILWAY-URL` with the actual URL you got from Railway (e.g., `polished-prompt-prod`)

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait for the build to finish (usually 2-3 minutes)
3. You'll get a live URL like: `https://polished-prompt.vercel.app` ✅

---

## ✅ Verify Everything Works

1. Open your Vercel URL in a browser
2. You should see your app!
3. Open DevTools (F12) → **"Network"** tab
4. Try to interact with the app
5. Verify API requests go to your Railway backend

---

## 🎉 Your App is Live!

- **Frontend**: `https://your-vercel-project.vercel.app`
- **Backend**: `https://your-railway-project.up.railway.app`
- **Database**: PostgreSQL on Railway

---

## 📝 Quick Reference

### Railway Dashboard
- View logs: Click service → "Logs"
- Change environment variables: Click service → "Variables"
- View database: Click PostgreSQL service

### Vercel Dashboard
- View deployments: Project → "Deployments"
- Change environment: Project → "Settings" → "Environment Variables"
- View logs: Click deployment → "Logs"

---

## ⚠️ If Something Goes Wrong

### "Repository not found" error
→ Make sure repo is public on GitHub and you authorized both services

### "DATABASE_URL is not set" error
→ Check Railway environment variables are set correctly

### "Cannot find module" error during build
→ Run `npm run check` locally to catch TypeScript errors

### API calls return 404
→ Verify `VITE_API_URL` is set correctly in Vercel

### Database errors
→ Make sure PostgreSQL service is in the same Railway project

---

## 🚀 Next Steps

1. Go to https://railway.app → Deploy backend
2. Go to https://vercel.com → Deploy frontend
3. Test your live app!
4. Share with friends!

**You've got this!** 💪
