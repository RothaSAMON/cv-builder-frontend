<template>
  <section>
    <div>
      <h3>Reference</h3>
      <p class="sub-title">Tell about the Reference person</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div class="flex-form-group">
        <InputForm
          :initial-value="formValues.refFirstName"
          name="refFirstName"
          placeholder="First Name"
          label="First Name"
        />
        <InputForm
          :initial-value="formValues.refLastName"
          name="refLastName"
          placeholder="Last Name"
          label="Last Name"
        />
      </div>

      <div class="flex-form-group">
        <InputForm
          :initial-value="formValues.refPosition"
          name="refPosition"
          placeholder="Position"
          label="Position"
        />
        <InputForm
          :initial-value="formValues.refEmail"
          name="refEmail"
          placeholder="example@gmail.com"
          label="Email"
        />
      </div>

      <div class="flex-form-group">
        <InputForm
          :initial-value="formValues.refPhoneNumber"
          name="refPhoneNumber"
          placeholder="+855 123 456"
          label="Phone Number"
        />
        <InputForm
          :initial-value="formValues.refCompany"
          name="refCompany"
          placeholder="Company Name"
          label="Company"
        />
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
<!-- 
    <div>
      <h3>Reference Information</h3>
      <p>First Name: {{ formValues.refFirstName }}</p>
      <p>Last Name: {{ formValues.refLastName }}</p>
      <p>Position: {{ formValues.refPosition }}</p>
      <p>Email: {{ formValues.refEmail }}</p>
      <p>Phone Number: {{ formValues.refPhoneNumber }}</p>
      <p>Company: {{ formValues.refCompany }}</p>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as z from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import InputForm from "~/components/InputForm.vue";
import type { UpdateReferenceContent } from "~/types/section";

const props = defineProps<{ references: UpdateReferenceContent[] }>();

const formValues = reactive({
  refFirstName: props?.references[0]?.firstName || "",
  refLastName: props?.references[0]?.lastName || "",
  refPosition: props?.references[0]?.position || "",
  refEmail: props?.references[0]?.email || "",
  refPhoneNumber: props?.references[0]?.phoneNumber || "",
  refCompany: props?.references[0]?.company || "",
});

const schema = z.object({
  refFirstName: z.string().min(1, "First name is required"),
  refLastName: z.string().min(1, "Last name is required"),
  refPosition: z.string().min(1, "Position is required"),
  refEmail: z.string().email("Invalid email format"),
  refPhoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  refCompany: z.string().min(1, "Company name is required"),
});

const { handleSubmit } = useForm({
  validationSchema: toFieldValidator(schema),
});

const onSubmit = handleSubmit((values) => {
  console.log("Reference Form Submitted:", values);
});
</script>

<style scoped>
.flex-form-group {
  display: flex;
  gap: 16px;
}
.sub-title {
  color: #888;
  font-size: 14px;
}
</style>
