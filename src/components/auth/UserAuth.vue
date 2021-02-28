<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button mode="flat" type="button" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonCaption() {
      return this.mode === "login" ? "Signup" : "Login";
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        this.isLoading = true;
        if (this.mode === "login") {
          await this.$store.dispatch("login", payload);
        } else {
          await this.$store.dispatch("signup", payload);
        }
      } catch (error) {
        this.error = error.message || "Failed to authenticate, try later.";
      }
      this.isLoading = false;
      const redirectTo = '/' + (this.$route.query.redirect || 'coaches');
      this.$router.replace(redirectTo)
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>