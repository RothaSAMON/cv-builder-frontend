import * as z from "zod";
import type { loginSchema } from "~/utils/schema";

// types/auth.ts
export interface User {
  id?: string;
  firstName?: string;
  gmail?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: Date;
}

export interface Tokens {
  accessToken: string;
}

export type LoginType = z.infer<typeof loginSchema>;

export interface AuthResponse {
  data: Tokens;
}
