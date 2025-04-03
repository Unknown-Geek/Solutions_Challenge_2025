import axios, { AxiosError } from "axios";
import { PredictionResponse, Location, ApiError } from "../types/api";

const API_BASE_URL = "https://mojo-maniac-terraform-ai.hf.space";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const terraformAPI = {
  checkHealth: async () => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPrediction: async (
    data: Record<string, any>
  ): Promise<PredictionResponse> => {
    try {
      const response = await api.post("/predict", data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getLocations: async (state: string): Promise<Location[]> => {
    try {
      const response = await api.get(`/locations/${state}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getStates: async (): Promise<string[]> => {
    try {
      const response = await api.get("/states");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    return {
      message: axiosError.response?.data?.message || "An error occurred",
      status: axiosError.response?.status || 500,
    };
  }
  return {
    message: "An unexpected error occurred",
    status: 500,
  };
};

export default terraformAPI;
