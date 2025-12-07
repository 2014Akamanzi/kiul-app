import MentorshipChat from '@/app/components/MentorshipChat';
import StandardPageLayout from '../components/StandardPageLayout';

export default function MentorshipPage() {
  return (
    <StandardPageLayout>
      {/* PAGE HEADER */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          KIUL Mentorship Pathways
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          A supportive Ubuntu space to explore your goals and shape your journey
        </p>
      </section>

      {/* MENTORSHIP TIERS */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8 py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--kiul-card-bg)]">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-4">
              Choose Your Mentorship Tier
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
              Select the level of guidance that aligns with your growth journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]">
            
            {/* Tier 1 - Free */}
            <div className="bg-[var(--kiul-card-bg)] border-2 border-[var(--kiul-border)] rounded-2xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-soft)] hover:shadow-[var(--kiul-shadow-lg)] transition-all">
              <div className="text-center mb-[var(--space-md)]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--kiul-emerald-100)] rounded-full mb-[var(--space-sm)]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-[var(--kiul-emerald-700)]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-2">Free</h3>
                <p className="text-sm text-[var(--kiul-text-medium)] font-semibold">Basic Mentorship</p>
              </div>
              <ul className="space-y-[var(--space-xs)] mb-[var(--space-lg)]">
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  10 messages per day
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Basic direction-finding questions
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  No session history
                </li>
              </ul>
              <button className="w-full bg-[var(--kiul-card-bg)] text-[var(--kiul-emerald-700)] border-2 border-[var(--kiul-emerald-700)] font-semibold px-6 py-3 rounded-lg hover:bg-[var(--kiul-emerald-50)] transition-all duration-300">
                Current Plan
              </button>
            </div>

            {/* Tier 2 - Standard */}
            <div className="bg-[var(--kiul-card-bg)] border-2 border-[var(--kiul-emerald-700)] rounded-2xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-lg)] transform hover:scale-105 transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[var(--kiul-emerald-700)] text-white text-xs font-bold px-4 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-center mb-[var(--space-md)]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--kiul-emerald-100)] rounded-full mb-[var(--space-sm)]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-[var(--kiul-emerald-700)]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-2">Standard</h3>
                <p className="text-sm text-[var(--kiul-text-medium)] font-semibold">Enhanced Guidance</p>
              </div>
              <ul className="space-y-[var(--space-xs)] mb-[var(--space-lg)]">
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited mentorship chat
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save last 5 mentorship sessions
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Goal mapping tool (text-based)
                </li>
              </ul>
              <button className="w-full bg-[var(--kiul-emerald-700)] text-white font-bold px-6 py-3 rounded-lg hover:bg-[var(--kiul-emerald-600)] hover:shadow-[var(--kiul-shadow-lg)] transition-all duration-300 shadow-md">
                Select Standard
              </button>
            </div>

            {/* Tier 3 - Premium */}
            <div className="bg-[var(--kiul-card-bg)] border-2 border-[var(--kiul-border)] rounded-2xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-soft)] hover:shadow-[var(--kiul-shadow-lg)] transition-all">
              <div className="text-center mb-[var(--space-md)]">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--kiul-emerald-100)] rounded-full mb-[var(--space-sm)]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-[var(--kiul-emerald-700)]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-2">Premium</h3>
                <p className="text-sm text-[var(--kiul-text-medium)] font-semibold">Complete Pathway</p>
              </div>
              <ul className="space-y-[var(--space-xs)] mb-[var(--space-lg)]">
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Standard
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Career Portfolio Builder (AI roadmap)
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Monthly Ubuntu Leadership Q&A
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Early access to KIUL courses
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority human mentorship booking
                </li>
              </ul>
              <button className="w-full bg-[var(--kiul-emerald-700)] text-white font-bold px-6 py-3 rounded-lg hover:bg-[var(--kiul-emerald-600)] hover:shadow-[var(--kiul-shadow-lg)] transition-all duration-300 shadow-md">
                Select Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN MENTORSHIP INTERFACE */}
      <section className="py-[var(--space-2xl)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col xl:grid xl:grid-cols-2 gap-[var(--space-xl)]">
            
            {/* LEFT SIDE - Description */}
            <div className="space-y-[var(--space-lg)]">
              <div>
                <h2 className="text-3xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
                  KIUL Mentorship Pathways
                </h2>
                <p className="text-xl text-[var(--kiul-emerald-700)] font-semibold mb-[var(--space-md)]">
                  A supportive Ubuntu space to explore your goals and shape your journey.
                </p>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-sm)]">
                  In Ubuntu philosophy, "a person becomes through others." Your growth is not a solitary 
                  pursuit—it's shaped by purpose, relationships, and community. KIUL Mentorship Pathways 
                  offers you an AI-assisted guide to explore career direction, clarify goals, reflect on 
                  strengths, and discover actionable steps forward.
                </p>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                  This mentorship companion helps you connect personal ambition with meaningful contribution. 
                  Whether you're exploring career options, developing skills, considering academic pathways, 
                  or seeking purpose, we're here to support your journey with warmth and wisdom.
                </p>
              </div>

              {/* What We Cover */}
              <div className="bg-[var(--kiul-emerald-50)] border border-[var(--kiul-emerald-200)] rounded-xl p-[var(--space-lg)]">
                <h3 className="text-xl font-bold text-[var(--kiul-emerald-800)] mb-[var(--space-sm)]">
                  What We Explore Together
                </h3>
                <ul className="space-y-[var(--space-xs)] text-[var(--kiul-text-medium)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Career exploration and professional direction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Skills development and learning strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Academic pathways and program selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Leadership formation with Ubuntu principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Life purpose and meaningful contribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Strategic action planning and next steps</span>
                  </li>
                </ul>
              </div>

              {/* Important Note */}
              <div className="bg-[var(--kiul-bg-soft)] border-l-4 border-[var(--kiul-emerald-700)] p-[var(--space-md)] rounded-r-xl">
                <h3 className="text-lg font-bold text-[var(--kiul-emerald-800)] mb-2">Ubuntu Mentorship Approach</h3>
                <p className="text-sm text-[var(--kiul-text-medium)]">
                  "We rise by lifting each other." This mentorship guide offers supportive direction and 
                  thoughtful questions, but doesn't guarantee specific outcomes. Your journey is uniquely 
                  yours, shaped by your choices, effort, and the relationships you build along the way.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Chat Interface */}
            <div>
              <MentorshipChat />
            </div>

          </div>
        </div>
      </section>

      {/* ADDITIONAL INFO */}
      <section className="-mx-6 py-[var(--space-2xl)] px-6 bg-[var(--kiul-bg-soft)]">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
            Growth Through Ubuntu
          </h3>
          <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-md)]">
            In Ubuntu, growth is relational. KIUL mentorship blends structure with community wisdom, 
            affirming that becoming yourself is a shared process. This AI guide is designed to support 
            your exploration and provide direction, but remember that true growth happens through 
            relationships, action, and continuous learning.
          </p>
          <p className="text-sm text-[var(--kiul-text-light)] italic">
            "Umuntu ngumuntu ngabantu" — A person becomes through other people.
          </p>
        </div>
      </section>
    </StandardPageLayout>
  );
}
