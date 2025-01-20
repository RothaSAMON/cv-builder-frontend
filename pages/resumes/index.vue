<template>
  <div class="container">
    <div class="page-header">
      <DashboardPageHeader
        title="Resumes"
        subTitle="Create your resumes to find a job"
        :breadcrumbRoutes="routes"
      />
    </div>

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

@media (max-width: 600px) {
  .page-header {
    display: none;
  }
}
</style>
