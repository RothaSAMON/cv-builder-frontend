<template>
  <div>
    <!-- Hero Section -->
    <LandingHeroSection />

    <!-- Features Section -->
    <section id="features">
      <a-divider orientation="center">Features</a-divider>
      <a-row :gutter="[16, 16]" :justify="'center'">
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          v-for="(feature, index) in features"
          :key="index"
        >
          <a-card :title="feature.title" :extra="feature.icon">
            <p>{{ feature.description }}</p>
          </a-card>
        </a-col>
      </a-row>
    </section>

    <!-- Free Section -->
    <section id="free-section" class="free-section">
      <a-divider orientation="center">Get Started for Free</a-divider>
      <p>
        Start building your professional CV with ease. Our CV builder is
        completely free to use, with no hidden fees. Just sign up and begin!
      </p>
      <a-button type="primary" size="large" href="/signup"
        >Sign Up Now</a-button
      >
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

const features = [
  {
    title: "Customizable Templates",
    description:
      "Choose from a variety of professionally designed templates to suit your style.",
    icon: "📝",
  },
  {
    title: "Easy to Use",
    description:
      "No experience required. Our user-friendly interface guides you step by step.",
    icon: "🚀",
  },
  {
    title: "Download Your CV",
    description: "Once you’re done, download your CV in PDF or DOCX format.",
    icon: "📄",
  },
  {
    title: "Free Forever",
    description:
      "No subscription, no hidden fees. You can create your CV completely free.",
    icon: "💸",
  },
];
</script>

<style scoped>
#features {
  padding: 50px 0;
  background-color: #f9f9f9;
}

#free-section {
  padding: 50px 0;
  background-color: #ffffff;
  text-align: center;
}

#testimonials {
  padding: 50px 0;
  background-color: #f9f9f9;
}

.free-section a-button {
  margin-top: 20px;
}

/* Custom Breakpoints */
@media (max-width: 768px) {
  #free-section {
    padding: 30px 0;
  }

  #testimonials {
    padding: 30px 0;
  }

  .ant-card-body {
    padding: 15px;
  }

  .ant-btn {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  #features .ant-card {
    margin-bottom: 20px;
  }

  #free-section p {
    font-size: 14px;
  }

  .ant-carousel .slick-slide {
    padding: 20px;
  }
}
</style>
