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
      @change-quantity="changeQuantity"
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

export default {
  name: "App",
  components: { Footer, Menu, User, Cart },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  watch: {
    
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
      user: []
    };
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    retrieveProducts() {
      try {
        productApi
        .getProducts()
        .then(res => {
          this.allProducts = res.data
          console.log(res.data);
      })
        .catch(err => {
          console.log(err);
        });
      } catch (error) {
        console.log(err);
      }
  },

  retrieveCart() {
    if (this.currentUser) {
      cartApi.getCart(this.currentUser._id)
      .then(res => {
        this.userCart = res.data
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.data);
      })
    }
  },

  async makeCart(exists) {
    await cartApi.createCart(this.currentUser._id, {
          userId: this.currentUser._id,
          products: [{
            productId: exists.productId._id,
            quantity: exists.quantity
          }]
        }).then(res => {
          console.log(res.data);
          this.retrieveCart();
          this.cart.push(exists);
          //this.userCart = res.data._id;
          return res.data;
        }).catch(err => console.log(err));
  },

  updateUserCart() {
    const user = this.currentUser._id;
    const myCart = this.userCart._id;
    try {
      cartApi.updateCart(user, myCart, {
      user: this.user,
      products: this.cart
    })
    .then(res => {
      console.log(res.data);
      this.retrieveCart();
    })
    .catch (err => {
      console.log(err);
    })
    } catch (error) {
      error
    }
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
      if (this.currentUser) {
      console.log(this.currentUser);
      }
      let prodId = data.productId._id;

      // If cart is not empty
      if ( this.cart.length > 0 ) {
        let exists = this.cart.find((product) => product.productId._id === prodId);
        if (exists) {
          exists.quantity += data.quantity;
          console.log("I am adding more");
        } else {
          exists = { ...data, quantity: data.quantity };
          //update cart api
          console.log("item not in cart yet");   
          this.cart.push(exists);
          console.log("I am adding one");
          
        }
        console.log("something in cart");
        console.log(exists); //this works (quantity & productID[])
        // if empty cart
        console.log("cart below");
        const cartss = JSON.parse(JSON.stringify(this.cart))
        console.log(cartss);
        if (this.currentUser) {
          // api update cart
          this.updateUserCart();
        }
      } else {
        // create cart
        // nothing in cart
        let exists = this.cart.find((product) => product.productId._id === prodId);
        exists = { ...data, quantity: data.quantity };
        console.log(exists.productId._id);
        console.log(exists.quantity);
        if (this.currentUser) {
          console.log(this.currentUser._id);
          console.log("making a cart");
          console.log(exists);
          this.makeCart(exists);
          console.log(this.cart);
        } else {
          this.cart.push(exists);
        }
      }
      // store data to cart
      this.storeCart(); 
      console.log(prodId);
    },

    changeQuantity(data) {
      //if product exists within cart
      const index = this.cart.findIndex((product) => product.productId._id === data.productId);
      //if operation subtracts
      console.log("below is data then index");
      
      if (data.operation === "subtract") {
        
        // if qty equals 1
        if (this.cart[index].quantity === 1) {
          if (this.cart[0]) {
            this.emptyCart();
          }
          // return cart with only the productID that does not match the current index's productId
          this.cart = this.cart
            .slice()
            .filter((product) => product.productId._id !== data.productId);
        } else {
          this.cart[index] = {
            ...this.cart[index],
            quantity: this.cart[index].quantity - 1,
          };
          this.$forceUpdate();
          console.log("subtracting");
        }
      } else if (data.operation === "add") {
        
        this.cart[index] = {
          ...this.cart[index],
          quantity: this.cart[index].quantity + 1,
        };
        this.$forceUpdate();
        console.log("adding");
        console.log(this.cart[index].quantity);
        console.log(this.cart)
      }
        console.log(this.cart[index].quantity);
      this.storeCart();
      //api update cart
      if (this.currentUser) {
        // api update cart
        try {
          this.updateUserCart();
        } catch (error) {
          console.log(error);
        }
          
      }
    },
    emptyCart() {
      this.cart = [];
      this.storeCart();
      if (this.currentUser) {
        //api delete cart
        console.log("userId");
        console.log(this.currentUser._id);
        console.log("cartId");
        if (this.userCart) {
          console.log(this.userCart);
          console.log(JSON.parse(JSON.stringify(this.userCart._id)));
          cartApi.deleteCart(this.currentUser._id, this.userCart._id);
        } else {
          console.log("Nothing to delete");
        }
      }
    },
  },
  created() {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
    this.retrieveProducts();
    this.retrieveCart();
    //this.cart = [];
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.retrieveProducts();
    this.retrieveCart();
    //this.cart = [];
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