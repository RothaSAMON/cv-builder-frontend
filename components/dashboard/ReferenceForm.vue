<template>
  <section>
    <div>
      <h3>Reference</h3>
      <p class="sub-title">Tell about the Reference person</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <!-- Name Fields -->
      <div class="flex-form-group">
        <InputForm name="refFirstName" placeholder="First Name" label="First Name" />
        <InputForm name="refLastName" placeholder="Last Name" label="Last Name" />
      </div>

      <!-- Position and Email -->
      <div class="flex-form-group">
        <InputForm name="refPosition" placeholder="Position" label="Position" />
        <InputForm name="refEmail" placeholder="example@gmail.com" label="Email" />
      </div>

      <!-- Phone Number and Company -->
      <div class="flex-form-group">
        <InputForm name="refPhoneNumber" placeholder="+855 123 456" label="Phone Number" />
        <InputForm name="refCompany" placeholder="Company Name" label="Company" />
      </div>

      <!-- Submit Button -->
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as z from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import InputForm from "~/components/InputForm.vue";
import DatePickerForm from "~/components/DatePickerForm.vue";

// Zod schema for validation
const schema = z.object({
  refFirstName: z.string().min(1, "First name is required"),
  refLastName: z.string().min(1, "Last name is required"),
  refPosition: z.string().min(1, "Position is required"),
  refEmail: z.string().email("Invalid email format"),
  refPhoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  refCompany: z.string().min(1, "Company name is required"),
});

// Initialize form with vee-validate and zod schema
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toFieldValidator(schema),
});

// Handle form submission
const onSubmit = handleSubmit((values) => {
  console.log("Reference Form Submitted:", values);
});
</script>

<style scoped>
.flex-form-group {
  display: flex;
  gap: 16px;
}
.sub-title {
  color: #888;
  font-size: 14px;
}
</style>
