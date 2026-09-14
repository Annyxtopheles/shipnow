import { useNavigate } from 'react-router-dom';
import { X, Navigation, Calendar, CheckCircle2, Truck, PackageCheck } from 'lucide-react';
import { useShipments } from '@/context/ShipmentContext';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { ShipmentStatus } from '@/data/shipments';

const STATUS_OPTIONS: ShipmentStatus[] = ['In Transit', 'Out for Delivery', 'Processing', 'Delivered'];

export function ShipmentDetailModal() {
  const {
    selectedShipmentForDetail,
    setSelectedShipmentForDetail,
    updateShipmentStatus,
    setActiveTrackingShipment,
  } = useShipments();
  const navigate = useNavigate();

  if (!selectedShipmentForDetail) return null;

  const shipment = selectedShipmentForDetail;

  function handleTrackOnMap() {
    setActiveTrackingShipment(shipment.id);
    setSelectedShipmentForDetail(null);
    navigate('/dashboard');
  }

  function handleStatusChange(status: ShipmentStatus) {
    updateShipmentStatus(shipment.id, status);
    setSelectedShipmentForDetail({
      ...shipment,
      status,
      progress: status === 'Delivered' ? 100 : status === 'In Transit' ? 60 : status === 'Out for Delivery' ? 85 : 30,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedShipmentForDetail(null)}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-surface-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-ink-900">{shipment.id}</span>
              <StatusBadge status={shipment.status} />
            </div>
            <p className="mt-0.5 text-xs text-ink-500">
              {shipment.company} · <span className="text-ink-700 font-medium">{shipment.category}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedShipmentForDetail(null)}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Route Details */}
        <div className="mt-4 rounded-xl bg-surface-muted p-4">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-ink-500">Origin</span>
              <p className="mt-0.5 font-bold text-ink-900">{shipment.originCity}</p>
              <p className="flex items-center gap-1 text-[11px] text-ink-500">
                <Calendar size={12} /> {shipment.originDate}
              </p>
            </div>
            <div className="flex flex-col items-center px-3">
              <Navigation size={16} className="rotate-90 text-brand-500" />
              <span className="mt-1 text-[10px] font-semibold text-brand-600">{shipment.carrier}</span>
            </div>
            <div className="text-right">
              <span className="text-ink-500">Destination</span>
              <p className="mt-0.5 font-bold text-ink-900">{shipment.destinationCity}</p>
              <p className="flex items-center justify-end gap-1 text-[11px] text-ink-500">
                <Calendar size={12} /> {shipment.destinationDate}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-ink-500">
              <span>Overall Progress</span>
              <span className="font-bold text-ink-900">{shipment.progress}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-border">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-300"
                style={{ width: `${shipment.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status Milestones */}
        <div className="mt-5">
          <p className="text-xs font-bold text-ink-900">Update Status</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATUS_OPTIONS.map((st) => {
              const active = shipment.status === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  className={`rounded-xl border p-2.5 text-center text-xs font-semibold transition ${
                    active
                      ? 'border-brand-500 bg-brand-50 text-brand-600 ring-2 ring-brand-500/20'
                      : 'border-surface-border text-ink-700 hover:bg-surface-muted'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="mt-5 space-y-2 border-t border-surface-border pt-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 size={16} />
            <span className="font-medium text-ink-900">Order Dispatched from Origin Hub</span>
          </div>
          <div className={`flex items-center gap-2 ${shipment.progress >= 50 ? 'text-emerald-600' : 'text-ink-400'}`}>
            <Truck size={16} />
            <span className="font-medium text-ink-900">Departed Transit Facility</span>
          </div>
          <div className={`flex items-center gap-2 ${shipment.progress >= 85 ? 'text-emerald-600' : 'text-ink-400'}`}>
            <PackageCheck size={16} />
            <span className="font-medium text-ink-900">Out with Courier for Final Delivery</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-surface-border pt-4">
          <Button
            variant="secondary"
            onClick={handleTrackOnMap}
            className="flex items-center gap-1.5 !px-4 !py-2 text-xs"
          >
            <Navigation size={14} /> Live Tracking
          </Button>

          <Button
            onClick={() => setSelectedShipmentForDetail(null)}
            className="!px-5 !py-2 text-xs"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
