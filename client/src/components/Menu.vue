<template>
<div>
  <div :class="['overlay', show ? 'showElement' : 'hideElement']"></div>
  <div :class="['menu', show ? 'showElement' : 'hideElement']" ref="mobileMenu">
    <section class="navbar" v-if="!currentUser">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/products">Products</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
        <b-nav-item class="invis" href="/login">Sign in</b-nav-item>
        <b-nav-item class="invis" href="/register">Register</b-nav-item>
      </b-navbar-nav>
    </section>
    <section class="navbar" v-if="currentUser && currentUser.isAdmin">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/products">Products</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
        <b-nav-item class="invis" :to="`/profile/${currentUser._id}`">Profile</b-nav-item>
        <b-nav-item class="invis" @click.prevent="logOut">Logout</b-nav-item>
      </b-navbar-nav>
    </section>
    <section class="navbar" v-if="currentUser && !currentUser.isAdmin">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/catalog">Catalog</b-nav-item>
        <b-nav-item href="/orders">Orders</b-nav-item>
        <b-nav-item class="invis" :to="`/profile/${currentUser._id}`">Profile</b-nav-item>
        <b-nav-item class="invis" @click.prevent="logOut">Logout</b-nav-item>
      </b-navbar-nav>
    </section>
  </div>
</div>
</template>

<script>

export default {
  name: "Menu",
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
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
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  opacity: 1;
  max-height: 75vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    max-height: auto;
    padding: 5rem;
  }

  @media (min-width: 1205px) {
    display: none !important;
  }
}

.invis {

  @media (min-width: 768px) {
    visibility: hidden;
  }
}

.navbar {
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 3.825rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 1.7rem;
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