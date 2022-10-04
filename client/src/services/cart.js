import { Api } from '@/services/Api'
import authHeader from './auth.js'

export const cartApi = {
  getAllCarts: () => 
    Api.get('/carts/', { headers: authHeader() }),
  getCart: userId => 
    Api.get(`/carts/find/${userId}`, { headers: authHeader() }),
  createCart: (cartId, data) =>
    Api.post('/carts/', cartId, data, { headers: authHeader() }),
  updateCart: (cartId, data) => 
    Api.put(`/carts/${cartId}`, data, { headers: authHeader() }),
  deleteCart: cartId => 
    Api.delete(`/carts/${cartId}`, { headers: authHeader() })
}