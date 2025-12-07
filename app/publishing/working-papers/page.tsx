"use client";

import { useState } from "react";
import PublishingSidebar from "@/app/publishing/PublishingSidebar";
import PublicationSearch from "@/app/components/PublicationSearch";
import YearFilter from "@/app/components/YearFilter";

export default function WorkingPapersPage() {
  // ------------------------------------
  // WORKING PAPER DATA
  // ------------------------------------
  const papers = [
    {
      title: "The Agency Dilemma: Patronage Systems and Development in Africa",
      authors: "Kamanzi, A.",
      year: "2024",
      abstract:
        "This working paper examines how patronage systems shape development outcomes across African contexts. Using Ubuntu relational ethics as an analytical lens, the paper explores agency, power, and structural inequalities within development practice.",
      pdf: "/publications/working-papers/agency-dilemma.pdf",
    },
    {
      title: "Navigating Non-Linear Education-to-Work Trajectories in Namibia",
      authors: "Kamanzi, A.",
      year: "2025",
      abstract:
        "This paper analyses non-linear education-to-work patterns among Namibian youth, highlighting structural constraints, gendered expectations, and relational opportunities for empowerment through Ubuntu-inspired mentorship models.",
      pdf: "/publications/working-papers/nonlinear-trajectories.pdf",
    },
    // Add more working papers here
  ];

  const years = [...new Set(papers.map((p) => p.year))];
  const [filtered, setFiltered] = useState(papers);

  // ------------------------------------
  // SEARCH HANDLER
  // ------------------------------------
  function handleSearch(query: string) {
    const q = query.toLowerCase();
    const result = papers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.year.includes(q) ||
        p.abstract.toLowerCase().includes(q)
    );
    setFiltered(result);
  }

  // ------------------------------------
  // YEAR FILTER HANDLER
  // ------------------------------------
  function handleYearFilter(year: string | null) {
    if (!year) {
      setFiltered(papers);
      return;
    }
    setFiltered(papers.filter((p) => p.year === year));
  }

  // ------------------------------------
  // PAGE LAYOUT
  // ------------------------------------
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-10 text-center">
        KIUL Working Paper Series
      </h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white border border-[#e8e1d8] shadow-sm rounded-xl p-8">

          {/* INTRO */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              About the Working Paper Series
            </h2>

            <p className="text-[#444] leading-relaxed mb-4">
              KIUL Working Papers provide a platform for emerging and established
              scholars to share ongoing research, theoretical reflections, and
              policy-relevant insights rooted in Ubuntu-informed development
              thinking. These papers encourage dialogue, critique, and collective
              intellectual growth.
            </p>

            <p className="text-[#444] leading-relaxed mb-4">
              Working papers are freely accessible. Authors are expected to
              organise a seminar or webinar to present their work for public
              discussion and scholarly refinement.
            </p>
          </section>

          <div className="border-t border-[#e8e1d8] my-8"></div>

          {/* SEARCH + FILTERS */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
            Published Working Papers
          </h2>

          {/* PAPER CARDS */}
          {filtered.map((p, i) => (
            <div
              key={i}
              className="border border-[#e8e1d8] rounded-xl p-6 mb-8 bg-[#fafafa] shadow-sm"
            >
              <p className="text-[#1a1a1a] font-medium text-lg mb-1">
                {p.authors} ({p.year}).{" "}
                <span className="italic">{p.title}</span>.
              </p>

              <p className="text-[#444] mb-4 leading-relaxed">
                {p.abstract}
              </p>

              <div className="flex gap-4">
                {/* Download Button */}
                {p.pdf && (
                  <a
                    href={p.pdf}
                    target="_blank"
                    className="px-4 py-2 bg-[#1a4d2e] text-white rounded-lg text-sm font-medium hover:bg-[#163d25] transition"
                  >
                    Download PDF
                  </a>
                )}

                {/* Request Button */}
                <a
                  href={`mailto:info.kiul@katokifoundation.org?subject=Request%20for%20Working%20Paper:%20${encodeURIComponent(
                    p.title
                  )}`}
                  className="px-4 py-2 bg-[#6a6a6a] text-white rounded-lg text-sm font-medium hover:bg-[#555] transition"
                >
                  Request Full Version
                </a>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-[#777] italic">No working papers match your search.</p>
          )}
        </div>
      </div>
    </main>
  );
}
