<template>
  <a-layout-sider breakpoint="lg" collapsible class="sidebar-container">
    <div class="logo">Rezume</div>
    <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
      <a-menu-item key="1">
        <template #icon><AppstoreOutlined /></template>
        <span>Dashboard</span>
      </a-menu-item>

      <a-menu-item key="2">
        <template #icon><FolderOutlined /></template>
        <span>Resumes</span>
      </a-menu-item>

      <a-menu-item key="3">
        <template #icon><UserOutlined /></template>
        <span>Profile</span>
      </a-menu-item>

      <a-menu-item key="4">
        <template #icon><LogoutOutlined /></template>
        <span>Logout</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  FolderOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped>
.sidebar-container {
  background-color: #ffffff;
  position: sticky;
  top: 0; /* Make it sticky at the top */
  height: 100vh; /* Ensure it spans the full height of the viewport */
  z-index: 10; /* Keep it above other content */
  border-right: 1px solid #ddd; /* Add a border on the right side */
}

.logo {
  text-align: center;
  color: black;
  font-size: 1.125rem; /* Equivalent to text-lg */
  font-weight: 600; /* Equivalent to font-semibold */
  padding: 1rem 0; /* Equivalent to py-4 */
}

/* Change the background color of the arrow icon */
:deep(.ant-layout-sider-trigger) {
  background-color: var(--secondary-background-color) !important;
  color: white;
}
</style>
