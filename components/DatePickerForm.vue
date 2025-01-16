<template>
  <a-form-item class="form-item" :label="label" :required="required" :rules="rules">
    <a-date-picker
      class="date-form"
      v-model:value="selectedDate"
      @change="emitDate"
      :placeholder="placeholder"
    />
  </a-form-item>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const selectedDate = ref(null);

const emitDate = () => {
  console.log("Selected Date:", selectedDate.value);
};

defineExpose({ selectedDate });

defineProps({
  label: {
    type: String,
    default: "Date Picker",
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Select a date",
  },
});
</script>

<style scoped>
.form-item,
.date-form {
  width: 100%;
}
</style>
