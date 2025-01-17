<template>
  <div>
    <div>
      <h3>Experience</h3>
      <p class="sub-title">Detail your work experiences</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div v-for="(field, index) in fields" :key="index" class="form-row">
        <div>
          <a-form-item label="Job Title">
            <Field
              :name="`fields.${index}.jobTitle`"
              as="a-input"
              placeholder="Job Title"
            />
            <ErrorMessage
              :name="`fields.${index}.jobTitle`"
              class="error-message"
            />
          </a-form-item>

          <a-form-item label="Position">
            <Field
              :name="`fields.${index}.position`"
              as="a-input"
              placeholder="Position"
            />
            <ErrorMessage
              :name="`fields.${index}.position`"
              class="error-message"
            />
          </a-form-item>
        </div>

        <div>
          <!-- Start Date -->
          <DatePickerForm
            :name="`fields.${index}.startDate`"
            label="Start Date"
            placeholder="Select start date"
          />
          <ErrorMessage
            :name="`fields.${index}.startDate`"
            class="error-message"
          />

          <!-- End Date -->
          <DatePickerForm
            :name="`fields.${index}.endDate`"
            label="End Date"
            placeholder="Select end date"
          />
          <ErrorMessage
            :name="`fields.${index}.endDate`"
            class="error-message"
          />
        </div>

        <a-button
          type="link"
          @click="removeField(index)"
          v-if="fields.length > 1"
        >
          <DeleteOutlined :style="{ color: 'red' }" />
        </a-button>
      </div>

      <a-button type="dashed" block @click="addField">
        <span>+ Add Experience</span>
      </a-button>

      <a-button type="primary" html-type="submit" class="submit-btn">
        Submit
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useFieldArray, useForm, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import { DeleteOutlined } from "@ant-design/icons-vue";
import DatePickerForm from "@/components/DatePickerForm.vue"; // Import the DatePickerForm

// Define the validation schema
const ExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job Title is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
});

const FormSchema = z.object({
  fields: z.array(ExperienceSchema),
});

const { handleSubmit, values } = useForm({
  validationSchema: toFieldValidator(FormSchema),
  initialValues: {
    fields: [{ jobTitle: "", position: "", startDate: "", endDate: "" }],
  },
});

const { fields, push, remove } = useFieldArray("fields");

const addField = () => {
  push({ jobTitle: "", position: "", startDate: "", endDate: "" });
};

const removeField = (index: number) => {
  remove(index);
};

const onSubmit = handleSubmit((data) => {
  console.log("Submitted data:", data);
});
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.submit-btn {
  margin-top: 1rem;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
