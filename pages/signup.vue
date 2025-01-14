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
        <h2>Get Started with Rezume</h2>
        <p>You can customize the module's behavior to get a job.</p>
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
        name="email"
        label="Email"
        rules="[ { required: true, message: 'Please input your Email!' } ]"
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

      <a-form-item
        name="confirmPassword"
        label="Confirm Password"
        rules="[ { required: true, message: 'Please input your confirm password!' } ]"
      >
        <a-input-password
          v-model="form.password"
          placeholder="Enter your password"
        />
      </a-form-item>

      <a-form-item>
        <a-button class="login-button" type="primary" html-type="submit" block>
          Sign Up
        </a-button>
      </a-form-item>

      <section>
        <p>Already have an account? <NuxtLink to="/login">Login</NuxtLink></p>
      </section>
    </a-form>
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
</style>
