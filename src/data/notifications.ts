export type NotificationType = 'delay' | 'customs' | 'system' | 'delivery';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  relatedId?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export const seedNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Severe Weather Alert: I-20 Eastbound Corridor',
    description: 'Flash flood and heavy precipitation warnings along Birmingham junction. Reefer shipment #SH8392019 speed throttled for driver safety.',
    type: 'delay',
    timestamp: '15 mins ago',
    read: false,
    relatedId: '#SH8392019',
    actionLabel: 'View Live Tracking',
    actionUrl: '/tracking',
  },
  {
    id: 'notif-2',
    title: 'Customs Clearance Action Required: Trans-Pacific Batch',
    description: 'Documentation verification requested for solar module import batch #SH5519283 at SeaTac International Air Cargo SEA-06.',
    type: 'customs',
    timestamp: '1 hour ago',
    read: false,
    relatedId: '#SH5519283',
    actionLabel: 'Inspect Shipment',
    actionUrl: '/shipments',
  },
  {
    id: 'notif-3',
    title: 'High Capacity Alert: East Coast Mega Fulfillment (JFK-04)',
    description: 'Warehouse facility volumetric utilization has reached 95%. Automated dispatch queue prioritized to free 16% bay capacity by evening.',
    type: 'system',
    timestamp: '2 hours ago',
    read: false,
    relatedId: 'JFK-04',
    actionLabel: 'View Warehouse',
    actionUrl: '/warehouse',
  },
  {
    id: 'notif-4',
    title: 'Freight Hand-off Confirmed: TechGear Audio Batch',
    description: 'Shipment #SH9482710 successfully cleared Denver intermodal checkpoint on schedule. Estimated delivery today 6:45 PM.',
    type: 'delivery',
    timestamp: '4 hours ago',
    read: true,
    relatedId: '#SH9482710',
    actionLabel: 'View Tracking',
    actionUrl: '/tracking',
  },
  {
    id: 'notif-5',
    title: 'Billing Settlement Paid: FreshNest Foods',
    description: 'Invoice #INV-2026-003 for $4,120.00 settled via ACH Transfer. Ledger reconciled.',
    type: 'system',
    timestamp: 'Yesterday',
    read: true,
    relatedId: '#INV-2026-003',
    actionLabel: 'View Invoices',
    actionUrl: '/invoices',
  },
  {
    id: 'notif-6',
    title: 'Preventative Maintenance Scheduled: Fleet Mack Anthem',
    description: 'Vehicle FLEET-HAUL-401 due for 280k mile brake shoe replacement at DFW-03 service bay tomorrow at 1:00 PM.',
    type: 'system',
    timestamp: 'Yesterday',
    read: true,
    relatedId: 'FLEET-HAUL-401',
    actionLabel: 'View Fleets',
    actionUrl: '/fleets',
  },
];
