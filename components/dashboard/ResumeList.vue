<template>
  <div>
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
    <a-row :gutter="16">
      <!-- Dynamically render fetched resumes -->
      <a-col
        v-for="resume in paginatedResumes"
        :key="resume._id"
        :span="8"
        @click="goToResume(resume._id)"
      >
        <a-card :hoverable="true">
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
              <h3>{{ resume.title }}</h3>
              <p class="sub-title">
                Created by: {{ resume.userId.firstName }}
                {{ resume.userId.lastName }}
              </p>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <!-- Pagination -->
    <a-pagination
      :current="currentPage"
      :pageSize="itemsPerPage"
      @change="onPageChange"
      class="pagination"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useCV } from "../../composables/useCv";

// Props
defineProps({
  showCreateButton: {
    type: Boolean,
    default: true,
  },
});

const { cvQueryAll, createCV } = useCV();
const router = useRouter();

// Create CV Mutation
// const { mutate: createCVMutation } = createCV();

// Fetch data from API
const cvData = computed(() => cvQueryAll.data.value || []);

const itemsPerPage = 100;
const currentPage = ref(1);

// Paginated resumes based on current page
const paginatedResumes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return cvData.value.slice(startIndex, endIndex);
});

// Change page
const onPageChange = (page: number) => {
  currentPage.value = page;
};

// Navigate to specific resume detail page
const goToResume = (resumeId: string) => {
  router.push(`/resumes/${resumeId}`);
};

// Create a new resume with default data
const createResume = () => {
  const defaultData = {
    title: "Untitled",
    previewImageUrl:
      "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT.jpg",
    templateUrl:
      "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT.jpg",
  };

  console.log("Creating CV with the following data:", defaultData);

  const formData = new FormData();
  formData.append("title", defaultData.title);
  formData.append("previewImageUrl", defaultData.previewImageUrl);
  formData.append("templateUrl", defaultData.templateUrl);

  //   createCVMutation(formData, {
  //     onSuccess: (response) => {
  //       console.log("Resume created successfully!", response);

  //       // Navigate to the newly created resume's detail page
  //       const resumeId = response?.data?._id || "678b5f6cef831fcc10b8cde3"; // Replace with actual response data structure
  //       router.push(`/resumes/${resumeId}`);
  //     },
  //     onError: (error) => {
  //       console.error("Error creating resume", error);
  //     },
  //   });
};

const hasError = computed(() => cvQueryAll.isError.value);

watchEffect(() => {
  if (hasError.value) {
    console.error("Error fetching resumes. Redirecting to login.");
    router.push("/login");
  }
});
</script>

<style scoped>
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

.pagination {
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
</style>
