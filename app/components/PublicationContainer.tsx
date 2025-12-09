import React from 'react';

interface PublicationContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PublicationContainer({ children, className = '' }: PublicationContainerProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-[#e8e5dd] p-8 mb-12 ${className}`}>
      {children}
    </div>
  );
}
