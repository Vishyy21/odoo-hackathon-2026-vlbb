export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  type: 'Light Duty' | 'Medium Duty' | 'Heavy Duty';
  status: 'Active' | 'Maintenance' | 'On Trip' | 'Available';
  driverId?: string;
  fuelLevel: number;
  nextServiceDate: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  status: 'Available' | 'On Trip' | 'Leave';
  experienceYears: number;
  safetyScore: number;
  lastTripDate?: string;
  assignedVehicleId?: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  startLocation: string;
  endLocation: string;
  status: 'Planned' | 'In Transit' | 'Delayed' | 'Completed';
  distanceKm: number;
  eta: string;
  startDate: string;
  endDate?: string;
}

export interface MaintenanceLog {
  id: string;
  vehicleId: string;
  type: string;
  date: string;
  cost: number;
  status: 'Scheduled' | 'In Progress' | 'Pending Approval' | 'Completed';
  technicianName: string;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  volumeLiters: number;
  cost: number;
  location: string;
  status: 'Verified' | 'Pending Verification' | 'Flagged';
}

export interface Expense {
  id: string;
  tripId?: string;
  vehicleId?: string;
  category: 'Tolls' | 'Food & Lodging' | 'Repairs' | 'Fines' | 'Other';
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Fleet Manager' | 'Driver';
  avatarUrl?: string;
}
