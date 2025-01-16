<template>
  <div>
    <div>
      <h3>Education</h3>
      <p class="sub-title">Provide details about your educational background</p>
    </div>

    <a-form @submit.prevent="onSubmit" layout="vertical">
      <div v-for="(field, index) in fields" :key="index" class="form-row">
        <section>
          <div class="form-row">
            <a-form-item label="School Name">
              <Field
                :name="`fields.${index}.schoolName`"
                as="a-input"
                placeholder="School Name"
              />
              <ErrorMessage
                :name="`fields.${index}.schoolName`"
                class="error-message"
              />
            </a-form-item>

            <a-form-item label="Degree/Major">
              <Field
                :name="`fields.${index}.degreeMajor`"
                as="a-input"
                placeholder="Degree/Major"
              />
              <ErrorMessage
                :name="`fields.${index}.degreeMajor`"
                class="error-message"
              />
            </a-form-item>
          </div>

          <div class="form-row">
            <a-form-item label="Start Date">
              <Field
                :name="`fields.${index}.startDate`"
                as="a-input"
                placeholder="Start Date"
              />
              <ErrorMessage
                :name="`fields.${index}.startDate`"
                class="error-message"
              />
            </a-form-item>

            <a-form-item label="End Date">
              <Field
                :name="`fields.${index}.endDate`"
                as="a-input"
                placeholder="End Date"
              />
              <ErrorMessage
                :name="`fields.${index}.endDate`"
                class="error-message"
              />
            </a-form-item>
          </div>
        </section>

        <a-button
          type="link"
          @click="removeField(index)"
          v-if="fields.length > 1"
        >
          <DeleteOutlined :style="{ color: 'red' }" />
        </a-button>
      </div>

      <a-button type="dashed" block @click="addField">
        <span>+ Add Education</span>
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

// Define the validation schema
const EducationSchema = z.object({
  schoolName: z.string().min(1, "School Name is required"),
  degreeMajor: z.string().min(1, "Degree/Major is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
});

const FormSchema = z.object({
  fields: z.array(EducationSchema),
});

const { handleSubmit, values } = useForm({
  validationSchema: toFieldValidator(FormSchema),
  initialValues: {
    fields: [
      {
        schoolName: "",
        degreeMajor: "",
        startDate: "",
        endDate: "",
      },
    ],
  },
});

const { fields, push, remove } = useFieldArray("fields");

const addField = () => {
  push({ schoolName: "", degreeMajor: "", startDate: "", endDate: "" });
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
