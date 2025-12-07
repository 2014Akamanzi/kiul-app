import React from 'react';

interface KIULButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export default function KIULButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  icon
}: KIULButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-[var(--kiul-emerald-700)] text-white hover:bg-[var(--kiul-emerald-800)] shadow-[var(--kiul-shadow-soft)] hover:shadow-[var(--kiul-shadow-lg)]',
    secondary: 'bg-[var(--kiul-emerald-100)] text-[var(--kiul-emerald-900)] hover:bg-[var(--kiul-emerald-200)]',
    outline: 'border-2 border-[var(--kiul-emerald-700)] text-[var(--kiul-emerald-700)] hover:bg-[var(--kiul-emerald-50)]',
    ghost: 'text-[var(--kiul-emerald-700)] hover:bg-[var(--kiul-emerald-50)]'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
