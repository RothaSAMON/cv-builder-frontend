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

    <!-- Form Section using Vee Validate and Zod -->
    <a-form layout="vertical" @submit.prevent="onSubmit">
      <!-- Username -->
      <InputForm name="email" placeholder="example@gmail.com" label="Email" />

      <!-- Password -->
      <InputForm
        name="password"
        placeholder="Password"
        label="Password"
        type="password"
      />

      <!-- Submit Button -->
      <a-form-item>
        <a-button class="login-button" type="primary" html-type="submit" block>
          Login
        </a-button>
      </a-form-item>
    </a-form>

    <section class="ask-signup">
      <p>
        Don't have an account?
        <NuxtLink class="signup-link" to="/signup">Sign Up</NuxtLink>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { useAlertStore } from "~/store/alertStore";

// Initialize Vee Validate with the schema
const { handleSubmit } = useForm({
  validationSchema: toFieldValidator(loginSchema),
});

const { loginMutation } = useAuth();

const alertStore = useAlertStore();

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  // Add login logic (e.g., API call)
  try {
    const result = await loginMutation.mutateAsync({
      email: values.email,
      password: values.password,
    });

    if (result) {
      alertStore.showAlert({
        message: result.message,
        type: "success",
        duration: 5000,
      });
      navigateTo("/dashboard");
    }
  } catch (error: any) {
    alertStore.showAlert({
      message: error.response.data.message,
      type: "error",
      duration: 5000,
    });
  }
});

// Page metadata
definePageMeta({
  layout: "auth",
});
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
