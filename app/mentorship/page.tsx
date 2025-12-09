"use client";

import { useState } from "react";

export default function MentorshipPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to KIUL Mentorship Pathways — a guided Ubuntu-inspired space for career growth, purpose discovery, and personal development. What is the goal you are working toward?",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Add loading message
    const loadingMessage = { role: "assistant", text: "..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      // Call the API
      const conversationHistory = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      }));

      const response = await fetch("/api/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
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
            text: data.message || data.error || "I'm here to support your journey. Please try again.",
          },
        ];
      });
    } catch (error) {
      console.error("Mentorship error:", error);
      setMessages((prev) => {
        const withoutLoading = prev.slice(0, -1);
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
      handleSend();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-emerald-50/30 to-white">
      {/* PAGE HEADER */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--kiul-text-dark)] mb-3">
          KIUL Mentorship Pathways
        </h1>

        <p className="text-base text-[var(--kiul-text-soft)] leading-relaxed">
          A structured, compassionate space for envisioning your career, planning your future, and receiving guidance rooted in Ubuntu: <strong>"I rise because we rise together."</strong>
        </p>
      </div>

      {/* INTRODUCTION SECTION */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-md">
          <h2 className="text-xl font-bold text-emerald-800 mb-3">Welcome to Your Mentorship Journey</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            KIUL Mentorship is designed to support your career exploration, skills development, and purposeful direction through Ubuntu philosophy. Whether you're exploring career options, planning your next steps, or seeking guidance on professional growth, our AI mentorship companion is here to help.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            <span className="font-semibold">How it works:</span> Share your goals, questions, or challenges. Our mentorship guide will provide personalized advice, help you map your career pathway, and support your professional development journey. Your conversations grow more insightful as we learn about your aspirations and strengths.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            This Ubuntu mentorship guide supports career exploration, skills development, and purposeful direction. Your growth journey is shaped by relationships, choices, and continuous learning.
            <span className="block mt-2 text-emerald-700 italic font-semibold">
              "Umuntu ngumuntu ngabantu" — We become through each other.
            </span>
          </p>
        </div>
      </div>

      {/* Subscription Tiers */}
      <div className="max-w-md mx-auto px-4 mb-12 text-center">
        <h2 className="text-xs font-semibold mb-3 text-gray-500">Choose Your Tier</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="border border-blue-300 rounded-lg p-2 bg-blue-50 shadow-sm">
            <h3 className="font-bold text-[11px] mb-1 text-blue-900">Free</h3>
            <p className="text-[9px] text-blue-700 leading-tight">
              • 10 messages/day<br />
              • Basic guidance<br />
              • No history
            </p>
          </div>
          <div className="border-2 border-emerald-400 rounded-lg p-2 bg-emerald-100 relative shadow-md">
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">
              RECOMMENDED
            </div>
            <h3 className="font-bold text-[11px] mb-1 text-emerald-900">Standard</h3>
            <p className="text-[9px] text-emerald-700 leading-tight">
              • Unlimited chat<br />
              • Save 5 sessions<br />
              • Goal mapping
            </p>
          </div>
          <div className="border border-purple-300 rounded-lg p-2 bg-purple-50 shadow-sm">
            <h3 className="font-bold text-[11px] mb-1 text-purple-900">Premium</h3>
            <p className="text-[9px] text-purple-700 leading-tight">
              • All Standard<br />
              • Portfolio builder<br />
              • Monthly Q&A
            </p>
          </div>
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div
          style={{
            minHeight: messages.length <= 2 ? "250px" : "auto",
            maxHeight: "600px",
          }}
          className="bg-gradient-to-b from-emerald-50/30 to-white border-2 border-emerald-200 rounded-2xl shadow-lg overflow-y-auto p-6 flex flex-col gap-3"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-line shadow-sm ${
                m.role === "assistant"
                  ? "bg-emerald-50 text-gray-800 border border-emerald-200 self-start"
                  : "bg-orange-500 text-white self-end"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="mt-4 bg-white border-2 border-emerald-200 rounded-2xl shadow-md p-4">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your goals or questions..."
              rows={3}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-xl text-base resize-none
                         focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

            <button
              onClick={handleSend}
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl self-end
                         hover:bg-emerald-700 transition shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
