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
            <!-- School Name -->
            <a-form-item class="w-full" label="School Name">
              <Field
                class="w-full"
                :name="`fields.${index}.schoolName`"
                as="a-input"
                placeholder="School Name"
              />
              <ErrorMessage
                :name="`fields.${index}.schoolName`"
                class="error-message"
              />
            </a-form-item>

            <!-- Degree/Major -->
            <a-form-item class="w-full" label="Degree/Major">
              <Field
                class="w-full"
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
            <!-- Start Date -->
            <a-form-item class="w-full" label="Start Date">
              <input
                class="w-full input-date"
                type="date"
                :name="`fields.${index}.startDate`"
                :value="formatDate(props.education[index]?.startDate)"
                @input="updateStartDate($event, index)"
              />
            </a-form-item>

            <!-- End Date -->
            <a-form-item class="w-full" label="End Date">
              <input
                class="w-full input-date"
                type="date"
                :name="`fields.${index}.endDate`"
                :value="formatDate(props.education[index]?.endDate)"
                @input="updateEndDate($event, index)"
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

  <CustomAlert
    v-if="alertStore.isVisible"
    :type="alertStore.type"
    :message="alertStore.message"
  />
</template>

<script setup lang="ts">
import { useFieldArray, useForm, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import { DeleteOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import { useAlertStore } from "~/store/alertStore";

// Props received from the parent
const props = defineProps<{
  education: Array<{
    schoolName: string;
    degreeMajor: string;
    startDate: string;
    endDate: string;
  }>;
}>();

// Validation schema for an individual education entry
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
    fields: props.education || [],
  },
});

// Add a new field
const addField = () => {
  push({ schoolName: "", degreeMajor: "", startDate: "", endDate: "" });
};

// Remove a field
const removeField = (index: number) => {
  remove(index);
};

const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const { fields, push, remove } = useFieldArray<{
  schoolName: string;
  degreeMajor: string;
  startDate: string;
  endDate: string;
}>("fields");

const updateStartDate = (event: Event, index: number) => {
  const newStartDate = (event.target as HTMLInputElement).value;
  const { value } = fields.value[index];
  value.startDate = newStartDate;
};

const updateEndDate = (event: Event, index: number) => {
  const newEndDate = (event.target as HTMLInputElement).value;
  const { value } = fields.value[index];
  value.endDate = newEndDate;
};

const { updateSection } = useSection();
const alertStore = useAlertStore();
const route = useRoute();
const cvId = route.params.id as string;

// Submit form handler
const onSubmit = handleSubmit(async (data) => {
  const requestBody = {
    type: "Education",
    content: data.fields.map((fields) => ({
      schoolName: fields.schoolName,
      degreeMajor: fields.degreeMajor,
      startDate: fields.startDate,
      endDate: fields.endDate,
    })),
  };

  try {
    const response = await updateSection.mutateAsync({
      cvId: cvId,
      updateContent: requestBody,
    });

    if (response) {
      alertStore.showAlert({
        message: response.message,
        type: "success",
        duration: 5000,
      });
    }
  } catch (error: any) {
    alertStore.showAlert({
      message: error.response.data.message,
      type: "error",
      duration: 5000,
    });
  }
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

.input-date {
  width: 100%;
}
</style>
