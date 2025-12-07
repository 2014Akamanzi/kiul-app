"use client";

import { useState, useEffect } from 'react';
import StandardPageLayout from '../components/StandardPageLayout';
import CourseCard from '../components/courses-dashboard/CourseCard';
import CourseDetail from '../components/courses-dashboard/CourseDetail';

interface SavedCourse {
  id: string;
  courseTitle: string;
  overview: string;
  modules: any[];
  appliedPractice?: string;
  tier: string;
  savedAt: string;
  selectedCourses?: string[];
  selectedSkills?: string[];
}

export default function CoursesDashboardPage() {
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<SavedCourse | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');

  // Load courses from localStorage on mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    try {
      const stored = localStorage.getItem('kiul_courses');
      if (stored) {
        const courses = JSON.parse(stored);
        setSavedCourses(courses);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const deleteCourse = (id: string) => {
    try {
      const updated = savedCourses.filter((course) => course.id !== id);
      localStorage.setItem('kiul_courses', JSON.stringify(updated));
      setSavedCourses(updated);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const clearAllCourses = () => {
    if (confirm('Are you sure you want to delete ALL saved courses? This cannot be undone.')) {
      try {
        localStorage.removeItem('kiul_courses');
        setSavedCourses([]);
      } catch (error) {
        console.error('Error clearing courses:', error);
      }
    }
  };

  // Filter courses based on search and tier
  const filteredCourses = savedCourses.filter((course) => {
    const matchesSearch =
      searchQuery === '' ||
      course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.overview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier =
      filterTier === 'all' || course.tier.toLowerCase() === filterTier.toLowerCase();

    return matchesSearch && matchesTier;
  });

  return (
    <StandardPageLayout>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          My Courses Dashboard
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          View and manage your saved short courses
        </p>
      </section>

      {/* Stats Section */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-br from-[var(--kiul-emerald-50)] via-[var(--kiul-background)] to-[var(--kiul-emerald-50)] py-16 md:py-20 px-4 sm:px-6 lg:px-8 mb-12">
        <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--kiul-emerald-700)] rounded-xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[var(--kiul-emerald-900)]">
                  My Saved Courses
                </h1>
                <p className="text-lg text-[var(--kiul-text-medium)] mt-2">
                  Your personalized Ubuntu learning materials, organized in one place
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-4 shadow-[var(--kiul-shadow-soft)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--kiul-emerald-100)] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[var(--kiul-emerald-700)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--kiul-emerald-900)]">
                      {savedCourses.length}
                    </p>
                    <p className="text-sm text-[var(--kiul-text-medium)]">
                      Total Courses
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-4 shadow-[var(--kiul-shadow-soft)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-700"
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
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--kiul-emerald-900)]">
                      {savedCourses.reduce((sum, course) => sum + course.modules.length, 0)}
                    </p>
                    <p className="text-sm text-[var(--kiul-text-medium)]">
                      Total Modules
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-4 shadow-[var(--kiul-shadow-soft)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--kiul-emerald-900)]">
                      {savedCourses.filter((c) => c.tier.toLowerCase() === 'premium').length}
                    </p>
                    <p className="text-sm text-[var(--kiul-text-medium)]">
                      Premium Courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Actions */}
        <section className="py-8 border-b border-[var(--kiul-border)]">
          <div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--kiul-border)] rounded-xl bg-[var(--kiul-card-bg)] text-[var(--kiul-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-600)] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--kiul-text-light)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-[var(--kiul-text-dark)]">
                  Filter:
                </label>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="px-4 py-3 border border-[var(--kiul-border)] rounded-xl bg-[var(--kiul-card-bg)] text-[var(--kiul-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--kiul-emerald-600)]"
                >
                  <option value="all">All Tiers</option>
                  <option value="free">Free</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {/* Clear All */}
              {savedCourses.length > 0 && (
                <button
                  onClick={clearAllCourses}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear All
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Course List */}
        <section className="py-12">
          <div>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-[var(--kiul-emerald-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-[var(--kiul-emerald-700)]"
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
                </div>
                <h3 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-2">
                  {searchQuery || filterTier !== 'all'
                    ? 'No courses found'
                    : 'No saved courses yet'}
                </h3>
                <p className="text-[var(--kiul-text-medium)] mb-6">
                  {searchQuery || filterTier !== 'all'
                    ? 'Try adjusting your filters or search query'
                    : 'Generate and save courses from the Short Courses Generator to see them here'}
                </p>
                <a
                  href="/short-courses"
                  className="inline-flex items-center gap-2 bg-[var(--kiul-emerald-600)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--kiul-emerald-700)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Generate Your First Course
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.courseTitle}
                    overview={course.overview}
                    savedAt={course.savedAt}
                    tier={course.tier}
                    moduleCount={course.modules.length}
                    onView={() => setSelectedCourse(course)}
                    onDelete={() => setShowDeleteConfirm(course.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetail
          courseData={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--kiul-card-bg)] rounded-2xl shadow-[var(--kiul-shadow-lg)] max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)] mb-2">
                  Delete Course?
                </h3>
                <p className="text-sm text-[var(--kiul-text-medium)]">
                  Are you sure you want to delete this course? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-[var(--kiul-border)] rounded-lg font-semibold text-[var(--kiul-text-dark)] hover:bg-[var(--kiul-bg-soft)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCourse(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </StandardPageLayout>
  );
}
