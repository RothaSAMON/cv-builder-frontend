<template>
  <section>
    <div>
      <h3>Reference</h3>
      <p class="sub-title">Tell about the Reference person</p>
    </div>
    <div class="flex-form-group">
      <InputForm ref="refFirstNameInput" label="First Name" />
      <InputForm ref="refLastNameInput" label="Last Name" />
    </div>
    <div class="flex-form-group">
      <InputForm ref="refPositionInput" label="Position" />
      <InputForm ref="refEmailInput" label="Email" />
    </div>
    <div class="flex-form-group">
      <InputForm ref="refPhoneNumberInput" label="Phone Number" />
      <InputForm ref="refCompanyInput" label="Company" />
    </div>
    <a-form-item label="Start Date">
      <DatePickerForm ref="startDateInput" />
    </a-form-item>
  </section>
</template>

<script setup>
import InputForm from "~/components/InputForm.vue";
import DatePickerForm from "~/components/DatePickerForm.vue";
</script>
