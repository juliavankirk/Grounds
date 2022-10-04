<template>
<div>
  <Menu
    :show="showMenu"
    :scrollTop="scrollTop"
    @toggle-menu-show="toggleMenu"
    ref="mobileMenu"
  />
  <User
    :show="showUser"
    :scrollTop="scrollTop"
    @toggle-menu-show="toggleMenu"
    ref="mobileUser"
  />
  
  <Cart
    :show="showCart"
    :cart="cart"
    @change-quantity="changeQuantity"
    @empty-cart="emptyCart"
    @toggle-menu-show="toggleMenu"
  />
  <div
    :class="[
      'wrapper',
      showMenu || showCart || showConfirmation ? 'stop-scroll' : '',
    ]"
  >
    <router-view
      @toggle-menu-show="toggleMenu"
      @add-to-cart="addToCart"
      @empty-cart="emptyCart"
      :cart="cart"
      :showConfirmation="showConfirmation"
    />
    <Footer />
  </div>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import User from "./components/User.vue"
import Cart from "./components/Cart.vue";
import { productApi } from "@/services/product.js"
import { cartApi } from "@/services/cart.js"
import data from "./data.json";

export default {
  name: "App",
  components: { Footer, Menu, User, Cart },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  data() {
    return {
      showMenu: false,
      showUser: false,
      showCart: false,
      showConfirmation: false,
      scrollTop: false,
      cart: [],
      product: [],
      userCart: [],
    };
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    retrieveProducts() {
      productApi
        .getProducts()
        .then(res => {
          this.allProducts = res.data
          console.log(res.data);
      })
        .catch(err => {
          console.log(err);
        });
  },


    toggleMenu(myVar) {
      if (myVar === "logo") {
        this.showMenu = false;
        this.showCart = false;
      } else if (myVar === "menu") {
        this.showMenu = !this.showMenu;
      } else if (myVar === "user") {
        this.showUser = !this.showUser;
      } else if (myVar === "cart") {
        this.showCart = !this.showCart;
      } else if (myVar === "confirmation") {
        this.showConfirmation = !this.showConfirmation;
      }
      this.scrollTop = !this.scrollTop;
    },
    storeCart() {
      //api get cart
      localStorage.setItem("cart", JSON.stringify(this.cart));
      
    },

    addToCart(data) {
      console.log(data);
      console.log(this.currentUser._id);
      let prodId = data.productId._id;

      // If cart is not empty
      if ( this.cart.length > 0 ) {
        let exists = this.cart.find((product) => product.productId._id === prodId);
        if (exists) {
          exists.addedQuantity += data.addedQuantity;
          console.log("I am adding more");
        } else {
          exists = { ...data, addedQuantity: data.addedQuantity };
          //update cart api
          console.log("item not in cart yet");   
          this.cart.push(exists);
          console.log("I am adding one");
          
        }
        console.log("something in cart");
        console.log(exists); //this works (addedQuantity & productID[])
        // if empty cart
      } else {
        // create cart
        // nothing in cart
        let exists = this.cart.find((product) => product.productId._id === prodId);
        exists = { ...data, addedQuantity: data.addedQuantity };
        console.log(exists.productId._id);
        console.log(exists.addedQuantity);
        console.log(this.currentUser._id);
        // api create cart
        cartApi.createCart(this.currentUser._id, {
          userId: this.currentUser._id,
          products: [{
            productId: exists.productId._id,
            quantity: exists.addedQuantity
          }]

        })
        .then(res => {
          console.log(res.data);
          this.cart.push(exists);
          return res.data;
        }).catch(err => console.log(err));
        console.log("nothing in cart");
        console.log(exists); //this works (addedQuantity & productID[])
        //
      }
      // store data to cart
      console.log(this.currentUser._id);
      this.storeCart(); 
    },



    changeQuantity(data) {
      //if product exists within cart
      const index = this.cart.findIndex((prod) => prod.productId._id === data.productId);
      //if operation subtracts
      if (data.operation === "subtract") {
        // if qty equals 1
        if (this.cart[index].addedQuantity === 1) {
          // return cart with only the productID that does not match the current index's productId
          this.cart = this.cart
            .slice()
            .filter((prod) => prod.productId._id !== data.productId);
        } else {
          this.cart[index] = {
            ...this.cart[index],
            addedQuantity: this.cart[index].addedQuantity - 1,
          };
        }
      } else if (data.operation === "add") {
        this.cart[index] = {
          ...this.cart[index],
          addedQuantity: this.cart[index].addedQuantity + 1,
        };
      }
      this.storeCart();
      //api update cart
    },
    emptyCart() {
      this.cart = [];
      this.storeCart();
      //api delete cart
    },
  },
  created() {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
    this.retrieveProducts();

  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.retrieveProducts();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Manrope", sans-serif;
}

html {
  font-size: 62.5%;
}

body {
  &::-webkit-scrollbar {
    width: 0.7rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #d87d4a;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #f6af85;
  }
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
}

.default-btn {
  background: #d87d4a;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.776rem;
  letter-spacing: 0.1rem;
  border: none;
  padding: 1.5rem 3rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f6af85;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.stop-scroll {
  max-height: calc(100vh - 9.1rem);
  overflow: hidden;
}
</style>