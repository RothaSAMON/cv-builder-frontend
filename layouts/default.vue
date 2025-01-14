<template>
  <a-layout class="min-h-screen">
    <Sidebar />
    <a-layout>
      <Header />
      <a-layout-content>
        <NuxtPage />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts"></script>
