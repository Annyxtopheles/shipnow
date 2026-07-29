import { Cpu, Shirt, UtensilsCrossed, Dumbbell, Car, Sparkles, Coffee, type LucideIcon } from 'lucide-react';
import type { ShipmentCategory } from '@/data/shipments';

// The Figma file uses a distinct company-logo icon per row. The 12 shipments
// seeded directly from the Figma reference use their real brand-logo assets
// (see companyLogos in ShipmentCard.tsx). Any additional, generated company
// (used only to pad out pagination, per the assignment's allowance) falls
// back to an icon for its product category instead, kept consistent across
// the app in the same small rounded-square badge position/role as the design
// shows. Recorded here as a README-worthy assumption.
export const categoryIcons: Record<ShipmentCategory, LucideIcon> = {
  Electronics: Cpu,
  Apparel: Shirt,
  'Home & Kitchen': UtensilsCrossed,
  'Sports & Outdoors': Dumbbell,
  Automotive: Car,
  Fashion: Sparkles,
  'Food & Beverage': Coffee,
};
