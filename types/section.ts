// Define TypeScript types for the schemas

// Type for Personal Content
export interface UpdatePersonalContent {
  firstName?: string;
  lastName?: string;
  position?: string;
  summary?: string;
  imageUrl?: string;
}

// Type for Contact Content
export interface UpdateContactContent {
  phoneNumber?: string;
  email?: string;
  address?: string;
}

// Type for Skill Content
export interface UpdateSkillContent {
  name?: string;
  level?: "Expert" | "Advance" | "Intermediate" | "Beginner";
}

// Type for Experience Content
export interface UpdateExperienceContent {
  jobTitle?: string;
  // responsibilities?: string[];
  startDate?: string;
  endDate?: string;
  position?: string;
  description?: string;
}

// Type for Education Content
export interface UpdateEducationContent {
  schoolName?: string;
  degreeMajor?: string;
  startDate?: Date;
  endDate?: Date;
}

// Type for Language Content
export interface UpdateLanguageContent {
  language?: string;
  level?: "Fluent" | "Advance" | "Intermediate" | "Beginner";
}

// Type for Reference Content
export interface UpdateReferenceContent {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  position?: string;
  phoneNumber?: string;
}

// Type mapping for section schemas
export interface UpdateSectionSchemasTypes {
  personal: UpdatePersonalContent;
  contact: UpdateContactContent;
  skills: UpdateSkillContent[];
  experiences: UpdateExperienceContent[];
  educations: UpdateEducationContent[];
  languages: UpdateLanguageContent[];
  references: UpdateReferenceContent[];
}

// Type for section keys
export type SectionKeys = keyof UpdateSectionSchemasTypes;

// Type for Update Section
export interface UpdateSection {
  resumeId: string;
  type:
    | "PersonalDetail"
    | "Contact"
    | "Skills"
    | "Experiences"
    | "Education"
    | "Languages"
    | "Reference";
  content: UpdateSectionSchemasTypes[SectionKeys];
}

// Type for the array of Update Sections
export type UpdateSectionArray = UpdateSection[];
