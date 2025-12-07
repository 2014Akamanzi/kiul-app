import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--kiul-bg-soft)] border-t border-[var(--kiul-border)] mt-[var(--space-3xl)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-[var(--space-lg)] py-[var(--space-2xl)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] md:gap-[var(--space-2xl)]">
          
          {/* Left Column - Institute Identity */}
          <div className="space-y-[var(--space-sm)]">
            <h3 className="text-lg font-bold text-[var(--kiul-emerald-800)]">
              Katoki Institute for Ubuntu Leadership
            </h3>
            <p className="text-sm text-[var(--kiul-text-medium)] leading-relaxed">
              Advancing Ubuntu leadership, scholarship, and community empowerment across Africa.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-[var(--space-sm)]">
            <h4 className="text-base font-bold text-[var(--kiul-emerald-800)]">
              Quick Links
            </h4>
            <ul className="space-y-[var(--space-xs)]">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  About KIUL
                </Link>
              </li>
              <li>
                <Link 
                  href="/membership" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link 
                  href="/publishing" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  Publishing
                </Link>
              </li>
              <li>
                <Link 
                  href="/counselling" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  Counselling
                </Link>
              </li>
              <li>
                <Link 
                  href="/mentorship" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  Mentorship
                </Link>
              </li>
              <li>
                <Link 
                  href="/short-courses" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  Short Courses
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  News & Announcements
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-[var(--space-sm)]">
            <h4 className="text-base font-bold text-[var(--kiul-emerald-800)]">
              Contact Information
            </h4>
            <div className="space-y-[var(--space-xs)]">
              {/* Email */}
              <div className="flex items-start gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" 
                  />
                </svg>
                <a 
                  href="mailto:info.kiul@katokifoundation.org" 
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  info.kiul@katokifoundation.org
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" 
                  />
                </svg>
                <a 
                  href="https://wa.me/255758624863" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--kiul-text-medium)] hover:text-[var(--kiul-emerald-700)] hover:underline transition-all"
                >
                  +255-758624863
                  <span className="text-xs ml-1 text-[var(--kiul-emerald-700)]">(WhatsApp only)</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-[var(--kiul-card-bg)] border-t border-[var(--kiul-border)]">
        <div className="max-w-7xl mx-auto px-[var(--space-lg)] py-[var(--space-sm)]">
          <p className="text-center text-sm text-[var(--kiul-text-medium)]">
            © {currentYear} Katoki Institute for Ubuntu Leadership. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
