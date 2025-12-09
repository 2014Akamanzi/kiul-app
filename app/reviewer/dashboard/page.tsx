"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

interface Assignment {
  id: string;
  manuscript_id: string;
  assigned_at: string;
  completed: boolean;
  due_date?: string;
  manuscripts: {
    id: string;
    title: string;
    authors: string;
    abstract: string;
  };
}

export default function ReviewerDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewerId, setReviewerId] = useState<string | null>(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Check if user is a reviewer
      const { data: reviewer } = await supabase
        .from("reviewers")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!reviewer) {
        setLoading(false);
        return;
      }

      setReviewerId(reviewer.id);

      // Fetch assignments with manuscript details
      const { data, error } = await supabase
        .from("review_assignments")
        .select("*, manuscripts!inner(id, title, authors, abstract)")
        .eq("reviewer_id", reviewer.id)
        .order("due_date", { ascending: true, nullsFirst: false });

      if (error) {
        console.error("Error loading assignments:", error);
      } else {
        // Transform data to handle Supabase nested query structure
        const transformedData = (data || []).map((item: any) => ({
          ...item,
          manuscripts: Array.isArray(item.manuscripts)
            ? item.manuscripts[0]
            : item.manuscripts,
        }));
        setAssignments(transformedData);
      }
    } catch (err) {
      console.error("Failed to load assignments:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilDue = (dueDate?: string): number | null => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateBadge = (dueDate?: string, completed?: boolean) => {
    if (completed) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
          ✓ Completed
        </span>
      );
    }

    if (!dueDate) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
          No deadline
        </span>
      );
    }

    const daysUntil = getDaysUntilDue(dueDate);
    if (daysUntil === null) return null;

    if (daysUntil < 0) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
          ⚠️ Overdue by {Math.abs(daysUntil)} day{Math.abs(daysUntil) !== 1 ? "s" : ""}
        </span>
      );
    }

    if (daysUntil === 0) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800">
          ⏰ Due today
        </span>
      );
    }

    if (daysUntil <= 3) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
          ⏳ Due in {daysUntil} day{daysUntil !== 1 ? "s" : ""}
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
        📅 Due in {daysUntil} days
      </span>
    );
  };

  if (loading) {
    return (
      <main className="max-w-[900px] mx-auto px-6 py-12">
        <div className="text-center py-16">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading your assignments...</p>
        </div>
      </main>
    );
  }

  if (!reviewerId) {
    return (
      <main className="max-w-[900px] mx-auto px-6 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Reviewer Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            You must be registered as a reviewer to access this dashboard
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800"
          >
            Go to Home
          </Link>
        </div>
      </main>
    );
  }

  const pendingAssignments = assignments.filter((a) => !a.completed);
  const completedAssignments = assignments.filter((a) => a.completed);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📋 Assigned Reviews
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your peer review assignments and deadlines
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {assignments.length}
            </div>
            <div className="text-gray-600 text-sm">Total Assignments</div>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-100 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {pendingAssignments.length}
            </div>
            <div className="text-gray-600 text-sm">Pending Reviews</div>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {completedAssignments.length}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
        </div>

        {/* Pending Reviews */}
        {pendingAssignments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔔 Pending Reviews ({pendingAssignments.length})
            </h2>
            <div className="space-y-6">
              {pendingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-6 border-2 border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">
                      {assignment.manuscripts.title}
                    </h3>
                    {getDueDateBadge(assignment.due_date, assignment.completed)}
                  </div>

                  <p className="text-gray-700 mb-4">
                    <strong>Authors:</strong> {assignment.manuscripts.authors}
                  </p>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {assignment.manuscripts.abstract}
                  </p>

                  <div className="flex gap-4 items-center">
                    {assignment.due_date && (
                      <p className="text-sm text-gray-600">
                        <strong>Due Date:</strong>{" "}
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </p>
                    )}

                    <p className="text-sm text-gray-600">
                      <strong>Assigned:</strong>{" "}
                      {new Date(assignment.assigned_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/reviewer/review/${assignment.manuscript_id}`}
                      className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      📝 Submit Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Reviews */}
        {completedAssignments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ✅ Completed Reviews ({completedAssignments.length})
            </h2>
            <div className="space-y-6">
              {completedAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-6 border-2 border-gray-100 rounded-2xl bg-white opacity-75"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">
                      {assignment.manuscripts.title}
                    </h3>
                    {getDueDateBadge(assignment.due_date, assignment.completed)}
                  </div>

                  <p className="text-gray-700 mb-2">
                    <strong>Authors:</strong> {assignment.manuscripts.authors}
                  </p>

                  {assignment.due_date && (
                    <p className="text-sm text-gray-600">
                      <strong>Due Date:</strong>{" "}
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {assignments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No assignments yet
            </h3>
            <p className="text-gray-600">
              You will see review assignments here when papers are assigned to you
            </p>
          </div>
        )}

        {/* Navigation Links */}
        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-gray-300"
          >
            ← Back to Home
          </Link>
          <Link
            href="/journal/search"
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800"
          >
            🔍 Search Published Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
