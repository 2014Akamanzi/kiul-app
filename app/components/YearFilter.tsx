"use client";

export default function YearFilter({ years, onFilter }) {
  return (
    <div className="mb-6">
      <select
        className="px-4 py-2 rounded-xl border border-[#d9c5a3] bg-[#fbfaf8] text-[#1a1a1a] focus:border-[#1a4d2e] focus:ring-0 outline-none"
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
