export interface WarehouseFacility {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  capacityPercent: number;
  totalAreaSqFt: number;
  inboundToday: number;
  outboundToday: number;
  specialties: string[];
  manager: string;
}

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Inbound' | 'Reserved';

export interface WarehouseInventoryItem {
  sku: string;
  name: string;
  company: string;
  warehouseCode: string;
  quantity: number;
  allocated: number;
  zone: string;
  status: InventoryStatus;
}

export const warehouseFacilities: WarehouseFacility[] = [
  {
    id: 'wh-1',
    name: 'Pacific West Coast Gateway',
    code: 'LAX-01',
    city: 'Los Angeles',
    state: 'CA',
    capacityPercent: 91,
    totalAreaSqFt: 65000,
    inboundToday: 14,
    outboundToday: 22,
    specialties: ['Electronics', 'Automotive', 'Air Express'],
    manager: 'Marcus Vance',
  },
  {
    id: 'wh-2',
    name: 'Midwest Freight Terminal',
    code: 'ORD-02',
    city: 'Chicago',
    state: 'IL',
    capacityPercent: 82,
    totalAreaSqFt: 85000,
    inboundToday: 18,
    outboundToday: 26,
    specialties: ['Automotive', 'Machinery', 'Rail Cross-Dock'],
    manager: 'Sarah Jenkins',
  },
  {
    id: 'wh-3',
    name: 'Lone Star Central Distribution',
    code: 'DFW-03',
    city: 'Dallas',
    state: 'TX',
    capacityPercent: 74,
    totalAreaSqFt: 110000,
    inboundToday: 24,
    outboundToday: 30,
    specialties: ['Cold-Chain', 'Food & Beverage', 'Bulk Storage'],
    manager: 'David Ramirez',
  },
  {
    id: 'wh-4',
    name: 'East Coast Mega Fulfillment',
    code: 'JFK-04',
    city: 'New York',
    state: 'NY',
    capacityPercent: 95,
    totalAreaSqFt: 52000,
    inboundToday: 16,
    outboundToday: 19,
    specialties: ['Apparel', 'Fashion', 'Same-Day Dispatch'],
    manager: 'Elena Rostova',
  },
  {
    id: 'wh-5',
    name: 'Southeast Logistics Center',
    code: 'ATL-05',
    city: 'Atlanta',
    state: 'GA',
    capacityPercent: 68,
    totalAreaSqFt: 78000,
    inboundToday: 12,
    outboundToday: 15,
    specialties: ['Sports & Outdoors', 'Home Goods'],
    manager: 'Brian Scott',
  },
  {
    id: 'wh-6',
    name: 'Northwest Intermodal Depot',
    code: 'SEA-06',
    city: 'Seattle',
    state: 'WA',
    capacityPercent: 62,
    totalAreaSqFt: 45000,
    inboundToday: 8,
    outboundToday: 11,
    specialties: ['Maritime Containers', 'General Goods'],
    manager: 'Rachel Lin',
  },
];

export const seedWarehouseInventory: WarehouseInventoryItem[] = [
  {
    sku: '#SKU-94821',
    name: 'NextGen Wireless Headphones',
    company: 'TechGear Inc.',
    warehouseCode: 'LAX-01',
    quantity: 1420,
    allocated: 350,
    zone: 'Zone A · Aisle 4 · Rack 2',
    status: 'In Stock',
  },
  {
    sku: '#SKU-83912',
    name: 'Merino Wool Pullover',
    company: 'StyleHub Co.',
    warehouseCode: 'JFK-04',
    quantity: 620,
    allocated: 580,
    zone: 'Zone C · Aisle 1 · Rack 8',
    status: 'Low Stock',
  },
  {
    sku: '#SKU-77291',
    name: 'Organic Juice Cold Pack',
    company: 'FreshNest',
    warehouseCode: 'DFW-03',
    quantity: 3400,
    allocated: 1200,
    zone: 'Cold Vault 2 · Pallet 44',
    status: 'In Stock',
  },
  {
    sku: '#SKU-66184',
    name: 'Heavy-Duty Brake Calipers',
    company: 'AutoParts Pro',
    warehouseCode: 'ORD-02',
    quantity: 480,
    allocated: 120,
    zone: 'Zone B · Aisle 7 · Rack 1',
    status: 'In Stock',
  },
  {
    sku: '#SKU-55209',
    name: 'Smart LED Light Fixtures',
    company: 'EcoLights',
    warehouseCode: 'LAX-01',
    quantity: 210,
    allocated: 180,
    zone: 'Zone A · Aisle 9 · Rack 4',
    status: 'Low Stock',
  },
  {
    sku: '#SKU-44190',
    name: 'All-Terrain Hiking Boots',
    company: 'FitPlus Gear',
    warehouseCode: 'ATL-05',
    quantity: 850,
    allocated: 200,
    zone: 'Zone D · Aisle 3 · Rack 6',
    status: 'In Stock',
  },
  {
    sku: '#SKU-33281',
    name: 'High-Efficiency Solar Cells',
    company: 'SunCore Panels',
    warehouseCode: 'SEA-06',
    quantity: 1200,
    allocated: 0,
    zone: 'Zone Inbound Dock 3',
    status: 'Inbound',
  },
  {
    sku: '#SKU-22170',
    name: 'Seasonal Designer Trench Coats',
    company: 'ModaWear',
    warehouseCode: 'JFK-04',
    quantity: 340,
    allocated: 300,
    zone: 'Zone C · Aisle 2 · Rack 3',
    status: 'Low Stock',
  },
  {
    sku: '#SKU-11099',
    name: 'Ceramic Cookware Sets',
    company: 'GreenHaven',
    warehouseCode: 'ORD-02',
    quantity: 940,
    allocated: 410,
    zone: 'Zone B · Aisle 5 · Rack 9',
    status: 'In Stock',
  },
];
