<template>
  <b-card-group deck>
    <router-link to="#">
      <b-card>
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
</template>
<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>
