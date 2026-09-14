export type DriverStatus = 'Driving' | 'On Duty' | 'Resting' | 'Off Duty';
export type LicenseClass = 'Class A CDL' | 'Class B CDL' | 'Commercial Pilot 767' | 'HazMat Certified CDL';

export interface CommercialDriver {
  id: string;
  name: string;
  licenseClass: LicenseClass;
  status: DriverStatus;
  experienceYears: number;
  accidentFreeMiles: number;
  safetyRating: number; // 0-5
  assignedVehicleId?: string;
  assignedHub: string;
  phone: string;
  email: string;
  hosRemainingHours: number; // Hours of Service left today (max 11 driving)
}

export const seedDrivers: CommercialDriver[] = [
  {
    id: 'DRV-101',
    name: 'Robert Martinez',
    licenseClass: 'Class A CDL',
    status: 'Driving',
    experienceYears: 12,
    accidentFreeMiles: 680000,
    safetyRating: 4.9,
    assignedVehicleId: 'FLEET-TRK-104',
    assignedHub: 'LAX-01',
    phone: '+1 (555) 234-8901',
    email: 'r.martinez@shipnow-logistics.com',
    hosRemainingHours: 4.5,
  },
  {
    id: 'DRV-102',
    name: 'Evelyn Taylor',
    licenseClass: 'HazMat Certified CDL',
    status: 'Driving',
    experienceYears: 9,
    accidentFreeMiles: 490000,
    safetyRating: 5.0,
    assignedVehicleId: 'FLEET-REEF-208',
    assignedHub: 'DFW-03',
    phone: '+1 (555) 873-1922',
    email: 'e.taylor@shipnow-logistics.com',
    hosRemainingHours: 3.2,
  },
  {
    id: 'DRV-103',
    name: 'Carlos Hernandez',
    licenseClass: 'Class B CDL',
    status: 'Driving',
    experienceYears: 6,
    accidentFreeMiles: 210000,
    safetyRating: 4.8,
    assignedVehicleId: 'FLEET-VAN-014',
    assignedHub: 'JFK-04',
    phone: '+1 (555) 902-3341',
    email: 'c.hernandez@shipnow-logistics.com',
    hosRemainingHours: 6.8,
  },
  {
    id: 'DRV-104',
    name: 'Danielle Miller',
    licenseClass: 'Class A CDL',
    status: 'Driving',
    experienceYears: 14,
    accidentFreeMiles: 820000,
    safetyRating: 4.9,
    assignedVehicleId: 'FLEET-TRK-302',
    assignedHub: 'ORD-02',
    phone: '+1 (555) 441-9920',
    email: 'd.miller@shipnow-logistics.com',
    hosRemainingHours: 5.5,
  },
  {
    id: 'DRV-105',
    name: 'Capt. James Vance',
    licenseClass: 'Commercial Pilot 767',
    status: 'Driving',
    experienceYears: 18,
    accidentFreeMiles: 1850000,
    safetyRating: 5.0,
    assignedVehicleId: 'CARGO-JET-767',
    assignedHub: 'SEA-06',
    phone: '+1 (555) 601-7788',
    email: 'j.vance@shipnow-aviation.com',
    hosRemainingHours: 4.0,
  },
  {
    id: 'DRV-106',
    name: 'Sarah Jenkins',
    licenseClass: 'Class A CDL',
    status: 'On Duty',
    experienceYears: 8,
    accidentFreeMiles: 340000,
    safetyRating: 4.7,
    assignedHub: 'ORD-02',
    phone: '+1 (555) 334-1188',
    email: 's.jenkins@shipnow-logistics.com',
    hosRemainingHours: 9.0,
  },
  {
    id: 'DRV-107',
    name: 'Brian Scott',
    licenseClass: 'Class B CDL',
    status: 'Resting',
    experienceYears: 5,
    accidentFreeMiles: 180000,
    safetyRating: 4.8,
    assignedHub: 'ATL-05',
    phone: '+1 (555) 552-8819',
    email: 'b.scott@shipnow-logistics.com',
    hosRemainingHours: 10.0,
  },
  {
    id: 'DRV-108',
    name: 'Rachel Lin',
    licenseClass: 'HazMat Certified CDL',
    status: 'Off Duty',
    experienceYears: 11,
    accidentFreeMiles: 520000,
    safetyRating: 4.9,
    assignedHub: 'SEA-06',
    phone: '+1 (555) 771-4402',
    email: 'r.lin@shipnow-logistics.com',
    hosRemainingHours: 11.0,
  },
];
