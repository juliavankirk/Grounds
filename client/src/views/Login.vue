<template>
<div>

  <main class="login">
    <form class="login__form" @submit.prevent="submitHandler" novalidate>
      <div class="login__form__input">
        <h1 class="login__form__input__heading">Login</h1>
        <h2 class="clogin__form__input__subheading">Please enter your username and password to sign in.</h2>
        <section>
          <div class="login__form__input__item no-margin full-span">
            <div class="input-texts">
              <label
                for="username"
                :class="emptyFields.includes('name') ? 'red-label' : ''"
                >Username</label
              >
              <p class="empty-message" v-if="emptyFields.includes('name')">
                Field can't be empty
              </p>
            </div>
            <input
              type="text"
              name="name"
              id="name"
              ref="name"
              :class="emptyFields.includes('name') ? 'empty-border' : ''"
              @click="wipeError('name')"
              @change="wipeError('name')"
              spellcheck="false"
            />
          </div>
          
          <div class="login__form__input__item no-margin full-span">
            <div class="input-texts">
              <label
                for="password"
                :class="emptyFields.includes('password') ? 'red-label' : ''"
                >Password</label
              >
              <p class="empty-message" v-if="emptyFields.includes('password')">
                Field can't be empty
              </p>
            </div>

            <input
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
      </div>
    </form>
  </main>
</div>
</template>

<script>

export default {
  name: "Login",
  emits: ["toggle-menu-show"],

  methods: {

    selectMethod(method) {
      this.picked = method;
    },
    submitHandler() {
      const myRefs = [
        this.$refs.username,
        this.$refs.password,
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
  },
};
</script>

<style lang="scss" scoped>
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

.login {
  background: #fafafa;
  width: 100%;

  &__form {
    background: transparent;

    @media (min-width: 1205px) {
      display: flex;
      width: 111rem;
      margin: 0 auto;
      margin-top: 3.7rem;
      margin-bottom: 14.1rem;
    }

    &__input{
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
</style>