import { apiClient } from '../api/api';

export const AuthService = {
  login: async (credentials: any) => {
    return apiClient.post('/auth/login', credentials);
  },
  logout: async () => {
    return Promise.resolve();
  },
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  }
};
