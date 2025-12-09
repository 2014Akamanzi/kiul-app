import Container from '../components/Container';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Container>
      {/* PAGE HEADER */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--kiul-text-dark)] mt-0 mb-3">
          About KIUL
        </h1>
        <p className="text-lg text-[var(--kiul-text-soft)] italic mb-4">
          Rooted in the Katoki Legacy • Growing through Ubuntu Philosophy
        </p>
        <p className="text-base text-[var(--kiul-text-muted)] max-w-3xl mx-auto leading-relaxed">
          KIUL (Katoki International University of Learning) is an innovative educational platform that blends traditional African wisdom with modern learning approaches. Founded on the principles of Ubuntu—"I am because we are"—we provide culturally relevant education that empowers learners to grow together while honoring their heritage and community values.
        </p>
      </section>

      {/* HERO IMAGE */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="https://kiul.org/images/home/hero-banner.png"
            alt="About KIUL - Rooted in Ubuntu, Growing Together"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="space-y-8">
          
        {/* KIUL FOUNDATION */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-4">
            KIUL Foundation
          </h2>
          
          <div className="rounded-lg overflow-hidden shadow-md mb-4">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src="https://kiul.org/images/about/banana-plantation.jpg"
                alt="Banana plantation representing KIUL's roots in community and land"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm text-gray-600 italic py-2 bg-emerald-50">
              Banana plantation representing KIUL&apos;s roots in community and land
            </p>
          </div>

          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)] mb-4">
            The Katoki Institute for Ubuntu Leadership (KIUL), owned by the Katoki Foundation, 
            a company with Certificate of Incorporation No. 181268956 of the Republic of Tanzania 
            offered on the 16th of January 2025, stands firmly on two foundational pillars: the 
            life and legacy of Fortunatus Felix Kawegere, and the Ubuntu philosophy that guides 
            our daily work.
          </p>

          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)] mb-4">
            Fortunatus Felix Kawegere — affectionately remembered as Ta Mwalimu Katoki — embodied 
            integrity, compassion, and community-minded leadership. His life was a living lesson 
            in service and purpose, inspiring generations to believe that greatness begins with goodness.
          </p>

          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)]">
            The second pillar, Ubuntu, reminds us that humanity is a shared journey — that we 
            become who we are through our relationships with others. Together, these two pillars 
            shape KIUL&apos;s vision: to nurture leaders who are ethical, creative, and deeply human, 
            capable of transforming their communities and the world through wisdom, empathy, and collaboration.
          </p>
        </section>

        {/* THE KATOKI LEGACY */}
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-4">
            The Katoki Legacy
          </h2>
          
          <div className="text-center mb-4">
            <div className="inline-block bg-gradient-to-br from-orange-100 to-orange-200 p-2 rounded-lg shadow-lg mb-3">
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative overflow-hidden rounded-md">
                <Image
                  src="/images/fortunatus-kawegere.jpg"
                  alt="Fortunatus Felix Kawegere - Ta Mwalimu Katoki"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <p className="font-semibold text-lg text-gray-700">Fortunatus Felix Kawegere</p>
            <p className="text-sm text-gray-600 italic">Ta Mwalimu Katoki</p>
          </div>

          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)]">
            Fortunatus Felix Kawegere embodied integrity, compassion, and community-minded leadership. 
            His life was a living lesson in service and purpose, inspiring generations to believe that 
            greatness begins with goodness. The Katoki legacy continues to guide our mission, reminding 
            us that true leadership is rooted in service to others and the community.
          </p>
        </section>

        {/* UBUNTU PHILOSOPHY */}
        <section className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-4">
            Ubuntu Philosophy
          </h2>
          
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-[var(--kiul-green)] italic mb-2">
              "I am because we are"
            </p>
          </div>

          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)] mb-4">
            The philosophy of Ubuntu has taught us that human dignity is realised not in isolation, 
            but in relationship with others. It is a call to empathy, responsibility, and shared 
            flourishing. In a world often driven by competition and individualism, Ubuntu restores 
            the truth that our humanity is bound together, and that leadership must be grounded in 
            care, justice, and community.
          </p>

          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)]">
            By putting together the Katoki legacy and Ubuntu philosophy, KIUL seeks to cultivate 
            leaders who are both visionary and humane. Leaders who understand that progress is not 
            merely about economic growth, but the strengthening of relationships and the empowerment 
            of communities. This is the spirit of all our work: leadership that becomes service.
          </p>
        </section>

        {/* KIUL PHILOSOPHY */}
        <section className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-6 text-center">
            KIUL Philosophy
          </h2>
          
          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎯</span>
                <h3 className="text-xl font-bold text-gray-900">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A world where leaders are grounded in the responsibility to serve as pillars of interconnectedness.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl font-bold text-gray-900">Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To foster individual and community programs that create responsible leaders who understand 
                and promote the core values of Ubuntu.
              </p>
            </div>
          </div>

          {/* Core Values: UBUNTU */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Core Values: UBUNTU
            </h3>
            <p className="text-center text-gray-600 mb-6 text-sm">
              At KIUL, UBUNTU is not only our name — it is our moral compass. The six core values of Unity, 
              Benevolence, Understanding, Nobility, Togetherness, and Upliftment, embody how we teach, learn, and lead.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Unity */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                  U
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Unity</h4>
                  <p className="text-sm text-gray-600">in Diversity</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "We thrive through connection, not competition."
              </p>
            </div>

            {/* Benevolence */}
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl">
                  B
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Benevolence</h4>
                  <p className="text-sm text-gray-600">Compassion</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "We feel and act for one another&apos;s good."
              </p>
            </div>

            {/* Understanding */}
            <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xl">
                  U
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Understanding</h4>
                  <p className="text-sm text-gray-600">Wisdom</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "We seek to know deeply, think wisely, and act justly."
              </p>
            </div>

            {/* Nobility */}
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-xl">
                  N
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Nobility</h4>
                  <p className="text-sm text-gray-600">Integrity & Respect</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "We uphold moral character and human dignity."
              </p>
            </div>

            {/* Togetherness */}
            <div className="bg-pink-50 p-5 rounded-lg border border-pink-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl">
                  T
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Togetherness</h4>
                  <p className="text-sm text-gray-600">Interconnectedness</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "We build each other, for one&apos;s rise is all&apos;s rise."
              </p>
            </div>

            {/* Upliftment */}
            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                  U
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Upliftment</h4>
                  <p className="text-sm text-gray-600">Service & Growth</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "Leadership means serving and elevating others."
              </p>
            </div>
          </div>
        </section>

        {/* KIUL LEADERSHIP */}
        <section className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-2 text-center">
            KIUL Leadership
          </h2>
          
          <p className="text-center text-gray-600 mb-6">
            Leadership at the KIUL is expressed at different levels, all united by the spirit of Ubuntu.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Director */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white text-3xl mb-4">
                👥
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Director</h3>
              <p className="text-sm font-semibold text-blue-600 mb-3">Everyday Leadership</p>
              <p className="text-gray-600 leading-relaxed">
                Oversees the daily life of the Institute. The Director ensures that our vision and 
                mission are translated into action in our different programs.
              </p>
            </div>

            {/* Board of Directors */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500 text-white text-3xl mb-4">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Board of Directors</h3>
              <p className="text-sm font-semibold text-purple-600 mb-3">Strategic Guidance</p>
              <p className="text-gray-600 leading-relaxed">
                Steers the Institute&apos;s long-term direction, ensuring that KIUL grows with integrity, 
                sustainability, and impact while remaining faithful to its Ubuntu foundations.
              </p>
            </div>

            {/* Advisory Board */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white text-3xl mb-4">
                🏅
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Advisory Board</h3>
              <p className="text-sm font-semibold text-green-600 mb-3">Advice & Support</p>
              <p className="text-gray-600 leading-relaxed">
                A circle of trusted thinkers and practitioners who bring diverse expertise. Their role 
                is to enrich KIUL with ideas, perspectives, and networks that strengthen our work and 
                global connections.
              </p>
            </div>
          </div>
        </section>

        {/* VISION STATEMENT */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
          <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-4">
            Our Vision
          </h2>
          
          <p className="text-[17px] leading-relaxed text-[var(--kiul-text-soft)]">
            KIUL&apos;s vision is to nurture leaders who are ethical, creative, and deeply human, 
            capable of transforming their communities and the world through wisdom, empathy, and 
            collaboration. Through counselling companion services, mentorship pathways, leadership 
            capacity-building, and academic publishing, KIUL empowers individuals to grow, lead, 
            and contribute meaningfully to society.
          </p>
        </section>

      </div>
    </Container>
  );
}
