<template>
  <a-form-item class="w-full" :label="label" :name="name">
    <a-input
      class="w-full"
      :id="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </a-form-item>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  label: String,
  placeholder: String,
  modelValue: String,
});
</script>

<!-- <h3>Integration Form</h3>
      <DashboardIntegrationForm
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        v-model:modelValue="formValues.firstName"
      /> -->
