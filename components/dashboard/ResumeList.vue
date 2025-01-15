<template>
  <div>
    <section class="list-header">
      <!-- Title for the resume list -->
      <p class="resume-des">
        All your resumes, that will help you to find a job.
      </p>

      <!-- Create Button -->
      <div class="create-button-container">
        <a-button type="primary" @click="createResume"
          ><PlusOutlined /> Create</a-button
        >
      </div>
    </section>

    <!-- Resume Cards -->
    <a-row :gutter="16">
      <a-col v-for="resume in paginatedResumes" :key="resume.id" :span="8">
        <a-card :hoverable="true">
          <!-- Image on top and title at the bottom -->
          <a-row align="middle" justify="center">
            <a-col :span="24" class="image-container">
              <NuxtImg
                src="https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9rRzlHZ1dYdG5kVjZpQlhvWGxlNUxRY3Y1Y2R1NjdCQWdrTGJ5OVlGL2ltYWdlLnBuZw~~.png"
                alt="Resume Thumbnail"
                class="resume-image"
              />
            </a-col>
            <a-col :span="24" class="title-container">
              <h3>{{ resume.name }}</h3>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <!-- Pagination -->
    <a-pagination
      :current="currentPage"
      :pageSize="itemsPerPage"
      :total="resumesData.length"
      @change="onPageChange"
      class="pagination"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons-vue";

const resumesData = [
  { id: 1, name: "John Doe", created_at: "2024-01-01" },
  { id: 2, name: "Jane Smith", created_at: "2024-02-01" },
  { id: 3, name: "Alex Brown", created_at: "2024-03-01" },
  { id: 4, name: "Emily Johnson", created_at: "2024-04-01" },
  { id: 5, name: "Michael White", created_at: "2024-05-01" },
  { id: 6, name: "Sarah Lee", created_at: "2024-06-01" },
  { id: 7, name: "David Green", created_at: "2024-07-01" },
];

const itemsPerPage = 3;
const currentPage = ref(1);

const paginatedResumes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return resumesData.slice(startIndex, endIndex);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
};

// Function to handle Create button click
const createResume = () => {
  console.log("Create Resume clicked");
};
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
