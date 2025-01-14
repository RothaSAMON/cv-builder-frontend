<template>
  <a-layout class="main-layout-container">
    <Sidebar />
    <a-layout class="layout-container">
      <Header />
      <a-layout-content class="content-container">
        <NuxtPage />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts"></script>
<style scoped>
.main-layout-container {
  background-color: white !important;
}
.layout-container {
  background-color: white !important;
  margin: 0px 24px;
}
.content-container {
  border-top: 1px solid #ddd;

  background-color: white !important; /* Force white background */
  min-height: 100vh; /* Ensure full height */
  margin: 0;
  padding: 0;
}
</style>
