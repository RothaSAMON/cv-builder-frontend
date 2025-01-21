import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import type { User } from "~/types/auth";
import type { JsonResponseType } from "~/types/json";

export const useUser = () => {
  const { $api } = useNuxtApp();
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await $api.get<JsonResponseType<User>>("/profile");

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Computed properties for easier access
  const userData = computed(() => userQuery.data.value?.data);
  const isUserLoaded = computed(() => !!userData.value);

  //   Update auth store when user data is fetched successfully
  watch(userData, (data) => {
    if (data) {
      authStore.setUser(data); // Update store
    }
  });

  // Watch the query state and update the store
  watch(
    () => userQuery.isSuccess,
    (isSuccess) => {
      if (isSuccess && userQuery.data.value) {
        console.log("Fetched user data successfully:", userQuery.data);
        authStore.setUser(userQuery.data.value.data);
      }
    }
  );

  watch(
    () => userQuery.isError,
    (isError) => {
      if (isError) {
        console.error("Error fetching user data:", userQuery.error);
        authStore.clearAuth();
      }
    }
  );

  // Update User Data
  const updateUser = useMutation({
    mutationKey: ["user"],
    mutationFn: async (updatedData: User) => {
      const response = await $api.put<JsonResponseType<User>>(
        "/profile",
        updatedData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"] as const,
        exact: true,
      });
    },
  });

  // Patch Profile Image
  const updateProfileImage = useMutation({
    mutationKey: ["user"],
    mutationFn: async (imageData: FormData) => {
      const response = await $api.patch<JsonResponseType<User>>(
        "/profile/image",
        imageData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"] as const,
        exact: true,
      });
    },
  });

  // Delete Profile Image
  const deleteProfileImage = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await $api.delete<JsonResponseType<User>>(
        "/profile/image"
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"] as const,
        exact: true,
      });
    },
  });

  return {
    userQuery,
    updateUser,
    updateProfileImage,
    deleteProfileImage,
  };
};
