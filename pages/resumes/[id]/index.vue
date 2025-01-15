<template>
  <div class="container">
    <DashboardPageHeader
      title="Resumes Action"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    />

    <!-- First Reusable Form -->
    <h2>Personal Information</h2>
    <InputForm ref="personalInfoInput" />

    <!-- Date Picker Forms -->
    <h2>Date of Birth</h2>
    <DatePickerForm ref="datePickerInput" />

    <h2>Start Date</h2>
    <DatePickerForm ref="startDateInput" />

    <h2>End Date</h2>
    <DatePickerForm ref="endDateInput" />

    <!-- Second Reusable Form -->
    <h2>Job Experience</h2>
    <InputForm ref="jobExperienceInput" />

    <!-- Submit Button for All Forms -->
    <a-button type="primary" @click="handleSubmit" class="mt-4">
      Submit All Forms
    </a-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputForm from "~/components/InputForm.vue";
import DatePickerForm from "~/components/DatePickerForm.vue";

definePageMeta({
  layout: "default",
});

const routes = [
  { path: "/resumes", breadcrumbName: "Resumes" },
  { path: "/resumes/:id", breadcrumbName: "Resumes Action" },
];

// Refs for all forms
const personalInfoInput = ref(null);
const jobExperienceInput = ref(null);
const datePickerInput = ref(null);
const startDateInput = ref(null);
const endDateInput = ref(null);

const handleSubmit = () => {
  console.log("Personal Information:", personalInfoInput.value?.inputData);
  console.log("Date of Birth:", datePickerInput.value?.selectedDate);
  console.log("Start Date:", startDateInput.value?.selectedDate);
  console.log("End Date:", endDateInput.value?.selectedDate);
  console.log("Job Experience:", jobExperienceInput.value?.inputData);

  // ✅ Clear all forms after submission
  personalInfoInput.value.inputData = "";
  jobExperienceInput.value.inputData = "";
  datePickerInput.value.selectedDate = null;
  startDateInput.value.selectedDate = null;
  endDateInput.value.selectedDate = null;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
