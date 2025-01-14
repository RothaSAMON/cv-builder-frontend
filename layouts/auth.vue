<template>
  <div class="container">
    <!-- Form Section -->
    <div class="form-section">
      <NuxtPage />
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <NuxtImg
        src="https://weezly.com/wp-content/uploads/2023/07/146.jpg"
        alt="Sales Report"
        class="full-size-image"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}

.form-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-section {
  background-color: #2a80c3;
  flex: 1;
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.full-size-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
