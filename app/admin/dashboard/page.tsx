"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";

interface Manuscript {
  id: string;
  title: string;
  authors: string;
  email: string;
  type: string;
  status: string;
  submitted_at: string;
  file_url: string;
}

export default function AdminDashboard() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchManuscripts();
  }, [filter]);

  const fetchManuscripts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("manuscripts")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setManuscripts(data || []);
    } catch (error) {
      console.error("Error fetching manuscripts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: "bg-blue-100 text-blue-800",
      assigned: "bg-purple-100 text-purple-800",
      under_review: "bg-yellow-100 text-yellow-800",
      revisions_requested: "bg-orange-100 text-orange-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      typeset: "bg-indigo-100 text-indigo-800",
      published: "bg-emerald-100 text-emerald-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
            Manuscript Dashboard
          </h1>
          <p className="text-[var(--kiul-text-soft)]">
            Manage all manuscript submissions and reviews
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/analytics"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold
                       hover:from-purple-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span>📊</span> Analytics
          </Link>
          <Link
            href="/admin/reviewers"
            className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition"
          >
            Manage Reviewers
          </Link>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {[
          "all",
          "submitted",
          "assigned",
          "under_review",
          "revisions_requested",
          "accepted",
          "rejected",
          "published",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-[var(--kiul-green)] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-[var(--kiul-green)]">
            {manuscripts.length}
          </div>
          <div className="text-sm text-gray-600">Total Submissions</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {manuscripts.filter((m) => m.status === "under_review").length}
          </div>
          <div className="text-sm text-gray-600">Under Review</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">
            {manuscripts.filter((m) => m.status === "submitted").length}
          </div>
          <div className="text-sm text-gray-600">Pending Assignment</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-green-600">
            {manuscripts.filter((m) => m.status === "accepted").length}
          </div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>
      </div>

      {/* Manuscripts List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-[var(--kiul-text-soft)]">Loading manuscripts...</div>
        </div>
      ) : manuscripts.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-xl">
          <p className="text-[var(--kiul-text-soft)]">
            No manuscripts found for this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {manuscripts.map((manuscript) => (
            <div
              key={manuscript.id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-[var(--kiul-text-dark)] mb-2">
                    {manuscript.title}
                  </h2>
                  <div className="flex gap-4 text-sm text-gray-600 mb-2">
                    <span>📝 {manuscript.authors}</span>
                    <span>📧 {manuscript.email}</span>
                    <span>📁 {manuscript.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        manuscript.status
                      )}`}
                    >
                      {manuscript.status.replace("_", " ").toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      Submitted: {new Date(manuscript.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <a
                  href={manuscript.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border-2 border-[var(--kiul-green)] text-[var(--kiul-green)]
                             rounded-lg font-semibold hover:bg-[var(--kiul-green)] hover:text-white transition"
                >
                  📄 Download Manuscript
                </a>
                <Link
                  href={`/admin/dashboard/review/${manuscript.id}`}
                  className="px-4 py-2 bg-[var(--kiul-green)] text-white rounded-lg font-semibold
                             hover:bg-[var(--kiul-green-dark)] transition"
                >
                  Review Manuscript
                </Link>
                {manuscript.status === "submitted" && (
                  <Link
                    href={`/admin/dashboard/assign/${manuscript.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold
                               hover:bg-purple-700 transition"
                  >
                    Assign Reviewer
                  </Link>
                )}
                {(manuscript.status === "accepted" || manuscript.status === "typeset") && (
                  <Link
                    href={`/admin/typeset/${manuscript.id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold
                               hover:bg-indigo-700 transition"
                  >
                    🚀 Typeset & Publish
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
