<template>
  <DashboardPageHeader
    title="Profile"
    subTitle="Create your Profile to find a job"
    :breadcrumbRoutes="routes"
  />
  <div class="profile-container">
    <a-row justify="center" class="profile-content-wrapper">
      <div class="profile-card">
        <a-spin :spinning="imageUploading || isPending || isRefetching">
          <div class="profile-avatar-wrapper">
            <a-avatar
              class="profile-avatar primary-border-color"
              :size="100"
              :src="profileImage || userData.imageProfile || defaultImage"
            />
            <div class="upload-icon" @click="triggerFileUpload">
              <CameraFilled />
            </div>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              @change="handleFileChange"
            />
          </div>
        </a-spin>

        <div>
          <h3>{{ userData?.firstName || "User" }} {{ userData?.lastName }}</h3>
          <p class="sub-title">{{ userData?.email }}</p>
          <div class="action-buttons">
            <a-button danger class="delete-button" @click="deleteProfile"
              >Delete Profile</a-button
            >
          </div>
        </div>
      </div>

      <a-col class="profile-details">
        <h3>Profile Details</h3>
        <a-form
          layout="vertical"
          class="details-form"
          @submit.prevent="onSubmit"
        >
          <section class="flex-form-group">
            <InputForm
              :initial-value="userData?.firstName || ''"
              name="firstName"
              placeholder="First Name"
              label="First Name"
            />
            <InputForm
              :initial-value="userData?.lastName || ''"
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
            />
          </section>

          <div class="flex-form-group">
            <a-form-item
              class="w-full"
              label="Gender"
              :validate-status="errors.gender ? 'error' : ''"
              :help="errors.gender"
            >
              <a-select v-model:value="gender" placeholder="Select Gender">
                <a-select-option value="male">Male</a-select-option>
                <a-select-option value="female">Female</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              label="Date of Birth"
              :validate-status="'error'"
              :help="errors.dateOfBirth"
              class="w-full"
            >
              <input
                type="date"
                :name="'dateOfBirth'"
                :value="formatDate(userData?.dateOfBirth as string)"
                class="input-date w-full"
                @input="updateDateOfBirth"
              />
            </a-form-item>
          </div>

          <a-form-item label="Email">
            <a-input
              :value="userData?.email || ''"
              name="email"
              placeholder="johndoe@example.com"
              disabled
            />
          </a-form-item>

          <a-button type="primary" class="update-button" html-type="submit">
            Update Profile
          </a-button>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useForm, useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import * as z from "zod";
import InputForm from "@/components/InputForm.vue";
import { CameraFilled } from "@ant-design/icons-vue";
import { useUser } from "~/composables/useUser";

const routes = [{ path: "index", breadcrumbName: "Profile" }];

const defaultImage =
  "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.webp";

const profileImage = ref<string | null>(null);
const imageUploading = ref(false);

const { userQuery, updateUser, updateProfileImage, deleteProfileImage } =
  useUser(); // Import updateUser
const userData = computed(() => userQuery.data.value?.data || {});
const router = useRouter();

const {isRefetching} = userQuery
const {isPending} = deleteProfileImage

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.value = reader.result as string;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    imageUploading.value = true;

    try {
      await updateProfileImage.mutateAsync(formData);
      console.log("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      imageUploading.value = false;
    }
  }
};

const triggerFileUpload = () => {
  const fileInput = document.querySelector(
    "input[type='file']"
  ) as HTMLInputElement | null;
  if (fileInput) {
    fileInput.click();
  }
};

// Form Data
const formData = ref({
  firstName: userData?.value.firstName || "",
  lastName: userData?.value.lastName || "",
  email: userData?.value.email || "",
});

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

const { handleSubmit, errors } = useForm({
  validationSchema: toFieldValidator(schema),
});

const { value: gender } = useField("gender", {
  initialValue: userData.value?.gender || null,
});

const dateOfBirth = ref(userData.value?.dateOfBirth || "");

const loading = ref(true);

watchEffect(() => {
  if (userData.value) {
    gender.value = userData.value.gender || null;
    dateOfBirth.value = userData.value.dateOfBirth || "";
    loading.value = false;
  }
});

const formatDate = (date: string) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const updateDateOfBirth = (event: Event) => {
  const dateValue = (event.target as HTMLInputElement).value;
  dateOfBirth.value = dateValue;
};

// Form Submission
const onSubmit = handleSubmit(async (formValues) => {
  if (loading.value) {
    console.warn("Form submission blocked because the data is still loading.");
    return;
  }

  const payload = {
    ...formValues,
    gender: gender.value as string,
    dateOfBirth: dateOfBirth.value,
  };

  console.log("Form values:", formValues);
  console.log("Payload to be sent:", payload);

  try {
    await updateUser.mutateAsync(payload);
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
});

// Delete Profile
const deleteProfile = async () => {
  try {
    await deleteProfileImage.mutateAsync();
    console.log("Profile image deleted successfully!");
    router.push("/profile");
  } catch (error) {
    console.error("Error deleting profile image:", error);
  }
};

definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.profile-container {
  width: 100%;
  padding: 20px 0px;
}

.profile-content-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  display: flex;
  gap: 24px;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  width: 100%;
}

.profile-avatar-wrapper {
  position: relative;
  display: inline-block;
}

.upload-icon {
  position: absolute;
  bottom: 10px;
  right: 0px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-details {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
}

.update-button {
  margin-top: 20px;
  width: 100%;
}
</style>
