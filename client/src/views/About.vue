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
  name: "About",
  components: {
    Header,
  },
  emits: ["toggle-menu-show"],
  data() {
    return {
      title: "About"
    }
  }
};
</script>

<style lang="sass" scoped>

</style>