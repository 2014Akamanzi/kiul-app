import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-12 p-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Katoki Institute for Ubuntu Leadership (KIUL)
          </h1>
          <p className="text-lg text-gray-700">
            A centre for Ubuntu philosophy, leadership, scholarship, publishing,
            and community empowerment across Africa.
          </p>
          <p className="text-base text-gray-700">
            Grounded in Ubuntu, KIUL is committed to leadership, healing,
            development studies, and knowledge production that uplifts
            communities with dignity, wisdom, and collective purpose.
          </p>
        </div>

        <section className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Core Services</h2>
          <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[ 
              { href: "/publishers", label: "Publishing" },
              { href: "/counselling", label: "Counselling Companion" },
              { href: "/mentorship", label: "Mentorship Pathways" },
              { href: "/short-courses", label: "Short Courses" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-base font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Institutional Pages</h2>
          <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[ 
              { href: "/about", label: "About KIUL" },
              { href: "/membership", label: "Membership" },
              { href: "/news", label: "News & Announcements" },
              { href: "/contact", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-base font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
