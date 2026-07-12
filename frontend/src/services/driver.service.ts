import { apiClient } from '../api/api';
import type { Driver } from '../types';
import { MOCK_DRIVERS } from '../mocks/driver.mock';

const USE_MOCK = true;

export const DriverService = {
  getDrivers: async (): Promise<Driver[]> => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_DRIVERS), 400));
    }
    return apiClient.get('/drivers');
  },
  
  getDriverById: async (id: string): Promise<Driver | undefined> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DRIVERS.find(d => d.id === id)), 300);
      });
    }
    return apiClient.get(`/drivers/${id}`);
  }
};
