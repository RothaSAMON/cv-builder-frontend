<template>
  <section class="export-button">
    <a-button @click="exportAsPDF">Export as PDF</a-button>
  </section>
  <div class="right-section">
    <section
      ref="resumeSection"
      class="resume-template"
      :style="{ backgroundImage: 'url(' + selectedTemplate + ')' }"
    >
      <!-- Profile Image -->
      <NuxtImg
        class="profile-image"
        :style="{ backgroundImage: 'url(' + personalSection?.imageUrl + ')' }"
      />

      <!-- Dummy data overlay on resume -->
      <section class="personal-detail">
        <h2 class="name-section">
          {{ personalSection?.firstName }} {{ personalSection?.lastName }}
        </h2>
        <h3 class="title-section">{{ personalSection?.position }}</h3>
      </section>

      <div class="content-container">
        <!-- The left side of Resume -->
        <section class="left-container">
          <section class="contact-section">
            <h3 class="section-title">Contact Me</h3>
            <p>{{ contactSection?.phoneNumber }}</p>
            <p>{{ contactSection.email }}</p>
            <p>{{ contactSection.address }}</p>
            <hr />
          </section>

          <section class="skills-section">
            <h3 class="section-title">Skills</h3>
            <ul>
              <li v-for="(skill, index) in skillsSection" :key="index">
                <span class="skill-name">{{ skill.name }}</span> :
                <span class="skill-level">{{ skill.level }}</span>
              </li>
            </ul>
            <hr />
          </section>

          <section class="languages-section">
            <h3 class="section-title">Language</h3>
            <ul>
              <li v-for="(language, index) in languageSection" :key="index">
                <span class="language-name">{{ language.language }}</span> :
                <span class="language-level">{{ language.level }}</span>
              </li>
            </ul>
            <hr />
          </section>

          <section class="reference-section">
            <h3 class="section-title">Reference</h3>

            <div v-for="(reference, index) in referenceSection" :key="index">
              <p>{{ reference.firstName }} {{ reference.lastName }}</p>
              <p>{{ reference.company }}</p>
              <p>{{ reference.position }}</p>
              <p>{{ reference.email }}</p>
              <p>{{ reference.phoneNumber }}</p>
              <br />
            </div>
          </section>
        </section>

        <!-- The right side of Resume -->
        <section class="right-container">
          <section class="summary-section">
            <h3 class="section-title">About</h3>
            <p>{{ personalSection?.summary }}</p>
            <hr />
          </section>

          <section class="experiences-section">
            <h3 class="section-title">Experience</h3>

            <div v-for="(experience, index) in experienceSection" :key="index">
              <p>{{ experience.jobTitle }}</p>
              <p>{{ experience.position }}</p>
              <p class="sub-title">{{ experience.description }}</p>
              <p class="sub-title">
                {{ experience.startDate }} - {{ experience.endDate }}
              </p>
              <br />
            </div>
            <hr />
          </section>

          <section class="educations-section">
            <h3 class="section-title">Education</h3>

            <div v-for="(education, index) in educationSection" :key="index">
              <p>{{ education.degreeMajor }}</p>
              <p class="sub-title">{{ education.schoolName }}</p>
              <p class="sub-title">{{ education.startDate }} - {{ education.endDate }}</p>
              <br />
            </div>
          </section>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import type {
  SectionKeys,
  UpdateContactContent,
  UpdateEducationContent,
  UpdateExperienceContent,
  UpdateLanguageContent,
  UpdatePersonalContent,
  UpdateReferenceContent,
  UpdateSectionSchemasTypes,
  UpdateSkillContent,
} from "~/types/section";
import type { UpdateSection } from "~/types/section";
// import { html2pdf } from "html2pdf.js";

// Accept `selectedTemplate` as a prop
const props = defineProps<{
  selectedTemplate: string;
  cvData: UpdateSection[] | undefined;
}>();

// Type guard for narrowing
function isSectionType<T extends keyof UpdateSectionSchemasTypes>(
  section: UpdateSection,
  type: T
): section is UpdateSection & {
  type: T;
  content: UpdateSectionSchemasTypes[T];
} {
  // Mapping types to match
  const typeMapping: Record<string, string> = {
    personal: "PersonalDetail",
    contact: "Contact",
    skills: "Skills",
    experiences: "Experiences",
    educations: "Education",
    languages: "Languages",
    references: "Reference",
  };

  // Ensure that the 'type' input gets
  const mappedType = typeMapping[type as keyof typeof typeMapping];

  // Check if the section type matches the mapped type
  return section.type === mappedType;
}

const sectionsMap = new Map(
  (props.cvData || []).map((section) => [section.type, section])
);

// Declare the data each types
const personalSection = sectionsMap.get("PersonalDetail")
  ?.content as UpdatePersonalContent;
const contactSection = sectionsMap.get("Contact")
  ?.content as UpdateContactContent;
const skillsSection = sectionsMap.get("Skills")
  ?.content as UpdateSkillContent[];
const experienceSection = sectionsMap.get("Experiences")
  ?.content as UpdateExperienceContent[];
const educationSection = sectionsMap.get("Education")
  ?.content as UpdateEducationContent[];
const languageSection = sectionsMap.get("Languages")
  ?.content as UpdateLanguageContent[];
const referenceSection = sectionsMap.get("Reference")
  ?.content as UpdateReferenceContent[];

console.log("Test content", skillsSection);

// Reference to the resume section
const resumeSection = ref(null);

const exportAsPDF = async () => {
  const firstName = personalSection?.firstName ?? "Unknown";
  const options = {
    filename: `${firstName.replace(/ /g, "_")}_Resume.pdf`,
    html2canvas: { scale: 1 },
    jsPDF: {
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      autoSize: true,
      compress: true,
    },
  };

  const element = resumeSection.value;

  if (element) {
    // Ignore TypeScript error for the import
    // @ts-ignore
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf().set(options).from(element).save();
  }
};
</script>

<style scoped>
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

.export-button {
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
}

.resume-template {
  position: relative;
  width: 800px;
  height: 1200px;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.profile-image {
  position: absolute;
  top: 20px;
  left: 60px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 3px solid white;
}

.overlay-text {
  text-align: left;
  font-family: Arial, sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
}

.name-section {
  font-size: 34px;
}

.personal-detail {
  margin-left: 220px;
  margin-top: 20px;
}

.content-container {
  display: flex;
  gap: 36px;
  padding: 56px 0;
  color: var(--text-color);
}

.left-container {
  width: 260px;
}

.right-container {
  margin-left: 24px;
  width: 650px;
}

.educations-section p,
.reference-section p,
.experiences-section p {
  margin: 4px 0;
}

.education,
.experience,
.skills {
  font-size: 14px;
  margin-top: 20px;
}
</style>
