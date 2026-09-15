import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download, Star, ArrowUpDown } from 'lucide-react';
import { seedCarrierScorecards, type CarrierScorecard } from '@/data/analytics';

type SortField = 'name' | 'completedShipments' | 'onTimePercent' | 'avgDwellMinutes' | 'rating';

export function CarrierScorecardTable() {
  const [carriers] = useState<CarrierScorecard[]>(seedCarrierScorecards);
  const [sortField, setSortField] = useState<SortField>('onTimePercent');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedCarriers = useMemo(() => {
    return [...carriers].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [carriers, sortField, sortAsc]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Carrier Name,Transport Mode,Completed Shipments,On-Time Rate,Avg Dwell (Mins),Damage Rate,Rating,Status'];
    const rows = sortedCarriers.map(
      (c) =>
        `"${c.name}","${c.mode}",${c.completedShipments},"${c.onTimePercent}%",${c.avgDwellMinutes},"${c.damageRatePercent}%",${c.rating},"${c.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `carrier_scorecard_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: CarrierScorecard['status']) => {
    switch (status) {
      case 'Preferred Partner':
        return <Badge tone="green">Preferred Partner</Badge>;
      case 'Standard':
        return <Badge tone="blue">Standard</Badge>;
      case 'Under Review':
        return <Badge tone="red">Under Review</Badge>;
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-ink-900">Carrier Partner SLA & Quality Scorecard</h3>
          <p className="text-xs text-ink-500 mt-0.5">
            Quarterly performance evaluations and contractual compliance metrics
          </p>
        </div>
        <Button
          variant="secondary"
          className="!px-3 !py-1.5 text-xs flex items-center gap-1.5 self-start sm:self-auto"
          onClick={exportCSV}
        >
          <Download size={14} />
          Export Scorecard CSV
        </Button>
      </div>

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
                  <span>Carrier</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Primary Mode</th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('completedShipments')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Dispatched</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('onTimePercent')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>On-Time SLA</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('avgDwellMinutes')}
                  className="flex items-center gap-1 ml-auto hover:text-ink-900"
                >
                  <span>Avg Dwell</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4 text-right">Damage Rate</th>
              <th className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => toggleSort('rating')}
                  className="flex items-center gap-1 hover:text-ink-900"
                >
                  <span>Rating</span>
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="py-3 px-4">Compliance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {sortedCarriers.map((c) => (
              <tr key={c.carrierId} className="hover:bg-surface-muted/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-ink-900">{c.name}</td>
                <td className="py-3 px-4 text-ink-600 font-medium">{c.mode}</td>
                <td className="py-3 px-4 text-right font-medium text-ink-900">
                  {c.completedShipments.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`font-bold ${
                      c.onTimePercent >= 98
                        ? 'text-emerald-600'
                        : c.onTimePercent >= 95
                        ? 'text-brand-600'
                        : 'text-red-600'
                    }`}
                  >
                    {c.onTimePercent}%
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-ink-600">{c.avgDwellMinutes} min</td>
                <td className="py-3 px-4 text-right text-ink-600">{c.damageRatePercent}%</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star size={13} fill="currentColor" />
                    <span>{c.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{getStatusBadge(c.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
