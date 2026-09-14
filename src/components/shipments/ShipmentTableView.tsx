import { useState } from 'react';
import { ArrowUpDown, Check, ArrowRight, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/ui/Badge';
import type { Shipment } from '@/data/shipments';
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

type TableSortKey = 'id' | 'company' | 'carrier' | 'origin' | 'progress' | 'status';

interface ShipmentTableViewProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
}

export function ShipmentTableView({ shipments, onSelectShipment }: ShipmentTableViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<TableSortKey>('id');
  const [sortAsc, setSortAsc] = useState(true);

  const isAllSelected = shipments.length > 0 && shipments.every((s) => selectedIds.has(s.id));
  const isSomeSelected = shipments.some((s) => selectedIds.has(s.id));

  function toggleSelectAll() {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(shipments.map((s) => s.id)));
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

  function toggleSort(key: TableSortKey) {
    if (sortKey === key) {
      setSortAsc((a) => !a);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const sortedShipments = [...shipments].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === 'id') return a.id.localeCompare(b.id) * dir;
    if (sortKey === 'company') return a.company.localeCompare(b.company) * dir;
    if (sortKey === 'carrier') return a.carrier.localeCompare(b.carrier) * dir;
    if (sortKey === 'origin') return a.originCity.localeCompare(b.originCity) * dir;
    if (sortKey === 'progress') return (a.progress - b.progress) * dir;
    if (sortKey === 'status') return a.status.localeCompare(b.status) * dir;
    return 0;
  });

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-surface-border bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-left text-xs">
          <thead>
            <tr className="border-b border-surface-border bg-nav-active-bg text-ink-700">
              <th className="w-10 py-3.5 pl-4">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  aria-label="Select all rows"
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
                  Shipping ID <ArrowUpDown size={12} className={sortKey === 'id' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('company')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Company <ArrowUpDown size={12} className={sortKey === 'company' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('origin')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Route <ArrowUpDown size={12} className={sortKey === 'origin' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('carrier')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Carrier <ArrowUpDown size={12} className={sortKey === 'carrier' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('progress')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Progress <ArrowUpDown size={12} className={sortKey === 'progress' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 font-semibold">
                <button onClick={() => toggleSort('status')} className="flex items-center gap-1.5 hover:text-ink-900">
                  Status <ArrowUpDown size={12} className={sortKey === 'status' ? 'text-brand-600' : ''} />
                </button>
              </th>
              <th className="py-3.5 pr-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {sortedShipments.map((shipment) => {
              const isChecked = selectedIds.has(shipment.id);
              const logo = companyLogos[shipment.company];

              return (
                <tr
                  key={shipment.id}
                  onClick={() => onSelectShipment(shipment)}
                  className="cursor-pointer transition hover:bg-surface-muted/60"
                >
                  <td className="py-3.5 pl-4">
                    <button
                      type="button"
                      onClick={(e) => toggleRow(shipment.id, e)}
                      aria-pressed={isChecked}
                      aria-label={`Select ${shipment.id}`}
                      className={`flex h-4 w-4 items-center justify-center rounded transition ${
                        isChecked ? 'bg-brand-500 text-white' : 'bg-black/20 hover:bg-black/30'
                      }`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </button>
                  </td>

                  <td className="py-3.5 font-bold text-ink-900">{shipment.id}</td>

                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      {logo ? (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-muted p-1">
                          <img src={logo} alt="" className="h-5 w-5 object-contain" />
                        </span>
                      ) : (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-[10px] font-bold text-brand-700">
                          {shipment.company.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <div>
                        <p className="font-semibold text-ink-900">{shipment.company}</p>
                        <p className="text-[11px] text-ink-500">{shipment.category}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <div className="flex items-center gap-1.5 font-medium text-ink-900">
                      <span>{shipment.originCity}</span>
                      <ArrowRight size={12} className="text-ink-400" />
                      <span>{shipment.destinationCity}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-ink-500">{shipment.originDate.split(' - ')[0]}</p>
                  </td>

                  <td className="py-3.5 font-medium text-ink-700">{shipment.carrier}</td>

                  <td className="py-3.5">
                    <div className="w-28">
                      <div className="flex items-center justify-between text-[11px] text-ink-500 mb-1">
                        <span>{shipment.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                        <div
                          className="h-full rounded-full bg-brand-500"
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <StatusBadge status={shipment.status} />
                  </td>

                  <td className="py-3.5 pr-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectShipment(shipment);
                      }}
                      aria-label={`View details for ${shipment.id}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-500 hover:bg-surface-muted hover:text-brand-600 transition"
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
