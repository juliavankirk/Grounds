<template>
  <div>
    <Header @toggle-menu-show="$emit('toggle-menu-show', $event)" />
    <h1 class="heading">Profile</h1>
  </div>
</template>

<script>
import Header from '../components/ProductPage/Header.vue'

export default {
  name: "Profile",
  components: { Header },
  emits: ["toggle-menu-show"]
}
</script>

<style lang="scss" scoped>
.heading {
  width: 32.7rem;
  margin: 2.4rem auto 0 auto;
  padding: 2.4rem 2.4rem 3.1rem 2.4rem;
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 3.825rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  @media (min-width: 768px) {
  font-size: 3.2rem;
  line-height: 3.6rem;
  letter-spacing: 0.114rem;
  }
}
</style>