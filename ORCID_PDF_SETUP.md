# ORCID Integration & PDF Cover Page Generator - Setup Guide

## Overview
Implemented two advanced features for the academic publishing system:
1. **ORCID OAuth Login** - Allow academics to sign in with their ORCID iD
2. **Automatic PDF Cover Page Generator** - Create branded cover pages for published articles

---

## ✅ FEATURE 1: ORCID LOGIN INTEGRATION

### What is ORCID?
ORCID (Open Researcher and Contributor ID) is a global registry that provides unique identifiers for researchers. It's the standard authentication system for academic publishers worldwide.

### Benefits:
- ✅ Trusted by academics worldwide
- ✅ Automatically fetches researcher profile data
- ✅ Pre-populated author information
- ✅ One-click authentication

### Implementation Details

#### Components Created:
1. **app/components/ORCIDLoginButton.tsx**
   - React client component
   - Styled button with ORCID logo
   - OAuth flow initiation
   - Error handling

2. **app/auth/callback/route.ts**
   - Server route handler
   - Exchanges OAuth code for session
   - Redirects to dashboard after auth
   - Error handling for failed callbacks

#### Integration:
- ✅ Added to login page (`/auth/login`)
- ✅ Positioned below email/password login
- ✅ "Or continue with" divider
- ✅ Consistent styling with KIUL design

---

## 🔧 SUPABASE SETUP REQUIRED

### Step 1: Enable ORCID Provider in Supabase

1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **ORCID** in the list
4. Click **Enable**

### Step 2: Register Your App with ORCID

#### For Development:
1. Go to https://orcid.org/developer-tools
2. Register a new application
3. Get **Client ID** and **Client Secret**
4. Set redirect URI: `http://localhost:3000/auth/callback`

#### For Production:
1. Use production ORCID service (https://orcid.org)
2. Register production application
3. Set redirect URI: `https://yourdomain.com/auth/callback`

### Step 3: Configure Supabase

In Supabase ORCID provider settings:
- **Client ID**: [Your ORCID Client ID]
- **Client Secret**: [Your ORCID Client Secret]
- **Redirect URL**: Auto-configured by Supabase
- **Scopes**: `openid profile email`

### Step 4: Environment Variables

Add to `.env.local`:
```bash
# No additional env vars needed - uses existing Supabase config
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## ✅ FEATURE 2: PDF COVER PAGE GENERATOR

### What It Does:
Automatically generates a branded PDF cover page with:
- KIUL logo and branding
- Article title (word-wrapped)
- Author names
- DOI (with proper formatting)
- Abstract (with text wrapping)
- Publication date
- Professional layout with KIUL colors

### Technical Stack:
- **pdf-lib**: Client-side PDF generation
- **StandardFonts**: Built-in fonts (no external dependencies)
- **Server API Route**: Next.js API endpoint

### Implementation Details

#### API Endpoint: `/api/generate-cover/route.ts`

**Request Body:**
```json
{
  "title": "Article Title",
  "authors": "Author 1, Author 2",
  "doi": "10.1234/kiul.2025.001",
  "abstract": "Article abstract text...",
  "volume": "1",
  "number": "1",
  "year": "2025",
  "publishedDate": "2025-12-08"
}
```

**Response:**
- Content-Type: `application/pdf`
- Downloads as: `cover-page-[doi].pdf`

#### Features:
- ✅ A4 page size (595.28 x 841.89 points)
- ✅ KIUL green header (#15803d)
- ✅ Institution name and journal title
- ✅ Volume/issue information
- ✅ Automatic text wrapping
- ✅ Professional typography
- ✅ Footer with copyright and website
- ✅ DOI in branded color
- ✅ Abstract with line limits (prevents overflow)

#### Integration in Typesetting Page:
- ✅ New button: "📄 Generate KIUL Cover Page"
- ✅ Positioned above publish button
- ✅ Requires DOI to be entered first
- ✅ Downloads generated PDF automatically
- ✅ Loading state during generation

---

## 📁 FILES CREATED

### ORCID Integration:
1. **app/components/ORCIDLoginButton.tsx** - Login button component
2. **app/auth/callback/route.ts** - OAuth callback handler

### PDF Generator:
3. **app/api/generate-cover/route.ts** - Cover page generation API

### Updated Files:
4. **app/auth/login/page.tsx** - Added ORCID button
5. **app/admin/typeset/[id]/page.tsx** - Added cover page generator

---

## 🎨 UI/UX FEATURES

### ORCID Login Button:
- **Color**: Green (#15803d) matching KIUL branding
- **Icon**: ORCID logo with official colors
- **Size**: Full width matching other buttons
- **Hover**: Darker green with smooth transition
- **Position**: Below email/password login with divider

### Cover Page Generator Button:
- **Color**: Indigo (#4f46e5) to distinguish from publish button
- **Position**: Above main publish button
- **State**: Disabled until DOI entered
- **Feedback**: "Generating..." loading state

### Generated Cover Page Design:
- **Header**: Green banner with white text
- **Typography**: Helvetica family (built-in)
- **Colors**: KIUL green, dark gray, medium gray
- **Layout**: Professional academic style
- **Spacing**: Generous margins and line spacing
- **Branding**: Footer with copyright and website

---

## 🔄 WORKFLOW

### For Administrators (Typesetting):

1. Navigate to manuscript ready for publication
2. Enter DOI (e.g., `10.1234/kiul.2025.001`)
3. Click **"Generate KIUL Cover Page"**
4. Download generated branded cover page
5. (Optional) Merge with manuscript PDF using external tool
6. Upload final PDF to typeset page
7. Click **"Publish Article"**

### For Authors (Login):

**Option 1: Email/Password**
1. Enter email and password
2. Click "Login"

**Option 2: ORCID**
1. Click "Sign in with ORCID"
2. Redirected to ORCID website
3. Authorize KIUL to access profile
4. Redirected back and logged in

---

## 🔐 SECURITY & PRIVACY

### ORCID Integration:
- ✅ OAuth 2.0 protocol (industry standard)
- ✅ Minimal scopes requested (`openid profile email`)
- ✅ Secure token exchange via Supabase
- ✅ No password storage
- ✅ Session managed by Supabase Auth

### PDF Generator:
- ✅ Server-side generation (secure)
- ✅ No user data stored
- ✅ Validates required fields
- ✅ Error handling for malformed requests
- ✅ PDF files not stored on server

---

## 📦 DEPENDENCIES

### New Package Installed:
```bash
npm install pdf-lib
```

**pdf-lib** (v1.17.1+):
- Zero external dependencies
- Works in Node.js and browsers
- TypeScript support
- MIT License
- Small bundle size (~200KB)

### Existing Dependencies Used:
- `@supabase/auth-helpers-nextjs` - OAuth handling
- `next` - API routes and server components
- `react` - UI components

---

## 🚀 DEPLOYMENT CHECKLIST

### For ORCID:
- [ ] Register app with ORCID (dev/prod)
- [ ] Get Client ID and Client Secret
- [ ] Enable ORCID provider in Supabase
- [ ] Configure redirect URLs
- [ ] Test OAuth flow
- [ ] Update ORCID app with production domain

### For PDF Generator:
- [ ] Verify `pdf-lib` installed
- [ ] Test cover page generation locally
- [ ] Check PDF renders correctly
- [ ] Verify text wrapping works
- [ ] Test with long titles/abstracts
- [ ] Ensure branding matches KIUL style

### General:
- [ ] Update environment variables
- [ ] Test both features in production
- [ ] Add monitoring for OAuth failures
- [ ] Document user instructions

---

## 🧪 TESTING

### ORCID Login:

**Test Scenario 1: Successful Login**
1. Click "Sign in with ORCID"
2. Should redirect to orcid.org
3. Login with ORCID credentials
4. Should redirect back to `/dashboard`
5. User should be authenticated

**Test Scenario 2: First-Time User**
1. Login with new ORCID account
2. Profile created automatically in Supabase
3. Email extracted from ORCID profile

**Test Scenario 3: Callback Error**
1. Simulate failed OAuth exchange
2. Should redirect to `/auth/login?error=callback_failed`
3. User sees friendly error message

### PDF Cover Page:

**Test Scenario 1: Basic Generation**
1. Enter DOI: `10.1234/kiul.2025.001`
2. Click "Generate KIUL Cover Page"
3. PDF should download automatically
4. Open PDF and verify:
   - Title displays correctly
   - Authors listed
   - DOI formatted
   - KIUL branding visible

**Test Scenario 2: Long Title**
1. Use manuscript with 100+ character title
2. Generate cover page
3. Verify title wraps to multiple lines
4. No text overflow

**Test Scenario 3: Long Abstract**
1. Use manuscript with 500+ word abstract
2. Generate cover page
3. Verify abstract wraps correctly
4. "..." appears if truncated

**Test Scenario 4: Missing DOI**
1. Click generate without entering DOI
2. Button should be disabled
3. Alert: "Please enter a DOI first"

---

## 📊 API REFERENCE

### Generate Cover Page API

**Endpoint:** `POST /api/generate-cover`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```typescript
{
  title: string;        // Required
  authors: string;      // Required
  doi: string;          // Required
  abstract?: string;    // Optional
  volume?: string;      // Optional
  number?: string;      // Optional
  year?: string;        // Optional
  publishedDate?: string; // Optional (ISO date)
}
```

**Response:**
- Success (200): PDF file download
- Error (400): Missing required fields
- Error (500): Generation failed

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/generate-cover \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Ubuntu Leadership in Modern Context",
    "authors": "John Doe, Jane Smith",
    "doi": "10.1234/kiul.2025.001",
    "abstract": "This paper explores..."
  }' \
  --output cover-page.pdf
```

---

## 🎓 USAGE EXAMPLES

### Example 1: Generate Cover for Published Article
```typescript
const response = await fetch('/api/generate-cover', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'The Role of Ubuntu in African Leadership',
    authors: 'Dr. Sarah Mwangi, Prof. John Kamau',
    doi: '10.1234/kiul.2025.001',
    abstract: 'This paper examines the application of Ubuntu philosophy...',
    volume: '1',
    number: '1',
    year: '2025',
    publishedDate: '2025-12-08'
  })
});

const blob = await response.blob();
// Download or display PDF
```

### Example 2: ORCID Login in Custom Component
```typescript
import { supabase } from '@/lib/supabaseClient';

const handleORCIDLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'orcid',
    options: {
      scopes: 'openid profile email',
      redirectTo: window.location.origin + '/auth/callback'
    }
  });
  
  if (error) {
    console.error('Login failed:', error);
  }
};
```

---

## 🔮 FUTURE ENHANCEMENTS

### ORCID Integration:
- [ ] **Profile Sync**: Auto-populate author profile from ORCID
- [ ] **Publication Sync**: Import existing publications from ORCID
- [ ] **ORCID Display**: Show ORCID iD on author profiles
- [ ] **Works Integration**: Auto-add publications to ORCID record
- [ ] **Affiliation Sync**: Import institution from ORCID

### PDF Generator:
- [ ] **PDF Merging**: Auto-merge cover with manuscript
- [ ] **Custom Templates**: Multiple cover page styles
- [ ] **Logo Upload**: Custom institution logos
- [ ] **QR Codes**: Add QR code linking to DOI
- [ ] **Watermarks**: Add draft/preprint watermarks
- [ ] **Multi-page**: Generate full front matter (TOC, etc.)
- [ ] **Citation Page**: Auto-generate citation formats page

---

## ⚠️ TROUBLESHOOTING

### ORCID Login Not Working:

**Problem**: Button does nothing
- **Solution**: Check Supabase console for ORCID provider enabled
- **Check**: Browser console for error messages
- **Verify**: Redirect URL matches Supabase settings

**Problem**: Callback fails
- **Solution**: Ensure `/auth/callback/route.ts` exists
- **Check**: Route handler exports GET method
- **Verify**: Supabase client initialized correctly

### PDF Generation Fails:

**Problem**: 500 error
- **Solution**: Check server logs for detailed error
- **Verify**: `pdf-lib` installed correctly
- **Check**: Request body has required fields

**Problem**: Text overflow/formatting issues
- **Solution**: Text wrapping algorithm has limits
- **Workaround**: Adjust font size or margin constants
- **Check**: Very long words may not wrap (add hyphenation)

### General Issues:

**Problem**: TypeScript errors
- **Solution**: Run `npm install --save-dev @types/node`
- **Check**: tsconfig.json includes proper paths

**Problem**: Build fails
- **Solution**: Clear `.next` folder and rebuild
- **Run**: `rm -rf .next && npm run build`

---

## 📞 SUPPORT

### ORCID Resources:
- ORCID Developer Docs: https://info.orcid.org/documentation/
- Support: support@orcid.org
- API FAQ: https://info.orcid.org/faq/

### pdf-lib Resources:
- Documentation: https://pdf-lib.js.org/
- GitHub: https://github.com/Hopding/pdf-lib
- Examples: https://pdf-lib.js.org/docs/api/

---

## ✨ SUMMARY

### ORCID Integration:
- ✅ OAuth login button added to `/auth/login`
- ✅ Callback route handles authentication
- ✅ Seamless integration with Supabase Auth
- ✅ Production-ready (pending ORCID app registration)

### PDF Cover Page Generator:
- ✅ Professional branded cover pages
- ✅ Integrated into typesetting workflow
- ✅ Automatic text wrapping
- ✅ KIUL branding and colors
- ✅ One-click generation and download

### Build Status:
- ✅ All TypeScript errors resolved
- ✅ New dependency (`pdf-lib`) installed
- ✅ 3 new files created
- ✅ 2 files updated
- ✅ Production-ready code

**Next Steps:**
1. Register ORCID application (dev + prod)
2. Configure Supabase ORCID provider
3. Test ORCID login flow end-to-end
4. Generate sample cover pages
5. Document workflow for editors
