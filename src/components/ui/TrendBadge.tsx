import trendArrow from '@/assets/icons/trend-arrow.png';

interface TrendBadgeProps {
  value: string;
  direction: 'up' | 'down';
}

export function TrendBadge({ value, direction }: TrendBadgeProps) {
  const isUp = direction === 'up';
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: isUp ? '#D9F9E7' : '#FBDCDC', color: isUp ? '#1A9A5B' : '#DC2626' }}
    >
      <span
        role="img"
        aria-hidden="true"
        className={`inline-block h-2 w-2 ${isUp ? 'bg-emerald-600' : 'rotate-90 bg-red-500'}`}
        style={{
          WebkitMaskImage: `url(${trendArrow})`,
          maskImage: `url(${trendArrow})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
      {value}
    </span>
  );
}
