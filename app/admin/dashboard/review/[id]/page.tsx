"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Manuscript {
  id: string;
  title: string;
  authors: string;
  email: string;
  abstract: string;
  type: string;
  status: string;
  file_url: string;
  submitted_at: string;
}

interface Review {
  id: string;
  decision: string;
  comments: string;
  created_at: string;
  reviewer_id: string;
}

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [decision, setDecision] = useState("");
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      // Load manuscript
      const { data: manuscriptData, error: manuscriptError } = await supabase
        .from("manuscripts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (manuscriptError) throw manuscriptError;
      setManuscript(manuscriptData);

      // Load existing reviews
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*")
        .eq("manuscript_id", params.id)
        .order("created_at", { ascending: false });

      setReviews(reviewsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitDecision = async () => {
    if (!decision || !comments.trim()) {
      alert("Please select a decision and provide comments");
      return;
    }

    setSubmitting(true);

    try {
      // Insert review
      const { error: reviewError } = await supabase.from("reviews").insert({
        manuscript_id: params.id,
        decision,
        comments,
        anonymous: true,
      });

      if (reviewError) throw reviewError;

      // Update manuscript status
      const { error: updateError } = await supabase
        .from("manuscripts")
        .update({ status: decision, updated_at: new Date().toISOString() })
        .eq("id", params.id);

      if (updateError) throw updateError;

      // Send email notification with proper templates
      if (manuscript?.email) {
        const authorName = manuscript.authors.split(",")[0].trim();
        let emailTemplate;

        // Import email templates dynamically
        const { acceptanceEmail, revisionEmail, rejectionEmail } = await import("@/app/lib/emailTemplates");

        if (decision === "accepted") {
          emailTemplate = acceptanceEmail(authorName, manuscript.title, manuscript.id);
        } else if (decision === "revision_requested") {
          emailTemplate = revisionEmail(authorName, manuscript.title, comments, manuscript.id);
        } else if (decision === "rejected") {
          emailTemplate = rejectionEmail(authorName, manuscript.title, comments);
        }

        if (emailTemplate) {
          await fetch("/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: manuscript.email,
              subject: emailTemplate.subject,
              html: emailTemplate.html,
              text: emailTemplate.text,
            }),
          }).catch((err) => console.error("Email error:", err));
        }
      }

      alert("Review submitted successfully!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Error submitting review:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="text-[var(--kiul-text-soft)]">Loading manuscript...</div>
      </div>
    );
  }

  if (!manuscript) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-red-600">Manuscript not found</p>
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
          Review Manuscript
        </h1>
        <p className="text-[var(--kiul-text-soft)]">
          Provide your decision and feedback for this submission
        </p>
      </div>

      {/* Manuscript Details */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-4">
          {manuscript.title}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold">Authors:</span> {manuscript.authors}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {manuscript.type}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span className="px-2 py-1 bg-gray-100 rounded">
              {manuscript.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <div>
            <span className="font-semibold">Submitted:</span>{" "}
            {new Date(manuscript.submitted_at).toLocaleDateString()}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Abstract:</h3>
          <p className="text-[var(--kiul-text-soft)] leading-relaxed">
            {manuscript.abstract}
          </p>
        </div>

        <a
          href={manuscript.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                     hover:bg-[var(--kiul-green-dark)] transition"
        >
          📄 Download Full Manuscript
        </a>
      </div>

      {/* Previous Reviews */}
      {reviews.length > 0 && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Previous Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-l-4 border-[var(--kiul-green)] pl-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">
                    {review.decision.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-[var(--kiul-text-soft)]">{review.comments}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Form */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Submit Your Review</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Decision *
            </label>
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
            >
              <option value="">Select decision...</option>
              <option value="under_review">Under Review</option>
              <option value="revisions_requested">Request Revisions</option>
              <option value="accepted">Accept for Publication</option>
              <option value="rejected">Reject</option>
              <option value="typeset">Move to Typesetting</option>
              <option value="published">Publish</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Comments & Feedback *
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={8}
              placeholder="Provide detailed feedback for the author..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
            />
            <p className="text-xs text-gray-500 mt-1">
              These comments will be sent to the author anonymously
            </p>
          </div>

          <button
            onClick={submitDecision}
            disabled={submitting}
            className="w-full px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
