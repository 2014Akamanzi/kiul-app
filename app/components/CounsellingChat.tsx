"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHighRisk?: boolean;
}

export default function CounsellingChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "In Ubuntu we say, 'I am because we are.' You are not alone in what you're feeling. Let us walk gently through this together. What would you like to share with me?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage: Message = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/counselling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.error,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            isHighRisk: data.isHighRisk,
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered a connection issue. Please try again or reach out to us directly at info.kiul@katokifoundation.org',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-2xl shadow-[var(--kiul-shadow-soft)] overflow-hidden flex flex-col h-[600px]">
      
      {/* Chat Header */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
        <div>
          <h3 className="font-bold text-lg">Ubuntu Counselling Space</h3>
          <p className="text-sm text-emerald-50">A safe space for reflection</p>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-[#E5DDD5]"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm ${
                message.role === 'user'
                  ? 'bg-[#DCF8C6] text-gray-900 rounded-br-none'
                  : message.isHighRisk
                  ? 'bg-red-100 border-2 border-red-400 text-gray-900 rounded-bl-none'
                  : 'bg-white text-gray-900 rounded-bl-none'
              }`}
            >
              {/* Role Label */}
              <p className={`text-[10px] font-semibold mb-0.5 ${
                message.role === 'user' 
                  ? 'text-[#075E54]' 
                  : message.isHighRisk
                  ? 'text-red-700'
                  : 'text-[#128C7E]'
              }`}>
                {message.role === 'user' ? 'You' : 'Ubuntu Companion'}
              </p>
              
              {/* Message Content */}
              <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              
              {/* Timestamp */}
              <p className={`text-[10px] mt-1 text-right ${
                message.role === 'user' ? 'text-[#075E54]/60' : 'text-gray-500'
              }`}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-bl-none px-3 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-300 bg-[#F0F0F0] px-3 py-2">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 border-none rounded-full px-4 py-2.5 text-gray-900 bg-white
                     focus:ring-2 focus:ring-[#128C7E] focus:outline-none transition-all
                     disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-[#128C7E] text-white p-3 rounded-full font-bold shadow-md
                     hover:bg-[#075E54] disabled:bg-gray-400 disabled:cursor-not-allowed 
                     transition-all duration-200 flex items-center justify-center"
            title="Send message"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-[var(--kiul-text-light)] mt-2 text-center">
          This is a supportive companion, not a replacement for professional mental health care.
        </p>
      </div>
    </div>
  );
}
