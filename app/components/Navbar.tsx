import Link from "next/link";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/counselling", label: "Counselling" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/short-courses", label: "Short Courses" },
  { href: "/publishing", label: "Publishing" },
  { href: "/membership", label: "Membership" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-lg font-semibold tracking-tight text-slate-900">
          KIUL
        </div>
        <div className="hidden items-center gap-4 text-sm font-medium text-slate-700 sm:flex md:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-1 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex sm:hidden">
          <div className="text-xs font-medium text-slate-500">
            Menu
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 sm:hidden">
        <div className="mx-auto flex flex-wrap gap-3 px-4 py-3 text-sm font-medium text-slate-700">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-1 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
