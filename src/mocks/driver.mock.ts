import type { Driver } from '../types';

export const MOCK_DRIVERS: Driver[] = [
  { id: '1', name: 'Rajesh Kumar', phone: '+91 98765 43210', licenseNumber: 'MH04 20180012345', status: 'Available', experienceYears: 8, safetyScore: 92, lastTripDate: '2026-07-10', assignedVehicleId: '1' },
  { id: '2', name: 'Amit Singh', phone: '+91 91234 56789', licenseNumber: 'DL01 20190054321', status: 'On Trip', experienceYears: 5, safetyScore: 85, lastTripDate: '2026-07-12', assignedVehicleId: '2' },
  { id: '3', name: 'Sunil Das', phone: '+91 99887 76655', licenseNumber: 'WB02 20150098765', status: 'Leave', experienceYears: 12, safetyScore: 98, lastTripDate: '2026-07-05' },
  { id: '4', name: 'Vikram Patel', phone: '+91 98989 89898', licenseNumber: 'GJ05 20200011223', status: 'Available', experienceYears: 3, safetyScore: 78, lastTripDate: '2026-07-11' },
  { id: '5', name: 'Mohammed Ali', phone: '+91 95555 44444', licenseNumber: 'UP32 20170066778', status: 'On Trip', experienceYears: 7, safetyScore: 88, lastTripDate: '2026-07-12', assignedVehicleId: '4' },
];
