import { useState, useRef, useEffect, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, LogOut, Settings as SettingsIcon } from 'lucide-react';
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
import { useShipments } from '@/context/ShipmentContext';
import { ProUpgradeModal } from '@/components/dashboard/ProUpgradeModal';
import { ShipmentDetailModal } from '@/components/shipments/ShipmentDetailModal';
import { CreateShipmentModal } from '@/components/shipments/CreateShipmentModal';

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

function SidebarContent({
  onNavigate,
  onOpenPro,
}: {
  onNavigate?: () => void;
  onOpenPro?: () => void;
}) {
  const { isPro, proDismissed, setProDismissed } = useShipments();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [profileOpen]);

  function handleLogout() {
    setProfileOpen(false);
    navigate('/');
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-4 pt-6">
        <img src={logoFull} alt="ShipNow" className="h-10" />
      </div>

      <div ref={profileMenuRef} className="relative mx-5 mb-4">
        <button
          type="button"
          onClick={() => setProfileOpen((o) => !o)}
          className="flex w-full items-center gap-3 rounded-xl bg-surface-muted p-3 text-left transition hover:bg-surface-border/50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-xs">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-ink-900 truncate">John Doe</p>
              {isPro && (
                <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold text-white tracking-wider uppercase shadow-2xs">
                  PRO
                </span>
              )}
            </div>
            <p className="text-xs text-ink-500">{isPro ? 'Admin · Pro Plan' : 'Admin'}</p>
          </div>
          <span className="shrink-0 p-1">
            <img
              src={chevronDown}
              alt=""
              aria-hidden="true"
              className={`h-4 w-4 object-contain transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>

        {profileOpen && (
          <div className="absolute left-0 right-0 top-full z-40 mt-1.5 rounded-xl border border-surface-border bg-white p-2 shadow-xl">
            <div className="border-b border-surface-border px-3 py-2 text-xs">
              <p className="font-bold text-ink-900">John Doe</p>
              <p className="text-ink-500">admin@shipnow.com</p>
            </div>
            <div className="pt-1 text-xs">
              <NavLink
                to="/settings"
                onClick={() => {
                  setProfileOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-ink-700 hover:bg-surface-muted"
              >
                <SettingsIcon size={14} /> Settings
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          </div>
        )}
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

      {!proDismissed && (
        <div className="relative m-3 overflow-hidden rounded-xl bg-ink-900 p-5 text-white">
          <button
            type="button"
            onClick={() => setProDismissed(true)}
            className="absolute top-2.5 right-2.5 z-10 rounded-lg p-1 text-white/60 hover:text-white hover:bg-white/10 transition"
            title="Close"
            aria-label="Close"
          >
            <X size={15} />
          </button>

          {isPro ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">ShipNow Pro Active</span>
              </div>
              <p className="mt-1.5 text-xs text-white/80 leading-relaxed">
                Unlimited telemetry, route intelligence & priority dispatch enabled.
              </p>
            </div>
          ) : (
            <>
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
              <Button
                variant="secondary"
                onClick={onOpenPro}
                className="relative mt-5 w-full !bg-white !text-ink-900 !py-3 text-sm transition hover:!bg-brand-50"
              >
                Go Pro Today
              </Button>
            </>
          )}
        </div>
      )}
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
  const [proModalOpen, setProModalOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { shipments, setSelectedShipmentForDetail } = useShipments();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = globalSearch.trim()
    ? shipments.filter(
        (s) =>
          s.id.toLowerCase().includes(globalSearch.trim().toLowerCase()) ||
          s.company.toLowerCase().includes(globalSearch.trim().toLowerCase()) ||
          s.category.toLowerCase().includes(globalSearch.trim().toLowerCase()) ||
          s.originCity.toLowerCase().includes(globalSearch.trim().toLowerCase()) ||
          s.destinationCity.toLowerCase().includes(globalSearch.trim().toLowerCase()),
      )
    : [];

  return (
    <div className="min-h-screen bg-page-bg md:flex">
      {/* Desktop / tablet sidebar rail */}
      <aside className="sticky top-0 hidden h-screen shrink-0 border-r border-surface-border bg-white md:block md:w-20 lg:w-64">
        <div className="hidden lg:block h-full">
          <SidebarContent onOpenPro={() => setProModalOpen(true)} />
        </div>
        {/* Tablet: icon-only rail */}
        <div className="lg:hidden flex h-full flex-col items-center py-6">
          <img src={logoIcon} alt="ShipNow" className="mb-4 h-8 w-8 object-contain" />
          <div className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-xs">
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute right-4 top-4 text-ink-500 hover:text-ink-900"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <SidebarContent
              onNavigate={() => setDrawerOpen(false)}
              onOpenPro={() => {
                setDrawerOpen(false);
                setProModalOpen(true);
              }}
            />
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
                <div ref={searchContainerRef} className="relative flex-1 sm:flex-none">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
                  />
                  <input
                    type="search"
                    placeholder="Search anything"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="w-full rounded-lg bg-[#FEFEFE] py-2 pl-9 pr-3 text-sm outline-none ring-1 ring-surface-border/60 placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500 sm:w-56 lg:w-72"
                  />
                  {searchFocused && globalSearch.trim() && (
                    <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-surface-border bg-white p-2 shadow-xl">
                      {searchResults.length === 0 ? (
                        <p className="px-3 py-2 text-xs text-ink-500">No matching records found.</p>
                      ) : (
                        <div className="space-y-1">
                          <p className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                            Shipments ({searchResults.length})
                          </p>
                          {searchResults.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => {
                                setSelectedShipmentForDetail(s);
                                setSearchFocused(false);
                                setGlobalSearch('');
                              }}
                              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition hover:bg-surface-muted"
                            >
                              <div>
                                <p className="font-semibold text-ink-900">{s.id}</p>
                                <p className="text-ink-500">{s.company}</p>
                              </div>
                              <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                                {s.status}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
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

      {/* Global Modals */}
      <ProUpgradeModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
      <ShipmentDetailModal />
      <CreateShipmentModal />
    </div>
  );
}