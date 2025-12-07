import React from "react";

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Membership
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            KIUL Membership
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Join a community inspired by Ubuntu, leadership, and transformative
            development—where learning is shared, and progress is collective.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Why Become a Member?
          </h2>
          <p className="text-slate-700">
            KIUL membership connects you to a network shaped by Ubuntu values,
            leadership practice, and development thinking. Members engage in
            continuous learning, collaborate with peers, and contribute to
            initiatives that uplift communities and champion ethical leadership.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Annual Membership Fee
          </h2>
          <p className="text-slate-700">
            KIUL sustains its programs through a modest yearly contribution,
            ensuring members receive meaningful value, access, and opportunities
            while supporting our Ubuntu-driven mission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Membership Benefits
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[ 
              "Access to the KIUL Newsletter",
              "Access to Blogs and selected educational content",
              "Discounts on publications, short courses, and events",
              "Participation in online seminars, talks, or workshops",
              "Early access to new KIUL programs or publications",
              "A sense of belonging to the Ubuntu leadership network",
            ].map((benefit) => (
              <li
                key={benefit}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            How to Join
          </h2>
          <p className="text-slate-700">
            Becoming a member is simple—complete a short registration and select
            your membership option. <span className="font-semibold text-slate-900">Online membership form coming soon.</span>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            An Ubuntu-Inspired Commitment
          </h2>
          <p className="text-slate-700">
            Membership at KIUL is more than access—it is a commitment to Ubuntu
            leadership, shared learning, and collective impact. Together, we
            foster ethical leaders who elevate communities and embody the values
            that define KIUL.
          </p>
        </section>
      </section>
    </main>
  );
}
