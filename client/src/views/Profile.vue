<template>
  <div>
    <Header @toggle-menu-show="$emit('toggle-menu-show', $event)" />
    <h1 class="heading">Profile</h1>

    <section class="profile">
      <b-row class="username">
          <b-col>
            <p>Username: </p>
          </b-col>
          <b-col class="data-val">{{currentUser.username}}</b-col>
      </b-row>
      <b-row class="forename">
        <b-col>
          <p>First name: </p>
        </b-col>
        <b-col class="data-val">
          <p>{{currentUser.forename}}</p>
        </b-col>
      </b-row>
      <b-row class="surname">
        <b-col>
          <p>Last name: </p>
        </b-col>
        <b-col class="data-val">
          <p>{{currentUser.surname}}</p>
        </b-col>
      </b-row>
      <b-row class="email">
        <b-col>
          <p>Email: </p>
        </b-col>
        <b-col>
          <p class="data-val">{{currentUser.email}}</p>
        </b-col>
      </b-row>
      <b-row class="password">
        <b-col>
          Password: 
        </b-col>
        <b-col class="data-val">
          <p>*******</p>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import Header from '../components/ProductPage/Header.vue'
import userApi from '@/services/user.js'

export default {
  name: "Profile",
  components: { Header },
  emits: ["toggle-menu-show"],
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    retrieveUser() {
      userApi.getUser(this.$store.getters.userId)
      .then(res => {
        const userRes = res.datat
        this.username = userRes.username
        this.forename = userRes.name
        this.surname = userRes.surname
        this.email = userRes.email
        this.password = userRes.password
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  width: 100%;
  text-align: center;
  margin: 2.4rem auto 0 auto;
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 3.825rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  @media (min-width: 768px) {
  font-size: 3.2rem;
  line-height: 3.6rem;
  letter-spacing: 0.114rem;
  }
}

.profile {
  font-weight: 700;
  font-size: 1rem;
  line-height: 3.825rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: #000;
  padding: 5rem 5rem;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 768px) {
    font-weight: 700;
    font-size: 1.2rem;
    padding: 12rem 23rem;
  }

  @media (min-width: 1205px) {
    font-weight: 700;
    font-size: 1.2rem;
    padding: 15rem 70rem;
  }

}

.data-val {
  color: #7d7d7d;
}
</style>