import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Plus, Minus, RotateCcw, Navigation, Plane, Truck, Thermometer, ShieldAlert, Zap } from 'lucide-react';
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
  const [showRadar, setShowRadar] = useState(false);

  const getVehicleIcon = (type: LiveShipmentTelemetry['vehicleType']) => {
    switch (type) {
      case 'Air Cargo 767':
        return <Plane size={14} className="text-white" />;
      default:
        return <Truck size={14} className="text-white" />;
    }
  };

  return (
    <Card className="relative overflow-hidden p-0 h-[480px] sm:h-[540px] flex flex-col bg-surface-muted/60 border border-surface-border">
      {/* Map Header Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-surface-border shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-ink-900">Live Satellite Telemetry</span>
          <span className="text-[11px] text-ink-500">· {shipments.length} Active Feeds</span>
        </div>

        {/* Map Control Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-xs p-1 rounded-xl border border-surface-border shadow-xs">
          <button
            type="button"
            onClick={() => setShowRadar((r) => !r)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              showRadar ? 'bg-brand-500 text-white shadow-xs' : 'text-ink-600 hover:bg-surface-muted'
            }`}
            title="Toggle Weather Radar Simulation"
          >
            <Zap size={13} />
            <span className="hidden sm:inline">Weather Radar</span>
          </button>
          <div className="h-4 w-px bg-surface-border mx-0.5" />
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
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg text-ink-700 hover:bg-surface-muted transition"
            title="Reset View"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
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
            <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="weatherCloud" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Map Grid Matrix */}
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
          </pattern>
          <rect width="850" height="500" fill="url(#gridPattern)" />

          {/* Simplified US Continental Map Silhouette */}
          <path
            d="M 90 90 Q 220 70 380 90 T 700 80 Q 810 130 790 240 T 740 400 Q 640 450 490 440 T 360 410 Q 240 400 130 350 T 80 200 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Weather radar simulation layer */}
          {showRadar && (
            <g className="animate-pulse">
              <ellipse cx="510" cy="310" rx="110" ry="60" fill="url(#weatherCloud)" />
              <ellipse cx="370" cy="200" rx="80" ry="40" fill="url(#weatherCloud)" />
            </g>
          )}

          {/* All Inactive Route Lines */}
          {shipments.map((s) => {
            if (s.shipmentId === selectedShipment.shipmentId) return null;
            return (
              <g key={`inactive-route-${s.shipmentId}`} className="opacity-40 hover:opacity-80 transition-opacity">
                <path
                  d={`M ${s.originCoords[0]} ${s.originCoords[1]} Q ${(s.originCoords[0] + s.destinationCoords[0]) / 2} ${(s.originCoords[1] + s.destinationCoords[1]) / 2 - 30} ${s.destinationCoords[0]} ${s.destinationCoords[1]}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={s.currentCoords[0]}
                  cy={s.currentCoords[1]}
                  r="6"
                  fill="#64748b"
                  className="cursor-pointer"
                  onClick={() => onSelectShipment(s)}
                />
              </g>
            );
          })}

          {/* Active Selected Route Line */}
          <g>
            {/* Traveled portion (solid ink) */}
            <path
              d={`M ${selectedShipment.originCoords[0]} ${selectedShipment.originCoords[1]} Q ${(selectedShipment.originCoords[0] + selectedShipment.currentCoords[0]) / 2} ${(selectedShipment.originCoords[1] + selectedShipment.currentCoords[1]) / 2 - 15} ${selectedShipment.currentCoords[0]} ${selectedShipment.currentCoords[1]}`}
              fill="none"
              stroke="var(--color-ink-900)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Remaining portion (brand purple) */}
            <path
              d={`M ${selectedShipment.currentCoords[0]} ${selectedShipment.currentCoords[1]} Q ${(selectedShipment.currentCoords[0] + selectedShipment.destinationCoords[0]) / 2} ${(selectedShipment.currentCoords[1] + selectedShipment.destinationCoords[1]) / 2 - 20} ${selectedShipment.destinationCoords[0]} ${selectedShipment.destinationCoords[1]}`}
              fill="none"
              stroke="var(--color-brand-500)"
              strokeWidth="3.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Origin Anchor */}
            <g transform={`translate(${selectedShipment.originCoords[0]}, ${selectedShipment.originCoords[1]})`}>
              <circle r="7" fill="var(--color-ink-900)" />
              <circle r="3" fill="#ffffff" />
              <text x="0" y="20" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
                {selectedShipment.originCity}
              </text>
            </g>

            {/* Destination Anchor */}
            <g transform={`translate(${selectedShipment.destinationCoords[0]}, ${selectedShipment.destinationCoords[1]})`}>
              <circle r="7" fill="var(--color-brand-500)" />
              <circle r="3" fill="#ffffff" />
              <text x="0" y="20" textAnchor="middle" fill="var(--color-brand-600)" fontSize="10" fontWeight="bold">
                {selectedShipment.destinationCity}
              </text>
            </g>

            {/* Active Moving Marker */}
            <g transform={`translate(${selectedShipment.currentCoords[0]}, ${selectedShipment.currentCoords[1]})`}>
              {/* Radar pulse beacon */}
              <circle r="36" fill="url(#beaconGlow)" className="animate-pulse" />
              {/* Main Badge */}
              <circle r="16" fill="var(--color-brand-500)" stroke="#ffffff" strokeWidth="3" filter="url(#shadowFilter)" />
              <g transform="translate(-7, -7)">
                {getVehicleIcon(selectedShipment.vehicleType)}
              </g>

              {/* Floating Status Card pinned to vehicle */}
              <g transform="translate(24, -28)" filter="url(#shadowFilter)">
                <rect width="130" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <text x="10" y="16" fill="#0f172a" fontSize="10" fontWeight="bold">
                  {selectedShipment.shipmentId}
                </text>
                <text x="10" y="30" fill="#64748b" fontSize="9">
                  {selectedShipment.currentSpeedMph} mph · {selectedShipment.traveledPercent}% Completed
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Floating Bottom Quick-Telemetry Strip */}
      <div className="p-3 bg-white border-t border-surface-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink-900">{selectedShipment.vehicleId}</span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-muted text-ink-700 border border-surface-border">
              {selectedShipment.vehicleType}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-ink-500">
            <Navigation size={13} className="text-brand-600" />
            <span>Driver: <strong className="text-ink-900">{selectedShipment.driverName}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-ink-600">
          {selectedShipment.temperatureCelsius !== undefined && (
            <div className="flex items-center gap-1 text-sky-600 font-semibold">
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
          <div className="font-medium">
            ETA: <span className="font-bold text-ink-900">{selectedShipment.estimatedArrival}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
