import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { RangeDropdown } from '@/components/ui/RangeDropdown';
import { FilterMenu } from '@/components/shipments/FilterMenu';
import { seedInvoices, type Invoice, type InvoiceStatus } from '@/data/invoices';
import { InvoiceMetrics } from '@/components/invoices/InvoiceMetrics';
import { InvoiceTable } from '@/components/invoices/InvoiceTable';
import { InvoiceDetailModal } from '@/components/invoices/InvoiceDetailModal';
import { CreateInvoiceModal } from '@/components/invoices/CreateInvoiceModal';

type InvoiceFilterStatus = 'All' | InvoiceStatus;

const STATUS_TABS: InvoiceFilterStatus[] = ['All', 'Paid', 'Pending', 'Overdue', 'Draft'];
const METHOD_OPTIONS = ['All Methods', 'Bank Wire', 'Credit Card', 'ACH Transfer'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'Amount: High to Low', 'Amount: Low to High'] as const;

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);
  const [status, setStatus] = useState<InvoiceFilterStatus>('All');
  const [method, setMethod] = useState('All Methods');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Newest');

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  function handleMarkPaid(id: string) {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' as InvoiceStatus } : inv)),
    );
  }

  function handleCreateInvoice(newInvoice: Invoice) {
    setInvoices((prev) => [newInvoice, ...prev]);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let rows = invoices;
    if (status !== 'All') rows = rows.filter((i) => i.status === status);
    if (method !== 'All Methods') rows = rows.filter((i) => i.paymentMethod === method);
    if (q) {
      rows = rows.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q) ||
          i.shipmentId.toLowerCase().includes(q),
      );
    }

    const sorted = [...rows].sort((a, b) => {
      if (sort === 'Amount: High to Low') return b.amount - a.amount;
      if (sort === 'Amount: Low to High') return a.amount - b.amount;
      if (sort === 'Oldest') return a.dueDate.localeCompare(b.dueDate);
      return b.dueDate.localeCompare(a.dueDate);
    });

    return sorted;
  }, [invoices, status, method, query, sort]);

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Invoices & Billing']}
      pageTitle="Invoices & Billing"
      mobileTitle="Invoices"
      headerAction={
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          <Plus size={16} /> <span className="hidden sm:inline">Create Invoice</span>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Top Summary Metrics */}
        <InvoiceMetrics invoices={invoices} />

        {/* Toolbar & Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-nowrap items-stretch overflow-x-auto rounded-2xl bg-white p-1 shadow-xs border border-surface-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STATUS_TABS.map((tab) => {
              const isActive = tab === status;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatus(tab)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-2 text-xs font-semibold rounded-xl transition ${
                    isActive ? 'bg-ink-900 text-white shadow-xs' : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search, Filter, Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search invoice or client..."
                className="w-full rounded-lg bg-white py-2 pl-8 pr-3 text-xs text-ink-900 shadow-sm outline-none ring-1 ring-surface-border placeholder:text-ink-500 focus:ring-2 focus:ring-brand-500 sm:w-48"
              />
            </div>

            <FilterMenu
              options={METHOD_OPTIONS}
              value={method}
              onChange={setMethod}
            />

            <RangeDropdown
              label="Sort by:"
              options={[...SORT_OPTIONS]}
              value={sort}
              onChange={(v) => setSort(v as (typeof SORT_OPTIONS)[number])}
            />
          </div>
        </div>

        {/* Invoices Table */}
        {filtered.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-surface-border bg-white text-sm text-ink-500">
            No invoices match your selected filters.
          </div>
        ) : (
          <InvoiceTable invoices={filtered} onSelectInvoice={setSelectedInvoice} />
        )}
      </div>

      {/* Modals */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onMarkPaid={handleMarkPaid}
      />

      <CreateInvoiceModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateInvoice}
      />
    </DashboardLayout>
  );
}
