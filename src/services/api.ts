import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};

export default api;
