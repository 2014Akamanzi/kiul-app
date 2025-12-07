import React from "react";

export default function CounsellingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Counselling
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Counselling Companion
          </h1>
          <p className="max-w-2xl text-lg text-slate-700">
            KIUL’s Ubuntu-inspired counselling philosophy centers listening,
            empathy, community, and self-awareness—creating space for healing
            that honors dignity and interconnectedness.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            What This Service Offers
          </h2>
          <div className="space-y-3 text-slate-700">
            <p>Quiet reflective space for personal processing and clarity.</p>
            <p>Support for personal growth rooted in Ubuntu-informed guidance.</p>
            <p>Emotional well-being resources that respect context and community.</p>
            <p>Healing principles anchored in Ubuntu—relational, ethical, and restorative.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            AI-Enhanced Counselling (Coming Soon)
          </h2>
          <p className="text-slate-700">
            KIUL will soon offer an AI-powered reflective tool grounded in Ubuntu
            values to support thoughtful, compassionate self-reflection alongside
            human-led guidance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            A Gentle Note
          </h2>
          <p className="text-slate-700">
            Please use counselling resources responsibly and ethically. Reach out
            to trusted professionals and community supports whenever deeper or
            urgent care is needed.
          </p>
        </section>
      </section>
    </main>
  );
}
