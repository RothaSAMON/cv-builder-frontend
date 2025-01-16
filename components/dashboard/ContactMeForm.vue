<template>
  <section>
    <div>
      <h3>Contact Me</h3>
      <p class="sub-title">Write down your contact information.</p>
    </div>
    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div class="flex-form-group">
        <InputForm name="personalPhoneNumber" placeholder="+855 123 456" label="Phone Number" />
        <InputForm name="personalEmail" placeholder="example@gmail.com" label="Email" />
      </div>
      <a-form-item label="Address">
        <a-textarea 
          name="personalAddress" 
          placeholder="Current address" 
          @input="setFieldValue('personalAddress', $event.target.value)" 
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as z from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import InputForm from "~/components/InputForm.vue";

const schema = z.object({
  personalPhoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  personalEmail: z.string().email("Invalid email format"),
  personalAddress: z.string().min(1, "Address is required"),
});

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toFieldValidator(schema),
});

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted successfully:", values);
});
</script>
