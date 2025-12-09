"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function SubmitManuscript() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    if (!file || !title || !abstract || !type || !email) {
      alert("Please fill all required fields and select a file");
      return;
    }

    setSubmitting(true);

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: stored, error: uploadError } = await supabase.storage
        .from("manuscripts")
        .upload(`${type}/${fileName}`, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("manuscripts")
        .getPublicUrl(`${type}/${fileName}`);

      // Insert metadata into database
      const { error: dbError } = await supabase.from("manuscripts").insert({
        title,
        authors,
        abstract,
        type,
        email,
        file_url: urlData.publicUrl,
        file_path: stored.path,
        status: "submitted",
      });

      if (dbError) {
        throw dbError;
      }

      // Send confirmation email
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Manuscript Submission Received - KIUL",
          text: `Dear Author,\n\nThank you for submitting your manuscript to KIUL Publishing.\n\nTitle: ${title}\nType: ${type}\n\nYour submission has been received and will be reviewed by our editorial team. We will contact you within 2-4 weeks with next steps.\n\nBest regards,\nKIUL Editorial Team\nKatoki Institute for Ubuntu Leadership`,
        }),
      }).catch((err) => console.error("Email error:", err));

      setSuccess(true);
      
      // Reset form
      setTitle("");
      setAuthors("");
      setAbstract("");
      setType("");
      setEmail("");
      setFile(null);

      setTimeout(() => setSuccess(false), 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
        Submit Manuscript
      </h1>

      <p className="text-[17px] text-[var(--kiul-text-soft)] mb-10 max-w-2xl">
        Submit your manuscript for publication consideration. Our editorial team will review
        your submission and contact you within 2-4 weeks.
      </p>

      {success && (
        <div className="max-w-[800px] mx-auto mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-800 font-semibold">
            ✓ Manuscript submitted successfully! You will receive a confirmation email shortly.
          </p>
        </div>
      )}

      <div className="max-w-[800px] mx-auto bg-white border rounded-xl p-8 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Manuscript Title *</label>
            <input
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="Full title of your manuscript"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Author(s) *</label>
            <input
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="All author names (comma separated)"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Contact Email *</label>
            <input
              type="email"
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Abstract *</label>
            <textarea
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="Provide a brief abstract (200-300 words)"
              rows={6}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              {abstract.split(/\s+/).filter(Boolean).length} words
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Submission Type *</label>
            <select
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select submission type</option>
              <option value="cjdj">CJDJ Journal Article</option>
              <option value="books">Book Proposal</option>
              <option value="working-papers">Working Paper</option>
              <option value="proceedings">Conference Proceedings</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Manuscript File (PDF) *</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && (
              <p className="text-sm text-[var(--kiul-text-soft)] mt-2">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                         hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Manuscript"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting, you agree to KIUL's publication guidelines and copyright policies.
            </p>
          </div>
        </div>
      </div>

      {/* Submission Guidelines */}
      <div className="max-w-[800px] mx-auto mt-8 p-6 bg-gray-50 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Submission Guidelines</h2>
        <ul className="space-y-2 text-sm text-[var(--kiul-text-soft)]">
          <li>• Manuscripts should be original work not published elsewhere</li>
          <li>• Format: PDF, Word (.doc/.docx) — maximum 10MB</li>
          <li>• Include abstract (200-300 words) and keywords</li>
          <li>• Follow KIUL citation style (available in guidelines section)</li>
          <li>• Review process takes 2-4 weeks</li>
          <li>• Authors retain copyright under Creative Commons license</li>
        </ul>
        <a
          href="/publishing/guidelines"
          className="inline-block mt-4 text-[var(--kiul-green)] hover:underline font-semibold"
        >
          View Full Guidelines →
        </a>
      </div>
    </div>
  );
}
