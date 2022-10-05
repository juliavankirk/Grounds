import { Api } from '@/services/Api'
import authHeader from './auth.js'

export const cartApi = {
  getCart: userId => 
    Api.get(`/users/carts/${userId}`, { headers: authHeader() }),
  createCart: (userId, cart) =>
    Api.post(`/users/${userId}/carts/`, cart, { headers: authHeader() }),
  updateCart: (userId, cartId, data) => 
    Api.put(`users/${userId}/carts/${cartId}`, data, { headers: authHeader() }),
  deleteCart: (userId, cartId) => 
    Api.delete(`users/${userId}/carts/${cartId}`, { headers: authHeader() })
}