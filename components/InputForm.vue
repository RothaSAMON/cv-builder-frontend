<!-- <template>
  <a-input
    class="input-form"
    v-model:value="inputData"
    placeholder="Enter..."
  />
</template>

<script setup>
import { ref } from "vue";

const inputData = ref("");
//Expose inputData to the parent
defineExpose({ inputData });
</script>

<style scoped>
.input-form {
  width: 100%;
}
</style> -->

<template>
  <a-form-item class="w-full" :label="label" :required="required">
    <a-input class="w-full" v-model:value="inputData" placeholder="Enter..." />
  </a-form-item>
</template>

<script setup>
import { ref, defineProps } from "vue";

// Define props for label and required
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const inputData = ref("");

// Expose inputData to the parent component
defineExpose({ inputData });
</script>
