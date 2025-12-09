"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Reviewer {
  id: string;
  name: string;
  email: string;
  expertise: string;
  affiliation?: string;
}

interface Manuscript {
  id: string;
  title: string;
  type: string;
}

export default function AssignReviewer({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      // Load manuscript
      const { data: manuscriptData } = await supabase
        .from("manuscripts")
        .select("id, title, type")
        .eq("id", params.id)
        .single();

      setManuscript(manuscriptData);

      // Load reviewers
      const { data: reviewersData } = await supabase
        .from("reviewers")
        .select("*")
        .order("name");

      setReviewers(reviewersData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const assignReviewer = async (reviewerId: string) => {
    if (!confirm("Assign this reviewer to the manuscript?")) return;

    setAssigning(true);

    try {
      // Create review assignment
      const { error: assignError } = await supabase
        .from("review_assignments")
        .insert({
          manuscript_id: params.id,
          reviewer_id: reviewerId,
          completed: false,
        });

      if (assignError) throw assignError;

      // Update manuscript status
      const { error: updateError } = await supabase
        .from("manuscripts")
        .update({ status: "assigned", updated_at: new Date().toISOString() })
        .eq("id", params.id);

      if (updateError) throw updateError;

      // Get reviewer email for notification
      const reviewer = reviewers.find((r) => r.id === reviewerId);
      if (reviewer?.email) {
        await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: reviewer.email,
            subject: "New Manuscript Review Assignment - KIUL",
            text: `Dear ${reviewer.name},\n\nYou have been assigned to review a new manuscript:\n\nTitle: ${manuscript?.title}\nType: ${manuscript?.type}\n\nPlease log in to the KIUL admin dashboard to access the manuscript and submit your review.\n\nBest regards,\nKIUL Editorial Team`,
          }),
        }).catch((err) => console.error("Email error:", err));
      }

      alert("Reviewer assigned successfully!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Error assigning reviewer:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="text-[var(--kiul-text-soft)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-[var(--kiul-green)] hover:underline mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
          Assign Reviewer
        </h1>
        {manuscript && (
          <p className="text-[var(--kiul-text-soft)]">
            Manuscript: <strong>{manuscript.title}</strong>
          </p>
        )}
      </div>

      {reviewers.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <p className="text-[var(--kiul-text-soft)] mb-4">
            No reviewers found. Please add reviewers first.
          </p>
          <button
            onClick={() => router.push("/admin/reviewers")}
            className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition"
          >
            Manage Reviewers
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer.id}
              className="bg-white border rounded-xl p-6 flex justify-between items-start
                         hover:shadow-md transition"
            >
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[var(--kiul-text-dark)] mb-2">
                  {reviewer.name}
                </h3>
                <div className="space-y-1 text-sm text-[var(--kiul-text-soft)]">
                  <p>📧 {reviewer.email}</p>
                  <p>🎓 {reviewer.expertise}</p>
                  {reviewer.affiliation && <p>🏛️ {reviewer.affiliation}</p>}
                </div>
              </div>
              <button
                onClick={() => assignReviewer(reviewer.id)}
                disabled={assigning}
                className="ml-4 px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                           hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
              >
                {assigning ? "Assigning..." : "Assign"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
