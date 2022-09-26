<template>
  <div class="category">
    <img
      v-if="product === 'coffee'"
      src="../assets/img/cat-thumbnail-coffee.png"
      alt="coffee"
      class="category__thumbnail"
      id="coffee"
    />
    <img
      v-if="product === 'brewer'"
      src="../assets/img/cat-thumbnail-brewer.png"
      alt="brewer"
      class="category__thumbnail"
      id="brewer"
    />
    <img
      v-if="product === 'mug'"
      src="../assets/img/cat-thumbnail-mug.png"
      alt="mug"
      class="category__thumbnail"
      id="mug"
    />
    <h2 class="category__name">{{ product }}</h2>
    <router-link
      class="category__link"
      @click="$emit('toggle-menu-show', 'menu')"
      :to="{ name: 'CategoryPage', params: { category: `${product}` } }"
    >
      Shop
      <img
        src="../assets/svg/icon-arrow-right.svg"
        class="category__link__icon"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    product: String,
    show: Boolean,
  },
  emits: ["toggle-menu-show"],
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f1f1;
  margin: 0 auto 6.8rem auto;
  border-radius: 0.8rem;
  width: 32.7rem;

  @media (min-width: 768px) {
    margin: 0;
    margin-right: 1rem;
    width: 22.3rem;

    &:last-child {
      margin-right: 0;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  & #brewer {
    top: -4.6rem;
  }

  & #mug {
    top: -4rem;
  }

  &__thumbnail {
    width: 15rem;
    position: relative;
    top: -5.2rem;
    margin-bottom: -5.2rem;

    @media (min-width: 1205px) {
      width: 17rem;
    }
  }

  &__name {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.049rem;
    letter-spacing: 0.107rem;

    @media (min-width: 1205px) {
      font-size: 1.8rem;
      line-height: 2.459rem;
      letter-spacing: 0.129rem;
    }
  }

  &__link {
    margin-top: 1.7rem;
    margin-bottom: 2.2rem;
    color: #797979;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.776rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
      color: #d87d4a;
    }

    &__icon {
      margin-left: 1.332rem;
    }
  }
}
</style>