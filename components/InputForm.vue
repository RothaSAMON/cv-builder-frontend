<template>
  <a-input
    class="input-form"
    v-model:value="inputData"
    placeholder="Enter some data"
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
</style>
