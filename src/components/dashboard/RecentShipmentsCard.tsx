import { useMemo, useState } from 'react';
import { ArrowUpDown, Search, MoreHorizontal, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { recentShipments } from '@/data/dashboardStats';
import sortAscendingIcon from '@/assets/icons/sort-ascending.png';

type SortKey = 'id' | 'company' | 'carrier' | 'date';

export function RecentShipmentsCard() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? recentShipments.filter(
          (r) =>
            r.id.toLowerCase().includes(q) ||
            r.company.toLowerCase().includes(q) ||
            r.carrier.toLowerCase().includes(q),
        )
      : recentShipments;

    const sorted = [...rows].sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sortKey === 'company') return a.company.localeCompare(b.company) * dir;
      if (sortKey === 'carrier') return a.carrier.localeCompare(b.carrier) * dir;
      if (sortKey === 'date') return (a.date > b.date ? 1 : -1) * dir;
      return a.id.localeCompare(b.id) * dir;
    });
    return sorted;
  }, [query, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'id', label: 'Shipping ID' },
    { key: 'company', label: 'Company' },
    { key: 'carrier', label: 'Carrier' },
    { key: 'date', label: 'Shipping Date' },
  ];

  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink-900">Recent Shipments</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="search"
              placeholder="Search shipment"
              className="w-40 rounded-lg bg-surface-muted py-1.5 pl-8 pr-2 text-xs outline-none focus:ring-2 focus:ring-brand-500 sm:w-48"
            />
          </div>
          <button
            type="button"
            aria-label="Sort ascending"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-ink-500"
          >
            <img src={sortAscendingIcon} alt="" className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-ink-500"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="bg-nav-active-bg text-ink-700">
              <th className="w-8 rounded-l-lg py-2.5 pl-3">
                <button
                  type="button"
                  aria-label="Select all rows"
                  className="flex h-4 w-4 items-center justify-center rounded bg-black/20"
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="py-2.5 font-medium">
                  <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown size={11} />
                  </button>
                </th>
              ))}
              <th className="rounded-r-lg py-2.5 pr-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const isChecked = selected.has(row.id);
              return (
                <tr key={row.id} className="border-b border-surface-border last:border-0">
                  <td className="py-3 pl-3">
                    <button
                      type="button"
                      onClick={() => toggleRow(row.id)}
                      aria-pressed={isChecked}
                      aria-label={`Select ${row.id}`}
                      className={`flex h-4 w-4 items-center justify-center rounded ${
                        isChecked ? 'bg-brand-500' : 'bg-black/20'
                      }`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} className="text-white" />}
                    </button>
                  </td>
                  <td className="py-3 font-semibold text-ink-900">{row.id}</td>
                  <td className="py-3">
                    <p className="font-medium text-ink-900">{row.company}</p>
                    <p className="text-[11px] text-ink-500">{row.companySub}</p>
                  </td>
                  <td className="py-3 text-ink-700">{row.carrier}</td>
                  <td className="py-3 text-ink-700">{row.date}</td>
                  <td className="py-3 pr-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-surface-border px-2.5 py-1 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-surface-border px-2.5 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}