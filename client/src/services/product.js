import Api from '@/services/Api'

export const productApi = {
  getProducts: () => 
    Api.get('/products/'),
  getProduct: productId => 
    Api.get(`/product/find/${productId}`),
  createProduct: productId => 
    Api.post('/products/', productId),
  updateProduct: (productId, update) => 
    Api.put(`products/${productId}`, update),
  deleteProduct: (productId) => 
    Api.delete(`/products/${productId}`)
}