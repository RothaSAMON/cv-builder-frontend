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
    onSuccess: () => {
      // Invalidate and refetch the section data after a successful patch
      // queryClient.invalidateQueries(["section", cvId]);
      console.log("Successfully updated section!");
    },
  });

  // Patch Section Image by CV ID
  const updateSectionImage = useMutation({
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
    onSuccess: () => {
      // Invalidate and refetch the section data after a successful patch
      // queryClient.invalidateQueries(["section", cvId]);
      console.log("Successfully updated section image!");
    },
  });

  return { updateSection, updateSectionImage };
};
