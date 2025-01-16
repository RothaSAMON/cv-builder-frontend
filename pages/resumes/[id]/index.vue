<template>
  <div class="container">
    <DashboardPageHeader
      title="Resumes Action"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    />

    <div class="split-screen">
      <!-- Left Section -->
      <div class="left-section">
        <section class="templatep-container">
          <h3>Select Template</h3>
          <div class="template-selection">
            <div
              :class="[
                'template-image',
                { active: selectedTemplate === template1 },
              ]"
              @click="selectTemplate(template1)"
            >
              <img :src="template1" alt="Template 1" />
            </div>
            <div
              :class="[
                'template-image',
                { active: selectedTemplate === template2 },
              ]"
              @click="selectTemplate(template2)"
            >
              <img :src="template2" alt="Template 2" />
            </div>
          </div>
        </section>

        <DashboardPersonalDetailsForm />
        <DashboardContactMeForm />
        <DashboardReferenceForm />

        <!-- Submit Button -->
        <div class="submit-container">
          <a-button type="primary" @click="handleSubmit" class="submit-button">
            Submit
          </a-button>
        </div>
      </div>

      <!-- Right Section -->
      <DashboardResume :selectedTemplate="selectedTemplate" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DashboardContactMeForm from "../../../components/dashboard/ContactMeForm.vue";
import DashboardPersonalDetailsForm from "../../../components/dashboard/PersonalDetailsForm.vue";
import DashboardReferenceForm from "../../../components/dashboard/ReferenceForm.vue";
import DashboardResume from "../../../components/dashboard/Resume.vue";

const routes = [
  { path: "/resumes", breadcrumbName: "Resumes" },
  { path: "/resumes/:id", breadcrumbName: "Resumes Action" },
];

const template1 =
  "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT.jpg";
const template2 =
  "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT2.jpg";

const selectedTemplate = ref(template1);

const selectTemplate = (template) => {
  selectedTemplate.value = template;
};

const handleSubmit = () => {
  console.log("Form submitted");
};
</script>

<style scoped>
.split-screen {
  display: flex;
  gap: 20px;
  margin: 24px 0;
}

.left-section {
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.template-selection {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.template-image {
  width: 120px;
  height: auto;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s ease;
  border: 1px solid var(--border-color);
}

.template-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.template-image.active {
  border-color: #007bff;
}

.submit-container {
  margin-top: 20px;
  text-align: center;
}

.submit-button {
  width: 100%;
}
</style>
