<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    :title="title"
    :breadcrumb="{ routes: breadcrumbRoutes }"
    :sub-title="subTitle"
  />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  breadcrumbRoutes: {
    type: Array,
    required: true,
  },
});
</script>
