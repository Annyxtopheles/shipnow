export type ShipmentStatus = 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Processing';

export type ShipmentCategory =
  | 'Electronics'
  | 'Apparel'
  | 'Home & Kitchen'
  | 'Sports & Outdoors'
  | 'Automotive'
  | 'Fashion'
  | 'Food & Beverage';

export interface Shipment {
  id: string;
  company: string;
  category: ShipmentCategory;
  carrier: string;
  originCity: string;
  originDate: string;
  destinationCity: string;
  destinationDate: string;
  progress: number;
  status: ShipmentStatus;
  // Position of this card in the Figma design (1-12, left-to-right,
  // top-to-bottom). The mock origin/destination dates aren't strictly
  // chronological (they're sample text from the design, not real
  // timestamps), so sorting by parsed date would scramble the grid away
  // from the reference layout. seedOrder is used as the recency proxy for
  // the Newest/Oldest sort instead, which keeps "Newest" matching the
  // design exactly while still making the sort control functionally work.
  seedOrder: number;
}

// These 12 records are seeded directly from the Figma reference (exact IDs,
// companies, routes, dates, progress and carriers) and are the only
// shipments in the app. Per instruction, no additional/random companies are
// generated — the grid is a single page of exactly these 12 shipments.
export const seedShipments: Shipment[] = [
  {
    id: '#SH9283746',
    company: 'TechGear Inc.',
    category: 'Electronics',
    carrier: 'FedEx',
    originCity: 'Los Angeles, CA',
    originDate: 'Mar 20, 2035 - 10:06 AM',
    destinationCity: 'Chicago, IL',
    destinationDate: 'Mar 22, 2025 - 01:00 PM',
    progress: 60,
    status: 'In Transit',
    seedOrder: 1,
  },
  {
    id: '#SH9182635',
    company: 'StyleHub Co.',
    category: 'Apparel',
    carrier: 'DHL',
    originCity: 'New York, NY',
    originDate: 'Mar 19, 2035 - 11:30 AM',
    destinationCity: 'Atlanta, GA',
    destinationDate: 'Mar 22, 2025 - 01:00 PM',
    progress: 75,
    status: 'Out for Delivery',
    seedOrder: 2,
  },
  {
    id: '#SH9037821',
    company: 'FreshNest',
    category: 'Home & Kitchen',
    carrier: 'UPS',
    originCity: 'Dallas, TX',
    originDate: 'Mar 18, 2035 - 09:00 AM',
    destinationCity: 'Miami, FL',
    destinationDate: 'Mar 21, 2025 - 08:00 PM',
    progress: 100,
    status: 'Delivered',
    seedOrder: 3,
  },
  {
    id: '#SH9347452',
    company: 'FitPlus Gear',
    category: 'Sports & Outdoors',
    carrier: 'USPS',
    originCity: 'Seattle, WA',
    originDate: 'Mar 21, 2035 - 06:45 AM',
    destinationCity: 'Denver, CO',
    destinationDate: 'Mar 25, 2025 - 04:30 PM',
    progress: 40,
    status: 'Processing',
    seedOrder: 4,
  },
  {
    id: '#SH8821349',
    company: 'EcoLights',
    category: 'Electronics',
    carrier: 'FedEx',
    originCity: 'Austin, TX',
    originDate: 'Mar 19, 2035 - 12:00 PM',
    destinationCity: 'Phoenix, AZ',
    destinationDate: 'Mar 21, 2025 - 05:00 PM',
    progress: 90,
    status: 'Out for Delivery',
    seedOrder: 5,
  },
  {
    id: '#SH9457830',
    company: 'AutoParts Pro',
    category: 'Automotive',
    carrier: 'Aramex',
    originCity: 'Detroit, MI',
    originDate: 'Mar 20, 2035 - 07:15 AM',
    destinationCity: 'San Diego, CA',
    destinationDate: 'Mar 22, 2025 - 02:00 PM',
    progress: 100,
    status: 'Delivered',
    seedOrder: 6,
  },
  {
    id: '#SH8967432',
    company: 'GreenHaven',
    category: 'Home & Kitchen',
    carrier: 'USPS',
    originCity: 'Portland, OR',
    originDate: 'Mar 18, 2035 - 02:45 PM',
    destinationCity: 'Salt Lake City, UT',
    destinationDate: 'Mar 20, 2025 - 11:00 AM',
    progress: 65,
    status: 'In Transit',
    seedOrder: 7,
  },
  {
    id: '#SH8893247',
    company: 'ModaWear',
    category: 'Apparel',
    carrier: 'DHL',
    originCity: 'Boston, MA',
    originDate: 'Mar 20, 2035 - 01:00 PM',
    destinationCity: 'Charlotte, NC',
    destinationDate: 'Mar 23, 2025 - 08:00 AM',
    progress: 80,
    status: 'Out for Delivery',
    seedOrder: 8,
  },
  {
    id: '#SH9018733',
    company: 'SunCore Panels',
    category: 'Electronics',
    carrier: 'UPS',
    originCity: 'San Diego, CA',
    originDate: 'Mar 21, 2035 - 08:00 AM',
    destinationCity: 'Reno, NV',
    destinationDate: 'Mar 24, 2025 - 01:30 PM',
    progress: 30,
    status: 'Processing',
    seedOrder: 9,
  },
  {
    id: '#SH8113471',
    company: 'QuickParts',
    category: 'Automotive',
    carrier: 'Aramex',
    originCity: 'Tampa, FL',
    originDate: 'Mar 20, 2035 - 04:00 PM',
    destinationCity: 'Houston, TX',
    destinationDate: 'Mar 23, 2025 - 12:00 PM',
    progress: 90,
    status: 'In Transit',
    seedOrder: 10,
  },
  {
    id: '#SH8881190',
    company: 'VitaFresh',
    category: 'Food & Beverage',
    carrier: 'Local Courier',
    originCity: 'Nashville, TN',
    originDate: 'Mar 21, 2035 - 06:00 AM',
    destinationCity: 'Jacksonville, FL',
    destinationDate: 'Mar 22, 2025 - 03:00 AM',
    progress: 85,
    status: 'Out for Delivery',
    seedOrder: 11,
  },
  {
    id: '#SH8776103',
    company: 'StyleDepot',
    category: 'Fashion',
    carrier: 'FedEx',
    originCity: 'Minneapolis, MN',
    originDate: 'Mar 19, 2035 - 10:15 AM',
    destinationCity: 'Kansas City, MO',
    destinationDate: 'Mar 21, 2025 - 03:30 PM',
    progress: 60,
    status: 'In Transit',
    seedOrder: 12,
  },
];

export const allShipments: Shipment[] = seedShipments;

// "Mar 20, 2035 - 10:06 AM" -> a comparable Date. Used for the Newest/Oldest
// sort control.
export function parseShipmentDate(value: string): number {
  const normalized = value.replace(' - ', ', ');
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}