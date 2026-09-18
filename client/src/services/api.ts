import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for selective token injection
api.interceptors.request.use(
  (config) => {
    const url = config.url || '';

    // Route-specific token scope
    if (url.startsWith('/admin')) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else if (url.startsWith('/event')) {
      const participantToken = localStorage.getItem('participantToken');
      if (participantToken) {
        config.headers.Authorization = `Bearer ${participantToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiration handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';

      if (url.startsWith('/admin')) {
        localStorage.removeItem('adminToken');
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      } else if (url.startsWith('/event')) {
        localStorage.removeItem('participantToken');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
