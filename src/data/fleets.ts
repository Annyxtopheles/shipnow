export type FleetVehicleType =
  | 'Heavy Semi-Truck'
  | 'Refrigerated Van'
  | 'Express Cargo Van'
  | 'Flatbed Heavy Haul'
  | 'Air Freighter 767';

export type FleetStatus = 'In Transit' | 'Available' | 'Maintenance' | 'Inspection';

export interface FleetVehicle {
  id: string;
  vin: string;
  name: string;
  type: FleetVehicleType;
  licensePlate: string;
  status: FleetStatus;
  fuelPercent: number;
  odometerMiles: number;
  lastServiceDate: string;
  assignedDriver?: string;
  assignedHub: string;
  maxPayloadLbs: number;
}

export const seedFleets: FleetVehicle[] = [
  {
    id: 'FLEET-TRK-104',
    vin: '1FT8W3BT8NED94821',
    name: 'Freightliner Cascadia 126',
    type: 'Heavy Semi-Truck',
    licensePlate: 'CA-9482-TX',
    status: 'In Transit',
    fuelPercent: 78,
    odometerMiles: 142850,
    lastServiceDate: 'Aug 24, 2026',
    assignedDriver: 'Robert Martinez',
    assignedHub: 'LAX-01',
    maxPayloadLbs: 45000,
  },
  {
    id: 'FLEET-REEF-208',
    vin: '3AKJHHDR5LS982173',
    name: 'Kenworth T680 ThermoKing',
    type: 'Refrigerated Van',
    licensePlate: 'TX-8392-CL',
    status: 'In Transit',
    fuelPercent: 62,
    odometerMiles: 89400,
    lastServiceDate: 'Sep 02, 2026',
    assignedDriver: 'Evelyn Taylor',
    assignedHub: 'DFW-03',
    maxPayloadLbs: 42000,
  },
  {
    id: 'FLEET-VAN-014',
    vin: '1FDNE3FN8HDC22194',
    name: 'Ford Transit 350 High Roof',
    type: 'Express Cargo Van',
    licensePlate: 'NY-7281-RT',
    status: 'In Transit',
    fuelPercent: 44,
    odometerMiles: 34100,
    lastServiceDate: 'Sep 10, 2026',
    assignedDriver: 'Carlos Hernandez',
    assignedHub: 'JFK-04',
    maxPayloadLbs: 4500,
  },
  {
    id: 'FLEET-TRK-302',
    vin: '2C4RC1CG5KR774102',
    name: 'Peterbilt 579 UltraLoft',
    type: 'Heavy Semi-Truck',
    licensePlate: 'IL-6192-PL',
    status: 'In Transit',
    fuelPercent: 89,
    odometerMiles: 215400,
    lastServiceDate: 'Aug 18, 2026',
    assignedDriver: 'Danielle Miller',
    assignedHub: 'ORD-02',
    maxPayloadLbs: 48000,
  },
  {
    id: 'FLEET-VAN-028',
    vin: 'WD3PE8CD7LN491823',
    name: 'Mercedes-Benz Sprinter 2500',
    type: 'Express Cargo Van',
    licensePlate: 'GA-5520-AT',
    status: 'Available',
    fuelPercent: 95,
    odometerMiles: 28900,
    lastServiceDate: 'Sep 05, 2026',
    assignedHub: 'ATL-05',
    maxPayloadLbs: 4100,
  },
  {
    id: 'FLEET-TRK-112',
    vin: '1XKWD49X8MR339102',
    name: 'Volvo VNL 860 Globetrotter',
    type: 'Heavy Semi-Truck',
    licensePlate: 'WA-4419-SE',
    status: 'Available',
    fuelPercent: 100,
    odometerMiles: 67300,
    lastServiceDate: 'Sep 08, 2026',
    assignedHub: 'SEA-06',
    maxPayloadLbs: 46000,
  },
  {
    id: 'FLEET-HAUL-401',
    vin: '4UZAA2AK4MC819203',
    name: 'Mack Anthem Step-Deck',
    type: 'Flatbed Heavy Haul',
    licensePlate: 'TX-3328-MK',
    status: 'Maintenance',
    fuelPercent: 25,
    odometerMiles: 284000,
    lastServiceDate: 'Sep 13, 2026',
    assignedHub: 'DFW-03',
    maxPayloadLbs: 52000,
  },
  {
    id: 'CARGO-JET-767',
    vin: 'B-767-300F-MSN29381',
    name: 'Boeing 767-300F Widebody',
    type: 'Air Freighter 767',
    licensePlate: 'N-767SN',
    status: 'In Transit',
    fuelPercent: 71,
    odometerMiles: 1420000,
    lastServiceDate: 'Sep 01, 2026',
    assignedDriver: 'Capt. James Vance',
    assignedHub: 'SEA-06',
    maxPayloadLbs: 116000,
  },
];
