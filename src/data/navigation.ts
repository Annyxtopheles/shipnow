import navDashboard from '@/assets/icons/nav-dashboard.png';
import navAnalytics from '@/assets/icons/nav-analytics.png';
import navCalendar from '@/assets/icons/nav-calendar.png';
import navShipments from '@/assets/icons/nav-shipments.png';
import navTracking from '@/assets/icons/nav-tracking.png';
import navWarehouse from '@/assets/icons/nav-warehouse.png';
import navFleets from '@/assets/icons/nav-fleets.png';
import navDrivers from '@/assets/icons/nav-drivers.png';
import navInvoices from '@/assets/icons/nav-invoices.png';
import navMessage from '@/assets/icons/nav-message.png';
import navNotification from '@/assets/icons/nav-notification.png';
import navSettings from '@/assets/icons/nav-settings.png';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
  implemented: boolean;
}

export const primaryNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: navDashboard, implemented: true },
  { label: 'Analytics', path: '/analytics', icon: navAnalytics, implemented: true },
  { label: 'Calendar', path: '/calendar', icon: navCalendar, implemented: true },
  { label: 'Shipments', path: '/shipments', icon: navShipments, implemented: true },
  { label: 'Tracking', path: '/tracking', icon: navTracking, implemented: true },
  { label: 'Warehouse', path: '/warehouse', icon: navWarehouse, implemented: true },
  { label: 'Fleets', path: '/fleets', icon: navFleets, implemented: true },
  { label: 'Drivers', path: '/drivers', icon: navDrivers, implemented: true },
  { label: 'Invoices & Billing', path: '/invoices', icon: navInvoices, implemented: true },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Message', path: '/messages', icon: navMessage, badge: 19, implemented: true },
  { label: 'Notification', path: '/notifications', icon: navNotification, badge: 3, implemented: true },
  { label: 'Settings', path: '/settings', icon: navSettings, implemented: true },
];
