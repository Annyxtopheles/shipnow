import { useState, type FormEvent } from 'react';
import { X, Plus, Check } from 'lucide-react';
import type { Invoice, InvoiceStatus } from '@/data/invoices';
import { Button } from '@/components/ui/Button';

const COMPANY_OPTIONS = [
  'TechGear Inc.',
  'StyleHub Co.',
  'FreshNest',
  'FitPlus Gear',
  'EcoLights',
  'AutoParts Pro',
  'GreenHaven',
  'ModaWear',
  'SunCore Panels',
  'QuickParts',
  'VitaFresh',
  'StyleDepot',
];

const PAYMENT_METHODS = ['Bank Wire', 'Credit Card', 'ACH Transfer'];

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (invoice: Invoice) => void;
}

export function CreateInvoiceModal({ open, onClose, onCreate }: CreateInvoiceModalProps) {
  const [company, setCompany] = useState(COMPANY_OPTIONS[0]);
  const [shipmentId, setShipmentId] = useState('#SH9283746');
  const [amount, setAmount] = useState('3450');
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [dueDateDays, setDueDateDays] = useState('15');
  const [description, setDescription] = useState('Freight Transportation & Handling');
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const numAmount = parseFloat(amount) || 1200;
    const now = new Date();
    const issueDate = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const due = new Date(now.getTime() + (parseInt(dueDateDays) || 15) * 24 * 60 * 60 * 1000);
    const dueDate = due.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newInvoice: Invoice = {
      id: `#INV-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      shipmentId: shipmentId.trim() || '#SH9482710',
      company,
      amount: numAmount,
      issueDate,
      dueDate,
      status: 'Pending' as InvoiceStatus,
      paymentMethod,
      items: [
        {
          description: description.trim() || 'Logistics Freight Service',
          qty: 1,
          rate: +(numAmount * 0.85).toFixed(2),
          total: +(numAmount * 0.85).toFixed(2),
        },
        {
          description: 'Fuel Surcharge & Handling',
          qty: 1,
          rate: +(numAmount * 0.15).toFixed(2),
          total: +(numAmount * 0.15).toFixed(2),
        },
      ],
    };

    setSuccess(true);
    setTimeout(() => {
      onCreate(newInvoice);
      setSuccess(false);
      onClose();
    }, 800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink-900">Create New Invoice</h2>
              <p className="text-xs text-ink-500">Bill a client for completed or active freight services</p>
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

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={24} />
            </div>
            <p className="mt-3 font-bold text-ink-900">Invoice Dispatched!</p>
            <p className="text-xs text-ink-500 mt-1">The billing statement has been generated and queued.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-ink-700">Client / Company</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2.5 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              >
                {COMPANY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Related Shipment ID</label>
                <input
                  type="text"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                  placeholder="e.g. #SH9283746"
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Total Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="3450.00"
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Payment Terms</label>
                <select
                  value={dueDateDays}
                  onChange={(e) => setDueDateDays(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="15">Net 15 Days</option>
                  <option value="30">Net 30 Days</option>
                  <option value="60">Net 60 Days</option>
                  <option value="0">Due on Receipt</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-ink-700">Service Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Cross-country freight transport"
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
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
                Create & Send Invoice
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
