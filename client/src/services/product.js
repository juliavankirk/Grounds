import Api from '@/services/Api'

export const productApi = {
  getProducts: () => 
    Api.get('/products/'),
  getProduct: productId => 
    Api.get(`/product/find/${productId}`),
  createProduct: (productId, data) => 
    Api.post('/products/', productId, data),
  updateProduct: (productId, data) => 
    Api.put(`products/${productId}`, data),
  deleteProduct: (productId) => 
    Api.delete(`/products/${productId}`)
}