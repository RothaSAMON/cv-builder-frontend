<template>
  <section>
    <div>
      <h3>Contact Me</h3>
      <p class="sub-title">Write down your contact information.</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div class="flex-form-group">
        <InputForm
          :initial-value="phoneNumber"
          name="personalPhoneNumber"
          placeholder="+855 123 456"
          label="Phone Number"
        />
        <InputForm
          :initial-value="email"
          name="personalEmail"
          placeholder="example@gmail.com"
          label="Email"
        />
      </div>

      <!-- Address Field (Optional) -->
      <TextAreaForm
        :initial-value="address"
        name="personalAddress"
        label="Address"
        placeholder="Current address"
        :rows="4"
      />

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
import TextAreaForm from "~/components/TextAreaForm.vue";

// Define types for the contact props
interface ContactProps {
  phoneNumber: string;
  email: string;
  address: string;
}

// Props passed from the parent
const props = defineProps<ContactProps>();

// Validation schema using Zod
const schema = z.object({
  personalPhoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  personalEmail: z.string().email("Invalid email format"),
  personalAddress: z.string().min(1, "Address is required"),
});

// Initialize the form with validation schema and initial values
const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: toFieldValidator(schema),
  initialValues: {
    personalPhoneNumber: props.phoneNumber || "", // Initialize with the prop value
    personalEmail: props.email || "",
    personalAddress: props.address || "", // Address is optional
  },
});

const onSubmit = handleSubmit((data) => {
  console.log("Form submitted successfully:", data);
});
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.submit-btn {
  margin-top: 1rem;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
