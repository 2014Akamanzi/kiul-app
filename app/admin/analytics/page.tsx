"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Type definitions for RPC responses
interface EditorialStat {
  label: string;
  count: number | null;
  avg_review_days: number | null;
}

interface MonthlyTrend {
  month: string;
  submissions: number;
  accepted: number;
  rejected: number;
  published: number;
}

interface ReviewerPerformance {
  reviewer_id: string;
  reviewer_name: string;
  reviewer_email: string;
  total_reviews: number;
  completed_reviews: number;
  pending_reviews: number;
  avg_completion_days: number | null;
  acceptance_rate: number | null;
}

interface StatusDist {
  status: string;
  count: number;
  percentage: number;
}

interface Activity {
  activity_type: string;
  manuscript_id: string;
  manuscript_title: string;
  author_name: string;
  reviewer_name: string | null;
  event_date: string;
  description: string;
}

interface TimeToDecision {
  metric: string;
  days: number | null;
  manuscript_count: number;
}

interface AuthorStats {
  total_authors: number;
  authors_with_multiple_submissions: number;
  avg_submissions_per_author: number;
  top_author: string;
  top_author_count: number;
}

interface DOIStats {
  total_dois: number;
  registered_dois: number;
  pending_registration: number;
  registration_rate: number | null;
}

export default function AnalyticsPage() {
  const [editorialStats, setEditorialStats] = useState<EditorialStat[]>([]);
  const [trends, setTrends] = useState<MonthlyTrend[]>([]);
  const [reviewers, setReviewers] = useState<ReviewerPerformance[]>([]);
  const [distribution, setDistribution] = useState<StatusDist[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [decisionTime, setDecisionTime] = useState<TimeToDecision[]>([]);
  const [authors, setAuthors] = useState<AuthorStats | undefined>();
  const [dois, setDois] = useState<DOIStats | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch all analytics data in parallel
      const [
        { data: stats },
        { data: monthlyTrends },
        { data: reviewerPerf },
        { data: statusDist },
        { data: recentActivity },
        { data: timeStats },
        { data: authorStats },
        { data: doiStats },
      ] = await Promise.all([
        supabase.rpc("editorial_stats"),
        supabase.rpc("monthly_submission_trends", { months_back: 12 }),
        supabase.rpc("reviewer_performance"),
        supabase.rpc("status_distribution"),
        supabase.rpc("recent_activity", { limit_count: 15 }),
        supabase.rpc("time_to_decision_stats"),
        supabase.rpc("author_statistics"),
        supabase.rpc("doi_statistics"),
      ]);

      setEditorialStats(stats as EditorialStat[] || []);
      setTrends(monthlyTrends as MonthlyTrend[] || []);
      setReviewers(reviewerPerf as ReviewerPerformance[] || []);
      setDistribution(statusDist as StatusDist[] || []);
      setActivities(recentActivity as Activity[] || []);
      setDecisionTime(timeStats as TimeToDecision[] || []);
      setAuthors((authorStats as AuthorStats[])?.[0]);
      setDois((doiStats as DOIStats[])?.[0]);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract key metrics
  const totalSubmissions = editorialStats?.find((s) => s.label === "Total Submissions")?.count || 0;
  const underReview = editorialStats?.find((s) => s.label === "Under Review")?.count || 0;
  const accepted = editorialStats?.find((s) => s.label === "Accepted")?.count || 0;
  const published = editorialStats?.find((s) => s.label === "Published")?.count || 0;
  const rejected = editorialStats?.find((s) => s.label === "Rejected")?.count || 0;
  const revisionRequested = editorialStats?.find((s) => s.label === "Revision Requested")?.count || 0;
  const avgReviewDays = editorialStats?.find((s) => s.label === "Avg Review Time")?.avg_review_days || 0;

  // Calculate acceptance rate
  const totalDecisions = (accepted || 0) + (rejected || 0);
  const acceptanceRate = totalDecisions > 0 ? ((accepted || 0) / totalDecisions * 100).toFixed(1) : "0.0";

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading analytics...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Editorial Analytics</h1>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <p className="text-gray-600">
            Comprehensive insights into your editorial workflow and publishing metrics
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Submissions */}
          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs font-medium text-gray-500 uppercase">
                Total Submissions
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-blue-600">
                {totalSubmissions}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">All-time manuscript submissions</p>
            </CardContent>
          </Card>

          {/* Under Review */}
          <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs font-medium text-gray-500 uppercase">
                Under Review
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-orange-600">
                {underReview}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Currently being reviewed</p>
            </CardContent>
          </Card>

          {/* Published */}
          <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs font-medium text-gray-500 uppercase">
                Published
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-green-600">
                {published}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Live in journal issues</p>
            </CardContent>
          </Card>

          {/* Acceptance Rate */}
          <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs font-medium text-gray-500 uppercase">
                Acceptance Rate
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-purple-600">
                {acceptanceRate}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {accepted} accepted / {totalDecisions} decided
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Distribution & Time Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Status Distribution */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Manuscript Status Distribution</CardTitle>
              <CardDescription>Current workflow breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {distribution?.map((stat) => {
                  const statusColors: { [key: string]: string } = {
                    submitted: "bg-blue-500",
                    under_review: "bg-orange-500",
                    accepted: "bg-green-500",
                    published: "bg-emerald-600",
                    rejected: "bg-red-500",
                    revision_requested: "bg-yellow-500",
                  };
                  
                  const statusLabels: { [key: string]: string } = {
                    submitted: "Submitted",
                    under_review: "Under Review",
                    accepted: "Accepted",
                    published: "Published",
                    rejected: "Rejected",
                    revision_requested: "Revision Requested",
                  };

                  return (
                    <div key={stat.status}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {statusLabels[stat.status] || stat.status}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {stat.count} ({stat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${statusColors[stat.status] || "bg-gray-400"}`}
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Time Metrics */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Review Timeline Performance</CardTitle>
              <CardDescription>Decision processing times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Average Review Time - Large Display */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Average Review Time</p>
                  <p className="text-5xl font-bold text-green-600 mb-1">
                    {avgReviewDays || 0}
                  </p>
                  <p className="text-lg text-gray-700">days</p>
                </div>

                {/* Additional Time Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {decisionTime?.slice(1).map((stat) => (
                    <div key={stat.metric} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">{stat.metric}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.days || 0}
                      </p>
                      <p className="text-xs text-gray-600">days</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="shadow-sm mb-10">
          <CardHeader>
            <CardTitle className="text-xl">Monthly Submission Trends</CardTitle>
            <CardDescription>Last 12 months activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Month</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Submissions</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Accepted</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Rejected</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {trends?.slice(0, 6).map((trend, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{trend.month}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                          {trend.submissions}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                          {trend.accepted}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                          {trend.rejected}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                          {trend.published}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Author & DOI Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Author Statistics */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Author Insights</CardTitle>
              <CardDescription>Submission patterns and contributors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="text-sm text-gray-600">Total Authors</p>
                    <p className="text-3xl font-bold text-blue-600">{authors?.total_authors || 0}</p>
                  </div>
                  <div className="text-5xl">👥</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Repeat Authors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {authors?.authors_with_multiple_submissions || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Avg per Author</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {authors?.avg_submissions_per_author?.toFixed(1) || "0.0"}
                    </p>
                  </div>
                </div>

                {authors?.top_author && (
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <p className="text-xs font-medium text-gray-600 mb-1">🏆 Most Prolific Author</p>
                    <p className="text-sm font-semibold text-gray-900">{authors.top_author}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {authors.top_author_count} submission{authors.top_author_count !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* DOI Statistics */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">DOI Registration Status</CardTitle>
              <CardDescription>CrossRef integration metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <div>
                    <p className="text-sm text-gray-600">Registration Rate</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {dois?.registration_rate?.toFixed(1) || "0.0"}%
                    </p>
                  </div>
                  <div className="text-5xl">🌐</div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total DOIs</p>
                    <p className="text-2xl font-bold text-gray-900">{dois?.total_dois || 0}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                    <p className="text-xs text-gray-500 mb-1">Registered</p>
                    <p className="text-2xl font-bold text-green-600">{dois?.registered_dois || 0}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
                    <p className="text-xs text-gray-500 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{dois?.pending_registration || 0}</p>
                  </div>
                </div>

                {dois && dois.pending_registration > 0 && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-xs text-orange-800">
                      ⚠️ {dois.pending_registration} DOI{dois.pending_registration !== 1 ? "s" : ""} awaiting 
                      CrossRef registration
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviewer Performance */}
        <Card className="shadow-sm mb-10">
          <CardHeader>
            <CardTitle className="text-xl">Reviewer Performance</CardTitle>
            <CardDescription>Top reviewers by activity and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reviewer</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Completed</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Pending</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Avg Days</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Accept Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewers?.slice(0, 10).map((reviewer) => (
                    <tr key={reviewer.reviewer_id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{reviewer.reviewer_name}</p>
                          <p className="text-xs text-gray-500">{reviewer.reviewer_email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-gray-900">
                        {reviewer.total_reviews}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                          {reviewer.completed_reviews}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold text-xs">
                          {reviewer.pending_reviews}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {reviewer.avg_completion_days?.toFixed(1) || "—"}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {reviewer.acceptance_rate?.toFixed(0) || "—"}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Latest editorial actions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities?.map((activity, idx) => {
                const activityIcons: { [key: string]: string } = {
                  submission: "📝",
                  review: "✍️",
                  publication: "📚",
                };

                const activityColors: { [key: string]: string } = {
                  submission: "bg-blue-50 border-blue-200",
                  review: "bg-orange-50 border-orange-200",
                  publication: "bg-green-50 border-green-200",
                };

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${activityColors[activity.activity_type] || "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{activityIcons[activity.activity_type] || "📄"}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-700 mb-1 truncate">
                          <span className="font-semibold">{activity.manuscript_title}</span>
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>👤 {activity.author_name}</span>
                          {activity.reviewer_name && (
                            <span>👨‍⚖️ {activity.reviewer_name}</span>
                          )}
                          <span>🕒 {new Date(activity.event_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary Footer */}
        <div className="mt-10 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Editorial System Health: Excellent ✅
              </h3>
              <p className="text-sm text-gray-600">
                {underReview} manuscripts under review • {avgReviewDays} day average review time • {acceptanceRate}% acceptance rate
              </p>
            </div>
            <div className="text-6xl">📊</div>
          </div>
        </div>
      </div>
    </main>
  );
}
