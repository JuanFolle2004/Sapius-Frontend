// src/api/auth.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const register = async (
  email: string,
  password: string,
  birthDate: string, // ✅ FIXED: camelCase
  name: string,
  lastname: string,
  phone: string
) => {
  const response = await axios.post(`${API_BASE}/users/register`, {
    email,
    password,
    birthDate,  // ✅ camelCase used consistently
    name,
    lastname,
    phone,
  });

  return response.data;
};



export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await axios.post(`${API_BASE}/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data; // contains access_token
};

