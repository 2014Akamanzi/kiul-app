"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewIssue() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    volume: "",
    number: "",
    year: "",
  });
  const [creating, setCreating] = useState(false);

  const create = async () => {
    if (!form.title || !form.volume || !form.number || !form.year) {
      alert("Please fill in all fields");
      return;
    }

    setCreating(true);

    try {
      const { error } = await supabase.from("issues").insert({
        title: form.title,
        volume: Number(form.volume),
        number: Number(form.number),
        year: Number(form.year),
      });

      if (error) throw error;

      alert("Issue created successfully!");
      router.push("/admin/issues");
    } catch (error: any) {
      console.error("Error creating issue:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/issues"
          className="text-[var(--kiul-green)] hover:underline mb-4 inline-block"
        >
          ← Back to Issues
        </Link>
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
          Create New Journal Issue
        </h1>
        <p className="text-[var(--kiul-text-soft)]">
          Define the volume, number, and year for this journal issue
        </p>
      </div>

      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Issue Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Contemporary Journal for Development of Justice"
              value={form.title}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
                Volume *
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                value={form.volume}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
                onChange={(e) => setForm({ ...form, volume: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
                Number *
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                value={form.number}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
                onChange={(e) => setForm({ ...form, number: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
                Year *
              </label>
              <input
                type="number"
                min="2000"
                max="2100"
                placeholder="2025"
                value={form.year}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Preview:</strong> {form.title || "Issue Title"} — Volume{" "}
              {form.volume || "X"}, Number {form.number || "Y"} ({form.year || "YYYY"})
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={create}
              disabled={creating}
              className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                         hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create Issue"}
            </button>
            <Link
              href="/admin/issues"
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
