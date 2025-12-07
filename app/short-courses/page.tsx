"use client";

import { useState } from 'react';
import StandardPageLayout from '../components/StandardPageLayout';
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
    <StandardPageLayout>
      {/* PAGE HEADER */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--kiul-emerald-900)] mb-4">
          KIUL Short Courses Generator
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          Create personalized short courses combining practical skills with Ubuntu-informed pedagogy
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 md:py-20">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-2xl)]">
            
            {/* LEFT COLUMN - Inputs */}
            <div className="space-y-[var(--space-lg)]">
              <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-2xl p-[var(--space-lg)] shadow-[var(--kiul-shadow-soft)]">
                <h2 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-lg)]">
                  Design Your Course
                </h2>

                {/* Tier Selection */}
                <div className="mb-[var(--space-lg)]">
                  <TierSelector 
                    selectedTier={selectedTier} 
                    onTierChange={handleTierChange} 
                  />
                </div>

                {/* Course Selection */}
                <div className="mb-[var(--space-lg)]">
                  <CourseSelector
                    selectedCourses={selectedCourses}
                    onCoursesChange={setSelectedCourses}
                    maxCourses={constraints.maxCourses}
                  />
                </div>

                {/* Skill Selection */}
                <div className="mb-[var(--space-lg)]">
                  <SkillSelector
                    selectedSkills={selectedSkills}
                    onSkillsChange={setSelectedSkills}
                    maxSkills={constraints.maxSkills}
                  />
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-[var(--space-md)] p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <p className="text-sm text-red-800 font-medium">{error}</p>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || selectedCourses.length === 0 || selectedSkills.length === 0}
                  className="w-full bg-[var(--kiul-emerald-700)] text-white py-4 rounded-xl font-bold text-lg
                           hover:bg-[var(--kiul-emerald-800)] hover:shadow-[var(--kiul-shadow-lg)]
                           disabled:bg-gray-300 disabled:cursor-not-allowed
                           transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Your Course...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate My Course
                    </>
                  )}
                </button>

                {/* Info Box */}
                <div className="mt-[var(--space-md)] p-4 bg-[var(--kiul-emerald-50)] border border-[var(--kiul-emerald-200)] rounded-lg">
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-800)] mb-2">
                    Ubuntu Pedagogical Model
                  </h4>
                  <p className="text-xs text-[var(--kiul-text-medium)] leading-relaxed">
                    Each module follows our unique structure: <strong>Introduction</strong> → 
                    <strong> Thesis</strong> (1 paragraph) → <strong>Antithesis</strong> (3 paragraphs) → 
                    <strong> Synthesis</strong> (1 paragraph) → <strong>Conclusion</strong>, 
                    plus a quiz to test your understanding.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Output */}
            <div id="course-results">
              {!generatedCourse && !isGenerating && (
                <div className="bg-[var(--kiul-card-bg)] border-2 border-dashed border-[var(--kiul-border)] rounded-2xl p-[var(--space-2xl)] flex flex-col items-center justify-center text-center min-h-[600px]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[var(--kiul-emerald-700)] mb-[var(--space-md)] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)] mb-2">
                    Your Course Awaits
                  </h3>
                  <p className="text-[var(--kiul-text-medium)] max-w-md">
                    Select your courses, skills, and tier from the left panel, then click 
                    "Generate My Course" to create your personalized learning experience.
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-2xl p-[var(--space-2xl)] flex flex-col items-center justify-center text-center min-h-[600px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[var(--kiul-emerald-700)] mb-[var(--space-md)]"></div>
                  <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)] mb-2">
                    Crafting Your Course...
                  </h3>
                  <p className="text-[var(--kiul-text-medium)]">
                    Applying Ubuntu pedagogy and generating structured content
                  </p>
                </div>
              )}

              {generatedCourse && (
                <div className="space-y-[var(--space-md)]">
                  {/* Save Course Button */}
                  <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-4 shadow-[var(--kiul-shadow-soft)]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[var(--kiul-emerald-900)] mb-1">
                          Save This Course
                        </h4>
                        <p className="text-xs text-[var(--kiul-text-medium)]">
                          Save to your dashboard to access anytime
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {saveMessage && (
                          <span className="text-sm font-semibold text-green-600 animate-fade-in">
                            {saveMessage}
                          </span>
                        )}
                        <button
                          onClick={handleSaveCourse}
                          className="px-6 py-3 bg-[var(--kiul-emerald-600)] text-white rounded-lg font-semibold hover:bg-[var(--kiul-emerald-700)] transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                          Save Course
                        </button>
                        <a
                          href="/courses-dashboard"
                          className="px-6 py-3 border-2 border-[var(--kiul-emerald-600)] text-[var(--kiul-emerald-700)] rounded-lg font-semibold hover:bg-[var(--kiul-emerald-50)] transition-all flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                          </svg>
                          View Dashboard
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Course Output */}
                  <CourseOutput courseData={generatedCourse} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION SECTION */}
      <section className="-mx-6 py-[var(--space-2xl)] px-6 bg-[var(--kiul-bg-soft)]">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
            Ubuntu-Informed Learning
          </h3>
          <p className="text-[var(--kiul-text-medium)] leading-relaxed mb-[var(--space-md)]">
            KIUL's unique pedagogical approach combines Thesis, Antithesis, and Synthesis with 
            Ubuntu philosophy. Each course integrates practical skills with ethical thinking, 
            community values, and critical reflection—preparing you for meaningful professional 
            and personal development.
          </p>
          <p className="text-sm text-[var(--kiul-text-light)] italic">
            "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela
          </p>
        </div>
      </section>
    </StandardPageLayout>
  );
}
