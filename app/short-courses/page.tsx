"use client";

import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import Link from "next/link";
import Container from '../components/Container';
import CourseSelector from '@/app/components/shortcourses/CourseSelector';
import SkillSelector from '@/app/components/shortcourses/SkillSelector';
import TierSelector from '@/app/components/shortcourses/TierSelector';
import CourseOutput from '@/app/components/shortcourses/CourseOutput';

const TIER_CONSTRAINTS = {
  free: { maxCourses: 1, maxSkills: 1 },
  standard: { maxCourses: 3, maxSkills: 3 },
  premium: { maxCourses: 5, maxSkills: 5 },
};

export default function ShortCoursesPage() {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication required message
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-4 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-xl font-bold text-green-600 mb-2">
              Authentication Required
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              To access the KIUL Short Courses service, you need to register and login first. 
              This allows us to save your generated courses and track your learning progress.
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-green-600 mb-2">New to KIUL?</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Create a free account to access short courses, counselling, and mentorship.
                </p>
                <Link
                  href="/auth/signup"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Register Now
                </Link>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="font-semibold text-green-600 mb-2">Already have an account?</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Login to continue your Ubuntu-inspired learning journey.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-block px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ShortCoursesContent />;
}

function ShortCoursesContent() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<'free' | 'standard' | 'premium'>('standard');
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleTierChange = (tier: 'free' | 'standard' | 'premium') => {
    setSelectedTier(tier);
    const constraints = TIER_CONSTRAINTS[tier];
    
    // Trim selections if they exceed new tier limits
    if (selectedCourses.length > constraints.maxCourses) {
      setSelectedCourses(selectedCourses.slice(0, constraints.maxCourses));
    }
    if (selectedSkills.length > constraints.maxSkills) {
      setSelectedSkills(selectedSkills.slice(0, constraints.maxSkills));
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setGeneratedCourse(null);

    // Validation
    if (selectedCourses.length === 0) {
      setError('Please select at least one course');
      return;
    }
    if (selectedSkills.length === 0) {
      setError('Please select at least one skill');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/short-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courses: selectedCourses,
          skills: selectedSkills,
          tier: selectedTier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate course');
      }

      setGeneratedCourse(data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('course-results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate course');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCourse = () => {
    if (!generatedCourse) return;

    try {
      // Load existing courses
      const stored = localStorage.getItem('kiul_courses');
      const existingCourses = stored ? JSON.parse(stored) : [];

      // Create new course with metadata
      const newCourse = {
        id: `course_${Date.now()}`,
        ...generatedCourse,
        savedAt: new Date().toISOString(),
        selectedCourses,
        selectedSkills,
      };

      // Add to array
      const updatedCourses = [newCourse, ...existingCourses];

      // Save to localStorage
      localStorage.setItem('kiul_courses', JSON.stringify(updatedCourses));

      // Show success message
      setSaveMessage('Course saved successfully!');
      setTimeout(() => setSaveMessage(null), 3000);

    } catch (error) {
      console.error('Error saving course:', error);
      setSaveMessage('Failed to save course. Please try again.');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const constraints = TIER_CONSTRAINTS[selectedTier];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* PAGE HEADER */}
        <section className="text-center mb-3 pt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--kiul-emerald-900)] mb-2">
            KIUL Short Courses Generator
          </h1>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto mb-1">
            Create personalized short courses combining practical skills with Ubuntu-informed pedagogy. 
            Choose your tier, select courses and skills, then generate your customized learning path.
          </p>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto mb-6">
            Each module follows: <strong>Introduction</strong> → <strong>Thesis</strong> (1 paragraph) → 
            <strong> Antithesis</strong> (3 paragraphs) → <strong>Synthesis</strong> (1 paragraph) → 
            <strong> Conclusion</strong>, plus a quiz to test your understanding.
          </p>
        </section>

        {/* TIER SELECTION - Three Cards */}
        <section className="mb-8">
            <h2 className="text-base font-bold text-gray-700 mb-4 text-center">Choose Your Tier</h2>
            <TierSelector 
              selectedTier={selectedTier} 
              onTierChange={handleTierChange} 
            />
          </section>

          {/* COURSES AND SKILLS - Side by Side */}
          <section className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Course Selection Card */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm">
              <h2 className="text-base font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📚</span>
                Select Courses (Max: {constraints.maxCourses})
              </h2>
              <CourseSelector
                selectedCourses={selectedCourses}
                onCoursesChange={setSelectedCourses}
                maxCourses={constraints.maxCourses}
              />
            </div>

            {/* Skill Selection Card */}
            <div className="bg-white border-2 border-emerald-200 rounded-xl p-4 shadow-sm">
              <h2 className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Select Skills (Max: {constraints.maxSkills})
              </h2>
              <SkillSelector
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
                maxSkills={constraints.maxSkills}
              />
            </div>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-red-800 font-medium text-center">{error}</p>
          </div>
        )}

        {/* Generate Button */}
        <div className="mb-8 max-w-2xl mx-auto">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedCourses.length === 0 || selectedSkills.length === 0}
            className="w-full bg-[var(--kiul-emerald-700)] text-white py-4 rounded-xl font-bold text-base
                     hover:bg-[var(--kiul-emerald-800)] hover:shadow-lg
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Your Course...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate My Course
              </>
            )}
          </button>
        </div>

        {/* GENERATED COURSE AREA */}
        <section className="pb-12">
          <div id="course-results">
            {!generatedCourse && !isGenerating && (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-emerald-600 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">
                  Your Course Awaits
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  Select your tier, courses, and skills above, then click "Generate My Course" to create your personalized learning experience.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-4"></div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">
                  Crafting Your Course...
                </h3>
                <p className="text-sm text-gray-600">
                  Applying Ubuntu pedagogy and generating structured content
                </p>
              </div>
            )}

            {generatedCourse && (
              <div className="space-y-4">
                {/* Save Course Button */}
                <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-teal-900 mb-1">
                        💾 Save This Course
                      </h4>
                      <p className="text-xs text-gray-600">
                        Save to your dashboard to access anytime
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {saveMessage && (
                        <span className="text-sm font-semibold text-green-600">
                          {saveMessage}
                        </span>
                      )}
                      <button
                        onClick={handleSaveCourse}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save
                      </button>
                      <a
                        href="/courses-dashboard"
                        className="px-4 py-2 border-2 border-emerald-600 text-emerald-700 text-sm rounded-lg font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                        </svg>
                        Dashboard
                      </a>
                    </div>
                  </div>
                </div>

                {/* Course Output */}
                <CourseOutput courseData={generatedCourse} />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
