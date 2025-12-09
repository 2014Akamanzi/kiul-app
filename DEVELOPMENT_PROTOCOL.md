# KIUL App - Development & Deployment Protocol

## Daily Development Workflow

### 1. Opening Your Development Environment

**Step 1: Open VS Code**
```bash
# In Terminal (or press Cmd+Space and type "Terminal")
cd ~/Desktop/kiul-app
code .
```

**Step 2: Start Development Server**
```bash
# In VS Code terminal (View → Terminal or Ctrl+`)
npm run dev
```
Your app will run at: http://localhost:3000

**Step 3: Access GitHub Copilot Chat**
- In VS Code, click the chat icon in the sidebar (💬)
- Or press `Cmd+Shift+I` (Mac) / `Ctrl+Shift+I` (Windows)
- Start asking questions about your code

---

## Making Changes to Your App

### Development Process

1. **Make your changes** in VS Code
   - Edit files as needed
   - Test locally at http://localhost:3000
   - GitHub Copilot can help with code suggestions

2. **Check for errors**
   - Look at VS Code Problems panel (bottom)
   - Check browser console (F12)
   - Check terminal for build errors

3. **Save your work** (automatic in VS Code)

---

## Deploying Changes to Production

### Quick Deployment (Automatic - Recommended)

Once set up, Vercel automatically deploys when you push to GitHub:

```bash
# 1. Check what changed
git status

# 2. Add all changes
git add .

# 3. Commit with a descriptive message
git commit -m "Description of what you changed"

# 4. Push to GitHub (triggers auto-deploy)
git push

# 5. Check deployment status
# Visit: https://vercel.com/2014akamanzi/kiul-app
```

**That's it!** Vercel automatically:
- Detects the push
- Builds your app
- Deploys to https://kiul.katokifoundation.org
- Usually takes 2-3 minutes

---

## Manual Deployment (If Needed)

```bash
# If automatic deployment isn't set up yet
npx vercel --prod
```

---

## Common Development Tasks

### Starting Work Each Day

```bash
# 1. Navigate to project
cd ~/Desktop/kiul-app

# 2. Pull latest changes (if working with others)
git pull

# 3. Open VS Code
code .

# 4. Start dev server
npm run dev
```

### Adding New Features

```bash
# 1. Create a new branch (optional, for larger features)
git checkout -b feature/new-feature-name

# 2. Make your changes in VS Code

# 3. Test locally

# 4. Commit and push
git add .
git commit -m "Add new feature description"
git push
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Install new package
npm install package-name
```

---

## Troubleshooting Deployment Issues

### Issue 1: Build Fails - Missing Environment Variables

**Error:** `Missing credentials. Please pass an 'apiKey'...`

**Fix:**
1. Go to https://vercel.com/2014akamanzi/kiul-app/settings/environment-variables
2. Ensure these are set:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` (if using Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (if using Supabase)
3. Redeploy from Deployments tab

### Issue 2: Build Fails - TypeScript Errors

**Error:** `Type error: ...` or `Cannot find name...`

**Fix:**
```bash
# Check errors locally
npm run build

# Fix the errors in VS Code
# Then commit and push
git add .
git commit -m "Fix TypeScript errors"
git push
```

### Issue 3: Changes Not Showing on Live Site

**Fix:**
1. Check deployment status: https://vercel.com/2014akamanzi/kiul-app
2. Clear browser cache (Cmd+Shift+R)
3. Wait a few minutes for deployment to complete
4. Check if correct branch is deployed (should be `main`)

### Issue 4: Domain Not Working

**Fix:**
1. Check DNS in Vercel: https://vercel.com/2014akamanzi/kiul-app/settings/domains
2. Verify CNAME record:
   ```
   Type: CNAME
   Name: kiul
   Value: cname.vercel-dns.com
   ```
3. Wait up to 48 hours for DNS propagation (usually 5-30 minutes)

### Issue 5: Git Push Rejected

**Error:** `Updates were rejected because the remote contains work...`

**Fix:**
```bash
# Pull latest changes first
git pull origin main

# Resolve any conflicts in VS Code
# Then push again
git push
```

---

## Quick Reference Commands

### Git Commands
```bash
git status                    # See what changed
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push                      # Push to GitHub
git pull                      # Pull latest changes
git log                       # See commit history
```

### NPM Commands
```bash
npm run dev                   # Start development server
npm run build                 # Build for production (test locally)
npm install package-name      # Install new package
npm update                    # Update packages
```

### Vercel Commands
```bash
npx vercel login              # Login to Vercel
npx vercel --prod            # Deploy to production
npx vercel env pull          # Pull environment variables
```

---

## File Structure Reference

```
kiul-app/
├── app/                      # Main application code
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── counselling/         # Counselling feature
│   ├── mentorship/          # Mentorship feature
│   ├── short-courses/       # Course generator
│   ├── admin/               # Admin portal
│   │   ├── materials/       # Materials management
│   │   └── ...
│   ├── auth/                # Authentication
│   │   ├── login/
│   │   └── admin-login/
│   ├── api/                 # API routes
│   └── components/          # Reusable components
├── public/                  # Static files (images, etc.)
├── .env.local              # Environment variables (DO NOT commit)
├── package.json            # Dependencies
└── README.md              # Project documentation
```

---

## Important URLs

### Development
- Local app: http://localhost:3000
- VS Code: `code .` command

### Production
- Live site: https://kiul.katokifoundation.org
- Vercel dashboard: https://vercel.com/2014akamanzi/kiul-app
- GitHub repo: https://github.com/2014Akamanzi/kiul-app

### Admin
- Admin login: https://kiul.katokifoundation.org/auth/admin-login
- Admin dashboard: https://kiul.katokifoundation.org/admin/dashboard
- Materials management: https://kiul.katokifoundation.org/admin/materials

---

## Best Practices

### Before Deploying
✅ Test locally with `npm run dev`
✅ Check for TypeScript errors
✅ Test all changed features
✅ Write clear commit messages
✅ Review changes with `git status`

### Commit Messages
Good examples:
- `"Add admin materials management feature"`
- `"Fix contact form validation"`
- `"Update about page with new content"`
- `"Compact contact page for better UX"`

Bad examples:
- `"update"`
- `"fix stuff"`
- `"changes"`

### Security
⚠️ Never commit `.env.local` file
⚠️ Never share API keys publicly
⚠️ Keep dependencies updated
⚠️ Review admin access regularly

---

## Getting Help

### Using GitHub Copilot in VS Code
1. Open Copilot Chat (Cmd+Shift+I)
2. Ask specific questions:
   - "How do I add a new page?"
   - "Fix this error: [paste error]"
   - "Explain this code"
   - "Make this component more efficient"

### Common Questions to Ask Copilot
- "How do I deploy changes?"
- "Why is my build failing?"
- "Add authentication to this page"
- "Create a new admin feature"
- "Optimize this component"

---

## Emergency Rollback

If a deployment breaks something:

```bash
# 1. Find the last working commit
git log

# 2. Revert to that commit
git revert HEAD

# 3. Push the revert
git push
```

Or in Vercel Dashboard:
1. Go to Deployments
2. Find a working deployment
3. Click "..." → "Promote to Production"

---

## Maintenance Schedule

### Weekly
- Check Vercel deployment logs for errors
- Test all major features on live site
- Update content as needed

### Monthly
- Update npm packages: `npm update`
- Review and clean up unused code
- Check analytics (if set up)
- Backup database (Supabase)

### As Needed
- Add new features
- Fix bugs reported by users
- Update content
- Add new admin materials

---

## Contact & Support

- Email: info.kiul@katokifoundation.org
- WhatsApp: +255 758 624 863
- GitHub Issues: https://github.com/2014Akamanzi/kiul-app/issues

---

## Quick Start Checklist

Every time you work on the app:

- [ ] Open Terminal
- [ ] `cd ~/Desktop/kiul-app`
- [ ] `code .` (opens VS Code)
- [ ] `npm run dev` (in VS Code terminal)
- [ ] Make changes
- [ ] Test locally
- [ ] `git add .`
- [ ] `git commit -m "description"`
- [ ] `git push`
- [ ] Check https://vercel.com/2014akamanzi/kiul-app for deployment
- [ ] Verify at https://kiul.katokifoundation.org

---

*Last updated: December 9, 2025*
