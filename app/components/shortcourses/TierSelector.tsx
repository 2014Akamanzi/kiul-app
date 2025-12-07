"use client";

interface TierSelectorProps {
  selectedTier: 'free' | 'standard' | 'premium';
  onTierChange: (tier: 'free' | 'standard' | 'premium') => void;
}

const TIERS = [
  {
    id: 'free' as const,
    name: 'Free',
    features: [
      '1 course',
      '1 skill',
      'Up to 2 modules',
      '3 quiz questions per module',
    ],
  },
  {
    id: 'standard' as const,
    name: 'Standard',
    features: [
      'Up to 3 courses',
      'Up to 3 skills',
      '3-4 modules',
      '4 quiz questions per module',
    ],
    recommended: true,
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    features: [
      'Up to 5 courses',
      'Up to 5 skills',
      '5 modules',
      '5 quiz questions per module',
      'Applied Practice module',
      'Downloadable PDF',
    ],
  },
];

export default function TierSelector({ selectedTier, onTierChange }: TierSelectorProps) {
  return (
    <div className="space-y-[var(--space-sm)]">
      <h3 className="text-lg font-bold text-[var(--kiul-emerald-800)]">
        Select Your Tier
      </h3>
      <div className="space-y-[var(--space-sm)]">
        {TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => onTierChange(tier.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all relative ${
                isSelected
                  ? 'border-[var(--kiul-emerald-700)] bg-[var(--kiul-emerald-50)] shadow-[var(--kiul-shadow-md)]'
                  : 'border-[var(--kiul-border)] bg-[var(--kiul-card-bg)] hover:border-[var(--kiul-emerald-700)]'
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-2 right-4 bg-[var(--kiul-emerald-700)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </span>
              )}
              
              <div className="flex items-center justify-between mb-2">
                <h4 className={`text-lg font-bold ${
                  isSelected 
                    ? 'text-[var(--kiul-emerald-900)]' 
                    : 'text-[var(--kiul-emerald-800)]'
                }`}>
                  {tier.name}
                </h4>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-[var(--kiul-emerald-700)] bg-[var(--kiul-emerald-700)]'
                    : 'border-[var(--kiul-border)]'
                }`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              
              <ul className="space-y-1">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[var(--kiul-text-medium)]">
                    <svg className="w-4 h-4 text-[var(--kiul-emerald-700)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
