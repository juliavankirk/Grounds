import { Api } from './Api';
import authHeader from './auth-header';

export const productApi = {
  getProducts: () => 
    Api.get('/products/'),
  getProduct: productId => 
    Api.get(`/product/find/${productId}`),
  createProduct: productId => 
    Api.post('/products/', productId, { headers: authHeader() }),
  updateProduct: (productId, update) => 
    Api.put(`products/${productId}`, update, { headers: authHeader() }),
  deleteProduct: (productId) => 
    Api.delete(`/products/${productId}`, { headers: authHeader() })
}