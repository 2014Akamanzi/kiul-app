import StandardPageLayout from '../components/StandardPageLayout';

export default function PublishingPage() {
  const sections = [
    {
      title: "CJDJ Journal",
      description:
        "Peer-reviewed journal advancing justice, commons, Ubuntu, and development for Africa.",
      href: "/publishing/cjdj",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-emerald-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" 
          />
        </svg>
      ),
    },
    {
      title: "Academic Books",
      description:
        "Scholarly monographs authored or published under the KIUL Publishing Division.",
      href: "/publishing/books",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-emerald-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
      ),
    },
    {
      title: "Spiritual Books",
      description:
        "Ubuntu-inspired reflections and motivational books supporting healing and personal growth.",
      href: "/publishing/spiritual-books",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-emerald-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
          />
        </svg>
      ),
    },
    {
      title: "Working Papers",
      description:
        "Early-stage research papers forming part of the KIUL Working Paper Series.",
      href: "/publishing/working-papers",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-emerald-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
          />
        </svg>
      ),
    },
    {
      title: "Conference Proceedings",
      description:
        "Papers presented at KIUL conferences and symposiums, compiled into annual proceedings.",
      href: "/publishing/proceedings",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-emerald-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" 
          />
        </svg>
      ),
    },
    {
      title: "Blogs & Reflections",
      description:
        "Accessible essays and thought pieces written for public engagement and intellectual inspiration.",
      href: "/publishing/blogs",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-emerald-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" 
          />
        </svg>
      ),
    },
  ];

  return (
    <StandardPageLayout>
      {/* PAGE HEADER */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          KIUL Publishing Hub
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          A continental platform for scholarly work, books, spirituality texts, and working papers rooted in Ubuntu philosophy
        </p>
      </section>

      {/* PUBLISHING SECTIONS */}
      <section className="py-16 md:py-20">
        <div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
            {sections.map((section, index) => (
              <a
                key={index}
                href={section.href}
                className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-soft)] 
                hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] transition-all duration-300
                flex flex-col items-center gap-[var(--space-sm)] text-center group"
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--kiul-text-dark)]">
                  {section.title}
                </h3>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed text-sm">
                  {section.description}
                </p>
                <div className="mt-2 text-[var(--kiul-emerald-700)] font-semibold text-sm group-hover:underline">
                  Explore →
                </div>
              </a>
            ))}
          </div>

          {/* Publishing Guidelines Link */}
          <div className="mt-[var(--space-2xl)] text-center bg-[var(--kiul-emerald-50)] border border-[var(--kiul-border)] rounded-xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-soft)]">
            <h3 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
              Publishing with KIUL
            </h3>
            <p className="text-lg text-[var(--kiul-text-medium)] mb-[var(--space-md)] max-w-2xl mx-auto">
              Interested in submitting your work? Review our publishing guidelines, 
              submission policies, and editorial standards.
            </p>
            <a 
              href="/publishing/guidelines" 
              className="inline-block bg-[var(--kiul-emerald-700)] text-white font-semibold px-8 py-3 rounded-lg 
              hover:bg-[var(--kiul-emerald-800)] hover:shadow-[var(--kiul-shadow-lg)] transition-all duration-300"
            >
              View Publishing Guidelines
            </a>
          </div>

        </div>
      </section>

    </StandardPageLayout>
  );
}
