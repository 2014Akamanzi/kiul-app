import React from "react";
import StandardPageLayout from '../components/StandardPageLayout';
import CounsellingChat from '@/app/components/CounsellingChat';

export default function CounsellingPage() {
  return (
    <StandardPageLayout>
      {/* PAGE HEADER */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          KIUL Counselling Companion
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          A quiet Ubuntu space to reflect, talk, and regain strength
        </p>
      </section>

      {/* SUBSCRIPTION TIERS */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8 py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--kiul-card-bg)]">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--kiul-emerald-900)] mb-4">
              Choose Your Support Level
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
              Select the counselling support that fits your journey
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-2">Free</h3>
                <p className="text-sm text-[var(--kiul-text-medium)] font-semibold">Basic Support</p>
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
                  Basic AI counselling
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Ubuntu-grounded reflections
                </li>
              </ul>
              <button className="w-full bg-[var(--kiul-card-bg)] text-[var(--kiul-emerald-700)] border-2 border-[var(--kiul-emerald-700)] font-semibold px-6 py-3 rounded-lg hover:bg-[var(--kiul-emerald-50)] transition-all duration-300">
                Current Plan
              </button>
            </div>

            {/* Tier 2 - Standard */}
            <div className="bg-[var(--kiul-card-bg)] border-2 border-[var(--kiul-emerald-700)] rounded-2xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-lg)] hover:shadow-[var(--kiul-shadow-lg)] transform hover:scale-105 transition-all relative">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-2">Standard</h3>
                <p className="text-sm text-[var(--kiul-text-medium)] font-semibold">Enhanced Support</p>
              </div>
              <ul className="space-y-[var(--space-xs)] mb-[var(--space-lg)]">
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited messages
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save last 3 sessions
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Deeper Ubuntu reflective mode
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-2">Premium</h3>
                <p className="text-sm text-[var(--kiul-text-medium)] font-semibold">Complete Care</p>
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
                  Monthly "Ubuntu Circle" Zoom group
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Discounts for KIUL courses
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--kiul-text-medium)]">
                  <svg className="h-5 w-5 text-[var(--kiul-emerald-700)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Anonymous email-based support
                </li>
              </ul>
              <button className="w-full bg-[var(--kiul-emerald-700)] text-white font-bold px-6 py-3 rounded-lg hover:bg-[var(--kiul-emerald-600)] hover:shadow-[var(--kiul-shadow-lg)] transition-all duration-300 shadow-md">
                Select Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN INTERFACE */}
      <section className="py-[var(--space-2xl)]">
        <div>
          <div className="flex flex-col xl:grid xl:grid-cols-2 gap-[var(--space-xl)]">
            
            {/* LEFT SIDE - Description */}
            <div className="space-y-[var(--space-lg)]">
              <div>
                <h2 className="text-3xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
                  KIUL Counselling Companion
                </h2>
                <p className="text-xl text-[var(--kiul-emerald-700)] font-semibold mb-[var(--space-md)]">
                  A quiet Ubuntu space to reflect, talk, and regain strength.
                </p>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-sm)]">
                  In Ubuntu philosophy, we understand that "I am because we are." Your struggles and triumphs 
                  are not yours alone—they are woven into the fabric of our shared humanity. This counselling 
                  companion offers you a safe, compassionate space to explore your feelings, process your 
                  experiences, and find strength through connection.
                </p>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                  Our AI counsellor is trained in Ubuntu-centered care, emphasizing dignity, empathy, and 
                  the power of community. While this tool is not a replacement for professional mental health 
                  care, it provides a supportive starting point for reflection and healing.
                </p>
              </div>

              {/* What to Expect */}
              <div className="bg-[var(--kiul-emerald-50)] border border-[var(--kiul-emerald-200)] rounded-xl p-[var(--space-lg)]">
                <h3 className="text-xl font-bold text-[var(--kiul-emerald-800)] mb-[var(--space-sm)]">
                  What to Expect
                </h3>
                <ul className="space-y-[var(--space-xs)] text-[var(--kiul-text-medium)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>A warm, non-judgmental space for reflection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Ubuntu-grounded guidance and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Gentle encouragement toward hope and healing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--kiul-emerald-700)] font-bold">•</span>
                    <span>Referrals to professional help when needed</span>
                  </li>
                </ul>
              </div>

              {/* Safety Notice */}
              <div className="bg-red-50 border-l-4 border-red-500 p-[var(--space-md)] rounded-r-xl">
                <h3 className="text-lg font-bold text-red-800 mb-2">Important Safety Information</h3>
                <p className="text-sm text-red-900 mb-2">
                  If you are experiencing thoughts of self-harm or suicide, please reach out for immediate human support:
                </p>
                <ul className="text-sm text-red-900 space-y-1">
                  <li><strong>WhatsApp:</strong> +255-758624863</li>
                  <li><strong>Email:</strong> info.kiul@katokifoundation.org</li>
                  <li><strong>Emergency:</strong> Contact your local emergency services</li>
                </ul>
              </div>
            </div>

            {/* RIGHT SIDE - Chat Interface */}
            <div>
              <CounsellingChat />
            </div>

          </div>
        </div>
      </section>

      {/* ADDITIONAL INFO */}
      <section className="-mx-6 py-[var(--space-2xl)] px-6 bg-[var(--kiul-bg-soft)]">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
            A Gentle Reminder
          </h3>
          <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-md)]">
            Please use counselling resources responsibly and ethically. This AI companion is designed 
            to support reflection and provide comfort, but it is not a substitute for professional 
            mental health care. Reach out to trusted professionals and community supports whenever 
            deeper or urgent care is needed.
          </p>
          <p className="text-sm text-[var(--kiul-text-light)] italic">
            "Ubuntu ngumuntu ngabantu" — A person is a person through other people.
          </p>
        </div>
      </section>
    </StandardPageLayout>
  );
}
