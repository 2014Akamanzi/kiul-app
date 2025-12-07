"use client";

import { useState } from 'react';
import StandardPageLayout from '../components/StandardPageLayout';
import TierCard from '../components/subscriptions/TierCard';

export default function SubscriptionsPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubscribe = (tierName: string) => {
    setNotificationMessage(
      `Thank you for your interest in the ${tierName} tier! Payment integration coming soon. Contact info.kiul@katokifoundation.org for early access.`
    );
    setShowNotification(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const freeTierFeatures = [
    { text: 'Free forever', included: true },
    { text: 'Basic AI counselling (10 messages/day)', included: true },
    { text: 'Basic mentorship support', included: true },
    { text: '1 course + 1 skill combination', included: true },
    { text: 'Up to 2 modules per course', included: true },
    { text: 'Basic Ubuntu philosophy integration', included: true },
    { text: '3 quiz questions per module', included: true },
    { text: 'Session history saving', included: false },
    { text: 'Applied practice section', included: false },
    { text: 'Priority support', included: false },
  ];

  const standardTierFeatures = [
    { text: 'Unlimited AI counselling messages', included: true },
    { text: 'Unlimited mentorship sessions', included: true },
    { text: '3 courses + 3 skills combinations', included: true },
    { text: 'Up to 4 modules per course', included: true },
    { text: 'Save last 3 conversation sessions', included: true },
    { text: 'Enhanced Ubuntu pedagogy', included: true },
    { text: '4 quiz questions per module', included: true },
    { text: 'Email support within 24 hours', included: true },
    { text: 'Applied practice section', included: false },
    { text: 'Priority webinar access', included: false },
  ];

  const premiumTierFeatures = [
    { text: 'Everything in Standard, plus:', included: true },
    { text: 'Unlimited courses + skills (5 max per generation)', included: true },
    { text: 'Full 5 modules per course', included: true },
    { text: 'Complete Ubuntu pedagogy structure', included: true },
    { text: 'Applied practice section for every course', included: true },
    { text: '5 quiz questions per module', included: true },
    { text: 'Unlimited session history', included: true },
    { text: 'Priority access to KIUL webinars', included: true },
    { text: 'Monthly "Ubuntu Circle" group session', included: true },
    { text: 'PDF export of courses (coming soon)', included: true },
    { text: 'Priority email support within 6 hours', included: true },
  ];

  return (
    <StandardPageLayout>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          KIUL Membership & Subscriptions
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          Choose the level of Ubuntu-powered support and learning that fits your journey
        </p>
      </section>

        {/* Notification Banner */}
        {showNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
            <div className="bg-[var(--kiul-emerald-700)] text-white px-6 py-4 rounded-xl shadow-[var(--kiul-shadow-lg)] max-w-md">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notificationMessage}</p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-white hover:text-emerald-100"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {/* Free Tier */}
              <TierCard
                name="Free"
                price="Free"
                description="Perfect for exploring KIUL's Ubuntu-powered learning"
                features={freeTierFeatures}
                ctaText="Get Started Free"
                onSubscribe={() => handleSubscribe('Free')}
              />

              {/* Standard Tier */}
              <TierCard
                name="Standard"
                price="4.99"
                priceDetail="Approx. NAD 90 / TZS 12,500 per month"
                description="Unlock deeper learning and save your progress"
                features={standardTierFeatures}
                isPopular={true}
                ctaText="Subscribe to Standard"
                onSubscribe={() => handleSubscribe('Standard')}
              />

              {/* Premium Tier */}
              <TierCard
                name="Premium"
                price="24.99"
                priceDetail="Approx. NAD 450 / TZS 62,500 per month"
                description="Complete Ubuntu experience with full access"
                features={premiumTierFeatures}
                ctaText="Subscribe to Premium"
                onSubscribe={() => handleSubscribe('Premium')}
              />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 bg-[var(--kiul-bg-soft)]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[var(--kiul-emerald-900)] text-center mb-4">
              Feature Comparison
            </h2>
            <p className="text-center text-[var(--kiul-text-medium)] mb-12 max-w-2xl mx-auto">
              See how our tiers compare across Counselling, Mentorship, and Short Courses
            </p>

            <div className="bg-[var(--kiul-card-bg)] rounded-2xl shadow-[var(--kiul-shadow-soft)] overflow-hidden border border-[var(--kiul-border)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--kiul-emerald-700)] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center font-semibold">Free</th>
                      <th className="px-6 py-4 text-center font-semibold">Standard</th>
                      <th className="px-6 py-4 text-center font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--kiul-border)]">
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Counselling Messages/Day
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">10</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Unlimited</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Mentorship Sessions
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Basic</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Unlimited</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Courses + Skills
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">1 + 1</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">3 + 3</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">5 + 5</td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Modules per Course
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">2 of 5</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">4 of 5</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">All 5</td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Quiz Questions/Module
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">3</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">4</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">5</td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Session History
                      </td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">None</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Last 3</td>
                      <td className="px-6 py-4 text-center text-[var(--kiul-text-medium)]">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Applied Practice
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[var(--kiul-emerald-600)]">✓</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[var(--kiul-bg-soft)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--kiul-text-dark)]">
                        Ubuntu Circle Sessions
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-400">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[var(--kiul-emerald-600)]">✓</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[var(--kiul-emerald-900)] text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-[var(--kiul-text-medium)] mb-12">
              Common questions about KIUL subscriptions
            </p>

            <div className="space-y-6">
              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-6 shadow-[var(--kiul-shadow-soft)]">
                <h3 className="text-lg font-bold text-[var(--kiul-emerald-900)] mb-2">
                  Can I upgrade or downgrade my tier?
                </h3>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                  Yes! You can change your subscription tier at any time. Changes take effect immediately, 
                  and you'll be charged (or credited) a prorated amount.
                </p>
              </div>

              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-6 shadow-[var(--kiul-shadow-soft)]">
                <h3 className="text-lg font-bold text-[var(--kiul-emerald-900)] mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                  We accept major credit cards, PayPal, and mobile money (M-Pesa, Airtel Money) for local currencies. 
                  Payment integration is coming soon.
                </p>
              </div>

              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-6 shadow-[var(--kiul-shadow-soft)]">
                <h3 className="text-lg font-bold text-[var(--kiul-emerald-900)] mb-2">
                  Is there a commitment period?
                </h3>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                  No long-term commitment required. All subscriptions are billed monthly and can be cancelled at any time. 
                  You'll retain access until the end of your billing period.
                </p>
              </div>

              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-6 shadow-[var(--kiul-shadow-soft)]">
                <h3 className="text-lg font-bold text-[var(--kiul-emerald-900)] mb-2">
                  Do you offer student or institutional discounts?
                </h3>
                <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                  Yes! We offer special pricing for students, educational institutions, and NGOs. 
                  Contact info.kiul@katokifoundation.org for more information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-[var(--kiul-emerald-700)] to-[var(--kiul-emerald-800)] text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Begin Your Ubuntu Journey?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
              Join thousands of learners embracing Ubuntu philosophy through AI-powered 
              counselling, mentorship, and transformative education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleSubscribe('Free')}
                className="bg-white text-[var(--kiul-emerald-700)] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all shadow-lg"
              >
                Start Free Today
              </button>
              <a
                href="mailto:info.kiul@katokifoundation.org"
                className="bg-[var(--kiul-emerald-600)] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[var(--kiul-emerald-500)] transition-all border-2 border-white"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </StandardPageLayout>
  );
}
