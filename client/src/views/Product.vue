<template>
  <div>
    <Header @toggle-menu-show="$emit('toggle-menu-show', $event)" />
    <main>
    <p class="back-link" @click="$router.back()">Go back</p>
    <section class="overview">
      <img :src="currentProduct.img" :alt="currentProduct.title" class="overview__image" />
      <div class="overview__text">
        <h2 class="overview__text__title">{{ currentProduct.title }}</h2>
        <p class="overview__text__description">
          {{ currentProduct.subtitle }}
        </p>
        <p class="overview__text__description">
          <span class="spans">Geography: </span>
          <span class="geo">{{ currentProduct.geography }}</span>
        </p>
        <p class="overview__text__price">{{ currentProduct.price }},00 kr.</p>
        <div class="overview__text__btn-section">
          <div class="overview__text__btn-section__number">
            <button
              class="overview__text__btn-section__number__less"
              @click="decreaseTotal"
            >
              -
            </button>
            <p class="overview__text__btn-section__number__value">
              {{ total }}
            </p>
            <button
              class="overview__text__btn-section__number__more"
              @click="increaseTotal"
            >
              +
            </button>
          </div>
          <button
            :class="[
              'overview__text__btn-section__btn',
              'default-btn',
              justAdded ? 'just-added' : '',
            ]"
            @click="addToCartHandler(currentProduct)"
          >
            {{ justAdded ? "Added to cart" : "Add to cart" }}
          </button>
        </div>
      </div>
    </section>
    <section class="details">
      <div class="details__features">
        <p class="overview__text__description"
        >
          {{ currentProduct.desc}}
        </p>
      </div>
    </section>
  </main>

  </div>
  
</template>

<script>
import Header from "../components/ProductPage/Header.vue";
import { productApi } from "@/services/product.js"

export default {
  name: "ProductPage",
  components: { Header },
  emits: ["toggle-menu-show", "add-to-cart"],
  data() {
    return {
      total: 1,
      product: [],
      currentProduct: [],
      windowSize: null,
      justAdded: false,
    };
  },
  methods: {
    retrieveProduct() {
      productApi
      .getProduct(this.$route.params.id)
      .then(res => {
        this.currentProduct = res.data
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    },
    increaseTotal() {
      this.total++;
    },
    decreaseTotal() {
      if (this.total > 1) {
        this.total--;
      }
    },
    addToCartHandler(currentItem) {
      this.justAdded = true;
      const data = {
        productId: currentItem,
        quantity: this.total,
      };
      this.$emit("add-to-cart", data);
    },

    resetTotal() {
      this.total = 1;
      this.justAdded = false;
    },
    setWindowSize() {
      let windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        this.windowSize = "mobile";
      } else if (windowWidth < 1205) {
        this.windowSize = "tablet";
      } else {
        this.windowSize = "desktop";
      }
    },
  },
  created() {
    this.retrieveProduct();
    this.setWindowSize();
    window.addEventListener("resize", this.setWindowSize);
    window.scrollTo(0, 0);
  },
  mounted() {
    this.retrieveProduct();
  },
  computed: {
    editSrc() {
        return require(`${this.currentProduct.img}`);
    },
    currentAdmin() {
      return this.$store.state.auth.user;
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 32.7rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 68.9rem;
  }

  @media (min-width: 1205px) {
    width: 111rem;
  }
}

.back-link {
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-weight: 500;
  color: #7d7d7d;
  margin: 1.6rem 0 2.4rem 0;
  display: block;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(216, 125, 74, 1);
  }

  @media (min-width: 768px) {
    margin-top: 3.3rem;
  }

  @media (min-width: 1205px) {
    margin-top: 7.9rem;
  }
}

.overview {
  margin: 2.4rem auto 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1205px) {
    margin-top: 5.6rem;
  }

  & * {
    text-align: left;
  }

  &__image {
    width: 100%;
    border-radius: 0.8rem;
    object-fit: cover;
    object-position: center;

    @media (min-width: 768px) {
      height: 48rem;
      width: 28.1rem;
    }

    @media (min-width: 1205px) {
      width: 54rem;
      height: 56rem;
    }
  }

  &__text {
    margin-top: 3.2rem;

    @media (min-width: 768px) {
      width: 33.95rem;
      margin-top: 0;
      margin-left: 6.9rem;
    }

    @media (min-width: 1205px) {
      margin: 0;
      margin-left: 12.5rem;
      width: 44.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      * {
        text-align: left;
      }
    }

    &__tag {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.912rem;
      letter-spacing: 1rem;
      text-transform: uppercase;
      color: rgba(216, 125, 74, 1);
    }

    &__title {
      margin: 2.4rem 0;
      font-weight: 700;
      font-size: 2.8rem;
      line-height: 3.825rem;
      letter-spacing: 0.1rem;
      text-transform: uppercase;

      @media (min-width: 768px) {
        font-size: 4rem;
        line-height: 4.4rem;
        letter-spacing: 0.143rem;
      }
    }

    &__description {
      margin-bottom: 2.4rem;
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 2.5rem;
      color: #8d8d8d;
    }

    

    &__price {
      font-weight: 700;
      font-size: 1.8rem;
      line-height: 2.459rem;
      letter-spacing: 0.129rem;
      margin-bottom: 3.1rem;
    }

    &__btn-section {
      display: flex;
      align-items: center;

      &__number {
        display: flex;
        align-items: center;
        background: #f1f1f1;
        padding: 1.5rem;
        width: 12rem;
        justify-content: space-between;
        margin-right: 1.6rem;

        & * {
          background: none;
          border: none;
          font-weight: 700;
          font-size: 1.3rem;
          line-height: 1.776rem;
          letter-spacing: 0.1rem;
        }

        & button {
          color: #b5b5b5;
          transition: all 0.3s ease;

          &:hover {
            color: rgba(216, 125, 74, 1);
          }
        }
      }
    }
  }
}

.details {
  margin: 8.8rem auto 11.3rem auto;
  width: 100%;

  @media (min-width: 1205px) {
    display: flex;
    align-items: flex-start;
  }

  h3 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3.6rem;
    letter-spacing: 0.086rem;

    @media (min-width: 768px) {
      font-size: 3.2rem;
      letter-spacing: 0.114rem;
    }
  }

  &__features {
    @media (min-width: 1205px) {
      width: 100rem;
    }
    &__text {
      margin-top: 2.4rem;
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 2.5rem;
      color: #7d7d7d;

      @media (min-width: 1205px) {
        margin-top: 3.2rem;
      }
    }
  }

  &__box {
    margin-top: 11.3rem;

    @media (min-width: 768px) {
      display: flex;
      align-items: flex-start;
    }

    @media (min-width: 1205px) {
      width: 35rem;
      margin: 0;
      margin-left: 12.5rem;
      display: block;
    }

    &__heading {
      width: 35rem;
    }

    &__list {
      margin-top: 2.4rem;

      @media (min-width: 768px) {
        margin-top: 0;
      }

      @media (min-width: 1205px) {
        margin-top: 3.2rem;
      }

      * {
        font-size: 1.5rem;
        line-height: 2.5rem;
      }

      &__item {
        display: flex;
        align-items: center;

        &__quantity {
          font-weight: 700;
          color: rgba(216, 125, 74, 1);
        }

        &__name {
          font-weight: 500;
          margin-left: 2.1rem;
          color: #7d7d7d;
          text-transform: capitalize;
        }
      }
    }
  }
}

.gallery {
  @media (min-width: 768px) {
    display: flex;
  }

  img {
    width: 100%;
    border-radius: 0.8rem;
    margin: 1rem 0;
    object-fit: cover;
    object-position: center;

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  &__left {
    @media (min-width: 768px) {
      width: 27.7rem;
    }

    @media (min-width: 1205px) {
      width: 44.5rem;
    }

    img {
      height: 17.4rem;

      @media (min-width: 1205px) {
        height: 28rem;
      }
    }

    &__first {
      margin-top: 0 !important;

      @media (min-width: 768px) {
        margin-bottom: 2rem !important;
      }

      @media (min-width: 1205px) {
        margin-bottom: 3.2rem !important;
      }
    }
  }

  &__right {
    img {
      margin-bottom: 0 !important;
      height: 36.8rem;

      @media (min-width: 768px) {
        width: 39.5rem;
        margin-left: 1.8rem;
      }

      @media (min-width: 1205px) {
        width: 64.5rem;
        height: 59.2rem;
        margin-left: 3rem;
      }
    }
  }
}

.others {
  margin-top: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: calc(12rem - 5.2rem);

  &__heading {
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3.6rem;
    letter-spacing: 0.086rem;
    margin-bottom: 4rem;

    @media (min-width: 768px) {
      font-size: 3.2rem;
      line-height: 3.6rem;
      letter-spacing: 0.114rem;
      margin-bottom: 5.6rem;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }
  }
}

.spans {
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
}
.geo {
  text-transform: uppercase;
}

.just-added {
  background: #f6af85;
}
</style>