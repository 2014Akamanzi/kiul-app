"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function AdminPublishing() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const upload = async () => {
    if (!file || !title || !year || !category) {
      alert("Please fill all fields and select a file");
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from("publications")
        .upload(`${category}/${fileName}`, file);

      if (fileError) {
        throw fileError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("publications")
        .getPublicUrl(`${category}/${fileName}`);

      // Insert metadata into database
      const { error: dbError } = await supabase.from("publications").insert({
        title,
        authors,
        year: parseInt(year),
        category,
        file_url: urlData.publicUrl,
        file_path: fileData.path,
      });

      if (dbError) {
        throw dbError;
      }

      alert("Publication uploaded successfully!");
      
      // Reset form
      setTitle("");
      setAuthors("");
      setYear("");
      setCategory("");
      setFile(null);
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
        Admin: Upload Publication
      </h1>

      <p className="text-[17px] text-[var(--kiul-text-soft)] mb-10">
        Upload books, articles, working papers, and other publications to the KIUL database.
      </p>

      <div className="max-w-[800px] mx-auto bg-white border rounded-xl p-8 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Title *</label>
            <input
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="Publication title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Authors</label>
            <input
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="Author names (comma separated)"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Year *</label>
            <input
              type="number"
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="Publication year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category *</label>
            <select
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="books">Books</option>
              <option value="spiritual">Spiritual Books</option>
              <option value="cjdj">CJDJ Journal</option>
              <option value="working-papers">Working Papers</option>
              <option value="proceedings">Conference Proceedings</option>
              <option value="blogs">Blogs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">PDF File *</label>
            <input
              type="file"
              accept=".pdf"
              className="w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && (
              <p className="text-sm text-[var(--kiul-text-soft)] mt-2">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <button
            onClick={upload}
            disabled={uploading}
            className="w-full px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Publication"}
          </button>
        </div>
      </div>
    </div>
  );
}
