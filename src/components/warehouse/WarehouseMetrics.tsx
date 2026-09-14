import { Card } from '@/components/ui/Card';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { Warehouse, Boxes, ArrowDownToDot, Activity } from 'lucide-react';
import type { WarehouseFacility, WarehouseInventoryItem } from '@/data/warehouse';

interface WarehouseMetricsProps {
  facilities: WarehouseFacility[];
  inventory: WarehouseInventoryItem[];
}

export function WarehouseMetrics({ facilities, inventory }: WarehouseMetricsProps) {
  const avgCapacity = facilities.length > 0
    ? Math.round(facilities.reduce((sum, f) => sum + f.capacityPercent, 0) / facilities.length)
    : 0;

  const totalStockUnits = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalAllocated = inventory.reduce((sum, item) => sum + item.allocated, 0);

  const totalInbound = facilities.reduce((sum, f) => sum + f.inboundToday, 0);
  const totalOutbound = facilities.reduce((sum, f) => sum + f.outboundToday, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Average Capacity */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Average Capacity</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{avgCapacity}%</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value="+3.8%" direction="up" />
            <span className="text-[11px] text-ink-500">vs last week</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Warehouse size={20} />
        </div>
      </Card>

      {/* Active Facilities */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Active Facilities</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{facilities.length} Hubs</p>
          <p className="mt-2 text-[11px] font-medium text-emerald-600">All operating nominally</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <Activity size={20} />
        </div>
      </Card>

      {/* Stock Units */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Total Stock Units</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{totalStockUnits.toLocaleString()}</p>
          <p className="mt-2 text-[11px] text-ink-500">{totalAllocated.toLocaleString()} allocated to orders</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Boxes size={20} />
        </div>
      </Card>

      {/* Daily Throughput */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Today's Throughput</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{totalInbound + totalOutbound} ops</p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-500">
            <span className="text-brand-600 font-medium">{totalInbound} inbound</span>
            <span>·</span>
            <span className="text-ink-700 font-medium">{totalOutbound} outbound</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-700">
          <ArrowDownToDot size={20} />
        </div>
      </Card>
    </div>
  );
}
