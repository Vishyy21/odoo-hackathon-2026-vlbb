import { apiClient } from '../api/api';
import { MOCK_FUEL_LOGS } from '../mocks/fuel.mock';
import type { FuelLog } from '../mocks/fuel.mock';

const USE_MOCK = true;

export const FuelService = {
  getFuelLogs: async (): Promise<FuelLog[]> => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_FUEL_LOGS), 400));
    }
    return apiClient.get('/fuel-logs');
  }
};
