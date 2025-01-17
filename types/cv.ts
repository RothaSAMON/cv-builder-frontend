export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string; // ISO date string
  email: string;
  imageProfile: string; // URL to the image
};

export type CVType = {
  _id: string;
  userId: UserType;
  title: string;
  previewImageUrl: string; // URL to the preview image
};
