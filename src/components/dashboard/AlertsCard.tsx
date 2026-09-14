import { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { shipmentAlerts } from '@/data/dashboardStats';
import alertCustoms from '@/assets/icons/alert-customs.png';
import alertAddress from '@/assets/icons/alert-address.png';
import alertWeather from '@/assets/icons/alert-weather.png';
import { AlertDetailModal, type AlertDetailItem } from '@/components/dashboard/AlertDetailModal';

const alertIcons: Record<string, string> = {
  'Customs Clearance Delay': alertCustoms,
  'Incorrect Address Provided': alertAddress,
  'Weather-Related Hold': alertWeather,
};

export function AlertsCard() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [items] = useState<AlertDetailItem[]>(shipmentAlerts.items);
  const [activeModalAlert, setActiveModalAlert] = useState<AlertDetailItem | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const displayedItems = selectedFilter ? items.filter((i) => i.label === selectedFilter) : items;

  function handleResolve(id: string) {
    setResolvedIds((prev) => new Set(prev).add(id));
  }

  const remainingCount = items.filter((i) => !resolvedIds.has(i.id)).length;

  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-ink-900">Shipment Alerts</h3>
          <p className="mt-1 text-xs text-ink-500">
            <span className="text-xl font-extrabold text-ink-900">{remainingCount}</span> Active Delays
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSelectedFilter(null)}
          title="Reset filter"
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
            selectedFilter ? 'bg-brand-100 text-brand-600 font-bold' : 'bg-surface-muted text-ink-500 hover:bg-surface-border'
          }`}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {shipmentAlerts.breakdown.map((b) => {
          const isSelected = selectedFilter === b.label;
          return (
            <button
              key={b.label}
              type="button"
              onClick={() => setSelectedFilter((prev) => (prev === b.label ? null : b.label))}
              className={`rounded-xl p-3 text-center transition cursor-pointer ${
                isSelected
                  ? 'bg-brand-500 text-white ring-2 ring-brand-500/20'
                  : 'bg-nav-active-bg text-ink-900 hover:bg-surface-border/50'
              }`}
            >
              <p className={`text-lg font-extrabold ${isSelected ? 'text-white' : 'text-ink-900'}`}>{b.count}</p>
              <p className={`mt-1 text-[11px] leading-tight ${isSelected ? 'text-white/85' : 'text-ink-500'}`}>
                {b.label}
              </p>
            </button>
          );
        })}
      </div>

      <ul className="space-y-3">
        {displayedItems.length === 0 ? (
          <li className="py-6 text-center text-xs text-ink-500">No active alerts in this category.</li>
        ) : (
          displayedItems.map((item) => {
            const isResolved = resolvedIds.has(item.id);
            return (
              <li
                key={item.id}
                onClick={() => setActiveModalAlert(item)}
                className={`flex items-start gap-3 rounded-xl p-1.5 transition cursor-pointer hover:bg-surface-muted/60 ${
                  isResolved ? 'opacity-40 line-through' : ''
                }`}
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F0F0F0]">
                  {isResolved ? (
                    <Check size={14} className="text-emerald-600" />
                  ) : (
                    <img src={alertIcons[item.label] || alertCustoms} alt="" className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-ink-900">{item.label}</p>
                  <p className="text-[11px] text-ink-500">
                    <span className="text-brand-500">{item.id}</span> · {item.route} · {item.date}
                  </p>
                </div>
                <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-ink-500" />
              </li>
            );
          })
        )}
      </ul>

      <AlertDetailModal
        alert={activeModalAlert}
        onClose={() => setActiveModalAlert(null)}
        onResolve={handleResolve}
      />
    </Card>
  );
}

