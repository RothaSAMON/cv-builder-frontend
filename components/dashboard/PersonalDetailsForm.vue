<template>
  <section>
    <div>
      <h3>Personal Details</h3>
      <p class="sub-title">Fill in your personal informations</p>
    </div>
    <div class="flex-form-group">
      <InputForm ref="firstNameInput" label="First Name" required />
      <InputForm ref="lastNameInput" label="Last Name" required />
    </div>
    <InputForm ref="personalPositionInput" label="Position" />
    <a-form-item label="Summary">
      <a-textarea
        ref="personalSummaryInput"
        rows="4"
        placeholder="Write a brief summary about yourself"
        v-model="personalSummary"
      />
    </a-form-item>
  </section>
</template>

<script setup>
import InputForm from "~/components/InputForm.vue";
const personalSummary = ref("");
</script>
