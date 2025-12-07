"use client";

import { useState } from "react";
import StandardPageLayout from '../../components/StandardPageLayout';
import PublishingSidebar from "@/app/publishing/PublishingSidebar";
import PublicationSearch from "@/app/components/PublicationSearch";
import YearFilter from "@/app/components/YearFilter";

export default function CJDJPage() {
  // -------------------------
  // Publication Data
  // -------------------------
  const articles = [
    {
      title: "Ubuntu, Justice, and the Future of African Leadership",
      authors: "Kamanzi, A.",
      year: "2025",
      abstract:
        "This article explores how Ubuntu philosophy provides a relational framework for transforming leadership, strengthening justice systems, and fostering inclusive development across Africa.",
      pdf: "/publications/cjdj/sample-article.pdf",
    },
    // Add more articles here
  ];

  // Extract available years
  const years = [...new Set(articles.map((a) => a.year))];

  const [filtered, setFiltered] = useState(articles);

  // -------------------------
  // Search Handler
  // -------------------------
  function handleSearch(query: string) {
    const q = query.toLowerCase();
    const result = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.authors.toLowerCase().includes(q) ||
        a.year.includes(q) ||
        a.abstract.toLowerCase().includes(q)
    );
    setFiltered(result);
  }

  // -------------------------
  // Year Filter Handler
  // -------------------------
  function handleYearFilter(year: string | null) {
    if (!year) {
      setFiltered(articles);
      return;
    }
    setFiltered(articles.filter((a) => a.year === year));
  }

  return (
    <StandardPageLayout>
      <h1 className="text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-lg)] text-center">
        Commons, Justice & Development Journal (CJDJ)
      </h1>

      <div className="flex flex-col md:flex-row gap-[var(--space-lg)]">
        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] shadow-[var(--kiul-shadow-soft)] rounded-xl p-[var(--space-lg)]">

          {/* INTRO */}
          <section className="mb-[var(--space-lg)]">
            <h2 className="text-2xl font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">About the Journal</h2>
            <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-sm)]">
              The <strong>Commons, Justice & Development Journal (CJDJ)</strong> 
              publishes peer-reviewed research on Ubuntu philosophy, justice, 
              leadership, governance, and social transformation in Africa and beyond.
            </p>
          </section>

          <div className="border-t border-[var(--kiul-border)] my-[var(--space-lg)]"></div>

          {/* SEARCH + FILTER */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          {/* ARTICLES */}
          <h2 className="text-2xl font-semibold text-[var(--kiul-emerald-900)] mb-6">Journal Articles</h2>

          {filtered.map((a, i) => (
            <div
              key={i}
              className="border border-[var(--kiul-border)] rounded-xl p-6 mb-6 bg-[var(--kiul-card-bg)] shadow-sm"
            >
              <p className="text-lg font-medium text-[var(--kiul-text-dark)] mb-1">
                {a.authors} ({a.year}). <span className="italic">{a.title}</span>.
              </p>

              <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-4">{a.abstract}</p>

              <a
                href={a.pdf}
                className="inline-block px-4 py-2 bg-[var(--kiul-emerald-800)] text-white rounded-lg text-sm font-medium hover:bg-[var(--kiul-emerald-700)] transition"
              >
                Download PDF
              </a>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[var(--kiul-text-light)] italic">No articles match your search.</p>
          )}
        </div>
      </div>
    </StandardPageLayout>
  );
}
