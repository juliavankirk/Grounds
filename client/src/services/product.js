import { Api } from '@/services/Api.js'

export const productApi = {
  getProducts: () => 
    Api.get('/products'),
  getProduct: productId => 
    Api.get(`/products/find/${productId}`),
  createProduct: (productId, data) => 
    Api.post('/products/', productId, data),
  updateProduct: (productId, data) => 
    Api.put(`products/${productId}`, data),
  deleteProduct: (productId) => 
    Api.delete(`/product/${productId}`)
}