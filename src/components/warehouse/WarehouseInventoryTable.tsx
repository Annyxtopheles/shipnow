import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Search,
  ArrowUpDown,
  Download,
  Plus,
  Filter,
  CheckSquare,
  Square,
  Package,
} from 'lucide-react';
import type { WarehouseInventoryItem, InventoryStatus } from '@/data/warehouse';

interface WarehouseInventoryTableProps {
  inventory: WarehouseInventoryItem[];
  selectedHubCode: string | null;
  onSelectHub: (code: string | null) => void;
  onOpenInboundModal: () => void;
}

type SortField = 'sku' | 'name' | 'warehouseCode' | 'quantity' | 'allocated' | 'status';
type SortOrder = 'asc' | 'desc';

export function WarehouseInventoryTable({
  inventory,
  selectedHubCode,
  onSelectHub,
  onOpenInboundModal,
}: WarehouseInventoryTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('sku');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Filtered & Sorted
  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.zone.toLowerCase().includes(search.toLowerCase());

      const matchesHub = selectedHubCode ? item.warehouseCode === selectedHubCode : true;
      const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;

      return matchesSearch && matchesHub && matchesStatus;
    });
  }, [inventory, search, selectedHubCode, statusFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filteredItems, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / pageSize));
  const paginatedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedSkus.length === paginatedItems.length) {
      setSelectedSkus([]);
    } else {
      setSelectedSkus(paginatedItems.map((i) => i.sku));
    }
  };

  const toggleSelect = (sku: string) => {
    setSelectedSkus((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  };

  const exportCSV = () => {
    const headers = ['SKU,Product Name,Company,Warehouse Hub,Quantity,Allocated,Zone,Status'];
    const rows = sortedItems.map(
      (item) =>
        `"${item.sku}","${item.name}","${item.company}","${item.warehouseCode}",${item.quantity},${item.allocated},"${item.zone}","${item.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `warehouse_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: InventoryStatus) => {
    switch (status) {
      case 'In Stock':
        return <Badge tone="green">In Stock</Badge>;
      case 'Low Stock':
        return <Badge tone="yellow">Low Stock</Badge>;
      case 'Inbound':
        return <Badge tone="purple">Inbound</Badge>;
      case 'Reserved':
        return <Badge tone="gray">Reserved</Badge>;
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-surface-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-ink-900">Facility Inventory Register</h2>
            <p className="text-xs text-ink-500 mt-0.5">
              {filteredItems.length} total SKUs tracked {selectedHubCode ? `at ${selectedHubCode}` : 'across all facilities'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="!px-3 !py-1.5 text-xs flex items-center gap-1.5"
              onClick={exportCSV}
            >
              <Download size={14} />
              Export CSV
            </Button>
            <Button
              variant="primary"
              className="!px-3 !py-1.5 text-xs flex items-center gap-1.5"
              onClick={onOpenInboundModal}
            >
              <Plus size={14} />
              Log Inbound
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={14} />
            <input
              type="text"
              placeholder="Search SKU, item, company, aisle..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-surface-muted border border-surface-border text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-surface-card"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Hub Filter */}
            <select
              value={selectedHubCode || 'All'}
              onChange={(e) => {
                onSelectHub(e.target.value === 'All' ? null : e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-surface-border bg-surface-muted px-2.5 py-1.5 text-xs text-ink-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="All">All Facilities</option>
              <option value="LAX-01">LAX-01 (Los Angeles)</option>
              <option value="ORD-02">ORD-02 (Chicago)</option>
              <option value="DFW-03">DFW-03 (Dallas)</option>
              <option value="JFK-04">JFK-04 (New York)</option>
              <option value="ATL-05">ATL-05 (Atlanta)</option>
              <option value="SEA-06">SEA-06 (Seattle)</option>
            </select>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-muted px-2.5 py-1.5 text-xs text-ink-700">
              <Filter size={12} className="text-ink-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Inbound">Inbound</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>

            {selectedHubCode && (
              <button
                type="button"
                onClick={() => onSelectHub(null)}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium px-1.5 py-1"
              >
                Clear Hub Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-surface-border bg-surface-muted/50 text-ink-500 font-semibold">
              <th className="py-3 px-4 w-10">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-ink-400 hover:text-ink-700"
                >
                  {selectedSkus.length > 0 && selectedSkus.length === paginatedItems.length ? (
                    <CheckSquare size={16} className="text-brand-600" />
                  ) : (
                    <Square size={16} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('sku')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>SKU</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('name')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>Product / Consignor</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('warehouseCode')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>Facility</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Zone & Aisle</th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('quantity')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Units On-Hand</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('allocated')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Allocated</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-ink-400">
                  <Package size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="font-medium text-sm text-ink-600">No inventory matches found</p>
                  <p className="text-xs text-ink-400 mt-0.5">Try clearing filters or search criteria</p>
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => {
                const isChecked = selectedSkus.includes(item.sku);
                return (
                  <tr
                    key={item.sku}
                    className={`transition-colors hover:bg-surface-muted/60 ${
                      isChecked ? 'bg-brand-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => toggleSelect(item.sku)}
                        className="text-ink-400 hover:text-ink-700"
                      >
                        {isChecked ? (
                          <CheckSquare size={16} className="text-brand-600" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-ink-900">
                      {item.sku}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-ink-900">{item.name}</div>
                      <div className="text-[11px] text-ink-500">{item.company}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-medium text-[11px] bg-surface-muted text-ink-700 border border-surface-border">
                        {item.warehouseCode}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-ink-600 font-mono text-[11px]">
                      {item.zone}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-ink-900">
                      {item.quantity.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-ink-600">
                      {item.allocated.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 sm:px-5 border-t border-surface-border flex items-center justify-between text-xs text-ink-500">
        <div>
          Showing {sortedItems.length > 0 ? (page - 1) * pageSize + 1 : 0} to{' '}
          {Math.min(page * pageSize, sortedItems.length)} of {sortedItems.length} items
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            className="!px-3 !py-1.5 text-xs"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="px-2 font-medium text-ink-700">
            {page} / {totalPages}
          </span>
          <Button
            variant="secondary"
            className="!px-3 !py-1.5 text-xs"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
