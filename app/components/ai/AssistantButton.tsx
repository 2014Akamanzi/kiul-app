"use client";

import { useState } from 'react';
import KiulAssistant from './KiulAssistant';

export default function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[var(--kiul-emerald-600)] to-[var(--kiul-emerald-700)] text-white rounded-full shadow-[var(--kiul-shadow-lg)] hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 group"
        aria-label="Open KIUL Assistant"
      >
        {/* Icon */}
        <svg 
          className="w-8 h-8 group-hover:rotate-12 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
        
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[var(--kiul-emerald-600)] opacity-75 animate-ping"></span>
      </button>

      {/* Badge/Tooltip on Hover */}
      <div className="fixed bottom-24 right-6 z-40 pointer-events-none">
        <div className="bg-[var(--kiul-emerald-900)] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Need Help? Ask KIUL Assistant
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[var(--kiul-emerald-900)] transform rotate-45"></div>
        </div>
      </div>

      {/* Assistant Modal */}
      {isOpen && <KiulAssistant onClose={() => setIsOpen(false)} />}

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}
