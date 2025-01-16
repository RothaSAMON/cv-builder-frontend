<template>
  <section>
    <div>
      <h3>Contact Me</h3>
      <p class="sub-title">Write down your contact information.</p>
    </div>
    <div class="flex-form-group">
      <InputForm ref="personalPhoneNumberInput" label="Phone Number" />
      <InputForm ref="personalEmailInput" label="Email" />
    </div>
    <a-form-item label="Address">
      <a-textarea
        ref="personalAddressInput"
        rows="4"
        placeholder="Current address"
        v-model="personalAddress"
      />
    </a-form-item>
  </section>
</template>

<script setup>
import InputForm from "~/components/InputForm.vue";
const personalAddress = ref("");
</script>
