import { Card } from '@/components/ui/Card';
import { MapPin, TrendingUp } from 'lucide-react';
import { seedRegionalVolumes } from '@/data/analytics';

export function RegionalVolumeChart() {
  return (
    <Card className="h-[380px] p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-ink-900">Regional Distribution Share</h3>
          <p className="text-xs text-ink-500 mt-0.5">Freight density across geographic quadrants</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-around space-y-3.5">
        {seedRegionalVolumes.map((item) => (
          <div key={item.region} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-brand-600" />
                <span className="font-semibold text-ink-900">{item.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-ink-600">{item.volume.toLocaleString()} units</span>
                <span className="font-bold text-ink-900">{item.percentage}%</span>
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp size={11} />
                  {item.growth}
                </span>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-500"
                style={{ width: `${item.percentage * 2.2}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-surface-border flex items-center justify-between text-[11px] text-ink-500">
        <span>West Coast remains primary intermodal conduit</span>
        <span className="font-bold text-ink-900">221,500 Total YTD</span>
      </div>
    </Card>
  );
}
