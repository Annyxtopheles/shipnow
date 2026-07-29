interface BadgeProps {
  children: React.ReactNode;
  tone?: 'purple' | 'black' | 'gray' | 'green' | 'red' | 'yellow' | 'blue';
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  purple: 'bg-brand-100 text-brand-700',
  black: 'bg-ink-900 text-white',
  gray: 'bg-surface-muted text-ink-700',
  green: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-500',
  yellow: 'bg-amber-50 text-amber-600',
  blue: 'bg-sky-50 text-sky-600',
};

export function Badge({ children, tone = 'gray', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

const statusTone: Record<string, BadgeProps['tone']> = {
  'In Transit': 'blue',
  'Out for Delivery': 'yellow',
  Delivered: 'green',
  Processing: 'purple',
  Cancelled: 'red',
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={statusTone[status] ?? 'gray'}>{status}</Badge>;
}
