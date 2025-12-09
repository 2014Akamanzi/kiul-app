"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";

interface Issue {
  id: string;
  title: string;
  volume: number;
  number: number;
  year: number;
  published_at: string;
}

export default function IssuesManager() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("year", { ascending: false })
        .order("volume", { ascending: false })
        .order("number", { ascending: false });

      if (error) throw error;
      setIssues(data || []);
    } catch (error) {
      console.error("Error loading issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteIssue = async (id: string) => {
    if (!confirm("Delete this issue? All article associations will be removed.")) return;

    try {
      const { error } = await supabase.from("issues").delete().eq("id", id);

      if (error) throw error;

      alert("Issue deleted successfully!");
      loadIssues();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
            Journal Issues
          </h1>
          <p className="text-[var(--kiul-text-soft)]">
            Create and manage journal issues with published articles
          </p>
        </div>
        <Link
          href="/admin/issues/new"
          className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                     hover:bg-[var(--kiul-green-dark)] transition"
        >
          + Create New Issue
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-[var(--kiul-text-soft)]">Loading issues...</div>
        </div>
      ) : issues.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <p className="text-[var(--kiul-text-soft)] mb-4">
            No journal issues yet. Create your first issue!
          </p>
          <Link
            href="/admin/issues/new"
            className="inline-block px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition"
          >
            + Create Issue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-[var(--kiul-text-dark)] mb-2">
                    {issue.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-[var(--kiul-text-soft)]">
                    <span>📖 Volume {issue.volume}, Number {issue.number}</span>
                    <span>📅 {issue.year}</span>
                    <span>
                      Published: {new Date(issue.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 ml-6">
                  <Link
                    href={`/admin/issues/${issue.id}`}
                    className="px-4 py-2 bg-[var(--kiul-green)] text-white rounded-lg font-semibold
                               hover:bg-[var(--kiul-green-dark)] transition"
                  >
                    Manage Articles
                  </Link>
                  <Link
                    href={`/issues/${issue.id}`}
                    target="_blank"
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold
                               hover:bg-blue-600 hover:text-white transition"
                  >
                    View Public
                  </Link>
                  <button
                    onClick={() => deleteIssue(issue.id)}
                    className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg font-semibold
                               hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
