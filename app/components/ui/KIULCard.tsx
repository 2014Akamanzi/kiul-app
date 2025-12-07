import React from 'react';

interface KIULCardProps {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'soft' | 'md' | 'lg' | 'none';
  className?: string;
}

export default function KIULCard({
  children,
  hover = false,
  padding = 'lg',
  border = true,
  shadow = 'soft',
  className = ''
}: KIULCardProps) {
  const paddingClasses = {
    sm: 'p-[var(--space-sm)]',
    md: 'p-[var(--space-md)]',
    lg: 'p-[var(--space-lg)]'
  };

  const shadowClasses = {
    none: '',
    soft: 'shadow-[var(--kiul-shadow-soft)]',
    md: 'shadow-[var(--kiul-shadow-md)]',
    lg: 'shadow-[var(--kiul-shadow-lg)]'
  };

  const borderClass = border ? 'border border-[var(--kiul-border)]' : '';
  const hoverClass = hover ? 'hover:shadow-[var(--kiul-shadow-lg)] hover:transform hover:scale-[1.02] transition-all duration-300' : '';

  return (
    <div 
      className={`bg-[var(--kiul-card-bg)] rounded-2xl ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
