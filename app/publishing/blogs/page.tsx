"use client";

import { useState } from "react";
import StandardPageLayout from '../../components/StandardPageLayout';
import PublishingSidebar from "@/app/publishing/PublishingSidebar";
import PublicationSearch from "@/app/components/PublicationSearch";

export default function BlogsPage() {
  // ------------------------------------
  // BLOG DATA
  // ------------------------------------
  const blogs = [
    {
      title: "Ubuntu and the Art of Leadership",
      authors: "Kamanzi, A.",
      year: "2024",
      abstract:
        "A reflection on how Ubuntu values reshape leadership practice in contemporary African institutions. The blog highlights relational accountability, empathy, and collective purpose.",
      link: "#", // Replace with actual route when blogs are implemented
    },
    {
      title: "Why Taking a Break Matters",
      authors: "Kamanzi, A.",
      year: "2025",
      abstract:
        "Drawing from the Janus metaphor, this blog explores why rest is essential for personal clarity, creativity, and sustainable growth in modern life.",
      link: "#",
    },
    // Add more blogs here
  ];

  const [filtered, setFiltered] = useState(blogs);

  // ------------------------------------
  // SEARCH HANDLER
  // ------------------------------------
  function handleSearch(query: string) {
    const q = query.toLowerCase();
    const result = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.authors.toLowerCase().includes(q) ||
        b.year.includes(q) ||
        b.abstract.toLowerCase().includes(q)
    );
    setFiltered(result);
  }

  // ------------------------------------
  // PAGE LAYOUT
  // ------------------------------------
  return (
    <StandardPageLayout>

      <h1 className="text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-lg)] text-center">
        KIUL Blog & Reflections
      </h1>

      <div className="flex flex-col md:flex-row gap-[var(--space-lg)]">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] shadow-[var(--kiul-shadow-soft)] rounded-xl p-[var(--space-lg)]">

          {/* INTRO */}
          <section className="mb-[var(--space-lg)]">
            <h2 className="text-2xl font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
              Ubuntu Reflections, Essays, and Public Scholarship
            </h2>

            <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-sm)]">
              KIUL Blogs offer thought-provoking reflections grounded in Ubuntu,
              leadership, personal development, spirituality, and development
              studies. These writings aim to inspire, challenge, and deepen our
              collective understanding of humanity.
            </p>

            <p className="text-[var(--kiul-text-medium)] leading-relaxed">
              All blogs are freely accessible. Longer essays may eventually become
              part of KIUL monographs or teaching materials.
            </p>
          </section>

          <div className="border-t border-[var(--kiul-border)] my-8"></div>

          {/* SEARCH ONLY */}
          <PublicationSearch onSearch={handleSearch} />

          <h2 className="text-2xl font-semibold text-[var(--kiul-emerald-900)] mb-6">
            Blog Posts
          </h2>

          {/* BLOG CARDS */}
          {filtered.map((b, i) => (
            <div
              key={i}
              className="border border-[var(--kiul-border)] rounded-xl p-6 mb-8 bg-[var(--kiul-card-bg)] shadow-sm"
            >
              <p className="text-[var(--kiul-text-dark)] font-medium text-lg mb-1">
                {b.authors} ({b.year}).{" "}
                <span className="italic">{b.title}</span>.
              </p>

              <p className="text-[var(--kiul-text-medium)] mb-4 leading-relaxed">
                {b.abstract}
              </p>

              <a
                href={b.link}
                className="inline-block px-4 py-2 bg-[var(--kiul-emerald-800)] text-white rounded-lg text-sm font-medium hover:bg-[var(--kiul-emerald-700)] transition"
              >
                Read More
              </a>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[var(--kiul-text-light)] italic">No blog posts match your search.</p>
          )}
        </div>
      </div>
    </StandardPageLayout>
  );
}
