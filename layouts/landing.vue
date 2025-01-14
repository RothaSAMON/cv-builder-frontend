<template>
  <a-layout>
    <BaseNavbar />

    <a-layout-content class="content-container">
      <!-- Hero Section -->
      <!-- <section class="hero bg-gray-100 py-16 text-center">
        <div class="container mx-auto px-6">
          <h1 class="text-4xl font-bold mb-4 text-main-text-color">
            Welcome to Our Landing Page!
          </h1>
          <p class="text-lg text-gray-600 mb-6">
            Discover amazing features and solutions tailored for your needs.
          </p>
          <a-button
            type="primary"
            size="large"
            class="bg-blue-500 hover:bg-blue-600"
          >
            Get Started
          </a-button>
        </div>
      </section> -->

      <NuxtPage />

      <!-- Feature Section -->
      <!-- <section class="features bg-white py-16">
        <div
          class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div class="feature-item text-center">
            <div class="icon mb-4">
              <i class="fas fa-bolt text-blue-500 text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-main-text-color">
              Fast Performance
            </h3>
            <p class="text-gray-600">
              Experience lightning-fast speeds and smooth performance.
            </p>
          </div>

          <div class="feature-item text-center">
            <div class="icon mb-4">
              <i class="fas fa-shield-alt text-green-500 text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-main-text-color">
              Secure
            </h3>
            <p class="text-gray-600">
              Your data is safe with our top-notch security measures.
            </p>
          </div>

          <div class="feature-item text-center">
            <div class="icon mb-4">
              <i class="fas fa-heart text-red-500 text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-main-text-color">
              User Friendly
            </h3>
            <p class="text-gray-600">
              Designed with simplicity and ease of use in mind.
            </p>
          </div>
        </div>
      </section> -->
    </a-layout-content>

    <!-- <Footer /> -->
  </a-layout>
</template>

<script setup lang="ts">
// Import your components
import Header from "@/components/Header.vue";
// import Footer from "@/components/Footer.vue";
</script>

<style scoped>
.hero {
  background: url("path/to/hero-image.jpg") no-repeat center center / cover;
}
.content-container {
  background-color: white !important; /* Force white background */
  min-height: 100vh; /* Ensure full height */
  margin: 0;
  padding: 0;
}
</style>
