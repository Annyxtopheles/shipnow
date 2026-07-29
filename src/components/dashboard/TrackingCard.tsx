import { Search, Plus, Minus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { activeTracking } from '@/data/dashboardStats';
import checkCircle from '@/assets/icons/check-circle.png';
import copySimple from '@/assets/icons/copy-simple.png';
import truckIcon from '@/assets/icons/nav-shipments.png';

export function TrackingCard() {
  return (
    <Card className="flex h-full flex-col">
      {/* Static map area with a two-tone route line: solid black for the traveled
          portion, solid purple for the remaining portion, meeting at the live marker.
          Per the assignment FAQ, a static map with route indicator/marker/controls
          is acceptable in place of a live mapping SDK. */}
      <div className="relative min-h-56 w-full flex-1 overflow-hidden rounded-xl bg-surface-muted">
        {/* preserveAspectRatio="xMidYMid slice" scales uniformly (like CSS
            background-size: cover) so circles stay circular no matter the
            container's aspect ratio, instead of stretching into ellipses. */}
        <svg
          viewBox="0 0 400 200"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* traveled segment - black */}
          <line x1="20" y1="160" x2="192" y2="95" stroke="var(--color-ink-900)" strokeWidth="3" strokeLinecap="round" />
          {/* remaining segment - purple */}
          <line x1="192" y1="95" x2="380" y2="35" stroke="var(--color-brand-500)" strokeWidth="3" strokeLinecap="round" />

          <circle cx="20" cy="160" r="4" fill="var(--color-ink-900)" />
          <circle cx="380" cy="35" r="4" fill="var(--color-brand-500)" />

          {/* live marker: soft glow + solid circle + paper-plane icon drawn
              directly in SVG so it scales together with the circle and is
              never cropped or distorted */}
          <circle cx="192" cy="95" r="26" fill="url(#markerGlow)" />
          <circle cx="192" cy="95" r="14" fill="var(--color-brand-500)" stroke="white" strokeWidth="3" />
          <g transform="translate(192 95) rotate(-25)">
            <path d="M -6 6 L 8 0 L -6 -6 L -3 0 Z" fill="white" />
          </g>
        </svg>

        {/* Search bar: a compact overlay pinned to the top-left of the map,
            not a full-width element. */}
        <div className="absolute left-3 top-3 w-44 sm:w-52">
          <div className="relative">
            <input
              type="search"
              placeholder="Search by Shipping ID..."
              className="w-full rounded-full bg-white py-2 pl-4 pr-9 text-sm shadow outline-none placeholder:text-ink-500 focus:ring-2 focus:ring-brand-500"
            />
            <Search size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500" />
          </div>
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <button className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-ink-700 shadow">
            <Plus size={14} />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-ink-700 shadow">
            <Minus size={14} />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white p-3 shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-ink-900">{activeTracking.shipmentId}</p>
                <img src={copySimple} alt="Copy shipment ID" className="h-3.5 w-3.5 opacity-60" />
              </div>
              <Badge tone="blue">{activeTracking.status}</Badge>
              <span className="flex items-center gap-1 text-xs text-ink-500">
                <img src={checkCircle} alt="" className="h-3.5 w-3.5" />
                {activeTracking.scheduleNote}
              </span>
            </div>
            <div className="text-right text-xs text-ink-500">
              <p>{activeTracking.courierLabel}:</p>
              <p className="font-semibold text-ink-900">{activeTracking.courierName}</p>
              <p>{activeTracking.courierCompany}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px var(--color-brand-500)' }}
            />
            <div className="relative h-1 flex-1 rounded-full bg-surface-border">
              <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-brand-500" />
              <span className="absolute left-2/3 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500 shadow ring-2 ring-white">
                <img
                  src={truckIcon}
                  alt=""
                  className="h-3 w-3"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </span>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-surface-border"
              style={{ boxShadow: '0 0 0 2px white, 0 0 0 4px var(--color-surface-border)' }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-ink-500">
            <div>
              <p className="font-semibold text-ink-900">{activeTracking.origin.label}</p>
              <p>{activeTracking.origin.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink-900">{activeTracking.destination.label}</p>
              <p>{activeTracking.destination.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}