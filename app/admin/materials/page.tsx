"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_path: string;
  file_type: string;
  uploaded_by: string;
  created_at: string;
}

export default function AdminMaterials() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  const [materials, setMaterials] = useState<Material[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("course");
  const [uploading, setUploading] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/auth/login");
    }
  }, [user, isAdmin, loading, router]);

  // Load existing materials
  useEffect(() => {
    if (user && isAdmin) {
      loadMaterials();
    }
  }, [user, isAdmin]);

  const loadMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from("learning_materials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error: any) {
      console.error("Error loading materials:", error);
    } finally {
      setLoadingMaterials(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !category) {
      alert("Please fill all required fields and select a file");
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from("learning-materials")
        .upload(`${category}/${fileName}`, file);

      if (fileError) throw fileError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("learning-materials")
        .getPublicUrl(`${category}/${fileName}`);

      // Insert metadata into database
      const { error: dbError } = await supabase.from("learning_materials").insert({
        title,
        description,
        category,
        file_url: urlData.publicUrl,
        file_path: fileData.path,
        file_type: file.type,
        uploaded_by: user?.email || "admin",
      });

      if (dbError) throw dbError;

      alert("Material uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("course");
      setFile(null);
      
      // Reload materials
      loadMaterials();
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (material: Material) => {
    if (!confirm(`Are you sure you want to delete "${material.title}"?`)) {
      return;
    }

    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from("learning-materials")
        .remove([material.file_path]);

      if (storageError) throw storageError;

      // Delete record from database
      const { error: dbError } = await supabase
        .from("learning_materials")
        .delete()
        .eq("id", material.id);

      if (dbError) throw dbError;

      alert("Material deleted successfully!");
      loadMaterials();
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(`Delete failed: ${error.message}`);
    }
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
          Learning Materials Management
        </h1>
        <p className="text-[17px] text-[var(--kiul-text-soft)]">
          Upload and manage educational resources, course materials, guides, and documents for KIUL learners.
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-[var(--kiul-text-dark)] mb-4">
          Upload New Material
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500"
              placeholder="Material title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="course">Course Material</option>
              <option value="guide">Study Guide</option>
              <option value="reference">Reference Document</option>
              <option value="worksheet">Worksheet</option>
              <option value="video">Video Resource</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500"
            placeholder="Brief description of the material"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.mp4,.mp3,.zip"
          />
          {file && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !file || !title}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold
                     hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Upload Material"}
        </button>
      </div>

      {/* Materials List */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[var(--kiul-text-dark)] mb-4">
          Existing Materials ({materials.length})
        </h2>

        {loadingMaterials ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600">Loading materials...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>No materials uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {materials.map((material) => (
              <div
                key={material.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{material.title}</h3>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                        {material.category}
                      </span>
                    </div>
                    {material.description && (
                      <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Uploaded by: {material.uploaded_by}</span>
                      <span>•</span>
                      <span>{new Date(material.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{material.file_type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={material.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold
                                 hover:bg-blue-700 transition"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(material)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold
                                 hover:bg-red-700 transition"
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
    </div>
  );
}
