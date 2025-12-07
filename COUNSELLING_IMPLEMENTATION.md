# KIUL Counselling Companion - Implementation Guide

## Overview

The KIUL Counselling Companion is a fully functional AI-powered counselling interface built with Ubuntu philosophy at its core. It provides a safe, compassionate space for reflection and emotional support.

## Features Implemented

### ✅ **Full Chat Interface**
- Real-time conversation with AI counsellor
- Message history with scrolling
- Loading states with animated indicators
- Responsive design (mobile → desktop)
- Clean two-column layout on desktop, stacked on mobile

### ✅ **Ubuntu-Centered AI Persona**
- Warm, empathetic tone grounded in Ubuntu philosophy
- Reflects emotions and validates feelings
- Encourages grounding and self-awareness
- Never diagnoses or provides medical instructions
- Contextual conversation memory (last 6 messages)

### ✅ **Safety Logic**
- High-risk keyword detection (suicide, self-harm, etc.)
- Immediate safety response with contact information:
  - WhatsApp: +255-758624863
  - Email: info.kiul@katokifoundation.org
  - Emergency services referral
- Visual emphasis on safety messages (red background)

### ✅ **Subscription Tiers (UI Only)**
Three pricing tiers with complete styling:
1. **Free Tier**: 10 messages/day, basic AI counselling
2. **Standard Tier** (Recommended): Unlimited messages, save 3 sessions, deeper reflective mode
3. **Premium Tier**: Everything + Ubuntu Circle Zoom, course discounts, anonymous email support

### ✅ **KIUL Design System Integration**
- All colors use CSS variables from design tokens
- Consistent spacing with `var(--space-*)` scale
- Shadow system: `var(--kiul-shadow-soft)` and `var(--kiul-shadow-lg)`
- Emerald color palette throughout
- Responsive breakpoints: mobile, md (640px+), lg (1024px+)

## File Structure

```
/app/counselling/page.tsx          # Main counselling page with layout
/app/api/counselling/route.ts      # Backend API with OpenAI integration
/app/components/CounsellingChat.tsx # Chat interface component
/.env.local.example                 # Environment variable template
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install openai
```
✅ Already installed

### 2. Configure OpenAI API Key

Create a `.env.local` file in the project root:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Start the Development Server
```bash
npm run dev
```
✅ Currently running at http://localhost:3000

### 4. Access the Counselling Interface
Navigate to: http://localhost:3000/counselling

## Technical Specifications

### Chat UI Components

**Container:**
- `rounded-2xl` border radius
- `shadow-[var(--kiul-shadow-soft)]` for subtle depth
- `h-[600px]` fixed height with scrollable content
- `bg-[var(--kiul-card-bg)]` background

**AI Messages:**
- Soft emerald background: `bg-[var(--kiul-emerald-50)]`
- Border: `border-[var(--kiul-emerald-200)]`
- Max width: 80% of container

**User Messages:**
- White background: `bg-[var(--kiul-card-bg)]`
- Border: `border-[var(--kiul-border)]`
- Right-aligned with `justify-end`

**Input Field:**
- Border: `border-[var(--kiul-emerald-200)]`
- Focus ring: `focus:ring-2 focus:ring-[var(--kiul-emerald-600)]`
- Rounded: `rounded-lg`
- Padding: `px-4 py-3`

**Send Button:**
- Background: `bg-[var(--kiul-emerald-700)]`
- Hover: `hover:bg-[var(--kiul-emerald-800)]`
- Disabled state with gray background
- Icon animation on hover

### API Backend (`/api/counselling/route.ts`)

**High-Risk Keywords:**
```typescript
'suicide', 'kill myself', 'self-harm', 'hurt myself', 
'end my life', 'want to die', "don't want to live", 
'ending it all', 'better off dead', 'no reason to live'
```

**Response Flow:**
1. Receive user message
2. Check for high-risk keywords (case-insensitive)
3. If detected → Return immediate safety response
4. Otherwise → Send to OpenAI GPT-4 with Ubuntu system prompt
5. Return AI response with conversation context

**OpenAI Configuration:**
- Model: `gpt-4`
- Temperature: `0.7` (balanced creativity)
- Max tokens: `500` (concise responses)
- Context: Last 6 messages for continuity

### Ubuntu Counselling System Prompt

The AI is instructed to:
- Embody Ubuntu philosophy: "I am because we are"
- Provide warm, non-judgmental support
- Listen deeply and validate emotions
- Encourage grounding techniques
- Never diagnose or give medical advice
- Gently suggest professional help when appropriate
- Keep responses concise (2-4 paragraphs)

## User Experience Flow

### Desktop (lg: 1024px+)
```
┌─────────────────────────────────────────────────┐
│              Page Header (centered)              │
├─────────────────────────────────────────────────┤
│          Subscription Tiers (3 cards)           │
├──────────────────────┬──────────────────────────┤
│   Left Description   │   Right Chat Interface   │
│   - Title            │   - Chat header          │
│   - Subtitle         │   - Message bubbles      │
│   - Explanation      │   - Input + Send         │
│   - What to Expect   │                          │
│   - Safety Notice    │                          │
└──────────────────────┴──────────────────────────┘
```

### Mobile (< 1024px)
```
┌─────────────────┐
│   Page Header   │
├─────────────────┤
│ Subscription 1  │
│ Subscription 2  │
│ Subscription 3  │
├─────────────────┤
│  Description    │
├─────────────────┤
│ Chat Interface  │
└─────────────────┘
```

## Design Token Usage

### Colors
- **Primary Emerald**: `var(--kiul-emerald-700)` - Buttons, accents
- **Light Emerald**: `var(--kiul-emerald-50)` - AI message backgrounds
- **Dark Emerald**: `var(--kiul-emerald-900)` - Main headings
- **Text Colors**: `var(--kiul-text-dark)`, `var(--kiul-text-medium)`
- **Backgrounds**: `var(--kiul-bg-main)`, `var(--kiul-bg-soft)`, `var(--kiul-card-bg)`
- **Borders**: `var(--kiul-border)`, `var(--kiul-emerald-200)`

### Spacing
- **xs**: `var(--space-xs)` = 8px
- **sm**: `var(--space-sm)` = 12px
- **md**: `var(--space-md)` = 16px
- **lg**: `var(--space-lg)` = 24px
- **xl**: `var(--space-xl)` = 32px
- **2xl**: `var(--space-2xl)` = 48px

### Shadows
- **Soft**: `var(--kiul-shadow-soft)` - Cards at rest
- **Medium**: `var(--kiul-shadow-md)` - Interactive elements
- **Large**: `var(--kiul-shadow-lg)` - Hover states

## Safety Features

### High-Risk Detection
When a user message contains high-risk keywords:
1. AI immediately returns safety response (no OpenAI call)
2. Message displays with red background and border
3. Contact information prominently displayed:
   - WhatsApp: +255-758624863
   - Email: info.kiul@katokifoundation.org
   - Emergency services referral

### Disclaimers
- Top of chat: "This is a supportive companion, not a replacement for professional mental health care"
- Safety notice box with emergency contacts
- Bottom section: Reminder about professional help

## Next Steps for Production

### Required Actions:
1. ✅ Add OpenAI API key to `.env.local`
2. ⏸️ Implement subscription tier backend (payment processing)
3. ⏸️ Add session persistence (save conversation history)
4. ⏸️ Implement user authentication
5. ⏸️ Add message limits for free tier (10/day)
6. ⏸️ Set up monitoring for high-risk conversations
7. ⏸️ Add analytics tracking
8. ⏸️ Create admin dashboard for safety oversight

### Optional Enhancements:
- Message streaming for real-time responses
- Voice input/output
- Multi-language support
- Export conversation transcripts
- Schedule Ubuntu Circle Zoom sessions
- Email notification system

## Testing Checklist

✅ **Visual Design**
- [x] Two-column layout on desktop
- [x] Stacked layout on mobile
- [x] All colors use design tokens
- [x] Consistent spacing throughout
- [x] Hover effects on buttons and cards
- [x] Responsive subscription tier cards

✅ **Chat Functionality**
- [x] Send messages via button
- [x] Send messages via Enter key
- [x] Loading state displays during API call
- [x] Auto-scroll to newest message
- [x] Message history persists during session
- [x] User vs AI messages visually distinct

✅ **Safety Logic**
- [x] High-risk keywords trigger safety response
- [x] Safety message has red styling
- [x] Contact information clearly displayed
- [x] No AI call made for high-risk messages

⏸️ **API Integration** (Requires OpenAI key)
- [ ] AI responds with Ubuntu-centered tone
- [ ] Conversation context maintained
- [ ] Error handling works correctly
- [ ] Response time acceptable

## Troubleshooting

### Issue: "Cannot find module 'openai'"
**Solution:** Run `npm install openai`

### Issue: API returns 500 error
**Solution:** Check that `OPENAI_API_KEY` is set in `.env.local`

### Issue: Chat not scrolling
**Solution:** Verify `messagesEndRef` is attached and `useEffect` runs on message updates

### Issue: High-risk keywords not detected
**Solution:** Check that keywords are lowercase and message is converted with `.toLowerCase()`

## Ubuntu Philosophy Integration

The counselling companion embodies Ubuntu through:
- **"I am because we are"** - Emphasizing interconnectedness
- **Communal healing** - Encouraging community support
- **Dignity-centered care** - Respecting each person's worth
- **Relational wisdom** - Understanding struggles within context
- **Gentle encouragement** - Supporting without judgment

## Credits

- **Design System:** KIUL Institutional Design System
- **AI Model:** OpenAI GPT-4
- **Philosophy:** Ubuntu ("I am because we are")
- **Implementation:** Next.js 16.0.7, React, TypeScript, Tailwind CSS

---

**For support or questions, contact:**
- Email: info.kiul@katokifoundation.org
- WhatsApp: +255-758624863
