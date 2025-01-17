import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import type { CVType } from "~/types/cv";

export const useCV = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.myApiUrl;

  const cvQueryAll = useQuery({
    queryKey: ["cv"],
    queryFn: async () => {
      const response = await axios.get<CVType[]>(`${baseURL}/cvs`);
      // Return the entire response since you need it all
      return response.data;
    },
  });

  // Fetch CVs by specific user ID
  const fetchCVsByUserId = (userId: string) =>
    useQuery({
      queryKey: ["cv", userId],
      queryFn: async () => {
        const response = await axios.get<CVType[]>(
          `${baseURL}/cvs?userId=${userId}`
        );
        return response.data;
      },

      enabled: !!userId, // Only fetch if userId is provided
    });

  return { cvQueryAll, fetchCVsByUserId };
};
