# Setting Up Vercel KV for Persistent Video Storage

Currently, the app uses in-memory storage as a fallback, which means videos are lost when the serverless function restarts. To enable persistent storage across all devices and browsers, you need to set up Vercel KV (Redis).

## Steps to Set Up Vercel KV

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Navigate to your project: `asusuigboweb`

2. **Create a KV Database**
   - Go to the **Storage** tab in your project
   - Click **Create Database**
   - Select **KV** (Redis)
   - Choose a name (e.g., `igbo-videos-kv`)
   - Select a region closest to your users
   - Click **Create**

3. **Link the KV Database to Your Project**
   - After creating the database, Vercel will automatically link it
   - The environment variables will be automatically configured

4. **Verify Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - You should see:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`
   - These are automatically set by Vercel

5. **Redeploy Your Application**
   - After setting up KV, trigger a new deployment
   - You can do this by pushing a new commit or manually redeploying from the Vercel dashboard

## How It Works

- **With Vercel KV**: Videos are stored in Redis and persist across all devices, browsers, and deployments
- **Without Vercel KV**: Videos are stored in memory (fallback mode) and are lost when the serverless function restarts

## Testing

After setup, test by:
1. Adding a video through the admin dashboard
2. Opening the site in a different browser or device
3. The video should appear on all devices

## Free Tier Limits

Vercel KV free tier includes:
- 256 MB storage
- 30,000 commands per day
- Perfect for small to medium applications

For more information, visit: https://vercel.com/docs/storage/vercel-kv

