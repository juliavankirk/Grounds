import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// To populate store state with dummy products

export default new Vuex.Store({
  state: {
    cart: [],
    products: [
      {
        id: 1,
        name: 'Costa Rica Naranjo',
        featured: true,
        price: 79,
        size: '500g',
        quantity: 10,
        desc: 'Bright citrus notes of pomelo and lemon with a creamy milk chocolate sweetness.',
        geography: 'Naranjo, Costa Rica',
        image: '1-1.jpg'
      },
      {
        id: 2,
        name: 'Colombia Matambo Woods',
        featured: true,
        price: 79,
        size: '500g',
        quantity: 34,
        desc: 'Subtle floral aromas with notes of red plum and brown sugar.',
        geography: 'Gigante, Colombia',
        image: '2-1.jpg'
      },
      {
        id: 3,
        name: 'Hawaii Ka\'u',
        featured: true,
        price: 79,
        size: '500g',
        quantity: 22,
        desc: 'Jammy fruit notes of Morello cherry and strawberry with dark chocolate accents.',
        geography: 'Big Island, Hawaii',
        image: '3-1.jpg'
      },
      {
        id: 4,
        name: 'Vietnam Da Lat',
        featured: false,
        price: 79,
        size: '500g',
        quantity: 15,
        desc: 'A trifecta of flavors capturing toffee, kola nuts and cocoa peel.',
        geography: 'Cental Highlands, Vietnam',
        image: '4-1.jpg'
      },
      {
        id: 5,
        name: 'Colombia Huila Pink Bourbon',
        featured: false,
        price: 79,
        size: '500g',
        quantity: 28,
        desc: 'Floral aromas with lavender and pink grapefruit notes and a creamy mouthfeel.',
        geography: 'Huila, Colombia',
        image: '5-1.jpg'
      },
      {
        id: 6,
        name: 'Kenya Barichu',
        featured: false,
        price: 79,
        size: '500g',
        quantity: 26,
        desc: 'Orange blossom florals with Meyer lemon and black cherry notes.',
        geography: 'Nyeri County, Kenya',
        image: '6-1.jpg'
      },
    ]
  },
  mutations: {

  },
  actions: {

  }
});