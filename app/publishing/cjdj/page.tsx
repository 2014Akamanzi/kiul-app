"use client";

import { useState } from "react";
import Container from '../../components/Container';
import PublicationContainer from '../../components/PublicationContainer';
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
    <Container>
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--kiul-text-dark)] mt-0 mb-6 text-center">
        Commons, Justice & Development Journal (CJDJ)
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <PublicationContainer>
            {/* INTRO */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--kiul-text-dark)] mb-4">About the Journal</h2>
              <p className="text-[16px] text-[var(--kiul-text-soft)] leading-relaxed">
                The <strong>Commons, Justice & Development Journal (CJDJ)</strong> 
                publishes peer-reviewed research on Ubuntu philosophy, justice, 
                leadership, governance, and social transformation in Africa and beyond.
              </p>
            </section>

            <div className="my-10 border-t border-[#e5e2da]"></div>

            {/* SEARCH + FILTER */}
            <PublicationSearch onSearch={handleSearch} />
            <YearFilter years={years} onFilter={handleYearFilter} />
          </PublicationContainer>

          <PublicationContainer>
            {/* ARTICLES */}
            <h2 className="text-2xl font-semibold text-[var(--kiul-text-dark)] mb-6">Journal Articles</h2>

            {filtered.map((a, i) => (
              <div key={i}>
                <div className="mb-8">
                  <p className="text-[15px] text-[var(--kiul-text-soft)] mb-1">
                    {a.authors} · {a.year}
                  </p>
                  <h3 className="text-xl font-semibold text-[var(--kiul-text-dark)] mb-3">{a.title}</h3>
                  <p className="text-[16px] text-[var(--kiul-text-soft)] leading-relaxed mb-4">{a.abstract}</p>
                  <a href={a.pdf} className="btn-secondary inline-block mt-3">
                    Download PDF
                  </a>
                </div>
                {i < filtered.length - 1 && <div className="my-10 border-t border-[#e5e2da]"></div>}
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-[var(--kiul-text-light)] italic">No articles match your search.</p>
            )}
          </PublicationContainer>
        </div>
      </div>
    </Container>
  );
}
