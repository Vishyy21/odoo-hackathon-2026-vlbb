import { apiClient } from '../api/api';
import { MOCK_NOTIFICATIONS } from '../mocks/notification.mock';

const USE_MOCK = false;

export const NotificationService = {
  getNotifications: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_NOTIFICATIONS), 300));
    }
    return apiClient.get('/notifications');
  },
  markAsRead: async (id: string) => {
    if (USE_MOCK) return new Promise(resolve => setTimeout(resolve, 300));
    return apiClient.put(`/notifications/${id}/read`);
  }
};
