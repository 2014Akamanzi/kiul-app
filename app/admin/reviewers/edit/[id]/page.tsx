"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditReviewer({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    affiliation: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    try {
      const { data, error } = await supabase
        .from("reviewers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setForm({
          name: data.name || "",
          email: data.email || "",
          expertise: data.expertise || "",
          affiliation: data.affiliation || "",
          bio: data.bio || "",
        });
      }
    } catch (error) {
      console.error("Error loading reviewer:", error);
      alert("Failed to load reviewer data");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.email || !form.expertise) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("reviewers")
        .update({
          name: form.name,
          email: form.email,
          expertise: form.expertise,
          affiliation: form.affiliation || null,
          bio: form.bio || null,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Reviewer updated successfully!");
      router.push("/admin/reviewers");
    } catch (error: any) {
      console.error("Error updating reviewer:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="text-[var(--kiul-text-soft)]">Loading reviewer data...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/reviewers"
          className="text-[var(--kiul-green)] hover:underline mb-4 inline-block"
        >
          ← Back to Reviewers
        </Link>
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
          Edit Reviewer
        </h1>
        <p className="text-[var(--kiul-text-soft)]">
          Update reviewer information
        </p>
      </div>

      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Dr. Jane Smith"
              value={form.name}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="jane.smith@university.edu"
              value={form.email}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Areas of Expertise *
            </label>
            <textarea
              placeholder="e.g., African Philosophy, Leadership Studies, Ubuntu Ethics"
              value={form.expertise}
              rows={3}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
              onChange={(e) => setForm({ ...form, expertise: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple areas with commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Affiliation
            </label>
            <input
              type="text"
              placeholder="University of Nairobi"
              value={form.affiliation}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
              onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Professional Bio
            </label>
            <textarea
              placeholder="Brief professional background and credentials..."
              value={form.bio}
              rows={4}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={save}
              disabled={submitting}
              className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                         hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/admin/reviewers"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold
                         hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
