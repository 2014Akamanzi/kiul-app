import React from 'react';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  href?: string;
}

export function GenericCard({ children, className = '', hover = true }: CardProps) {
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-[var(--kiul-emerald-600)] hover:-translate-y-1' : '';
  
  return (
    <div className={`bg-[var(--kiul-card-bg)] border border-[var(--kiul-emerald-100)] 
      rounded-2xl p-6 transition-all duration-300 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

export function FeatureCard({ children, href, className = '' }: CardProps) {
  const cardContent = (
    <div className={`bg-[var(--kiul-card-bg)] border-2 border-[var(--kiul-emerald-100)] 
      rounded-2xl p-8 text-center transition-all duration-300 
      hover:border-[var(--kiul-emerald-600)] hover:shadow-lg 
      hover:scale-105 ${className}`}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

interface PublicationCardProps {
  title: string;
  authors?: string;
  year?: string;
  abstract?: string;
  pdfLink?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PublicationCard({ 
  title, 
  authors, 
  year, 
  abstract, 
  pdfLink, 
  children,
  className = '' 
}: PublicationCardProps) {
  return (
    <div className={`bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] 
      rounded-xl p-6 mb-4 transition-all duration-300 
      hover:shadow-md hover:border-[var(--kiul-emerald-200)] ${className}`}>
      <h3 className="text-xl font-semibold text-[var(--kiul-emerald-900)] mb-2">
        {title}
      </h3>
      
      {authors && (
        <p className="text-sm text-[var(--kiul-text-medium)] mb-1">
          <strong>Authors:</strong> {authors}
        </p>
      )}
      
      {year && (
        <p className="text-sm text-[var(--kiul-text-medium)] mb-3">
          <strong>Year:</strong> {year}
        </p>
      )}
      
      {abstract && (
        <p className="text-sm text-[var(--kiul-text-medium)] leading-relaxed mb-4">
          {abstract}
        </p>
      )}
      
      {pdfLink && (
        <a 
          href={pdfLink} 
          className="inline-block bg-[var(--kiul-emerald-700)] text-white text-sm 
          font-semibold px-4 py-2 rounded-lg hover:bg-[var(--kiul-emerald-800)] 
          transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      )}
      
      {children}
    </div>
  );
}

interface ProfileCardProps {
  name: string;
  title?: string;
  bio?: string;
  image?: string;
  className?: string;
}

export function ProfileCard({ name, title, bio, image, className = '' }: ProfileCardProps) {
  return (
    <div className={`bg-[var(--kiul-card-bg)] border border-[var(--kiul-emerald-100)] 
      rounded-2xl p-6 text-center transition-all duration-300 
      hover:shadow-lg hover:border-[var(--kiul-emerald-600)] ${className}`}>
      {image && (
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--kiul-emerald-100)] 
          flex items-center justify-center overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-[var(--kiul-emerald-900)] mb-1">
        {name}
      </h3>
      
      {title && (
        <p className="text-sm text-[var(--kiul-emerald-700)] font-medium mb-3">
          {title}
        </p>
      )}
      
      {bio && (
        <p className="text-sm text-[var(--kiul-text-medium)] leading-relaxed">
          {bio}
        </p>
      )}
    </div>
  );
}
