<template>
  <section>
    <div>
      <h3>Reference</h3>
      <p class="sub-title">Tell about the Reference person</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div class="flex-form-group">
        <InputForm
          :initial-value="formValues.refFirstName"
          name="refFirstName"
          placeholder="First Name"
          label="First Name"
        />
        <InputForm
          :initial-value="formValues.refLastName"
          name="refLastName"
          placeholder="Last Name"
          label="Last Name"
        />
      </div>

      <div class="flex-form-group">
        <InputForm
          :initial-value="formValues.refPosition"
          name="refPosition"
          placeholder="Position"
          label="Position"
        />
        <InputForm
          :initial-value="formValues.refEmail"
          name="refEmail"
          placeholder="example@gmail.com"
          label="Email"
        />
      </div>

      <div class="flex-form-group">
        <InputForm
          :initial-value="formValues.refPhoneNumber"
          name="refPhoneNumber"
          placeholder="+855 123 456"
          label="Phone Number"
        />
        <InputForm
          :initial-value="formValues.refCompany"
          name="refCompany"
          placeholder="Company Name"
          label="Company"
        />
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import InputForm from "~/components/InputForm.vue";
import { useSection } from "~/composables/useSection";
import type { UpdateReferenceContent } from "~/types/section";

// Define the prop type for references
interface ReferenceProps {
  references: UpdateReferenceContent[];
}

const props = defineProps<ReferenceProps>();

// Reactive form values initialized with the first reference (if exists)
const formValues = reactive({
  refFirstName: props?.references[0]?.firstName || "",
  refLastName: props?.references[0]?.lastName || "",
  refPosition: props?.references[0]?.position || "",
  refEmail: props?.references[0]?.email || "",
  refPhoneNumber: props?.references[0]?.phoneNumber || "",
  refCompany: props?.references[0]?.company || "",
});

// Validation schema
const schema = z.object({
  refFirstName: z.string().min(1, "First name is required"),
  refLastName: z.string().min(1, "Last name is required"),
  refPosition: z.string().min(1, "Position is required"),
  refEmail: z.string().email("Invalid email format"),
  refPhoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  refCompany: z.string().min(1, "Company name is required"),
});

// Initialize the form with Vee-Validate
const { handleSubmit, values } = useForm({
  validationSchema: toFieldValidator(schema),
  initialValues: formValues, // Sync reactive values with the form
});

// Initialize the patch mutation
const { updateSection } = useSection();
const route = useRoute();
const cvId = route.params.id as string;

// Form submission logic
const onSubmit = handleSubmit(async (data) => {
  // Format the payload with type and content
  const requestBody = {
    type: "Reference", // Fixed type
    content: {
      firstName: data.refFirstName,
      lastName: data.refLastName,
      position: data.refPosition,
      email: data.refEmail,
      phoneNumber: data.refPhoneNumber,
      company: data.refCompany,
    },
  };

  try {
    // Send the formatted payload to the backend
    const response = await updateSection.mutateAsync({
      cvId: cvId, // Example CV ID (replace as needed)
      updateContent: requestBody, // Send the formatted content
    });

    console.log("Successfully updated reference information:", response);
  } catch (error) {
    console.error("Error updating reference information:", error);
  }

  // Log the submitted payload for debugging
  console.log("Submitted Payload:", requestBody);
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
