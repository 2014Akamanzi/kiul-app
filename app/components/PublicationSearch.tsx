"use client";

import { useState } from "react";

interface PublicationSearchProps {
  onSearch: (query: string) => void;
}

export default function PublicationSearch({ onSearch }: PublicationSearchProps) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.toLowerCase());
  }

  return (
    <div className="mb-[var(--space-lg)]">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by title, author, year..."
        className="w-full px-4 py-3 rounded-xl border border-[var(--kiul-border)] focus:border-[var(--kiul-emerald-700)] focus:ring-2 focus:ring-[var(--kiul-emerald-600)] outline-none bg-[var(--kiul-card-bg)] text-[var(--kiul-text-dark)] transition-all"
      />
    </div>
  );
}
