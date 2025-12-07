export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--kiul-bg-main)]">

      {/* HERO SECTION - Full Width */}
      <section className="w-full py-24 bg-[#F3F9F5] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="z-10 space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--kiul-emerald-900)] leading-tight">
              Katoki Institute for Ubuntu Leadership
            </h1>

            <h2 className="text-2xl md:text-3xl font-medium text-[var(--kiul-emerald-800)]">
              (KIUL)
            </h2>

            <p className="text-lg leading-relaxed text-gray-600 max-w-xl">
              A centre for Ubuntu philosophy, leadership, scholarship, publishing,
              and community empowerment across Africa.
            </p>

            <p className="text-lg leading-relaxed text-gray-600 max-w-xl">
              Grounded in Ubuntu, KIUL is committed to leadership, healing,
              development studies, and knowledge production that uplifts communities
              with dignity, wisdom, and collective purpose.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/about" className="inline-flex items-center justify-center px-8 py-3 bg-[var(--kiul-emerald-700)] text-white font-semibold rounded-lg hover:bg-[var(--kiul-emerald-600)] transition-all duration-300 shadow-md hover:shadow-lg">
                Learn More
              </a>
              <a href="/membership" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[var(--kiul-emerald-700)] font-semibold rounded-lg border-2 border-[var(--kiul-emerald-700)] hover:bg-[var(--kiul-emerald-50)] transition-all duration-300">
                Join KIUL
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - UBUNTU COMMUNITY CIRCLE */}
          <div className="relative w-full h-80 md:h-96">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--kiul-border)" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="var(--kiul-emerald-tint)" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              
              {/* Background circle */}
              <circle cx="200" cy="200" r="150" fill="url(#bgGradient)"/>
              
              {/* Ubuntu community circle - 8 people holding hands */}
              {/* Person 1 - Top */}
              <ellipse cx="200" cy="80" rx="18" ry="22" fill="#0f766e" fillOpacity="0.15"/>
              <circle cx="200" cy="65" r="12" fill="#0f766e" fillOpacity="0.2"/>
              
              {/* Person 2 - Top Right */}
              <ellipse cx="285" cy="115" rx="18" ry="22" fill="#065f46" fillOpacity="0.15"/>
              <circle cx="285" cy="100" r="12" fill="#065f46" fillOpacity="0.2"/>
              
              {/* Person 3 - Right */}
              <ellipse cx="320" cy="200" rx="18" ry="22" fill="#0f766e" fillOpacity="0.15"/>
              <circle cx="320" cy="185" r="12" fill="#0f766e" fillOpacity="0.2"/>
              
              {/* Person 4 - Bottom Right */}
              <ellipse cx="285" cy="285" rx="18" ry="22" fill="#065f46" fillOpacity="0.15"/>
              <circle cx="285" cy="270" r="12" fill="#065f46" fillOpacity="0.2"/>
              
              {/* Person 5 - Bottom */}
              <ellipse cx="200" cy="320" rx="18" ry="22" fill="#0f766e" fillOpacity="0.15"/>
              <circle cx="200" cy="305" r="12" fill="#0f766e" fillOpacity="0.2"/>
              
              {/* Person 6 - Bottom Left */}
              <ellipse cx="115" cy="285" rx="18" ry="22" fill="#065f46" fillOpacity="0.15"/>
              <circle cx="115" cy="270" r="12" fill="#065f46" fillOpacity="0.2"/>
              
              {/* Person 7 - Left */}
              <ellipse cx="80" cy="200" rx="18" ry="22" fill="#0f766e" fillOpacity="0.15"/>
              <circle cx="80" cy="185" r="12" fill="#0f766e" fillOpacity="0.2"/>
              
              {/* Person 8 - Top Left */}
              <ellipse cx="115" cy="115" rx="18" ry="22" fill="#065f46" fillOpacity="0.15"/>
              <circle cx="115" cy="100" r="12" fill="#065f46" fillOpacity="0.2"/>
              
              {/* Connecting hands - circle of unity */}
              <circle cx="200" cy="200" r="120" stroke="#0f766e" strokeWidth="3" strokeOpacity="0.12" fill="none" strokeDasharray="8 4"/>
              
              {/* Inner connection lines */}
              <line x1="200" y1="80" x2="285" y2="115" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="285" y1="115" x2="320" y2="200" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="320" y1="200" x2="285" y2="285" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="285" y1="285" x2="200" y2="320" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="200" y1="320" x2="115" y2="285" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="115" y1="285" x2="80" y2="200" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="80" y1="200" x2="115" y2="115" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              <line x1="115" y1="115" x2="200" y2="80" stroke="#065f46" strokeWidth="2" strokeOpacity="0.08"/>
              
              {/* Center Ubuntu symbol */}
              <circle cx="200" cy="200" r="25" fill="#0f766e" fillOpacity="0.08"/>
              <circle cx="200" cy="200" r="15" fill="none" stroke="#065f46" strokeWidth="2" strokeOpacity="0.15"/>
            </svg>
          </div>

          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-16 md:py-20 text-center bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-4">
          Core Services
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto mb-12">
          Comprehensive support for leadership, learning, and personal growth
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-lg)] max-w-7xl mx-auto">

          {/* Publishing */}
          <a
            href="/publishing"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12s4.03 8.25 9 8.25z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 12h7.5"/>
            </svg>
            Publishing
          </a>

          {/* Counselling */}
          <a
            href="/counselling"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5.25 12 5.25c4.478 0 8.268 2.693 9.542 6.75-1.274 4.057-5.064 6.75-9.542 6.75-4.478 0-8.268-2.693-9.542-6.75z"/>
            </svg>
            Counselling Companion
          </a>

          {/* Mentorship */}
          <a
            href="/mentorship"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"/>
            </svg>
            Mentorship Pathways
          </a>

          {/* Short Courses */}
          <a
            href="/short-courses"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.75v10.5m5.25-5.25H6.75"/>
            </svg>
            Short Courses
          </a>

        </div>
        </div>
      </section>

      {/* INSTITUTIONAL PAGES */}
      <section className="py-16 md:py-20 text-center bg-[var(--kiul-bg-soft)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-4">
          Institutional Pages
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto mb-12">
          Learn more about KIUL's mission, publishing, and community
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-lg)] max-w-7xl mx-auto">

          {/* About KIUL */}
          <a
            href="/about"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.75L19.5 12l-7.5 5.25L4.5 12 12 6.75z" />
            </svg>
            About KIUL
          </a>

          {/* Membership */}
          <a
            href="/membership"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 14a4 4 0 100-8 4 4 0 000 8zM6 20v-2a4 4 0 014-4h1" />
            </svg>
            Membership
          </a>

          {/* News */}
          <a
            href="/news"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 6.75h15M4.5 12h15M4.5 17.25h15" />
            </svg>
            News & Announcements
          </a>

          {/* Contact */}
          <a
            href="/contact"
            className="p-[var(--space-lg)] rounded-2xl bg-[var(--kiul-card-bg)] shadow-[var(--kiul-shadow-soft)] border border-[var(--kiul-border)]
            hover:shadow-[var(--kiul-shadow-lg)] hover:border-[var(--kiul-emerald-700)] hover:scale-[1.02] transition-all duration-300
            text-[var(--kiul-text-dark)] font-semibold flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-[var(--space-sm)] text-[var(--kiul-emerald-700)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.75v-7.5A2.25 2.25 0 015.25 6.75h13.5A2.25 2.25 0 0121 8.25z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8.25l9 5.25 9-5.25" />
            </svg>
            Contact Us
          </a>

        </div>
        </div>
      </section>

    </main>
  );
}
