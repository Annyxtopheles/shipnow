export interface TrackingMilestone {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  notes?: string;
}

export interface LiveShipmentTelemetry {
  shipmentId: string;
  trackingNumber: string;
  company: string;
  carrier: string;
  driverName: string;
  driverPhone: string;
  vehicleId: string;
  vehicleType: 'Heavy Semi-Truck' | 'Express Cargo Van' | 'Air Cargo 767' | 'Refrigerated Transport';
  originCity: string;
  destinationCity: string;
  originCoords: [number, number]; // [x, y] in 0-800, 0-500 SVG grid
  destinationCoords: [number, number];
  currentCoords: [number, number];
  traveledPercent: number;
  currentSpeedMph: number;
  estimatedArrival: string;
  temperatureCelsius?: number; // for cold-chain
  fuelLevelPercent: number;
  weatherAlert?: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Processing';
  milestones: TrackingMilestone[];
}

export const seedLiveTracking: LiveShipmentTelemetry[] = [
  {
    shipmentId: '#SH9482710',
    trackingNumber: 'TRK-US-9482710-X',
    company: 'TechGear Inc.',
    carrier: 'Pacific Intermodal Express',
    driverName: 'Robert Martinez',
    driverPhone: '+1 (555) 234-8901',
    vehicleId: 'FLEET-TRK-104',
    vehicleType: 'Heavy Semi-Truck',
    originCity: 'Los Angeles, CA',
    destinationCity: 'Chicago, IL',
    originCoords: [110, 310],
    destinationCoords: [540, 190],
    currentCoords: [360, 240],
    traveledPercent: 68,
    currentSpeedMph: 64,
    estimatedArrival: 'Today at 6:45 PM',
    fuelLevelPercent: 78,
    weatherAlert: 'Clear driving conditions along I-80 corridor',
    status: 'In Transit',
    milestones: [
      {
        id: 'm1',
        title: 'Cargo Loaded & Manifest Verified',
        location: 'Port of Long Beach / Hub LAX-01',
        timestamp: 'Sep 12, 06:30 AM',
        status: 'completed',
        notes: '38 pallets of NextGen audio components secured with tamper seal #9921',
      },
      {
        id: 'm2',
        title: 'Departed Regional Distribution Hub',
        location: 'Los Angeles Freight Terminal',
        timestamp: 'Sep 12, 08:15 AM',
        status: 'completed',
      },
      {
        id: 'm3',
        title: 'Weigh Station & Fuel Stop Cleared',
        location: 'Denver Intermodal Stop, CO',
        timestamp: 'Sep 13, 02:40 PM',
        status: 'completed',
      },
      {
        id: 'm4',
        title: 'En Route to Chicago Freight Central',
        location: 'Iowa / Illinois Border Corridor',
        timestamp: 'Sep 14, 04:10 PM',
        status: 'in_progress',
        notes: 'Traveling at 64 mph. ETA on target.',
      },
      {
        id: 'm5',
        title: 'Arrival & Destination Docking',
        location: 'Chicago Hub ORD-02, IL',
        timestamp: 'Sep 14, 06:45 PM',
        status: 'pending',
      },
    ],
  },
  {
    shipmentId: '#SH8392019',
    trackingNumber: 'TRK-US-8392019-B',
    company: 'FreshNest',
    carrier: 'ChilledRoute Logistics',
    driverName: 'Evelyn Taylor',
    driverPhone: '+1 (555) 873-1922',
    vehicleId: 'FLEET-REEF-208',
    vehicleType: 'Refrigerated Transport',
    originCity: 'Dallas, TX',
    destinationCity: 'Atlanta, GA',
    originCoords: [430, 360],
    destinationCoords: [620, 320],
    currentCoords: [520, 340],
    traveledPercent: 82,
    currentSpeedMph: 58,
    estimatedArrival: 'Today at 8:15 PM',
    temperatureCelsius: 3.4,
    fuelLevelPercent: 62,
    weatherAlert: 'Light rain along I-20 East, reduced visibility',
    status: 'In Transit',
    milestones: [
      {
        id: 'f1',
        title: 'Cold-Chain Certified & Loaded',
        location: 'Dallas Central Depot DFW-03',
        timestamp: 'Sep 13, 11:00 PM',
        status: 'completed',
        notes: 'Pre-cooled to 3.2°C. Continuous temp sensors engaged.',
      },
      {
        id: 'f2',
        title: 'In Transit Eastbound',
        location: 'Shreveport, LA Junction',
        timestamp: 'Sep 14, 05:30 AM',
        status: 'completed',
      },
      {
        id: 'f3',
        title: 'Approaching Metro Delivery Hub',
        location: 'Birmingham Outer Ring, AL',
        timestamp: 'Sep 14, 03:00 PM',
        status: 'in_progress',
        notes: 'Reefer temp stable at 3.4°C.',
      },
      {
        id: 'f4',
        title: 'Final Grocery Terminal Delivery',
        location: 'Atlanta Distribution ATL-05',
        timestamp: 'Sep 14, 08:15 PM',
        status: 'pending',
      },
    ],
  },
  {
    shipmentId: '#SH7281920',
    trackingNumber: 'TRK-US-7281920-C',
    company: 'StyleHub Co.',
    carrier: 'RapidGlide Courier',
    driverName: 'Carlos Hernandez',
    driverPhone: '+1 (555) 902-3341',
    vehicleId: 'FLEET-VAN-014',
    vehicleType: 'Express Cargo Van',
    originCity: 'New York, NY',
    destinationCity: 'Boston, MA',
    originCoords: [730, 160],
    destinationCoords: [760, 120],
    currentCoords: [750, 135],
    traveledPercent: 92,
    currentSpeedMph: 35,
    estimatedArrival: 'Today in 25 mins',
    fuelLevelPercent: 44,
    status: 'Out for Delivery',
    milestones: [
      {
        id: 's1',
        title: 'Dispatched from Regional Terminal',
        location: 'JFK-04 Fulfillment Gateway',
        timestamp: 'Sep 14, 07:15 AM',
        status: 'completed',
      },
      {
        id: 's2',
        title: 'Urban Sorting Facility',
        location: 'Hartford Cross-Dock, CT',
        timestamp: 'Sep 14, 11:20 AM',
        status: 'completed',
      },
      {
        id: 's3',
        title: 'Out for Last-Mile Retail Drop',
        location: 'Boston Downtown Commercial District',
        timestamp: 'Sep 14, 02:45 PM',
        status: 'in_progress',
        notes: 'Driver approaching delivery bay 3.',
      },
      {
        id: 's4',
        title: 'Signature Required & Hand-off',
        location: 'StyleHub Flagship Boston',
        timestamp: 'Sep 14, 05:30 PM',
        status: 'pending',
      },
    ],
  },
  {
    shipmentId: '#SH6192837',
    trackingNumber: 'TRK-US-6192837-A',
    company: 'AutoParts Pro',
    carrier: 'Great Lakes Heavy Haul',
    driverName: 'Danielle Miller',
    driverPhone: '+1 (555) 441-9920',
    vehicleId: 'FLEET-TRK-302',
    vehicleType: 'Heavy Semi-Truck',
    originCity: 'Detroit, MI',
    destinationCity: 'Dallas, TX',
    originCoords: [580, 180],
    destinationCoords: [430, 360],
    currentCoords: [500, 270],
    traveledPercent: 45,
    currentSpeedMph: 61,
    estimatedArrival: 'Tomorrow at 11:00 AM',
    fuelLevelPercent: 89,
    status: 'In Transit',
    milestones: [
      {
        id: 'a1',
        title: 'Brake Rotors Secured & Weighed',
        location: 'Detroit Automotive Hub, MI',
        timestamp: 'Sep 14, 06:00 AM',
        status: 'completed',
      },
      {
        id: 'a2',
        title: 'Transit Through St. Louis Hub',
        location: 'St. Louis Intermodal Depot, MO',
        timestamp: 'Sep 14, 01:45 PM',
        status: 'in_progress',
      },
      {
        id: 'a3',
        title: 'Southern Gateway Arrival',
        location: 'Dallas Central DFW-03',
        timestamp: 'Sep 15, 11:00 AM',
        status: 'pending',
      },
    ],
  },
  {
    shipmentId: '#SH5519283',
    trackingNumber: 'TRK-US-5519283-P',
    company: 'SunCore Panels',
    carrier: 'SkyFreight Direct',
    driverName: 'Capt. James Vance',
    driverPhone: '+1 (555) 601-7788',
    vehicleId: 'CARGO-JET-767',
    vehicleType: 'Air Cargo 767',
    originCity: 'Seattle, WA',
    destinationCity: 'Miami, FL',
    originCoords: [130, 90],
    destinationCoords: [710, 440],
    currentCoords: [440, 260],
    traveledPercent: 55,
    currentSpeedMph: 510,
    estimatedArrival: 'Today at 7:30 PM',
    fuelLevelPercent: 71,
    status: 'In Transit',
    milestones: [
      {
        id: 'p1',
        title: 'Airway Bill Issued & Cleared',
        location: 'SeaTac Cargo Terminal SEA-06',
        timestamp: 'Sep 14, 01:00 PM',
        status: 'completed',
      },
      {
        id: 'p2',
        title: 'Cruising Altitude 34,000 ft',
        location: 'Central US Air Corridor',
        timestamp: 'Sep 14, 03:30 PM',
        status: 'in_progress',
        notes: 'Ground speed 510 mph. High-priority solar cells on pallet 12.',
      },
      {
        id: 'p3',
        title: 'Touchdown & Customs Transfer',
        location: 'Miami International Cargo MIA',
        timestamp: 'Sep 14, 07:30 PM',
        status: 'pending',
      },
    ],
  },
];
