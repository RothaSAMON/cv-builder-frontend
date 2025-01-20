<template>
  <a-layout-sider breakpoint="lg" collapsible class="sidebar-container">
    <div class="logo">Rizz</div>
    <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
      <!-- Dashboard -->
      <a-menu-item key="1">
        <template #icon><AppstoreOutlined /></template>
        <nuxt-link to="/dashboard">Dashboard</nuxt-link>
      </a-menu-item>

      <!-- Resumes -->
      <a-menu-item key="2">
        <template #icon><FolderOutlined /></template>
        <nuxt-link to="/resumes">Resumes</nuxt-link>
      </a-menu-item>

      <!-- Profile -->
      <a-menu-item key="3">
        <template #icon><UserOutlined /></template>
        <nuxt-link to="/profile">Profile</nuxt-link>
      </a-menu-item>

      <!-- Logout -->
      <a-menu-item key="4" @click="showLogoutModal">
        <template #icon><LogoutOutlined /></template>
        Logout
      </a-menu-item>
    </a-menu>

    <!-- Modal for Logout Confirmation -->
    <a-modal
      v-model:visible="isModalVisible"
      :ok-type="'danger'"
      :icon="warningIcon"
      @ok="handleLogout"
      @cancel="handleCancel"
    >
      <template #title>
        <span style="color: red">Confirm Logout</span>
      </template>
      <p style="color: var(--error-color)">Are you sure you want to logout?</p>
    </a-modal>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {
  AppstoreOutlined,
  UserOutlined,
  FolderOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { useAuth } from "~/composables/useAuth"; // Ensure the path is correct for useAuth
import { useAlertStore } from "~/store/alertStore";

const { logoutMutation } = useAuth();

const isModalVisible = ref(false);
const warningIcon = ExclamationCircleOutlined;

const alertStore = useAlertStore();

const showLogoutModal = () => {
  isModalVisible.value = true;
};

const handleLogout = async () => {
  try {
    const data = await logoutMutation.mutateAsync();

    if (data) {
      // Reset the modal visibility
      isModalVisible.value = false;

      // alertStore.showAlert({
      //   message: data.message,
      //   type: "success",
      //   duration: 5000,
      // });
      // Navigate to login page after successful logout
      navigateTo("/login");
    }
  } catch (error: any) {
    console.error("Error logging out", error);
    // Optionally show an alert with the error message
    alertStore.showAlert({
      message: "Logout failed. Please try again.",
      type: "error",
      duration: 5000,
    });
  }
};

const handleCancel = () => {
  // Close the modal if the user cancels the logout
  isModalVisible.value = false;
};
</script>

<style scoped>
.sidebar-container {
  background-color: #ffffff;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 10;
  border-right: 1px solid #ddd;
}

.logo {
  text-align: center;
  color: black;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 1rem 0;
}

/* Change the background color of the arrow icon */
:deep(.ant-layout-sider-trigger) {
  background-color: #2977ff;
  color: white;
}
</style>
