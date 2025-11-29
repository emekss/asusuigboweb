# Deployment Guide - Vercel

This guide will help you deploy your Asusuigboamaka website to Vercel, including both the main website and the admin dashboard.

## Prerequisites

1. A GitHub account
2. A Vercel account (free tier works perfectly)
3. Your code pushed to a GitHub repository

## Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Vercel deployment"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in (you can use your GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Configure Build Settings** (usually auto-detected)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production deployment: `vercel --prod`

## Important Notes

### Admin Dashboard Access

- The admin dashboard is part of the same application
- Access it at: `your-domain.com/admin`
- No separate deployment needed
- Example: If your site is `asusuigboamaka.vercel.app`, the admin is at `asusuigboamaka.vercel.app/admin`

### Routes Available

- `/` - Home page
- `/about` - About page
- `/videos` - Videos page (displays YouTube videos)
- `/learn-our-story` - Learn Our Story page
- `/contact` - Contact page
- `/admin` - Admin dashboard (for managing videos)

### Data Storage

⚠️ **Important**: The current implementation uses `localStorage` for storing videos. This means:
- Videos are stored in each user's browser
- Videos added in the admin dashboard will only appear for that browser session
- For production use, consider migrating to a backend database

**For testing purposes**, localStorage works fine. To test:
1. Go to `/admin` on your deployed site
2. Add videos
3. Navigate to `/videos` to see them

### Custom Domain

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

Currently, no environment variables are required. If you add features like:
- API keys
- Database connections
- Authentication

You can add them in Vercel Dashboard → Settings → Environment Variables

## Build Verification

Before deploying, test the build locally:

```bash
npm run build
npm run preview
```

This will:
1. Build the production version
2. Start a preview server
3. Let you test the production build locally

## Troubleshooting

### Routes not working (404 errors)
- Ensure `vercel.json` is in your project root
- The rewrite rule should handle all routes

### Build fails
- Check Node.js version (Vercel uses Node 18+ by default)
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Admin dashboard not accessible
- Make sure you're accessing `/admin` (not `/admin/`)
- Check browser console for errors
- Verify the route is added in `App.tsx`

## Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify admin dashboard is accessible
- [ ] Test adding/editing/deleting videos in admin
- [ ] Check videos appear on `/videos` page
- [ ] Test navigation links
- [ ] Verify mobile responsiveness
- [ ] Test contact form (if backend is added later)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Test build locally first
3. Verify all files are committed to Git
4. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)

---

**Your site is now live! 🎉**

Access your admin dashboard at: `https://your-domain.vercel.app/admin`

