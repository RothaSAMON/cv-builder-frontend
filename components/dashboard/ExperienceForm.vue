<template>
  <div>
    <div>
      <h3>Experience</h3>
      <p class="sub-title">Detail your work experiences</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div v-for="(field, index) in fields" :key="index" class="form-row">
        <div class="flex-form-group">
          <!-- Job Title -->
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

          <!-- Position -->
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

        <div class="flex-form-group">
          <!-- Start Date -->
          <a-form-item class="w-full" label="Start Date">
            <input
              class="w-full input-date"
              type="date"
              :name="`fields.${index}.startDate`"
              :value="formatDate(props.experiences[index]?.startDate)"
              @input="updateStartDate($event, index)"
            />
          </a-form-item>

          <!-- End Date -->
          <a-form-item class="w-full" label="End Date">
            <input
              class="w-full input-date"
              type="date"
              :name="`fields.${index}.endDate`"
              :value="formatDate(props.experiences[index]?.endDate)"
              @input="updateEndDate($event, index)"
            />
          </a-form-item>
        </div>

        <!-- Description -->
        <TextAreaForm
          :name="`fields.${index}.description`"
          label="Description"
          placeholder="Write a brief description of your responsibilities"
          :rows="4"
        />
        <ErrorMessage
          :name="`fields.${index}.description`"
          class="error-message"
        />

        <!-- Remove Button -->
        <a-button
          type="link"
          @click="removeField(index)"
          v-if="fields.length > 1"
        >
          <DeleteOutlined :style="{ color: 'red' }" />
        </a-button>
      </div>

      <!-- Add Experience Button -->
      <a-button type="dashed" block @click="addField">
        <span>+ Add Experience</span>
      </a-button>

      <!-- Submit Button -->
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
import TextAreaForm from "@/components/TextAreaForm.vue"; // TextAreaForm component
import dayjs from "dayjs";

// Props received from the parent
const props = defineProps<{
  experiences: Array<{
    jobTitle: string;
    position: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
}>();

// Validation schema for an individual experience
const ExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job Title is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  description: z.string().optional(),
});

// Schema for the entire form
const FormSchema = z.object({
  fields: z.array(ExperienceSchema),
});

// Initialize the form with validation schema and initial values
const { handleSubmit, values } = useForm({
  validationSchema: toFieldValidator(FormSchema),
  initialValues: {
    fields: props.experiences || [], // Use the passed experiences or an empty array
  },
});

const { fields, push, remove } = useFieldArray("fields");

// Format date to the required format for the input[type="date"] field (YYYY-MM-DD)
const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD"); // Ensure the date is in the correct format
};

// Update startDate
const updateStartDate = (event: Event, index: number) => {
  const newStartDate = (event.target as HTMLInputElement).value;
  props.experiences[index].startDate = newStartDate;
};

// Update endDate
const updateEndDate = (event: Event, index: number) => {
  const newEndDate = (event.target as HTMLInputElement).value;
  props.experiences[index].endDate = newEndDate;
};

// Add a new field
const addField = () => {
  push({
    jobTitle: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
};

// Remove a field
const removeField = (index: number) => {
  remove(index);
};

// Submit form handler
const onSubmit = handleSubmit((data) => {
  console.log("Submitted data:", data);
});
</script>

<style scoped>
.form-row {
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
