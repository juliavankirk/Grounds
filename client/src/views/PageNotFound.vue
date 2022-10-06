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
  name: "Page Not Found",
  components: {
    Header,
  },
  emits: ["toggle-menu-show"],
  data() {
    return {
      title: "Page Not Found",
    }
  },
};
</script>

<style lang="scss" scoped>

</style>