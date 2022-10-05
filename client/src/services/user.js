import { Api } from '@/services/Api'
import authHeader from './auth.js'

export const userApi = {
  getAllUsers: () => 
    Api.get('/users/', { headers: authHeader() }),
  getUser: userId => 
    Api.get(`/users/find/${userId}`, { headers: authHeader() }),
  updateUser: (userId, data) => 
    Api.put(`/users/${userId}`, data, { headers: authHeader() }),
  deleteUser: userId => 
    Api.delete(`/users/${userId}`, { headers: authHeader() }),
  getUserStats: () => 
    Api.get('/users/stats', { headers: authHeader() })
}