<template>
<div>
  <Header 
  :title="title"
  @toggle-menu-show="$emit('toggle-menu-show', $event)" />

  <section>
    <b-list-group>
      {}
      <b-badge>{}</b-badge>
    </b-list-group>
  </section>

</div>
  
</template>

<script>
import Header from '../components/ProductsPage/Header.vue';
import { orderApi } from '@/services/order.js';

export default {
  name: "Orders",
  components: {
    Header,
  },
  emits: ["toggle-menu-show"],
  data() {
    return {
      title: "Orders",
      allOrders: []
    }
  },

  methods: {
    retrieveOrders() {
      orderApi.getAllOrders()
      .then(res => {
        this.allOrders = res.data
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    this.retrieveOrders();
  },
  mounted() {
    this.retrieveOrders();
  }
};
</script>

<style lang="scss" scoped>

</style>