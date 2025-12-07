# KIUL Website - Deployment Guide

## ✅ Build Status
**Production build successful!** All 26 routes compiled without errors.

## Deployment Options

### Option 1: Vercel (Recommended) ⭐
**Best for Next.js applications - Zero configuration**

#### Steps:
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /Users/adalbertuskamanzi/Desktop/kiul-app
   vercel
   ```
   - Follow the prompts
   - First deployment: Set up new project
   - Subsequent deployments: Just run `vercel`

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

#### Features:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ GitHub integration
- ✅ Preview deployments
- ✅ Free for hobby projects

#### Custom Domain:
After deployment, add custom domain in Vercel dashboard:
- Go to project settings
- Add domain: `kiul.org` or your preferred domain
- Update DNS records as instructed

---

### Option 2: Netlify
**Great alternative with drag-and-drop deployment**

#### Steps:
1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd /Users/adalbertuskamanzi/Desktop/kiul-app
   netlify deploy --prod
   ```

#### Or use Netlify UI:
1. Go to [netlify.com](https://netlify.com)
2. Drag the `.next` folder to deploy
3. Or connect your GitHub repository

---

### Option 3: GitHub Pages (Static Export)
**For static hosting**

#### Configuration:
1. Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
     basePath: '/kiul-app', // If not using custom domain
   };
   ```

2. Build static files:
   ```bash
   npm run build
   ```

3. Deploy `out/` folder to GitHub Pages

---

### Option 4: Self-Hosted VPS (DigitalOcean, AWS, etc.)

#### Requirements:
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx for reverse proxy

#### Steps:
1. **Upload files to server**
   ```bash
   scp -r /Users/adalbertuskamanzi/Desktop/kiul-app user@your-server:/var/www/kiul
   ```

2. **Install dependencies**
   ```bash
   cd /var/www/kiul
   npm install --production
   npm run build
   ```

3. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "kiul-app" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx** (`/etc/nginx/sites-available/kiul`)
   ```nginx
   server {
       listen 80;
       server_name kiul.org www.kiul.org;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable site and restart Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/kiul /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d kiul.org -d www.kiul.org
   ```

---

## Environment Variables

### Required for Production:
Create `.env.production` file:
```env
# OpenAI API Key (for AI features)
OPENAI_API_KEY=your_production_api_key

# Next.js
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://kiul.org
```

### Security Notes:
- Never commit `.env` files to Git
- Use platform-specific secrets management (Vercel Secrets, Netlify Environment Variables)
- Rotate API keys regularly

---

## Pre-Deployment Checklist

- [x] ✅ Production build successful
- [x] ✅ All 26 routes compiled
- [x] ✅ TypeScript checks passed
- [x] ✅ No build errors
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test all routes after deployment
- [ ] Set up monitoring/analytics
- [ ] Configure error tracking (optional: Sentry)

---

## Post-Deployment Testing

After deployment, test these critical paths:
1. Homepage → All sections load correctly
2. About page → Content displays properly
3. Publishing Hub → All 7 subpages accessible
4. Counselling → AI chat functionality works
5. Mentorship → AI chat functionality works
6. Short Courses → Course generation works
7. Contact form → Form submission works
8. Responsive design → Test on mobile/tablet

---

## Monitoring & Analytics

### Recommended Tools:
- **Vercel Analytics** (if using Vercel)
- **Google Analytics 4**
- **Plausible Analytics** (privacy-friendly)
- **Sentry** (error tracking)

---

## Quick Deploy Commands

### Vercel (Fastest):
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Support & Resources

- **Next.js Deployment Docs**: https://nextjs.org/docs/deployment
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com

---

## Build Information

- **Framework**: Next.js 16.0.7 (Turbopack)
- **React**: 19.2.0
- **Build Time**: ~2-3 seconds
- **Routes**: 26 total (23 static, 3 dynamic API routes)
- **Bundle Size**: Optimized for production

---

**Ready to deploy! Choose your preferred platform and follow the steps above.** 🚀
