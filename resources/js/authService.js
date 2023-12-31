// authService.js
import axios from 'axios';

export const login = async (credentials) => {
  return axios.post('/login', credentials);
};

export const logout = async () => {
  return axios.post('/logout');
};

export const getUserInfo = async () => {
  return axios.get('/api/user');
};
