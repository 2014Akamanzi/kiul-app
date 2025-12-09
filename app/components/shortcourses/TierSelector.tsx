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
      'Basic modules',
    ],
  },
  {
    id: 'standard' as const,
    name: 'Standard',
    features: [
      'Up to 3 courses',
      'Up to 3 skills',
      'Full modules',
    ],
    recommended: true,
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    features: [
      'Up to 5 courses',
      'Up to 5 skills',
      'Advanced modules',
    ],
  },
];

export default function TierSelector({ selectedTier, onTierChange }: TierSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
      {TIERS.map((tier) => {
        const isSelected = selectedTier === tier.id;
        const colorClasses = 
          tier.id === 'free' 
            ? 'border-blue-300 bg-blue-50' 
            : tier.id === 'standard'
            ? 'border-emerald-400 bg-emerald-100'
            : 'border-purple-300 bg-purple-50';

        return (
          <button
            key={tier.id}
            onClick={() => onTierChange(tier.id)}
            className={`p-2 rounded-lg border-2 transition-all relative min-h-[140px] flex flex-col ${colorClasses} ${
              isSelected 
                ? `shadow-md ring-2 ring-offset-2 ${tier.id === 'free' ? 'ring-blue-400' : tier.id === 'standard' ? 'ring-emerald-400' : 'ring-purple-400'}`
                : 'shadow-sm opacity-70 hover:opacity-100'
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap z-10">
                RECOMMENDED
              </div>
            )}
            
            <h4 className={`font-bold text-[11px] mb-1 text-center ${
              tier.id === 'free' ? 'text-blue-900' : tier.id === 'standard' ? 'text-emerald-900' : 'text-purple-900'
            }`}>
              {tier.name}
            </h4>
            
            <ul className="space-y-0.5 flex-1">
              {tier.features.map((feature, index) => (
                <li key={index} className={`text-[9px] leading-tight ${
                  tier.id === 'free' ? 'text-blue-700' : tier.id === 'standard' ? 'text-emerald-700' : 'text-purple-700'
                }`}>
                  • {feature}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
