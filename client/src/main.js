import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VeeValidate)

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
