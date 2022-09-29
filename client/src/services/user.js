import Api from '@/services/Api'

export const userApi = {
  getAllUsers: () => 
    Api.get('/users/'),
  getUser: userId => 
    Api.get(`/users/find/${userId}`,),
  updateUser: (userId, update) => 
    Api.put(`/users/${userId}`, update),
  deleteUser: userId => 
    Api.delete(`/users/${userId}`),
  getUserStats: () => 
    Api.get('/users/stats')
}