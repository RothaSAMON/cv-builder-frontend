<template>
  <div>
    <div>
      <h3>Languages</h3>
      <p class="sub-title">Write down the specific languages</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div v-for="(field, index) in fields" :key="index" class="form-row">
        <!-- Language Field -->
        <a-form-item class="w-full" label="Language">
          <Field
            :name="`fields.${index}.language`"
            as="a-input"
            placeholder="Language"
          />
          <ErrorMessage
            :name="`fields.${index}.language`"
            class="error-message"
          />
        </a-form-item>

        <!-- Level Select Field -->
        <a-form-item class="w-full" label="Level">
          <Field
            :name="`fields.${index}.level`"
            as="a-select"
            placeholder="Select Level"
          >
            <a-select-option value="Beginner">Beginner</a-select-option>
            <a-select-option value="Intermediate">Intermediate</a-select-option>
            <a-select-option value="Advanced">Advanced</a-select-option>
            <a-select-option value="Fluent">Fluent</a-select-option>
          </Field>
          <ErrorMessage :name="`fields.${index}.level`" class="error-message" />
        </a-form-item>

        <!-- Remove Field Button -->
        <a-button
          type="link"
          @click="removeField(index)"
          v-if="fields.length > 1"
        >
          <DeleteOutlined :style="{ color: 'red' }" />
        </a-button>
      </div>

      <!-- Add Language Button -->
      <a-button type="dashed" block @click="addField">
        <span>+ Add Language</span>
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
import type { UpdateLanguageContent } from "~/types/section";
import { useSection } from "~/composables/useSection";

// Validation schema for each language field
const LanguageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  level: z.string().min(1, "Level is required"), // Ensure a level is selected
});

const FormSchema = z.object({
  fields: z.array(LanguageSchema),
});

// Initialize the form with validation
const { handleSubmit, values } = useForm({
  validationSchema: toFieldValidator(FormSchema),
  initialValues: {
    fields: [], // Populated dynamically from props
  },
});

// Dynamic field management
const { fields, push, remove } = useFieldArray("fields");

// Add new language field
const addField = () => {
  push({ language: "", level: "" });
};

// Remove a language field
const removeField = (index: number) => {
  remove(index);
};

// Props for preloaded language data
const props = defineProps<{ languages: UpdateLanguageContent[] }>();

// Populate initial fields with preloaded data
if (props.languages) {
  props.languages.forEach((language) => {
    push({ language: language.language, level: language.level });
  });
}

// Patch functionality
const { updateSection } = useSection();
const route = useRoute();
const cvId = route.params.id as string;

const onSubmit = handleSubmit(async (data) => {
  // Format payload for the backend
  const requestBody = {
    type: "Languages", // Fixed type
    content: data.fields.map((field) => ({
      language: field.language,
      level: field.level,
    })),
  };

  try {
    // Send the formatted data to the backend
    const response = await updateSection.mutateAsync({
      cvId: cvId, // Example CV ID (replace with dynamic value)
      updateContent: requestBody,
    });

    console.log("Successfully updated languages:", response);
  } catch (error) {
    console.error("Error updating languages:", error);
  }

  console.log("Submitted Payload:", requestBody);
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
