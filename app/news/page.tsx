import React from "react";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            News
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            News & Announcements
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Updates from the Katoki Institute for Ubuntu Leadership (KIUL):
            events, publications, community highlights, and institutional news.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Upcoming Events
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Conferences",
              "Seminars and webinars",
              "Workshops",
              "Leadership talks and public dialogues",
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

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Recent Announcements
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "New publications",
              "Calls for papers",
              "Program launches",
              "Media updates (Katoki Radio, Katoki TV)",
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
            KIUL in the Community
          </h2>
          <p className="text-slate-700">
            KIUL remains actively engaged in Ubuntu-based leadership initiatives,
            partnering with communities, institutions, and networks to advance
            ethical, inclusive development and collective flourishing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            What’s Next
          </h2>
          <p className="text-slate-700">
            A dynamic, database-driven news system will be added soon to surface
            real-time events, announcements, and stories across KIUL.
          </p>
        </section>
      </section>
    </main>
  );
}
