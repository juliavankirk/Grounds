import { Api } from '@/services/Api'
import authHeader from './auth.js'

export const orderApi = {
  getAllOrders: () => 
    Api.get('/orders/', { headers: authHeader() }),
  getOrder: orderId => 
    Api.get(`/orders/find/${orderId}`, { headers: authHeader() }),
  createOrder: (orderId, data) =>
    Api.post(`orders/${orderId}`, data, { headers: authHeader() }),
  updateOrder: (orderId, data) => 
    Api.put(`/orders/${orderId}`, data, { headers: authHeader() }),
  deleteOrder: orderId => 
    Api.delete(`/orders/${orderId}`, { headers: authHeader() }),
  getMonthlyIncome: () => 
    Api.get('/orders/income', { headers: authHeader() })
}