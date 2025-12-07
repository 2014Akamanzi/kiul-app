import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export function PrimaryButton({ 
  children, 
  href, 
  onClick, 
  type = 'button',
  className = '',
  disabled = false 
}: ButtonProps) {
  const baseClasses = `inline-block bg-[var(--kiul-emerald-700)] text-white font-semibold 
    px-6 py-3 rounded-xl transition-all duration-300 
    hover:bg-[var(--kiul-emerald-800)] hover:shadow-lg hover:-translate-y-0.5
    active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={baseClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ 
  children, 
  href, 
  onClick, 
  type = 'button',
  className = '',
  disabled = false 
}: ButtonProps) {
  const baseClasses = `inline-block bg-transparent text-[var(--kiul-emerald-700)] 
    font-semibold px-6 py-3 rounded-xl border-2 border-[var(--kiul-emerald-700)] 
    transition-all duration-300 hover:bg-[var(--kiul-emerald-50)] 
    hover:border-[var(--kiul-emerald-800)] disabled:opacity-50 
    disabled:cursor-not-allowed ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={baseClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function TextButton({ 
  children, 
  href, 
  onClick, 
  type = 'button',
  className = '' 
}: ButtonProps) {
  const baseClasses = `inline-block text-[var(--kiul-emerald-700)] font-medium 
    px-4 py-2 rounded-lg transition-all duration-300 
    hover:bg-[var(--kiul-emerald-50)] hover:underline ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
