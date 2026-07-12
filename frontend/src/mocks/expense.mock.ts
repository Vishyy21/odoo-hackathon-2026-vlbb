export interface Expense {
  id: string;
  tripId: string;
  category: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  driverId: string;
}

export const MOCK_EXPENSES: Expense[] = [
  { id: 'EXP-801', tripId: 'TRP-0142', category: 'Toll Tax', amount: 1250, date: '2026-07-12', status: 'Approved', driverId: 'Rajesh Kumar' },
  { id: 'EXP-802', tripId: 'TRP-0143', category: 'Food Allowance', amount: 450, date: '2026-07-12', status: 'Pending', driverId: 'Amit Singh' },
  { id: 'EXP-803', tripId: 'TRP-0144', category: 'Maintenance', amount: 3200, date: '2026-07-11', status: 'Approved', driverId: 'Vijay Natrajan' },
  { id: 'EXP-804', tripId: 'TRP-0145', category: 'Parking', amount: 150, date: '2026-07-10', status: 'Rejected', driverId: 'Vikram Patel' },
];
