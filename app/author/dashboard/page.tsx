"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

interface Manuscript {
  id: string;
  title: string;
  authors: string;
  status: string;
  submitted_at: string;
  final_pdf?: string;
  doi?: string;
  publication_date?: string;
}

export default function AuthorDashboard() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadManuscripts();
  }, []);

  const loadManuscripts = async () => {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      // Fetch user's manuscripts
      const { data, error } = await supabase
        .from("manuscripts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading manuscripts:", error);
      } else {
        setManuscripts(data || []);
      }
    } catch (err) {
      console.error("Failed to load manuscripts:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800" },
      under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
      revision_requested: {
        label: "Revision Requested",
        color: "bg-orange-100 text-orange-800",
      },
      accepted: { label: "Accepted", color: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
      published: { label: "Published", color: "bg-purple-100 text-purple-800" },
    };

    const badge = badges[status] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.color}`}
      >
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <main className="max-w-[900px] mx-auto px-6 py-12">
        <div className="text-center py-16">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading your submissions...</p>
        </div>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="max-w-[900px] mx-auto px-6 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Please Sign In
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your submissions
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800"
          >
            Go to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📝 My Submissions
          </h1>
          <p className="text-gray-600 text-lg">
            Track your manuscript submissions and their status
          </p>
        </div>

        {/* Manuscripts List */}
        <div className="space-y-6">
          {manuscripts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                No submissions yet
              </h3>
              <p className="text-gray-600 mb-6">
                Submit your first manuscript to get started
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800"
              >
                Submit Manuscript
              </Link>
            </div>
          ) : (
            manuscripts.map((manuscript) => (
              <div
                key={manuscript.id}
                className="p-6 border-2 border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 flex-1">
                    {manuscript.title}
                  </h2>
                  {getStatusBadge(manuscript.status)}
                </div>

                <p className="text-gray-700 mb-4">
                  <strong>Authors:</strong> {manuscript.authors}
                </p>

                <p className="text-sm text-gray-600 mb-4">
                  <strong>Submitted:</strong>{" "}
                  {new Date(manuscript.submitted_at).toLocaleDateString()}
                </p>

                {/* Status-specific messages */}
                {manuscript.status === "under_review" && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-sm text-yellow-800">
                      ⏳ Your manuscript is currently under peer review. You will be
                      notified once the review is complete.
                    </p>
                  </div>
                )}

                {manuscript.status === "revision_requested" && (
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                    <p className="text-sm text-orange-800 mb-2">
                      ✏️ Revisions have been requested. Please submit a revised
                      version.
                    </p>
                    <Link
                      href={`/author/revise/${manuscript.id}`}
                      className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 text-sm"
                    >
                      Submit Revised Manuscript
                    </Link>
                  </div>
                )}

                {manuscript.status === "accepted" && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <p className="text-sm text-green-800">
                      ✅ Congratulations! Your manuscript has been accepted and is
                      being prepared for publication.
                    </p>
                  </div>
                )}

                {manuscript.status === "published" && (
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
                    <p className="text-sm text-purple-800 mb-3">
                      🎉 Your article has been published!
                    </p>
                    <div className="space-y-2">
                      {manuscript.doi && (
                        <p className="text-sm text-gray-700">
                          <strong>DOI:</strong>{" "}
                          <a
                            href={`https://doi.org/${manuscript.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-700 hover:underline"
                          >
                            {manuscript.doi}
                          </a>
                        </p>
                      )}
                      {manuscript.publication_date && (
                        <p className="text-sm text-gray-700">
                          <strong>Published:</strong>{" "}
                          {new Date(manuscript.publication_date).toLocaleDateString()}
                        </p>
                      )}
                      {manuscript.final_pdf && (
                        <a
                          href={manuscript.final_pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 text-sm"
                        >
                          📄 View Published Article
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {manuscript.status === "rejected" && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <p className="text-sm text-red-800">
                      ❌ Unfortunately, your manuscript was not accepted for
                      publication at this time.
                    </p>
                  </div>
                )}

                {manuscript.status === "submitted" && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      📬 Your manuscript has been received and is awaiting initial
                      review.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Navigation Links */}
        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-gray-300"
          >
            ← Back to Home
          </Link>
          {manuscripts.length > 0 && (
            <Link
              href="/journal/search"
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800"
            >
              🔍 Search Published Articles
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
