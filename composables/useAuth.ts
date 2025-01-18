import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import type { JsonResponseType } from "~/types/json";
import type { AuthResponse, LoginType, Tokens, User } from "~/types/auth";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginType) => {
      const response = await $api.post<JsonResponseType<undefined>>(
        "/auth/login",
        credentials
      );
      return response.data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await $api.get("/auth/logout");
    },
    onSuccess: () => {
      authStore.clearAuth();
      queryClient.clear();
    },
  });

  return {
    loginMutation,
    logoutMutation,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
  };
};
