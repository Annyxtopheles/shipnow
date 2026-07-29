import { useState } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { RangeDropdown } from '@/components/ui/RangeDropdown';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { profitSummaryData } from '@/data/dashboardStats';

const RANGE_OPTIONS = ['Last 8 Months', 'Last Year', 'Last 3 Months'];

// Rounded-rect path with every corner rounded except the bottom-left, which stays square
function calloutPath(w: number, h: number, r: number) {
  return `M ${r} 0 L ${w - r} 0 A ${r} ${r} 0 0 1 ${w} ${r} L ${w} ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} L 0 ${h} L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;
}

// Bar path with rounded top corners only, square bottom (bars sit flush on the baseline)
function barPath(w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h);
  return `M 0 ${h} L 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius} 0 L ${w - radius} 0 A ${radius} ${radius} 0 0 1 ${w} ${radius} L ${w} ${h} Z`;
}

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { month: string; revenue: number; cost: number };
}

function makeRevenueShape(
  activeMonth: string,
  onSelect: (month: string) => void,
) {
  return function RevenueShape(props: BarShapeProps) {
    const { x = 0, y = 0, width = 0, height = 0, payload } = props;
    const isActive = payload?.month === activeMonth;

    const calloutW = 190;
    const calloutH = 66;
    const calloutX = x + width / 2 - calloutW / 2;
    const calloutY = Math.max(y - calloutH - 14, 4);

    return (
      <g onClick={() => payload?.month && onSelect(payload.month)} style={{ cursor: 'pointer' }}>
        <path
          transform={`translate(${x}, ${y})`}
          d={barPath(width, height, 5)}
          fill="var(--color-brand-500)"
          opacity={isActive ? 1 : 0.25}
        />
        {isActive && payload && (
          <g transform={`translate(${calloutX}, ${calloutY})`}>
            <path d={calloutPath(calloutW, calloutH, 10)} fill="var(--color-surface-muted)" />
            <circle cx={16} cy={20} r={4} fill="var(--color-brand-500)" />
            <text x={26} y={24} fontSize={12} fill="var(--color-ink-700)">
              Revenue
            </text>
            <text x={calloutW - 12} y={24} textAnchor="end" fontSize={13} fontWeight={700} fill="var(--color-ink-900)">
              ${payload.revenue.toLocaleString()}
            </text>
            <circle cx={16} cy={46} r={4} fill="var(--color-chart-black)" />
            <text x={26} y={50} fontSize={12} fill="var(--color-ink-700)">
              Cost
            </text>
            <text x={calloutW - 12} y={50} textAnchor="end" fontSize={13} fontWeight={700} fill="var(--color-ink-900)">
              ${payload.cost.toLocaleString()}
            </text>
          </g>
        )}
      </g>
    );
  };
}

function makeCostShape(activeMonth: string, onSelect: (month: string) => void) {
  return function CostShape(props: BarShapeProps) {
    const { x = 0, y = 0, width = 0, height = 0, payload } = props;
    const isActive = payload?.month === activeMonth;
    return (
      <path
        transform={`translate(${x}, ${y})`}
        d={barPath(width, height, 5)}
        fill="var(--color-chart-black)"
        opacity={isActive ? 1 : 0.25}
        onClick={() => payload?.month && onSelect(payload.month)}
        style={{ cursor: 'pointer' }}
      />
    );
  };
}

export function ProfitSummaryCard() {
  const [range, setRange] = useState(RANGE_OPTIONS[0]);
  const defaultActive = profitSummaryData[4].month; // May, matching the design's highlighted month
  const [activeMonth, setActiveMonth] = useState(defaultActive);
  const total = profitSummaryData.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <Card className="flex h-full flex-col gap-4 !rounded-xl !p-4 !pb-3">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-bold text-ink-900">Profit Summary</h3>
        <RangeDropdown options={RANGE_OPTIONS} value={range} onChange={setRange} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-extrabold text-ink-900">${total.toLocaleString()}</p>
          <TrendBadge value="5.62%" direction="up" />
        </div>
        <div className="flex gap-4 text-xs text-ink-700">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-900" /> Cost
          </span>
        </div>
      </div>

      <div className="min-h-[260px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={profitSummaryData} barCategoryGap="15%" barGap={3} margin={{ top: 84, right: 4, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
            />
            <Bar dataKey="revenue" shape={makeRevenueShape(activeMonth, setActiveMonth)} />
            <Bar dataKey="cost" shape={makeCostShape(activeMonth, setActiveMonth)} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}