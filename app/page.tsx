export default function Home() {
  return (
    <div className="space-y-4">
      {/* HERO SECTION */}
      <section className="text-center py-4 border-b-2 border-[var(--kiul-green)]/20 bg-gradient-to-b from-green-50/30 to-white">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--kiul-text-dark)] mb-2 leading-tight">
          Katoki Institute for Ubuntu Leadership
        </h1>
        <p className="text-lg md:text-xl font-semibold text-[var(--kiul-green)] text-center italic">
          Empowerment through Ubuntu
        </p>
      </section>

      {/* CORE SERVICES */}
      <section>
        <h2 className="text-base font-bold text-[var(--kiul-text-dark)] mb-2 flex items-center gap-2">
          <span className="text-[var(--kiul-green)]">●</span> Our Ubuntu Services
        </h2>
        <p className="text-xs text-[var(--kiul-text-soft)] mb-2">Comprehensive support for your learning and growth journey</p>

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

      {/* ACADEMIC PUBLISHING */}
      <section>
        <h2 className="text-base font-bold text-[var(--kiul-text-dark)] mb-2 flex items-center gap-2">
          <span className="text-[var(--kiul-green)]">●</span> Academic Publishing
        </h2>
        <p className="text-xs text-[var(--kiul-text-soft)] mb-2">Share and discover scholarly research</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ServiceCard
            title="Search Articles"
            link="/publishing/search"
            icon="🔍"
            description="Explore published research and scholarly articles"
            colorClass="bg-blue-50"
          />
          <ServiceCard
            title="Submit Manuscript"
            link="/publishing"
            icon="📝"
            description="Submit your research for publication"
            colorClass="bg-orange-50"
          />
          <ServiceCard
            title="Publishing Portal"
            link="/publishing"
            icon="📋"
            description="Manage submissions and track your publications"
            colorClass="bg-teal-50"
          />
        </div>
      </section>

      {/* INSTITUTIONAL PAGES */}
      <section>
        <h2 className="text-base font-bold text-[var(--kiul-text-dark)] mb-2 flex items-center gap-2">
          <span className="text-[var(--kiul-green)]">●</span> About KIUL
        </h2>
        <p className="text-xs text-[var(--kiul-text-soft)] mb-2">Learn more about our institution and community</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ServiceCard 
            title="About" 
            link="/about" 
            icon="🏛️" 
            description="Our mission, vision, and Ubuntu philosophy"
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
