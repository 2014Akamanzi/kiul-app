import OpenAI from "openai";

export const runtime = "edge";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    const systemMessage = systemPrompt || "You are KIUL AI Assistant, a compassionate guide grounded in Ubuntu philosophy. You help with counselling, mentorship, and academic guidance.";

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        ...messages,
      ],
      temperature: 0.6,
      max_tokens: 800,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "API request failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
