"use client";

import { useState } from 'react';

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Module {
  moduleNumber: number;
  moduleTitle: string;
  introduction: string;
  thesis: string;
  antithesis: string[];
  synthesis: string;
  conclusion: string;
  quiz: Quiz[];
}

interface Reference {
  citation: string;
  annotation: string;
}

interface CourseData {
  courseTitle: string;
  overview: string;
  modules: Module[];
  references?: Reference[];
  appliedPractice?: string;
  tier: string;
}

interface CourseOutputProps {
  courseData: CourseData;
}

export default function CourseOutput({ courseData }: CourseOutputProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([1]); // Start with first module expanded
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [passedModules, setPassedModules] = useState<number[]>([]); // Track passed modules

  const toggleModule = (moduleNumber: number) => {
    // Check if module is locked
    if (moduleNumber > 1 && !passedModules.includes(moduleNumber - 1)) {
      return; // Don't allow opening locked modules
    }

    setExpandedModules(prev =>
      prev.includes(moduleNumber)
        ? prev.filter(m => m !== moduleNumber)
        : [...prev, moduleNumber]
    );
  };

  const handleQuizAnswer = (moduleNumber: number, quizIndex: number, answer: string) => {
    const key = `${moduleNumber}-${quizIndex}`;
    setQuizAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const calculateScore = (moduleNumber: number) => {
    const module = courseData.modules.find(m => m.moduleNumber === moduleNumber);
    if (!module) return 0;

    let correct = 0;
    module.quiz.forEach((q, index) => {
      const key = `${moduleNumber}-${index}`;
      if (quizAnswers[key] === q.correctAnswer) {
        correct++;
      }
    });

    return Math.round((correct / module.quiz.length) * 100);
  };

  const submitQuiz = (moduleNumber: number) => {
    setShowResults(prev => ({ ...prev, [moduleNumber]: true }));
    
    // Check if user passed (75% or higher)
    const score = calculateScore(moduleNumber);
    if (score >= 75) {
      setPassedModules(prev => [...prev, moduleNumber]);
      // Auto-expand next module
      if (moduleNumber < courseData.modules.length) {
        setExpandedModules(prev => [...prev, moduleNumber + 1]);
      }
    }
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Course Header */}
      <div className="bg-white border-2 border-emerald-300 rounded-2xl p-[var(--space-lg)] shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {courseData.tier} Course
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-3 text-gray-900">{courseData.courseTitle}</h2>
        <p className="text-gray-700 leading-relaxed">{courseData.overview}</p>
      </div>

      {/* Modules */}
      {courseData.modules.map((module) => {
        const isExpanded = expandedModules.includes(module.moduleNumber);
        const quizResult = showResults[module.moduleNumber];
        const isPassed = passedModules.includes(module.moduleNumber);
        const isLocked = module.moduleNumber > 1 && !passedModules.includes(module.moduleNumber - 1);
        const score = quizResult ? calculateScore(module.moduleNumber) : null;

        return (
          <div
            key={module.moduleNumber}
            className={`bg-white border rounded-xl shadow-md overflow-hidden ${
              isLocked 
                ? 'border-gray-300 opacity-60' 
                : isPassed 
                ? 'border-green-500'
                : 'border-[var(--kiul-border)]'
            }`}
          >
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.moduleNumber)}
              disabled={isLocked}
              className={`w-full px-[var(--space-lg)] py-[var(--space-md)] flex items-center justify-between transition-colors ${
                isLocked
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-[var(--kiul-bg-soft)] hover:bg-[var(--kiul-emerald-50)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold relative ${
                  isLocked 
                    ? 'bg-gray-400 text-white'
                    : isPassed
                    ? 'bg-green-600 text-white'
                    : 'bg-[var(--kiul-emerald-700)] text-white'
                }`}>
                  {isLocked ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : isPassed ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    module.moduleNumber
                  )}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${
                    isLocked ? 'text-gray-500' : 'text-[var(--kiul-emerald-900)]'
                  }`}>
                    {module.moduleTitle}
                  </h3>
                  {isLocked && (
                    <p className="text-xs text-gray-500 mt-1">
                      Pass the previous module to unlock (75% minimum)
                    </p>
                  )}
                  {isPassed && score !== null && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      ✓ Passed with {score}%
                    </p>
                  )}
                </div>
              </div>
              {!isLocked && (
                <svg
                  className={`w-6 h-6 text-[var(--kiul-emerald-700)] transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* Module Content */}
            {isExpanded && (
              <div className="px-[var(--space-lg)] py-[var(--space-lg)] space-y-[var(--space-lg)]">
                
                {/* Introduction */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Introduction
                  </h4>
                  <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                    {module.introduction}
                  </p>
                </div>

                {/* Thesis */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Thesis
                  </h4>
                  <p className="text-[var(--kiul-text-dark)] leading-relaxed font-medium">
                    {module.thesis}
                  </p>
                </div>

                {/* Antithesis */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Antithesis
                  </h4>
                  <div className="space-y-4">
                    {module.antithesis.map((para, index) => (
                      <p key={index} className="text-[var(--kiul-text-dark)] leading-relaxed pl-4 border-l-2 border-[var(--kiul-emerald-200)]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Synthesis */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Synthesis
                  </h4>
                  <p className="text-gray-800 leading-relaxed font-medium bg-white p-4 rounded-lg border border-gray-200">
                    {module.synthesis}
                  </p>
                </div>

                {/* Conclusion */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Conclusion
                  </h4>
                  <p className="text-[var(--kiul-text-medium)] leading-relaxed">
                    {module.conclusion}
                  </p>
                </div>

                {/* Quiz */}
                <div className="border-t border-[var(--kiul-border)] pt-[var(--space-lg)]">
                  <h4 className="text-lg font-bold text-[var(--kiul-emerald-800)] mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Module Quiz
                  </h4>
                  <div className="space-y-4">
                    {module.quiz.map((q, qIndex) => {
                      const key = `${module.moduleNumber}-${qIndex}`;
                      const userAnswer = quizAnswers[key];
                      const isCorrect = userAnswer === q.correctAnswer;

                      return (
                        <div key={qIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="font-semibold text-[var(--kiul-text-dark)] mb-3">
                            {qIndex + 1}. {q.question}
                          </p>
                          <div className="space-y-2">
                            {q.options.map((option, oIndex) => {
                              const optionLetter = option.charAt(0);
                              const isSelected = userAnswer === optionLetter;
                              const showCorrect = quizResult && q.correctAnswer === optionLetter;
                              const showIncorrect = quizResult && isSelected && !isCorrect;

                              return (
                                <label
                                  key={oIndex}
                                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                                    showCorrect
                                      ? 'border-green-500 bg-green-50'
                                      : showIncorrect
                                      ? 'border-red-500 bg-red-50'
                                      : isSelected
                                      ? 'border-[var(--kiul-emerald-700)] bg-[var(--kiul-emerald-50)]'
                                      : 'border-[var(--kiul-border)] hover:border-[var(--kiul-emerald-700)]'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={key}
                                    value={optionLetter}
                                    checked={isSelected}
                                    onChange={(e) => handleQuizAnswer(module.moduleNumber, qIndex, e.target.value)}
                                    disabled={quizResult}
                                    className="w-4 h-4 text-[var(--kiul-emerald-700)]"
                                  />
                                  <span className={`text-sm ${
                                    showCorrect || showIncorrect ? 'font-semibold' : ''
                                  }`}>
                                    {option}
                                  </span>
                                  {showCorrect && (
                                    <svg className="w-5 h-5 text-green-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                  {showIncorrect && (
                                    <svg className="w-5 h-5 text-red-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  )}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {!quizResult && (
                    <button
                      onClick={() => submitQuiz(module.moduleNumber)}
                      className="mt-4 bg-[var(--kiul-emerald-700)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--kiul-emerald-800)] transition-all"
                    >
                      Submit Quiz
                    </button>
                  )}
                  {quizResult && score !== null && (
                    <div className={`mt-4 p-4 rounded-r-lg border-l-4 ${
                      score >= 75
                        ? 'bg-green-50 border-green-600'
                        : 'bg-red-50 border-red-600'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-lg font-bold mb-1 ${
                            score >= 75 ? 'text-green-900' : 'text-red-900'
                          }`}>
                            Your Score: {score}%
                          </p>
                          <p className={`text-sm ${
                            score >= 75 ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {score >= 75 
                              ? '🎉 Congratulations! You passed this module.' 
                              : '⚠️ You need 75% or higher to proceed. Please review the content and try again.'}
                          </p>
                        </div>
                        {score < 75 && (
                          <button
                            onClick={() => {
                              // Reset quiz for retake
                              const newAnswers = { ...quizAnswers };
                              module.quiz.forEach((_, index) => {
                                delete newAnswers[`${module.moduleNumber}-${index}`];
                              });
                              setQuizAnswers(newAnswers);
                              setShowResults(prev => ({ ...prev, [module.moduleNumber]: false }));
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all text-sm"
                          >
                            Retake Quiz
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Academic References */}
      {courseData.references && courseData.references.length > 0 && (
        <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">
              Academic References
            </h3>
          </div>
          <div className="space-y-4">
            {courseData.references.map((ref, index) => (
              <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {ref.citation}
                </p>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  {ref.annotation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applied Practice (Premium Only) */}
      {courseData.appliedPractice && (
        <div className="bg-gradient-to-br from-[var(--kiul-emerald-50)] to-[var(--kiul-bg-soft)] border-2 border-[var(--kiul-emerald-700)] rounded-xl p-[var(--space-lg)]">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--kiul-emerald-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)]">
              Applied Practice
            </h3>
            <span className="ml-auto bg-[var(--kiul-emerald-700)] text-white text-xs font-bold px-3 py-1 rounded-full">
              PREMIUM
            </span>
          </div>
          <p className="text-[var(--kiul-text-dark)] leading-relaxed">
            {courseData.appliedPractice}
          </p>
        </div>
      )}
    </div>
  );
}
