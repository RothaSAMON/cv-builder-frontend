import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useNuxtApp } from "#app";
import type { JsonResponseType } from "~/types/json";

export const useSection = <T>() => {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const queryClient = useQueryClient();

  const baseURL = config.public.myApiUrl;

  // Patch Section by CV ID
  const updateSection = useMutation({
    mutationKey: ["section"],
    mutationFn: async ({
      cvId,
      updateContent,
    }: {
      cvId: string;
      updateContent: T;
    }) => {
      const response = await $api.patch<JsonResponseType<T>>(
        `${baseURL}/sections/${cvId}`,
        updateContent
      );
      return response.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["section"] as const,
    //     exact: true,
    //   });
    // },
    onSuccess: async() => {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      // Invalidate both `section` and `cv` queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["section"] });
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },
  });

  // Patch Section Image by CV ID
  const updateSectionImage = useMutation({
    mutationKey: ["section"],
    mutationFn: async ({
      cvId,
      imageData,
    }: {
      cvId: string;
      imageData: FormData;
    }) => {
      const response = await $api.patch<JsonResponseType<T>>(
        `${baseURL}/sections/${cvId}/image`,
        imageData
      );
      return response.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["section"] as const,
    //     exact: true,
    //   });
    // },
    onSuccess: () => {
      // Invalidate both `section` and `cv` queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["section"] });
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },
  });

  return { updateSection, updateSectionImage };
};
