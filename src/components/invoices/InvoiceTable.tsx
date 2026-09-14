import { useState } from 'react';
import { ArrowUpDown, Check, Eye, Download } from 'lucide-react';
import type { Invoice, InvoiceStatus } from '@/data/invoices';
import logoTechgear from '@/assets/icons/logo-techgear.png';
import logoStylehub from '@/assets/icons/logo-stylehub.png';
import logoFreshnest from '@/assets/icons/logo-freshnest.png';
import logoFitplusgear from '@/assets/icons/logo-fitplusgear.png';
import logoEcolights from '@/assets/icons/logo-ecolights.png';
import logoAutopartspro from '@/assets/icons/logo-autopluspro.png';
import logoGreenhaven from '@/assets/icons/logo-greenheven.png';
import logoModawear from '@/assets/icons/logo-modawater.png';
import logoSuncorepanels from '@/assets/icons/logo-suncorepanels.png';
import logoQuickparts from '@/assets/icons/logo-quickparts.png';
import logoVitafresh from '@/assets/icons/logo-vitafresh.png';
import logoStyledepot from '@/assets/icons/logo-styledepot.png';

const companyLogos: Record<string, string> = {
  'TechGear Inc.': logoTechgear,
  'StyleHub Co.': logoStylehub,
  FreshNest: logoFreshnest,
  'FitPlus Gear': logoFitplusgear,
  EcoLights: logoEcolights,
  'AutoParts Pro': logoAutopartspro,
  GreenHaven: logoGreenhaven,
  ModaWear: logoModawear,
  'SunCore Panels': logoSuncorepanels,
  QuickParts: logoQuickparts,
  VitaFresh: logoVitafresh,
  StyleDepot: logoStyledepot,
};

type InvoiceSortKey = 'id' | 'company' | 'amount' | 'dueDate' | 'status';

interface InvoiceTableProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    Paid: 'bg-emerald-100 text-emerald-800',
    Pending: 'bg-brand-100 text-brand-800',
    Overdue: 'bg-red-100 text-red-800',
    Draft: 'bg-gray-100 text-ink-700',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

export function InvoiceTable({ invoices, onSelectInvoice }: InvoiceTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<InvoiceSortKey>('dueDate');
  const [sortAsc, setSortAsc] = useState(true);

  const isAllSelected = invoices.length > 0 && invoices.every((i) => selectedIds.has(i.id));
  const isSomeSelected = invoices.some((i) => selectedIds.has(i.id));

  function toggleSelectAll() {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(invoices.map((i) => i.id)));
    }
  }

  function toggleRow(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSort(key: InvoiceSortKey) {
    if (sortKey === key) {
      setSortAsc((a) => !a);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function handleDownloadCSV(e: React.MouseEvent) {
    e.stopPropagation();
    const rowsToExport = selectedIds.size > 0 ? invoices.filter((i) => selectedIds.has(i.id)) : invoices;
    const csv =
      'data:text/csv;charset=utf-8,' +
      ['Invoice ID,Company,Shipment ID,Amount,Issue Date,Due Date,Status,Payment Method']
        .concat(
          rowsToExport.map(
            (i) =>
              `"${i.id}","${i.company}","${i.shipmentId}","${i.amount}","${i.issueDate}","${i.dueDate}","${i.status}","${i.paymentMethod}"`,
          ),
        )
        .join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `invoices_${Date.now()}.csv`;
    link.click();
  }

  const sorted = [...invoices].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === 'id') return a.id.localeCompare(b.id) * dir;
    if (sortKey === 'company') return a.company.localeCompare(b.company) * dir;
    if (sortKey === 'amount') return (a.amount - b.amount) * dir;
    if (sortKey === 'dueDate') return a.dueDate.localeCompare(b.dueDate) * dir;
    if (sortKey === 'status') return a.status.localeCompare(b.status) * dir;
    return 0;
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-border bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3 bg-white">
        <div className="text-xs text-ink-500">
          Showing <span className="font-semibold text-ink-900">{invoices.length}</span> invoices
          {selectedIds.size > 0 && <span className="ml-2 font-semibold text-brand-600">· {selectedIds.size} selected</span>}
        </div>
        <button
          type="button"
          onClick={handleDownloadCSV}
          className="flex items-center gap-1.5 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-surface-muted transition"
        >
          <Download size={13} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-xs">
          <thead>
            <tr className="border-b border-surface-border bg-nav-active-bg text-ink-700">
              <th className="w-10 py-3.5 pl-4">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  aria-label="Select all"
                  className={`flex h-4 w-4 items-center justify-center rounded transition ${
                    isAllSelected
                      ? 'bg-brand-500 text-white'
                      : isSomeSelected
                      ? 'bg-brand-300 text-white'
                      : 'bg-black/20 hover:bg-black/30'
                  }`}
                >
                  {(isAllSelected || isSomeSelected) && <Check size={11} strokeWidth={3} />}
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('id')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Invoice ID <ArrowUpDown size={12} className={sortKey === 'id' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('company')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Client <ArrowUpDown size={12} className={sortKey === 'company' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">Shipment</th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('dueDate')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Due Date <ArrowUpDown size={12} className={sortKey === 'dueDate' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('amount')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Amount <ArrowUpDown size={12} className={sortKey === 'amount' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">Method</th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('status')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Status <ArrowUpDown size={12} className={sortKey === 'status' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 pr-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {sorted.map((invoice) => {
              const isChecked = selectedIds.has(invoice.id);
              const logo = companyLogos[invoice.company];

              return (
                <tr
                  key={invoice.id}
                  onClick={() => onSelectInvoice(invoice)}
                  className="cursor-pointer transition hover:bg-surface-muted/60"
                >
                  <td className="py-3.5 pl-4">
                    <button
                      type="button"
                      onClick={(e) => toggleRow(invoice.id, e)}
                      aria-pressed={isChecked}
                      aria-label={`Select ${invoice.id}`}
                      className={`flex h-4 w-4 items-center justify-center rounded transition ${
                        isChecked ? 'bg-brand-500 text-white' : 'bg-black/20 hover:bg-black/30'
                      }`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </button>
                  </td>

                  <td className="py-3.5 font-bold text-ink-900">{invoice.id}</td>

                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      {logo ? (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-muted p-1">
                          <img src={logo} alt="" className="h-5 w-5 object-contain" />
                        </span>
                      ) : (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-[10px] font-bold text-brand-700">
                          {invoice.company.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <span className="font-semibold text-ink-900">{invoice.company}</span>
                    </div>
                  </td>

                  <td className="py-3.5 font-medium text-brand-600">{invoice.shipmentId}</td>

                  <td className="py-3.5">
                    <p className="font-medium text-ink-900">{invoice.dueDate}</p>
                    <p className="text-[11px] text-ink-500">Issued: {invoice.issueDate}</p>
                  </td>

                  <td className="py-3.5 font-extrabold text-ink-900">
                    ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3.5 text-ink-700">{invoice.paymentMethod}</td>

                  <td className="py-3.5">
                    <InvoiceStatusBadge status={invoice.status} />
                  </td>

                  <td className="py-3.5 pr-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInvoice(invoice);
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-500 hover:bg-surface-muted hover:text-brand-600 transition"
                      title="View invoice details"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
