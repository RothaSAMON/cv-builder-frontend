import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import axios from "axios";
import type { CVType } from "~/types/cv";
import type { JsonResponseType } from "~/types/json";

export const useCV = () => {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const queryClient = useQueryClient();

  const baseURL = config.public.myApiUrl;

  const cvQueryAll = useQuery({
    queryKey: ["cv"],
    queryFn: async () => {
      const response = await $api.get<JsonResponseType<CVType[]>>(
        `${baseURL}/cvs`
      );
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Fetch CVs by specific user ID
  const fetchCVsByUserId = (userId: string) =>
    useQuery({
      queryKey: ["cv", userId],
      queryFn: async () => {
        const response = await $api.get<CVType[]>(
          // `${baseURL}/cvs?userId=${userId}`
          `${baseURL}/cvs`
        );
        return response.data;
      },

      enabled: !!userId,
    });

  const fetchCVById = (cvId: string) =>
    useQuery({
      queryKey: ["cv", cvId],
      queryFn: async () => {
        const response = await $api.get<CVType>(`${baseURL}/cvs/${cvId}`);
        return response.data;
      },
      enabled: !!cvId,
    });

  const updateCV = (cvId: string, updatedData: Partial<CVType>) =>
    useMutation({
      mutationKey: ["cv"],
      mutationFn: async () => {
        const response = await $api.patch<CVType>(
          `${baseURL}/cvs/${cvId}`,
          updatedData
        );
        return response.data;
      },
      // onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["cv"] as const,
      //     exact: true,
      //   });
      // },
      onSuccess: () => {
        // Invalidate both `cv` and `section` queries to refresh data
        queryClient.invalidateQueries({ queryKey: ["cv"] });
        queryClient.invalidateQueries({ queryKey: ["section"] });
      },
      onError: (error) => {
        console.error("Error updating CV", error);
      },
    });

  const createCV = useMutation({
    mutationKey: ["cv"],
    mutationFn: async (formData: { title: string; templateUrl: string }) => {
      const response = await $api.post(`${baseURL}/cvs`, formData);
      return response.data;
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["cv"] as const,
    //     exact: true,
    //   });
    // },
    onSuccess: () => {
      // Invalidate both `cv` and `section` queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["cv"] });
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
    onError: (error) => {
      console.error("Error creating CV", error);
    },
  });

  // Delete CV mutation
  const deleteCV = useMutation({
    mutationKey: ["cv"],
    mutationFn: async (cvId: string) => {
      const response = await $api.delete(`/cvs/${cvId}`);
      return response.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["cv"] as const,
    //     exact: true,
    //   });
    // },
    onSuccess: () => {
      // Invalidate both `cv` and `section` queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["cv"] });
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
    onError: (error) => {
      console.error("Error deleting CV", error);
    },
  });

  return {
    cvQueryAll,
    fetchCVsByUserId,
    fetchCVById,
    updateCV,
    createCV,
    deleteCV,
  };
};
