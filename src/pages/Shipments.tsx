import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { RangeDropdown } from '@/components/ui/RangeDropdown';
import { StatusTabs, type StatusFilter } from '@/components/shipments/StatusTabs';
import { FilterMenu } from '@/components/shipments/FilterMenu';
import { ShipmentCard } from '@/components/shipments/ShipmentCard';
import { Pagination } from '@/components/shipments/Pagination';
import { type ShipmentCategory } from '@/data/shipments';
import { useShipments } from '@/context/ShipmentContext';

const CATEGORY_OPTIONS: ('All Categories' | ShipmentCategory)[] = [
  'All Categories',
  'Electronics',
  'Apparel',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Automotive',
  'Fashion',
  'Food & Beverage',
];

const SORT_OPTIONS = ['Newest', 'Oldest'] as const;
const PAGE_SIZE_OPTIONS = ['12', '24', '48'];

export function ShipmentsPage() {
  const { shipments, setIsCreateModalOpen, setSelectedShipmentForDetail } = useShipments();
  const [status, setStatus] = useState<StatusFilter>('All');
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>('All Categories');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Newest');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let rows = shipments;
    if (status !== 'All') rows = rows.filter((s) => s.status === status);
    if (category !== 'All Categories') rows = rows.filter((s) => s.category === category);
    if (q) {
      rows = rows.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.company.toLowerCase().includes(q) ||
          s.carrier.toLowerCase().includes(q) ||
          s.originCity.toLowerCase().includes(q) ||
          s.destinationCity.toLowerCase().includes(q),
      );
    }

    const sorted = [...rows].sort((a, b) => {
      const diff = a.seedOrder - b.seedOrder;
      return sort === 'Newest' ? diff : -diff;
    });

    return sorted;
  }, [shipments, status, category, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function resetToFirstPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Shipments']}
      pageTitle="Shipments"
      mobileTitle="Shipments"
      hideHeaderOnMobile
      headerAction={
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          <Plus size={16} /> <span className="hidden sm:inline">New Shipment</span>
        </Button>
      }
    >
      {/* Phone-only toolbar: merged search/filter/new-shipment + tabs card */}
      <div className="rounded-2xl bg-white p-3 sm:hidden">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => resetToFirstPage(setQuery)(e.target.value)}
              placeholder="Search id, company, etc"
              className="w-full rounded-xl bg-surface-muted py-2.5 pl-9 pr-3 text-sm text-ink-900 outline-none placeholder:text-ink-500 focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <FilterMenu
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(v) => resetToFirstPage(setCategory)(v as (typeof CATEGORY_OPTIONS)[number])}
          />

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="!flex !h-10 !w-10 shrink-0 !items-center !justify-center !p-0"
            aria-label="New Shipment"
          >
            <Plus size={18} />
          </Button>
        </div>

        <div className="mt-3">
          <StatusTabs value={status} onChange={resetToFirstPage(setStatus)} />
        </div>
      </div>

      <div className="hidden flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between md:gap-2 xl:gap-4">
        <StatusTabs value={status} onChange={resetToFirstPage(setStatus)} />

        <div className="flex flex-wrap items-center gap-4 md:gap-1.5 xl:gap-4">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500 md:left-2 xl:left-3" />
            <input
              type="search"
              value={query}
              onChange={(e) => resetToFirstPage(setQuery)(e.target.value)}
              placeholder="Search Shipment"
              className="w-40 rounded-lg bg-white py-2 pl-8 pr-3 text-xs text-ink-900 shadow-sm outline-none ring-1 ring-surface-border transition-[width,padding] duration-200 focus:ring-2 focus:ring-brand-500 sm:w-48 md:h-8 md:w-8 md:pl-7 md:pr-0 md:focus:w-40 md:focus:pl-8 md:focus:pr-3 xl:h-auto xl:w-48 xl:pl-8 xl:pr-3"
            />
          </div>

          <FilterMenu
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(v) => resetToFirstPage(setCategory)(v as (typeof CATEGORY_OPTIONS)[number])}
          />

          <RangeDropdown
            label="Sort by:"
            options={[...SORT_OPTIONS]}
            value={sort}
            onChange={(v) => setSort(v as (typeof SORT_OPTIONS)[number])}
          />
        </div>
      </div>

      {pageRows.length === 0 ? (
        <div className="mt-6 flex h-48 items-center justify-center rounded-2xl border border-dashed border-surface-border text-sm text-ink-500">
          No shipments match your filters.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pageRows.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              onClick={() => setSelectedShipmentForDetail(shipment)}
            />
          ))}
        </div>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        totalResults={filtered.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </DashboardLayout>
  );
}