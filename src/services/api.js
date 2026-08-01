import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Helper to check if URL is a public permitAll endpoint
const isPublicAuthEndpoint = (url) => {
  if (!url) return false;
  return (
    url.includes('/api/auth/login') ||
    url.includes('/api/auth/register') ||
    url.includes('/api/auth/')
  );
};

// Request interceptor to append JWT token ONLY to protected endpoints
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Login & Register (/api/auth/*) are permitAll in backend security config.
    // Ensure no Authorization header is sent for public auth endpoints.
    if (isPublicAuthEndpoint(config.url)) {
      delete config.headers.Authorization;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired or invalid tokens on protected endpoints
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isPublic = isPublicAuthEndpoint(error.config?.url);

    // Only clear token and redirect on 401/403 for protected endpoints,
    // preserving error messages returned by public permitAll endpoints (like login/register).
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !isPublic
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
