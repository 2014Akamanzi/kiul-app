import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// High-risk keywords that trigger immediate safety response
const HIGH_RISK_KEYWORDS = [
  'suicide',
  'kill myself',
  'self-harm',
  'hurt myself',
  'end my life',
  'want to die',
  "don't want to live",
  'ending it all',
  'better off dead',
  'no reason to live',
  'harm myself',
  'take my life',
];

// Safety response for high-risk situations
const SAFETY_RESPONSE = `I am deeply concerned about your safety. You deserve immediate, human support right now.

**Please contact us directly at:**
- **WhatsApp:** +255-758624863
- **Email:** info.kiul@katokifoundation.org

**If you are in life-threatening danger, contact your local emergency services immediately.**

You matter, and there are people who care about you and want to help. Please reach out now.`;

// Ubuntu counselling system prompt
const UBUNTU_COUNSELLING_PROMPT = `You are the KIUL Counselling Companion, a warm, empathetic AI counsellor grounded in Ubuntu philosophy.

**Ubuntu Principles:**
"I am because we are" — emphasize interconnectedness, community, and shared humanity.

**Your Role:**
- Provide a safe, compassionate space for reflection
- Listen deeply and validate emotions
- Encourage grounding and self-awareness
- Never diagnose or give medical instructions
- Never provide medication advice or clinical treatment plans
- Gently suggest professional help when appropriate

**Tone:**
- Warm, gentle, and non-judgmental
- Use "we" and "together" language
- Acknowledge pain without minimizing it
- Encourage hope and resilience through Ubuntu lens

**Response Style:**
- Ask open-ended questions
- Reflect emotions back to the person
- Offer grounding techniques (breathing, nature, community)
- Share Ubuntu wisdom when appropriate
- Keep responses concise (2-4 paragraphs)

**Example Opening:**
"In Ubuntu we say, 'I am because we are.' You are not alone in what you're feeling. Let us walk gently through this together. What would you like to share with me?"

**Remember:**
- You are a supportive companion, not a replacement for professional help
- Encourage reaching out to trusted humans when needed
- Emphasize dignity, worth, and connection`;

function detectHighRisk(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return HIGH_RISK_KEYWORDS.some((keyword) => lowerMessage.includes(keyword));
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check for high-risk content
    if (detectHighRisk(message)) {
      return NextResponse.json({
        message: SAFETY_RESPONSE,
        isHighRisk: true,
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        message: `I apologize, but the AI counselling service is not fully configured yet. 

However, you can reach out to us directly for human support:

**Contact Us:**
- **WhatsApp:** +255-758624863
- **Email:** info.kiul@katokifoundation.org

We're here to listen and support you.`,
        isHighRisk: false,
      });
    }

    // Initialize OpenAI client only when API key is available
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build conversation context
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: UBUNTU_COUNSELLING_PROMPT },
    ];

    // Add conversation history (last 6 messages to maintain context)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-6);
      messages.push(...recentHistory);
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Get AI response with streaming
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 500,
      stream: false, // Set to false for simpler implementation; can enable streaming later
    });

    const aiResponse = completion.choices[0]?.message?.content || 
      "I'm here to listen. Please share what's on your mind.";

    return NextResponse.json({
      message: aiResponse,
      isHighRisk: false,
    });

  } catch (error) {
    console.error('Counselling API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'I apologize, but I encountered an issue. Please try again or reach out to us directly at info.kiul@katokifoundation.org',
        isHighRisk: false,
      },
      { status: 500 }
    );
  }
}
