import React from 'react';

interface KIULInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function KIULInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon
}: KIULInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[var(--kiul-text-dark)] mb-2">
          {label}
          {required && <span className="text-[var(--kiul-error)] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--kiul-text-light)]">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-[var(--kiul-card-bg)] border rounded-xl text-[var(--kiul-text-dark)] placeholder-[var(--kiul-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-600)] focus:border-transparent transition-all ${
            error ? 'border-[var(--kiul-error)]' : 'border-[var(--kiul-border)]'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-[var(--kiul-error)]">{error}</p>
      )}
    </div>
  );
}

interface KIULTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function KIULTextarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4
}: KIULTextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[var(--kiul-text-dark)] mb-2">
          {label}
          {required && <span className="text-[var(--kiul-error)] ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 bg-[var(--kiul-card-bg)] border rounded-xl text-[var(--kiul-text-dark)] placeholder-[var(--kiul-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-600)] focus:border-transparent transition-all resize-none ${
          error ? 'border-[var(--kiul-error)]' : 'border-[var(--kiul-border)]'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--kiul-error)]">{error}</p>
      )}
    </div>
  );
}

interface KIULSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function KIULSelect({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false
}: KIULSelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[var(--kiul-text-dark)] mb-2">
          {label}
          {required && <span className="text-[var(--kiul-error)] ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-3 bg-[var(--kiul-card-bg)] border rounded-xl text-[var(--kiul-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-600)] focus:border-transparent transition-all ${
          error ? 'border-[var(--kiul-error)]' : 'border-[var(--kiul-border)]'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-[var(--kiul-error)]">{error}</p>
      )}
    </div>
  );
}
