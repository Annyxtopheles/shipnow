export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export interface InvoiceItem {
  description: string;
  qty: number;
  rate: number;
  total: number;
}

export interface Invoice {
  id: string;
  shipmentId: string;
  company: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentMethod: string;
  items: InvoiceItem[];
}

export const seedInvoices: Invoice[] = [
  {
    id: '#INV-2035-081',
    shipmentId: '#SH9283746',
    company: 'TechGear Inc.',
    amount: 4850.0,
    issueDate: 'Mar 15, 2035',
    dueDate: 'Mar 30, 2035',
    status: 'Pending',
    paymentMethod: 'Bank Wire',
    items: [
      { description: 'Road Freight Handling (LA to Chicago)', qty: 1, rate: 3900.0, total: 3900.0 },
      { description: 'Fuel Surcharge (12%)', qty: 1, rate: 468.0, total: 468.0 },
      { description: 'Priority Customs Clearance', qty: 1, rate: 482.0, total: 482.0 },
    ],
  },
  {
    id: '#INV-2035-080',
    shipmentId: '#SH9182635',
    company: 'StyleHub Co.',
    amount: 3200.0,
    issueDate: 'Mar 12, 2035',
    dueDate: 'Mar 27, 2035',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    items: [
      { description: 'Air Express Freight (NY to Atlanta)', qty: 1, rate: 2800.0, total: 2800.0 },
      { description: 'Express Liftgate Service', qty: 1, rate: 400.0, total: 400.0 },
    ],
  },
  {
    id: '#INV-2035-079',
    shipmentId: '#SH9037821',
    company: 'FreshNest',
    amount: 5120.0,
    issueDate: 'Mar 10, 2035',
    dueDate: 'Mar 25, 2035',
    status: 'Paid',
    paymentMethod: 'ACH Transfer',
    items: [
      { description: 'Cold-chain Freight Logistics (Dallas to Miami)', qty: 1, rate: 4500.0, total: 4500.0 },
      { description: 'Temperature Logger & Tracking', qty: 1, rate: 620.0, total: 620.0 },
    ],
  },
  {
    id: '#INV-2035-078',
    shipmentId: '#SH9347452',
    company: 'FitPlus Gear',
    amount: 2750.0,
    issueDate: 'Mar 01, 2035',
    dueDate: 'Mar 16, 2035',
    status: 'Overdue',
    paymentMethod: 'Bank Wire',
    items: [
      { description: 'Heavy Machinery Freight (Seattle to Denver)', qty: 1, rate: 2400.0, total: 2400.0 },
      { description: 'Oversize Loading Permit', qty: 1, rate: 350.0, total: 350.0 },
    ],
  },
  {
    id: '#INV-2035-077',
    shipmentId: '#SH8821349',
    company: 'EcoLights',
    amount: 6400.0,
    issueDate: 'Mar 14, 2035',
    dueDate: 'Apr 04, 2035',
    status: 'Pending',
    paymentMethod: 'ACH Transfer',
    items: [
      { description: 'Commercial Electronics Freight (Austin to Phoenix)', qty: 1, rate: 5800.0, total: 5800.0 },
      { description: 'Insurance Coverage ($50K)', qty: 1, rate: 600.0, total: 600.0 },
    ],
  },
  {
    id: '#INV-2035-076',
    shipmentId: '#SH9457830',
    company: 'AutoParts Pro',
    amount: 1890.0,
    issueDate: 'Mar 08, 2035',
    dueDate: 'Mar 23, 2035',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    items: [
      { description: 'Standard Parcel Transport (Detroit to San Diego)', qty: 1, rate: 1650.0, total: 1650.0 },
      { description: 'Residential Delivery Surcharge', qty: 1, rate: 240.0, total: 240.0 },
    ],
  },
  {
    id: '#INV-2035-075',
    shipmentId: '#SH8967432',
    company: 'GreenHaven',
    amount: 3450.0,
    issueDate: 'Feb 26, 2035',
    dueDate: 'Mar 12, 2035',
    status: 'Overdue',
    paymentMethod: 'Bank Wire',
    items: [
      { description: 'Ocean Container Drayage', qty: 1, rate: 3100.0, total: 3100.0 },
      { description: 'Port Security Assessment', qty: 1, rate: 350.0, total: 350.0 },
    ],
  },
  {
    id: '#INV-2035-074',
    shipmentId: '#SH8893247',
    company: 'ModaWear',
    amount: 4100.0,
    issueDate: 'Mar 18, 2035',
    dueDate: 'Apr 02, 2035',
    status: 'Draft',
    paymentMethod: 'Pending Selection',
    items: [
      { description: 'Apparel Bulk Consolidation (Boston to Charlotte)', qty: 1, rate: 3800.0, total: 3800.0 },
      { description: 'Garment on Hanger (GOH) packing', qty: 1, rate: 300.0, total: 300.0 },
    ],
  },
];
