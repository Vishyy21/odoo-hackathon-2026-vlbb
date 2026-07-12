import type { Trip } from '../types';

export const MOCK_TRIPS: Trip[] = [
  { id: '1', startLocation: 'Mumbai', endLocation: 'Delhi', distanceKm: 1400, eta: '24h', status: 'In Transit', vehicleId: '1', driverId: '1', startDate: '2026-07-11T10:00:00Z' },
  { id: '2', startLocation: 'Chennai', endLocation: 'Bangalore', distanceKm: 350, eta: '7h', status: 'Completed', vehicleId: '2', driverId: '2', startDate: '2026-07-10T08:00:00Z', endDate: '2026-07-10T15:00:00Z' },
  { id: '3', startLocation: 'Kolkata', endLocation: 'Patna', distanceKm: 580, eta: '12h', status: 'Planned', vehicleId: '3', driverId: '3', startDate: '2026-07-13T06:00:00Z' },
  { id: '4', startLocation: 'Surat', endLocation: 'Ahmedabad', distanceKm: 260, eta: '5h', status: 'Delayed', vehicleId: '4', driverId: '4', startDate: '2026-07-12T09:00:00Z' },
  { id: '5', startLocation: 'Pune', endLocation: 'Hyderabad', distanceKm: 560, eta: '11h', status: 'In Transit', vehicleId: '5', driverId: '5', startDate: '2026-07-11T18:00:00Z' },
];
