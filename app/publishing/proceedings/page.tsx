"use client";

import { useState } from "react";
import PublishingSidebar from "@/app/publishing/PublishingSidebar";
import PublicationSearch from "@/app/components/PublicationSearch";
import YearFilter from "@/app/components/YearFilter";

export default function ProceedingsPage() {
  // ------------------------------------
  // PROCEEDINGS DATA (GROUPED BY YEAR)
  // ------------------------------------
  const proceedings = [
    {
      year: "2024",
      papers: [
        {
          title: "Ubuntu Leadership and Community Transformation",
          authors: "Kamanzi, A.",
          abstract:
            "This paper explores the integration of Ubuntu ethics in contemporary leadership practices across African community-based organisations. It reflects on how relational accountability strengthens social cohesion.",
          pdf: "/publications/proceedings/2024/ubuntu-leadership.pdf",
        },
        {
          title: "Youth Agency in a Changing Africa",
          authors: "Namundyebo, E.",
          abstract:
            "An analytical discussion on youth empowerment and structural constraints in Southern Africa, examining pathways for strengthening agency through innovative development thinking.",
          pdf: "/publications/proceedings/2024/youth-agency.pdf",
        },
      ],
    },
    {
      year: "2025",
      papers: [
        {
          title: "Spirituality and Development in African Higher Education",
          authors: "Kamanzi, A.",
          abstract:
            "A reflection on the relationship between spirituality, learning, and institutional transformation in African universities. The paper discusses how Ubuntu can reframe academic life.",
          pdf: "/publications/proceedings/2025/spirituality-development.pdf",
        },
      ],
    },
    // Add more yearly sections here
  ];

  const years = proceedings.map((p) => p.year);

  // Flatten for search
  const flattened = proceedings.flatMap((yearGroup) =>
    yearGroup.papers.map((p) => ({
      ...p,
      year: yearGroup.year,
    }))
  );

  const [filtered, setFiltered] = useState(flattened);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // ------------------------------------
  // SEARCH HANDLER
  // ------------------------------------
  function handleSearch(query: string) {
    const q = query.toLowerCase();
    let result = flattened.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.year.includes(q) ||
        p.abstract.toLowerCase().includes(q)
    );

    if (selectedYear) {
      result = result.filter((p) => p.year === selectedYear);
    }

    setFiltered(result);
  }

  // ------------------------------------
  // YEAR FILTER HANDLER
  // ------------------------------------
  function handleYearFilter(year: string | null) {
    setSelectedYear(year);

    if (!year) {
      setFiltered(flattened);
      return;
    }

    setFiltered(flattened.filter((p) => p.year === year));
  }

  // ------------------------------------
  // PAGE LAYOUT
  // ------------------------------------
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-semibold text-[#1a1a1a] mb-10 text-center">
        Conference Proceedings
      </h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* SIDEBAR */}
        <PublishingSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white border border-[#e8e1d8] shadow-sm rounded-xl p-8">

          {/* INTRO */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              About KIUL Conference Proceedings
            </h2>

            <p className="text-[#444] leading-relaxed mb-4">
              KIUL publishes annual proceedings from conferences, symposia, and
              research seminars. These collections bring together scholarship that
              reflects Ubuntu ethics, development studies, leadership, and
              transformative social thinking.
            </p>

            <p className="text-[#444] leading-relaxed mb-4">
              Proceedings are freely accessible. For printed volumes or rights enquiries,
              please contact <strong>info.kiul@katokifoundation.org</strong>.
            </p>
          </section>

          <div className="border-t border-[#e8e1d8] my-8"></div>

          {/* SEARCH + YEAR FILTER */}
          <PublicationSearch onSearch={handleSearch} />
          <YearFilter years={years} onFilter={handleYearFilter} />

          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
            Proceedings by Year
          </h2>

          {/* RESULTS */}
          {years.map((year) => {
            const papersForYear = filtered.filter((p) => p.year === year);

            if (papersForYear.length === 0) return null;

            return (
              <div key={year} className="mb-12">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                  {year} Proceedings
                </h3>

                {papersForYear.map((p, i) => (
                  <div
                    key={i}
                    className="border border-[#e8e1d8] rounded-xl p-6 mb-6 bg-[#fafafa] shadow-sm"
                  >
                    <p className="text-[#1a1a1a] font-medium text-lg mb-1">
                      {p.authors}.{" "}
                      <span className="italic">{p.title}</span>.
                    </p>

                    <p className="text-[#444] mb-4 leading-relaxed">
                      {p.abstract}
                    </p>

                    <a
                      href={p.pdf}
                      target="_blank"
                      className="inline-block px-4 py-2 bg-[#1a4d2e] text-white rounded-lg text-sm font-medium hover:bg-[#163d25] transition"
                    >
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-[#777] italic">No proceedings match your search.</p>
          )}
        </div>
      </div>
    </main>
  );
}
