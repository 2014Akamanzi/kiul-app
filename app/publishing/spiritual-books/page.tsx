"use client";

import { useState } from "react";
import Container from '../../components/Container';
import PublicationContainer from '../../components/PublicationContainer';
import PublishingSidebar from "@/app/publishing/PublishingSidebar";
import PublicationSearch from "@/app/components/PublicationSearch";
import YearFilter from "@/app/components/YearFilter";

export default function SpiritualBooksPage() {
  // ------------------------------------
  // SPIRITUAL BOOK DATA
  // ------------------------------------
  const books = [
    {
      title: "Journey of Faith",
      authors: "Kamanzi, A.",
      year: "2023",
      abstract:
        "A reflective journey into the meaning of faith, purpose, resilience, and personal transformation. This work invites readers to reconnect with hope, meaning, and the deeper layers of their humanity through the Ubuntu spirit.",
      request: true,
    },
    {
      title: "The Quiet Struggle",
      authors: "Kamanzi, A.",
      year: "2024",
      abstract:
        "A motivational reflection encouraging individuals to take charge of their bodies, minds, and futures. The book blends Ubuntu ethics with gentle spiritual wisdom for readers facing personal or emotional challenges.",
      request: true,
    },
    // Add more spiritual books here
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
    <Container>

      <h1 className="text-4xl font-semibold text-[var(--kiul-text-dark)] mt-0 mb-6 text-center">
        Spiritual & Motivation Books
      </h1>

      <div className="flex flex-col md:flex-row gap-[var(--space-lg)]">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] shadow-[var(--kiul-shadow-soft)] rounded-xl p-[var(--space-lg)]">

          {/* INTRO */}
          <section className="mb-[var(--space-lg)]">
            <h2 className="text-2xl font-semibold text-[var(--kiul-text-dark)] mb-4">
              Why Spiritual & Motivation Books?
            </h2>

            <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-4">
              KIUL's spiritual and motivational books offer gentle guidance,
              reflection, and encouragement rooted in Ubuntu wisdom. These
              publications aim to heal, inspire, and support individuals on
              their personal journeys toward wholeness and purpose.
            </p>

            <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-4">
              Summaries are freely accessible. Full copies may be requested via
              email: <strong>info.kiul@katokifoundation.org</strong>.
            </p>
          </section>

          <div className="border-t border-[var(--kiul-border)] my-8"></div>

          {/* SEARCH + YEAR FILTER */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          {/* BOOKS */}
          <h2 className="text-2xl font-semibold text-[var(--kiul-text-dark)] mb-6">
            Published Titles
          </h2>

          {filtered.map((b, i) => (
            <div
              key={i}
              className="border border-[var(--kiul-green-soft)] rounded-[10px] p-6 mb-8 bg-white shadow-[var(--kiul-card-shadow)]"
            >
              <p className="text-[var(--kiul-text-dark)] font-medium text-lg mb-1">
                {b.authors} ({b.year}).{" "}
                <span className="italic">{b.title}</span>.
              </p>

              <p className="text-[var(--kiul-text-medium)] mb-4 leading-relaxed">
                {b.abstract}
              </p>

              {/* REQUEST COPY BUTTON */}
              {b.request && (
                <a
                  href={`mailto:info.kiul@katokifoundation.org?subject=Request%20for%20${encodeURIComponent(
                    b.title
                  )}`}
                  className="inline-block h-[46px] leading-[46px] px-6 bg-[var(--kiul-green)] text-white rounded-[10px] text-sm font-medium hover:bg-[var(--kiul-green)]/90 transition"
                >
                  Request Copy
                </a>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[var(--kiul-text-light)] italic">
              No titles match your search.
            </p>
          )}

        </div>
      </div>
    </Container>
  );
}
