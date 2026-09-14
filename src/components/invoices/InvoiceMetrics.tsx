import { Card } from '@/components/ui/Card';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import type { Invoice } from '@/data/invoices';

interface InvoiceMetricsProps {
  invoices: Invoice[];
}

export function InvoiceMetrics({ invoices }: InvoiceMetricsProps) {
  const paidTotal = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const pendingTotal = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueTotal = invoices
    .filter((i) => i.status === 'Overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueCount = invoices.filter((i) => i.status === 'Overdue').length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Paid */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Collected Revenue</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">${paidTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value="+14.2%" direction="up" />
            <span className="text-[11px] text-ink-500">from last month</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={20} />
        </div>
      </Card>

      {/* Pending */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Pending Settlement</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">${pendingTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="mt-2 text-[11px] text-ink-500 font-medium">Due within 15 days</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Clock size={20} />
        </div>
      </Card>

      {/* Overdue */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Overdue Invoices</p>
          <p className="mt-1.5 text-2xl font-extrabold text-red-600">${overdueTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value={`${overdueCount} overdue`} direction="down" />
            <span className="text-[11px] text-ink-500">requires attention</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <AlertTriangle size={20} />
        </div>
      </Card>

      {/* Total Count */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Total Invoices</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">{invoices.length}</p>
          <p className="mt-2 text-[11px] text-ink-500">Current billing quarter</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-700">
          <FileText size={20} />
        </div>
      </Card>
    </div>
  );
}
