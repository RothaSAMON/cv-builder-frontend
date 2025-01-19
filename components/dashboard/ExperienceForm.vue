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
            <Field
              :name="`fields.${index}.startDate`"
              as="a-input"
              type="date"
              placeholder="Start Date"
            />
            <ErrorMessage
              :name="`fields.${index}.startDate`"
              class="error-message"
            />
          </a-form-item>

          <!-- End Date -->
          <a-form-item class="w-full" label="End Date">
            <Field
              :name="`fields.${index}.endDate`"
              as="a-input"
              type="date"
              placeholder="End Date"
            />
            <ErrorMessage
              :name="`fields.${index}.endDate`"
              class="error-message"
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
import { optional, z } from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import { DeleteOutlined } from "@ant-design/icons-vue";
import TextAreaForm from "@/components/TextAreaForm.vue"; // TextAreaForm component
import type { UpdateExperienceContent } from "~/types/section";
import { useSection } from "~/composables/useSection";

// Props received from the parent
const props = defineProps<{
  experiences: UpdateExperienceContent[];
}>();

// Validation schema for an individual experience
const ExperienceSchema = z.object({
  jobTitle: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
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
    fields: props.experiences || [],
  },
});

const { fields, push, remove } = useFieldArray("fields");

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

// Patch functionality
const { updateSection } = useSection();

const onSubmit = handleSubmit(async (data) => {
  // Format payload for the backend
  const requestBody = {
    type: "Experiences",
    content: data.fields.map((field) => ({
      jobTitle: field.jobTitle,
      position: field.position,
      startDate: field.startDate,
      endDate: field.endDate,
      description: field.description || "",
    })),
  };

  try {
    // Send the formatted data to the backend
    const response = await updateSection.mutateAsync({
      cvId: "678b5c8f0845662ccece9520", // Replace with dynamic CV ID
      updateContent: requestBody,
    });

    console.log("Successfully updated experiences:", response);
  } catch (error) {
    console.error("Error updating experiences:", error);
  }

  console.log("Submitted Payload:", requestBody);
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
