<template>
<div>
  <Header @toggle-menu-show="$emit('toggle-menu-show', $event)" />
  <main class="register">
    <form class="register__form" @submit.prevent="submitHandler" novalidate>
      <div class="register__form__input" v-if="!successful">
        <h1 class="register__form__input__heading">Register your account</h1>
        <h2 class="register__form__input__subheading">Welcome to grounds!</h2>
        <section>
          <div class="register__form__input__item no-margin full-span">
            <div class="input-texts">
              <label
                for="username"
                :class="emptyFields.includes('username') ? 'red-label' : ''"
                >Username</label
              >
              <p class="empty-message" v-if="emptyFields.includes('username')">
                Username is required!
              </p>
            </div>
            <input
              v-model="user.username"
              v-validate="'required'"
              type="text"
              name="username"
              id="username"
              ref="username"
              :class="emptyFields.includes('username') ? 'empty-border' : ''"
              @click="wipeError('username')"
              @change="wipeError('username')"
              spellcheck="false"
            />
          </div>
          <div class="register__form__input__item no-margin">
            <div class="input-texts">
              <label
                for="forename"
                :class="emptyFields.includes('forename') ? 'red-label' : ''"
                >First name</label
              >
              <p class="empty-message" v-if="emptyFields.includes('forename')">
                First name is required!
              </p>
            </div>
            <input
              v-model="user.forename"
              v-validate="'required'"
              type="text"
              name="forename"
              id="forename"
              ref="forename"
              :class="emptyFields.includes('forename') ? 'empty-border' : ''"
              @click="wipeError('forename')"
              @change="wipeError('forename')"
              spellcheck="false"
            />
          </div>

          <div class="register__form__input__item no-margin">
            <div class="input-texts">
              <label
                for="surname"
                :class="emptyFields.includes('surname') ? 'red-label' : ''"
                >Last name</label
              >
              <p class="empty-message" v-if="emptyFields.includes('surname')">
                Last name is required!
              </p>
            </div>
            <input
              v-model="user.surname"
              v-validate="'required'"
              type="text"
              name="surname"
              id="surname"
              ref="surname"
              :class="emptyFields.includes('surname') ? 'empty-border' : ''"
              @click="wipeError('surname')"
              @change="wipeError('surname')"
              spellcheck="false"
            />
          </div>

           <div class="register__form__input__item no-margin full-span">
            <div class="input-texts">
              <label
                for="email"
                :class="emptyFields.includes('email') ? 'red-label' : ''"
                >Email address</label
              >
              <p class="empty-message" v-if="emptyFields.includes('email')">
                Email is required!
              </p>
              <p class="empty-message" v-if="invalidEmail">
                Invalid email address
              </p>
            </div>

            <input
              v-model="user.email"
              v-validate="'required'"
              type="email"
              name="email"
              id="email"
              ref="email"
              :class="emptyFields.includes('email') ? 'empty-border' : ''"
              @click="wipeError('email')"
              @change="wipeError('email')"
            />
          </div>
          
          <div class="register__form__input__item no-margin full-span">
            <div class="input-texts">
              <label
                for="password"
                :class="emptyFields.includes('password') ? 'red-label' : ''"
                >Password</label
              >
              <p class="empty-message" v-if="emptyFields.includes('password')">
                Password is required!
              </p>
            </div>

            <input
              v-model="user.password"
              v-validate="'required'"
              type="password"
              name="password"
              id="password"
              ref="password"
              :class="emptyFields.includes('password') ? 'empty-border' : ''"
              @click="wipeError('password')"
              @change="wipeError('password')"
            />
          </div>
          
        </section>
        <h2 class="register__form__input__black">Have an account?
          <span class="register__form__input__subheading">
            <router-link to="/login">Sign in</router-link>
          </span>
        </h2>
        <input
          type="submit"
          :value="'Register'"
          class="btn default-btn"
        />
      </div>
    </form>
    <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
  </main>
</div>
</template>

<script>
import Header from '../components/ProductPage/Header.vue'
import User from '../models/user'

export default {
  name: "Register",
  components: { Header },
  emits: ["toggle-menu-show"],
  data: () => ({
    user: new User('', '', '', '', ''),
    emptyFields: [],
    invalidEmail: false,
    submitted: false,
    successful: false,
    message: ''
    }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    selectMethod(method) {
      this.picked = method;
    },
    submitHandler() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
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
      if (this.invalidEmail) {
        this.invalidEmail = false;
      }
    },
    validateEmail() {
      const email = this.$refs.email.value;
      const validationResult = email
        .toLowerCase()
        .match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
      if (!validationResult && !this.emptyFields.includes("email")) {
        this.invalidEmail = true;
      }
    },
  }
}

</script>

<style lang="scss" scoped>
* input[type="number"]::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}
.back-link {
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-weight: 500;
  color: #7d7d7d;
  margin: 1.6rem auto 2.4rem auto;
  display: block;
  cursor: pointer;
  width: 32.7rem;
  transition: all 0.3s ease;
  &:hover {
    color: rgba(216, 125, 74, 1);
  }
  @media (min-width: 768px) {
    width: 68.9rem;
    margin-top: 3.3rem;
  }
  @media (min-width: 1205px) {
    margin-top: 7.9rem;
    width: 111rem;
    padding-left: 1rem;
  }
}
.empty-border {
  border: 0.2rem solid #ce382c !important;
}
.register {
  background: #fafafa;
  width: 100%;
  &__form {
    background: transparent;
    @media (min-width: 1205px) {
      display: flex;
      width: 111rem;
      margin: 0 auto;
    }
    &__input,
    &__summary {
      background: white;
    }
    section {
      @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
      }

      .no-margin {
        @media (min-width: 768px) {
          margin-right: 0 !important;
        }
      }

      .full-span {
        input {
          @media (min-width: 768px) {
            width: 63.4rem !important;
          }
        }
      }

    }
    &__input {
      width: 32.7rem;
      margin: 2.4rem auto 0 auto;
      padding: 2.4rem 2.4rem 3.1rem 2.4rem;
      border-radius: 0.8rem;
      @media (min-width: 768px) {
        width: 68.9rem;
        padding: 3rem 2.7rem;
      }
      @media (min-width: 1205px) {
        margin: 0;
      }
      &__heading {
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
      &__subheading {
        margin-top: 3.2rem;
        text-transform: uppercase;
        font-size: 1.3rem;
        font-weight: 700;
        line-height: 2.5rem;
        letter-spacing: 0.093rem;
        color: rgba(216, 125, 74, 1);
        margin-bottom: 1.6rem;
        @media (min-width: 768px) {
          margin-top: 4.1rem;
        }
      }
      &__black {
        margin-top: 3.2rem;
        text-transform: uppercase;
        font-size: 1.3rem;
        font-weight: 700;
        line-height: 2.5rem;
        letter-spacing: 0.093rem;
        color: #000;
        margin-bottom: 1.6rem;
        @media (min-width: 768px) {
          margin-top: 4.1rem;
        }
      }
      &__item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 2.4rem;
        &:first-child {
          margin-top: 0;
        }
        @media (min-width: 768px) {
          margin: 0;
          margin-bottom: 2.4rem;
          margin-right: 1.6rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .input-texts {
          display: flex;
          align-items: center;
          width: 28rem;
          justify-content: space-between;
          margin-bottom: 0.9rem;
          @media (min-width: 768px) {
            width: 30.9rem;
          }
          .red-label {
            color: rgba(205, 44, 44, 1) !important;
          }
          .empty-message {
            text-align: right;
            font-weight: 500;
            font-size: 1.2rem;
            line-height: 1.639rem;
            letter-spacing: -0.021rem;
            color: rgba(205, 44, 44, 1);
          }
        }
        label,
        .label {
          font-weight: 700;
          font-size: 1.2rem;
          line-height: 1.639rem;
          letter-spacing: -0.021rem;
          text-transform: capitalize;
        }
        input {
          width: 28rem;
          height: 5.6rem;
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1.912rem;
          letter-spacing: -0.025rem;
          padding-left: 2.4rem;
          border-radius: 0.8rem;
          color: #999999;
          border: 0.1rem solid #d5d5d5;
          caret-color: #dd8d61;
          transition: all 0.3s ease;
          &:hover {
            border-color: #dd8d61;
          }
          @media (min-width: 768px) {
            width: 30.9rem;
          }
          &:focus {
            outline: none;
            border-color: #dd8d61;
          }
        }
        .orange-border {
          border-color: rgba(216, 125, 74, 1) !important;
        }
        .no-capitalize {
          text-transform: none;
        }
      }
    }
  }
}
a:visited {
text-decoration: none;
color: #dd8d61;
}
</style>