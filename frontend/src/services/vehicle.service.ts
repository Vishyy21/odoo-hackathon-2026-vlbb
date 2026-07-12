import { apiClient } from '../api/api';
import type { Vehicle } from '../types';
import { MOCK_VEHICLES } from '../mocks/vehicle.mock';

// USE_MOCK determines if we use local mock data or the Axios API client
const USE_MOCK = false;

export const VehicleService = {
  getVehicles: async (): Promise<Vehicle[]> => {
    if (USE_MOCK) {
      // Simulate network delay
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_VEHICLES), 500));
    }
    return apiClient.get('/vehicles');
  },

  getVehicleById: async (id: string): Promise<Vehicle | undefined> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_VEHICLES.find(v => v.id === id)), 300);
      });
    }
    return apiClient.get(`/vehicles/${id}`);
  }
};
