import { Card } from '@/components/ui/Card';
import { TrendBadge } from '@/components/ui/TrendBadge';
import { CheckCircle2, Zap, Leaf, Award } from 'lucide-react';

export function AnalyticsMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* On-Time Delivery */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">On-Time Delivery (OTD)</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">98.6%</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value="+1.5%" direction="up" />
            <span className="text-[11px] text-ink-500">vs 97.0% target SLA</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={20} />
        </div>
      </Card>

      {/* Transit Velocity */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Average Transit Velocity</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">2.6 Days</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value="-0.4d" direction="up" />
            <span className="text-[11px] text-ink-500">faster across routes</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
          <Zap size={20} />
        </div>
      </Card>

      {/* Carbon Reduction */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Carbon Fleet Index</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">-14.2%</p>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendBadge value="Optimized" direction="up" />
            <span className="text-[11px] text-ink-500">eco-routing efficiency</span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
          <Leaf size={20} />
        </div>
      </Card>

      {/* SLA Compliance */}
      <Card className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-500">Partner SLA Compliance</p>
          <p className="mt-1.5 text-2xl font-extrabold text-ink-900">99.1%</p>
          <p className="mt-2 text-[11px] font-medium text-emerald-600">Tier-1 logistics status</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Award size={20} />
        </div>
      </Card>
    </div>
  );
}
