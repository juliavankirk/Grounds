<template>
  <div>
    <Header 
      :title="title"
      @toggle-menu-show="$emit('toggle-menu-show', $event)" />
    <b-card-group deck>
      <router-link to="#">
        <b-card
          :class="{ active: index === currentIndex }"
          v-for="(product, index) in allProducts"
          :key="index"
        >
          <b-card-img top>
            {{product.img}}
          </b-card-img>
          <b-card-title>
            {{product.title}}
          </b-card-title>
          <b-card-text >
            {{product.price}}
          </b-card-text>
        </b-card>
      </router-link>
    </b-card-group>  
  </div>
</template>
<script>
import Header from '../components/ProductsPage/Header.vue';
import ProductCard from '@/components/ProductsPage/ProductCard';
import { productApi } from '@/services/product.js'

export default {
  name: "Products",
  components: {
    Header,
    ProductCard
  },
  emits: ["toggle-menu-show"],
  data() {
    return {
      title: "Products",
      product: [],
      allProducts: [],
    }
  },
  
  methods: {
    retrieveProducts() {
      productApi
        .getProducts()
        .then(res => {
          this.allProducts = res.data
          console.log(response.data)
      })
        .catch(err => {
          console.log(err)
        });
  },
    
  },
  created() {
    this.retrieveProducts();
  },

  mounted() {
    this.retrieveProducts();
  }
};
</script>

<style lang="sass" scoped>

</style>