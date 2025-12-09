"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  const menu = [
    { label: "Home", href: "/" },
    { label: "About KIUL", href: "/about" },
    { label: "Publishing", href: "/publishing" },
    { label: "Search", href: "/publishing/search" },
    { label: "Counselling", href: "/counselling" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Short Courses", href: "/short-courses" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Membership", href: "/membership" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full border-b bg-white">
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-2 text-[var(--kiul-text-dark)] font-semibold text-lg">
          <div className="w-8 h-8 rounded-full bg-[var(--kiul-green)] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">K</span>
          </div>
          KIUL
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="text-[var(--kiul-text-soft)] hover:text-[var(--kiul-green)] transition"
            >
              {m.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold
                         hover:bg-emerald-700 transition flex items-center gap-1"
            >
              🔐 Admin
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-[var(--kiul-text-dark)]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-2">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="block text-[var(--kiul-text-soft)] py-2 hover:text-[var(--kiul-green)] transition"
              onClick={() => setOpen(false)}
            >
              {m.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="block px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold
                         hover:bg-emerald-700 transition"
              onClick={() => setOpen(false)}
            >
              🔐 Admin Portal
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
