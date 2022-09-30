<template>
  <div>
    <Header 
      :title="title"
      @toggle-menu-show="$emit('toggle-menu-show', $event)" />
        <b-col class="col-xl-6">
          <b-card class="my-cards"
            v-for="(product, index) in allProducts"
            :key="index"
          >
          <router-link :to="`/product/${product._id}`">
          <b-card-img 
            :src="product.img"
            :alt="product.title"
            top
          >
          </b-card-img>
          <b-card-title class="title">
            {{product.title}}
          </b-card-title>
          <b-card-text class="price">
            {{product.price}},00 kr
          </b-card-text>
          </router-link>
          </b-card>
        </b-col>
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
          console.log(res.data);
      })
        .catch(err => {
          console.log(err);
        });
  },
  getImage(img) {
    return img ? require(`${img}`) : ''
  }
    
  },
  created() {
    this.retrieveProducts();
  },

  mounted() {
    this.retrieveProducts();
  }
};
</script>

<style lang="scss" scoped>
.col-xl-6 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media (min-width: 768px) {
    padding: 2rem 2rem;
  }
  .my-cards {
    margin: 1rem;
    width: 90%;

    @media (min-width: 768px) {
      width: 40%;
      margin: 2rem;
      align-items: center;

    }
    @media (min-width: 1205px) {
      width: 27%;
      margin: 2rem;
    }
  }
}
.title {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 3.825rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: rgba(216, 125, 74, 1);

  @media (min-width: 768px) {
    font-size: 1.8rem;
    line-height: 3.3rem;
    letter-spacing: 0.114rem;
  }
}
.price {
  color: #7d7d7d;
  font-size: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
}

</style>