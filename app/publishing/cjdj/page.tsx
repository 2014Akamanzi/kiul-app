"use client";

import { useState } from "react";
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
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-10 text-center">
        Commons, Justice & Development Journal (CJDJ)
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white border border-[#e8e1d8] shadow-sm rounded-xl p-8">

          {/* INTRO */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">About the Journal</h2>
            <p className="text-[#444] leading-relaxed mb-4">
              The <strong>Commons, Justice & Development Journal (CJDJ)</strong> 
              publishes peer-reviewed research on Ubuntu philosophy, justice, 
              leadership, governance, and social transformation in Africa and beyond.
            </p>
          </section>

          <div className="border-t border-[#e8e1d8] my-8"></div>

          {/* SEARCH + FILTER */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          {/* ARTICLES */}
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">Journal Articles</h2>

          {filtered.map((a, i) => (
            <div
              key={i}
              className="border border-[#e8e1d8] rounded-xl p-6 mb-6 bg-[#fafafa] shadow-sm"
            >
              <p className="text-lg font-medium text-[#1a1a1a] mb-1">
                {a.authors} ({a.year}). <span className="italic">{a.title}</span>.
              </p>

              <p className="text-[#444] leading-relaxed mb-4">{a.abstract}</p>

              <a
                href={a.pdf}
                className="inline-block px-4 py-2 bg-[#1a4d2e] text-white rounded-lg text-sm font-medium hover:bg-[#163d25] transition"
              >
                Download PDF
              </a>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[#777] italic">No articles match your search.</p>
          )}
        </div>
      </div>
    </main>
  );
}
