import { Api } from './Api';
import authHeader from './auth-header';

export const userApi = {
  getAllUsers: () => 
    Api.get('/users/', { headers: authHeader() }),
  getUser: userId => 
    Api.get(`/users/find/${userId}`, { headers: authHeader() }),
  updateUser: (userId, update) => 
    Api.put(`/users/${userId}`, update, { headers: authHeader() }),
  deleteUser: userId => 
    Api.delete(`/users/${userId}`, { headers: authHeader() }),
  getUserStats: () => 
    Api.get('/users/stats', { headers: authHeader() })
}