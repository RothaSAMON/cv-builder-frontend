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
      <div class="flex-form-group">
        <!-- First Name -->
        <InputForm label="First Name" ref="firstName" required />

        <!-- Last Name -->
        <InputForm label="Last Name" ref="lastName" required />
      </div>

      <div class="flex-form-group">
        <!-- Gender -->
        <a-form-item label="Gender" required>
          <a-select v-model="form.gender" placeholder="Select your gender">
            <a-select-option value="male">Male</a-select-option>
            <a-select-option value="female">Female</a-select-option>
          </a-select>
        </a-form-item>

        <!-- Date of Birth -->
        <DatePickerForm
          label="Date of Birth"
          required
          :rules="[
            { required: true, message: 'Please select your date of birth!' },
          ]"
        />
      </div>

      <!-- Email -->
      <InputForm label="Email" ref="email" required />

      <!-- Password -->
      <InputForm label="Password" ref="password" type="password" required />

      <!-- Confirm Password -->
      <InputForm
        label="Confirm Password"
        ref="confirmPassword"
        type="password"
        required
      />

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
        gender: "",
        dob: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      const formData = {
        firstName: this.$refs.firstName?.value,
        lastName: this.$refs.lastName?.value,
        email: this.$refs.email?.value,
        password: this.$refs.password?.value,
        confirmPassword: this.$refs.confirmPassword?.value,
        gender: this.form.gender,
        dob: this.form.dob,
      };

      console.log("Form submitted:", formData);

      // Add your sign-up logic here (e.g., API call)
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
