import { X, MapPin, User, Layers, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { WarehouseFacility, WarehouseInventoryItem } from '@/data/warehouse';

interface WarehouseDetailModalProps {
  facility: WarehouseFacility | null;
  inventory: WarehouseInventoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onFilterHub: (code: string) => void;
}

export function WarehouseDetailModal({
  facility,
  inventory,
  isOpen,
  onClose,
  onFilterHub,
}: WarehouseDetailModalProps) {
  if (!isOpen || !facility) return null;

  const facilityItems = inventory.filter((item) => item.warehouseCode === facility.code);
  const totalStock = facilityItems.reduce((sum, item) => sum + item.quantity, 0);

  const isHighCapacity = facility.capacityPercent >= 90;
  const isMediumCapacity = facility.capacityPercent >= 75 && facility.capacityPercent < 90;

  const badgeTone = isHighCapacity
    ? 'red'
    : isMediumCapacity
      ? 'yellow'
      : 'purple';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold px-2 py-0.5 rounded bg-surface-muted text-ink-900 border border-surface-border">
              {facility.code}
            </span>
            <Badge tone={badgeTone}>
              {facility.capacityPercent}% Utilized
            </Badge>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-ink-900">{facility.name}</h2>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                <MapPin size={13} />
                <span>{facility.city}, {facility.state} · United States</span>
              </div>
            </div>
            <Button
              variant="secondary"
              className="!px-3 !py-1.5 text-xs"
              onClick={() => {
                onFilterHub(facility.code);
                onClose();
              }}
            >
              Filter Table By Hub
            </Button>
          </div>

          {/* 4 Stat Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-surface-muted border border-surface-border">
              <p className="text-[11px] font-medium text-ink-500">Total Area</p>
              <p className="mt-1 text-base font-bold text-ink-900 flex items-center gap-1">
                <Layers size={14} className="text-ink-400" />
                {facility.totalAreaSqFt.toLocaleString()} sq ft
              </p>
            </div>
            <div className="p-3 rounded-xl bg-surface-muted border border-surface-border">
              <p className="text-[11px] font-medium text-ink-500">Facility Manager</p>
              <p className="mt-1 text-base font-bold text-ink-900 flex items-center gap-1">
                <User size={14} className="text-ink-400" />
                {facility.manager}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-surface-muted border border-surface-border">
              <p className="text-[11px] font-medium text-ink-500">Inbound Today</p>
              <p className="mt-1 text-base font-bold text-brand-600 flex items-center gap-1">
                <ArrowDownLeft size={14} />
                {facility.inboundToday} manifests
              </p>
            </div>
            <div className="p-3 rounded-xl bg-surface-muted border border-surface-border">
              <p className="text-[11px] font-medium text-ink-500">Outbound Today</p>
              <p className="mt-1 text-base font-bold text-ink-900 flex items-center gap-1">
                <ArrowUpRight size={14} className="text-emerald-600" />
                {facility.outboundToday} dispatches
              </p>
            </div>
          </div>

          {/* Capacity Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-ink-500 font-medium">Volumetric Capacity</span>
              <span className="font-bold text-ink-900">{facility.capacityPercent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={`h-full rounded-full ${
                  isHighCapacity ? 'bg-red-500' : isMediumCapacity ? 'bg-amber-500' : 'bg-brand-500'
                }`}
                style={{ width: `${facility.capacityPercent}%` }}
              />
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-xs font-semibold text-ink-700 uppercase tracking-wider mb-2">
              Facility Specialties & Capabilities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {facility.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Items housed at this hub */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-semibold text-ink-700 uppercase tracking-wider">
                Inventory Housed ({facilityItems.length} SKUs · {totalStock.toLocaleString()} units)
              </h4>
            </div>
            <div className="rounded-xl border border-surface-border overflow-hidden divide-y divide-surface-border text-xs">
              {facilityItems.map((item) => (
                <div key={item.sku} className="p-3 flex items-center justify-between hover:bg-surface-muted/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-900">{item.sku}</span>
                      <span className="text-ink-700 font-medium">{item.name}</span>
                    </div>
                    <div className="text-[11px] text-ink-500 mt-0.5">
                      {item.company} · {item.zone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-ink-900">{item.quantity.toLocaleString()} units</div>
                    <div className="text-[11px] text-ink-500">{item.allocated} allocated</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex justify-end">
            <Button variant="secondary" className="!px-4 !py-2 text-xs" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
