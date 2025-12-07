import React from 'react';

interface KIULSectionDividerProps {
  text?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export default function KIULSectionDivider({ text, spacing = 'md' }: KIULSectionDividerProps) {
  const spacingClasses = {
    sm: 'my-[var(--space-lg)]',
    md: 'my-[var(--space-xl)]',
    lg: 'my-[var(--space-2xl)]'
  };

  if (text) {
    return (
      <div className={`relative ${spacingClasses[spacing]}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--kiul-border)]"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--kiul-bg-main)] px-4 text-sm font-semibold text-[var(--kiul-text-medium)] uppercase tracking-wider">
            {text}
          </span>
        </div>
      </div>
    );
  }

  return <hr className={`border-t border-[var(--kiul-border)] ${spacingClasses[spacing]}`} />;
}
