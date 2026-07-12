import { ShieldAlert, CheckCircle2, Clock, Map } from 'lucide-react';

export const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'critical', title: 'Vehicle Registration Expiring', message: 'Truck MH 12 AB 1234 registration expires in 2 days. Immediate action required.', time: '1 hour ago', icon: ShieldAlert, color: 'text-red-500 bg-red-50' },
  { id: 2, type: 'warning', title: 'Route Delay Detected', message: 'TRP-0144 delayed by 3 hours due to heavy traffic on NH44. ETA updated.', time: '3 hours ago', icon: Clock, color: 'text-amber-500 bg-amber-50' },
  { id: 3, type: 'success', title: 'Maintenance Completed', message: 'Engine Overhaul for TN 09 EF 9012 completed successfully. Vehicle is now Active.', time: '5 hours ago', icon: CheckCircle2, color: 'text-green-500 bg-green-50' },
  { id: 4, type: 'info', title: 'New Trip Assigned', message: 'You have been assigned to trip TRP-0145 starting from Mumbai Hub.', time: '1 day ago', icon: Map, color: 'text-blue-500 bg-blue-50' },
];
