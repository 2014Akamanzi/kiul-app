import React from 'react';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: '1/3' | '1/2' | '2/3';
  gap?: 'sm' | 'md' | 'lg';
  reverseOnMobile?: boolean;
}

export default function TwoColumnLayout({
  left,
  right,
  leftWidth = '1/2',
  gap = 'lg',
  reverseOnMobile = false
}: TwoColumnLayoutProps) {
  const gapClasses = {
    sm: 'gap-[var(--space-md)]',
    md: 'gap-[var(--space-lg)]',
    lg: 'gap-[var(--space-2xl)]'
  };

  const widthClasses = {
    '1/3': 'lg:w-1/3',
    '1/2': 'lg:w-1/2',
    '2/3': 'lg:w-2/3'
  };

  const rightWidthClasses = {
    '1/3': 'lg:w-2/3',
    '1/2': 'lg:w-1/2',
    '2/3': 'lg:w-1/3'
  };

  return (
    <div className={`flex flex-col ${reverseOnMobile ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${gapClasses[gap]}`}>
      <div className={`w-full ${widthClasses[leftWidth]}`}>
        {left}
      </div>
      <div className={`w-full ${rightWidthClasses[leftWidth]}`}>
        {right}
      </div>
    </div>
  );
}
