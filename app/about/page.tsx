import StandardPageLayout from '../components/StandardPageLayout';

export default function AboutPage() {
  return (
    <StandardPageLayout>
      {/* PAGE HEADER */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          About the Katoki Institute for Ubuntu Leadership
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          A centre for Ubuntu philosophy, leadership, scholarship, and community empowerment across Africa
        </p>
      </section>

      {/* CONTENT SECTION */}
      <div className="space-y-6">
          
          {/* INTRO PARAGRAPH */}
          <p className="text-lg leading-relaxed text-gray-700">
            The Katoki Institute for Ubuntu Leadership (KIUL) is a centre dedicated 
            to nurturing ethical leadership, Ubuntu-based scholarship, compassionate 
            mentorship, and community-driven development. Grounded in African 
            philosophical traditions, KIUL promotes human dignity, interconnectedness, 
            and collective agency.
          </p>

          {/* BODY PARAGRAPHS */}
          <p className="leading-relaxed text-[var(--kiul-text-medium)]">
            KIUL draws inspiration from Ubuntu, the African philosophy that affirms 
            the humanity of each person through their relationship with others: 
            <span className="italic font-medium text-[var(--kiul-emerald-800)]"> "I am because we are."</span> 
            {' '}Our programs cultivate leadership practices that honour community, justice, 
            healing, and shared responsibility.
          </p>

          <p className="leading-relaxed text-[var(--kiul-text-medium)]">
            Through counselling companion services, mentorship pathways, leadership 
            capacity-building, and academic publishing, KIUL empowers individuals to 
            grow, lead, and contribute meaningfully to society. We combine traditional 
            wisdom with modern tools—including AI-supported teaching—to create spaces 
            for reflection, transformation, and grounded decision-making.
          </p>

          <p className="leading-relaxed text-[var(--kiul-text-medium)]">
            Our vision is to become a leading centre of Ubuntu-inspired leadership in 
            Africa, fostering resilient communities, ethical institutions, and a culture 
            of lifelong learning.
          </p>

        </div>
    </StandardPageLayout>
  );
}
