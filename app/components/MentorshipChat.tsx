"use client";

import { useState, useRef, useEffect } from 'react';
import { UserBubble, AIBubble } from './ChatBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

export default function MentorshipChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "In Ubuntu, we say 'a person becomes through others.' This means your path is shaped not only by ambition, but by purpose and relationships. Tell me about your goals — where do you feel called to grow?",
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

      const response = await fetch('/api/mentorship', {
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
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            isError: data.isError,
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
          isError: true,
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
    <div className="bg-white border border-[var(--kiul-green-soft)] rounded-[10px] shadow-[var(--kiul-card-shadow)] overflow-hidden flex flex-col h-[600px]">
      
      {/* Chat Header */}
      <div className="bg-[var(--kiul-green)] text-white px-4 py-3 flex items-center gap-3">
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
          />
        </svg>
        <div>
          <h3 className="font-bold text-lg">Ubuntu Mentorship Guide</h3>
          <p className="text-sm text-emerald-50">Explore your path with purpose</p>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-[var(--kiul-background)]"
      >
        <div className="chat-container">
          {messages.map((message, index) => (
            message.role === 'user' ? (
              <UserBubble key={index} message={message.content} />
            ) : (
              <AIBubble key={index} message={message.content} />
            )
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble-assistant shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white border-t border-[var(--kiul-green-soft)] p-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
            className="w-full h-[46px] px-4 rounded-[10px] border border-[var(--kiul-green-soft)] focus:ring-2 focus:ring-[var(--kiul-green)] outline-none transition-all
                     disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="h-[46px] px-6 rounded-[10px] bg-[var(--kiul-green)] text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Send message"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
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
          This is a supportive guide for career exploration, not a guarantee of specific outcomes.
        </p>
      </div>
    </div>
  );
}
