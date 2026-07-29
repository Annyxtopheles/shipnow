import { MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { shipmentAlerts } from '@/data/dashboardStats';
import alertCustoms from '@/assets/icons/alert-customs.png';
import alertAddress from '@/assets/icons/alert-address.png';
import alertWeather from '@/assets/icons/alert-weather.png';

const alertIcons: Record<string, string> = {
  'Customs Clearance Delay': alertCustoms,
  'Incorrect Address Provided': alertAddress,
  'Weather-Related Hold': alertWeather,
};

export function AlertsCard() {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-ink-900">Shipment Alerts</h3>
          <p className="mt-1 text-xs text-ink-500">
            <span className="text-xl font-extrabold text-ink-900">{shipmentAlerts.total}</span> Delays Detected
          </p>
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-ink-500">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {shipmentAlerts.breakdown.map((b) => (
          <div key={b.label} className="rounded-xl bg-nav-active-bg p-3 text-center">
            <p className="text-lg font-extrabold text-ink-900">{b.count}</p>
            <p className="mt-1 text-[11px] leading-tight text-ink-500">{b.label}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {shipmentAlerts.items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F0F0F0]">
              <img src={alertIcons[item.label]} alt="" className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-ink-900">{item.label}</p>
              <p className="text-[11px] text-ink-500">
                <span className="text-brand-500">{item.id}</span> · {item.route} · {item.date}
              </p>
            </div>
            <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-ink-500" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
