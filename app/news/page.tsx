import StandardPageLayout from '../components/StandardPageLayout';

export default function NewsPage() {
  return (
    <StandardPageLayout>

        {/* PAGE TITLE */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
            News & Announcements
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest updates from the Katoki Institute for 
            Ubuntu Leadership. This page features official announcements, 
            leadership reflections, programme updates, publications, and upcoming 
            events related to KIUL's work across Africa.
          </p>
        </section>

        {/* PLACEHOLDER ANNOUNCEMENTS */}
        <ul className="space-y-6">

          {/* Announcement 1 */}
          <li>
          <div className="bg-[var(--kiul-card-bg)] p-6 rounded-xl shadow-sm border border-[var(--kiul-border)]">
            <h2 className="text-xl font-semibold text-[var(--kiul-emerald-900)] mb-2">
              📢 Coming Soon: KIUL Official Launch
            </h2>
            <p className="text-[var(--kiul-text-dark)] leading-relaxed">
              The official launch of the Katoki Institute for Ubuntu Leadership 
              will be announced here. Stay tuned for details on the inaugural 
              programme, keynote messages, and how to participate.
            </p>
          </div>
          </li>

          {/* Announcement 2 */}
          <li>
          <div className="bg-[var(--kiul-card-bg)] p-6 rounded-xl shadow-sm border border-[var(--kiul-border)]">
            <h2 className="text-xl font-semibold text-[var(--kiul-emerald-900)] mb-2">
              📰 New Courses & Training Modules
            </h2>
            <p className="text-[var(--kiul-text-dark)] leading-relaxed">
              KIUL will soon publish information about upcoming short courses, 
              leadership modules, and AI-supported development programmes.
            </p>
          </div>
          </li>

          {/* Announcement 3 */}
          <li>
          <div className="bg-[var(--kiul-card-bg)] p-6 rounded-xl shadow-sm border border-[var(--kiul-border)]">
            <h2 className="text-xl font-semibold text-[var(--kiul-emerald-900)] mb-2">
              📄 Publications & Research
            </h2>
            <p className="text-[var(--kiul-text-dark)] leading-relaxed">
              Follow this space for newly released books, articles, and academic 
              materials produced under KIUL's publishing arm.
            </p>
          </div>
          </li>

        </ul>
    </StandardPageLayout>
  );
}
