<template>
<div>
  <div :class="['overlay', show ? 'showElement' : 'hideElement']"></div>
  <div :class="['menu', show ? 'showElement' : 'hideElement']" ref="mobileMenu">
    <section class="navbar">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/catalog">Shop</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
      </b-navbar-nav>
    </section>
  </div>
</div>
</template>

<script>

export default {
  name: "Menu",
  props: { show: Boolean, scrollTop: Boolean },
  emits: ["toggle-menu-show"],
  watch: {
    scrollTop() {
      this.$refs.mobileMenu.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background: black;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  z-index: 1;
  position: absolute;
  opacity: 0.4;

  @media (min-width: 1205px) {
    display: none !important;
  }
}

.menu {
  position: absolute;
  background: white;
  width: 100%;
  top: 9.1rem;
  padding: 8.4rem 0 3.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  opacity: 1;
  max-height: 75vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    max-height: auto;
    padding: 10.8rem 0 6.7rem 0;
  }

  @media (min-width: 1205px) {
    display: none !important;
  }
}

.navbar {
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
}

.showElement {
  display: flex;
}

.hideElement {
  display: none;
}
</style>