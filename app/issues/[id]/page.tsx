import { supabase } from "@/app/lib/supabaseClient";
import Link from "next/link";

interface Issue {
  id: string;
  title: string;
  volume: number;
  number: number;
  year: number;
  published_at: string;
}

interface IssueArticle {
  position: number;
  manuscripts: {
    id: string;
    title: string;
    authors: string;
    abstract: string;
    final_pdf: string;
    doi?: string;
  };
}

export default async function IssuePage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch issue details
  const { data: issue, error: issueError } = await supabase
    .from("issues")
    .select("*")
    .eq("id", id)
    .single();

  if (issueError || !issue) {
    return (
      <div className="w-full max-w-[900px] mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Issue Not Found</h1>
        <p className="text-[var(--kiul-text-soft)] mb-6">
          The journal issue you are looking for does not exist.
        </p>
        <Link
          href="/publishing"
          className="text-[var(--kiul-green)] hover:underline font-semibold"
        >
          ← Back to Publishing
        </Link>
      </div>
    );
  }

  // Fetch articles in this issue
  const { data: articles, error: articlesError } = await supabase
    .from("issue_articles")
    .select("position, manuscripts!inner(id, title, authors, abstract, final_pdf, doi)")
    .eq("issue_id", id)
    .order("position");

  // Transform the data to match expected structure
  const issueArticles: IssueArticle[] = (articles || []).map((item: any) => ({
    position: item.position,
    manuscripts: Array.isArray(item.manuscripts) ? item.manuscripts[0] : item.manuscripts
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[var(--kiul-green)] text-white py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <Link
            href="/publishing"
            className="text-white/80 hover:text-white hover:underline mb-4 inline-block"
          >
            ← Back to Publishing
          </Link>
          <h1 className="text-4xl font-bold mb-3">{issue.title}</h1>
          <div className="flex gap-6 text-lg">
            <span>Volume {issue.volume}</span>
            <span>•</span>
            <span>Number {issue.number}</span>
            <span>•</span>
            <span>{issue.year}</span>
          </div>
          <p className="text-white/80 mt-2">
            Published: {new Date(issue.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {issueArticles.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-[var(--kiul-text-soft)]">
              No articles in this issue yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-6">
              Articles ({issueArticles.length})
            </h2>

            {issueArticles.map((article) => (
              <article
                key={article.position}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-[var(--kiul-green)]
                           transition-all hover:shadow-lg"
              >
                {/* Article Number */}
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="px-4 py-2 bg-[var(--kiul-green)] text-white rounded-lg font-bold
                               text-lg flex-shrink-0"
                  >
                    #{article.position}
                  </span>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-2">
                      {article.manuscripts.title}
                    </h3>
                    <p className="text-[var(--kiul-text-soft)] text-lg mb-1">
                      {article.manuscripts.authors}
                    </p>
                    {article.manuscripts.doi && (
                      <p className="text-sm text-gray-600">
                        <strong>DOI:</strong>{" "}
                        <a
                          href={`https://doi.org/${article.manuscripts.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--kiul-green)] hover:underline"
                        >
                          {article.manuscripts.doi}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Abstract */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[var(--kiul-text-dark)] mb-2">
                    Abstract
                  </h4>
                  <p className="text-[var(--kiul-text-soft)] leading-relaxed">
                    {article.manuscripts.abstract}
                  </p>
                </div>

                {/* Download Button */}
                {article.manuscripts.final_pdf && (
                  <a
                    href={article.manuscripts.final_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl
                               font-semibold hover:bg-[var(--kiul-green-dark)] transition"
                  >
                    📄 Download Full Article (PDF)
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Citation Information */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-[var(--kiul-text-dark)] mb-2">
            How to Cite This Issue
          </h3>
          <p className="text-sm text-[var(--kiul-text-soft)]">
            {issue.title}. Vol. {issue.volume}, No. {issue.number} ({issue.year}). 
            Katoki Institute for Ubuntu Leadership.
          </p>
        </div>
      </div>
    </div>
  );
}
