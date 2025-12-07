export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">

      {/* HERO SECTION */}
      <section className="w-full px-6 py-24 bg-gradient-to-br from-[#e7f5ef] to-[#fafdfb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold text-[#064e3b] leading-tight">
              Katoki Institute for Ubuntu Leadership
            </h1>

            <h2 className="text-3xl md:text-4xl font-semibold text-[#064e3b] mt-2">
              (KIUL)
            </h2>

            <p className="text-lg text-[#1a1a1a] mt-6 leading-relaxed max-w-xl">
              A centre for Ubuntu philosophy, leadership, scholarship, publishing,
              and community empowerment across Africa.
            </p>

            <p className="text-base text-[#1a1a1a] mt-4 leading-relaxed max-w-xl">
              Grounded in Ubuntu, KIUL is committed to leadership, healing,
              development studies, and knowledge production that uplifts communities
              with dignity, wisdom, and collective purpose.
            </p>
          </div>

          {/* RIGHT COLUMN SHAPE BLOCK */}
          <div className="relative w-full h-80 md:h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#e7f5ef] to-[#fafdfb]">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[rgba(6,78,59,0.12)] rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[rgba(6,78,59,0.12)] rounded-full blur-2xl"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[rgba(6,78,59,0.08)] rounded-full blur-2xl"></div>
          </div>

        </div>
      </section>

      <div className="w-full h-px bg-[#a7c8bb] my-12"></div>

      {/* CORE SERVICES */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-2xl font-semibold text-[#064e3b] mb-10">
          Core Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {/* Publishing */}
          <a
            href="/publishing"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12s4.03 8.25 9 8.25z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 12h7.5"/>
            </svg>
            Publishing
          </a>

          {/* Counselling */}
          <a
            href="/counselling"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.522 5.25 12 5.25c4.478 0 8.268 2.693 9.542 6.75-1.274 4.057-5.064 6.75-9.542 6.75-4.478 0-8.268-2.693-9.542-6.75z"/>
            </svg>
            Counselling Companion
          </a>

          {/* Mentorship */}
          <a
            href="/mentorship"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6"/>
            </svg>
            Mentorship Pathways
          </a>

          {/* Short Courses */}
          <a
            href="/short-courses"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.75v10.5m5.25-5.25H6.75"/>
            </svg>
            Short Courses
          </a>

        </div>
      </section>

      <div className="w-full h-px bg-[#a7c8bb] my-12"></div>

      {/* INSTITUTIONAL PAGES */}
      <section className="py-16 px-6 text-center bg-[#f4f8f6]">
        <h3 className="text-2xl font-semibold text-[#064e3b] mb-10">
          Institutional Pages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {/* About KIUL */}
          <a
            href="/about"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.75L19.5 12l-7.5 5.25L4.5 12 12 6.75z" />
            </svg>
            About KIUL
          </a>

          {/* Membership */}
          <a
            href="/membership"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 14a4 4 0 100-8 4 4 0 000 8zM6 20v-2a4 4 0 014-4h1" />
            </svg>
            Membership
          </a>

          {/* News */}
          <a
            href="/news"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 6.75h15M4.5 12h15M4.5 17.25h15" />
            </svg>
            News & Announcements
          </a>

          {/* Contact */}
          <a
            href="/contact"
            className="p-8 rounded-xl bg-white shadow-sm border border-[#e1e8e4]
            hover:shadow-md hover:border-[#a7c8bb] transition-all duration-300
            text-[#064e3b] font-medium flex flex-col items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.75v-7.5A2.25 2.25 0 015.25 6.75h13.5A2.25 2.25 0 0121 8.25z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8.25l9 5.25 9-5.25" />
            </svg>
            Contact Us
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#064e3b] text-center text-[#e8f5f0] mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Katoki Institute for Ubuntu Leadership (KIUL)
        </p>
        <p className="text-sm mt-2">
          WhatsApp: +255-758624863 (WhatsApp only) • Email: info.kiul@katokifoundation.org
        </p>
      </footer>

    </main>
  );
}
