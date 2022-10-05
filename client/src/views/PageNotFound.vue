<template>
<div>
  <Header 
  :title="title"
  @toggle-menu-show="$emit('toggle-menu-show', $event)" />
</div>
  
</template>

<script>
import Header from '../components/ProductsPage/Header.vue';


export default {
  name: "PageNotFound",
  components: {
    Header,
  },
  emits: ["toggle-menu-show"],
  data() {
    return {
      title: "PageNotFound",
    }
  },
};
</script>

<style lang="scss" scoped>

</style>