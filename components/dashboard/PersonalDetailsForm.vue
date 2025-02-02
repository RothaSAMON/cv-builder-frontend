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
          <a-spin :spinning="imageUploading">
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
          </a-spin>
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
  <CustomAlert
    v-if="alertStore.isVisible"
    :type="alertStore.type"
    :message="alertStore.message"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useForm, defineRule } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import * as z from "zod";
import InputForm from "~/components/InputForm.vue";
import TextAreaForm from "~/components/TextAreaForm.vue";
import { useSection } from "~/composables/useSection";
import { useAlertStore } from "~/store/alertStore";

const route = useRoute();
const cvId = route.params.id as string;

// Props Definition
interface DashboardPersonalDetailsFormProps {
  firstName?: string;
  lastName?: string;
  personalPosition?: string;
  personalSummary?: string;
  imageUrl?: string;
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
const { updateSectionImage } = useSection<any>();
const imageUrl = ref<string | null>(props.imageUrl || null);
const imageUploading = ref(false);

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) alert("You can only upload JPG/PNG files!");
  if (!isLt2M) alert("Image must be smaller than 2MB!");

  return isJpgOrPng && isLt2M;
};

const handleChange = async (info: any) => {
  const file = info.file.originFileObj;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    imageUploading.value = true;

    try {
      await updateSectionImage.mutateAsync({
        cvId: cvId,
        imageData: formData,
      });
      console.log("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      imageUploading.value = false;
    }
  }
};

// Initialize Patch Function
const { updateSection } = useSection();
const alertStore = useAlertStore();

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
    type: "PersonalDetail",
    content: {
      firstName: values.firstName,
      lastName: values.lastName,
      position: values.personalPosition,
      summary: values.personalSummary,
      imageUrl: imageUrl.value || "",
    },
  };

  try {
    // Send the correctly formatted data to the backend
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

onMounted(() => {
  // Fetch the existing image URL if available
  if (props.imageUrl) {
    imageUrl.value = props.imageUrl;
  }
});
console.log("Image url", props.imageUrl);
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
