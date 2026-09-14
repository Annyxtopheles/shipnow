import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { WarehouseInventoryItem, InventoryStatus } from '@/data/warehouse';

interface InboundStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (item: WarehouseInventoryItem) => void;
  defaultHubCode?: string | null;
}

export function InboundStockModal({
  isOpen,
  onClose,
  onAddStock,
  defaultHubCode,
}: InboundStockModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [warehouseCode, setWarehouseCode] = useState(defaultHubCode || 'LAX-01');
  const [quantity, setQuantity] = useState(100);
  const [zone, setZone] = useState('Zone Inbound Dock 1');
  const [status, setStatus] = useState<InventoryStatus>('Inbound');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    const newItem: WarehouseInventoryItem = {
      sku: `#SKU-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      company,
      warehouseCode,
      quantity: Number(quantity),
      allocated: 0,
      zone: zone || 'Zone Inbound Dock 1',
      status,
    };

    setSuccess(true);
    setTimeout(() => {
      onAddStock(newItem);
      setSuccess(false);
      setName('');
      setCompany('');
      setQuantity(100);
      setZone('Zone Inbound Dock 1');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink-900">Log Inbound Inventory Stock</h2>
            <p className="text-xs text-ink-500">Record stock arriving at regional distribution hubs</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={24} />
            </div>
            <p className="mt-3 font-bold text-ink-900">Inbound Stock Logged!</p>
            <p className="text-xs text-ink-500 mt-1">Inventory updated and assigned to {warehouseCode}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-ink-700">Product / Item Name</label>
              <input
                type="text"
                required
                placeholder="e.g. High-Density Lithium Batteries"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-ink-700">Consignor / Merchant</label>
              <input
                type="text"
                required
                placeholder="e.g. Voltaic Dynamics Co."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Destination Facility</label>
                <select
                  value={warehouseCode}
                  onChange={(e) => setWarehouseCode(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="LAX-01">LAX-01 (Los Angeles)</option>
                  <option value="ORD-02">ORD-02 (Chicago)</option>
                  <option value="DFW-03">DFW-03 (Dallas)</option>
                  <option value="JFK-04">JFK-04 (New York)</option>
                  <option value="ATL-05">ATL-05 (Atlanta)</option>
                  <option value="SEA-06">SEA-06 (Seattle)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Stock Quantity</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Assigned Zone / Aisle</label>
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="e.g. Zone B · Aisle 3 · Rack 1"
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InventoryStatus)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="Inbound">Inbound</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-surface-border pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-surface-border px-4 py-2 font-semibold text-ink-700 hover:bg-surface-muted text-xs"
              >
                Cancel
              </button>
              <Button type="submit" className="!px-5 !py-2 text-xs">
                Confirm Inbound Stock
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
