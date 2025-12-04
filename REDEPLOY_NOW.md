# 🚀 REDEPLOY TO RAILWAY & VERCEL

Quick guide to redeploy your updated application with authentication fixes.

---

## ✅ STEP 1: Commit & Push Changes

Your changes are ready to deploy. Run these commands:

```powershell
cd PolishedPrompt
git add .
git commit -m "Fix authentication and database schema - login now works properly"
git push origin main
```

This will trigger automatic redeployment on both Railway and Vercel!

---

## 🔧 STEP 2: Verify Railway Environment Variables

### Go to Railway Dashboard

1. Visit https://railway.app
2. Click on your project
3. Click on your backend service (usually named "polished-prompt")
4. Go to **Variables** tab

### Required Environment Variables:

Make sure these are set:

```
DATABASE_URL=postgresql://... (from your PostgreSQL service)
SESSION_SECRET=your-secret-key-here (should be long and random)
NODE_ENV=production
PORT=5000
REPL_ID=railway-prod
```

**Important:** If `SESSION_SECRET` is missing or weak, generate a new one:
- Use a long random string (at least 32 characters)
- Example: `my-super-secret-production-key-2025-abc123xyz`

### Get Your Railway Backend URL

1. In Railway, click on your backend service
2. Look at the top for the **Public URL** or **Domain**
3. It should look like: `https://polished-prompt-xxxxx.up.railway.app`
4. **Copy this URL** - you'll need it for Vercel

---

## 🌐 STEP 3: Update Vercel Configuration

### Go to Vercel Dashboard

1. Visit https://vercel.com
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### Update API URL (if Railway URL changed)

If your Railway URL changed, update the `vercel.json` file:

1. In Vercel, go to **Settings** → **Environment Variables**
2. Check if you have `VITE_API_URL` set
3. If not, add it with your Railway URL:
   ```
   VITE_API_URL=https://your-railway-url.up.railway.app
   ```

### Or Update vercel.json Directly

The `vercel.json` file has a hardcoded Railway URL. If your Railway URL changed:

1. Edit `vercel.json` in your project
2. Update line 8 with your new Railway URL:
   ```json
   "destination": "https://YOUR-NEW-RAILWAY-URL.up.railway.app/api/:path*"
   ```
3. Commit and push:
   ```powershell
   git add vercel.json
   git commit -m "Update Railway URL in vercel.json"
   git push
   ```

---

## 🔄 STEP 4: Trigger Redeployment

### Railway (Backend)

Railway should automatically redeploy when you push to GitHub. If not:

1. Go to Railway dashboard
2. Click on your backend service
3. Go to **Deployments** tab
4. Click **"Redeploy"** button

### Vercel (Frontend)

Vercel should automatically redeploy when you push to GitHub. If not:

1. Go to Vercel dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Click the **"..."** menu on the latest deployment
5. Click **"Redeploy"**

---

## ✅ STEP 5: Verify Deployment

### Check Railway Logs

1. In Railway, go to your backend service
2. Click **Logs** tab
3. Look for:
   - ✅ "serving on port 5000"
   - ✅ "Database connected"
   - ❌ No errors about DATABASE_URL or SESSION_SECRET

### Check Vercel Build

1. In Vercel, go to your project
2. Click on the latest deployment
3. Check the build logs for:
   - ✅ "Build completed"
   - ✅ No TypeScript errors
   - ✅ No build failures

### Test Your App

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Click **"Login"** or **"Get Started"**
3. You should be redirected and logged in
4. Check browser console (F12) for any errors

---

## 🐛 Troubleshooting

### Login Still Not Working?

1. **Check Railway Logs:**
   - Look for authentication errors
   - Verify `SESSION_SECRET` is set
   - Check if database connection is working

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for 401 errors on `/api/auth/user`
   - Check if cookies are being set

3. **Verify Session Cookie:**
   - In DevTools → Application → Cookies
   - Look for `connect.sid` cookie
   - Should be set after login

### Database Errors?

1. **Verify DATABASE_URL:**
   - In Railway, check PostgreSQL service
   - Copy the DATABASE_URL
   - Make sure it's set in your backend service

2. **Check Database Migrations:**
   - Railway runs `npm run db:push` on startup
   - Check logs for migration errors
   - Schema should match your code

### Build Fails?

1. **TypeScript Errors:**
   - Run `npm run check` locally
   - Fix any type errors
   - Commit and push

2. **Missing Dependencies:**
   - Check `package.json` has all dependencies
   - Railway/Vercel install from `package.json`

---

## 📝 Quick Reference

### Railway Environment Variables:
```
DATABASE_URL=postgresql://... (from PostgreSQL service)
SESSION_SECRET=long-random-secret-key-here
NODE_ENV=production
PORT=5000
REPL_ID=railway-prod
```

### Vercel Environment Variables (optional):
```
VITE_API_URL=https://your-railway-url.up.railway.app
```

### Important URLs:
- **Railway Dashboard:** https://railway.app
- **Vercel Dashboard:** https://vercel.com
- **Your Railway Backend:** `https://your-app.up.railway.app`
- **Your Vercel Frontend:** `https://your-app.vercel.app`

---

## 🎉 You're Done!

Once deployed:
- ✅ Login should work properly
- ✅ Sessions are saved in database
- ✅ All protected routes require authentication
- ✅ Database schema is updated

**Happy deploying!** 🚀

