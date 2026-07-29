export const metricCards = [
  {
    id: 'active-shipments',
    label: 'Active Shipments',
    value: '1,284',
    unit: 'shipments',
    change: '+9.7%',
    changeDirection: 'up' as const,
    changeContext: 'from last week',
  },
  {
    id: 'delivery-performance',
    label: 'Delivery Performance',
    value: '94.3%',
    unit: 'on-time',
    change: '-1.2%',
    changeDirection: 'down' as const,
    changeContext: 'from last week',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$82,450',
    unit: '',
    change: '+12.6%',
    changeDirection: 'up' as const,
    changeContext: 'from last month',
  },
];

export const shipmentTypeData = [
  { name: 'Road Freight', value: 1150, percent: 46, color: 'var(--color-chart-purple)' },
  { name: 'Air Freight', value: 700, percent: 28, color: 'var(--color-chart-black)' },
  { name: 'Ocean Freight', value: 425, percent: 17, color: 'var(--color-chart-gray)' },
  { name: 'Rail Freight', value: 225, percent: 9, color: '#D9D9D9' },
];

export const totalShipments = 2500;

export const shipmentStatisticData = [
  { month: 'Jan', value: 2400 },
  { month: 'Feb', value: 2100 },
  { month: 'Mar', value: 2800 },
  { month: 'Apr', value: 2600 },
  { month: 'May', value: 3124 },
  { month: 'Jun', value: 2900 },
  { month: 'Jul', value: 3400 },
  { month: 'Aug', value: 4352 },
];

export const profitSummaryData = [
  { month: 'Jan', revenue: 62000, cost: 41000 },
  { month: 'Feb', revenue: 58000, cost: 39500 },
  { month: 'Mar', revenue: 71000, cost: 44000 },
  { month: 'Apr', revenue: 68000, cost: 42500 },
  { month: 'May', revenue: 87524, cost: 45640 },
  { month: 'Jun', revenue: 79000, cost: 43000 },
  { month: 'Jul', revenue: 91000, cost: 47000 },
  { month: 'Aug', revenue: 95500, cost: 48500 },
];

export const productCategories = [
  { name: 'Electronics', products: 240, percent: 24, color: 'var(--color-chart-purple)' },
  { name: 'Home & Kitchen', products: 200, percent: 20, color: 'var(--color-brand-100)' },
  { name: 'Apparel', products: 180, percent: 18, color: 'var(--color-chart-black)' },
  { name: 'Beauty & Health', products: 140, percent: 14, color: 'var(--color-chart-gray)' },
  { name: 'Sports & Outdoors', products: 120, percent: 12, color: '#d4d4d4' },
  { name: 'Automotive', products: 120, percent: 12, color: '#e5e5e5' },
];

export const totalProducts = 1000;

export const shipmentAlerts = {
  total: 12,
  breakdown: [
    { label: 'Customs Clearance Delay', count: 5 },
    { label: 'Incorrect Address Provided', count: 4 },
    { label: 'Weather-Related Hold', count: 3 },
  ],
  items: [
    { id: '#SH8743921', label: 'Customs Clearance Delay', route: 'Ocean Freight', date: 'Mar 20, 2035' },
    { id: '#SH8725810', label: 'Incorrect Address Provided', route: 'Road Freight', date: 'Mar 20, 2035' },
    { id: '#SH8790043', label: 'Weather-Related Hold', route: 'Air Freight', date: 'Mar 19, 2035' },
    { id: '#SH8716654', label: 'Incorrect Address Provided', route: 'Rail Freight', date: 'Mar 18, 2035' },
  ],
};

export const recentShipments = [
  {
    id: '#SH9283746',
    company: 'TechGear Inc.',
    companySub: 'Electronics',
    carrier: 'FedEx',
    route: 'Los Angeles, CA \u2192 Chicago, IL',
    date: 'Mar 20, 2035',
    status: 'In Transit',
  },
  {
    id: '#SH9182635',
    company: 'StyleHub Co.',
    companySub: 'Apparel',
    carrier: 'DHL',
    route: 'New York, NY \u2192 Atlanta, GA',
    date: 'Mar 19, 2035',
    status: 'Out for Delivery',
  },
  {
    id: '#SH9037821',
    company: 'FreshNest',
    companySub: 'Home & Kitchen',
    carrier: 'UPS',
    route: 'Dallas, TX \u2192 Miami, FL',
    date: 'Mar 18, 2035',
    status: 'Delivered',
  },
  {
    id: '#SH9372482',
    company: 'FitPlus Gear',
    companySub: 'Sports & Outdoors',
    carrier: 'USPS',
    route: 'Seattle, WA \u2192 Denver, CO',
    date: 'Mar 21, 2035',
    status: 'Processing',
  },
  {
    id: '#SH9457830',
    company: 'AutoParts Pro',
    companySub: 'Automotive',
    carrier: 'Aramex',
    route: 'Detroit, MI \u2192 San Diego, CA',
    date: 'Mar 20, 2035',
    status: 'In Transit',
  },
];

export const recentActivity = [
  {
    id: 1,
    user: '@TechGuru99',
    role: 'User',
    action: 'submitted a bulk shipment request',
    time: '12:00 PM',
  },
  {
    id: 2,
    user: '@SupportKen',
    role: 'Customer Support',
    action: 'added a priority tag to Order ID 77889KL',
    time: '11:30 AM',
  },
  {
    id: 3,
    user: '@SallyMae88',
    role: 'User',
    action: 'initiated a return process for Order ID 44556GHI',
    time: '11:00 AM',
  },
  {
    id: 4,
    user: '@AdminLisa',
    role: 'Administrator',
    action: 'resolved a delivery issue for Order ID 12345XYZ',
    time: '10:15 AM',
  },
];

export const activeTracking = {
  shipmentId: '#SH8743921',
  status: 'In Transit',
  scheduleNote: 'On Schedule',
  courierLabel: 'Courier',
  courierName: 'Daniel Cooper',
  courierCompany: 'SkyLogix Express',
  origin: { label: 'San Francisco, CA, USA', date: 'Mar 10, 2035 - 10:30 AM' },
  destination: { label: 'New York, NY, USA', date: 'Mar 23, 2035 - 03:00 PM (estimated)' },
};