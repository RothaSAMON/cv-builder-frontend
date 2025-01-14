<template>
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1 class="hero-title">Welcome to Our Landing Page!</h1>
      <p class="hero-subtitle">
        Discover amazing features and solutions tailored for your needs.
      </p>
      <a-button type="primary" size="large" class="primary-button">
        Get Started
      </a-button>
    </div>
  </section>

  <NuxtPage />

  <!-- Feature Section -->
  <section class="features">
    <div class="container features-grid">
      <div class="feature-item">
        <div class="icon">
          <i class="fas fa-bolt icon-blue"></i>
        </div>
        <h3 class="feature-title">Fast Performance</h3>
        <p class="feature-text">
          Experience lightning-fast speeds and smooth performance.
        </p>
      </div>

      <div class="feature-item">
        <div class="icon">
          <i class="fas fa-shield-alt icon-green"></i>
        </div>
        <h3 class="feature-title">Secure</h3>
        <p class="feature-text">
          Your data is safe with our top-notch security measures.
        </p>
      </div>

      <div class="feature-item">
        <div class="icon">
          <i class="fas fa-heart icon-red"></i>
        </div>
        <h3 class="feature-title">User Friendly</h3>
        <p class="feature-text">
          Designed with simplicity and ease of use in mind.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.hero {
  text-align: center;
  padding: 4rem;
  background-color: #f3f4f6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333333;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #555555;
  margin-bottom: 1.5rem;
}

.primary-button {
  background-color: #41BBFF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.primary-button:hover {
  background-color: #0056b3;
}

/* Feature Section */
.features {
  background-color: white;
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.feature-item {
  padding: 2rem;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.icon-blue {
  color: #007bff;
}

.icon-green {
  color: #28a745;
}

.icon-red {
  color: #dc3545;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
}

.feature-text {
  color: #555555;
}
</style>
