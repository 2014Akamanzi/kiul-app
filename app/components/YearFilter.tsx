"use client";

interface YearFilterProps {
  years: string[];
  onFilter: (year: string) => void;
}

export default function YearFilter({ years, onFilter }: YearFilterProps) {
  return (
    <div className="mb-[var(--space-lg)]">
      <select
        className="px-4 py-2 rounded-xl border border-[var(--kiul-border)] bg-[var(--kiul-card-bg)] text-[var(--kiul-text-dark)] focus:border-[var(--kiul-emerald-700)] focus:ring-2 focus:ring-[var(--kiul-emerald-600)] outline-none transition-all"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">Filter by Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
