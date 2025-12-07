import React from 'react';

interface StandardPageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'narrow' | 'standard' | 'wide';
  className?: string;
}

/**
 * StandardPageLayout - Professional centered content layout
 * Used across all KIUL pages for consistent margins and readability
 * 
 * @param maxWidth - 'narrow' (4xl), 'standard' (5xl), 'wide' (6xl)
 * @param className - Additional Tailwind classes
 */
export default function StandardPageLayout({ 
  children, 
  maxWidth = 'standard',
  className = '' 
}: StandardPageLayoutProps) {
  const widthClasses = {
    narrow: 'max-w-4xl',   // ~896px - for text-heavy content
    standard: 'max-w-5xl', // ~1024px - default for most pages
    wide: 'max-w-6xl'      // ~1152px - for content with sidebars
  };

  return (
    <div className={`${widthClasses[maxWidth]} mx-auto px-6 py-12 ${className}`}>
      {children}
    </div>
  );
}
