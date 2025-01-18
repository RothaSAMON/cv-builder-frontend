import type { AxiosInstance } from "axios";
import axios from "axios";
import { useAuthStore } from "~/store/auth";

export class ApiService {
    private api: AxiosInstance;
    private authStore: ReturnType<typeof useAuthStore>;

    constructor(baseURL: string) {
        this.authStore = useAuthStore();
        this.api = axios.create({
            baseURL,
            withCredentials: true, // Ensures the cookie (token) is sent with requests
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use((config) => {
            // Cookie is automatically sent with `withCredentials`, so no need for manual token handling here
            return config;
        });

        this.api.interceptors.response.use(
            (response) => response,
            (error) => this.handleError(error)
        );
    }

    private async handleError(error: any) {
      const { clearAuth } = this.authStore;
  
      // Handle 401 (Unauthorized) errors
      if (error.response?.status === 401) {
          // Clear auth and redirect to login
          clearAuth();
          navigateTo("/login");
          return Promise.reject("Unauthorized: Redirecting to login.");
      }
  
      return Promise.reject(error?.failureReason?.response?.data || error);
  }


    get instance(): AxiosInstance {
        return this.api;
    }
}
