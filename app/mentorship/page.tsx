import React from "react";

export default function MentorshipPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Mentorship
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Mentorship Pathways
          </h1>
          <p className="max-w-2xl text-lg text-slate-700">
            KIUL’s mentorship approach is relational guidance rooted in Ubuntu
            leadership, experience-sharing, and personal development—connecting
            mentors and mentees to learn, reflect, and grow together.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            What Mentorship Means at KIUL
          </h2>
          <div className="space-y-3 text-slate-700">
            <p>Relational support that honors dignity, trust, and mutual respect.</p>
            <p>Guidance for navigating academic and professional growth with clarity.</p>
            <p>Community-based learning that values collective wisdom and Ubuntu.</p>
            <p>Ethical leadership development shaped by reflection and accountability.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            AI-Supported Mentorship (Coming Soon)
          </h2>
          <p className="text-slate-700">
            KIUL will soon provide personalized mentorship prompts, clarity
            questions, and reflective leadership tools to complement human
            mentorship and deepen learning.
          </p>
        </section>
      </section>
    </main>
  );
}
