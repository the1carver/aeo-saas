import apiClient from './apiClient';

export async function registerUser(email, password) {
  const res = await apiClient.post('/auth/register', { email, password });
  return res.data;
}

export async function loginUser(email, password) {
  const res = await apiClient.post('/auth/login', { email, password });
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
} 