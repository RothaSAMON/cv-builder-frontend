<template>
  <div class="login-form">
    <CustomAlert
      v-if="alertStore.isVisible"
      :type="alertStore.type"
      :message="alertStore.message"
    />

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

    <!-- Form Section -->
    <a-form layout="vertical" @submit.prevent="onSubmit">
      <div class="flex-form-group">
        <!-- First Name -->
        <InputForm
          name="firstName"
          placeholder="First Name"
          label="First Name"
        />
        <!-- Last Name -->
        <InputForm name="lastName" placeholder="Last Name" label="Last Name" />
      </div>

      <div class="flex-form-group">
        <!-- Gender -->
        <a-form-item
          class="w-full"
          label="Gender"
          :validate-status="genderError ? 'error' : ''"
          :help="genderError"
        >
          <a-select v-model:value="gender" placeholder="Select your gender">
            <a-select-option value="Male">Male</a-select-option>
            <a-select-option value="Female">Female</a-select-option>
          </a-select>
        </a-form-item>

        <!-- Date of Birth -->
        <DatePickerForm
          name="dateOfBirth"
          label="Date of Birth"
          placeholder="Select your date of birth"
        />
      </div>

      <!-- Email -->
      <InputForm name="email" placeholder="example@gmail.com" label="Email" />
      <!-- Password -->
      <InputForm
        name="password"
        placeholder="Password"
        label="Password"
        type="password"
      />
      <!-- Confirm Password -->
      <InputForm
        name="confirmPassword"
        placeholder="Confirm Password"
        label="Confirm Password"
        type="password"
      />

      <!-- Submit Button -->
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

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import InputForm from "@/components/InputForm.vue";
import DatePickerForm from "@/components/DatePickerForm.vue";
import { useAlertStore } from "~/store/alertStore";

const { signupMutation } = useAuth();
const alertStore = useAlertStore();

// Initialize the form
const { handleSubmit, errors } = useForm({
  validationSchema: toFieldValidator(signUpSchema),
});

// Use field for gender since it's not directly tied to an <InputForm>
const { value: gender, errorMessage: genderError } = useField("gender");

// Handle form submission
const onSubmit = handleSubmit(async (formValues) => {
  try {
    const result = await signupMutation.mutateAsync({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      dateOfBirth: formValues.dateOfBirth,
      gender: formValues.gender,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    });
    if (result) {
      alertStore.showAlert({
        message: result.message,
        type: "success",
        duration: 5000,
      });
      navigateTo("dashboard");
    }
  } catch (error : any) {
    alertStore.showAlert({
      message: error.response.data.message,
      type: "error",
      duration: 5000,
    });
  }
});

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
</style>
