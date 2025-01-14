<template>
  <header class="header-container">
    <!-- <div class="header-title">Nuxt Dashboard</div> -->
    <section class="user-info">
      <a-avatar
        class="user-avatar"
        size="large"
        src="https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
      />
      <div class="user-details">
        <h3 class="user-name">Samon Rotha</h3>
        <p class="user-role">Set your target role</p>
      </div>
    </section>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header-container {
  margin: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0.5rem;
}
.user-details h3 {
  margin: 0;
}

.user-name {
  font-weight: 500;
}

.user-role {
  color: gray;
}

.user-avatar {
  border: 2px solid var(--secondary-color);
}
</style>
