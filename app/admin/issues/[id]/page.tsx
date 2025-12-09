"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Issue {
  id: string;
  title: string;
  volume: number;
  number: number;
  year: number;
}

interface Manuscript {
  id: string;
  title: string;
  authors: string;
  doi?: string;
}

interface IssueArticle {
  id: string;
  position: number;
  manuscript_id: string;
  manuscripts: Manuscript;
}

export default function IssueEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [issue, setIssue] = useState<Issue | null>(null);
  const [publishedArticles, setPublishedArticles] = useState<Manuscript[]>([]);
  const [existing, setExisting] = useState<IssueArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    try {
      // Load issue details
      const { data: issueData, error: issueError } = await supabase
        .from("issues")
        .select("*")
        .eq("id", id)
        .single();

      if (issueError) throw issueError;
      setIssue(issueData);

      // Load all published manuscripts
      const { data: manuscriptsData, error: manuscriptsError } = await supabase
        .from("manuscripts")
        .select("id, title, authors, doi")
        .eq("status", "published")
        .order("title");

      if (manuscriptsError) throw manuscriptsError;
      setPublishedArticles(manuscriptsData || []);

      // Load articles already in this issue
      const { data: articlesData, error: articlesError } = await supabase
        .from("issue_articles")
        .select("id, position, manuscript_id, manuscripts!inner(id, title, authors, doi)")
        .eq("issue_id", id)
        .order("position");

      if (articlesError) throw articlesError;
      
      // Transform the data to match the expected structure
      const transformedArticles = (articlesData || []).map((item: any) => ({
        id: item.id,
        position: item.position,
        manuscript_id: item.manuscript_id,
        manuscripts: Array.isArray(item.manuscripts) ? item.manuscripts[0] : item.manuscripts
      }));
      
      setExisting(transformedArticles);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load issue data");
    } finally {
      setLoading(false);
    }
  };

  const addArticle = async (manuscriptId: string) => {
    // Check if already added
    if (existing.some((art) => art.manuscripts.id === manuscriptId)) {
      alert("This article is already in the issue");
      return;
    }

    try {
      const { error } = await supabase.from("issue_articles").insert({
        issue_id: id,
        manuscript_id: manuscriptId,
        position: existing.length + 1,
      });

      if (error) throw error;

      alert("Article added to issue!");
      load();
    } catch (error: any) {
      console.error("Error adding article:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const removeArticle = async (articleId: string) => {
    if (!confirm("Remove this article from the issue?")) return;

    try {
      const { error } = await supabase
        .from("issue_articles")
        .delete()
        .eq("id", articleId);

      if (error) throw error;

      alert("Article removed from issue!");
      load();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const moveArticle = async (articleId: string, direction: "up" | "down") => {
    const index = existing.findIndex((art) => art.id === articleId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === existing.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const newOrder = [...existing];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];

    try {
      // Update positions in database
      for (let i = 0; i < newOrder.length; i++) {
        await supabase
          .from("issue_articles")
          .update({ position: i + 1 })
          .eq("id", newOrder[i].id);
      }

      load();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="text-[var(--kiul-text-soft)]">Loading issue...</div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-red-600">Issue not found</p>
        <Link
          href="/admin/issues"
          className="text-[var(--kiul-green)] hover:underline mt-4 inline-block"
        >
          ← Back to Issues
        </Link>
      </div>
    );
  }

  // Filter out articles already in the issue
  const availableArticles = publishedArticles.filter(
    (manuscript) => !existing.some((art) => art.manuscripts.id === manuscript.id)
  );

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/issues"
          className="text-[var(--kiul-green)] hover:underline mb-4 inline-block"
        >
          ← Back to Issues
        </Link>
        <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-2">
          {issue.title}
        </h1>
        <p className="text-[var(--kiul-text-soft)]">
          Volume {issue.volume}, Number {issue.number} ({issue.year})
        </p>
      </div>

      {/* Articles Already in Issue */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--kiul-text-dark)]">
            Articles in This Issue ({existing.length})
          </h2>
          <Link
            href={`/issues/${id}`}
            target="_blank"
            className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold
                       hover:bg-blue-600 hover:text-white transition"
          >
            👁️ Preview Public View
          </Link>
        </div>

        {existing.length === 0 ? (
          <p className="text-[var(--kiul-text-soft)] text-center py-8">
            No articles added yet. Add articles from the list below.
          </p>
        ) : (
          <div className="space-y-3">
            {existing.map((article, index) => (
              <div
                key={article.id}
                className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[var(--kiul-green)] text-white rounded-full text-xs font-bold">
                      #{article.position}
                    </span>
                    <h3 className="font-semibold text-[var(--kiul-text-dark)]">
                      {article.manuscripts.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--kiul-text-soft)]">
                    {article.manuscripts.authors}
                  </p>
                  {article.manuscripts.doi && (
                    <p className="text-xs text-gray-500 mt-1">
                      DOI: {article.manuscripts.doi}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => moveArticle(article.id, "up")}
                    disabled={index === 0}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100
                               disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveArticle(article.id, "down")}
                    disabled={index === existing.length - 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100
                               disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Published Articles */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-[var(--kiul-text-dark)] mb-4">
          Add Published Articles ({availableArticles.length} available)
        </h2>

        {availableArticles.length === 0 ? (
          <p className="text-[var(--kiul-text-soft)] text-center py-8">
            {publishedArticles.length === 0
              ? "No published articles available. Publish manuscripts first."
              : "All published articles have been added to this issue."}
          </p>
        ) : (
          <div className="space-y-3">
            {availableArticles.map((manuscript) => (
              <div
                key={manuscript.id}
                className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-[var(--kiul-text-dark)]">
                    {manuscript.title}
                  </p>
                  <p className="text-sm text-[var(--kiul-text-soft)]">
                    {manuscript.authors}
                  </p>
                  {manuscript.doi && (
                    <p className="text-xs text-gray-500 mt-1">DOI: {manuscript.doi}</p>
                  )}
                </div>
                <button
                  onClick={() => addArticle(manuscript.id)}
                  className="ml-4 px-5 py-2 bg-[var(--kiul-green)] text-white rounded-lg font-semibold
                             hover:bg-[var(--kiul-green-dark)] transition"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
