import React from 'react';

interface BubbleProps {
  message: string;
}

export function UserBubble({ message }: BubbleProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[75%] bg-white border border-[var(--kiul-border)] p-4 rounded-2xl shadow-[var(--kiul-shadow-soft)] text-[var(--kiul-text)]">
        {message}
      </div>
    </div>
  );
}

export function AIBubble({ message }: BubbleProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[75%] bg-[var(--kiul-primary-light)] text-[var(--kiul-primary)] p-4 rounded-2xl shadow-[var(--kiul-shadow-soft)]">
        {message}
      </div>
    </div>
  );
}
