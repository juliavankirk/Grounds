import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}