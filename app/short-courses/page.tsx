import React from "react";

export default function ShortCoursesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Short Courses
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Short Courses at KIUL
          </h1>
          <p className="max-w-2xl text-lg text-slate-700">
            KIUL designs accessible, Ubuntu-informed learning opportunities that
            blend rigor, relevance, and community-centered practice.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            What Our Courses Offer
          </h2>
          <div className="space-y-3 text-slate-700">
            <p>Skills development anchored in real-world application.</p>
            <p>Leadership training that embodies Ubuntu ethics and service.</p>
            <p>Practical knowledge for professional growth across sectors.</p>
            <p>Self-paced online learning for flexible, continuous development.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            AI-Generated Custom Courses (Coming Soon)
          </h2>
          <p className="text-slate-700">
            Soon, learners will select modules and receive tailored learning
            pathways through AI assistance—curating content that aligns with
            their goals while staying rooted in Ubuntu-informed leadership and
            practice.
          </p>
        </section>
      </section>
    </main>
  );
}
