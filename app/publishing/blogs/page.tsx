"use client";

import { useState } from "react";
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
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-10 text-center">
        KIUL Blog & Reflections
      </h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white border border-[#e8e1d8] shadow-sm rounded-xl p-8">

          {/* INTRO */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              Ubuntu Reflections, Essays, and Public Scholarship
            </h2>

            <p className="text-[#444] leading-relaxed mb-4">
              KIUL Blogs offer thought-provoking reflections grounded in Ubuntu,
              leadership, personal development, spirituality, and development
              studies. These writings aim to inspire, challenge, and deepen our
              collective understanding of humanity.
            </p>

            <p className="text-[#444] leading-relaxed">
              All blogs are freely accessible. Longer essays may eventually become
              part of KIUL monographs or teaching materials.
            </p>
          </section>

          <div className="border-t border-[#e8e1d8] my-8"></div>

          {/* SEARCH ONLY */}
          <PublicationSearch onSearch={handleSearch} />

          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
            Blog Posts
          </h2>

          {/* BLOG CARDS */}
          {filtered.map((b, i) => (
            <div
              key={i}
              className="border border-[#e8e1d8] rounded-xl p-6 mb-8 bg-[#fafafa] shadow-sm"
            >
              <p className="text-[#1a1a1a] font-medium text-lg mb-1">
                {b.authors} ({b.year}).{" "}
                <span className="italic">{b.title}</span>.
              </p>

              <p className="text-[#444] mb-4 leading-relaxed">
                {b.abstract}
              </p>

              <a
                href={b.link}
                className="inline-block px-4 py-2 bg-[#1a4d2e] text-white rounded-lg text-sm font-medium hover:bg-[#163d25] transition"
              >
                Read Full Blog
              </a>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[#777] italic">No blog posts match your search.</p>
          )}
        </div>
      </div>
    </main>
  );
}
