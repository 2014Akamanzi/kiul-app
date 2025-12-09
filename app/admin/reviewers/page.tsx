"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";

interface Reviewer {
  id: string;
  name: string;
  email: string;
  expertise: string;
  affiliation?: string;
  bio?: string;
  created_at: string;
}

export default function ReviewerManager() {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { data } = await supabase
        .from("reviewers")
        .select("*")
        .order("name");

      setReviewers(data || []);
    } catch (error) {
      console.error("Error loading reviewers:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReviewer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reviewer?")) return;

    try {
      const { error } = await supabase.from("reviewers").delete().eq("id", id);

      if (error) throw error;

      alert("Reviewer deleted successfully!");
      load();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
            Reviewer Management
          </h1>
          <p className="text-[var(--kiul-text-soft)]">
            Add and manage peer reviewers for manuscript evaluation
          </p>
        </div>
        <Link
          href="/admin/reviewers/new"
          className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                     hover:bg-[var(--kiul-green-dark)] transition"
        >
          + Add Reviewer
        </Link>
      </div>

      {/* Reviewers List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-[var(--kiul-text-soft)]">Loading reviewers...</div>
        </div>
      ) : reviewers.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <p className="text-[var(--kiul-text-soft)] mb-4">
            No reviewers yet. Add your first reviewer!
          </p>
          <Link
            href="/admin/reviewers/new"
            className="inline-block px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition"
          >
            + Add Reviewer
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer.id}
              className="p-6 border rounded-xl flex justify-between items-center bg-white
                         hover:shadow-md transition"
            >
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[var(--kiul-text-dark)] mb-2">
                  {reviewer.name}
                </h3>
                <div className="space-y-1 text-sm text-[var(--kiul-text-soft)]">
                  <p>📧 {reviewer.email}</p>
                  <p className="italic">🎓 {reviewer.expertise}</p>
                  {reviewer.affiliation && <p>🏛️ {reviewer.affiliation}</p>}
                  {reviewer.bio && (
                    <p className="text-xs pt-2 border-t mt-2">{reviewer.bio}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 ml-6">
                <Link
                  href={`/admin/reviewers/edit/${reviewer.id}`}
                  className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-semibold
                             hover:bg-blue-600 hover:text-white transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteReviewer(reviewer.id)}
                  className="px-4 py-2 text-red-600 border-2 border-red-600 rounded-lg font-semibold
                             hover:bg-red-600 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
