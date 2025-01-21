<template>
  <section>
    <div>
      <h3>Contact Me</h3>
      <p class="sub-title">Write down your contact information.</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div class="flex-form-group">
        <InputForm
          :initial-value="props.phoneNumber"
          name="personalPhoneNumber"
          placeholder="+855 123 456"
          label="Phone Number"
        />
        <InputForm
          :initial-value="props.email"
          name="personalEmail"
          placeholder="example@gmail.com"
          label="Email"
        />
      </div>

      <!-- Address Field (Optional) -->
      <TextAreaForm
        :initial-value="props.address"
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

  <CustomAlert
    v-if="alertStore.isVisible"
    :type="alertStore.type"
    :message="alertStore.message"
  />
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as z from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import InputForm from "~/components/InputForm.vue";
import TextAreaForm from "~/components/TextAreaForm.vue";
import { useSection } from "~/composables/useSection";
import { useAlertStore } from "~/store/alertStore";

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
const { handleSubmit, values } = useForm({
  validationSchema: toFieldValidator(schema),
  initialValues: {
    personalPhoneNumber: props.phoneNumber || "", // Initialize with the prop value
    personalEmail: props.email || "",
    personalAddress: props.address || "", // Address is optional
  },
});

// Initialize Patch Function
const { updateSection } = useSection();
const alertStore = useAlertStore();
const route = useRoute();
const cvId = route.params.id as string;

// Form Submission
const onSubmit = handleSubmit(async (data) => {
  // Create the formatted payload
  const requestBody = {
    type: "Contact", // Fixed type
    content: {
      phoneNumber: data.personalPhoneNumber,
      email: data.personalEmail,
      address: data.personalAddress,
    },
  };

  try {
    // Send the correctly formatted payload to the backend
    const response = await updateSection.mutateAsync({
      cvId: cvId,
      updateContent: requestBody,
    });

    if (response) {
      alertStore.showAlert({
        message: response.message,
        type: "success",
        duration: 5000,
      });
    }
  } catch (error: any) {
    alertStore.showAlert({
      message: error.response.data.message,
      type: "error",
      duration: 5000,
    });
  }
});
</script>

<style scoped>
.flex-form-group {
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
