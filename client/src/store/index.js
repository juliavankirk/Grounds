import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { cart } from './cart.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    //cart
  }
});