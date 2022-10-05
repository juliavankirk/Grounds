import { Api } from '@/services/Api.js'
import authHeader from './auth'

export const productApi = {
  getProducts: (cat) => 
    Api.get(
      cat
        ? `products?category=${cat}`
        : '/products'),
  getProduct: productId => 
    Api.get(`/products/find/${productId}`),
  createProduct: (productId, data) => 
    Api.post('/products/', productId, data, { headers: authHeader() }),
  updateProduct: (productId, data) => 
    Api.put(`products/${productId}`, data, { headers: authHeader() }),
  deleteProduct: (productId) => 
    Api.delete(`/product/${productId}`, { headers: authHeader() })
}