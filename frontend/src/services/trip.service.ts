import { apiClient } from '../api/api';
import type { Trip } from '../types';
import { MOCK_TRIPS } from '../mocks/trip.mock';

const USE_MOCK = false;

export const TripService = {
  getTrips: async (): Promise<Trip[]> => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_TRIPS), 450));
    }
    return apiClient.get('/trips');
  },
  
  getTripById: async (id: string): Promise<Trip | undefined> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_TRIPS.find(t => t.id === id)), 300);
      });
    }
    return apiClient.get(`/trips/${id}`);
  },
  
  createTrip: async (data: any): Promise<Trip> => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve({ id: `TRP-00${Math.floor(Math.random()*100)}`, ...data }), 350));
    }
    return apiClient.post('/trips', data);
  }
};
