import { apiClient } from '../api/api';

const USE_MOCK = true;

export const ReportService = {
  getReportData: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve({}), 300));
    }
    return apiClient.get('/reports');
  }
};
