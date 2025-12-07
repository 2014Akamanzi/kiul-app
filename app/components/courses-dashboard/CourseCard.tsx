"use client";

interface CourseCardProps {
  id: string;
  title: string;
  overview: string;
  savedAt: string;
  tier: string;
  moduleCount: number;
  onView: () => void;
  onDelete: () => void;
}

export default function CourseCard({
  id,
  title,
  overview,
  savedAt,
  tier,
  moduleCount,
  onView,
  onDelete,
}: CourseCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'free':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'standard':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'premium':
        return 'bg-[var(--kiul-emerald-100)] text-[var(--kiul-emerald-800)] border-[var(--kiul-emerald-300)]';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="bg-[var(--kiul-card-bg)] border border-[var(--kiul-border)] rounded-xl p-6 shadow-[var(--kiul-shadow-soft)] hover:shadow-[var(--kiul-shadow-lg)] transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[var(--kiul-emerald-900)] mb-2 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getTierColor(tier)}`}>
              {tier.toUpperCase()}
            </span>
            <span className="text-xs text-[var(--kiul-text-medium)] flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {moduleCount} Module{moduleCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <p className="text-sm text-[var(--kiul-text-medium)] leading-relaxed mb-4 line-clamp-3">
        {overview}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--kiul-border)]">
        <div className="flex items-center gap-2 text-xs text-[var(--kiul-text-light)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Saved {formatDate(savedAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onView}
            className="px-4 py-2 bg-[var(--kiul-emerald-600)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--kiul-emerald-700)] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
