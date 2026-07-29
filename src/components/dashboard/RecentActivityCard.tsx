import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { recentActivity } from '@/data/dashboardStats';
import shipmentIcon from '@/assets/icons/activity-shipment.png';
import tagIcon from '@/assets/icons/activity-tag.png';
import returnIcon from '@/assets/icons/activity-return.png';
import resolvedIcon from '@/assets/icons/activity-resolved.png';

// One icon per activity, in the order the activities occur.
const activityIcons = [shipmentIcon, tagIcon, returnIcon, resolvedIcon];

export function RecentActivityCard() {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold text-ink-900">Recent Activity</h3>
        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-ink-500">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <ul className="flex-1">
        {recentActivity.map((item, index) => {
          const isLast = index === recentActivity.length - 1;
          const isEvenCircle = index % 2 === 0;

          return (
            <li key={item.id} className="relative flex items-start gap-3 pb-5 last:pb-1">
              <span
                className="absolute bottom-0 left-4 top-8 w-px -translate-x-1/2 bg-surface-border"
                aria-hidden="true"
              />
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isEvenCircle ? 'bg-nav-active-bg' : 'bg-[#E0E0E0]'
                }`}
              >
                {isLast ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full ring-1 ring-ink-500">
                    <img src={activityIcons[index % activityIcons.length]} alt="" className="h-2 w-2" />
                  </span>
                ) : (
                  <img src={activityIcons[index % activityIcons.length]} alt="" className="h-3 w-3" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-ink-700">
                  <span className="font-semibold text-ink-900">{item.role}</span>{' '}
                  <span className="font-semibold text-sky-600">{item.user}</span> {item.action}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-500">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}