export type CalendarEventType = 'Pickup' | 'Delivery' | 'Customs' | 'Maintenance';

export type CalendarEventStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Urgent';

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  relatedId: string;
  status: CalendarEventStatus;
  description?: string;
}

export const seedCalendarEvents: CalendarEvent[] = [
  {
    id: 'EV-01',
    title: 'High-Volume Audio Pickup: TechGear',
    type: 'Pickup',
    date: '2026-09-14',
    time: '08:30 AM',
    location: 'Port of Long Beach / LAX-01',
    relatedId: '#SH9482710',
    status: 'In Progress',
    description: '38 pallets of NextGen audio parts scheduled for interstate manifest.',
  },
  {
    id: 'EV-02',
    title: 'Retail Store Delivery: StyleHub',
    type: 'Delivery',
    date: '2026-09-14',
    time: '05:30 PM',
    location: 'Boston Commercial Flagship',
    relatedId: '#SH7281920',
    status: 'In Progress',
    description: 'Last-mile van delivery. Retail floor signature required.',
  },
  {
    id: 'EV-03',
    title: 'Customs Clearance: Trans-Pacific Batch',
    type: 'Customs',
    date: '2026-09-15',
    time: '10:00 AM',
    location: 'SeaTac International Air Cargo SEA-06',
    relatedId: '#SH5519283',
    status: 'Urgent',
    description: 'Solar cell high-tech import tariff documentation inspection.',
  },
  {
    id: 'EV-04',
    title: 'Fleet Scheduled Brake Overhaul',
    type: 'Maintenance',
    date: '2026-09-15',
    time: '01:00 PM',
    location: 'DFW-03 Central Maintenance Bay 2',
    relatedId: 'FLEET-HAUL-401',
    status: 'Scheduled',
    description: 'Brake pads and suspension calibration for Mack Flatbed.',
  },
  {
    id: 'EV-05',
    title: 'Cold-Chain Grocery Terminal Hand-off',
    type: 'Delivery',
    date: '2026-09-16',
    time: '09:15 AM',
    location: 'Atlanta Distribution ATL-05',
    relatedId: '#SH8392019',
    status: 'Scheduled',
    description: 'Organic juice cargo transfer to refrigerated vault.',
  },
  {
    id: 'EV-06',
    title: 'Heavy Machinery Freight Loading',
    type: 'Pickup',
    date: '2026-09-18',
    time: '07:00 AM',
    location: 'Detroit Automotive Hub ORD-02',
    relatedId: '#SH6192837',
    status: 'Scheduled',
    description: 'Rotors and caliper components loading.',
  },
  {
    id: 'EV-07',
    title: 'Quarterly Reefer Sensor Calibration',
    type: 'Maintenance',
    date: '2026-09-21',
    time: '02:30 PM',
    location: 'Chicago Fleet Terminal ORD-02',
    relatedId: 'FLEET-REEF-208',
    status: 'Scheduled',
    description: 'ThermoKing temperature validation for FDA compliance.',
  },
  {
    id: 'EV-08',
    title: 'East Coast Bulk Textile Intake',
    type: 'Pickup',
    date: '2026-09-24',
    time: '11:00 AM',
    location: 'New York Mega Fulfillment JFK-04',
    relatedId: '#SH22170',
    status: 'Scheduled',
    description: 'Seasonal designer trench coat consignment reception.',
  },
];
