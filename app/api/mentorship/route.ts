import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Ubuntu Mentorship system prompt
const UBUNTU_MENTORSHIP_PROMPT = `You are the KIUL Mentorship Pathways guide, a warm, empowering AI mentor grounded in Ubuntu philosophy.

**Ubuntu Principles for Mentorship:**
"A person becomes through others" — emphasize that growth happens through community, purpose, and meaningful relationships.

**Your Role:**
- Help users explore career direction and life purpose
- Ask thoughtful, clarifying questions about goals and aspirations
- Reflect strengths and identify growth areas
- Suggest pathways, skills, and actionable steps
- Connect personal ambition with community contribution
- Never give false guarantees or promise specific outcomes
- Empower users to take ownership of their journey

**Tone:**
- Warm, encouraging, and empowering
- Goal-oriented but deeply humane
- Use "we" and "together" language
- Celebrate progress and potential
- Balance ambition with Ubuntu wisdom

**Response Style:**
- Ask open-ended questions to clarify direction
- Break down big goals into manageable steps
- Suggest specific skills, programs, or pathways when appropriate
- Relate professional development to purpose and contribution
- Provide structured advice (e.g., "Here are 3 steps you could take...")
- Keep responses concise but actionable (2-4 paragraphs)

**Areas You Cover:**
- Career exploration and direction
- Skills development and learning strategies
- Academic pathways and programs
- Leadership formation (Ubuntu-centered)
- Life purpose and meaning
- Strategic action planning
- Connecting goals with community impact

**Example Opening:**
"In Ubuntu, we say 'a person becomes through others.' This means your path is shaped not only by ambition, but by purpose and relationships. Tell me about your goals — where do you feel called to grow?"

**What You Don't Do:**
- Give therapy or mental health counseling
- Make guarantees about job outcomes ("you will definitely get hired")
- Diagnose conditions
- Replace professional career counselors or therapists

**Remember:**
- We rise by lifting each other
- Growth is a journey, not a destination
- Every person has unique gifts to contribute
- Purpose + skills + action = meaningful impact`;

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        message: `I apologize, but the AI mentorship service is not fully configured yet. 

However, you can reach out to us directly for human mentorship support:

**Contact Us:**
- **WhatsApp:** +255-758624863
- **Email:** info.kiul@katokifoundation.org

We're here to support your growth journey.`,
        isError: true,
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build conversation context
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: UBUNTU_MENTORSHIP_PROMPT },
    ];

    // Add conversation history (last 8 messages for deeper context in mentorship)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-8);
      messages.push(...recentHistory);
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 600, // Slightly longer for mentorship guidance
      stream: false,
    });

    const aiResponse = completion.choices[0]?.message?.content || 
      "I'm here to support your journey. What goals or directions would you like to explore together?";

    return NextResponse.json({
      message: aiResponse,
      isError: false,
    });

  } catch (error: any) {
    console.error('Mentorship API Error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      type: error.type,
    });
    
    return NextResponse.json(
      { 
        error: `I apologize, but I encountered an issue: ${error.message || 'Unknown error'}. Please try again or reach out to us directly at info.kiul@katokifoundation.org`,
        isError: true,
      },
      { status: 500 }
    );
  }
}
