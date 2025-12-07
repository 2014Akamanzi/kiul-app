"use client";

interface CourseSelectorProps {
  selectedCourses: string[];
  onCoursesChange: (courses: string[]) => void;
  maxCourses: number;
}

const AVAILABLE_COURSES = [
  'Academic Writing',
  'Ubuntu Leadership',
  'Research Methods',
  'Stress Management',
  'Communication Skills',
  'Entrepreneurship',
  'Career Development',
  'AI for Development Studies',
  'Digital Literacy',
  'Self-Motivation & Agency',
];

export default function CourseSelector({ 
  selectedCourses, 
  onCoursesChange,
  maxCourses 
}: CourseSelectorProps) {
  const handleToggle = (course: string) => {
    if (selectedCourses.includes(course)) {
      onCoursesChange(selectedCourses.filter(c => c !== course));
    } else {
      if (selectedCourses.length < maxCourses) {
        onCoursesChange([...selectedCourses, course]);
      }
    }
  };

  return (
    <div className="space-y-[var(--space-sm)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[var(--kiul-emerald-800)]">
          Select Courses
        </h3>
        <span className="text-sm text-[var(--kiul-text-medium)]">
          {selectedCourses.length}/{maxCourses} selected
        </span>
      </div>
      <div className="space-y-[var(--space-xs)]">
        {AVAILABLE_COURSES.map((course) => {
          const isSelected = selectedCourses.includes(course);
          const isDisabled = !isSelected && selectedCourses.length >= maxCourses;

          return (
            <label
              key={course}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[var(--kiul-emerald-50)] border-[var(--kiul-emerald-700)]'
                  : isDisabled
                  ? 'bg-gray-50 border-[var(--kiul-border)] opacity-50 cursor-not-allowed'
                  : 'bg-[var(--kiul-card-bg)] border-[var(--kiul-border)] hover:border-[var(--kiul-emerald-700)]'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(course)}
                disabled={isDisabled}
                className="w-5 h-5 text-[var(--kiul-emerald-700)] rounded focus:ring-2 focus:ring-[var(--kiul-emerald-600)]"
              />
              <span className={`text-sm font-medium ${
                isSelected 
                  ? 'text-[var(--kiul-emerald-900)]' 
                  : 'text-[var(--kiul-text-dark)]'
              }`}>
                {course}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
