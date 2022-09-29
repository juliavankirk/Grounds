<template>
<div>
  <Header 
  :title="title"
  @toggle-menu-show="$emit('toggle-menu-show', $event)" />
  <ProductCard 
    v-for="product in allProducts"
    v-bind:key="product.id"
    v-bind:product="product"
    />

</div>
  
</template>

<script>
import Header from '../components/CatalogPage/Header.vue';
import ProductCard from '@/components/CatalogPage/ProductCard';

export default {
  name: "Catalog",
  components: {
    Header,
    ProductCard
  },
  emits: ["toggle-menu-show"],
  data() {
    return {
      title: "Products",
      allProducts: [],
    }
  },
  methods: {
    async getAllProducts() {}
  }
};
</script>

<style lang="sass" scoped>

</style>