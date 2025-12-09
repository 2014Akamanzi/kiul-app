export default function Home() {
  return (
    <div className="space-y-3">
      {/* HERO SECTION */}
      <section className="text-center py-1 border-b border-gray-100">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1.5 leading-tight">
          Katoki Institute for Ubuntu Leadership
        </h1>

        <div className="flex flex-wrap justify-center gap-2">
          <a
            href="/counselling"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm bg-blue-100 text-blue-900 font-semibold rounded-md hover:bg-blue-200 transition-colors shadow-sm border border-blue-300"
          >
            Counselling
          </a>

          <a
            href="/mentorship"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm bg-emerald-100 text-emerald-900 font-semibold rounded-md hover:bg-emerald-200 transition-colors shadow-sm border border-emerald-300"
          >
            Mentorship
          </a>

          <a
            href="/publishing"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm bg-purple-100 text-purple-900 font-semibold rounded-md hover:bg-purple-200 transition-colors shadow-sm border border-purple-300"
          >
            Publishing
          </a>

          <a
            href="/short-courses"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm bg-orange-100 text-orange-900 font-semibold rounded-md hover:bg-orange-200 transition-colors shadow-sm border border-orange-300"
          >
            Short Courses
          </a>

          <a
            href="/membership"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm bg-teal-100 text-teal-900 font-semibold rounded-md hover:bg-teal-200 transition-colors shadow-sm border border-teal-300"
          >
            Membership
          </a>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section>
        <h2 className="text-sm font-bold text-gray-900 mb-1">
          Core Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ServiceCard
            title="Publishing"
            link="/publishing"
            icon="📚"
            description="Share your research and scholarly works with the community"
            colorClass="bg-blue-50"
          />
          <ServiceCard
            title="Counselling Companion"
            link="/counselling"
            icon="💬"
            description="Get guidance and support for personal and professional growth"
            colorClass="bg-gray-50"
          />
          <ServiceCard
            title="Mentorship Pathways"
            link="/mentorship"
            icon="🌱"
            description="Connect with mentors and develop leadership skills"
            colorClass="bg-green-50"
          />
          <ServiceCard
            title="Short Courses"
            link="/short-courses"
            icon="🎓"
            description="Enhance your knowledge with focused learning programs"
            colorClass="bg-purple-50"
          />
        </div>
      </section>

      {/* JOURNAL & DASHBOARDS */}
      <section>
        <h2 className="text-sm font-bold text-gray-900 mb-1">
          Journal Portal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ServiceCard
            title="Search Articles"
            link="/journal/search"
            icon="🔍"
            description="Explore published research and scholarly articles"
            colorClass="bg-blue-50"
          />
          <ServiceCard
            title="Author Dashboard"
            link="/author/dashboard"
            icon="📝"
            description="Submit and track your manuscript submissions"
            colorClass="bg-orange-50"
          />
          <ServiceCard
            title="Reviewer Dashboard"
            link="/reviewer/dashboard"
            icon="📋"
            description="Review manuscripts and provide feedback"
            colorClass="bg-teal-50"
          />
        </div>
      </section>

      {/* INSTITUTIONAL PAGES */}
      <section>
        <h2 className="text-sm font-bold text-gray-900 mb-1">
          Institutional Pages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ServiceCard 
            title="About KIUL" 
            link="/about" 
            icon="🏛️" 
            description="Learn about our mission, vision, and Ubuntu philosophy"
            colorClass="bg-slate-50"
          />
          <ServiceCard 
            title="Membership" 
            link="/membership" 
            icon="🤝" 
            description="Join our community and access exclusive benefits"
            colorClass="bg-purple-50"
          />
          <ServiceCard 
            title="News & Announcements" 
            link="/news" 
            icon="📰" 
            description="Stay updated with latest announcements and events"
            colorClass="bg-orange-50"
          />
          <ServiceCard 
            title="Contact Us" 
            link="/contact" 
            icon="✉️" 
            description="Get help, submit requests, and reach our team"
            colorClass="bg-cyan-50"
          />
        </div>
      </section>
    </div>
  );
}

/* Service Card Component - ASC-Leiden Academic Style */
interface ServiceCardProps {
  title: string;
  link: string;
  icon: string;
  description?: string;
  colorClass?: string;
}

function ServiceCard({ title, link, icon, description, colorClass = "bg-blue-50" }: ServiceCardProps) {
  return (
    <a
      href={link}
      className={`group p-4 ${colorClass} border border-gray-200 rounded-xl hover:shadow-lg transition-all`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-3 p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-600 leading-snug">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}
