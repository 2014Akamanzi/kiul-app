import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, icon, className = '' }: PageHeaderProps) {
  return (
    <section className={`w-full bg-[var(--kiul-bg-soft)] py-16 px-6 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto text-center">
        {icon && (
          <div className="flex justify-center mb-4">
            {icon}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--kiul-emerald-900)] mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-[var(--kiul-text-medium)] mt-4 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

interface StandardPageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export function StandardPageLayout({ 
  children, 
  header, 
  sidebar, 
  className = '' 
}: StandardPageLayoutProps) {
  return (
    <main className={`min-h-screen bg-[var(--kiul-bg-main)] ${className}`}>
      {header}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {sidebar ? (
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-64 flex-shrink-0">
              {sidebar}
            </aside>
            <div className="flex-1">
              {children}
            </div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </main>
  );
}

interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export function TwoColumnLayout({ 
  leftColumn, 
  rightColumn, 
  header, 
  className = '' 
}: TwoColumnLayoutProps) {
  return (
    <main className={`min-h-screen bg-[var(--kiul-bg-main)] ${className}`}>
      {header}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>{leftColumn}</div>
            <div>{rightColumn}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({ children, size = 'xl', className = '' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  background?: 'main' | 'soft' | 'white';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Section({ 
  children, 
  background = 'main', 
  spacing = 'lg',
  className = '' 
}: SectionProps) {
  const bgClasses = {
    main: 'bg-[var(--kiul-bg-main)]',
    soft: 'bg-[var(--kiul-bg-soft)]',
    white: 'bg-[var(--kiul-card-bg)]'
  };

  const spacingClasses = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-20 md:py-24'
  };

  return (
    <section className={`${bgClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
