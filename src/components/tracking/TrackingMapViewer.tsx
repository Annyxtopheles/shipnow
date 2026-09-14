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
  Zap,
  Radio,
  Compass,
} from 'lucide-react';
import type { LiveShipmentTelemetry } from '@/data/tracking';

interface TrackingMapViewerProps {
  shipments: LiveShipmentTelemetry[];
  selectedShipment: LiveShipmentTelemetry;
  onSelectShipment: (s: LiveShipmentTelemetry) => void;
}

// Major National Distribution Gateway Hubs
const GATEWAY_HUBS = [
  { code: 'SEA', name: 'Seattle', x: 130, y: 90 },
  { code: 'SFO', name: 'San Francisco', x: 80, y: 230 },
  { code: 'LAX', name: 'Los Angeles', x: 110, y: 310 },
  { code: 'DEN', name: 'Denver', x: 330, y: 230 },
  { code: 'DFW', name: 'Dallas', x: 430, y: 360 },
  { code: 'ORD', name: 'Chicago', x: 540, y: 190 },
  { code: 'ATL', name: 'Atlanta', x: 620, y: 320 },
  { code: 'JFK', name: 'New York', x: 730, y: 160 },
  { code: 'MIA', name: 'Miami', x: 710, y: 440 },
];

// Major Interstate Corridors
const INTERSTATE_CORRIDORS = [
  // I-80: SF -> Salt Lake -> Denver -> Omaha -> Chicago -> NYC
  'M 80 230 L 220 220 L 330 230 L 460 210 L 540 190 L 730 160',
  // I-90: Seattle -> Spokane -> Minneapolis -> Chicago -> Boston
  'M 130 90 L 210 100 L 470 140 L 540 190 L 760 120',
  // I-10: LA -> Phoenix -> El Paso -> Houston -> Jacksonville
  'M 110 310 L 190 340 L 300 370 L 450 390 L 650 380',
  // I-95: Miami -> Jacksonville -> Richmond -> DC -> Philly -> NYC -> Boston
  'M 710 440 L 660 370 L 680 250 L 700 200 L 730 160 L 760 120',
  // I-35: Minneapolis -> KC -> Dallas -> Laredo
  'M 470 140 L 460 230 L 430 360 L 400 420',
  // I-5: Seattle -> Portland -> Sacramento -> LA -> San Diego
  'M 130 90 L 120 130 L 95 210 L 110 310 L 120 340',
];

export function TrackingMapViewer({
  shipments,
  selectedShipment,
  onSelectShipment,
}: TrackingMapViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [showRadar, setShowRadar] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  // Compute angle of trajectory toward destination
  const dx = selectedShipment.destinationCoords[0] - selectedShipment.currentCoords[0];
  const dy = selectedShipment.destinationCoords[1] - selectedShipment.currentCoords[1];
  const headingAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const isAir = selectedShipment.vehicleType === 'Air Cargo 767';

  return (
    <Card className={`relative overflow-hidden p-0 h-[500px] sm:h-[560px] flex flex-col border border-surface-border transition-colors duration-300 ${
      nightMode ? 'bg-[#0B0F19]' : 'bg-[#F8FAFC]'
    }`}>
      {/* Top HUD Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Live Signal Lock Telemetry Indicator */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 dark:bg-ink-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-surface-border shadow-md">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="text-xs">
            <div className="flex items-center gap-1.5 font-bold text-ink-900">
              <span>SATELLITE TELEMETRY</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-brand-50 text-brand-700 border border-brand-200">
                DGPS 3D FIX
              </span>
            </div>
            <div className="text-[10px] text-ink-500 font-mono">
              12 SATS · 0.02s LATENCY · ENCRYPTED
            </div>
          </div>
        </div>

        {/* Map View Mode & Zoom Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md p-1 rounded-xl border border-surface-border shadow-md">
          <button
            type="button"
            onClick={() => setNightMode((n) => !n)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              nightMode ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-surface-muted'
            }`}
            title="Toggle Tactical Night Mode"
          >
            <Compass size={13} />
            <span className="hidden sm:inline">Night Radar</span>
          </button>
          <button
            type="button"
            onClick={() => setShowRadar((r) => !r)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              showRadar ? 'bg-brand-500 text-white shadow-xs' : 'text-ink-600 hover:bg-surface-muted'
            }`}
            title="Toggle Live Weather Radar"
          >
            <Zap size={13} />
            <span className="hidden sm:inline">Radar</span>
          </button>
          <div className="h-4 w-px bg-surface-border mx-0.5" />
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2.2, +(z + 0.2).toFixed(1)))}
            className="p-1.5 rounded-lg text-ink-700 hover:bg-surface-muted transition"
            title="Zoom In"
          >
            <Plus size={15} />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.2).toFixed(1)))}
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

      {/* Live Tactical Instrument Telemetry HUD (Bottom Left Canvas Overlay) */}
      <div className="absolute bottom-16 left-3.5 z-20 pointer-events-none hidden sm:block">
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-surface-border shadow-lg space-y-1.5 pointer-events-auto min-w-[210px]">
          <div className="flex items-center justify-between border-b border-surface-border pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
              Live Vector Telemetry
            </span>
            <span className="font-mono text-[10px] text-ink-400 font-bold">{selectedShipment.vehicleId}</span>
          </div>

          <div className="font-mono text-[11px] space-y-1 text-ink-700">
            <div className="flex items-center justify-between">
              <span className="text-ink-400">COORDS:</span>
              <span className="font-bold text-ink-900">{selectedShipment.latLong}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-400">HEADING:</span>
              <span className="font-bold text-ink-900">{selectedShipment.heading}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-400">ALTITUDE:</span>
              <span className="font-bold text-ink-900">{selectedShipment.altitude}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-400">VELOCITY:</span>
              <span className="font-bold text-brand-600">{selectedShipment.currentSpeedMph} MPH</span>
            </div>
          </div>
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
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            <radialGradient id="vehicleRadarPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.45" />
              <stop offset="70%" stopColor="var(--color-brand-500)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="radarCloud" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <filter id="hudShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.18" />
            </filter>
            <pattern id="telemetryGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke={nightMode ? '#1E293B' : '#E2E8F0'}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* Background Technical Grid Matrix */}
          <rect width="850" height="500" fill="url(#telemetryGrid)" />

          {/* Authentic Continental United States Geographic Silhouette */}
          <g>
            <path
              d="
                M 135 78
                L 190 85 L 240 85 L 320 85 L 420 85 L 470 95
                C 490 95, 505 105, 520 120
                L 540 135 L 565 125 L 590 140 L 610 150
                L 640 140 L 670 145 L 700 130 L 730 115 L 760 95
                L 775 105 L 760 140 L 740 155 L 730 165 L 725 180
                L 715 200 L 705 230 L 690 270 L 660 330 L 640 370
                C 645 390, 665 410, 680 435
                C 685 445, 680 455, 675 460
                C 665 450, 655 425, 640 395
                L 620 375 L 590 380 L 550 375 L 510 380 L 480 370
                L 440 390 L 430 420 L 400 430 L 375 415 L 340 380
                L 300 370 L 260 370 L 220 370 L 170 370 L 130 350
                L 120 340 L 115 320 L 105 300 L 90 250 L 80 230
                L 85 200 L 95 160 L 110 120 L 125 90 Z
              "
              fill={nightMode ? '#0F172A' : '#FFFFFF'}
              stroke={nightMode ? '#334155' : '#CBD5E1'}
              strokeWidth="2"
              filter="url(#hudShadow)"
            />

            {/* Great Lakes Cutout Details */}
            <path
              d="M 505 105 Q 525 110 535 125 T 555 125 T 575 135 T 595 145"
              fill="none"
              stroke={nightMode ? '#1E293B' : '#E2E8F0'}
              strokeWidth="1.5"
            />
          </g>

          {/* National Interstate Logistics Arterial Corridors */}
          <g opacity={nightMode ? 0.35 : 0.45}>
            {INTERSTATE_CORRIDORS.map((pathStr, idx) => (
              <path
                key={`arterial-${idx}`}
                d={pathStr}
                fill="none"
                stroke={nightMode ? '#64748B' : '#94A3B8'}
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            ))}
          </g>

          {/* Weather radar simulation layer */}
          {showRadar && (
            <g className="animate-pulse">
              <ellipse cx="520" cy="340" rx="90" ry="50" fill="url(#radarCloud)" />
              <ellipse cx="370" cy="220" rx="70" ry="40" fill="url(#radarCloud)" />
            </g>
          )}

          {/* Fixed Regional Logistics Distribution Gateway Hubs */}
          <g>
            {GATEWAY_HUBS.map((hub) => (
              <g key={hub.code} transform={`translate(${hub.x}, ${hub.y})`} className="cursor-pointer">
                <circle r="4" fill={nightMode ? '#475569' : '#94A3B8'} />
                <circle r="8" fill="none" stroke={nightMode ? '#334155' : '#CBD5E1'} strokeWidth="1" strokeDasharray="2 2" />
                <text
                  x="0"
                  y="-11"
                  textAnchor="middle"
                  fill={nightMode ? '#94A3B8' : '#64748B'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {hub.code}
                </text>
              </g>
            ))}
          </g>

          {/* Inactive Live Shipments on Road/Air */}
          {shipments.map((s) => {
            if (s.shipmentId === selectedShipment.shipmentId) return null;
            return (
              <g
                key={`inactive-${s.shipmentId}`}
                className="cursor-pointer group opacity-40 hover:opacity-100 transition-opacity"
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
                <circle cx={s.currentCoords[0]} cy={s.currentCoords[1]} r="3" fill="#FFFFFF" />
              </g>
            );
          })}

          {/* Active Selected Shipment Route */}
          <g>
            {/* Traveled Leg: Solid ink line with arrow marks */}
            <path
              d={`M ${selectedShipment.originCoords[0]} ${selectedShipment.originCoords[1]} Q ${(selectedShipment.originCoords[0] + selectedShipment.currentCoords[0]) / 2} ${(selectedShipment.originCoords[1] + selectedShipment.currentCoords[1]) / 2 - 15} ${selectedShipment.currentCoords[0]} ${selectedShipment.currentCoords[1]}`}
              fill="none"
              stroke="var(--color-ink-900)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Remaining Leg: Brand purple glowing dashed line */}
            <path
              d={`M ${selectedShipment.currentCoords[0]} ${selectedShipment.currentCoords[1]} Q ${(selectedShipment.currentCoords[0] + selectedShipment.destinationCoords[0]) / 2} ${(selectedShipment.currentCoords[1] + selectedShipment.destinationCoords[1]) / 2 - 20} ${selectedShipment.destinationCoords[0]} ${selectedShipment.destinationCoords[1]}`}
              fill="none"
              stroke="var(--color-brand-500)"
              strokeWidth="3.5"
              strokeDasharray="7 5"
              strokeLinecap="round"
            />

            {/* Origin Hub Marker */}
            <g transform={`translate(${selectedShipment.originCoords[0]}, ${selectedShipment.originCoords[1]})`}>
              <circle r="7" fill="var(--color-ink-900)" />
              <circle r="3" fill="#FFFFFF" />
              <text x="0" y="20" textAnchor="middle" fill={nightMode ? '#E2E8F0' : '#1E293B'} fontSize="10" fontWeight="bold">
                {selectedShipment.originCity}
              </text>
            </g>

            {/* Destination Hub Marker */}
            <g transform={`translate(${selectedShipment.destinationCoords[0]}, ${selectedShipment.destinationCoords[1]})`}>
              <circle r="8" fill="var(--color-brand-500)" />
              <circle r="3.5" fill="#FFFFFF" />
              <circle r="14" fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="0" y="22" textAnchor="middle" fill="var(--color-brand-600)" fontSize="10" fontWeight="bold">
                {selectedShipment.destinationCity}
              </text>
            </g>

            {/* Live Moving Vehicle Telemetry Beacon */}
            <g transform={`translate(${selectedShipment.currentCoords[0]}, ${selectedShipment.currentCoords[1]})`}>
              {/* Pulsing Radar Rings */}
              <circle r="44" fill="url(#vehicleRadarPulse)" className="animate-ping" />
              <circle r="26" fill="url(#vehicleRadarPulse)" />

              {/* Vehicle Directional Heading Compass Arrow */}
              <g transform={`rotate(${headingAngle})`}>
                <polygon points="22,0 14,-5 16,0 14,5" fill="var(--color-brand-500)" />
              </g>

              {/* Main Vehicle Marker Disc */}
              <circle
                r="16"
                fill="var(--color-brand-500)"
                stroke="#FFFFFF"
                strokeWidth="3"
                filter="url(#hudShadow)"
              />

              {/* Vehicle Mode Icon */}
              <g transform="translate(-7, -7)">
                {isAir ? <Plane size={14} className="text-white" /> : <Truck size={14} className="text-white" />}
              </g>

              {/* Floating Tactical Callout Box */}
              <g transform="translate(24, -30)" filter="url(#hudShadow)">
                <rect
                  width="136"
                  height="44"
                  rx="8"
                  fill={nightMode ? '#0F172A' : '#FFFFFF'}
                  stroke={nightMode ? '#334155' : '#E2E8F0'}
                  strokeWidth="1.5"
                />
                <text x="10" y="17" fill={nightMode ? '#F8FAFC' : '#0F172A'} fontSize="10" fontWeight="bold">
                  {selectedShipment.shipmentId}
                </text>
                <text x="10" y="32" fill={nightMode ? '#94A3B8' : '#64748B'} fontSize="9" fontFamily="monospace">
                  {selectedShipment.currentSpeedMph} MPH · {selectedShipment.traveledPercent}% PROG
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="p-3 bg-white border-t border-surface-border flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink-900">{selectedShipment.vehicleId}</span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-muted text-ink-700 border border-surface-border">
              {selectedShipment.vehicleType}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-ink-500">
            <Radio size={13} className="text-brand-600 animate-pulse" />
            <span>Driver: <strong className="text-ink-900">{selectedShipment.driverName}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-ink-600">
          {selectedShipment.temperatureCelsius !== undefined && (
            <div className="flex items-center gap-1 text-sky-600 font-semibold font-mono">
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
