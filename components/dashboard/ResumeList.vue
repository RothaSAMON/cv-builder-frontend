<template>
  <div class="list-container primary-border-color">
    <section class="list-header">
      <!-- Title for the resume list -->
      <p class="resume-des">
        All your resumes, that will help you to find a job.
      </p>

      <!-- Create Button (conditionally rendered) -->
      <div class="create-button-container" v-if="showCreateButton">
        <DashboardCreateCvButton />
      </div>
    </section>

    <!-- Resume Cards -->
    <a-row :gutter="[16, 16]">
      <a-col
        v-for="resume in displayedResumes"
        :key="resume._id"
        :xs="24"
        :sm="12"
        :lg="8"
        @click="goToResume(resume._id)"
      >
        <a-card class="card" :hoverable="true">
          <a-row align="middle" justify="center">
            <!-- Resume Preview Image -->
            <a-col :span="24" class="image-container">
              <NuxtImg
                :src="
                  resume.previewImageUrl ||
                  'https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT.jpg'
                "
                :alt="resume.title"
                class="resume-image"
              />
            </a-col>

            <!-- Resume Title and Author -->
            <a-col :span="24" class="title-container">
              <p class="sub-title">Title:</p>
              <h3>{{ resume.title }}</h3>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <div v-if="!cvData || cvData.length === 0" class="no-data-message">
      <p class="sub-title">No resumes available yet.</p>
      <img src="@/assets/images/NoData.jpg" alt="No-Data" />
    </div>

    <!-- See More Button -->
    <div v-if="hasMoreData" class="see-more-container">
      <a-button type="primary" @click="loadMore"> See More </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCV } from "../../composables/useCv";

// Props
defineProps({
  showCreateButton: {
    type: Boolean,
    default: true,
  },
});

const { cvQueryAll } = useCV();
const router = useRouter();

// Fetch data from API
const cvData = computed(() => cvQueryAll.data.value?.data || []);

// Lazy loading settings
const itemsPerLoad = 6; // Number of items to load per click
const displayedCount = ref(itemsPerLoad); // Number of resumes currently displayed

// Computed property to get displayed resumes
const displayedResumes = computed(() =>
  Array.isArray(cvData.value) ? cvData.value.slice(0, displayedCount.value) : []
);

// Determine if there's more data to load
const hasMoreData = computed(
  () =>
    displayedCount.value <
    (Array.isArray(cvData.value) ? cvData.value.length : 0)
);

// Load more resumes
const loadMore = () => {
  displayedCount.value += itemsPerLoad;
};

// Navigate to specific resume detail page
const goToResume = (resumeId: string) => {
  router.push(`/resumes/${resumeId}`);
};

// Error handling for API fetch
const hasError = computed(() => cvQueryAll.isError.value);

watchEffect(() => {
  if (hasError.value) {
    console.error("Error fetching resumes. Redirecting to login.");
    router.push("/login");
  }
});
</script>

<style scoped>
.list-container {
  margin: 24px 0;
  padding: 0 16px;
  border-radius: 8px;
  padding: 16px 14px;
}

.resume-des {
  text-align: start;
}

.image-container {
  text-align: center;
}

.resume-image {
  max-width: 300px;
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.title-container {
  text-align: center;
  margin-top: 12px;
}
.title-container p {
  padding: 0;
  margin: 0;
}

.see-more-container {
  margin-top: 20px;
  text-align: center;
}

.create-button-container {
  text-align: center;
  margin-top: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 16px 0px;
}

.card {
  margin: 12px 0;
}

/* Ensure consistent gutter spacing on smaller screens */
.ant-row {
  margin-left: -8px !important;
  margin-right: -8px !important;
}
.ant-col {
  padding-left: 8px !important;
  padding-right: 8px !important;
}

.no-data-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-data-message img {
  width: 100%;
  max-width: 500px;
}

@media (max-width: 600px) {
  .resume-des {
    display: none;
  }
  .list-header {
    display: flex;
    justify-content: end;
    align-items: start;
    margin: 0;
  }
}
</style>
