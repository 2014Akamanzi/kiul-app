import React from 'react';

interface StandardPageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export default function StandardPageLayout({ 
  children, 
  maxWidth = 'xl',
  padding = true 
}: StandardPageLayoutProps) {
  const widthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <main className="min-h-screen bg-[var(--kiul-bg-main)]">
      <div className={`${widthClasses[maxWidth]} mx-auto ${padding ? 'px-[var(--space-lg)] py-[var(--space-2xl)]' : ''}`}>
        {children}
      </div>
    </main>
  );
}
