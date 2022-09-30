<template>
  <div>
    <section class="wrapper">
      <h2>{{ product.name }}</h2>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'product',
    data() {
	    return {
	      product: this.$store.getters.product(this.$route.params.id)
      }
    }
  };
</script