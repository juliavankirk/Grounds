// import { LayoutPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import Products from './views/Products.vue'
import Catalog from './views/Catalog.vue'
import AddProduct from './views/AddProduct.vue'
import Item from './views/Item.vue'
import About from './views/About.vue'
import Orders from './views/Orders.vue'
import Success from './views/Success.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/item/:id',
      name: 'item',
      component: Item
    },
    {
      path: '/addproduct/:id',
      name: 'addproduct',
      component: AddProduct
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile,
    }
  ]
})
