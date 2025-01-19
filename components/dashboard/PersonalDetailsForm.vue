<template>
  <section>
    <div>
      <h3>Personal Details</h3>
      <p class="sub-title">Fill in your personal information</p>
    </div>

    <a-form layout="vertical" @submit.prevent="onSubmit">
      <!-- Image Upload Section -->
      <a-form-item label="Upload Image">
        <a-upload
          name="avatar"
          list-type="picture-card"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <div>
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
              style="width: 100%"
            />
            <div v-else>
              <a-icon type="plus" />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </div>
        </a-upload>
      </a-form-item>

      <!-- Form Fields -->
      <div class="flex-form-group">
        <InputForm
          :initial-value="props.firstName"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
        />
        <InputForm
          :initial-value="props.lastName"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
        />
      </div>
      <InputForm
        :initial-value="props.personalPosition"
        name="personalPosition"
        label="Position"
        placeholder="Enter your position"
      />
      <TextAreaForm
        :initial-value="props.personalSummary"
        name="personalSummary"
        label="Summary"
        placeholder="Write a brief summary about yourself"
        :rows="4"
      />

      <!-- Submit Button -->
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useForm, defineRule } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import * as z from "zod";
import InputForm from "~/components/InputForm.vue";
import TextAreaForm from "~/components/TextAreaForm.vue";
import { useSection } from "~/composables/useSection";

// Props Definition
interface DashboardPersonalDetailsFormProps {
  firstName?: string;
  lastName?: string;
  personalPosition?: string;
  personalSummary?: string;
}
const props = defineProps<DashboardPersonalDetailsFormProps>();

// Zod Schema
const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  personalPosition: z.string().optional(),
  personalSummary: z.string().optional(),
});

// Initialize Form
const { handleSubmit, values, errors } = useForm({
  validationSchema: toFieldValidator(schema),
});

// Image Upload Logic
const imageUrl = ref<string | null>(null);

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) alert("You can only upload JPG/PNG files!");
  if (!isLt2M) alert("Image must be smaller than 2MB!");

  return isJpgOrPng && isLt2M;
};

const handleChange = (info: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(info.file.originFileObj);
};

// Initialize Patch Function
const { updateSection } = useSection();

// Define the UpdatePersonalContent type here
type UpdatePersonalContent = {
  firstName: string;
  lastName: string;
  position?: string;
  summary?: string;
  imageUrl?: string;
};

// Form Submission
const onSubmit = handleSubmit(async (values) => {
  // Create the updated section data in the required format
  const requestBody = {
    type: "PersonalDetail", // Fixed type
    content: {
      firstName: values.firstName,
      lastName: values.lastName,
      position: values.personalPosition,
      summary: values.personalSummary,
      imageUrl: imageUrl.value || "", // Use the uploaded image URL or default to an empty string
    },
  };

  try {
    // Send the correctly formatted data to the backend
    const response = await updateSection.mutateAsync({
      cvId: "678b5c8f0845662ccece9520", // Example CV ID
      updateContent: requestBody, // Send the entire requestBody as required
    });

    console.log("Successfully updated section:", response);
  } catch (error) {
    console.error("Error updating personal details:", error);
  }

  // Log the final payload for verification
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

.upload-container {
  margin-bottom: 16px;
}
</style>
