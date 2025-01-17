<template>
  <div class="container">
    <DashboardGreetingCard />
    <DashboardGuideCard />

    <ResumeList :showCreateButton="false" />
  </div>
</template>

<script setup lang="ts">
import ResumeList from "~/components/dashboard/ResumeList.vue";

definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cv-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}

.cv-preview {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
