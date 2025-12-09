# KIUL Integration Documentation

## 🚀 Setup Complete

All systems have been integrated with OpenAI API and Supabase database.

---

## 📋 Setup Checklist

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

Required keys:
- `OPENAI_API_KEY` - Get from https://platform.openai.com/api-keys
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### 2. Supabase Database Setup

1. Create a Supabase project at https://supabase.com/dashboard
2. Go to SQL Editor
3. Copy and paste contents of `supabase-migrations.sql`
4. Run the migration to create all tables

### 3. Supabase Storage Setup

Create two storage buckets:

**publications** (Public bucket)
- Settings → Storage → New Bucket
- Name: `publications`
- Public: ✓ Yes
- Allowed file types: PDF

**manuscripts** (Private bucket)
- Settings → Storage → New Bucket  
- Name: `manuscripts`
- Public: ✗ No
- Allowed file types: PDF, DOC, DOCX

---

## 🎯 Features Implemented

### 1. OpenAI Integration ✅

**API Route:** `/app/api/assistant/route.ts`
- Model: gpt-4o-mini
- Streaming: Enabled
- Temperature: 0.6
- Max tokens: 800

**Helper:** `/app/lib/streamChat.ts`
- Handles streaming responses
- Supports custom system prompts
- Error handling included

**Integrated Pages:**
- ✅ Counselling (`/counselling`) - Ubuntu-grounded empathetic counselor
- ⚠️ Mentorship (`/mentorship`) - Needs update (same pattern as counselling)
- ⚠️ Assistant (`/assistant`) - Needs update (same pattern as counselling)

### 2. Supabase Database ✅

**Client:** `/app/lib/supabaseClient.ts`

**Tables Created:**
- `users` - User profiles
- `courses` - Saved short courses
- `mentorship_goals` - Career goals tracking
- `publications` - Published materials (books, papers, etc.)
- `manuscripts` - Submitted manuscripts for review
- `counselling_sessions` - Chat session persistence

**Row Level Security (RLS):**
- Users can only access their own data
- Publications are public read
- Manuscripts require user authentication

### 3. Authentication System ✅

**Provider:** `/app/providers/AuthProvider.tsx`
- Supabase Auth integration
- Context API for global auth state
- Auto session management

**Pages:**
- `/auth/login` - User login
- `/auth/signup` - New user registration

**Protected Routes:**
- `/dashboard` - Requires authentication

### 4. Dashboard Integration ✅

**File:** `/app/dashboard/page.tsx`

**Features:**
- ✅ Loads courses from Supabase (not localStorage)
- ✅ Loads mentorship goals from Supabase
- ✅ Authentication required
- ✅ User-specific data filtering
- ✅ Real-time data loading

### 5. Admin Portal ✅

**File:** `/app/admin/publishing/page.tsx`

**Features:**
- Upload PDFs to Supabase Storage
- Add metadata (title, authors, year, category)
- Store in publications table
- File size validation
- Upload progress indicators

### 6. Manuscript Submission ✅

**File:** `/app/publishing/submit/page.tsx`

**Features:**
- Public manuscript submission form
- Upload to manuscripts storage bucket
- Store metadata in manuscripts table
- Email notification system (ready for integration)
- Status tracking (submitted, under review, accepted, rejected)
- Submission guidelines included

---

## 📁 File Structure

```
app/
├── api/
│   └── assistant/
│       └── route.ts          # OpenAI API endpoint (streaming)
├── auth/
│   ├── login/
│   │   └── page.tsx         # Login page
│   └── signup/
│       └── page.tsx         # Signup page
├── admin/
│   └── publishing/
│       └── page.tsx         # Admin upload portal
├── publishing/
│   └── submit/
│       └── page.tsx         # Public manuscript submission
├── providers/
│   └── AuthProvider.tsx     # Auth context provider
├── lib/
│   ├── supabaseClient.ts    # Supabase connection
│   ├── streamChat.ts        # OpenAI streaming helper
│   ├── escalation.ts        # Safety keyword detection
│   └── pdfGenerator.ts      # PDF export for courses
├── dashboard/
│   └── page.tsx            # User dashboard (Supabase integrated)
├── counselling/
│   └── page.tsx            # AI counselling (OpenAI integrated)
└── layout.tsx              # Wrapped with AuthProvider
```

---

## 🔄 Migration Path

### From localStorage to Supabase

**Old Code (localStorage):**
```typescript
localStorage.setItem("kiul_courses", JSON.stringify(courses));
const courses = JSON.parse(localStorage.getItem("kiul_courses"));
```

**New Code (Supabase):**
```typescript
// Save
await supabase.from("courses").insert({
  user_id: user.id,
  title, skills, tier, modules
});

// Load
const { data } = await supabase
  .from("courses")
  .select("*")
  .eq("user_id", user.id);
```

### From Placeholder Responses to OpenAI

**Old Code:**
```typescript
const reply = {
  role: "assistant",
  text: "Thank you for sharing..."
};
setMessages(prev => [...prev, reply]);
```

**New Code:**
```typescript
await streamChatCompletion(
  messages,
  (chunk) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].text += chunk;
      return updated;
    });
  },
  systemPrompt
);
```

---

## 🛠 TODO: Remaining Integrations

### High Priority

1. **Update Mentorship Page** (`/app/mentorship/page.tsx`)
   - Copy OpenAI streaming pattern from counselling
   - System prompt: Career-focused, goal-oriented Ubuntu mentor
   - Save goals to Supabase `mentorship_goals` table

2. **Update Assistant Page** (`/app/assistant/page.tsx`)
   - Integrate OpenAI streaming
   - System prompt: General KIUL assistant for all services
   - Session persistence optional

3. **Course Generator Save** (`/app/short-courses/generator/page.tsx`)
   - After generation, prompt user to save course
   - Insert into Supabase `courses` table
   - Require authentication

### Medium Priority

4. **Search API Update** (`/app/api/search/route.ts`)
   - Query Supabase `publications` table instead of file system
   - Full-text search on title and authors
   - Category filtering

5. **Publishing Pages**
   - Update all `/app/publishing/*` pages to load from Supabase
   - Remove hardcoded publication lists
   - Dynamic loading with pagination

### Low Priority

6. **Email Notifications**
   - Manuscript submission confirmation
   - Admin alerts for new submissions
   - Integration with SendGrid/Resend

7. **Session Persistence**
   - Save counselling/mentorship chats to `counselling_sessions`
   - Load previous sessions in dashboard
   - Export chat transcripts

---

## 🧪 Testing Checklist

### Authentication
- [ ] Sign up with new email
- [ ] Log in with existing account
- [ ] Log out and session cleared
- [ ] Protected route redirects to login

### Dashboard
- [ ] Shows user's courses
- [ ] Shows user's goals
- [ ] Data persists after logout/login
- [ ] Empty states render correctly

### Counselling
- [ ] OpenAI responses stream correctly
- [ ] Safety keywords trigger escalation
- [ ] Messages persist during session
- [ ] Input disables during streaming

### Admin Portal
- [ ] PDF upload to Supabase Storage
- [ ] Metadata saves to publications table
- [ ] File validation works
- [ ] Success/error messages display

### Manuscript Submission
- [ ] File upload works
- [ ] Metadata saves correctly
- [ ] Confirmation message shows
- [ ] Form resets after submission

---

## 🚨 Security Considerations

### Environment Variables
- ✅ Never commit `.env.local` to git
- ✅ Use `.env.local.example` for documentation
- ✅ OpenAI key kept server-side only
- ✅ Supabase keys are public-safe (anon key)

### Row Level Security
- ✅ Users can only access own data
- ✅ Publications are read-only for users
- ✅ Manuscripts submissions stored with user_id

### API Rate Limiting
- ⚠️ Consider implementing rate limiting on `/api/assistant`
- ⚠️ Add usage tracking per user/tier
- ⚠️ Implement tier-based restrictions

---

## 📊 Database Schema

### Key Relationships

```
auth.users (Supabase built-in)
    ↓ (one-to-many)
├── courses
├── mentorship_goals
├── counselling_sessions
└── manuscripts

publications (admin-managed, public read)
```

### Indexes Created
- `idx_courses_user_id` - Fast user course lookup
- `idx_goals_user_id` - Fast user goals lookup
- `idx_publications_category` - Category filtering
- `idx_manuscripts_status` - Status-based queries
- `idx_sessions_user_id` - User session retrieval

---

## 🎓 Next Steps

1. **Set up environment variables**
2. **Run Supabase migrations**
3. **Create storage buckets**
4. **Test authentication flow**
5. **Test data persistence**
6. **Integrate remaining pages (mentorship, assistant)**
7. **Deploy to production (Vercel)**

---

## 📞 Support

For integration issues:
- Check browser console for errors
- Verify environment variables are set
- Ensure Supabase migrations ran successfully
- Check Supabase logs in dashboard
- Verify OpenAI API key has credits

---

**Status:** Core infrastructure complete ✅  
**Next:** Complete remaining page integrations and test end-to-end
