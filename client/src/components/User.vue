<template>
<div>
  <div :class="['overlay', show ? 'showElement' : 'hideElement']"></div>
  <div :class="['user', show ? 'showElement' : 'hideElement']" ref="mobileUser">
    <section v-if="!currentUser" class="navbar">
      <b-navbar-nav>
        <b-nav-item href="/login">Sign in</b-nav-item>
        <b-nav-item href="/register">Register</b-nav-item>
      </b-navbar-nav>
    </section>
    <section v-if="currentUser" class="navbar">
      <b-navbar-nav>
        <b-nav-item :to="`/profile/${currentUser._id}`">Profile</b-nav-item>
        <b-nav-item href @click.prevent="logOut">Sign out</b-nav-item>
      </b-navbar-nav>
    </section>
  </div>
</div>
</template>

<script>

export default {
  name: "User",
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
  },
  props: { show: Boolean, scrollTop: Boolean },
  emits: ["toggle-menu-show"],
  watch: {
    scrollTop() {
      this.$refs.mobileUser.scrollTo(0, 0);
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

.user {
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