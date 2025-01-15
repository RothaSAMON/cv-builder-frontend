<template>
  <DashboardPageHeader
    title="Profile"
    subTitle="Create your Profile to find a job"
    :breadcrumbRoutes="routes"
  />
  <div class="profile-container">
    <a-row justify="center" class="profile-content-wrapper">
      <!-- Profile Card -->
      <div class="profile-card">
        <div class="profile-avatar-wrapper">
          <a-avatar
            class="profile-avatar"
            :size="100"
            :src="profileImage || defaultImage"
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

        <div>
          <h3>Samon Rotha</h3>
          <p class="sub-title">samonrotha@gmail.com</p>
          <div class="action-buttons">
            <a-button danger class="delete-button">Delete Profile</a-button>
          </div>
        </div>
      </div>

      <!-- Profile Details -->
      <a-col class="profile-details">
        <h3>Profile Details</h3>
        <a-form
          :layout="'vertical'"
          class="details-form"
          @submit.prevent="handleSubmit"
        >
          <section class="flex-form-group">
            <InputForm ref="firstNameInput" label="First Name" />
            <InputForm ref="lastNameInput" label="Last Name" />
          </section>
          <a-form-item label="Gender" >
            <a-select placeholder="Select Gender" v-model="gender">
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
              <a-select-option value="other">Other</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Date of Birth" >
            <DatePickerForm ref="datePicker" />
          </a-form-item>
          <a-form-item label="Email" required>
            <a-input placeholder="johndoe@example.com" disabled />
          </a-form-item>
          <a-button type="primary" class="update-button" htmlType="submit">
            Update Profile
          </a-button>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputForm from "@/components/InputForm.vue";
import DatePickerForm from "@/components/DatePickerForm.vue";
import { CameraFilled } from "@ant-design/icons-vue";

definePageMeta({
  layout: "default",
});

const routes = [{ path: "index", breadcrumbName: "Profile" }];

const gender = ref(null);
const profileImage = ref(null);
const defaultImage =
  "https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";

const firstNameInput = ref(null);
const lastNameInput = ref(null);
const datePicker = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileUpload = () => {
  const fileInput = document.querySelector("input[type='file']");
  fileInput.click();
};

const handleSubmit = () => {
  const firstName = firstNameInput.value?.inputData || "";
  const lastName = lastNameInput.value?.inputData || "";
  const dateOfBirth = datePicker.value?.selectedDate || "";

  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Gender:", gender.value);
  console.log("Date of Birth:", dateOfBirth);
};
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
