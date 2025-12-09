import Container from '../components/Container';

export default function PublishingPage() {
  const sections = [
    {
      title: "CJDJ Journal",
      description:
        "Peer-reviewed journal advancing justice, commons, Ubuntu, and development for Africa.",
      href: "/publishing/cjdj",
      colorClass: "bg-emerald-50 border-emerald-200",
      icon: "📖",
    },
    {
      title: "Academic Books",
      description:
        "Scholarly monographs authored or published under the KIUL Publishing Division.",
      href: "/publishing/books",
      colorClass: "bg-blue-50 border-blue-200",
      icon: "📚",
    },
    {
      title: "Spiritual Books",
      description:
        "Ubuntu-inspired reflections and motivational books supporting healing and personal growth.",
      href: "/publishing/spiritual-books",
      colorClass: "bg-purple-50 border-purple-200",
      icon: "✨",
    },
    {
      title: "Working Papers",
      description:
        "Early-stage research papers forming part of the KIUL Working Paper Series.",
      href: "/publishing/working-papers",
      colorClass: "bg-orange-50 border-orange-200",
      icon: "📄",
    },
    {
      title: "Conference Proceedings",
      description:
        "Papers presented at KIUL conferences and symposiums, compiled into annual proceedings.",
      href: "/publishing/proceedings",
      colorClass: "bg-teal-50 border-teal-200",
      icon: "📋",
    },
    {
      title: "Blogs & Reflections",
      description:
        "Accessible essays and thought pieces written for public engagement and intellectual inspiration.",
      href: "/publishing/blogs",
      colorClass: "bg-pink-50 border-pink-200",
      icon: "✍️",
    },
  ];

  return (
    <Container>
      {/* PAGE HEADER */}
      <section className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--kiul-text-dark)] mt-0 mb-2">
          KIUL Publishing Hub
        </h1>
        <p className="text-sm leading-snug text-[var(--kiul-text-soft)] mb-3">
          A continental platform for scholarly work, books, spirituality texts, and working papers rooted in Ubuntu philosophy
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-3">
          <a 
            href="/author/dashboard" 
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold bg-white text-[var(--kiul-green)] border-2 border-[var(--kiul-green)] rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            📝 Submit Manuscript
          </a>
          <a 
            href="/publishing/guidelines" 
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold bg-white text-[var(--kiul-green)] border-2 border-[var(--kiul-green)] rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            📋 Publishing Guidelines
          </a>
        </div>
      </section>

      {/* PUBLISHING SECTIONS */}
      <section className="section-spacing-mobile">
        <div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sections.map((section, index) => (
              <a
                key={index}
                href={section.href}
                className={`group p-4 ${section.colorClass} border-2 rounded-xl hover:shadow-lg transition-all`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3 p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {section.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight text-center">
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-snug text-center">
                    {section.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-4 text-center bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              📝 Publish With Us
            </h3>
            <p className="text-sm text-gray-700 leading-tight mb-3">
              Share your research, books, or reflections with the KIUL community. 
              Submit your manuscript and join our growing library of Ubuntu-centered scholarship.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href="/author/dashboard" 
                className="inline-flex items-center justify-center px-5 py-2 text-sm bg-white text-[var(--kiul-green)] border-2 border-[var(--kiul-green)] font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Submit Manuscript →
              </a>
              <a 
                href="/publishing/guidelines" 
                className="inline-flex items-center justify-center px-5 py-2 text-sm bg-white text-[var(--kiul-green)] border-2 border-[var(--kiul-green)] font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Publishing Guidelines
              </a>
            </div>
          </div>

        </div>
      </section>

    </Container>
  );
}
