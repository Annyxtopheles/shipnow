import { useMemo, useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Search, MoreHorizontal, Check, Download, CheckSquare, Square } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { recentShipments as seedRecent } from '@/data/dashboardStats';
import { useShipments } from '@/context/ShipmentContext';
import sortAscendingIcon from '@/assets/icons/sort-ascending.png';

type SortKey = 'id' | 'company' | 'carrier' | 'date';

export function RecentShipmentsCard() {
  const { shipments, setSelectedShipmentForDetail } = useShipments();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pageSize = 5;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Merge seed recent shipments with any dynamically added shipments in context
  const allRecent = useMemo(() => {
    const custom = shipments
      .filter((s) => !seedRecent.some((r) => r.id === s.id))
      .map((s) => ({
        id: s.id,
        company: s.company,
        companySub: s.category,
        carrier: s.carrier,
        route: `${s.originCity} → ${s.destinationCity}`,
        date: s.originDate.split(' - ')[0] || 'Mar 22, 2035',
        status: s.status,
      }));
    return [...custom, ...seedRecent];
  }, [shipments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? allRecent.filter(
          (r) =>
            r.id.toLowerCase().includes(q) ||
            r.company.toLowerCase().includes(q) ||
            r.carrier.toLowerCase().includes(q),
        )
      : allRecent;

    const sorted = [...rows].sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sortKey === 'company') return a.company.localeCompare(b.company) * dir;
      if (sortKey === 'carrier') return a.carrier.localeCompare(b.carrier) * dir;
      if (sortKey === 'date') return (a.date > b.date ? 1 : -1) * dir;
      return a.id.localeCompare(b.id) * dir;
    });
    return sorted;
  }, [allRecent, query, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const isAllPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const isSomePageSelected = pageRows.some((r) => selected.has(r.id));

  function toggleSelectAll() {
    if (isAllPageSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.add(r.id));
        return next;
      });
    }
  }

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

  function handleRowClick(rowId: string) {
    const found = shipments.find((s) => s.id === rowId);
    if (found) {
      setSelectedShipmentForDetail(found);
    }
  }

  function handleExportCSV() {
    const rowsToExport = selected.size > 0 ? allRecent.filter((r) => selected.has(r.id)) : allRecent;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Shipping ID,Company,Category,Carrier,Date,Status']
        .concat(rowsToExport.map((r) => `"${r.id}","${r.company}","${r.companySub}","${r.carrier}","${r.date}","${r.status}"`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shipnow_shipments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMenuOpen(false);
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
            onClick={() => setSortAsc((a) => !a)}
            aria-label="Toggle sort order"
            title={`Sort ${sortAsc ? 'Descending' : 'Ascending'}`}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
              sortAsc ? 'bg-brand-100 text-brand-600 ring-1 ring-brand-500' : 'bg-surface-muted text-ink-500 hover:bg-surface-border'
            }`}
          >
            <img
              src={sortAscendingIcon}
              alt=""
              className={`h-3.5 w-3.5 transition-transform duration-150 ${sortAsc ? '' : 'rotate-180'}`}
            />
          </button>
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="More options"
              title="More options"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-ink-500 hover:bg-surface-border"
            >
              <MoreHorizontal size={16} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-surface-border bg-white p-1.5 shadow-xl text-xs">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-ink-700 hover:bg-surface-muted"
                >
                  <CheckSquare size={14} /> {isAllPageSelected ? 'Deselect Page' : 'Select All Page'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(new Set());
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-ink-700 hover:bg-surface-muted"
                >
                  <Square size={14} /> Clear Selection
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-ink-700 hover:bg-surface-muted"
                >
                  <Download size={14} /> Export CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="bg-nav-active-bg text-ink-700">
              <th className="w-8 rounded-l-lg py-2.5 pl-3">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  aria-label="Select all rows"
                  title={isAllPageSelected ? 'Deselect all' : 'Select all'}
                  className={`flex h-4 w-4 items-center justify-center rounded transition ${
                    isAllPageSelected ? 'bg-brand-500 text-white' : isSomePageSelected ? 'bg-brand-300 text-white' : 'bg-black/20'
                  }`}
                >
                  {(isAllPageSelected || isSomePageSelected) && <Check size={11} strokeWidth={3} />}
                </button>
              </th>
              {columns.map((col) => (
                <th key={col.key} className="py-2.5 font-medium">
                  <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1 hover:text-ink-900">
                    {col.label}
                    <ArrowUpDown size={11} className={sortKey === col.key ? 'text-brand-600' : ''} />
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
                <tr
                  key={row.id}
                  onClick={() => handleRowClick(row.id)}
                  className="cursor-pointer border-b border-surface-border last:border-0 hover:bg-surface-muted/60 transition"
                >
                  <td className="py-3 pl-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => toggleRow(row.id)}
                      aria-pressed={isChecked}
                      aria-label={`Select ${row.id}`}
                      className={`flex h-4 w-4 items-center justify-center rounded transition ${
                        isChecked ? 'bg-brand-500 text-white' : 'bg-black/20 hover:bg-black/30'
                      }`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
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
          Page {page} of {totalPages} ({filtered.length} total)
          {selected.size > 0 && <span className="ml-2 font-semibold text-brand-600">· {selected.size} selected</span>}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-surface-border px-2.5 py-1 hover:bg-surface-muted disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-surface-border px-2.5 py-1 hover:bg-surface-muted disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}