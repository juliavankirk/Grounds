import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3001/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const Api = axios.create({
  baseURL: BASE_URL,
});

/**
 * 
 * export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}`},
});
 * 
 */



