export interface VolumeTrendPoint {
  month: string;
  totalShipments: number;
  onTimeShipments: number;
  delayedShipments: number;
  efficiencyPercent: number;
}

export interface CarrierScorecard {
  carrierId: string;
  name: string;
  mode: 'Intermodal Rail' | 'Reefer Cold-Chain' | 'Air Cargo Express' | 'Highway Heavy Haul' | 'Last-Mile Courier';
  completedShipments: number;
  onTimePercent: number;
  avgDwellMinutes: number;
  damageRatePercent: number;
  rating: number; // 0 - 5
  status: 'Preferred Partner' | 'Standard' | 'Under Review';
}

export interface RegionalVolume {
  region: string;
  volume: number;
  percentage: number;
  growth: string;
}

export const seedVolumeTrends: VolumeTrendPoint[] = [
  { month: 'Jan', totalShipments: 12400, onTimeShipments: 12050, delayedShipments: 350, efficiencyPercent: 97.2 },
  { month: 'Feb', totalShipments: 14200, onTimeShipments: 13800, delayedShipments: 400, efficiencyPercent: 97.1 },
  { month: 'Mar', totalShipments: 16800, onTimeShipments: 16400, delayedShipments: 400, efficiencyPercent: 97.6 },
  { month: 'Apr', totalShipments: 15300, onTimeShipments: 15000, delayedShipments: 300, efficiencyPercent: 98.0 },
  { month: 'May', totalShipments: 19100, onTimeShipments: 18750, delayedShipments: 350, efficiencyPercent: 98.1 },
  { month: 'Jun', totalShipments: 21400, onTimeShipments: 21000, delayedShipments: 400, efficiencyPercent: 98.1 },
  { month: 'Jul', totalShipments: 23600, onTimeShipments: 23200, delayedShipments: 400, efficiencyPercent: 98.3 },
  { month: 'Aug', totalShipments: 25100, onTimeShipments: 24700, delayedShipments: 400, efficiencyPercent: 98.4 },
  { month: 'Sep', totalShipments: 26800, onTimeShipments: 26420, delayedShipments: 380, efficiencyPercent: 98.6 },
];

export const seedCarrierScorecards: CarrierScorecard[] = [
  {
    carrierId: 'CAR-01',
    name: 'Pacific Intermodal Express',
    mode: 'Intermodal Rail',
    completedShipments: 8420,
    onTimePercent: 99.1,
    avgDwellMinutes: 34,
    damageRatePercent: 0.02,
    rating: 4.9,
    status: 'Preferred Partner',
  },
  {
    carrierId: 'CAR-02',
    name: 'ChilledRoute Logistics',
    mode: 'Reefer Cold-Chain',
    completedShipments: 5120,
    onTimePercent: 98.4,
    avgDwellMinutes: 42,
    damageRatePercent: 0.04,
    rating: 4.8,
    status: 'Preferred Partner',
  },
  {
    carrierId: 'CAR-03',
    name: 'SkyFreight Direct',
    mode: 'Air Cargo Express',
    completedShipments: 3950,
    onTimePercent: 99.5,
    avgDwellMinutes: 22,
    damageRatePercent: 0.01,
    rating: 5.0,
    status: 'Preferred Partner',
  },
  {
    carrierId: 'CAR-04',
    name: 'Great Lakes Heavy Haul',
    mode: 'Highway Heavy Haul',
    completedShipments: 4210,
    onTimePercent: 96.2,
    avgDwellMinutes: 68,
    damageRatePercent: 0.12,
    rating: 4.2,
    status: 'Standard',
  },
  {
    carrierId: 'CAR-05',
    name: 'RapidGlide Courier',
    mode: 'Last-Mile Courier',
    completedShipments: 6890,
    onTimePercent: 97.5,
    avgDwellMinutes: 28,
    damageRatePercent: 0.06,
    rating: 4.6,
    status: 'Standard',
  },
  {
    carrierId: 'CAR-06',
    name: 'Pinnacle Freightway',
    mode: 'Highway Heavy Haul',
    completedShipments: 1420,
    onTimePercent: 91.4,
    avgDwellMinutes: 112,
    damageRatePercent: 0.35,
    rating: 3.6,
    status: 'Under Review',
  },
];

export const seedRegionalVolumes: RegionalVolume[] = [
  { region: 'West Coast Gateway', volume: 84200, percentage: 38, growth: '+14.2%' },
  { region: 'Midwest Intermodal', volume: 59800, percentage: 27, growth: '+9.8%' },
  { region: 'East Coast Megalopolis', volume: 46500, percentage: 21, growth: '+11.4%' },
  { region: 'Southern Distribution', volume: 31000, percentage: 14, growth: '+6.5%' },
];
