import { apiClient } from '../api/api';
import { MOCK_MAINTENANCE } from '../mocks/maintenance.mock';
import type { MaintenanceRecord } from '../mocks/maintenance.mock';

const USE_MOCK = true;

export const MaintenanceService = {
  getMaintenanceRecords: async (): Promise<MaintenanceRecord[]> => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_MAINTENANCE), 350));
    }
    return apiClient.get('/maintenance');
  }
};
