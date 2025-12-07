"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface KiulAssistantProps {
  onClose: () => void;
}

export default function KiulAssistant({ onClose }: KiulAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your KIUL Assistant. I'm here to help you navigate our platform, explain our services, and share Ubuntu wisdom. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHighRisk, setIsHighRisk] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/kiul-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.isHighRisk) {
        setIsHighRisk(true);
      }

    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact info.kiul@katokifoundation.org',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: "What is KIUL?", query: "What does KIUL offer and what services do you provide?" },
    { label: "How do I subscribe?", query: "How do I subscribe to KIUL services?" },
    { label: "Tell me about Ubuntu", query: "What is Ubuntu philosophy and how does KIUL use it?" },
    { label: "Short Courses", query: "How do the Short Courses work?" },
  ];

  const handleQuickAction = (query: string) => {
    setInput(query);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-[var(--kiul-background)] rounded-t-3xl sm:rounded-2xl shadow-[var(--kiul-shadow-lg)] w-full sm:max-w-2xl h-[85vh] sm:h-[600px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--kiul-emerald-700)] to-[var(--kiul-emerald-800)] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">KIUL Assistant</h2>
              <p className="text-sm text-emerald-100">How can I help you today?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="p-4 bg-[var(--kiul-bg-soft)] border-b border-[var(--kiul-border)]">
            <p className="text-xs font-semibold text-[var(--kiul-text-medium)] mb-2 uppercase tracking-wider">
              Quick Actions
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.query)}
                  className="px-3 py-2 bg-[var(--kiul-card-bg)] border border-[var(--kiul-emerald-200)] rounded-lg text-sm text-[var(--kiul-emerald-700)] hover:bg-[var(--kiul-emerald-50)] hover:border-[var(--kiul-emerald-600)] transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-[var(--kiul-emerald-700)] text-white'
                    : 'bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] text-[var(--kiul-text-dark)]'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--kiul-emerald-600)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[var(--kiul-emerald-600)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[var(--kiul-emerald-600)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* High Risk Warning */}
        {isHighRisk && (
          <div className="px-4 py-3 bg-red-50 border-t-2 border-red-500">
            <p className="text-xs text-red-800 font-semibold">
              ⚠️ If you need immediate support, please reach out to the contacts provided above. We care about your wellbeing.
            </p>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-[var(--kiul-bg-soft)] border-t border-[var(--kiul-border)]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading || isHighRisk}
              className="flex-1 px-4 py-3 bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl text-[var(--kiul-text-dark)] placeholder-[var(--kiul-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-600)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || isHighRisk}
              className="px-6 py-3 bg-[var(--kiul-emerald-700)] text-white rounded-xl font-semibold hover:bg-[var(--kiul-emerald-800)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </button>
          </div>
          <p className="text-xs text-[var(--kiul-text-light)] mt-2">
            This assistant provides general guidance. For deep support, visit our specialized services.
          </p>
        </form>
      </div>
    </div>
  );
}
