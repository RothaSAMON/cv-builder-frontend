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
          <a-avatar
            class="profile-avatar"
            :size="100"
            src="https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
          />
          <div class="action-buttons">
            <a-button type="primary" class="edit-button">Upload Image</a-button>
            <a-button danger class="delete-button">Delete Profile</a-button>
          </div>
        </div>
  
        <!-- Profile Details -->
        <a-col :span="16" class="profile-details">
          <h3>Profile Details</h3>
          <a-form :layout="'vertical'" class="details-form">
            <a-form-item label="First Name" required>
              <a-input placeholder="John" />
            </a-form-item>
  
            <a-form-item label="Last Name" required>
              <a-input placeholder="Doe" />
            </a-form-item>
  
            <a-form-item label="Gender" required>
              <a-select placeholder="Select Gender">
                <a-select-option value="male">Male</a-select-option>
                <a-select-option value="female">Female</a-select-option>
                <a-select-option value="other">Other</a-select-option>
              </a-select>
            </a-form-item>
  
            <a-form-item label="Date of Birth" required>
              <a-date-picker style="width: 100%" placeholder="Select Date" />
            </a-form-item>
  
            <a-form-item label="Email" required>
              <a-input placeholder="johndoe@example.com" disabled />
            </a-form-item>
  
            <a-button type="primary" class="update-button">Update Profile</a-button>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </template>
  

<script setup>
definePageMeta({
  layout: "default",
});

const routes = [
  {
    path: "index",
    breadcrumbName: "Profile",
  },
];
</script>

<style scoped>
.profile-container {
  width: 100%;
  padding: 20px;
}

.profile-content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 30px; /* Adjust gap as needed */
  width: 100%;
  max-width: 1200px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  min-width: 250px;
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

.details-form {
  width: 100%;
}

.update-button {
  margin-top: 20px;
  width: 100%;
}
</style>

