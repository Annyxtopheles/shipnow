import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { RangeDropdown } from '@/components/ui/RangeDropdown';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { shipmentStatisticData } from '@/data/dashboardStats';

const RANGE_OPTIONS = ['Last Year', 'Last 6 Months', 'Last 3 Months'];

function formatK(value: number) {
  return value === 0 ? '0K' : `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`;
}

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { month: string; value: number };
}

function makeBarShape(activeMonth: string, onSelect: (month: string) => void) {
  return function BarShape(props: BarShapeProps) {
    const { x = 0, y = 0, width = 0, height = 0, payload } = props;
    const isActive = payload?.month === activeMonth;
    const callout = payload && isActive;

    return (
      <g onClick={() => payload?.month && onSelect(payload.month)} style={{ cursor: 'pointer' }}>
        {/* plain rectangle, no rounding, bars sit flush against each other */}
        <rect x={x} y={y} width={width} height={height} fill={isActive ? 'url(#barActiveGradient)' : 'url(#barInactiveGradient)'} />
        {/* black cap line at the very top edge of every bar */}
        <line x1={x} x2={x + width} y1={y} y2={y} stroke="var(--color-ink-900)" strokeWidth={2} />

        {isActive && (
          <>
            <circle cx={x + width / 2} cy={y} r={6} fill="var(--color-ink-900)" stroke="white" strokeWidth={2.5} />
            {callout && (
              <g transform={`translate(${x + width / 2 - 62}, ${Math.max(y - 78, 4)})`}>
                <rect width={124} height={62} rx={10} fill="var(--color-brand-100)" />
                <text x={62} y={24} textAnchor="middle" fontSize={11} fill="var(--color-brand-700)">
                  {payload.month} 2030
                </text>
                <text x={62} y={46} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--color-ink-900)">
                  {payload.value.toLocaleString()}
                </text>
              </g>
            )}
          </>
        )}
      </g>
    );
  };
}

export function ShipmentStatisticCard() {
  const [range, setRange] = useState(RANGE_OPTIONS[0]);
  const defaultActive = shipmentStatisticData[4].month; // May, pre-selected per the design
  const [activeMonth, setActiveMonth] = useState(defaultActive);
  const latest = shipmentStatisticData[shipmentStatisticData.length - 1].value;

  return (
    <Card className="flex h-full flex-col gap-4 !rounded-xl !p-4 !pb-3">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-bold text-ink-900">Shipment Statistic</h3>
        <RangeDropdown options={RANGE_OPTIONS} value={range} onChange={setRange} />
      </div>

      <div className="flex items-center gap-2">
        <p className="text-2xl font-extrabold text-ink-900">{latest.toLocaleString()}</p>
        <TrendBadge value="+4.7%" direction="up" />
      </div>

      <div className="min-h-[260px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={shipmentStatisticData} barCategoryGap="1%" margin={{ top: 70, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barInactiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D9D9D9" />
                <stop offset="100%" stopColor="#F2F2F2" />
              </linearGradient>
              <linearGradient id="barActiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-500)" />
                <stop offset="100%" stopColor="var(--color-ink-900)" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-surface-border)" />
            <YAxis
              tickFormatter={formatK}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
              width={36}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
            />
            <Bar dataKey="value" shape={makeBarShape(activeMonth, setActiveMonth)} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}