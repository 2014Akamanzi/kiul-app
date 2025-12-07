"use client";

import { useState } from "react";

export default function PublicationSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.toLowerCase());
  }

  return (
    <div className="mb-8">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by title, author, year..."
        className="w-full px-4 py-3 rounded-xl border border-[#d9c5a3] focus:border-[#1a4d2e] focus:ring-0 outline-none bg-[#fbfaf8] text-[#1a1a1a]"
      />
    </div>
  );
}
