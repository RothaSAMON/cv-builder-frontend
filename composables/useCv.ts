import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import axios from "axios";
import type { CVType } from "~/types/cv";

export const useCV = () => {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const queryClient = useQueryClient();

  const baseURL = config.public.myApiUrl;

  const cvQueryAll = useQuery({
    queryKey: ["cv"],
    queryFn: async () => {
      const response = await $api.get<CVType[]>(`${baseURL}/cvs`);
      return response.data;
    },
    retry: false, // Disable automatic retries on failure
    refetchOnWindowFocus: false, // Prevent refetch when the window gains focus
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

      enabled: !!userId, // Only fetch if userId is provided
    });

  const fetchCVById = (cvId: string) =>
    useQuery({
      queryKey: ["cv", cvId],
      queryFn: async () => {
        const response = await $api.get<CVType>(`${baseURL}/cvs/${cvId}`);
        return response.data;
      },
      enabled: !!cvId, // Only fetch if cvId is provided
    });

  const updateCV = (cvId: string, updatedData: Partial<CVType>) =>
    useMutation({
      mutationFn: async () => {
        const response = await $api.patch<CVType>(
          `${baseURL}/cvs/${cvId}`,
          updatedData
        );
        return response.data;
      },
      onSuccess: () => {
        // Invalidate and refetch the CV data after a successful patch
        // queryClient.invalidateQueries(["CV", cvId])
        console.log("Succesfully Updated Data!!");
      },
      onError: (error) => {
        console.error("Error updating CV", error);
      },
    });

  const createCV = useMutation({
    mutationFn: async (formData: { title: string; templateUrl: string }) => {
      const response = await $api.post(`${baseURL}/cvs`, formData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Successfully created CV!");
      // queryClient.invalidateQueries(["cv"]); // Refetch the list of CVs
    },
    onError: (error) => {
      console.error("Error creating CV", error);
    },
  });

  return { cvQueryAll, fetchCVsByUserId, fetchCVById, updateCV, createCV };
};
