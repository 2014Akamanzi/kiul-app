import Container from '../components/Container';

export default function MembershipPage() {
  return (
    <Container>
      {/* HERO SECTION */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-text-dark)] mt-0 mb-4">
          Become a Member of KIUL
        </h1>
        <p className="text-lg leading-relaxed text-[var(--kiul-text-soft)]">
          Join a continental community advancing Ubuntu leadership, scholarship, and human development
        </p>
      </section>

      {/* MEMBERSHIP BENEFITS SECTION */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--kiul-text-dark)] mb-4">
            Membership Benefits
          </h2>
          <p className="text-lg leading-relaxed text-[var(--kiul-text-soft)]">
              As a KIUL member, you gain access to transformative resources, networks, and opportunities rooted in Ubuntu philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
            
            {/* Benefit 1 - Publications & Research */}
            <div className="bg-white shadow-md border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-emerald-600" 
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
                <h3 className="text-xl font-semibold text-emerald-700">
                  Publications & Research
                </h3>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Access to KIUL journals, working papers, books, and exclusive research insights on Ubuntu leadership and development studies.
              </p>
            </div>

            {/* Benefit 2 - Events & Seminars */}
            <div className="bg-white shadow-md border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-emerald-700">
                  Events & Seminars
                </h3>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Participate in Ubuntu leadership seminars, webinars, and KIUL annual conferences with priority invitations and early registration.
              </p>
            </div>

            {/* Benefit 3 - Publishing Opportunities */}
            <div className="bg-white shadow-md border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-emerald-700">
                  Publishing Opportunities
                </h3>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Eligibility to submit working papers, articles, and blog posts to KIUL's academic journals and digital platforms.
              </p>
            </div>

            {/* Benefit 4 - Mentorship & Training */}
            <div className="bg-white shadow-md border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-emerald-700">
                  Mentorship & Training
                </h3>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Priority access to KIUL mentorship pathways, short courses, and AI-supported developmental training programmes.
              </p>
            </div>

            {/* Benefit 5 - Community Network */}
            <div className="bg-white shadow-md border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-emerald-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0012 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-emerald-700">
                  Continental Network
                </h3>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Join a growing community of African scholars, leaders, and practitioners committed to Ubuntu-driven development.
              </p>
            </div>

            {/* Benefit 6 - Resource Library */}
            <div className="bg-white shadow-md border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-emerald-600" 
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
                <h3 className="text-xl font-semibold text-emerald-700">
                  Resource Library
                </h3>
              </div>
              <p className="text-emerald-900/80 leading-relaxed">
                Early access to KIUL digital resources, leadership toolkits, and curated reading materials on Ubuntu philosophy.
              </p>
            </div>

          </div>
      </section>

      {/* MEMBERSHIP OPTIONS SECTION */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--kiul-emerald-900)] mb-3">
            Membership Options
          </h2>
          <p className="text-lg text-[var(--kiul-text-medium)]">
              Choose the membership level that best suits your engagement with KIUL's mission and activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]">
            
            {/* Associate Member */}
            <div className="bg-white shadow-md border-2 border-emerald-200 rounded-xl p-8 hover:shadow-xl hover:border-emerald-400 transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-emerald-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                  Associate Member
                </h3>
                <p className="text-sm text-emerald-600 font-semibold">
                  For Students & Emerging Scholars
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Access to select KIUL publications</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Invitations to webinars and seminars</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Community networking opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Discounted rates on short courses</span>
                </li>
              </ul>
              <button className="w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                Apply Now
              </button>
            </div>

            {/* Research Member */}
            <div className="bg-white shadow-xl border-2 border-emerald-600 rounded-xl p-8 hover:shadow-2xl transform hover:scale-105 transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-emerald-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                  Research Member
                </h3>
                <p className="text-sm text-emerald-600 font-semibold">
                  For Academics & Professionals
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Full access to all KIUL publications</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Submit working papers and articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Priority conference registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Mentorship programme participation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Research collaboration opportunities</span>
                </li>
              </ul>
              <button className="w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                Apply Now
              </button>
            </div>

            {/* Institutional Member */}
            <div className="bg-white shadow-md border-2 border-emerald-200 rounded-xl p-8 hover:shadow-xl hover:border-emerald-400 transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-emerald-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                  Institutional Member
                </h3>
                <p className="text-sm text-emerald-600 font-semibold">
                  For Organizations & Partners
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Partnership and collaboration agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Customized training programmes</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Branding and visibility at KIUL events</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-900/80 text-sm">Access for multiple staff members</span>
                </li>
              </ul>
              <button className="w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
                Contact Us
              </button>
            </div>

          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-white border-2 border-emerald-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">
              Ready to Join KIUL?
            </h3>
            <p className="text-lg text-emerald-900/80 mb-6">
              Become part of a transformative community advancing Ubuntu leadership across Africa. 
              Contact us today to discuss your membership application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 hover:shadow-lg transition-all duration-300"
              >
                Get in Touch
              </a>
              <a 
                href="mailto:info.kiul@katokifoundation.org" 
                className="inline-block bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
      </section>

    </Container>
  );
}
