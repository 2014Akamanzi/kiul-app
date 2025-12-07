"use client";

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = '' 
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg 
          className="h-5 w-5 text-[var(--kiul-text-light)]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-[var(--kiul-emerald-200)] 
          rounded-lg text-[var(--kiul-text-dark)] bg-[var(--kiul-card-bg)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-500)] 
          focus:border-transparent transition-all duration-200"
      />
    </div>
  );
}

interface YearFilterProps {
  years: string[];
  selectedYear: string | null;
  onChange: (year: string | null) => void;
  className?: string;
}

export function YearFilter({ 
  years, 
  selectedYear, 
  onChange,
  className = '' 
}: YearFilterProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-[var(--kiul-emerald-900)] mb-2">
        Filter by Year
      </label>
      <select
        value={selectedYear || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full border border-[var(--kiul-emerald-200)] rounded-lg p-3 
          text-[var(--kiul-text-dark)] bg-[var(--kiul-card-bg)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-500)] 
          focus:border-transparent transition-all duration-200"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
  className?: string;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onChange,
  className = '' 
}: CategoryFilterProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-[var(--kiul-emerald-900)] mb-2">
        Filter by Category
      </label>
      <select
        value={selectedCategory || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full border border-[var(--kiul-emerald-200)] rounded-lg p-3 
          text-[var(--kiul-text-dark)] bg-[var(--kiul-card-bg)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-500)] 
          focus:border-transparent transition-all duration-200"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
