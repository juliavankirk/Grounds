<template>
<div>
  <Header @toggle-menu-show="$emit('toggle-menu-show', $event)" />

</div>
  
</template>

<script>
import Header from '../components/ProductPage/Header.vue';


export default {
  name: "Item",
  components: { Header },
  emits: ["toggle-menu-show"],
  data: () => ({
    product: new Product('', '', '', '', '', '', '', '', ''),
    emptyFields: [],
    submitted: false,
    successful: false,
    message: ''
  }),
  computed: {
    currentAdmin() {
      return this.$store.state.auth.user
    }
  },
  retrieveProduct() {
    productApi.
    getProduct(this.$route.params.id)
    .then(res => {
      this.currentProduct = res.data
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },
  selectMethod(method) {
      this.picked = method;
    },
  deleteItem() {
    const id = this.$route.params.id
    console.log(id);

    if (id) {
      productApi.deleteProduct(id)
      .then(res => {
        this.message = res.message
        console.log(res.data);
      })
      .catch(err => console.log(err));
    }
  },
  submitHandler() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          userApi.updateUser(this.$store.state.auth.user._id, this.user)
          .then(res => {
            this.message = res.message
            this.successful = true
            console.log(res.data);
            this.message = "Profile successfully updated!";
          })
          .catch (err => {
            console.log(err);
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
          });
        }
      });

      const myRefs = [
        this.$refs.username,
        this.$refs.forename,
        this.$refs.surname,
        this.$refs.email,
        this.$refs.password
      ];
      myRefs.map((ref) => {
        if (ref.value === "") {
          this.emptyFields.push(ref.name);
        }
      });
    },
    wipeError(field) {
      if (this.emptyFields.includes(field)) {
        this.emptyFields = this.emptyFields.filter((ref) => ref !== field);
      }
    },
};
</script>

<style lang="sass" scoped>

</style>