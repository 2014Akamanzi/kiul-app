"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  doi: string;
  final_pdf: string;
  publication_date: string;
  keywords: string;
}

export default function ArticleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(true);

    try {
      // Use RPC function for search
      const { data, error } = await supabase.rpc("search_articles", {
        search_term: query.trim(),
      });

      if (error) {
        console.error("Search error:", error);
        setResults([]);
      } else {
        setResults(data || []);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-[900px] mx-auto px-6 py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🔍 Search Journal Articles
          </h1>
          <p className="text-gray-600 text-lg">
            Search by title, author, keywords, DOI, or abstract
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by title, abstract, author, DOI, or keywords..."
              className="flex-1 border-2 border-gray-200 p-4 rounded-xl focus:border-green-500 focus:outline-none text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className="px-8 py-4 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Results Count */}
        {searched && (
          <div className="mb-6 text-gray-600">
            {loading ? (
              <p>Searching...</p>
            ) : (
              <p>
                Found <strong className="text-green-700">{results.length}</strong> article
                {results.length !== 1 ? "s" : ""}
                {query && ` for "${query}"`}
              </p>
            )}
          </div>
        )}

        {/* Results */}
        <div className="space-y-6">
          {results.map((article) => (
            <div
              key={article.id}
              className="p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {article.title}
              </h2>

              <p className="text-gray-700 mb-2">
                <strong>Authors:</strong> {article.authors}
              </p>

              {article.keywords && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Keywords:</strong> {article.keywords}
                </p>
              )}

              <p className="text-gray-700 mb-4 line-clamp-3">{article.abstract}</p>

              <div className="flex items-center gap-4 mb-4">
                {article.doi && (
                  <p className="text-sm text-gray-600">
                    <strong>DOI:</strong>{" "}
                    <a
                      href={`https://doi.org/${article.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline"
                    >
                      {article.doi}
                    </a>
                  </p>
                )}

                {article.publication_date && (
                  <p className="text-sm text-gray-600">
                    <strong>Published:</strong>{" "}
                    {new Date(article.publication_date).toLocaleDateString()}
                  </p>
                )}
              </div>

              {article.final_pdf && (
                <a
                  href={article.final_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  📄 Download PDF
                </a>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {searched && !loading && results.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No articles found
            </h3>
            <p className="text-gray-600 mb-6">
              Try different keywords or search terms
            </p>
          </div>
        )}

        {/* Empty State */}
        {!searched && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔎</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              Start searching
            </h3>
            <p className="text-gray-600">
              Enter keywords to find published articles
            </p>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-green-700 hover:underline font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
