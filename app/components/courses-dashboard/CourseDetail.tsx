"use client";

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

interface CourseData {
  courseTitle: string;
  overview: string;
  modules: Module[];
  appliedPractice?: string;
  tier: string;
}

interface CourseDetailProps {
  courseData: CourseData;
  onClose: () => void;
}

export default function CourseDetail({ courseData, onClose }: CourseDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[var(--kiul-background)] rounded-2xl shadow-[var(--kiul-shadow-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--kiul-emerald-700)] to-[var(--kiul-emerald-800)] text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  {courseData.tier} Course
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{courseData.courseTitle}</h2>
              <p className="text-emerald-50 leading-relaxed text-sm">
                {courseData.overview}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Modules */}
          {courseData.modules.map((module) => (
            <div
              key={module.moduleNumber}
              className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-6 shadow-[var(--kiul-shadow-soft)]"
            >
              {/* Module Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--kiul-border)]">
                <div className="w-10 h-10 bg-[var(--kiul-emerald-700)] text-white rounded-lg flex items-center justify-center font-bold">
                  {module.moduleNumber}
                </div>
                <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)]">
                  {module.moduleTitle}
                </h3>
              </div>

              {/* Module Content */}
              <div className="prose prose-emerald max-w-none space-y-6">
                {/* Introduction */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Introduction
                  </h4>
                  <p className="text-[var(--kiul-text-medium)] leading-relaxed text-sm">
                    {module.introduction}
                  </p>
                </div>

                {/* Thesis */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Thesis
                  </h4>
                  <p className="text-[var(--kiul-text-dark)] leading-relaxed font-medium text-sm">
                    {module.thesis}
                  </p>
                </div>

                {/* Antithesis */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Antithesis
                  </h4>
                  <div className="space-y-3">
                    {module.antithesis.map((para, index) => (
                      <p
                        key={index}
                        className="text-[var(--kiul-text-dark)] leading-relaxed pl-4 border-l-2 border-[var(--kiul-emerald-200)] text-sm"
                      >
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
                  <p className="text-[var(--kiul-text-dark)] leading-relaxed font-medium bg-[var(--kiul-emerald-50)] p-4 rounded-lg text-sm">
                    {module.synthesis}
                  </p>
                </div>

                {/* Conclusion */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--kiul-emerald-700)] uppercase tracking-wider mb-2">
                    Conclusion
                  </h4>
                  <p className="text-[var(--kiul-text-medium)] leading-relaxed text-sm">
                    {module.conclusion}
                  </p>
                </div>

                {/* Quiz */}
                <div className="border-t border-[var(--kiul-border)] pt-6">
                  <h4 className="text-lg font-bold text-[var(--kiul-emerald-800)] mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Module Quiz
                  </h4>
                  <div className="space-y-4">
                    {module.quiz.map((q, qIndex) => (
                      <div
                        key={qIndex}
                        className="bg-[var(--kiul-bg-soft)] p-4 rounded-lg"
                      >
                        <p className="font-semibold text-[var(--kiul-text-dark)] mb-3 text-sm">
                          {qIndex + 1}. {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => {
                            const optionLetter = option.charAt(0);
                            const isCorrect = q.correctAnswer === optionLetter;

                            return (
                              <div
                                key={oIndex}
                                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                                  isCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-[var(--kiul-border)]'
                                }`}
                              >
                                <span className="text-xs font-medium">
                                  {option}
                                </span>
                                {isCorrect && (
                                  <svg
                                    className="w-5 h-5 text-green-600 ml-auto"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Applied Practice (Premium Only) */}
          {courseData.appliedPractice && (
            <div className="bg-gradient-to-br from-[var(--kiul-emerald-50)] to-[var(--kiul-bg-soft)] border-2 border-[var(--kiul-emerald-700)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)]">
                  Applied Practice
                </h3>
                <span className="ml-auto bg-[var(--kiul-emerald-700)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  PREMIUM
                </span>
              </div>
              <p className="text-[var(--kiul-text-dark)] leading-relaxed text-sm">
                {courseData.appliedPractice}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[var(--kiul-bg-soft)] border-t border-[var(--kiul-border)] p-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-[var(--kiul-emerald-600)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--kiul-emerald-700)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
