<template>
  <div class="container">
    <DashboardPageHeader
      title="Resumes"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    />

    <DashboardResumeList />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const routes = [
  {
    path: "index",
    breadcrumbName: "Resumes",
  },
];
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
