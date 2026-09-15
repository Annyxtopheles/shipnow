import { Card } from '@/components/ui/Card';
import { Check, Clock, Circle, MapPin, Phone, ShieldCheck } from 'lucide-react';
import type { LiveShipmentTelemetry } from '@/data/tracking';

interface TrackingMilestoneTimelineProps {
  shipment: LiveShipmentTelemetry;
}

export function TrackingMilestoneTimeline({ shipment }: TrackingMilestoneTimelineProps) {
  return (
    <Card className="space-y-5">
      {/* Top summary header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-ink-900">Route Waypoint Manifest</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface-muted text-ink-700 border border-surface-border">
              {shipment.trackingNumber}
            </span>
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            Carrier: <strong className="text-ink-700">{shipment.carrier}</strong> · Vehicle: <strong className="text-ink-700">{shipment.vehicleId}</strong>
          </p>
        </div>

        {/* Quick Driver Contact Box */}
        <div className="flex items-center gap-3 bg-surface-muted px-3.5 py-2 rounded-xl border border-surface-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Phone size={14} />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-ink-900">{shipment.driverName}</p>
            <p className="text-[11px] text-ink-500">{shipment.driverPhone}</p>
          </div>
        </div>
      </div>

      {/* Vertical Milestone Flow */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-border">
        {shipment.milestones.map((m) => {
          const isDone = m.status === 'completed';
          const isInProgress = m.status === 'in_progress';

          return (
            <div key={m.id} className="relative group">
              {/* Node Icon */}
              <div className="absolute -left-6 top-0.5 flex items-center justify-center">
                {isDone ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                ) : isInProgress ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white ring-4 ring-brand-100 animate-pulse">
                    <Clock size={11} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-muted text-ink-400 ring-4 ring-white">
                    <Circle size={10} />
                  </div>
                )}
              </div>

              {/* Milestone Details */}
              <div className="pl-3">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4
                    className={`text-xs font-bold ${
                      isInProgress ? 'text-brand-600' : isDone ? 'text-ink-900' : 'text-ink-400'
                    }`}
                  >
                    {m.title}
                  </h4>
                  <span className="text-[11px] font-medium text-ink-400">{m.timestamp}</span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                  <MapPin size={12} className="shrink-0 text-ink-400" />
                  <span>{m.location}</span>
                </div>

                {m.notes && (
                  <div className="mt-2 rounded-lg bg-surface-muted p-2.5 text-xs text-ink-700 border border-surface-border/60">
                    <div className="flex items-center gap-1.5 text-brand-700 font-semibold mb-0.5 text-[11px]">
                      <ShieldCheck size={13} />
                      <span>Telemetry Verification Log</span>
                    </div>
                    {m.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
