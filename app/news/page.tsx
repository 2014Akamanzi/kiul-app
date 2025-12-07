export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-semibold text-[#064e3b]">
          News & Announcements
        </h1>

        {/* UNDERLINE */}
        <div className="w-24 h-1 bg-[#a7c8bb] mt-3 mb-10"></div>

        {/* INTRO PARAGRAPH */}
        <p className="text-lg leading-relaxed text-[#1a1a1a] mb-10">
          Stay informed with the latest updates from the Katoki Institute for 
          Ubuntu Leadership. This page features official announcements, 
          leadership reflections, programme updates, publications, and upcoming 
          events related to KIUL's work across Africa.
        </p>

        {/* PLACEHOLDER ANNOUNCEMENTS */}
        <div className="space-y-10">

          {/* Announcement 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8e4]">
            <h2 className="text-xl font-semibold text-[#064e3b] mb-2">
              📢 Coming Soon: KIUL Official Launch
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed">
              The official launch of the Katoki Institute for Ubuntu Leadership 
              will be announced here. Stay tuned for details on the inaugural 
              programme, keynote messages, and how to participate.
            </p>
          </div>

          {/* Announcement 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8e4]">
            <h2 className="text-xl font-semibold text-[#064e3b] mb-2">
              📰 New Courses & Training Modules
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed">
              KIUL will soon publish information about upcoming short courses, 
              leadership modules, and AI-supported development programmes.
            </p>
          </div>

          {/* Announcement 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8e4]">
            <h2 className="text-xl font-semibold text-[#064e3b] mb-2">
              📄 Publications & Research
            </h2>
            <p className="text-[#1a1a1a] leading-relaxed">
              Follow this space for newly released books, articles, and academic 
              materials produced under KIUL's publishing arm.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
