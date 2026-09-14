import { Card } from '@/components/ui/Card';
import { Truck, CheckCircle2, Wrench, Navigation } from 'lucide-react';
import type { FleetVehicle } from '@/data/fleets';

interface FleetMetricsProps {
  vehicles: FleetVehicle[];
}

export function FleetMetrics({ vehicles }: FleetMetricsProps) {
  const inTransitCount = vehicles.filter((v) => v.status === 'In Transit').length;
  const availableCount = vehicles.filter((v) => v.status === 'Available').length;
  const maintenanceCount = vehicles.filter((v) => v.status === 'Maintenance').length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Vehicles */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Total Commercial Fleet</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{vehicles.length} Units</p>
          <p className="mt-2 text-[11px] text-ink-500 font-medium">Class 6–8 & Air Cargo</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Truck size={20} />
        </div>
      </Card>

      {/* Active In-Transit */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Active In-Transit</p>
          <p className="mt-1.5 text-2xl font-extrabold text-brand-600">{inTransitCount} En Route</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Live telemetry synced</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <Navigation size={20} />
        </div>
      </Card>

      {/* Available */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Available at Hubs</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{availableCount} Ready</p>
          <p className="mt-2 text-[11px] text-ink-500">Ready for route assignment</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-700">
          <CheckCircle2 size={20} />
        </div>
      </Card>

      {/* Maintenance */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">In Service Bay</p>
          <p className="mt-1.5 text-2xl font-extrabold text-amber-600">{maintenanceCount} Unit</p>
          <p className="mt-2 text-[11px] text-ink-500">Scheduled oil & brake overhaul</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Wrench size={20} />
        </div>
      </Card>
    </div>
  );
}
