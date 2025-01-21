import * as z from "zod";
import type { loginSchema } from "~/utils/schema";

// types/auth.ts
export interface User {
  id?: string;
  firstName?: string;
  email?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  imageProfile?: string;
}

export interface Tokens {
  token: string;
}

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof signUpSchema>;

export interface AuthResponse {
  data: Tokens;
}
