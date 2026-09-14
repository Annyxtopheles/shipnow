import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Download, ArrowUpDown, Filter, Fuel, User } from 'lucide-react';
import type { FleetVehicle, FleetStatus } from '@/data/fleets';

interface FleetTableProps {
  vehicles: FleetVehicle[];
  onOpenAddModal: () => void;
}

type SortField = 'id' | 'name' | 'odometerMiles' | 'fuelPercent' | 'status';

export function FleetTable({ vehicles, onOpenAddModal }: FleetTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        v.id.toLowerCase().includes(search.toLowerCase()) ||
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
        v.vin.toLowerCase().includes(search.toLowerCase()) ||
        (v.assignedDriver && v.assignedDriver.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === 'All' ? true : v.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [vehicles, search, statusFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filtered, sortField, sortAsc]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const exportCSV = () => {
    const headers = ['Vehicle ID,Model Name,Type,License Plate,VIN,Status,Fuel %,Odometer,Driver,Hub'];
    const rows = sorted.map(
      (v) =>
        `"${v.id}","${v.name}","${v.type}","${v.licensePlate}","${v.vin}","${v.status}",${v.fuelPercent},${v.odometerMiles},"${v.assignedDriver || 'Unassigned'}","${v.assignedHub}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fleet_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: FleetStatus) => {
    switch (status) {
      case 'In Transit':
        return <Badge tone="purple">In Transit</Badge>;
      case 'Available':
        return <Badge tone="green">Available</Badge>;
      case 'Maintenance':
        return <Badge tone="yellow">Maintenance</Badge>;
      case 'Inspection':
        return <Badge tone="red">Inspection</Badge>;
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 sm:p-5 border-b border-surface-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-ink-900">Commercial Transport Fleet Register</h3>
            <p className="text-xs text-ink-500 mt-0.5">
              {filtered.length} vehicles registered across national network
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
              className="!px-3 !py-1.5 text-xs"
              onClick={onOpenAddModal}
            >
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Unit ID, model, driver, VIN..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-surface-muted border border-surface-border text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-muted px-2.5 py-1.5 text-xs text-ink-700">
            <Filter size={12} className="text-ink-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="In Transit">In Transit</option>
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-surface-border bg-surface-muted/50 text-ink-500 font-semibold">
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('id')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>Vehicle Unit ID</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Make & Model</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Assigned Hub</th>
              <th className="py-3 px-4">Assigned Driver</th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('odometerMiles')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Odometer</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('fuelPercent')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Fuel</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {sorted.map((v) => (
              <tr key={v.id} className="hover:bg-surface-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-mono font-bold text-ink-900">{v.id}</div>
                  <div className="font-mono text-[10px] text-ink-400">{v.vin}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-ink-900">{v.name}</div>
                  <div className="text-[11px] text-ink-500 font-mono">Plate: {v.licensePlate}</div>
                </td>
                <td className="py-3 px-4 text-ink-700 font-medium">{v.type}</td>
                <td className="py-3 px-4">
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-surface-muted text-ink-700 border border-surface-border">
                    {v.assignedHub}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {v.assignedDriver ? (
                    <div className="flex items-center gap-1 text-ink-900 font-medium">
                      <User size={12} className="text-ink-400" />
                      <span>{v.assignedDriver}</span>
                    </div>
                  ) : (
                    <span className="text-ink-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right font-mono text-ink-900 font-semibold">
                  {v.odometerMiles.toLocaleString()} mi
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Fuel size={12} className={v.fuelPercent > 50 ? 'text-emerald-500' : 'text-amber-500'} />
                    <span className="font-bold text-ink-900">{v.fuelPercent}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">{getStatusBadge(v.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
