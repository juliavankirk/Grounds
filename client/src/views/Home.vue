<template>
  <div>
    <b-jumbotron class="hero">
      <template #header>
        Discover the nuances of every note in our coffee.
        <br/>
        Enjoy our selected kit. One cup at a time.
      </template>
      <template #lead>
        We believe that knowing the story behind your coffee is a powerful tale
        that needs to be told. From where it was grown, to how it was handled
        along the way, our coffee speaks for itself. 
      </template>
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Buy For 499:-</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import { breakpoints } from '../MediaQueries'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.hero {
  color: #fff;
  background: #000;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  align-items:center;

  @media (min-width: breakpoints.tabletMin) {
    flex-direction: row;
  }
}
header {

}
.btn_message {
  margin-bottom: 1em;
  color: #000;
  background: #fff;
}
</style>
