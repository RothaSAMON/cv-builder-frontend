import type { User } from "./auth";
import type { UpdateSectionArray } from "./section";

// Type for Resume
export interface CVType {
  _id: string;
  userId: User;
  title: string;
  previewImageUrl: string;
  sections: UpdateSectionArray;
}
