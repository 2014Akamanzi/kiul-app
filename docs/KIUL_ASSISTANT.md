# KIUL All-in-One AI Assistant

## Overview
The KIUL Assistant is a global helper accessible from every page via a floating button in the bottom-right corner. It provides Ubuntu-based guidance, answers questions about KIUL services, and helps users navigate the platform.

## Features

### 🎯 Capabilities
- **Service Information**: Explains all KIUL services (Counselling, Mentorship, Short Courses)
- **Navigation Help**: Guides users to the right pages
- **Ubuntu Wisdom**: Shares Ubuntu philosophy and insights
- **Subscription Info**: Explains tiers and pricing
- **General Guidance**: Provides warm, informational support

### 🚫 Boundaries
- **Not a Counsellor**: Redirects deep emotional support to Counselling Companion
- **Not a Mentor**: Redirects career guidance to Mentorship Pathways
- **Not Clinical**: Does not provide medical or therapeutic advice
- **Safety First**: Has built-in crisis detection and response

## Safety Features

### Crisis Detection
The assistant monitors for keywords related to:
- Suicide or self-harm
- Crisis situations
- Emergency needs

### Safety Response
When crisis keywords are detected:
1. Stops the conversation
2. Provides immediate contact information:
   - WhatsApp: +255-758624863
   - Email: info.kiul@katokifoundation.org
3. Encourages contacting emergency services if in immediate danger
4. Disables further input until the modal is closed

## UI Components

### 1. AssistantButton (`/app/components/ai/AssistantButton.tsx`)
- **Position**: Fixed bottom-right (bottom-6 right-6)
- **Style**: Gradient emerald background with pulse animation
- **Icon**: Lightning bolt (Sparkle icon)
- **Hover**: Scales up with tooltip
- **Accessibility**: Proper ARIA labels

### 2. KiulAssistant (`/app/components/ai/KiulAssistant.tsx`)
- **Modal**: Full-screen on mobile, centered on desktop
- **Header**: Gradient emerald with KIUL branding
- **Quick Actions**: 4 predefined questions for easy start
- **Chat Interface**: WhatsApp-style messages
- **Loading State**: Animated dots while processing
- **High-Risk Warning**: Red banner when crisis detected

## Backend API

### Route: `/app/api/kiul-assistant/route.ts`

**Model**: GPT-4o
**Temperature**: 0.7
**Max Tokens**: 500

**Features**:
- Conversation history (last 10 messages)
- Safety keyword detection
- Ubuntu-based persona
- Service-specific knowledge
- Error handling

## Usage Examples

### User Asks About Services
**User**: "What does KIUL offer?"
**Assistant**: Explains all three main services with details

### User Needs Navigation
**User**: "Where can I find short courses?"
**Assistant**: "Visit the Short Courses Generator at /short-courses..."

### User Asks About Ubuntu
**User**: "What is Ubuntu philosophy?"
**Assistant**: Explains "I am because we are" with context

### User Needs Deep Support
**User**: "I need help with my career goals"
**Assistant**: "For personalized career guidance, visit our Mentorship Pathways at /mentorship..."

### Crisis Situation
**User**: "I feel suicidal"
**Assistant**: Shows safety response with contacts, disables input

## Integration

The assistant is globally available through the root layout:

```tsx
// app/layout.tsx
import AssistantButton from "./components/ai/AssistantButton";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <Footer />
        <AssistantButton />
      </body>
    </html>
  );
}
```

## Quick Actions

Predefined questions users can click:
1. "What is KIUL?" → Full service overview
2. "How do I subscribe?" → Subscription information
3. "Tell me about Ubuntu" → Ubuntu philosophy explanation
4. "Short Courses" → How the course generator works

## Communication Style

The assistant maintains a warm, Ubuntu-informed tone:
- **Welcoming**: "👋 Hello! I'm your KIUL Assistant..."
- **Encouraging**: "You're taking a great step toward growth..."
- **Informational**: Clear, concise answers
- **Actionable**: Always provides next steps

## Prohibited Topics

The assistant will NOT:
- Provide therapy or counselling
- Give medical advice
- Offer crisis intervention (redirects instead)
- Make clinical diagnoses
- Replace specialized services

## Future Enhancements

Potential improvements:
- Voice input/output
- Multi-language support
- Conversation history persistence
- Integration with user accounts
- Analytics on common questions
- Suggested resources based on queries

## Maintenance

### Updating the Persona
Edit the `KIUL_ASSISTANT_PERSONA` in `/app/api/kiul-assistant/route.ts`

### Adding Safety Keywords
Update the `SAFETY_KEYWORDS` array in the same file

### Modifying Quick Actions
Edit the `quickActions` array in `KiulAssistant.tsx`

## Technical Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4o
- **Storage**: Client-side state (no persistence)
- **Styling**: KIUL Design System tokens
