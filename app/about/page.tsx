export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-semibold text-[#064e3b]">
          About the Katoki Institute for Ubuntu Leadership (KIUL)
        </h1>

        {/* UNDERLINE */}
        <div className="w-24 h-1 bg-[#a7c8bb] mt-3 mb-10"></div>

        {/* INTRO PARAGRAPH */}
        <p className="text-lg leading-relaxed text-[#1a1a1a] mb-6">
          The Katoki Institute for Ubuntu Leadership (KIUL) is a centre dedicated 
          to nurturing ethical leadership, Ubuntu-based scholarship, compassionate 
          mentorship, and community-driven development. Grounded in African 
          philosophical traditions, KIUL promotes human dignity, interconnectedness, 
          and collective agency.
        </p>

        {/* BODY PARAGRAPHS */}
        <p className="leading-relaxed text-[#1a1a1a] mb-6">
          KIUL draws inspiration from Ubuntu, the African philosophy that affirms 
          the humanity of each person through their relationship with others: 
          "I am because we are." Our programs cultivate leadership practices that 
          honour community, justice, healing, and shared responsibility.
        </p>

        <p className="leading-relaxed text-[#1a1a1a] mb-6">
          Through counselling companion services, mentorship pathways, leadership 
          capacity-building, and academic publishing, KIUL empowers individuals to 
          grow, lead, and contribute meaningfully to society. We combine traditional 
          wisdom with modern tools—including AI-supported teaching—to create spaces 
          for reflection, transformation, and grounded decision-making.
        </p>

        <p className="leading-relaxed text-[#1a1a1a] mb-6">
          Our vision is to become a leading centre of Ubuntu-inspired leadership in 
          Africa, fostering resilient communities, ethical institutions, and a culture 
          of lifelong learning.
        </p>

      </div>
    </main>
  );
}
