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
    <aside className="w-full md:w-64 border border-[#e8e1d8] bg-white rounded-xl p-6 shadow-sm h-fit">
      <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Publishing Menu</h3>

      <nav className="flex flex-col gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="text-[#1a1a1a] hover:text-[#1a4d2e] transition text-sm"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
