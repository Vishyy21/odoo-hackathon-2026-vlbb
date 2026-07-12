export interface FuelLog {
  id: string;
  vehicleId: string;
  driverId: string;
  date: string;
  volume: number;
  cost: number;
  odometer: number;
  location: string;
}

export const MOCK_FUEL_LOGS: FuelLog[] = [
  { id: '1', vehicleId: 'MH 12 AB 1234', driverId: 'Rajesh Kumar', date: '2026-07-12', volume: 120, cost: 11400, odometer: 45230, location: 'Reliance Pump, Pune' },
  { id: '2', vehicleId: 'DL 01 CD 5678', driverId: 'Amit Singh', date: '2026-07-10', volume: 85, cost: 8075, odometer: 89100, location: 'Indian Oil, Delhi' },
  { id: '3', vehicleId: 'TN 09 EF 9012', driverId: 'Vijay Natrajan', date: '2026-07-09', volume: 200, cost: 19000, odometer: 12450, location: 'HP Petrol Pump, Chennai' },
];
