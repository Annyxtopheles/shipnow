import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { shipmentTypeData, totalShipments } from '@/data/dashboardStats';

export function ShipmentTypeCard() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader title="Shipment Type" action={<MoreHorizontal size={18} className="text-ink-500" />} />

      <div className="relative mx-auto my-auto h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={shipmentTypeData}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={70}
              paddingAngle={0}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {shipmentTypeData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-ink-500">Total Shipment</p>
          <p className="text-xl font-extrabold text-ink-900">{totalShipments.toLocaleString()}</p>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3">
        {[shipmentTypeData[0], shipmentTypeData[2], shipmentTypeData[1], shipmentTypeData[3]].map((entry) => (
          <li key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
              style={{
                backgroundColor: entry.color,
                color: entry.percent < 20 ? 'var(--color-ink-900)' : 'white',
              }}
            >
              {entry.percent}%
            </span>
            <span>
              <span className="block font-semibold text-ink-900">{entry.name}</span>
              <span className="text-ink-500">{entry.value.toLocaleString()} shipments</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}