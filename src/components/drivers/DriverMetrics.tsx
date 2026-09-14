import { Card } from '@/components/ui/Card';
import { Users, Navigation, Star, ShieldCheck } from 'lucide-react';
import type { CommercialDriver } from '@/data/drivers';

interface DriverMetricsProps {
  drivers: CommercialDriver[];
}

export function DriverMetrics({ drivers }: DriverMetricsProps) {
  const drivingCount = drivers.filter((d) => d.status === 'Driving').length;
  const avgRating = (
    drivers.reduce((sum, d) => sum + d.safetyRating, 0) / drivers.length
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Drivers */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Commercial Drivers Roster</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{drivers.length} Drivers</p>
          <p className="mt-2 text-[11px] text-ink-500 font-medium">CDL-A, HazMat & Cargo Aviation</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Users size={20} />
        </div>
      </Card>

      {/* Active Driving */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Currently On Highway/Air</p>
          <p className="mt-1.5 text-2xl font-extrabold text-brand-600">{drivingCount} Active</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Live ELD telemetry synced</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <Navigation size={20} />
        </div>
      </Card>

      {/* Safety Score */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Roster Safety Score</p>
          <p className="mt-1.5 text-2xl font-extrabold text-amber-500 flex items-center gap-1">
            <Star size={20} fill="currentColor" />
            {avgRating} <span className="text-sm text-ink-500 font-normal">/ 5.0</span>
          </p>
          <p className="mt-2 text-[11px] text-ink-500">4.4M+ combined accident-free miles</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Star size={20} />
        </div>
      </Card>

      {/* HOS Compliance */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">FMCSA HOS Compliance</p>
          <p className="mt-1.5 text-2xl font-extrabold text-emerald-600">100%</p>
          <p className="mt-2 text-[11px] text-ink-500">Zero duty-time violations</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
          <ShieldCheck size={20} />
        </div>
      </Card>
    </div>
  );
}
