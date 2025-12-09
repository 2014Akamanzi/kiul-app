import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Admin Navigation */}
        <nav className="mb-8 bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--kiul-text-dark)]">
              Admin Portal
            </h2>
            <div className="flex gap-3 flex-wrap">
              <a
                href="/admin/dashboard"
                className="px-4 py-2 bg-[var(--kiul-green)] text-white rounded-lg font-semibold
                           hover:bg-[var(--kiul-green-dark)] transition"
              >
                📋 Manuscripts
              </a>
              <a
                href="/admin/materials"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold
                           hover:bg-emerald-700 transition"
              >
                📝 Materials
              </a>
              <a
                href="/admin/reviewers"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold
                           hover:bg-purple-700 transition"
              >
                👥 Reviewers
              </a>
              <a
                href="/admin/issues"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold
                           hover:bg-indigo-700 transition"
              >
                📖 Journal Issues
              </a>
              <a
                href="/admin/publishing"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold
                           hover:bg-blue-700 transition"
              >
                📚 Publications
              </a>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
