import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  gradient?: boolean;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  badge, 
  centered = true,
  gradient = false 
}: PageHeaderProps) {
  return (
    <section className={`w-full py-[var(--space-2xl)] px-[var(--space-lg)] ${
      gradient 
        ? 'bg-gradient-to-br from-[var(--kiul-emerald-50)] via-[var(--kiul-bg-main)] to-[var(--kiul-emerald-50)]'
        : 'bg-[var(--kiul-bg-soft)]'
    }`}>
      <div className={`max-w-4xl mx-auto ${centered ? 'text-center' : ''}`}>
        {badge && (
          <span className="inline-block px-4 py-2 bg-[var(--kiul-emerald-100)] text-[var(--kiul-emerald-800)] text-sm font-semibold rounded-full mb-[var(--space-sm)] uppercase tracking-wider">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-[var(--kiul-text-medium)] leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
