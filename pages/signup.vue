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
            <a-select-option value="male">Male</a-select-option>
            <a-select-option value="female">Female</a-select-option>
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
import * as z from "zod";
import InputForm from "@/components/InputForm.vue";
import DatePickerForm from "@/components/DatePickerForm.vue";

// Define schema with Zod
const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female"], { message: "Gender is required" }),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Initialize the form
const { handleSubmit, errors } = useForm({
  validationSchema: toFieldValidator(schema),
  // initialValues : { 
  //   firstName: 

  // }
});

// Use field for gender since it's not directly tied to an <InputForm>
const { value: gender, errorMessage: genderError } = useField("gender");

// Handle form submission
const onSubmit = handleSubmit((formValues) => {
  console.log("Form submitted successfully:", formValues);
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
