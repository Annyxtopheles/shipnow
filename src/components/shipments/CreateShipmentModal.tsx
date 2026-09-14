import { useState, type FormEvent } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useShipments } from '@/context/ShipmentContext';
import type { ShipmentCategory, ShipmentStatus } from '@/data/shipments';
import { Button } from '@/components/ui/Button';

const CATEGORIES: ShipmentCategory[] = [
  'Electronics',
  'Apparel',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Automotive',
  'Fashion',
  'Food & Beverage',
];

const CARRIERS = ['FedEx', 'DHL', 'UPS', 'USPS', 'Aramex', 'Local Courier'];
const STATUSES: ShipmentStatus[] = ['In Transit', 'Out for Delivery', 'Processing', 'Delivered'];

export function CreateShipmentModal() {
  const { isCreateModalOpen, setIsCreateModalOpen, addShipment } = useShipments();

  const [company, setCompany] = useState('');
  const [category, setCategory] = useState<ShipmentCategory>('Electronics');
  const [carrier, setCarrier] = useState('FedEx');
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [status, setStatus] = useState<ShipmentStatus>('In Transit');
  const [progress, setProgress] = useState(25);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isCreateModalOpen) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!company.trim()) newErrors.company = 'Company name is required';
    if (!originCity.trim()) newErrors.originCity = 'Origin city is required';
    if (!destinationCity.trim()) newErrors.destinationCity = 'Destination city is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const randomId = `#SH${Math.floor(1000000 + Math.random() * 9000000)}`;
    const now = new Date();
    const originDate = `${now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const destDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const destinationDate = `${destDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - 04:00 PM`;

    addShipment({
      id: randomId,
      company: company.trim(),
      category,
      carrier,
      originCity: originCity.trim(),
      originDate,
      destinationCity: destinationCity.trim(),
      destinationDate,
      progress: status === 'Delivered' ? 100 : progress,
      status,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsCreateModalOpen(false);
      // Reset form
      setCompany('');
      setOriginCity('');
      setDestinationCity('');
      setErrors({});
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCreateModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink-900">Create New Shipment</h2>
              <p className="text-xs text-ink-500">Add a new delivery order to your active shipments</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(false)}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {successMsg ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={28} />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink-900">Shipment Created Successfully!</h3>
            <p className="mt-1 text-xs text-ink-500">The new shipment has been added to your board.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-ink-700">Company Name *</label>
              <input
                type="text"
                placeholder="e.g. Apex Logistics, NovaTech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.company && <p className="mt-1 text-red-500">{errors.company}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ShipmentCategory)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2.5 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Carrier</label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2.5 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  {CARRIERS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Origin City & State *</label>
                <input
                  type="text"
                  placeholder="e.g. Los Angeles, CA"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3.5 py-2.5 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                />
                {errors.originCity && <p className="mt-1 text-red-500">{errors.originCity}</p>}
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Destination City & State *</label>
                <input
                  type="text"
                  placeholder="e.g. Chicago, IL"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3.5 py-2.5 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                />
                {errors.destinationCity && <p className="mt-1 text-red-500">{errors.destinationCity}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2.5 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Progress ({progress}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="mt-2.5 w-full accent-brand-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-surface-border pt-4">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-xl border border-surface-border px-4 py-2.5 font-semibold text-ink-700 hover:bg-surface-muted"
              >
                Cancel
              </button>
              <Button type="submit" className="!px-5 !py-2.5">
                Save & Dispatch
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
