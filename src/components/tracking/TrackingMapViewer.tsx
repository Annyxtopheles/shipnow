import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import {
  Plus,
  Minus,
  RotateCcw,
  Plane,
  Truck,
  Thermometer,
  ShieldAlert,
  Navigation,
} from 'lucide-react';
import type { LiveShipmentTelemetry } from '@/data/tracking';

interface TrackingMapViewerProps {
  shipments: LiveShipmentTelemetry[];
  selectedShipment: LiveShipmentTelemetry;
  onSelectShipment: (s: LiveShipmentTelemetry) => void;
}

export function TrackingMapViewer({
  shipments,
  selectedShipment,
  onSelectShipment,
}: TrackingMapViewerProps) {
  const [zoom, setZoom] = useState(1);

  const isAir = selectedShipment.vehicleType === 'Air Cargo 767';

  return (
    <Card className="relative overflow-hidden p-0 h-[500px] sm:h-[560px] flex flex-col border border-surface-border bg-[#F8FAFC]">
      {/* Top Controls Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white p-1 rounded-xl border border-surface-border shadow-xs">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2.0, +(z + 0.2).toFixed(1)))}
          className="p-1.5 rounded-lg text-ink-700 hover:bg-surface-muted transition"
          title="Zoom In"
        >
          <Plus size={15} />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.8, +(z - 0.2).toFixed(1)))}
          className="p-1.5 rounded-lg text-ink-700 hover:bg-surface-muted transition"
          title="Zoom Out"
        >
          <Minus size={15} />
        </button>
        <div className="h-4 w-px bg-surface-border mx-0.5" />
        <button
          type="button"
          onClick={() => setZoom(1)}
          className="p-1.5 rounded-lg text-ink-700 hover:bg-surface-muted transition"
          title="Reset View"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 850 500"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${selectedShipment.currentCoords[0]}px ${selectedShipment.currentCoords[1]}px`,
            transition: 'transform 0.35s ease-out',
          }}
        >
          <defs>
            <radialGradient id="vehiclePulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
            </radialGradient>
            <filter id="cleanShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
            <pattern id="lightGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Clean Subtle Grid */}
          <rect width="850" height="500" fill="url(#lightGrid)" />

          {/* Continental US Silhouette */}
          <path
            d="M 90 90 Q 220 70 380 90 T 700 80 Q 810 130 790 240 T 740 400 Q 640 450 490 440 T 360 410 Q 240 400 130 350 T 80 200 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Inactive Shipments */}
          {shipments.map((s) => {
            if (s.shipmentId === selectedShipment.shipmentId) return null;
            return (
              <g
                key={`inactive-${s.shipmentId}`}
                className="cursor-pointer opacity-40 hover:opacity-80 transition-opacity"
                onClick={() => onSelectShipment(s)}
              >
                <path
                  d={`M ${s.originCoords[0]} ${s.originCoords[1]} Q ${(s.originCoords[0] + s.destinationCoords[0]) / 2} ${(s.originCoords[1] + s.destinationCoords[1]) / 2 - 25} ${s.destinationCoords[0]} ${s.destinationCoords[1]}`}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx={s.currentCoords[0]} cy={s.currentCoords[1]} r="6" fill="#64748B" />
                <circle cx={s.currentCoords[0]} cy={s.currentCoords[1]} r="2.5" fill="#FFFFFF" />
              </g>
            );
          })}

          {/* Active Selected Shipment Route */}
          <g>
            {/* Traveled Leg: Solid ink-900 line */}
            <path
              d={`M ${selectedShipment.originCoords[0]} ${selectedShipment.originCoords[1]} Q ${(selectedShipment.originCoords[0] + selectedShipment.currentCoords[0]) / 2} ${(selectedShipment.originCoords[1] + selectedShipment.currentCoords[1]) / 2 - 15} ${selectedShipment.currentCoords[0]} ${selectedShipment.currentCoords[1]}`}
              fill="none"
              stroke="var(--color-ink-900)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Remaining Leg: Brand purple line */}
            <path
              d={`M ${selectedShipment.currentCoords[0]} ${selectedShipment.currentCoords[1]} Q ${(selectedShipment.currentCoords[0] + selectedShipment.destinationCoords[0]) / 2} ${(selectedShipment.currentCoords[1] + selectedShipment.destinationCoords[1]) / 2 - 20} ${selectedShipment.destinationCoords[0]} ${selectedShipment.destinationCoords[1]}`}
              fill="none"
              stroke="var(--color-brand-500)"
              strokeWidth="3"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Origin Anchor */}
            <g transform={`translate(${selectedShipment.originCoords[0]}, ${selectedShipment.originCoords[1]})`}>
              <circle r="7" fill="var(--color-ink-900)" />
              <circle r="3" fill="#FFFFFF" />
              <text x="0" y="20" textAnchor="middle" fill="var(--color-ink-700)" fontSize="11" fontWeight="600">
                {selectedShipment.originCity}
              </text>
            </g>

            {/* Destination Anchor */}
            <g transform={`translate(${selectedShipment.destinationCoords[0]}, ${selectedShipment.destinationCoords[1]})`}>
              <circle r="7" fill="var(--color-brand-500)" />
              <circle r="3" fill="#FFFFFF" />
              <circle r="12" fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" opacity="0.4" />
              <text x="0" y="20" textAnchor="middle" fill="var(--color-brand-600)" fontSize="11" fontWeight="600">
                {selectedShipment.destinationCity}
              </text>
            </g>

            {/* Active Moving Vehicle Marker */}
            <g transform={`translate(${selectedShipment.currentCoords[0]}, ${selectedShipment.currentCoords[1]})`}>
              <circle r="32" fill="url(#vehiclePulse)" className="animate-pulse" />
              <circle
                r="16"
                fill="var(--color-brand-500)"
                stroke="#FFFFFF"
                strokeWidth="3"
                filter="url(#cleanShadow)"
              />
              <g transform="translate(-7, -7)">
                {isAir ? <Plane size={14} className="text-white" /> : <Truck size={14} className="text-white" />}
              </g>

              {/* Clean Floating Callout */}
              <g transform="translate(22, -26)" filter="url(#cleanShadow)">
                <rect
                  width="130"
                  height="42"
                  rx="8"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <text x="10" y="16" fill="var(--color-ink-900)" fontSize="11" fontWeight="700">
                  {selectedShipment.shipmentId}
                </text>
                <text x="10" y="30" fill="var(--color-ink-500)" fontSize="10">
                  {selectedShipment.currentSpeedMph} mph · {selectedShipment.traveledPercent}% completed
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Summary Strip */}
      <div className="p-3.5 bg-white border-t border-surface-border flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink-900">{selectedShipment.vehicleId}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-surface-muted text-ink-700 border border-surface-border">
              {selectedShipment.vehicleType}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-ink-500">
            <Navigation size={13} className="text-brand-600" />
            <span>Driver: <strong className="text-ink-900 font-semibold">{selectedShipment.driverName}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-ink-600">
          {selectedShipment.temperatureCelsius !== undefined && (
            <div className="flex items-center gap-1 text-sky-600 font-medium">
              <Thermometer size={14} />
              <span>{selectedShipment.temperatureCelsius}°C Reefer</span>
            </div>
          )}
          {selectedShipment.weatherAlert && (
            <div className="hidden md:flex items-center gap-1 text-amber-600 font-medium">
              <ShieldAlert size={14} />
              <span>{selectedShipment.weatherAlert}</span>
            </div>
          )}
          <div>
            ETA: <span className="font-bold text-ink-900">{selectedShipment.estimatedArrival}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
