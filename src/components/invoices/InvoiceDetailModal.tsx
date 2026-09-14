import { X, CheckCircle, Download, Printer } from 'lucide-react';
import type { Invoice } from '@/data/invoices';
import { InvoiceStatusBadge } from '@/components/invoices/InvoiceTable';
import { Button } from '@/components/ui/Button';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onMarkPaid: (id: string) => void;
}

export function InvoiceDetailModal({ invoice, onClose, onMarkPaid }: InvoiceDetailModalProps) {
  if (!invoice) return null;

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-surface-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-ink-900">{invoice.id}</h2>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Client: <span className="font-semibold text-ink-900">{invoice.company}</span> · Shipment: {invoice.shipmentId}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Invoice Metadata */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-surface-muted p-3.5 text-xs">
          <div>
            <p className="text-ink-500">Date Issued</p>
            <p className="font-semibold text-ink-900">{invoice.issueDate}</p>
          </div>
          <div>
            <p className="text-ink-500">Payment Due</p>
            <p className="font-semibold text-ink-900">{invoice.dueDate}</p>
          </div>
          <div>
            <p className="text-ink-500">Payment Method</p>
            <p className="font-semibold text-ink-900">{invoice.paymentMethod}</p>
          </div>
          <div>
            <p className="text-ink-500">Account Ref</p>
            <p className="font-semibold text-brand-600">SN-CORP-9482</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mt-4">
          <p className="text-xs font-bold text-ink-900 mb-2">Freight & Handling Itemization</p>
          <div className="overflow-hidden rounded-xl border border-surface-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted text-ink-500">
                <tr>
                  <th className="py-2 pl-3 font-semibold">Description</th>
                  <th className="py-2 text-center font-semibold">Qty</th>
                  <th className="py-2 text-right font-semibold">Rate</th>
                  <th className="py-2 pr-3 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 pl-3 font-medium text-ink-900">{item.description}</td>
                    <td className="py-2.5 text-center text-ink-700">{item.qty}</td>
                    <td className="py-2.5 text-right text-ink-700">${item.rate.toFixed(2)}</td>
                    <td className="py-2.5 pr-3 text-right font-semibold text-ink-900">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="mt-3 space-y-1.5 text-xs text-ink-700 border-t border-surface-border pt-3">
          <div className="flex justify-between">
            <span className="text-ink-500">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-500">Freight Tax & Regulatory (8%):</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-ink-900 pt-1 border-t border-surface-border">
            <span>Total Amount Due:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-surface-border pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Simulated PDF receipt download for ${invoice.id}`)}
              className="flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-surface-muted transition"
            >
              <Download size={13} /> PDF
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-surface-muted transition"
            >
              <Printer size={13} /> Print
            </button>
          </div>

          <div className="flex items-center gap-2">
            {invoice.status !== 'Paid' && (
              <Button
                onClick={() => {
                  onMarkPaid(invoice.id);
                  onClose();
                }}
                className="flex items-center gap-1.5 !px-4 !py-2 text-xs"
              >
                <CheckCircle size={14} /> Mark as Paid
              </Button>
            )}
            <Button variant="secondary" onClick={onClose} className="!px-4 !py-2 text-xs">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
