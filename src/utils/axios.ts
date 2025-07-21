import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Change to your deployed URL later
});

// Attach JWT token if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
