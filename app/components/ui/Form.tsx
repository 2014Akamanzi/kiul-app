import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function InputField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = ''
}: InputFieldProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-[var(--kiul-emerald-900)] mb-2"
      >
        {label} {required && <span className="text-[var(--kiul-error)]">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-[var(--kiul-emerald-200)] rounded-lg p-3 
          text-[var(--kiul-text-dark)] bg-[var(--kiul-card-bg)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-500)] 
          focus:border-transparent transition-all duration-200"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 6,
  className = ''
}: TextAreaFieldProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-[var(--kiul-emerald-900)] mb-2"
      >
        {label} {required && <span className="text-[var(--kiul-error)]">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full border border-[var(--kiul-emerald-200)] rounded-lg p-3 
          text-[var(--kiul-text-dark)] bg-[var(--kiul-card-bg)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-500)] 
          focus:border-transparent transition-all duration-200 resize-vertical"
      />
    </div>
  );
}

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({ 
  children, 
  onClick, 
  disabled = false,
  className = '' 
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[var(--kiul-emerald-700)] text-white font-semibold 
        px-6 py-3 rounded-lg hover:bg-[var(--kiul-emerald-800)] 
        hover:shadow-lg transition-all duration-300 
        focus:outline-none focus:ring-4 focus:ring-[var(--kiul-emerald-500)]/30
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
