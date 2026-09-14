import { useState } from 'react';
import {
  AreaChart,
  Area,
  Line,
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
            Total volume throughput vs. guaranteed on-time delivered parcels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-ink-700 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              Total Volume
            </span>
            <span className="flex items-center gap-1.5 text-ink-700 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-900" />
              On-Time Delivered
            </span>
          </div>
          <RangeDropdown options={RANGE_OPTIONS} value={range} onChange={setRange} />
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="brandPurpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-brand-500)" stopOpacity={0.28} />
                <stop offset="95%" stopColor="var(--color-brand-500)" stopOpacity={0.0} />
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
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const total = payload.find((p) => p.dataKey === 'totalShipments')?.value as number || 0;
                const onTime = payload.find((p) => p.dataKey === 'onTimeShipments')?.value as number || 0;
                const rate = total > 0 ? ((onTime / total) * 100).toFixed(1) : '100';

                return (
                  <div className="rounded-xl border border-surface-border bg-white p-3 shadow-xl text-xs space-y-1.5">
                    <p className="font-bold text-ink-900">{label} 2026</p>
                    <div className="flex items-center justify-between gap-4 text-ink-600">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-brand-500" /> Total Volume:
                      </span>
                      <span className="font-bold text-ink-900 font-mono">{total.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-ink-600">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-ink-900" /> On-Time:
                      </span>
                      <span className="font-bold text-ink-900 font-mono">{onTime.toLocaleString()} ({rate}%)</span>
                    </div>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="totalShipments"
              name="Total Volume"
              stroke="var(--color-brand-500)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#brandPurpleGradient)"
            />
            <Line
              type="monotone"
              dataKey="onTimeShipments"
              name="On-Time Delivered"
              stroke="var(--color-ink-900)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-ink-900)', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
