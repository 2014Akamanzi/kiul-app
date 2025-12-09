"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface SavedCourse {
  id: string;
  title: string;
  skills: string[];
  tier: string;
  created_at: string;
}

interface SavedGoal {
  id: string;
  goal: string;
  updated_at: string;
  steps: string[];
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<SavedCourse[]>([]);
  const [goals, setGoals] = useState<SavedGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    loadData();
  }, [user, authLoading, router]);

  const loadData = async () => {
    if (!user) return;

    try {
      // Load courses
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Load goals
      const { data: goalsData, error: goalsError } = await supabase
        .from("mentorship_goals")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (goalsError) throw goalsError;
      setGoals(goalsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="text-[var(--kiul-text-soft)]">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
        Your KIUL Dashboard
      </h1>

      <p className="text-[17px] text-[var(--kiul-text-soft)] mb-10">
        Track your saved courses, mentorship goals, and learning progress.
      </p>

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COURSES */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-6">
              Saved Courses
            </h2>

            {courses.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <p className="text-sm text-[var(--kiul-text-soft)] mb-4">
                  No saved courses yet.
                </p>
                <a
                  href="/short-courses/generator"
                  className="inline-block px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl
                             hover:bg-[var(--kiul-green-dark)] transition font-semibold"
                >
                  Create Your First Course
                </a>
              </div>
            )}

            <div className="space-y-4">
              {courses.map((c, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm
                             hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-[var(--kiul-text-dark)]">
                      {c.title}
                    </h3>
                    <span className="text-xs bg-[var(--kiul-green-light)] text-[var(--kiul-green)]
                                   px-3 py-1 rounded-full font-semibold">
                      {c.tier.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--kiul-text-soft)] mb-3">
                    Skills: {c.skills.join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(c.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* GOALS */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--kiul-text-dark)] mb-6">
              Mentorship Goals
            </h2>

            {goals.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <p className="text-sm text-[var(--kiul-text-soft)] mb-4">
                  No saved goals yet.
                </p>
                <a
                  href="/mentorship"
                  className="inline-block px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl
                             hover:bg-[var(--kiul-green-dark)] transition font-semibold"
                >
                  Start Mentorship Journey
                </a>
              </div>
            )}

            <div className="space-y-4">
              {goals.map((g, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm
                             hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg text-[var(--kiul-text-dark)] mb-3">
                    {g.goal}
                  </h3>
                  {g.steps && g.steps.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-[var(--kiul-text-soft)] mb-2">
                        Next Steps:
                      </p>
                      <ul className="space-y-1">
                        {g.steps.slice(0, 3).map((step, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-[var(--kiul-text-soft)] pl-4"
                          >
                            • {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-xs text-gray-400">
                    Updated: {new Date(g.updated_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/counselling"
              className="block border rounded-xl p-6 hover:border-[var(--kiul-green)] transition bg-white"
            >
              <div className="text-2xl mb-2">💬</div>
              <div className="font-semibold mb-1">Counselling</div>
              <div className="text-sm text-[var(--kiul-text-soft)]">
                Continue your reflection journey
              </div>
            </a>
            <a
              href="/mentorship"
              className="block border rounded-xl p-6 hover:border-[var(--kiul-green)] transition bg-white"
            >
              <div className="text-2xl mb-2">🌱</div>
              <div className="font-semibold mb-1">Mentorship</div>
              <div className="text-sm text-[var(--kiul-text-soft)]">
                Set new career goals
              </div>
            </a>
            <a
              href="/short-courses/generator"
              className="block border rounded-xl p-6 hover:border-[var(--kiul-green)] transition bg-white"
            >
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-semibold mb-1">Generate Course</div>
              <div className="text-sm text-[var(--kiul-text-soft)]">
                Create a new learning path
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
