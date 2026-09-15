import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, ArrowRight, Gauge, Clock } from 'lucide-react';
import type { LiveShipmentTelemetry } from '@/data/tracking';

interface TrackingSidebarListProps {
  shipments: LiveShipmentTelemetry[];
  selectedShipment: LiveShipmentTelemetry;
  onSelectShipment: (s: LiveShipmentTelemetry) => void;
}

export function TrackingSidebarList({
  shipments,
  selectedShipment,
  onSelectShipment,
}: TrackingSidebarListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Transit' | 'Out for Delivery'>('All');

  const filtered = shipments.filter((s) => {
    const matchesSearch =
      s.shipmentId.toLowerCase().includes(search.toLowerCase()) ||
      s.company.toLowerCase().includes(search.toLowerCase()) ||
      s.driverName.toLowerCase().includes(search.toLowerCase()) ||
      s.destinationCity.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="flex flex-col h-[480px] sm:h-[540px] p-0 overflow-hidden">
      {/* Header & Search */}
      <div className="p-3.5 border-b border-surface-border space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-900">En Route Shipments</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
            {filtered.length} Live
          </span>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID, driver, destination..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-surface-muted border border-surface-border text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1">
          {(['All', 'In Transit', 'Out for Delivery'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition ${
                statusFilter === tab
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-500 hover:text-ink-900 hover:bg-surface-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Shipment Items List */}
      <div className="flex-1 overflow-y-auto divide-y divide-surface-border">
        {filtered.map((s) => {
          const isSelected = s.shipmentId === selectedShipment.shipmentId;
          const tone = s.status === 'Out for Delivery' ? 'yellow' : 'blue';

          return (
            <div
              key={s.shipmentId}
              onClick={() => onSelectShipment(s)}
              className={`p-3.5 cursor-pointer transition-all duration-150 ${
                isSelected ? 'bg-brand-50/60 border-l-4 border-brand-500' : 'hover:bg-surface-muted/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-ink-900">{s.shipmentId}</span>
                    <Badge tone={tone}>{s.status}</Badge>
                  </div>
                  <p className="text-xs font-semibold text-ink-700 mt-0.5">{s.company}</p>
                </div>
                <span className="text-[11px] font-bold text-ink-900">{s.traveledPercent}%</span>
              </div>

              {/* Route snippet */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                <span className="truncate max-w-[90px]">{s.originCity}</span>
                <ArrowRight size={12} className="text-ink-400 shrink-0" />
                <span className="font-medium text-ink-900 truncate max-w-[100px]">{s.destinationCity}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-300"
                  style={{ width: `${s.traveledPercent}%` }}
                />
              </div>

              {/* Footer specs */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-500">
                <div className="flex items-center gap-1">
                  <Gauge size={12} />
                  <span>{s.currentSpeedMph} mph</span>
                </div>
                <div className="flex items-center gap-1 text-ink-700 font-medium">
                  <Clock size={12} className="text-brand-600" />
                  <span>{s.estimatedArrival}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
