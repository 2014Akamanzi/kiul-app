export default function PublishingSidebar() {
  const links = [
    { label: "Publishing Hub", href: "/publishing" },
    { label: "CJDJ Journal", href: "/publishing/cjdj" },
    { label: "Academic Books", href: "/publishing/books" },
    { label: "Spiritual & Motivation Books", href: "/publishing/spiritual-books" },
    { label: "Working Papers", href: "/publishing/working-papers" },
    { label: "Conference Proceedings", href: "/publishing/proceedings" },
    { label: "Blogs & Reflections", href: "/publishing/blogs" },
    { label: "Publishing Guidelines", href: "/publishing/guidelines" },
  ];

  return (
    <aside className="w-full md:w-64 border border-[var(--kiul-border)] bg-[var(--kiul-card-bg)] rounded-xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-soft)] h-fit">
      <h3 className="text-lg font-semibold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">Publishing Menu</h3>

      <nav className="flex flex-col gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="text-[var(--kiul-text-dark)] hover:text-[var(--kiul-emerald-700)] transition-colors text-sm"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
