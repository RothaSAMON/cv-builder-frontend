<template>
  <section class="export-button">
    <a-button @click="exportAsPDF">Export as PDF</a-button>
  </section>

  <section class="templatep-container">
    <h3>Select Template</h3>
    <div class="template-selection">
      <div
        :class="['template-image', { active: selectedTemplate === template1 }]"
        @click="selectTemplate(template1)"
      >
        <img :src="template1" alt="Template 1" />
      </div>
      <div
        :class="['template-image', { active: selectedTemplate === template2 }]"
        @click="selectTemplate(template2)"
      >
        <img :src="template2" alt="Template 2" />
      </div>
    </div>
  </section>

  <div class="right-section">
    <section
      ref="resumeSection"
      class="resume-template"
      :style="{ backgroundImage: `url(${selectedTemplate})` }"
    >
      <div class="header-resume">
        <!-- Profile Image -->
        <img
          class="profile-image"
          :src="personalSection?.imageUrl"
          crossorigin="anonymous"
        />

        <!-- Dummy data overlay on resume -->
        <section class="personal-detail">
          <h2 class="name-section">
            {{ personalSection?.firstName }} {{ personalSection?.lastName }}
          </h2>
          <h3 class="title-section">{{ personalSection?.position }}</h3>
        </section>
      </div>

      <div class="content-container">
        <!-- The left side of Resume -->
        <section class="left-container">
          <section class="contact-section">
            <h3 class="section-title">Contact Me</h3>
            <p>{{ contactSection?.phoneNumber }}</p>
            <p>{{ contactSection?.email }}</p>
            <p>{{ contactSection?.address }}</p>
            <hr />
          </section>

          <section class="skills-section">
            <h3 class="section-title">Skills</h3>
            <ul>
              <li v-for="(skill, index) in skillsSection" :key="index">
                <span class="skill-name">{{ skill?.name }}</span> :
                <span class="skill-level">{{ skill?.level }}</span>
              </li>
            </ul>
            <hr />
          </section>

          <section class="languages-section">
            <h3 class="section-title">Language</h3>
            <ul>
              <li v-for="(language, index) in languageSection" :key="index">
                <span class="language-name">{{ language?.language }}</span> :
                <span class="language-level">{{ language?.level }}</span>
              </li>
            </ul>
            <hr />
          </section>

          <section class="reference-section">
            <h3 class="section-title">Reference</h3>
            <div v-for="(reference, index) in referenceSection" :key="index">
              <p>{{ reference?.firstName }} {{ reference?.lastName }}</p>
              <p>{{ reference?.company }}</p>
              <p>{{ reference?.position }}</p>
              <p>{{ reference?.email }}</p>
              <p>{{ reference?.phoneNumber }}</p>
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
              <p>{{ experience?.jobTitle }}</p>
              <p>{{ experience?.position }}</p>
              <p class="sub-title">{{ experience?.description }}</p>
              <p class="sub-title">
                {{ experience?.startDate }} - {{ experience?.endDate }}
              </p>
              <br />
            </div>
            <hr />
          </section>

          <section class="educations-section">
            <h3 class="section-title">Education</h3>
            <div v-for="(education, index) in educationSection" :key="index">
              <p>{{ education?.degreeMajor }}</p>
              <p class="sub-title">{{ education?.schoolName }}</p>
              <p class="sub-title">
                {{ education?.startDate }} - {{ education?.endDate }}
              </p>
              <br />
            </div>
          </section>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import SecondImage from "../../assets/images/ResumeTemplateRT.jpg";
import FirstImage from "../../assets/images/ResumeTemplateRT2.jpg";
import type {
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Accept `selectedTemplate` as a prop
const props = defineProps<{
  selectedTemplate: string;
  cvData: UpdateSection[] | undefined;
}>();


// Declare the template images
const template1 = FirstImage;
const template2 = SecondImage;

const selectedTemplate = ref(template1);  // Initialize with template1

const selectTemplate = (template: string) => {
  selectedTemplate.value = template;  // Update selectedTemplate
};

// Type guard for narrowing
function isSectionType<T extends keyof UpdateSectionSchemasTypes>(
  section: UpdateSection,
  type: T
): section is UpdateSection & {
  type: T;
  content: UpdateSectionSchemasTypes[T];
} {
  const typeMapping: Record<string, string> = {
    personal: "PersonalDetail",
    contact: "Contact",
    skills: "Skills",
    experiences: "Experiences",
    educations: "Education",
    languages: "Languages",
    references: "Reference",
  };

  const mappedType = typeMapping[type as keyof typeof typeMapping];

  return section.type === mappedType;
}

const sectionsMap = new Map(
  (props.cvData || []).map((section) => [section.type, section])
);

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

// Reference to the resume section
const resumeSection = ref<HTMLDivElement | null>(null);

const exportAsPDF = async () => {
  const convertImageToBase64 = async (image: any) => {
    try {
      const response = await fetch(image, { mode: "cors" });
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return null;
    }
  };

  const prepareImages = async () => {
    if (!resumeSection.value) return;

    const images = resumeSection.value.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(async (img) => {
        if (!img.src.startsWith("data:image")) {
          const base64 = await convertImageToBase64(img.src);
          if (base64) {
            img.src = base64 as string;
            await new Promise((resolve) => (img.onload = resolve));
          }
        }
      })
    );
  };

  const saveAsPdf = async () => {
    if (!resumeSection.value) return;

    await prepareImages();

    const canvas = await html2canvas(resumeSection.value, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#fff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${personalSection?.firstName || "Resume"}.pdf`);
  };

  await saveAsPdf();
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

.template-selection {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.template-image {
  width: 120px;
  height: auto;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s ease;
  border: 1px solid var(--border-color);
}

.template-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.template-image.active {
  border-color: #007bff;
}


.export-button {
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
}

.header-resume {
  height: 100px;
}

.resume-template {
  position: relative;
  width: 800px;
  height: 1120px;
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
  top: 13px;
  left: 60px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-size: cover;
  border: 3px solid white;
  object-fit: cover;
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
  margin-top: 13px;
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
