import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; // Strip axios wrapper
  },
  async (error: AxiosError) => {
    const originalRequest = error.config; // @ts-ignore
  console.log(originalRequest);
    
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - redirecting to login');
      localStorage.removeItem('auth_token');
      // window.location.href = '/login'; 
      // Note: In React, you'd typically handle this via context or history.push
    }
    
    // Optionally implement retry logic here for 5xx errors

    return Promise.reject(error);
  }
);
