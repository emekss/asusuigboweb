# Quick Start - Deploy to Vercel

## 🚀 Fastest Way to Deploy

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect settings (Vite framework)
5. Click **"Deploy"**

### Step 3: Access Your Site
- **Main Website**: `https://your-project.vercel.app`
- **Admin Dashboard**: `https://your-project.vercel.app/admin`

That's it! Your site is live in ~2 minutes.

---

## 📋 What's Included

✅ **Main Website Routes:**
- `/` - Home page
- `/about` - About page  
- `/videos` - Videos page
- `/learn-our-story` - Learn Our Story page
- `/contact` - Contact page

✅ **Admin Dashboard:**
- `/admin` - Manage videos (add, edit, delete)

✅ **Configuration Files:**
- `vercel.json` - Vercel deployment config (already created)
- All routes configured for SPA routing

---

## ⚠️ Important Note About Videos

The admin dashboard uses **localStorage** to store videos. This means:
- Videos are stored in each browser
- Perfect for testing
- For production, consider a backend database

**To test:**
1. Visit `/admin` on your deployed site
2. Add a video
3. Visit `/videos` to see it

---

## 🔧 Build Settings (Auto-detected by Vercel)

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (default)

---

## 📝 Next Steps After Deployment

1. ✅ Test all pages work
2. ✅ Test admin dashboard at `/admin`
3. ✅ Add a test video
4. ✅ Verify it appears on `/videos`
5. ✅ (Optional) Add custom domain in Vercel settings

---

## 🆘 Need Help?

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

