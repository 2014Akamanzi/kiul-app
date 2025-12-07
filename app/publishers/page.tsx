import React from "react";

export default function PublishersPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Publishers
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            KIUL Publications
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            The Katoki Institute for Ubuntu Leadership (KIUL) publishes research,
            insights, and practical tools that advance Ubuntu-inspired leadership,
            development studies, and community transformation.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            KIUL Publications
          </h2>
          <p className="text-slate-700">
            We curate diverse formats to reach scholars, practitioners, and
            communities:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Books",
              "The Commons",
              "Justice & Development Journal",
              "Working Papers",
              "Self-Help & Motivation Books",
              "Blogs",
              "Conference Proceedings",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Scientific Board
          </h2>
          <p className="text-slate-700">
            The Scientific Board safeguards academic rigor and ethical standards.
            It oversees quality assurance, upholds publication ethics, and
            ensures that KIUL’s outputs align with our mission and scholarly
            integrity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Editorial Board
          </h2>
          <p className="text-slate-700">
            The Editorial Board manages peer review, makes editorial decisions,
            sets publication schedules, and enforces KIUL’s editorial policies.
            They coordinate reviewers, guide authors through revisions, and keep
            each publication cycle on track.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Reviewer Pool
          </h2>
          <p className="text-slate-700">
            KIUL collaborates with qualified reviewers across disciplines,
            drawing on regional and international expertise to provide rigorous,
            fair, and constructive feedback for every submission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Publishing Workflow
          </h2>
          <p className="text-slate-700">
            Our workflow covers submission intake, preliminary screening,
            assignment to reviewers, peer review, author revisions, editorial
            approvals, and publication. Clear communication at each stage keeps
            authors informed and quality consistent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Publishing Policies
          </h2>
          <p className="text-slate-700">
            We uphold transparency, originality, and strong anti-plagiarism
            standards. Editorial independence, peer-review integrity, data
            protection, and—where applicable—open access principles guide our
            publishing decisions so that knowledge remains trustworthy and
            accessible.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Authors’ Guide
          </h2>
          <p className="text-slate-700">
            Authors should follow KIUL submission guidelines, formatting and
            citation styles, and prepare for double-blind peer review. Timely and
            substantive revisions are expected. Authors retain responsibility for
            originality, permissions, data integrity, and adherence to ethical
            standards throughout the publishing process.
          </p>
        </section>
      </section>
    </main>
  );
}
