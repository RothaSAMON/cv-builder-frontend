<!-- <template>
  <div class="m-2 flex justify-end items-center px-6">
    <section class="flex items-center gap-4">
      <a-avatar
        size="large"
        src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
      />
      <div class="flex flex-col justify-center mt-2">
        <h3 class="font-medium">Samon Rotha</h3>
        <p class="text-gray-500">Set your target role</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script> -->

<template>
  <div class="header-container">
    <!-- <div class="header-title">Nuxt Dashboard</div> -->
    <section class="user-info">
      <a-avatar
        size="large"
        src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
      />
      <div class="user-details">
        <h3 class="user-name">Samon Rotha</h3>
        <p class="user-role">Set your target role</p>
      </div>
    </section>
  </div>
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

.user-name {
  font-weight: 500;
}

.user-role {
  color: gray;
}
</style>
