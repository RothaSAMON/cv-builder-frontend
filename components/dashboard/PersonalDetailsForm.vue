<template>
  <section>
    <div>
      <h3>Personal Details</h3>
      <p class="sub-title">Fill in your personal information</p>
    </div>

    <!-- Image Upload Section -->
    <div>
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
    </div>

    <div class="flex-form-group">
      <InputForm ref="firstNameInput" label="First Name" required />
      <InputForm ref="lastNameInput" label="Last Name" required />
    </div>
    <InputForm ref="personalPositionInput" label="Position" />
    <a-form-item label="Summary">
      <a-textarea
        ref="personalSummaryInput"
        rows="4"
        placeholder="Write a brief summary about yourself"
        v-model="personalSummary"
      />
    </a-form-item>
  </section>
</template>

<script setup>
import { ref } from "vue";
import InputForm from "~/components/InputForm.vue";

// State for personal summary and uploaded image URL
const personalSummary = ref("");
const imageUrl = ref(null);

// Validate before uploading (e.g., size, file type)
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    alert("You can only upload JPG/PNG files!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert("Image must be smaller than 2MB!");
    return false;
  }
  return isJpgOrPng && isLt2M;
};

// Handle image change
const handleChange = (info) => {
  if (info.file.status === "done") {
    // Simulate getting the URL from a server
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(info.file.originFileObj);
  }
};
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
