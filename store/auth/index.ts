import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
  }),

  actions: {
    setUser(userData: User) {
      this.user = userData;
    },

    clearAuth() {
      this.user = null;
    },
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.user?.id; // Check if a user is logged in by verifying the existence of a user ID
    },
  },
});
