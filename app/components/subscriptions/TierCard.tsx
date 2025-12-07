"use client";

interface TierFeature {
  text: string;
  included: boolean;
}

interface TierCardProps {
  name: string;
  price: string;
  priceDetail?: string;
  description: string;
  features: TierFeature[];
  isPopular?: boolean;
  ctaText: string;
  onSubscribe: () => void;
}

export default function TierCard({
  name,
  price,
  priceDetail,
  description,
  features,
  isPopular = false,
  ctaText,
  onSubscribe,
}: TierCardProps) {
  return (
    <div
      className={`relative bg-[var(--kiul-card-bg)] rounded-2xl p-8 shadow-[var(--kiul-shadow-soft)] hover:shadow-[var(--kiul-shadow-lg)] transition-all duration-300 flex flex-col ${
        isPopular
          ? 'border-2 border-[var(--kiul-emerald-600)] transform lg:scale-105'
          : 'border border-[var(--kiul-emerald-200)]'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-[var(--kiul-emerald-600)] to-[var(--kiul-emerald-700)] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Tier Name */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--kiul-emerald-900)] mb-2">
          {name}
        </h3>
        <p className="text-sm text-[var(--kiul-text-medium)]">{description}</p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-8 pb-8 border-b border-[var(--kiul-border)]">
        <div className="flex items-baseline justify-center gap-2">
          {price === "Free" ? (
            <span className="text-5xl font-bold text-[var(--kiul-emerald-800)]">
              Free
            </span>
          ) : (
            <>
              <span className="text-2xl font-semibold text-[var(--kiul-text-medium)]">
                $
              </span>
              <span className="text-5xl font-bold text-[var(--kiul-emerald-800)]">
                {price}
              </span>
              <span className="text-lg text-[var(--kiul-text-medium)]">/month</span>
            </>
          )}
        </div>
        {priceDetail && (
          <p className="text-xs text-[var(--kiul-text-light)] mt-2">
            {priceDetail}
          </p>
        )}
      </div>

      {/* Features List */}
      <div className="flex-1 mb-8">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <svg
                  className="w-5 h-5 text-[var(--kiul-emerald-600)] flex-shrink-0 mt-0.5"
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
              ) : (
                <svg
                  className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <span
                className={`text-sm ${
                  feature.included
                    ? 'text-[var(--kiul-text-dark)]'
                    : 'text-gray-400 line-through'
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={onSubscribe}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
          isPopular
            ? 'bg-gradient-to-r from-[var(--kiul-emerald-600)] to-[var(--kiul-emerald-700)] text-white hover:from-[var(--kiul-emerald-700)] hover:to-[var(--kiul-emerald-800)] shadow-md hover:shadow-lg'
            : 'bg-[var(--kiul-emerald-600)] text-white hover:bg-[var(--kiul-emerald-700)]'
        }`}
      >
        {ctaText}
      </button>
    </div>
  );
}
