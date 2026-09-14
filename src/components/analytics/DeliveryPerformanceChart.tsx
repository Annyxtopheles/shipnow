import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { RangeDropdown } from '@/components/ui/RangeDropdown';
import { seedVolumeTrends, type VolumeTrendPoint } from '@/data/analytics';

const RANGE_OPTIONS = ['All 9 Months', 'Last 6 Months', 'Last 3 Months'];

export function DeliveryPerformanceChart() {
  const [range, setRange] = useState(RANGE_OPTIONS[0]);

  const data: VolumeTrendPoint[] =
    range === 'Last 3 Months'
      ? seedVolumeTrends.slice(-3)
      : range === 'Last 6 Months'
      ? seedVolumeTrends.slice(-6)
      : seedVolumeTrends;

  return (
    <Card className="flex flex-col h-[380px] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-bold text-ink-900">Shipment Throughput & On-Time Performance</h3>
          <p className="text-xs text-ink-500 mt-0.5">
            Total volume vs. guaranteed on-time delivered parcels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-ink-700 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-500"></span>
              Total Volume
            </span>
            <span className="flex items-center gap-1 text-ink-700 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              On-Time
            </span>
          </div>
          <RangeDropdown options={RANGE_OPTIONS} value={range} onChange={setRange} />
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-brand-500)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-brand-500)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-surface-border)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: 'var(--color-surface-border)',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              }}
              formatter={(val: unknown) => [`${Number(val).toLocaleString()} units`]}
            />
            <Area
              type="monotone"
              dataKey="totalShipments"
              name="Total Shipments"
              stroke="var(--color-brand-500)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
            <Area
              type="monotone"
              dataKey="onTimeShipments"
              name="On-Time Delivery"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOnTime)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
