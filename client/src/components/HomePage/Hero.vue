<template>
  <section class="hero">
    <h1 class="hero__product-name">
      Discover the nuances of every note in our coffee.
    </h1>
    <p class="hero__product-description">
      We believe that knowing the story behind your coffee is a powerful tale
      that needs to be told. From where it was grown, to how it was handled
      along the way, our coffee speaks for itself. 
    </p>
    <router-link
      class="hero__product-link"
      to="/product"
    >
      <button class="hero__product-link__btn default-btn">Explore more</button>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style lang="scss" scoped>
.hero {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10.8rem 2.3rem 11.2rem 2.3rem;
  margin: 0 auto;
  width: 32.7rem;

  @media (min-width: 768px) {
    padding: 12.6rem 19.5rem 16.7rem 19.5rem;
    width: 68.9rem;
  }

  @media (min-width: 1205px) {
    padding: 12.8rem 0 15.8rem 0;
    align-items: flex-start;
    width: 111rem;
  }

  * {
    text-align: center;
  }

  &__product-name {
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4rem;
    letter-spacing: 0.129rem;
    margin: 1.6rem 0 2.4rem 0;
    width: 32.8rem;

    @media (min-width: 768px) {
      text-align: center;
      font-size: 5.6rem;
      line-height: 5.8rem;
      letter-spacing: 0.2rem;
      width: 39.6rem;
    }

    @media (min-width: 1205px) {
      text-align: left;
      width: 60rem;
      margin: 2.4rem 0;
    }
  }

  &__product-description {
    color: #9c9c9c;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.5rem;
    margin-bottom: 2.8rem;
    width: 32.8rem;

    @media (min-width: 1205px) {
      width: 37.9rem;
      margin-bottom: 4rem;
      text-align: left;
    }
  }
}
</style>