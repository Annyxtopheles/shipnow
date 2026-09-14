import { useState, useRef, useEffect } from 'react';
import { Search, Plus, Minus, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useShipments } from '@/context/ShipmentContext';
import checkCircle from '@/assets/icons/check-circle.png';
import copySimple from '@/assets/icons/copy-simple.png';
import truckIcon from '@/assets/icons/nav-shipments.png';

export function TrackingCard() {
  const { activeTracking, setActiveTrackingShipment, shipments, setSelectedShipmentForDetail } = useShipments();
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleZoomIn() {
    setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)));
  }

  function handleZoomOut() {
    setZoom((z) => Math.max(0.85, +(z - 0.15).toFixed(2)));
  }

  function handleCopy() {
    navigator.clipboard.writeText(activeTracking.shipmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const matchingShipments = searchQuery.trim()
    ? shipments.filter(
        (s) =>
          s.id.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          s.company.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : [];

  return (
    <Card className="flex h-full flex-col">
      {/* Static map area with a two-tone route line: solid black for the traveled
          portion, solid purple for the remaining portion, meeting at the live marker. */}
      <div className="relative min-h-56 w-full flex-1 overflow-hidden rounded-xl bg-surface-muted">
        <svg
          viewBox="0 0 400 200"
          className="absolute inset-0 h-full w-full transition-transform duration-200"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: '200px 100px',
              transition: 'transform 0.2s ease-out',
            }}
          >
            {/* traveled segment - black */}
            <line x1="20" y1="160" x2="192" y2="95" stroke="var(--color-ink-900)" strokeWidth="3" strokeLinecap="round" />
            {/* remaining segment - purple */}
            <line x1="192" y1="95" x2="380" y2="35" stroke="var(--color-brand-500)" strokeWidth="3" strokeLinecap="round" />

            <circle cx="20" cy="160" r="4" fill="var(--color-ink-900)" />
            <circle cx="380" cy="35" r="4" fill="var(--color-brand-500)" />

            {/* live marker: soft glow + solid circle + paper-plane icon */}
            <circle cx="192" cy="95" r="26" fill="url(#markerGlow)" />
            <circle cx="192" cy="95" r="14" fill="var(--color-brand-500)" stroke="white" strokeWidth="3" />
            <g transform="translate(192 95) rotate(-25)">
              <path d="M -6 6 L 8 0 L -6 -6 L -3 0 Z" fill="white" />
            </g>
          </g>
        </svg>

        {/* Search bar: a compact overlay pinned to the top-left of the map */}
        <div ref={searchRef} className="absolute left-3 top-3 w-48 sm:w-56 z-20">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search by Shipping ID..."
              className="w-full rounded-full bg-white py-2 pl-4 pr-9 text-xs shadow outline-none placeholder:text-ink-500 focus:ring-2 focus:ring-brand-500"
            />
            <Search size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500" />
          </div>

          {searchOpen && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto rounded-xl border border-surface-border bg-white p-1.5 shadow-xl text-xs">
              {matchingShipments.length === 0 ? (
                <p className="p-2 text-ink-500">No matching shipment</p>
              ) : (
                matchingShipments.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActiveTrackingShipment(s.id);
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-surface-muted"
                  >
                    <div>
                      <p className="font-semibold text-ink-900">{s.id}</p>
                      <p className="text-[11px] text-ink-500">{s.company}</p>
                    </div>
                    <span className="text-[11px] font-medium text-brand-600">{s.status}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            title="Zoom in"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-ink-700 shadow transition hover:bg-surface-muted active:scale-95"
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            title="Zoom out"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-ink-700 shadow transition hover:bg-surface-muted active:scale-95"
          >
            <Minus size={14} />
          </button>
        </div>

        {/* Bottom tracking information banner */}
        <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white p-3 shadow-lg z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const match = shipments.find((s) => s.id === activeTracking.shipmentId);
                    if (match) setSelectedShipmentForDetail(match);
                  }}
                  className="text-sm font-bold text-ink-900 hover:text-brand-600 hover:underline"
                  title="View shipment details"
                >
                  {activeTracking.shipmentId}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy shipment ID"
                  aria-label="Copy shipment ID"
                  className="flex items-center gap-1 text-[11px] text-ink-500 hover:text-ink-900"
                >
                  {copied ? (
                    <span className="flex items-center gap-0.5 font-semibold text-emerald-600">
                      <Check size={12} /> Copied!
                    </span>
                  ) : (
                    <img src={copySimple} alt="Copy shipment ID" className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />
                  )}
                </button>
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