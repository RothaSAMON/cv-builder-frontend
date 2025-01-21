<template>
  <div class="container">
    <!-- <DashboardPageHeader
      title="Resumes Action"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    /> -->

    <section class="resume-title-section">
      <p>
        It is suggested to refresh the page after submitting the data in case I
        have not yet implemented the real-time process.
      </p>
    </section>

    <!-- Loading and Error States -->
    <div v-if="isLoading" class="loading-state">Loading...</div>
    <div v-else-if="isError" class="error-state">Failed to load CV data.</div>
    <div v-else>
      <div class="split-screen">
        <!-- Left Section -->
        <div class="left-section">
          <div
            v-if="cvData?.sections"
            v-for="section in cvData.sections"
            :key="section._id"
          >
            <DashboardPersonalDetailsForm
              v-if="section.type === 'PersonalDetail'"
              :firstName="section.content?.firstName || ''"
              :lastName="section.content?.lastName || ''"
              :personalPosition="section.content?.position || ''"
              :personalSummary="section.content?.summary || ''"
              :imageUrl="section.content?.imageUrl || ''"
            />

            <DashboardSkillsForm
              v-if="section.type === 'Skills'"
              :skills="section.content || ''"
            />

            <DashboardLanguagueForm
              v-if="section.type === 'Languages'"
              :languages="section.content || ''"
            />

            <DashboardContactMeForm
              v-if="section.type === 'Contact'"
              :address="section.content?.address || ''"
              :email="section.content?.email || ''"
              :phoneNumber="section.content?.phoneNumber || ''"
            />

            <DashboardExperienceForm
              v-if="section.type === 'Experiences'"
              :experiences="section.content || ''"
            />

            <DashboardEducationForm
              v-if="section.type === 'Education'"
              :education="section.content || ''"
              :degreeMajor="section.content?.degreeMajor || ''"
              :schoolName="section.content?.schoolName || ''"
              :startDate="section.content?.startDate || ''"
              :endDate="section.content?.endDate || ''"
            />

            <DashboardReferenceForm
              v-if="section.type === 'Reference'"
              :references="section.content || ''"
              :firstName="section.content?.firstName || ''"
              :lastName="section.content?.lastName || ''"
              :position="section.content?.position || ''"
              :email="section.content?.email || ''"
              :phoneNumber="section.content?.phoneNumber || ''"
              :company="section.content?.company || ''"
            />
          </div>

          <!-- Submit Button -->
          <!-- <div class="submit-container">
            <a-button
              type="primary"
              @click="handleSubmit"
              class="submit-button"
            >
              Submit
            </a-button>
          </div> -->
        </div>

        <!-- Right Section -->
        <div class="right-section">
          <DashboardResume
            v-if="cvData?.sections"
            :selectedTemplate="selectedTemplate"
            :cvData="isLoading || isRefetching || cvData.sections"
          />
        </div>

        <div v-if="isLoading || isRefetching" class="loading-state">
          Loading...
        </div>
        <div v-else-if="isError" class="error-state">
          Failed to load CV data.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const routes = [
  { path: "/resumes", breadcrumbName: "Resumes" },
  { path: "/resumes/:id", breadcrumbName: "Resumes Action" },
];
definePageMeta({
  layout: "default",
});

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

const { data: cvData, isError, isRefetching } = fetchCVById(cvId.value);
// const { isLoading } = fetchCVById;
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

.right-section {
  flex: 2;
  position: sticky;
  top: 20px;
  height: fit-content;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow-x: auto;
}

.submit-container {
  margin-top: 20px;
  text-align: center;
}

.submit-button {
  width: 100%;
}

.resume-title-section {
  border: 1px solid rgb(255, 194, 143);
  background-color: rgb(255, 245, 224);
  color: rgb(228, 90, 16);
  border-radius: 8px;
  padding-top: 12px;
  padding-left: 8px;
}

@media only screen and (max-width: 600px) {
  .right-section {
    display: none;
  }
}
</style>
