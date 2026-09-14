import { Card } from '@/components/ui/Card';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { Radio, Gauge, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { LiveShipmentTelemetry } from '@/data/tracking';

interface TelemetryCardsProps {
  shipments: LiveShipmentTelemetry[];
}

export function TelemetryCards({ shipments }: TelemetryCardsProps) {
  const activeCount = shipments.filter((s) => s.status === 'In Transit' || s.status === 'Out for Delivery').length;
  const avgSpeed = Math.round(
    shipments.reduce((sum, s) => sum + s.currentSpeedMph, 0) / shipments.length
  );
  const alertCount = shipments.filter((s) => !!s.weatherAlert).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Active Feeds */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Active Freight Feeds</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{activeCount} Vehicles</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-medium text-emerald-600">100% GPS Signal Lock</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Radio size={20} />
        </div>
      </Card>

      {/* Avg Speed */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Average Transit Speed</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{avgSpeed} mph</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value="Nominal" direction="up" />
            <span className="text-[11px] text-ink-500">interstate flow</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-700">
          <Gauge size={20} />
        </div>
      </Card>

      {/* ETA Adherence */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">ETA Schedule Adherence</p>
          <p className="mt-1.5 text-2xl font-extrabold text-emerald-600">98.2%</p>
          <p className="mt-2 text-[11px] text-ink-500 font-medium">On-time delivery forecast</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={20} />
        </div>
      </Card>

      {/* Weather / Route Hazards */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Corridor Weather Alerts</p>
          <p className="mt-1.5 text-2xl font-extrabold text-amber-600">{alertCount} Active</p>
          <p className="mt-2 text-[11px] text-ink-500">I-20 corridor rain advisory</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <ShieldAlert size={20} />
        </div>
      </Card>
    </div>
  );
}
