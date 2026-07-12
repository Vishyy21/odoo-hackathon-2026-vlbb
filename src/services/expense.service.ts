import { apiClient } from '../api/api';
import { MOCK_EXPENSES } from '../mocks/expense.mock';
import type { Expense } from '../mocks/expense.mock';

const USE_MOCK = true;

export const ExpenseService = {
  getExpenses: async (): Promise<Expense[]> => {
    if (USE_MOCK) {
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_EXPENSES), 300));
    }
    return apiClient.get('/expenses');
  }
};
