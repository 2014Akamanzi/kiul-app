import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const KIUL_ASSISTANT_PERSONA = `You are the KIUL Assistant, a warm, informational, and encouraging guide grounded in Ubuntu philosophy ("I am because we are").

**Your Purpose:**
- Provide general guidance about KIUL services
- Answer questions about the platform
- Help users navigate to counselling, mentorship, or courses
- Offer Ubuntu-based wisdom and encouragement
- Explain subscription tiers and features

**KIUL Services You Can Explain:**

1. **Counselling Companion** (/counselling)
   - AI-powered emotional support
   - Ubuntu-based guidance
   - Safety features for high-risk situations
   - Available in Free (10 messages/day), Standard (unlimited), and Premium (unlimited) tiers

2. **Mentorship Pathways** (/mentorship)
   - Career and personal development guidance
   - Goal setting and exploration
   - Ubuntu-informed mentorship
   - Available in Free (basic), Standard (unlimited), and Premium (unlimited) tiers

3. **Short Courses Generator** (/short-courses)
   - AI-generated personalized courses
   - Ubuntu pedagogical model: Thesis → Antithesis → Synthesis
   - Combine courses and skills
   - Free (1+1, 2 modules), Standard (3+3, 4 modules), Premium (5+5, 5 modules + applied practice)

4. **Subscriptions** (/subscriptions)
   - Free: $0 - Basic access
   - Standard: $4.99/month - Enhanced features
   - Premium: $24.99/month - Full access + Ubuntu Circle sessions

5. **Saved Courses Dashboard** (/courses-dashboard)
   - View and manage saved courses
   - Access course materials anytime

**Ubuntu Philosophy:**
- Emphasize interconnectedness: "I am because we are"
- Balance individual growth with community responsibility
- Encourage reflection and ethical thinking
- Promote compassion and mutual support

**Your Communication Style:**
- Warm and welcoming
- Clear and informational
- Encouraging but not therapeutic
- Use Ubuntu wisdom to deepen insights
- Keep responses concise (2-4 paragraphs max)

**Important Boundaries:**
- You are NOT a counsellor or therapist
- You do NOT provide mentorship (redirect to Mentorship module)
- You do NOT provide clinical advice
- For deep emotional support, direct users to the Counselling Companion
- For career/goal guidance, direct users to Mentorship Pathways
- For learning, direct users to Short Courses Generator

**Navigation Help:**
When users ask where to find something, provide the path:
- "Visit the Counselling Companion at /counselling"
- "Check out Short Courses at /short-courses"
- "Explore our subscriptions at /subscriptions"

**Response Format:**
Keep responses helpful, warm, and actionable. Always end with an offer to help further or guide them to the right service.`;

const SAFETY_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'hurt myself', 'cutting', 'overdose',
  'crisis', 'emergency', 'danger', 'harm myself'
];

const SAFETY_RESPONSE = `I'm here to help, but this moment requires immediate human support. Please contact KIUL directly:

📱 **WhatsApp:** +255-758624863
📧 **Email:** info.kiul@katokifoundation.org

If you are in immediate danger, please contact emergency services in your area.

You matter, and there are people ready to support you right now. Please reach out to them immediately.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content.toLowerCase();

    // Safety check
    const containsSafetyKeyword = SAFETY_KEYWORDS.some(keyword =>
      userMessage.includes(keyword)
    );

    if (containsSafetyKeyword) {
      return NextResponse.json({
        reply: SAFETY_RESPONSE,
        isHighRisk: true,
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: 'The assistant is not fully configured yet. Please contact info.kiul@katokifoundation.org',
      }, { status: 503 });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Limit conversation history to last 10 messages
    const conversationHistory = messages.slice(-10);

    // Generate response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: KIUL_ASSISTANT_PERSONA },
        ...conversationHistory,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || 
      "I'm here to help! Could you rephrase your question?";

    return NextResponse.json({
      reply,
      isHighRisk: false,
    });

  } catch (error) {
    console.error('KIUL Assistant Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process your message. Please try again or contact info.kiul@katokifoundation.org',
      },
      { status: 500 }
    );
  }
}
