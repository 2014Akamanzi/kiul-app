"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Manuscript {
  id: string;
  title: string;
  authors: string;
  email: string;
  abstract: string;
  status: string;
  file_url: string;
  final_pdf?: string;
  doi?: string;
  publication_date?: string;
  is_doi_registered?: boolean;
  doi_registered_at?: string;
}

export default function TypesetPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [doi, setDoi] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [generatingCover, setGeneratingCover] = useState(false);
  const [registeringDOI, setRegisteringDOI] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    try {
      const { data, error } = await supabase
        .from("manuscripts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setManuscript(data);
      
      // Pre-populate DOI if already exists
      if (data.doi) {
        setDoi(data.doi);
      }
    } catch (error) {
      console.error("Error loading manuscript:", error);
      alert("Failed to load manuscript");
    } finally {
      setLoading(false);
    }
  };

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF file first");
      return;
    }

    if (!doi.trim()) {
      alert("Please enter a DOI");
      return;
    }

    if (!confirm("This will publish the manuscript and make it publicly available. Continue?")) {
      return;
    }

    setPublishing(true);

    try {
      // Upload final PDF to storage
      const filePath = `final/${id}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("manuscripts")
        .upload(filePath, file, {
          upsert: true,
          contentType: "application/pdf",
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("manuscripts")
        .getPublicUrl(filePath);

      // Update manuscript with final PDF, DOI, and publish
      const { error: updateError } = await supabase
        .from("manuscripts")
        .update({
          final_pdf: urlData.publicUrl,
          doi: doi.trim(),
          status: "published",
          publication_date: new Date().toISOString().split("T")[0],
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Send email notification to author
      if (manuscript?.email) {
        await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: manuscript.email,
            subject: "Your Manuscript Has Been Published - KIUL",
            text: `Dear Author,\n\nCongratulations! Your manuscript "${manuscript.title}" has been published.\n\nDOI: ${doi}\n\nYour article is now available to the public and can be cited using the DOI above.\n\nThank you for publishing with KIUL.\n\nBest regards,\nKIUL Editorial Team`,
          }),
        }).catch((err) => console.error("Email error:", err));
      }

      alert("Article published successfully!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Error publishing manuscript:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setPublishing(false);
    }
  };

  const generateCoverPage = async () => {
    if (!manuscript || !doi.trim()) {
      alert("Please enter a DOI first");
      return;
    }

    setGeneratingCover(true);

    try {
      const response = await fetch("/api/generate-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: manuscript.title,
          authors: manuscript.authors,
          doi: doi.trim(),
          abstract: manuscript.abstract,
          publishedDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate cover page");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cover-page-${doi.replace(/\//g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert("Cover page generated successfully!");
    } catch (error) {
      console.error("Error generating cover page:", error);
      alert("Failed to generate cover page");
    } finally {
      setGeneratingCover(false);
    }
  };

  const registerDOI = async () => {
    if (!manuscript || !manuscript.doi) {
      alert("Please ensure a DOI is assigned first");
      return;
    }

    if (!manuscript.final_pdf) {
      alert("Please publish the manuscript with a final PDF first");
      return;
    }

    if (manuscript.is_doi_registered) {
      alert("DOI is already registered with CrossRef");
      return;
    }

    if (!confirm(`Register DOI ${manuscript.doi} with CrossRef?\n\nThis will make the DOI permanently resolvable and index your article in CrossRef databases.`)) {
      return;
    }

    setRegisteringDOI(true);

    try {
      // Parse authors from the authors string
      const authorNames = manuscript.authors.split(",").map((name) => name.trim());
      const crossrefAuthors = authorNames.map((fullName) => {
        const parts = fullName.split(" ");
        const surname = parts.pop() || "";
        const given_name = parts.join(" ");
        return { given_name, surname };
      });

      const response = await fetch("/api/register-doi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manuscriptId: manuscript.id,
          doi: manuscript.doi,
          title: manuscript.title,
          authors: crossrefAuthors,
          abstract: manuscript.abstract,
          publicationDate: manuscript.publication_date || new Date().toISOString().split("T")[0],
          pdfUrl: manuscript.final_pdf,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.registered) {
        throw new Error(result.error || result.message || "DOI registration failed");
      }

      alert(`DOI successfully registered with CrossRef!\n\nDOI: ${manuscript.doi}\n\nThe author has been notified via email.`);
      
      // Reload manuscript data
      await load();
    } catch (error: any) {
      console.error("Error registering DOI:", error);
      alert(`Failed to register DOI:\n${error.message}`);
    } finally {
      setRegisteringDOI(false);
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
        <Link
          href="/admin/dashboard"
          className="text-[var(--kiul-green)] hover:underline mt-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="text-[var(--kiul-green)] hover:underline mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
          Typesetting & Publication
        </h1>
        <p className="text-[var(--kiul-text-soft)]">
          Upload final PDF and assign DOI to publish manuscript
        </p>
      </div>

      {/* Manuscript Info */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-4">
          {manuscript.title}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold">Authors:</span> {manuscript.authors}
          </div>
          <div>
            <span className="font-semibold">Current Status:</span>{" "}
            <span className="px-2 py-1 bg-gray-100 rounded">
              {manuscript.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Abstract:</h3>
          <p className="text-[var(--kiul-text-soft)] text-sm leading-relaxed">
            {manuscript.abstract}
          </p>
        </div>

        <a
          href={manuscript.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 border-2 border-[var(--kiul-green)] text-[var(--kiul-green)]
                     rounded-lg font-semibold hover:bg-[var(--kiul-green)] hover:text-white transition"
        >
          📄 View Original Submission
        </a>
      </div>

      {/* Publication Form */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Publication Details</h3>

        <div className="space-y-6">
          {/* DOI Input */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Digital Object Identifier (DOI) *
            </label>
            <input
              type="text"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              placeholder="10.1234/kiul.2025.001"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: 10.xxxx/prefix.year.number (e.g., 10.1234/kiul.2025.001)
            </p>
          </div>

          {/* Current Final PDF Status */}
          {manuscript.final_pdf && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-800 mb-2">
                ✓ Final PDF Already Published
              </p>
              <a
                href={manuscript.final_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Current Published PDF
              </a>
              {manuscript.doi && (
                <p className="text-sm text-blue-700 mt-2">
                  Current DOI: {manuscript.doi}
                </p>
              )}
              <p className="text-xs text-gray-600 mt-2">
                Upload a new file below to replace the current version
              </p>
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-[var(--kiul-text-dark)]">
              Upload Final PDF *
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[var(--kiul-green)]"
            />
            {file && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Upload the final, typeset PDF ready for publication
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800 mb-1">
              ⚠️ Publication Notice
            </p>
            <p className="text-xs text-yellow-700">
              Once published, the manuscript status will change to "published" and the article
              will be publicly accessible. You will be able to update the PDF later if needed.
            </p>
          </div>

          {/* Generate Cover Page Button */}
          <button
            onClick={generateCoverPage}
            disabled={generatingCover || !doi.trim()}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold
                       hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingCover ? "Generating..." : "📄 Generate KIUL Cover Page"}
          </button>

          {/* Publish Button */}
          <button
            onClick={uploadPDF}
            disabled={publishing}
            className="w-full px-6 py-4 bg-[var(--kiul-green)] text-white rounded-xl font-bold text-lg
                       hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? "Publishing..." : "🚀 Publish Article"}
          </button>

          {/* DOI Registration Section */}
          {manuscript.status === "published" && manuscript.doi && manuscript.final_pdf && (
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[var(--kiul-text-dark)]">
                CrossRef DOI Registration
              </h3>

              {manuscript.is_doi_registered ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">✅</span>
                    <div>
                      <p className="font-semibold text-green-800 mb-2">
                        DOI Successfully Registered with CrossRef
                      </p>
                      <p className="text-sm text-green-700 mb-2">
                        <strong>DOI:</strong>{" "}
                        <a
                          href={`https://doi.org/${manuscript.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-green-900"
                        >
                          {manuscript.doi}
                        </a>
                      </p>
                      {manuscript.doi_registered_at && (
                        <p className="text-xs text-green-600">
                          Registered on:{" "}
                          {new Date(manuscript.doi_registered_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>📌 CrossRef DOI Registration</strong>
                    </p>
                    <p className="text-xs text-blue-700">
                      Register this DOI with CrossRef to make it permanently resolvable and index
                      your article in academic databases worldwide. The author will receive a
                      confirmation email with citation details.
                    </p>
                  </div>

                  <button
                    onClick={registerDOI}
                    disabled={registeringDOI}
                    className="w-full px-6 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg
                               hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registeringDOI ? "Registering with CrossRef..." : "🌐 Register DOI with CrossRef"}
                  </button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Requires CrossRef member credentials configured in environment variables
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
