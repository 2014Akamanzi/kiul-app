"use client";

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  maxSkills: number;
}

const AVAILABLE_SKILLS = [
  'Critical Thinking',
  'Problem Solving',
  'Communication',
  'Leadership',
  'Creativity',
  'Stress Management',
  'Academic Reasoning',
  'Data Interpretation',
  'Ethical Decision-Making',
  'Time Management',
];

export default function SkillSelector({ 
  selectedSkills, 
  onSkillsChange,
  maxSkills 
}: SkillSelectorProps) {
  const handleToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      if (selectedSkills.length < maxSkills) {
        onSkillsChange([...selectedSkills, skill]);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[var(--kiul-emerald-800)]">
          Select Skills
        </h3>
        <span className="text-xs text-[var(--kiul-text-medium)]">
          {selectedSkills.length}/{maxSkills} selected
        </span>
      </div>
      <div className="space-y-1">
        {AVAILABLE_SKILLS.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          const isDisabled = !isSelected && selectedSkills.length >= maxSkills;

          return (
            <label
              key={skill}
              className={`flex items-center gap-2 p-2 rounded-md border transition-all cursor-pointer ${
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
                onChange={() => handleToggle(skill)}
                disabled={isDisabled}
                className="w-4 h-4 text-[var(--kiul-emerald-700)] rounded focus:ring-1 focus:ring-[var(--kiul-emerald-600)]"
              />
              <span className={`text-xs font-medium ${
                isSelected 
                  ? 'text-[var(--kiul-emerald-900)]' 
                  : 'text-[var(--kiul-text-dark)]'
              }`}>
                {skill}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
