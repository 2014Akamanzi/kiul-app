import Link from "next/link";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/counselling", label: "Counselling" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/short-courses", label: "Short Courses" },
  { href: "/courses-dashboard", label: "My Courses" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/publishing", label: "Publishing" },
  { href: "/membership", label: "Membership" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-[var(--kiul-card-bg)]/80 backdrop-blur border-b border-[var(--kiul-border)] sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-[var(--space-lg)] py-[var(--space-sm)]">
        <div className="text-lg font-bold tracking-tight text-[var(--kiul-emerald-800)]">
          KIUL
        </div>
        <div className="hidden items-center gap-[var(--space-sm)] text-sm font-medium text-[var(--kiul-text-dark)] sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 transition-all hover:bg-[var(--kiul-emerald-50)] hover:text-[var(--kiul-emerald-700)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex sm:hidden">
          <div className="text-xs font-medium text-[var(--kiul-text-dark)]">
            Menu
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--kiul-border)] sm:hidden">
        <div className="mx-auto flex flex-wrap gap-[var(--space-xs)] px-[var(--space-sm)] py-[var(--space-sm)] text-sm font-medium text-[var(--kiul-text-dark)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 transition-all hover:bg-[var(--kiul-emerald-50)] hover:text-[var(--kiul-emerald-700)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
