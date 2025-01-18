<template>
  <div class="container">
    <DashboardPageHeader
      title="Resumes Action"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    />

    <!-- Loading and Error States -->
    <div v-if="isLoading" class="loading-state">Loading...</div>
    <div v-else-if="isError" class="error-state">Failed to load CV data.</div>
    <div v-else>
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
          <div v-for="section in cvData.sections">
            <DashboardPersonalDetailsForm
              v-if="section.type === 'PersonalDetail'"
              :firstName="section.content.firstName"
              :lastName="section.content.lastName"
              :personalPosition="section.content.position"
              :personalSummary="section.content.summary"
            />

            <DashboardSkillsForm
              :skills="section.content"
              v-if="section.type === 'Skills'"
            />

            <DashboardLanguagueForm
              :languages="section.content"
              v-if="section.type === 'Languages'"
            />

            <DashboardContactMeForm
              v-if="section.type === 'Contact'"
              :address="section.content.address"
              :email="section.content.email"
              :phoneNumber="section.content.phoneNumber"
            />

            <DashboardExperienceForm
              v-if="section.type === 'Experiences'"
              :experiences="section.content"
            />

            <DashboardEducationForm
              v-if="section.type === 'Education'"
              :education="section.content"
              :degreeMajor="section.content.degreeMajor"
              :schoolName="section.content.schoolName"
              :startDate="section.content.startDate"
              :endDate="section.content.endDate"
            />
          </div>
          <!-- Display CV Data -->

          <!-- <DashboardContactMeForm :email="cvData?.email" /> -->
          <DashboardReferenceForm :references="cvData?.references" />

          <!-- <DashboardSkillsForm :skills="cvData?.skills" /> -->

          <!-- <DashboardExperienceForm :experience="cvData?.experience" /> -->
          <!-- <DashboardEducationForm :education="cvData?.education" /> -->
          <!-- <DashboardLanguagueForm :languages="cvData?.languages" /> -->

          <!-- Submit Button -->
          <div class="submit-container">
            <a-button
              type="primary"
              @click="handleSubmit"
              class="submit-button"
            >
              Submit
            </a-button>
          </div>
        </div>

        <!-- Right Section -->
        <div class="right-section">
          <DashboardResume
            :selectedTemplate="selectedTemplate"
            :cvData="cvData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
// import { useCV } from "~/composables/useCV";
import DashboardContactMeForm from "../../../components/dashboard/ContactMeForm.vue";
import DashboardPersonalDetailsForm from "../../../components/dashboard/PersonalDetailsForm.vue";
import DashboardReferenceForm from "../../../components/dashboard/ReferenceForm.vue";
import DashboardResume from "../../../components/dashboard/Resume.vue";

const routes = [
  { path: "/resumes", breadcrumbName: "Resumes" },
  { path: "/resumes/:id", breadcrumbName: "Resumes Action" },
];

// Template selection
const template1 =
  "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT.jpg";
const template2 =
  "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT2.jpg";

const selectedTemplate = ref(template1);

const selectTemplate = (template) => {
  selectedTemplate.value = template;
};

// Route and CV Data Fetching
const route = useRoute();
const { fetchCVById } = useCV();
const cvId = computed(() => route.params.id);

const { data: cvData, isLoading, isError } = fetchCVById(cvId.value);

console.log("Data", cvData.value);

// Handle form submission
const handleSubmit = () => {
  console.log("Form submitted with data:", cvData.value);
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

@media only screen and (max-width: 600px) {
  .right-section {
    display: none;
  }
}
</style>
