# KIUL Publishing System - Quick Start Guide

## 🚀 Complete in 5 Minutes

### Step 1: Database Setup (2 minutes)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click **SQL Editor** in the left sidebar
3. Copy the entire contents of `supabase-publishing-schema.sql`
4. Paste into SQL Editor and click **Run**
5. ✅ You should see: "Success. No rows returned"

### Step 2: Environment Variables (1 minute)

1. Copy `.env.local.example` to `.env.local`
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your keys to `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-your-key-here
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   RESEND_API_KEY=re_your-key-here  # Optional for email
   ```

3. Get Resend API key (optional):
   - Sign up at https://resend.com
   - Get API key from dashboard
   - Without this, emails log to console instead

### Step 3: Test the System (2 minutes)

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Submit test manuscript:**
   - Go to: http://localhost:3000/publishing/submit
   - Fill form and submit
   - ✅ Success message appears

3. **View in admin dashboard:**
   - Go to: http://localhost:3000/admin/dashboard
   - ✅ See your test submission

4. **Assign a reviewer:**
   - Click "Assign Reviewer" on submission
   - ✅ See sample reviewers (already in database)
   - Click "Assign" on any reviewer

5. **Submit a review:**
   - Go back to dashboard
   - Click "Review Manuscript"
   - Select decision and add comments
   - Click "Submit Review"
   - ✅ Status updates, email sent (if configured)

## 📍 Key Routes

| Route | Purpose |
|-------|---------|
| `/publishing/submit` | Public manuscript submission |
| `/admin/dashboard` | View all manuscripts |
| `/admin/dashboard/review/[id]` | Review manuscript |
| `/admin/dashboard/assign/[id]` | Assign reviewer |
| `/admin/reviewers` | Manage reviewer pool |
| `/admin/publishing` | Upload publications |

## 🎯 Publication Pipeline

```
1. submitted          → Author submits manuscript
2. assigned           → Reviewer is assigned
3. under_review       → Reviewer is evaluating
4. revisions_requested → Author needs to revise
5. accepted           → Approved for publication
6. typeset            → Final formatting
7. published          → Live on platform
```

## ✉️ Email Notifications

**Automatically sent on:**
- ✅ Manuscript submission (to author)
- ✅ Reviewer assignment (to reviewer)
- ✅ Review decision (to author)

**Without RESEND_API_KEY:**
- Emails log to server console
- All other features work normally

## 🎨 Features at a Glance

### Admin Dashboard
- Filter by status (all, submitted, under review, etc.)
- Real-time statistics
- Download manuscripts
- One-click actions

### Review Workflow
- View full manuscript details
- See previous reviews
- Multiple decision options
- Anonymous feedback to authors

### Reviewer Management
- Add reviewers with expertise
- Track affiliations and bios
- Assign to manuscripts
- View assignment history

### Email System
- Transactional emails via Resend
- Fallback to console logging
- Professional templates
- Automatic triggers

## 🔐 Security Features

✅ Row Level Security (RLS) enabled
✅ User-level data isolation
✅ Anonymous peer review
✅ Secure file storage
✅ Protected admin routes

## 🧪 Testing Checklist

- [ ] Run SQL migrations
- [ ] Submit test manuscript
- [ ] View in admin dashboard
- [ ] Add a reviewer
- [ ] Assign reviewer to manuscript
- [ ] Submit review decision
- [ ] Check status updates
- [ ] Verify email logs (console if no API key)
- [ ] Test all status filters
- [ ] Test file downloads

## 🚨 Common Issues

**"No manuscripts found"**
- Run SQL migrations in Supabase
- Check RLS policies are created
- Verify Supabase URL/key in .env.local

**"No reviewers found"**
- SQL migrations include 3 sample reviewers
- Add more via /admin/reviewers

**Emails not sending**
- Check RESEND_API_KEY in .env.local
- Verify API key is active in Resend dashboard
- Check server console for "Email logged" messages

## 📚 Documentation

- Full docs: `PUBLISHING_SYSTEM.md`
- Database schema: `supabase-publishing-schema.sql`
- Integration guide: `INTEGRATION_DOCS.md`
- Production guide: `PRODUCTION_READY.md`

## 🎉 You're Ready!

The KIUL Publishing System is now fully operational with:
- ✅ Complete peer review workflow
- ✅ Manuscript management dashboard
- ✅ Reviewer assignment system
- ✅ Email notifications
- ✅ Status tracking pipeline

**Next Steps:**
1. Customize email templates in `/app/api/email/route.ts`
2. Add role-based access control
3. Implement double-blind review option
4. Deploy to production with Vercel

**Need help?** Check `PUBLISHING_SYSTEM.md` for detailed documentation.
