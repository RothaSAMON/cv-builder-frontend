<template>
  <div class="container">
    <DashboardPageHeader
      title="Resumes Action"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    />
    Edit
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const routes = [
  {
    path: "/resumes",
    breadcrumbName: "Resumes",
  },
  {
    path: "/resumes/:id",
    breadcrumbName: "Resumes Action",
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
