"use client";

import { useState } from "react";

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to the KIUL AI Assistant — your companion for counselling, mentorship, short-course creation, and institutional support. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Add loading message
    const loadingMessage = { role: "assistant", text: "..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      // Call the API
      const messagesForAPI = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      }));

      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messagesForAPI, { role: "user", content: input }],
          systemPrompt: "You are KIUL AI Assistant, a compassionate guide grounded in Ubuntu philosophy. You help with counselling, mentorship, and academic guidance.",
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("API request failed");
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      // Remove loading message before streaming
      setMessages((prev) => prev.slice(0, -1));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiText += chunk;

        // Update message with accumulated text
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === "assistant") {
            return [...prev.slice(0, -1), { role: "assistant", text: aiText }];
          } else {
            return [...prev, { role: "assistant", text: aiText }];
          }
        });
      }
    } catch (error) {
      console.error("Assistant error:", error);
      setMessages((prev) => {
        const withoutLoading = prev.filter((m) => m.text !== "...");
        return [
          ...withoutLoading,
          {
            role: "assistant",
            text: "I apologize, but I encountered an issue. Please try again or contact us at info.kiul@katokifoundation.org",
          },
        ];
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
        KIUL All-in-One Assistant
      </h1>

      <p className="text-[16px] text-[var(--kiul-text-soft)] mb-6 max-w-2xl">
        Your unified companion for all KIUL services — counselling, mentorship,
        course creation, and more.
      </p>

      <div className="max-w-[750px] mx-auto">
        {/* Chat Container */}
        <div className="border border-[var(--kiul-green-soft)] rounded-lg p-4 bg-white h-[500px] overflow-y-auto flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-3 rounded-xl text-[15px] leading-relaxed whitespace-pre-line shadow-sm ${
                m.role === "assistant"
                  ? "bg-emerald-50 text-gray-800 border border-emerald-200 self-start"
                  : "bg-orange-500 text-white self-end"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-3 mt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-grow px-4 py-3 border rounded-xl text-[16px]
                       border-[var(--kiul-green-soft)] focus:outline-none focus:border-[var(--kiul-green)]"
          />

          <button
            onClick={send}
            className="px-6 py-3 rounded-xl bg-[var(--kiul-green)] text-white font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition"
          >
            Send
          </button>
        </div>

        {/* Feature Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/counselling"
              className="block border rounded-xl p-4 hover:border-[var(--kiul-green)] transition bg-white"
            >
              <div className="text-lg font-semibold mb-1">Counselling</div>
              <div className="text-sm text-[var(--kiul-text-soft)]">
                Emotional support & Ubuntu reflections
              </div>
            </a>
            <a
              href="/mentorship"
              className="block border rounded-xl p-4 hover:border-[var(--kiul-green)] transition bg-white"
            >
              <div className="text-lg font-semibold mb-1">Mentorship</div>
              <div className="text-sm text-[var(--kiul-text-soft)]">
                Career guidance & goal setting
              </div>
            </a>
            <a
              href="/short-courses/generator"
              className="block border rounded-xl p-4 hover:border-[var(--kiul-green)] transition bg-white"
            >
              <div className="text-lg font-semibold mb-1">Course Generator</div>
              <div className="text-sm text-[var(--kiul-text-soft)]">
                Build personalized learning paths
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
