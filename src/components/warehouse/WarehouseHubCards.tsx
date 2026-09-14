import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, User, ChevronRight, Layers } from 'lucide-react';
import type { WarehouseFacility } from '@/data/warehouse';

interface WarehouseHubCardsProps {
  facilities: WarehouseFacility[];
  selectedHubCode: string | null;
  onSelectHub: (code: string | null) => void;
  onInspectFacility: (facility: WarehouseFacility) => void;
}

export function WarehouseHubCards({
  facilities,
  selectedHubCode,
  onSelectHub,
  onInspectFacility,
}: WarehouseHubCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {facilities.map((fac) => {
        const isSelected = selectedHubCode === fac.code;
        const isHighCapacity = fac.capacityPercent >= 90;
        const isMediumCapacity = fac.capacityPercent >= 75 && fac.capacityPercent < 90;

        const progressColor = isHighCapacity
          ? 'bg-red-500'
          : isMediumCapacity
            ? 'bg-amber-500'
            : 'bg-brand-500';

        const badgeTone = isHighCapacity
          ? 'red'
          : isMediumCapacity
            ? 'yellow'
            : 'purple';

        return (
          <Card
            key={fac.id}
            className={`group cursor-pointer transition-all duration-200 hover:shadow-md ${
              isSelected ? 'ring-2 ring-brand-500 border-brand-300' : 'hover:border-ink-300'
            }`}
            onClick={() => onSelectHub(isSelected ? null : fac.code)}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-muted text-ink-900 border border-surface-border">
                    {fac.code}
                  </span>
                  <Badge tone={badgeTone}>
                    {fac.capacityPercent}% Capacity
                  </Badge>
                </div>
                <h3 className="mt-2 text-base font-bold text-ink-900 group-hover:text-brand-600 transition-colors">
                  {fac.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                  <MapPin size={13} className="shrink-0" />
                  <span>{fac.city}, {fac.state}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspectFacility(fac);
                }}
                className="rounded-lg p-1.5 text-ink-400 hover:bg-surface-muted hover:text-ink-700 transition-colors"
                title="View facility details"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Capacity Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-ink-500 font-medium">Storage Utilization</span>
                <span className="font-bold text-ink-900">{fac.capacityPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                  style={{ width: `${fac.capacityPercent}%` }}
                />
              </div>
            </div>

            {/* Specialties */}
            <div className="mt-3.5 flex flex-wrap gap-1">
              {fac.specialties.map((spec) => (
                <span
                  key={spec}
                  className="rounded px-2 py-0.5 text-[10px] font-medium bg-surface-muted text-ink-600 border border-surface-border/50"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-4 pt-3.5 border-t border-surface-border flex items-center justify-between text-xs text-ink-500">
              <div className="flex items-center gap-1.5">
                <Layers size={13} />
                <span>{(fac.totalAreaSqFt / 1000).toFixed(0)}k sq ft</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={13} />
                <span>{fac.manager}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
