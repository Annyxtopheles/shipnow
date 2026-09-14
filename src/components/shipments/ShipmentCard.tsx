import type { Shipment, ShipmentStatus } from '@/data/shipments';
import statusPlane from '@/assets/icons/status-plane.png';
import statusTruck from '@/assets/icons/status-truck.png';
import statusBus from '@/assets/icons/status-bus.png';
import statusBoat from '@/assets/icons/status-boat.png';
import logoTechgear from '@/assets/icons/logo-techgear.png';
import logoStylehub from '@/assets/icons/logo-stylehub.png';
import logoFreshnest from '@/assets/icons/logo-freshnest.png';
import logoFitplusgear from '@/assets/icons/logo-fitplusgear.png';
import logoEcolights from '@/assets/icons/logo-ecolights.png';
import logoAutopartspro from '@/assets/icons/logo-autopluspro.png';
import logoGreenhaven from '@/assets/icons/logo-greenheven.png';
import logoModawear from '@/assets/icons/logo-modawater.png';
import logoSuncorepanels from '@/assets/icons/logo-suncorepanels.png';
import logoQuickparts from '@/assets/icons/logo-quickparts.png';
import logoVitafresh from '@/assets/icons/logo-vitafresh.png';
import logoStyledepot from '@/assets/icons/logo-styledepot.png';
import markerDestination from '@/assets/icons/marker-destination.png';

// One status icon per shipment status, shown in the top-right corner badge.
const statusIcons: Record<ShipmentStatus, string> = {
  'In Transit': statusPlane,
  'Out for Delivery': statusTruck,
  Processing: statusBus,
  Delivered: statusBoat,
};

// All four statuses share the same font color/size and the same light
// (Tailwind "-100") tint strength; only the hue differs per status.
const statusBadgeStyles: Record<ShipmentStatus, string> = {
  'In Transit': 'bg-brand-100 text-ink-900',
  'Out for Delivery': 'bg-gray-200 text-ink-900',
  Delivered: 'bg-emerald-100 text-ink-900',
  Processing: 'bg-amber-100 text-ink-900',
};

// Real brand-logo assets, keyed by exact company name, for the 12 companies
// seeded directly from the Figma reference rows. These are the ONLY logo
// images the app has. Every other (generated, pagination-filler) company has
// no logo asset in the Figma file, so its icon slot is simply left empty
// instead of substituting an unrelated placeholder icon.
const companyLogos: Record<string, string> = {
  'TechGear Inc.': logoTechgear,
  'StyleHub Co.': logoStylehub,
  FreshNest: logoFreshnest,
  'FitPlus Gear': logoFitplusgear,
  EcoLights: logoEcolights,
  'AutoParts Pro': logoAutopartspro,
  GreenHaven: logoGreenhaven,
  ModaWear: logoModawear,
  'SunCore Panels': logoSuncorepanels,
  QuickParts: logoQuickparts,
  VitaFresh: logoVitafresh,
  StyleDepot: logoStyledepot,
};

export function ShipmentCard({ shipment, onClick }: { shipment: Shipment; onClick?: () => void }) {
  const companyLogo = companyLogos[shipment.company];

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-surface-border bg-white p-4 transition duration-150 ${
        onClick ? 'cursor-pointer hover:border-brand-500/40 hover:shadow-md active:scale-[0.99]' : ''
      }`}
    >
      {/* Phone-only compact header: status icon on the left beside ID/status, company info on the right, with a divider below */}
      <div className="mb-3 flex items-center justify-between gap-2 sm:hidden">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: '#E0E0E0' }}
          >
            <img src={statusIcons[shipment.status]} alt="" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink-900">{shipment.id}</p>
            <span
              className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeStyles[shipment.status]}`}
            >
              {shipment.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {companyLogo && (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center">
              <img src={companyLogo} alt={`${shipment.company} logo`} className="h-5 w-5 object-contain" />
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{shipment.company}</p>
            <p className="text-xs text-ink-500">{shipment.category}</p>
          </div>
        </div>
      </div>

      <div className="my-3 border-t border-surface-border sm:hidden" />

      {/* sm and up: original layout (ID/status header, divider, company row) */}
      <div className="hidden sm:block">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-ink-900">{shipment.id}</p>
            <span
              className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeStyles[shipment.status]}`}
            >
              {shipment.status}
            </span>
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: '#E0E0E0' }}>
            <img src={statusIcons[shipment.status]} alt="" className="h-4 w-4" />
          </span>
        </div>

        <div className="my-3 border-t border-surface-border" />

        <div className="mb-3 flex items-center gap-2.5">
          {companyLogo && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center">
              <img src={companyLogo} alt={`${shipment.company} logo`} className="h-7 w-7 object-contain" />
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{shipment.company}</p>
            <p className="text-xs text-ink-500">{shipment.category}</p>
          </div>
        </div>
      </div>

      <div className="mb-3 rounded-lg bg-surface-muted p-2.5 text-xs">
        <div className="relative">
          <div
            className="absolute left-3 top-3 bottom-3 w-px -translate-x-1/2 bg-brand-100"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex shrink-0 items-center gap-1.5 text-ink-500">
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                  <span className="absolute h-4 w-4 rounded-full bg-brand-100" aria-hidden="true" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-brand-500" aria-hidden="true" />
                </span>
                Origin
              </span>
              <span className="text-right">
                <p className="font-medium text-ink-900">{shipment.originCity}</p>
                <p className="text-[11px] text-ink-500">{shipment.originDate}</p>
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex shrink-0 items-center gap-1.5 text-ink-500">
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                  <span className="absolute h-5 w-5 rounded-full bg-brand-100" aria-hidden="true" />
                  <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-surface-border">
                    <img src={markerDestination} alt="" className="h-2.5 w-2.5" />
                  </span>
                </span>
                Destination
              </span>
              <span className="text-right">
                <p className="font-medium text-ink-900">{shipment.destinationCity}</p>
                <p className="text-[11px] text-ink-500">{shipment.destinationDate}</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between text-[11px] text-ink-500">
        <span>
          Progress <span className="font-semibold text-ink-900">{shipment.progress}%</span>
        </span>
        <span>
          Carrier: <span className="font-semibold text-ink-900">{shipment.carrier}</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-brand-500"
          style={{ width: `${shipment.progress}%` }}
        />
      </div>
    </div>
  );
}