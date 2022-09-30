import { Api } from '@/services/Api.js'

export const productApi = {
  getProducts: (cat) => 
    Api.get(
      cat
        ? `products?category=${cat}`
        : '/products'),
  getProduct: productId => 
    Api.get(`/products/find/${productId}`),
  createProduct: (productId, data) => 
    Api.post('/products/', productId, data),
  updateProduct: (productId, data) => 
    Api.put(`products/${productId}`, data),
  deleteProduct: (productId) => 
    Api.delete(`/product/${productId}`)
}