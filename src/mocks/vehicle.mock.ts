import type { Vehicle } from '../types';

export const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', plateNumber: 'MH 12 AB 1234', model: 'Tata Prima 5530.S', type: 'Heavy Duty', status: 'Active', driverId: 'd1', fuelLevel: 78, nextServiceDate: '2026-08-15', location: 'Mumbai Hub' },
  { id: '2', plateNumber: 'DL 01 CD 5678', model: 'Ashok Leyland 3118', type: 'Medium Duty', status: 'On Trip', driverId: 'd2', fuelLevel: 45, nextServiceDate: '2026-07-20', location: 'NH48 Highway' },
  { id: '3', plateNumber: 'KA 03 EF 9012', model: 'Eicher Pro 2049', type: 'Light Duty', status: 'Maintenance', fuelLevel: 10, nextServiceDate: '2026-07-12', location: 'Bangalore Depot' },
  { id: '4', plateNumber: 'TN 09 GH 3456', model: 'BharatBenz 2823C', type: 'Heavy Duty', status: 'Available', fuelLevel: 95, nextServiceDate: '2026-09-01', location: 'Chennai Port' },
  { id: '5', plateNumber: 'GJ 05 IJ 7890', model: 'Tata Signa 4825.T', type: 'Heavy Duty', status: 'Active', driverId: 'd3', fuelLevel: 62, nextServiceDate: '2026-08-05', location: 'Surat Hub' },
];
