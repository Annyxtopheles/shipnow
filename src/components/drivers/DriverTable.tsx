import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, Download, ArrowUpDown, Filter, Phone, Mail, Star, Truck } from 'lucide-react';
import type { CommercialDriver, DriverStatus } from '@/data/drivers';

interface DriverTableProps {
  drivers: CommercialDriver[];
  onOpenAddModal: () => void;
}

type SortField = 'name' | 'experienceYears' | 'accidentFreeMiles' | 'safetyRating' | 'hosRemainingHours';

export function DriverTable({ drivers, onOpenAddModal }: DriverTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('safetyRating');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    return drivers.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.licenseClass.toLowerCase().includes(search.toLowerCase()) ||
        d.assignedHub.toLowerCase().includes(search.toLowerCase()) ||
        (d.assignedVehicleId && d.assignedVehicleId.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === 'All' ? true : d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [drivers, search, statusFilter]);

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
      setSortAsc(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Driver ID,Name,License Class,Status,Experience (Yrs),Accident-Free Miles,Safety Rating,Vehicle,Hub,Phone,Email,HOS Left'];
    const rows = sorted.map(
      (d) =>
        `"${d.id}","${d.name}","${d.licenseClass}","${d.status}",${d.experienceYears},${d.accidentFreeMiles},${d.safetyRating},"${d.assignedVehicleId || 'Unassigned'}","${d.assignedHub}","${d.phone}","${d.email}",${d.hosRemainingHours}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `drivers_directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: DriverStatus) => {
    switch (status) {
      case 'Driving':
        return <Badge tone="purple">Driving</Badge>;
      case 'On Duty':
        return <Badge tone="blue">On Duty</Badge>;
      case 'Resting':
        return <Badge tone="yellow">Resting</Badge>;
      case 'Off Duty':
        return <Badge tone="gray">Off Duty</Badge>;
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 sm:p-5 border-b border-surface-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-ink-900">Commercial Drivers Roster</h3>
            <p className="text-xs text-ink-500 mt-0.5">
              Certified commercial operators, ELD telemetry, and safety records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="!px-3 !py-1.5 text-xs flex items-center gap-1.5"
              onClick={exportCSV}
            >
              <Download size={14} />
              Export Roster CSV
            </Button>
            <Button
              variant="primary"
              className="!px-3 !py-1.5 text-xs"
              onClick={onOpenAddModal}
            >
              Onboard Driver
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
              placeholder="Search driver name, license, vehicle..."
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
              <option value="Driving">Driving</option>
              <option value="On Duty">On Duty</option>
              <option value="Resting">Resting</option>
              <option value="Off Duty">Off Duty</option>
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
                  onClick={() => toggleSort('name')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>Driver Name</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">License Certification</th>
              <th className="py-3 px-4">Assigned Vehicle</th>
              <th className="py-3 px-4">Home Hub</th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('accidentFreeMiles')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Safe Miles</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('safetyRating')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>Rating</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('hosRemainingHours')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>HOS Left</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Duty Status</th>
              <th className="py-3 px-4 text-center">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {sorted.map((d) => (
              <tr key={d.id} className="hover:bg-surface-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-ink-900">{d.name}</div>
                  <div className="font-mono text-[10px] text-ink-400">{d.id} · {d.experienceYears}y exp</div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-ink-700 bg-surface-muted px-2 py-0.5 rounded border border-surface-border">
                    {d.licenseClass}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {d.assignedVehicleId ? (
                    <div className="flex items-center gap-1.5 font-mono text-ink-900 font-medium">
                      <Truck size={13} className="text-brand-600" />
                      <span>{d.assignedVehicleId}</span>
                    </div>
                  ) : (
                    <span className="text-ink-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="py-3 px-4 font-mono font-medium text-ink-700">{d.assignedHub}</td>
                <td className="py-3 px-4 text-right font-mono font-medium text-ink-900">
                  {d.accidentFreeMiles.toLocaleString()} mi
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={13} fill="currentColor" />
                    <span>{d.safetyRating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <span className="font-mono font-semibold text-ink-900">{d.hosRemainingHours}h / 11h</span>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className={`h-full rounded-full ${
                          d.hosRemainingHours < 3 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(d.hosRemainingHours / 11) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">{getStatusBadge(d.status)}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <a
                      href={`tel:${d.phone}`}
                      className="p-1 rounded text-ink-400 hover:text-brand-600 hover:bg-surface-muted transition"
                      title={d.phone}
                    >
                      <Phone size={13} />
                    </a>
                    <a
                      href={`mailto:${d.email}`}
                      className="p-1 rounded text-ink-400 hover:text-brand-600 hover:bg-surface-muted transition"
                      title={d.email}
                    >
                      <Mail size={13} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
