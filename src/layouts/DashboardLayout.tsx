import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import logoFull from '@/assets/images/logo-full-purple.png';
import logoIcon from '@/assets/images/logo-icon.png';
import chevronDown from '@/assets/icons/chevron-down.png';
import socialFacebook from '@/assets/icons/social-facebook.png';
import socialX from '@/assets/icons/social-x.png';
import socialInstagram from '@/assets/icons/social-instagram.png';
import socialYoutube from '@/assets/icons/social-youtube.png';
import socialLinkedin from '@/assets/icons/social-linkedin.png';
import promoPattern1 from '@/assets/icons/promo-pattern-1.png';
import promoPattern2 from '@/assets/icons/promo-pattern-2.png';
import { primaryNavItems, secondaryNavItems, type NavItem } from '@/data/navigation';
import { Button } from '@/components/ui/Button';

const socialLinks = [
  { icon: socialFacebook, label: 'Facebook' },
  { icon: socialX, label: 'X' },
  { icon: socialInstagram, label: 'Instagram' },
  { icon: socialYoutube, label: 'YouTube' },
  { icon: socialLinkedin, label: 'LinkedIn' },
];

interface DashboardLayoutProps {
  children: ReactNode;
  greetingName?: string;
  pageTitle?: string;
  mobileTitle?: string;
  headerAction?: ReactNode;
  breadcrumb?: string[];
  /** Hides the breadcrumb/title/headerAction row on phone widths only
   * (unchanged at md+). Used by pages that render their own mobile-specific
   * toolbar in their body content instead, e.g. Shipments. */
  hideHeaderOnMobile?: boolean;
}

function NavRow({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? 'bg-nav-active-bg text-nav-active-text'
            : 'text-ink-700 hover:bg-surface-muted'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="flex items-center gap-3">
            <span
              role="img"
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 ${isActive ? 'bg-[#2A1298]' : 'bg-ink-500/60'}`}
              style={{
                WebkitMaskImage: `url(${item.icon})`,
                maskImage: `url(${item.icon})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
            {item.label}
          </span>
          {item.badge !== undefined && (
            <span className="min-w-[20px] rounded-md bg-brand-500 px-1.5 py-0.5 text-center text-xs font-semibold text-white">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-4 pt-6">
        <img src={logoFull} alt="ShipNow" className="h-10" />
      </div>

      <div className="mx-5 mb-4 flex items-center gap-3 rounded-xl bg-surface-muted p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
          JD
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink-900">John Doe</p>
          <p className="text-xs text-ink-500">Admin</p>
        </div>
        <button type="button" aria-label="Account options" className="shrink-0 p-1">
          <img src={chevronDown} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {primaryNavItems.map((item) => (
          <NavRow key={item.path} item={item} onNavigate={onNavigate} />
        ))}
        <div className="my-3 border-t border-surface-border" />
        {secondaryNavItems.map((item) => (
          <NavRow key={item.path} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="relative m-3 overflow-hidden rounded-xl bg-ink-900 p-6 text-white">
        <img
          src={promoPattern1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 right-5 w-14"
        />
        <img
          src={promoPattern2}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-9 -right-1 w-12"
        />

        <p className="relative max-w-[9ch] text-2xl font-extrabold leading-tight">Loving ShipNow Free?</p>
        <p className="relative mt-4 text-xs text-white/90">
          Go Pro to access priority support, real-time tracking, and full analytics.
        </p>
        <Button variant="secondary" className="relative mt-5 w-full !bg-white !text-ink-900 !py-3 text-sm">
          Go Pro Today
        </Button>
      </div>
    </div>
  );
}

export function DashboardLayout({
  children,
  greetingName = 'John',
  pageTitle,
  mobileTitle = 'Dashboard',
  headerAction,
  breadcrumb,
  hideHeaderOnMobile = false,
}: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page-bg md:flex">
      {/* Desktop / tablet sidebar rail */}
      <aside className="sticky top-0 hidden h-screen shrink-0 border-r border-surface-border bg-white md:block md:w-20 lg:w-64">
        <div className="hidden lg:block h-full">
          <SidebarContent />
        </div>
        {/* Tablet: icon-only rail */}
        <div className="lg:hidden flex h-full flex-col items-center py-6">
          <img src={logoIcon} alt="ShipNow" className="mb-4 h-8 w-8 object-contain" />
          <div className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
            JD
          </div>
          <nav className="flex flex-1 flex-col items-center gap-2">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                title={item.label}
                className={({ isActive }) =>
                  `flex h-10 w-10 items-center justify-center rounded-lg ${
                    isActive ? 'bg-nav-active-bg' : 'hover:bg-surface-muted'
                  }`
                }
              >
                {({ isActive }) => (
                  <span
                    role="img"
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 ${isActive ? 'bg-[#2A1298]' : 'bg-ink-500/60'}`}
                    style={{
                      WebkitMaskImage: `url(${item.icon})`,
                      maskImage: `url(${item.icon})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  />
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute right-4 top-4 text-ink-500"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1 overflow-x-hidden">
        {/* Phone sticky top bar */}
        <div className="sticky top-0 z-30 grid grid-cols-3 items-center border-b border-surface-border bg-white px-4 py-3 md:hidden">
          <img src={logoIcon} alt="ShipNow" className="h-6 w-6 object-contain" />
          <p className="justify-self-center text-base font-bold text-ink-900">{mobileTitle}</p>
          <button onClick={() => setDrawerOpen(true)} aria-label="Open menu" className="justify-self-end">
            <Menu size={22} />
          </button>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div
            className={`mb-6 ${hideHeaderOnMobile ? 'hidden' : 'flex'} flex-col gap-4 md:mb-9 md:flex md:flex-row md:items-center md:justify-between xl:mb-6`}
          >
            {breadcrumb ? (
              <div>
                <h1 className="text-xl font-extrabold text-ink-900 md:text-2xl">{pageTitle}</h1>
                <nav aria-label="Breadcrumb" className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                  {breadcrumb.map((crumb, i) => (
                    <span key={crumb} className="flex items-center gap-1.5">
                      {i > 0 && <span aria-hidden="true">/</span>}
                      <span>{crumb}</span>
                    </span>
                  ))}
                </nav>
              </div>
            ) : (
              <div className="hidden md:block">
                <p className="text-sm text-ink-500">Hello {greetingName}!</p>
                <h1 className="text-xl font-extrabold text-ink-900 md:text-2xl">
                  {pageTitle ?? 'Good Morning'}
                </h1>
              </div>
            )}
            <div className="flex items-center gap-3">
              {!breadcrumb && (
                <div className="relative flex-1 sm:flex-none">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
                  />
                  <input
                    type="search"
                    placeholder="Search anything"
                    className="w-full rounded-lg bg-[#FEFEFE] py-2 pl-9 pr-3 text-sm outline-none ring-1 ring-transparent placeholder:text-ink-500 focus:bg-white focus:ring-brand-500 sm:w-56 lg:w-72"
                  />
                </div>
              )}
              {headerAction}
            </div>
          </div>

          {children}

          <footer className="mt-8 flex flex-col items-center gap-4 border-t border-surface-border pt-6 text-xs text-ink-500 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
              <span>Copyright © 2025 Peterdraw</span>
              <a href="#" className="hover:text-ink-700">Privacy Policy</a>
              <a href="#" className="hover:text-ink-700">Term and conditions</a>
              <a href="#" className="hover:text-ink-700">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href="#" aria-label={social.label}>
                  <img src={social.icon} alt="" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}