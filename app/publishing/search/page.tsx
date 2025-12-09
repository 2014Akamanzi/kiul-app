"use client";

import { useState } from "react";

interface SearchResult {
  title: string;
  category: string;
  path: string;
}

export default function SearchPublications() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await r.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      books: "Books",
      spiritual: "Spiritual Books",
      cjdj: "CJDJ Articles",
      "working-papers": "Working Papers",
      proceedings: "Conference Proceedings",
      blogs: "Blogs",
    };
    return labels[cat] || cat;
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
        Search Publications
      </h1>

      <p className="text-[17px] text-[var(--kiul-text-soft)] mb-10 max-w-2xl">
        Search across KIUL's entire publication database — books, journals,
        working papers, proceedings, and blogs.
      </p>

      <div className="max-w-[900px] mx-auto">
        {/* Search Bar */}
        <div className="flex gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search books, papers, articles..."
            className="flex-grow border border-gray-300 rounded-xl px-4 py-3 text-[16px]
                       focus:outline-none focus:border-[var(--kiul-green)]"
          />
          <button
            onClick={search}
            disabled={loading}
            className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-[var(--kiul-text-soft)]">
              Found {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {results.map((r, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm
                         hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[var(--kiul-text-dark)]">
                  {r.title}
                </h3>
                <span
                  className="text-xs bg-[var(--kiul-green-light)] text-[var(--kiul-green)]
                           px-3 py-1 rounded-full font-semibold"
                >
                  {getCategoryLabel(r.category)}
                </span>
              </div>
              <a
                href={r.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[var(--kiul-green)] hover:underline text-sm font-semibold"
              >
                View/Download PDF →
              </a>
            </div>
          ))}
        </div>

        {results.length === 0 && query && !loading && (
          <div className="text-center py-12">
            <p className="text-[var(--kiul-text-soft)]">
              No results found for "{query}". Try different keywords.
            </p>
          </div>
        )}

        {/* Categories Info */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a
              href="/publishing/books"
              className="block p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:shadow-lg transition text-center"
            >
              <div className="font-semibold text-[var(--kiul-green)]">Books</div>
              <div className="text-sm text-gray-600">
                Academic publications
              </div>
            </a>
            <a
              href="/publishing/cjdj"
              className="block p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl hover:shadow-lg transition text-center"
            >
              <div className="font-semibold text-[var(--kiul-green)]">CJDJ</div>
              <div className="text-sm text-gray-600">
                Journal articles
              </div>
            </a>
            <a
              href="/publishing/working-papers"
              className="block p-4 bg-orange-50 border-2 border-orange-200 rounded-xl hover:shadow-lg transition text-center"
            >
              <div className="font-semibold text-[var(--kiul-green)]">Working Papers</div>
              <div className="text-sm text-gray-600">
                Research papers
              </div>
            </a>
            <a
              href="/publishing/proceedings"
              className="block p-4 bg-teal-50 border-2 border-teal-200 rounded-xl hover:shadow-lg transition text-center"
            >
              <div className="font-semibold text-[var(--kiul-green)]">Proceedings</div>
              <div className="text-sm text-gray-600">
                Conference papers
              </div>
            </a>
            <a
              href="/publishing/spiritual-books"
              className="block p-4 bg-purple-50 border-2 border-purple-200 rounded-xl hover:shadow-lg transition text-center"
            >
              <div className="font-semibold text-[var(--kiul-green)]">Spiritual Books</div>
              <div className="text-sm text-gray-600">
                Ubuntu philosophy
              </div>
            </a>
            <a
              href="/publishing/blogs"
              className="block p-4 bg-pink-50 border-2 border-pink-200 rounded-xl hover:shadow-lg transition text-center"
            >
              <div className="font-semibold text-[var(--kiul-green)]">Blogs</div>
              <div className="text-sm text-gray-600">
                Latest insights
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
