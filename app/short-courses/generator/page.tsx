"use client";

import { useState } from "react";
import { generateCoursePDF } from "@/app/lib/pdfGenerator";

export default function CourseGenerator() {
  const [stage, setStage] = useState("choose-tier");
  const [tier, setTier] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [response, setResponse] = useState("");
  const [modules, setModules] = useState<any[]>([]);

  const availableCourses = [
    "Leadership Foundations",
    "Ubuntu & Development",
    "Stress Management Skills",
    "Research Methods",
    "Communication Skills",
    "Academic Writing",
  ];

  const availableSkills = [
    "Critical Thinking",
    "Communication",
    "Teamwork",
    "Self-Awareness",
    "Decision-Making",
    "Emotional Intelligence",
  ];

  const tierLimits: Record<string, { courses: number; skills: number }> = {
    free: { courses: 1, skills: 1 },
    standard: { courses: 3, skills: 3 },
    premium: { courses: 5, skills: 5 },
  };

  const generateCourse = () => {
    const generatedModules = skills.map((skill, i) => ({
      title: `Module ${i + 1}: ${skill}`,
      thesis: "One paragraph setting the core idea.",
      antithesis:
        "Three paragraphs exploring challenges, alternatives, tensions, and real-world dilemmas.",
      synthesis: "One paragraph integrating thesis and antithesis harmoniously.",
      quiz: [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
      ].slice(0, Math.floor(Math.random() * 3) + 3),
    }));

    setModules(generatedModules);
    setResponse(JSON.stringify({ tier, courses, skills, modules: generatedModules }, null, 2));
    setStage("result");
  };

  const handleDownloadPDF = () => {
    const courseTitle = `KIUL Course: ${courses.join(", ")}`;
    const pdf = generateCoursePDF(courseTitle, modules);
    pdf.save("kiul-course.pdf");
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-[var(--kiul-text-dark)] mb-3">
        KIUL Short Course Generator
      </h1>
      <p className="text-[17px] text-[var(--kiul-text-soft)] mb-10 max-w-2xl">
        Select your tier, choose your courses and skills, and let KIUL AI build
        a personalised Ubuntu-based course for you.
      </p>

      <div className="max-w-[900px] mx-auto">
        {stage === "choose-tier" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose Your Tier</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["free", "standard", "premium"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTier(t);
                    setStage("courses");
                  }}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-[var(--kiul-green)]
                            transition font-semibold text-left bg-white"
                >
                  <div className="text-lg mb-2">{t.toUpperCase()}</div>
                  <div className="text-sm text-[var(--kiul-text-soft)]">
                    {t === "free" && "1 course + 1 skill"}
                    {t === "standard" && "3 courses + 3 skills"}
                    {t === "premium" && "5 courses + 5 skills"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === "courses" && (
          <div className="bg-white border rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-3">Select Courses</h2>
            <p className="text-sm text-[var(--kiul-text-soft)] mb-6">
              Tier limit: {tierLimits[tier].courses} courses
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCourses.map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={courses.includes(c)}
                    onChange={() => {
                      if (courses.includes(c)) {
                        setCourses(courses.filter((x) => x !== c));
                      } else if (courses.length < tierLimits[tier].courses) {
                        setCourses([...courses, c]);
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setStage("skills")}
              disabled={courses.length === 0}
              className="mt-6 px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl
                         hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
            >
              Continue →
            </button>
          </div>
        )}

        {stage === "skills" && (
          <div className="bg-white border rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-3">Select Skills</h2>
            <p className="text-sm text-[var(--kiul-text-soft)] mb-6">
              Tier limit: {tierLimits[tier].skills} skills
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableSkills.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={skills.includes(s)}
                    onChange={() => {
                      if (skills.includes(s)) {
                        setSkills(skills.filter((x) => x !== s));
                      } else if (skills.length < tierLimits[tier].skills) {
                        setSkills([...skills, s]);
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{s}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStage("courses")}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                ← Back
              </button>
              <button
                onClick={generateCourse}
                disabled={skills.length === 0}
                className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl
                           hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
              >
                Generate Course →
              </button>
            </div>
          </div>
        )}

        {stage === "result" && (
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--kiul-green)]">
              Your Course Is Ready!
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-[var(--kiul-text-dark)]">
                {response}
              </pre>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl
                           hover:bg-[var(--kiul-green-dark)] transition font-semibold"
              >
                📄 Download PDF
              </button>
              <button
                onClick={() => {
                  setStage("choose-tier");
                  setTier("");
                  setCourses([]);
                  setSkills([]);
                  setResponse("");
                  setModules([]);
                }}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                Create Another Course
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
