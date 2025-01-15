<template>
  <div class="container">
    <DashboardPageHeader
      title="Resumes Action"
      subTitle="Create your resumes to find a job"
      :breadcrumbRoutes="routes"
    />

    <div class="split-screen">
      <!-- Left Side -->
      <div class="left-section">
        <!-- Personal Details Section -->
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
          <!-- <InputForm ref="personalSummaryInput" label="Summary" /> -->

          <a-form-item label="Summary">
            <a-textarea
              ref="personalSummaryInput"
              rows="4"
              placeholder="Write a brief summary about yourself"
              v-model="personalSummary"
            />
          </a-form-item>
        </section>

        <!-- Contact Me Section -->
        <section>
          <div>
            <h3>Contact Me</h3>
            <p class="sub-title">Write down your contact information.</p>
          </div>

          <div class="flex-form-group">
            <InputForm ref="personalPhoneNumberInput" label="Phone Number" />
            <InputForm ref="personalEmailInput" label="Email" />
          </div>
          <!-- <InputForm ref="personalAddressInput" label="Address" /> -->

          <a-form-item label="Address">
            <a-textarea
              ref="personalAddressInput"
              rows="4"
              placeholder="Current address"
              v-model="personalSummary"
            />
          </a-form-item>
        </section>

        <!-- Reference Section -->
        <section>
          <div>
            <h3>Reference</h3>
            <p class="sub-title">
              Tell about the Reference person
            </p>
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

        <!-- Submit Button -->
        <div class="submit-container">
          <a-button type="primary" @click="handleSubmit" class="submit-button">
            Submit
          </a-button>
        </div>
      </div>

      <!-- Right Side -->
      <div class="right-section">
        <h3>Preview Resume</h3>
        <!-- Add the content for preview -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputForm from "~/components/InputForm.vue";
import DatePickerForm from "~/components/DatePickerForm.vue";

definePageMeta({
  layout: "default",
});

const routes = [
  { path: "/resumes", breadcrumbName: "Resumes" },
  { path: "/resumes/:id", breadcrumbName: "Resumes Action" },
];

const firstNameInput = ref(null);
const lastNameInput = ref(null);
const personalPositionInput = ref(null);
const personalSummaryInput = ref(null);
const personalPhoneNumberInput = ref(null);
const personalEmailInput = ref(null);
const personalAddressInput = ref(null);
const refFirstNameInput = ref(null);
const refLastNameInput = ref(null);
const refPositionInput = ref(null);
const refEmailInput = ref(null);
const refPhoneNumberInput = ref(null);
const refCompanyInput = ref(null);
const startDateInput = ref(null);

const handleSubmit = () => {
  console.log("First Name:", firstNameInput.value?.inputData);
  console.log("Last Name:", lastNameInput.value?.inputData);
  console.log("Position:", personalPositionInput.value?.inputData);
  console.log("Summary:", personalSummaryInput.value?.inputData);
  console.log("Phone Number:", personalPhoneNumberInput.value?.inputData);
  console.log("Email:", personalEmailInput.value?.inputData);
  console.log("Address:", personalAddressInput.value?.inputData);
  console.log("Reference First Name:", refFirstNameInput.value?.inputData);
  console.log("Reference Last Name:", refLastNameInput.value?.inputData);
  console.log("Reference Position:", refPositionInput.value?.inputData);
  console.log("Reference Email:", refEmailInput.value?.inputData);
  console.log("Reference Phone Number:", refPhoneNumberInput.value?.inputData);
  console.log("Reference Company:", refCompanyInput.value?.inputData);
  console.log("Start Date:", startDateInput.value?.selectedDate);

  // Clear inputs after submission
  [
    firstNameInput,
    lastNameInput,
    personalPositionInput,
    personalSummaryInput,
    personalPhoneNumberInput,
    personalEmailInput,
    personalAddressInput,
    refFirstNameInput,
    refLastNameInput,
    refPositionInput,
    refEmailInput,
    refPhoneNumberInput,
    refCompanyInput,
  ].forEach((input) => (input.value.inputData = ""));
  startDateInput.value.selectedDate = null;
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.split-screen {
  display: flex;
  gap: 20px;
  margin: 24px 0;
}

.left-section {
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.left-section section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.right-section {
  flex: 2;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  position: sticky;
  top: 20px;
  height: 100vh;
  overflow-y: auto;
}

.submit-container {
  margin-top: 20px;
  text-align: center;
}

.submit-button {
  width: 100%;
}

/* Add styles for form labels */
::v-deep(.ant-form-item-label > label) {
  color: var(--sub-text-color);
}
</style>
