export default function PublishingPage() {
  const sections = [
    {
      title: "CJDJ – Commons, Justice & Development Journal",
      description:
        "Peer-reviewed academic articles advancing Ubuntu-informed scholarship in justice, governance, leadership, and development.",
      href: "/publishing/cjdj",
    },
    {
      title: "Academic Books",
      description:
        "Scholarly monographs covering Ubuntu, leadership, development studies, governance, and philosophical reflections.",
      href: "/publishing/books",
    },
    {
      title: "Spiritual & Motivation Books",
      description:
        "Ubuntu-inspired reflections and motivational books supporting healing, personal development, and spiritual growth.",
      href: "/publishing/spiritual-books",
    },
    {
      title: "Working Papers",
      description:
        "Early-stage research papers and theoretical reflections forming part of the KIUL Working Paper Series.",
      href: "/publishing/working-papers",
    },
    {
      title: "Conference Proceedings",
      description:
        "Papers presented at KIUL conferences, symposiums, and seminars, compiled into annual academic proceedings.",
      href: "/publishing/proceedings",
    },
    {
      title: "Blogs & Public Reflections",
      description:
        "Accessible essays, reflections, and thought pieces written for public engagement and intellectual inspiration.",
      href: "/publishing/blogs",
    },
    {
      title: "Publishing Guidelines",
      description:
        "Submission rules, review policies, formatting requirements, and publication ethics for all KIUL publications.",
      href: "/publishing/guidelines",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold text-[#1a1a1a] text-center mb-8">
        KIUL Publishing Hub
      </h1>

      <p className="text-center text-[#444] max-w-3xl mx-auto leading-relaxed mb-12">
        The Katoki Institute for Ubuntu Leadership (KIUL) is committed to producing
        high-quality knowledge rooted in Ubuntu, African scholarship, and
        transformative development thinking. Explore our journals, books, working
        papers, proceedings, and public reflections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {sections.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="border border-[#e8e1d8] bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{s.title}</h3>
            <p className="text-[#555] leading-relaxed">{s.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
