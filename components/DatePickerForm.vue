<template>
  <a-date-picker
    class="date-form"
    v-model:value="selectedDate"
    @change="emitDate"
  />
</template>

<script setup>
import { ref } from "vue";

const selectedDate = ref(null);

const emitDate = () => {
  console.log("Selected Date:", selectedDate.value);
};

defineExpose({ selectedDate });
</script>

<style scoped>
.date-form {
  width: 100%;
}
</style>
