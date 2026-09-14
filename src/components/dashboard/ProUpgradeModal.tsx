import { useState } from 'react';
import { X, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProUpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProUpgradeModal({ open, onClose }: ProUpgradeModalProps) {
  const [subscribed, setSubscribed] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink-900">ShipNow Pro</h3>
              <p className="text-xs text-ink-500">Supercharge your logistics operations</p>
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

        {subscribed ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="mt-3 font-bold text-ink-900">Welcome to ShipNow Pro!</h4>
            <p className="mt-1 text-xs text-ink-500">Your account has been upgraded with unlimited live telemetry.</p>
            <Button onClick={onClose} className="mt-5 !px-6 !py-2 text-xs">
              Continue
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-4 text-xs">
            <div className="rounded-xl bg-surface-muted p-4">
              <span className="text-xs text-ink-500">Monthly Plan</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-ink-900">$49</span>
                <span className="text-xs text-ink-500">/ month</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-ink-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Unlimited live GPS tracking and route telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Automated customs clearance alerts and automated resolution</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Full API access for enterprise ERPs & Shopify</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>24/7 dedicated logistics manager support</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-surface-border pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-surface-border px-4 py-2 text-xs font-semibold text-ink-700 hover:bg-surface-muted"
              >
                Cancel
              </button>
              <Button
                onClick={() => setSubscribed(true)}
                className="flex items-center gap-1.5 !px-4 !py-2 text-xs"
              >
                <Zap size={14} /> Start 14-Day Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
