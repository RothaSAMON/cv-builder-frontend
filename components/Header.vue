<template>
  <header class="header-container">
    <section class="user-info" @click="toggleDropdown">
      <a-avatar
        class="user-avatar"
        size="large"
        src="https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
      />
      <div class="user-details">
        <h3 class="user-name">Samon Rotha</h3>
        <p class="user-role">Set your target role</p>
      </div>
      <span class="dropdown-icon" :class="{ rotated: isDropdownOpen }">▼</span>
    </section>

    <!-- User Details Dropdown -->
    <transition name="fade">
      <div v-if="isDropdownOpen" class="dropdown-details">
        <p><strong>First Name:</strong> John</p>
        <p><strong>Last Name:</strong> Doe</p>
        <p><strong>Gender:</strong> Male</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
.header-container {
  margin: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.5rem;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
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

.dropdown-icon {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-details {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 100;
  width: 250px;
}

.dropdown-details p {
  margin: 0.5rem 0;
}

.dropdown-details p strong {
  color: var(--text-color);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
