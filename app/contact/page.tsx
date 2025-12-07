import React from "react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 md:px-8 lg:px-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="max-w-2xl text-lg text-slate-700">
            KIUL welcomes inquiries, collaboration requests, and general
            communication—always grounded in Ubuntu values of respect, dignity,
            and shared purpose.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Email
          </h2>
          <p className="text-slate-700">placeholder@kiul.org (to be confirmed)</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            WhatsApp
          </h2>
          <p className="text-slate-700">+255-758-624-863 (WhatsApp only)</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Office Hours
          </h2>
          <p className="text-slate-700">Monday–Friday, 08:00–17:00 (local time)</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Katoki Media
          </h2>
          <p className="text-slate-700">
            KIUL also communicates through Katoki Radio (Swahili) and Katoki TV.
            Links and live stream details will be added here soon.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Contact Form (Coming Soon)
          </h2>
          <p className="text-slate-700">
            An online submission form will be available here to send messages,
            partnership ideas, or program inquiries directly to the KIUL team.
          </p>
        </section>
      </section>
    </main>
  );
}
