"use client";

import { useState } from "react";
import StandardPageLayout from '../../components/StandardPageLayout';
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
    <StandardPageLayout>

      <h1 className="text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-lg)] text-center">
        KIUL Academic Books
      </h1>

      <div className="flex flex-col md:flex-row gap-[var(--space-lg)]">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] shadow-[var(--kiul-shadow-soft)] rounded-xl p-[var(--space-lg)]">

          {/* INTRO */}
          <section className="mb-[var(--space-lg)]">
            <h2 className="text-2xl font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
              About KIUL Academic Books
            </h2>

            <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-sm)]">
              KIUL publishes scholarly works that advance critical thinking, Ubuntu
              philosophy, development studies, and transformational leadership in
              Africa. These books reflect rigor, reflection, and social relevance.
            </p>

            <p className="text-[var(--kiul-text-medium)] leading-relaxed">
              Book summaries are freely accessible.  
              To request full copies, email:{" "}
              <strong>info.kiul@katokifoundation.org</strong>.
            </p>
          </section>

          <div className="border-t border-[var(--kiul-border)] my-8"></div>

          {/* SEARCH + FILTER */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          <h2 className="text-2xl font-semibold text-[var(--kiul-emerald-900)] mb-6">
            Published Books
          </h2>

          {/* BOOK CARDS */}
          {filtered.map((b, i) => (
            <div
              key={i}
              className="border border-[var(--kiul-border)] rounded-xl p-6 mb-8 bg-[var(--kiul-card-bg)] shadow-sm"
            >
              <p className="text-[var(--kiul-text-dark)] font-medium text-lg mb-1">
                {b.authors} ({b.year}).{" "}
                <span className="italic">{b.title}</span>.
              </p>

              {b.isbn && (
                <p className="text-[var(--kiul-text-light)] text-sm mb-3">ISBN: {b.isbn}</p>
              )}

              <p className="text-[var(--kiul-text-medium)] mb-4 leading-relaxed">{b.abstract}</p>

              {/* REQUEST COPY BUTTON */}
              {b.request && (
                <a
                  href={`mailto:info.kiul@katokifoundation.org?subject=Request%20for%20${encodeURIComponent(
                    b.title
                  )}`}
                  className="inline-block px-4 py-2 bg-[var(--kiul-emerald-800)] text-white rounded-lg text-sm font-medium hover:bg-[var(--kiul-emerald-700)] transition"
                >
                  Request Copy
                </a>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[var(--kiul-text-light)] italic">No books match your search.</p>
          )}
        </div>
      </div>
    </StandardPageLayout>
  );
}
