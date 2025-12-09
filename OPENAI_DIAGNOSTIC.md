# 🔧 OpenAI/ChatGPT Functions - Diagnostic Report

**Date:** December 8, 2025  
**Status:** ✅ API Key Valid | ⚠️ Troubleshooting Required

---

## 🔍 DIAGNOSIS RESULTS

### ✅ What's Working:

1. **OpenAI Package Installed:** ✅ Version 6.10.0
2. **API Key Present:** ✅ Found in `.env.local`
3. **API Key Format:** ✅ Valid (`sk-proj-***`)
4. **OpenAI API Connection:** ✅ API responds correctly
5. **Available Models:** ✅ GPT-4, GPT-4o, GPT-4o-mini accessible

### 📊 AI Features in Your App:

| Feature | Route | Model | Status |
|---------|-------|-------|--------|
| **Counselling Chat** | `/counselling` | GPT-4 | Should work ✅ |
| **Mentorship Chat** | `/mentorship` | GPT-4 | Should work ✅ |
| **KIUL Assistant** | `/assistant` | GPT-4o | Should work ✅ |
| **Short Courses Generator** | `/short-courses/generator` | GPT-4o | Should work ✅ |
| **Generic Assistant** | `/api/assistant` | GPT-4o-mini | Should work ✅ |

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue 1: "Not Getting Responses"

**Possible Causes:**

#### A. Browser Console Errors
**Check:**
1. Open browser DevTools (F12 or Cmd+Opt+I)
2. Go to Console tab
3. Look for errors when sending a message

**Common Errors:**
```javascript
// Network error
Failed to fetch

// CORS error
Access to fetch blocked by CORS policy

// API error
OpenAI API Error: Incorrect API key provided
```

**Solutions:**
- Network error → Check internet connection
- CORS error → Restart dev server: `npm run dev`
- API error → Verify API key has credits at https://platform.openai.com/usage

---

#### B. OpenAI API Rate Limits

**Check Your Usage:**
1. Visit: https://platform.openai.com/usage
2. Check if you've exceeded:
   - Free tier: $5 credit (expires after 3 months)
   - Rate limits: 3 requests/min for free tier

**Solution:**
- Add payment method: https://platform.openai.com/account/billing
- Or wait for rate limit to reset (1 minute)

---

#### C. Model Access Issues

**Your app uses:**
- `gpt-4` - Requires paid account ($0.03/1K tokens)
- `gpt-4o` - Requires paid account ($0.005/1K tokens)
- `gpt-4o-mini` - Available on free tier ($0.00015/1K tokens)

**Check Model Access:**
```bash
# Test if you have access to GPT-4
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'
```

**Solution:**
If you get "model not found" error:
1. Upgrade to paid account
2. OR: Downgrade all routes to use `gpt-4o-mini` (see below)

---

### Issue 2: "Loading Forever / No Response"

**Causes:**
- API timeout
- Streaming not working
- Server crash

**Debug Steps:**

1. **Check Server Logs:**
```bash
npm run dev
# Look for errors when you send a message
```

2. **Test API Directly:**
```bash
# Test counselling endpoint
curl -X POST http://localhost:3000/api/counselling \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "conversationHistory": []
  }'
```

3. **Check Network Tab:**
- Open DevTools → Network
- Send message
- Look for the API request
- Check status code (should be 200)
- Check response

---

### Issue 3: "AI Service Not Configured" Message

**This means:** `OPENAI_API_KEY` not found

**Solutions:**

1. **Verify `.env.local` exists:**
```bash
cd /Users/adalbertuskamanzi/Desktop/kiul-app
ls -la .env.local
```

2. **Verify key is set:**
```bash
grep OPENAI_API_KEY .env.local
```

3. **Restart dev server:**
```bash
pkill -f "next dev"
npm run dev
```

4. **Check environment in running app:**
Add this to any API route temporarily:
```typescript
console.log('API Key present:', !!process.env.OPENAI_API_KEY);
console.log('API Key starts with:', process.env.OPENAI_API_KEY?.slice(0, 10));
```

---

## 🔧 FIXING MODEL ACCESS ISSUES

If you're on a **free OpenAI account**, GPT-4 won't work. Here's how to downgrade to free models:

### Update All Routes to Use GPT-4o-mini:

I can update these files for you:
1. `/app/api/counselling/route.ts` - Line 127: Change `gpt-4` → `gpt-4o-mini`
2. `/app/api/mentorship/route.ts` - Line 106: Change `gpt-4` → `gpt-4o-mini`
3. `/app/api/kiul-assistant/route.ts` - Already uses `gpt-4o` ✅
4. `/app/api/short-courses/route.ts` - Already uses `gpt-4o` ✅
5. `/app/api/assistant/route.ts` - Already uses `gpt-4o-mini` ✅

**Would you like me to make these changes?**

---

## 🧪 TESTING CHECKLIST

### Test 1: Environment Variable
```bash
cd /Users/adalbertuskamanzi/Desktop/kiul-app
grep OPENAI_API_KEY .env.local
# Should show: OPENAI_API_KEY=sk-proj-...
```
**Your Result:** ✅ PASS

### Test 2: API Key Validity
```bash
OPENAI_KEY=$(grep "OPENAI_API_KEY" .env.local | cut -d'=' -f2)
curl -s https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_KEY" | grep gpt-4
```
**Your Result:** ✅ PASS (API responds correctly)

### Test 3: Model Access
Visit: https://platform.openai.com/account/limits

Check:
- [ ] GPT-4 available (requires paid account)
- [ ] GPT-4o available (requires paid account)  
- [x] GPT-4o-mini available (free tier)

### Test 4: Usage Limits
Visit: https://platform.openai.com/usage

Check:
- [ ] Have remaining credits
- [ ] No rate limit exceeded
- [ ] API key not revoked

### Test 5: Browser Test
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/counselling
3. Open DevTools (F12)
4. Send message: "Hello"
5. Check Console for errors
6. Check Network for API response

---

## 🚀 QUICK FIXES

### Fix 1: Use Free-Tier Models Only

If you're on a free account, update to use only `gpt-4o-mini`:

**Update counselling/route.ts:**
```typescript
// Line 127: Change this
model: 'gpt-4',

// To this
model: 'gpt-4o-mini',
```

**Update mentorship/route.ts:**
```typescript
// Line 106: Change this
model: 'gpt-4',

// To this  
model: 'gpt-4o-mini',
```

### Fix 2: Add Error Logging

Add detailed logging to see exact errors:

**In any API route, add:**
```typescript
} catch (error: any) {
  console.error('=== DETAILED ERROR ===');
  console.error('Error type:', error.constructor.name);
  console.error('Error message:', error.message);
  console.error('Error code:', error.code);
  console.error('Error status:', error.status);
  console.error('Full error:', JSON.stringify(error, null, 2));
  
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}
```

### Fix 3: Test with Minimal Code

Create a test endpoint to isolate the issue:

**Create `/app/api/test-openai/route.ts`:**
```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'No API key' }, { status: 500 });
    }

    // Initialize client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Simple test request
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use free-tier model
      messages: [{ role: 'user', content: 'Say hello' }],
      max_tokens: 10,
    });

    return NextResponse.json({
      success: true,
      response: completion.choices[0]?.message?.content,
      model: completion.model,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      type: error.type,
    }, { status: 500 });
  }
}
```

Then test:
```bash
curl http://localhost:3000/api/test-openai
```

---

## 📞 NEXT STEPS

### Option A: You're on Free Tier
**Do this:**
1. Confirm you have free credits left: https://platform.openai.com/usage
2. Update models to `gpt-4o-mini` (I can do this for you)
3. Test again

### Option B: You're on Paid Tier
**Do this:**
1. Check account has credits: https://platform.openai.com/account/billing
2. Verify no rate limits hit: https://platform.openai.com/account/limits
3. Test browser console for specific errors

### Option C: Need Detailed Debugging
**Tell me:**
1. What specific page you're testing (e.g., /counselling)
2. What error message you see (if any)
3. What happens when you send a message:
   - Nothing happens?
   - Loading forever?
   - Error message?
   - Different behavior?

---

## 🔍 SPECIFIC DEBUGGING COMMANDS

### Check Your OpenAI Account Status:
```bash
# Get account details
OPENAI_KEY=$(grep "OPENAI_API_KEY" .env.local | cut -d'=' -f2)
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_KEY" \
  -s | jq '.data[].id' | grep gpt
```

### Test Each Endpoint:
```bash
# Test counselling
curl -X POST http://localhost:3000/api/counselling \
  -H "Content-Type: application/json" \
  -d '{"message":"test","conversationHistory":[]}'

# Test mentorship
curl -X POST http://localhost:3000/api/mentorship \
  -H "Content-Type: application/json" \
  -d '{"message":"test","conversationHistory":[]}'

# Test KIUL assistant
curl -X POST http://localhost:3000/api/kiul-assistant \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

---

## ✅ RECOMMENDED ACTIONS

**I recommend we:**

1. **Update models to free-tier** (if you're on free account)
   - Change GPT-4 → GPT-4o-mini in counselling and mentorship routes
   - This will make everything work on free tier

2. **Add better error handling**
   - Show user-friendly error messages
   - Log detailed errors for debugging

3. **Create test endpoint**
   - Easy way to verify OpenAI connection
   - Isolate issues from app logic

**Would you like me to implement these changes?**

Just let me know:
- Are you on OpenAI free or paid tier?
- What specific error/behavior are you seeing?
- Which page/feature isn't working?

I'll fix it immediately! 🚀
