"use client";

import { useState } from "react";
import PublishingSidebar from "@/app/publishing/PublishingSidebar";
import PublicationSearch from "@/app/components/PublicationSearch";
import YearFilter from "@/app/components/YearFilter";

export default function BooksPage() {
  // ------------------------------------
  // BOOK DATA
  // ------------------------------------
  const books = [
    {
      title: "Ubuntu and the Future of Leadership in Africa",
      authors: "Kamanzi, A.",
      year: "2024",
      abstract:
        "A groundbreaking examination of how Ubuntu philosophy can transform leadership cultures and development paradigms across Africa. The book offers a relational approach to ethics, governance, and human-centered leadership practice.",
      isbn: "978-1-23456-789-0",
      request: true,
    },
    // Add more books here
  ];

  const years = [...new Set(books.map((b) => b.year))];

  const [filtered, setFiltered] = useState(books);

  // -------------------------
  // SEARCH HANDLER
  // -------------------------
  function handleSearch(query: string) {
    const q = query.toLowerCase();
    const result = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.authors.toLowerCase().includes(q) ||
        b.year.includes(q) ||
        b.abstract.toLowerCase().includes(q)
    );
    setFiltered(result);
  }

  // -------------------------
  // YEAR FILTER HANDLER
  // -------------------------
  function handleYearFilter(year: string | null) {
    if (!year) {
      setFiltered(books);
      return;
    }
    setFiltered(books.filter((b) => b.year === year));
  }

  // ------------------------------------
  // PAGE LAYOUT
  // ------------------------------------
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-10 text-center">
        KIUL Academic Books
      </h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white border border-[#e8e1d8] shadow-sm rounded-xl p-8">

          {/* INTRO */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              About KIUL Academic Books
            </h2>

            <p className="text-[#444] leading-relaxed mb-4">
              KIUL publishes scholarly works that advance critical thinking, Ubuntu
              philosophy, development studies, and transformational leadership in
              Africa. These books reflect rigor, reflection, and social relevance.
            </p>

            <p className="text-[#444] leading-relaxed">
              Book summaries are freely accessible.  
              To request full copies, email:{" "}
              <strong>info.kiul@katokifoundation.org</strong>.
            </p>
          </section>

          <div className="border-t border-[#e8e1d8] my-8"></div>

          {/* SEARCH + FILTER */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
            Published Books
          </h2>

          {/* BOOK CARDS */}
          {filtered.map((b, i) => (
            <div
              key={i}
              className="border border-[#e8e1d8] rounded-xl p-6 mb-8 bg-[#fafafa] shadow-sm"
            >
              <p className="text-[#1a1a1a] font-medium text-lg mb-1">
                {b.authors} ({b.year}).{" "}
                <span className="italic">{b.title}</span>.
              </p>

              {b.isbn && (
                <p className="text-[#777] text-sm mb-3">ISBN: {b.isbn}</p>
              )}

              <p className="text-[#444] mb-4 leading-relaxed">{b.abstract}</p>

              {/* REQUEST COPY BUTTON */}
              {b.request && (
                <a
                  href={`mailto:info.kiul@katokifoundation.org?subject=Request%20for%20${encodeURIComponent(
                    b.title
                  )}`}
                  className="inline-block px-4 py-2 bg-[#1a4d2e] text-white rounded-lg text-sm font-medium hover:bg-[#163d25] transition"
                >
                  Request Copy
                </a>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[#777] italic">No books match your search.</p>
          )}
        </div>
      </div>
    </main>
  );
}
