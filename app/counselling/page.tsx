"use client";

import { useState } from "react";
import { shouldEscalate } from "@/app/lib/escalation";
import { streamChatCompletion } from "@/app/lib/streamChat";

export default function CounsellingPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the KIUL Counselling Companion — a gentle Ubuntu-inspired space for emotional reflection and support. How are you feeling today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [showSafetyWarning, setShowSafetyWarning] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Check for safety escalation
    if (shouldEscalate(userMessage.text)) {
      setShowSafetyWarning(true);
      const safetyReply = {
        role: "assistant",
        text: "I hear your pain, and you deserve immediate care. I cannot let you go through this alone.\n\nPlease contact KIUL immediately so we can support you:\n\n📱 WhatsApp: +255-758624863\n📧 Email: counselling@katokifoundation.org\n\nIf you are in danger, contact your local emergency services right now.",
      };
      setMessages((prev) => [...prev, safetyReply]);
      return;
    }

    // Call counselling API
    setIsStreaming(true);
    const loadingMessage = { role: "assistant", text: "..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      // Prepare conversation history
      const conversationHistory = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      }));

      const response = await fetch("/api/counselling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          conversationHistory,
        }),
      });

      const data = await response.json();

      // Remove loading message and add real response
      setMessages((prev) => {
        const withoutLoading = prev.slice(0, -1);
        return [
          ...withoutLoading,
          {
            role: "assistant",
            text: data.message || data.error || "I'm here to listen. Please share what's on your mind.",
          },
        ];
      });

      // Check if high risk was detected
      if (data.isHighRisk) {
        setShowSafetyWarning(true);
      }
    } catch (error) {
      console.error("Counselling error:", error);
      setMessages((prev) => {
        const withoutLoading = prev.slice(0, -1);
        return [
          ...withoutLoading,
          {
            role: "assistant",
            text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us at counselling@katokifoundation.org",
          },
        ];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
        Counselling Companion
      </h1>

      <p className="text-[16px] text-[var(--kiul-text-soft)] mb-4 max-w-3xl">
        A gentle Ubuntu-inspired space for emotional reflection and support.
      </p>

      {/* Introduction */}
      <div className="max-w-3xl mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Welcome to Your Safe Space</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          This is a confidential space where you can share your thoughts, feelings, and concerns. 
          Our AI counselling companion is here to listen with empathy, grounded in Ubuntu philosophy 
          — <em>"I am because we are."</em>
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>How it works:</strong> Simply type your thoughts in the chat below. The companion 
          will respond with care, offering reflections and support. Remember, this is a supportive tool, 
          not a replacement for professional therapy. If you're in crisis, please reach out to our team directly.
        </p>
      </div>

      {/* Subscription Tiers */}
      <div className="max-w-md mx-auto mb-12 text-center">
        <h2 className="text-xs font-semibold mb-3 text-gray-500">Choose Your Tier</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="border border-blue-300 rounded-lg p-2 bg-blue-50 shadow-sm">
            <h3 className="font-bold text-[11px] mb-1 text-blue-900">Free</h3>
            <p className="text-[9px] text-blue-700 leading-tight">
              • 1 session/week<br />
              • 15 messages<br />
              • Basic support
            </p>
          </div>
          <div className="border-2 border-emerald-400 rounded-lg p-2 bg-emerald-100 relative shadow-md">
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">
              RECOMMENDED
            </div>
            <h3 className="font-bold text-[11px] mb-1 text-emerald-900">Standard</h3>
            <p className="text-[9px] text-emerald-700 leading-tight">
              • Unlimited sessions<br />
              • Saved history<br />
              • Priority responses
            </p>
          </div>
          <div className="border border-purple-300 rounded-lg p-2 bg-purple-50 shadow-sm">
            <h3 className="font-bold text-[11px] mb-1 text-purple-900">Premium</h3>
            <p className="text-[9px] text-purple-700 leading-tight">
              • All Standard<br />
              • Voice notes<br />
              • Zoom calls
            </p>
          </div>
        </div>
      </div>

      {/* Safety Warning Banner */}
      {showSafetyWarning && (
        <div className="max-w-[900px] mx-auto mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl">
          <p className="text-red-800 font-semibold mb-2">
            🔴 Crisis Support Available
          </p>
          <p className="text-sm text-red-700">
            If you are in immediate danger, please reach out to our crisis team
            or local emergency services.
          </p>
        </div>
      )}

      {/* Chat Interface */}
      <div className="max-w-[750px] mx-auto">
        <div 
          className="overflow-y-auto mb-3 space-y-3 p-6 border-2 border-emerald-200 rounded-2xl bg-gradient-to-b from-emerald-50/30 to-white shadow-sm"
          style={{
            minHeight: messages.length <= 2 ? '250px' : 'auto',
            maxHeight: '600px'
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-800 border-2 border-emerald-200"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                {isStreaming && i === messages.length - 1 && (
                  <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 bg-white border-2 border-emerald-300 rounded-2xl p-4 shadow-md">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your heart..."
              disabled={isStreaming}
              rows={3}
              className="flex-grow border-2 border-gray-300 rounded-xl px-4 py-3 text-base resize-none focus:outline-none focus:border-[var(--kiul-green)] disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isStreaming}
              className="px-8 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold text-base
                         hover:bg-emerald-700 transition disabled:opacity-50 self-end shadow-sm"
            >
              {isStreaming ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* Reminder */}
      <div className="max-w-[900px] mx-auto mt-8 p-6 bg-[var(--kiul-bg-soft)] rounded-xl">
        <p className="text-sm text-[var(--kiul-text-soft)] text-center">
          💚 Remember: "I am because we are." Your healing is our healing.
        </p>
      </div>
    </div>
  );
}
