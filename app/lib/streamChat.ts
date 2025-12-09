// Helper function to stream OpenAI responses
export async function streamChatCompletion(
  messages: { role: string; text: string }[],
  onChunk: (text: string) => void,
  systemPrompt?: string
) {
  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((m) => ({ role: m.role, content: m.text })),
        systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("No reader available");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      onChunk(text);
    }
  } catch (error) {
    console.error("Streaming error:", error);
    throw error;
  }
}
