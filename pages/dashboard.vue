<template>
  <div class="container">
    <DashboardGreetingCard />
    <DashboardGuideCard />
  </div>
</template>

<script setup>
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
</style>
