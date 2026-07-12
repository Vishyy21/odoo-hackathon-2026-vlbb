export const mockDashboardData = {
  kpis: {
    totalFleet: { value: 40, trend: 12, isPositive: true },
    activeTrips: { value: 18, trend: 8, isPositive: true },
    driversAvailable: { value: 12, trend: -2, isPositive: false },
    fleetHealth: { value: 92, trend: 1, isPositive: true },
    fuelCost: { value: '₹12.4L', trend: -5, isPositive: true },
    maintenanceCost: { value: '₹2.1L', trend: 15, isPositive: false },
    revenue: { value: '₹45.2L', trend: 22, isPositive: true },
    efficiency: { value: 88, trend: 4, isPositive: true },
  },
  recentTrips: [
    { id: 'TRP-0142', destination: 'Nhava Sheva Port, Mumbai', status: 'completed', date: 'Today, 08:30 AM', driver: 'Rajesh Kumar', vehicle: 'MH 12 AB 1234' },
    { id: 'TRP-0143', destination: 'Delhi Distribution Hub', status: 'in-transit', date: 'Today, 09:15 AM', driver: 'Amit Singh', vehicle: 'DL 01 CD 5678' },
    { id: 'TRP-0144', destination: 'Chennai Logistics Park', status: 'delayed', date: 'Yesterday', driver: 'Vijay Natrajan', vehicle: 'TN 09 EF 9012' },
    { id: 'TRP-0145', destination: 'Kolkata East Terminal', status: 'in-transit', date: 'Yesterday', driver: 'Sunil Das', vehicle: 'WB 02 GH 3456' },
  ],
  alerts: [
    { id: 1, type: 'critical', title: 'Vehicle Registration Expiring', description: 'Truck MH 12 AB 1234 registration expires in 2 days.', time: '1h ago' },
    { id: 2, type: 'warning', title: 'Route Delay Detected', description: 'TRP-0144 delayed by 3 hours due to heavy traffic on NH44.', time: '3h ago' },
    { id: 3, type: 'info', title: 'Scheduled Maintenance', description: '3 vehicles are scheduled for routine maintenance tomorrow.', time: '5h ago' },
  ],
  timeline: [
    { id: 1, title: 'Trip TRP-0142 Completed', description: 'Delivery confirmed at Mumbai Port.', time: '10:45 AM', type: 'success' },
    { id: 2, title: 'Fuel Added', description: '120L Diesel added to DL 01 CD 5678 (₹10,500).', time: '09:30 AM', type: 'info' },
    { id: 3, title: 'Trip TRP-0143 Started', description: 'Dispatched from Pune Hub to Delhi.', time: '09:15 AM', type: 'primary' },
    { id: 4, title: 'Maintenance Approved', description: 'Brake pad replacement approved for TN 09 EF 9012.', time: '08:00 AM', type: 'warning' },
  ],
  charts: {
    trips: [
      { name: 'Mon', completed: 12, delayed: 2 },
      { name: 'Tue', completed: 15, delayed: 1 },
      { name: 'Wed', completed: 14, delayed: 3 },
      { name: 'Thu', completed: 18, delayed: 0 },
      { name: 'Fri', completed: 22, delayed: 4 },
      { name: 'Sat', completed: 10, delayed: 1 },
      { name: 'Sun', completed: 8, delayed: 0 },
    ],
    fuel: [
      { month: 'Jan', cost: 8.5 },
      { month: 'Feb', cost: 9.2 },
      { month: 'Mar', cost: 8.8 },
      { month: 'Apr', cost: 10.5 },
      { month: 'May', cost: 11.2 },
      { month: 'Jun', cost: 12.4 },
    ],
    utilization: [
      { name: 'Active', value: 28, color: '#714B67' },
      { name: 'Maintenance', value: 4, color: '#F59E0B' },
      { name: 'Available', value: 8, color: '#22C55E' },
    ]
  }
};
