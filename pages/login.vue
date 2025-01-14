<template>
  <div class="login-form">
    <section>
      <NuxtLink to="/">
        <NuxtImg
          width="56px"
          src="https://img.freepik.com/free-vector/abstract-blue-flower-design_1142-206807.jpg"
          format="webp"
          alt="Nuxtcipes Logo"
        />
      </NuxtLink>

      <div class="login-title">
        <h2>Welcome to Rezume</h2>
        <p>You can customize the module's behavior.</p>
      </div>
    </section>

    <a-form :layout="'vertical'" @submit.prevent="handleSubmit">
      <a-form-item
        name="username"
        label="Username"
        rules="[ { required: true, message: 'Please input your username!' } ]"
      >
        <a-input v-model="form.username" placeholder="Enter your username" />
      </a-form-item>

      <a-form-item
        name="password"
        label="Password"
        rules="[ { required: true, message: 'Please input your password!' } ]"
      >
        <a-input-password
          v-model="form.password"
          placeholder="Enter your password"
        />
      </a-form-item>

      <a-form-item>
        <a-button class="login-button" type="primary" html-type="submit" block>
          Login
        </a-button>
      </a-form-item>
    </a-form>

    <section class="ask-signup">
      <p>Don't have an account? <NuxtLink class="signup-link" to="/signup">Sign Up</NuxtLink></p>
    </section>
  </div>
</template>

<script>
definePageMeta({
  layout: "auth",
});

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted:", this.form);
      // Add login logic here (e.g., API call)
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 2rem;
}
.login-button {
  background-color: #41bbff;
}
.login-title {
  margin-bottom: 24px;
  margin-top: 12px;
}
.login-title h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}
.login-title p {
  margin: 0;
  font-size: 14px;
  color: var(--sub-text-color);
}
.ask-signup {
  font-size: 14px;
  color: var(--secondary-text-color);
}
.ask-signup .signup-link {
  color: var(--primary-color);
  text-decoration: none;
}
</style>
