import { apiClient } from '../api/api';

const USE_MOCK = true;

export const DashboardService = {
  getStats: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve({
        activeVehicles: 85,
        totalTrips: 124,
        maintenanceAlerts: 12,
        revenue: 450000
      }), 300));
    }
    return apiClient.get('/dashboard/stats');
  }
};
