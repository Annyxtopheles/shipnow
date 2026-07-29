import { Card } from '@/components/ui/Card';
import type { metricCards } from '@/data/dashboardStats';
import navShipments from '@/assets/icons/nav-shipments.png';
import navAnalytics from '@/assets/icons/nav-analytics.png';
import dollarIcon from '@/assets/icons/dollar.png';
import caretUp from '@/assets/icons/caret-up.png';

const icons = {
  'active-shipments': navShipments,
  'delivery-performance': navAnalytics,
  revenue: dollarIcon,
};

type Metric = (typeof metricCards)[number];

function MaskIcon({ src, className }: { src: string; className: string }) {
  return (
    <span
      role="img"
      aria-hidden="true"
      className={className}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

export function MetricCard({ metric }: { metric: Metric }) {
  const iconSrc = icons[metric.id as keyof typeof icons];
  const isUp = metric.changeDirection === 'up';

  return (
    <Card className="flex h-full items-start justify-between">
      <div>
        <p className="text-sm text-ink-500">{metric.label}</p>
        <p className="mt-2 text-2xl font-extrabold text-ink-900">
          {metric.value}
          {metric.unit && <span className="ml-1 text-sm font-medium text-ink-500">{metric.unit}</span>}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
          <span
            className="flex h-4 w-4 items-center justify-center rounded-full"
            style={{ backgroundColor: isUp ? '#D9F9E7' : '#FBDCDC' }}
          >
            <MaskIcon
              src={caretUp}
              className={`h-2.5 w-2.5 ${isUp ? 'bg-emerald-600' : 'rotate-180 bg-red-500'}`}
            />
          </span>
          <span className={isUp ? 'text-emerald-600' : 'text-red-500'}>{metric.change}</span>
          <span className="font-normal text-ink-500">{metric.changeContext}</span>
        </p>
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500">
        <MaskIcon src={iconSrc} className="h-[18px] w-[18px] bg-white" />
      </div>
    </Card>
  );
}
