<template>
  <nav class="navbar">
    <button
      class="navbar__mobile-menu-btn"
      @click="$emit('toggle-menu-show', 'menu')"
    ></button>
    <router-link
      @click="$emit('toggle-menu-show', 'logo')"
      to="/"
      class="navbar__homeLink"
    >
      <img
        src="../assets/svg/logo.svg"
        alt="grounds logo"
        class="navbar__homeLink__logo"
    /></router-link>
    <ul class="navbar__desktop-menu">
      <li class="navbar__desktop-menu__link">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <button
      class="navbar__mobile-acct-btn"
      @click="$emit('toggle-menu-show', 'user')"
    ></button>
    <button
      class="navbar__cart-btn"
      @click="$emit('toggle-menu-show', 'cart')"
    >
    </button>
    
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return { myVar: "hello" };
  },
  emits: ["toggle-menu-show"],
};
</script>

<style lang="scss" scoped>
.navbar {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem 2.4rem;
  position: relative;
  border-bottom: 0.1rem solid #353535;
  z-index: 3;

  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 2.2rem 0;
    margin: 0 auto;
    width: 68.9rem;
  }

  @media (min-width: 1205px) {
    width: 111rem;
  }

  button {
    border: none;
  }

  &__mobile-menu-btn {
    background: url("../assets/svg/icon-hamburger.svg");
    width: 1.6rem;
    height: 1.5rem;

    @media (min-width: 1205px) {
      display: none;
    }
  }

  &__mobile-acct-btn {
    background: url("../assets/svg/icon-user.svg");
    width: 2.3rem;
    height: 2rem;
    right: 0;
    visibility: hidden;

    @media (min-width: 768px) {
      position: absolute;
      right: 5rem;
      visibility: visible;
    }
  }

  &__homeLink {
    display: flex;
    margin-left: 6.5rem;

    @media (min-width: 768px) {
      margin-left: 4.2rem;
    }

    @media (min-width: 1205px) {
      margin-left: 0;
    }
  }

  &__desktop-menu {
    margin-left: 33.2rem;
    display: none;

    @media (min-width: 1205px) {
      display: flex;
    }

    &__link {
      a {
        color: white;
        font-weight: 700;
        font-size: 1.3rem;
        line-height: 2.5rem;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
        margin-left: 3.4rem;
        transition: all 0.3s ease;

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          color: rgba(216, 125, 74, 1);
        }
      }
    }
  }

  &__cart-btn {
    background: url("../assets/svg/icon-cart.svg");
    width: 2.3rem;
    height: 2rem;

    @media (min-width: 768px) {
      position: absolute;
      right: 1rem;
    }
  }
  &__user-btn {
    background: url("../assets/svg/icon-user.svg");
    width: 2.3rem;
    height: 2rem;
    right: 0;
    visibility: hidden;

    @media (min-width: 768px) {
      position: absolute;
      right: 5rem;
      visibility: visible;
    }
  }
}
</style>