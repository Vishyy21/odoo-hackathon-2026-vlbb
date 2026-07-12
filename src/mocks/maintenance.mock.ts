export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  serviceType: string;
  description: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  date: string;
  cost: number;
}

export const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  { id: '1', vehicleId: 'MH 12 AB 1234', serviceType: 'Routine Service', description: 'Oil change, filter replacement', status: 'Scheduled', date: '2026-07-15', cost: 4500 },
  { id: '2', vehicleId: 'DL 01 CD 5678', serviceType: 'Repair', description: 'Brake pad replacement', status: 'Completed', date: '2026-07-05', cost: 12000 },
  { id: '3', vehicleId: 'TN 09 EF 9012', serviceType: 'Inspection', description: 'Annual fitness check', status: 'In Progress', date: '2026-07-12', cost: 2500 },
];
