import { useEffect, useState } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

// Matches the Tailwind md (768px) / lg (1024px) breakpoints used throughout
// the app, so this hook and the CSS classes never disagree with each other.
const TABLET_QUERY = '(min-width: 768px)';
const DESKTOP_QUERY = '(min-width: 1024px)';

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop';
  if (window.matchMedia(TABLET_QUERY).matches) return 'tablet';
  return 'mobile';
}

/**
 * Returns the current responsive breakpoint ('mobile' | 'tablet' | 'desktop').
 *
 * Used instead of CSS-only `hidden md:flex lg:hidden` layout switching when a
 * screen renders three genuinely different breakpoint-specific trees (rather
 * than the same tree reflowing via grid classes). CSS-hidden trees still
 * fully mount - which is fine for plain markup, but breaks components like
 * Recharts' ResponsiveContainer that measure their own size via
 * ResizeObserver: mounting 3x as many chart instances at once (most inside
 * display:none ancestors) can leave the one visible instance stuck reporting
 * a 0x0 size. Conditionally rendering with this hook means only one tree -
 * and one set of chart instances - ever exists in the DOM at a time.
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const tabletMql = window.matchMedia(TABLET_QUERY);
    const desktopMql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setBreakpoint(getBreakpoint());

    tabletMql.addEventListener('change', update);
    desktopMql.addEventListener('change', update);
    update();

    return () => {
      tabletMql.removeEventListener('change', update);
      desktopMql.removeEventListener('change', update);
    };
  }, []);

  return breakpoint;
}
