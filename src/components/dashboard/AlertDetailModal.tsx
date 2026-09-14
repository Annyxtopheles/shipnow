import { X, AlertTriangle, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AlertDetailItem {
  id: string;
  label: string;
  route: string;
  date: string;
}

interface AlertDetailModalProps {
  alert: AlertDetailItem | null;
  onClose: () => void;
  onResolve: (id: string) => void;
}

export function AlertDetailModal({ alert, onClose, onResolve }: AlertDetailModalProps) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink-900">{alert.label}</h3>
              <p className="text-xs text-ink-500">
                Shipment <span className="font-semibold text-brand-600">{alert.id}</span> · {alert.route}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs text-ink-700">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-900 border border-amber-200">
            <p className="font-semibold">Issue Logged on {alert.date}</p>
            <p className="mt-1 text-[11px] text-amber-800">
              The carrier reported an exception during route transit. Automatic customer notification was dispatched.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-ink-900">Recommended Resolution:</p>
            <div className="flex items-center gap-2 text-ink-600">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Verify carrier documents and customs commercial invoice.</span>
            </div>
            <div className="flex items-center gap-2 text-ink-600">
              <PhoneCall size={14} className="text-brand-500" />
              <span>Contact regional hub dispatcher to expedite handling.</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 border-t border-surface-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-surface-border px-4 py-2 text-xs font-semibold text-ink-700 hover:bg-surface-muted"
          >
            Dismiss
          </button>
          <Button
            onClick={() => {
              onResolve(alert.id);
              onClose();
            }}
            className="!px-4 !py-2 text-xs"
          >
            Mark as Resolved
          </Button>
        </div>
      </div>
    </div>
  );
}
