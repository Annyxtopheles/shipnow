import type { ShipmentStatus } from '@/data/shipments';

export type StatusFilter = 'All' | ShipmentStatus;

const TABS: StatusFilter[] = ['All', 'Delivered', 'In Transit', 'Processing', 'Out for Delivery'];

export function StatusTabs({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}) {
  return (
    <div className="flex flex-nowrap items-stretch overflow-x-auto rounded-2xl bg-white md:rounded-lg xl:rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map((tab) => {
        const isActive = tab === value;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`shrink-0 whitespace-nowrap px-2.5 py-2.5 md:px-2.5 md:py-2 xl:px-4 xl:py-3.5 text-xs font-semibold transition ${
              isActive ? 'rounded-2xl bg-ink-900 text-white md:rounded-lg xl:rounded-2xl' : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}