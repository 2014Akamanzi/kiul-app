# Supabase Database Setup Guide

## Step 1: Get Your Supabase Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Create a new project or select your existing KIUL project
4. Go to **Project Settings** (⚙️ gear icon in the left sidebar)
5. Click on **API** section
6. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon public key** (under "Project API keys" - the `anon` `public` key)

## Step 2: Add Credentials to .env.local

Open `/Users/adalbertuskamanzi/Desktop/kiul-app/.env.local` and update:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key-here
```

## Step 3: Run Database Migrations

### Option A: Use the Combined Setup Script (Recommended)

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-setup-complete.sql` (created below)
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

### Option B: Run Individual Migration Files

Run these files in order:

1. **supabase-admin-setup.sql** - Creates profiles table and admin system
2. **supabase-migrations.sql** - Creates main tables (courses, goals, etc.)
3. **supabase-publishing-schema.sql** - Creates journal/publishing tables (if using journal features)

## Step 4: Verify Setup

After running the migrations, verify in Supabase:

1. Go to **Table Editor** in left sidebar
2. You should see these tables:
   - ✅ profiles (for user authentication and roles)
   - ✅ courses (for saved courses)
   - ✅ mentorship_goals (for mentorship tracking)
   - ✅ counselling_sessions (for counselling history)
   - ✅ manuscripts (for journal submissions)
   - ✅ publications (for published papers)
   - ✅ learning_materials (for admin-uploaded resources)

## Step 5: Create Your First Admin User

After running the migrations:

1. Register a new account through your app at `/auth/signup`
2. Go to Supabase dashboard → **Table Editor** → **profiles** table
3. Find your user record (by email)
4. Change the `role` column from `user` to `admin`
5. Save the change
6. Refresh your app and you should see the Admin link in the navbar

## Step 6: Add Credentials to Vercel (For Production)

1. Go to [https://vercel.com](https://vercel.com)
2. Select your kiul-app project
3. Go to **Settings** → **Environment Variables**
4. Add these variables for Production, Preview, and Development:
   - `NEXT_PUBLIC_SUPABASE_URL` = your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
5. Redeploy your app

## Step 7: Restart Development Server

```bash
# In your terminal, stop the current server (Ctrl+C)
# Then restart:
cd /Users/adalbertuskamanzi/Desktop/kiul-app
npm run dev
```

## Step 8: Test Registration

1. Go to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. Register with email and password
3. You should receive a confirmation email from Supabase
4. Login and access all services

## Troubleshooting

### "Failed to fetch" error

- Check that SUPABASE_URL and SUPABASE_ANON_KEY are set correctly
- Restart your development server
- Check browser console for specific error messages

### Tables not created

- Make sure you ran the SQL migrations in Supabase SQL Editor
- Check for error messages in the SQL Editor output
- Verify you have the correct permissions in your Supabase project

### Can't login after signup

- Check Supabase Authentication → Users to see if user was created
- Verify email confirmation settings in Supabase Auth settings
- Check that profiles table has Row Level Security enabled

### Admin features not showing

- Verify your user has role='admin' in the profiles table
- Clear browser cache and refresh
- Check browser console for errors

## Need Help?

- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- KIUL Support: <counselling@katokifoundation.org>
- WhatsApp: +255-758624863
