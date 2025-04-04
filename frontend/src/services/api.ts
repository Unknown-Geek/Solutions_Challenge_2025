// API service to fetch data from the endpoints
import axios, { AxiosError } from "axios";

// Define types for the API responses
export interface Location {
  id: string;
  name: string;
  state: string;
  rainfall: number; // Average annual rainfall in inches
  soil_suitability: number; // Soil suitability rating (0 to 1)
  wildlife_potential: number; // Wildlife benefit potential (0 to 1)
  population: number; // Population count
  area: number; // Area available for afforestation in acres
  lack_of_tree_cover: number; // Measure of lack of tree cover (0 to 1)
  latitude?: number;
  longitude?: number;
  suitability_score?: number; // Calculated score based on other factors
  coordinates?: {
    // Adding coordinates property for compatibility with MapDashboard
    lat: number;
    lng: number;
  };
  score?: number; // Adding score property for compatibility with MapDashboard
}

export interface State {
  id: string;
  name: string;
  code: string;
  total_locations: number;
  avg_rainfall?: number;
  avg_soil_suitability?: number;
}

export interface SiteAssessmentInput {
  rainfall: number;
  soil_suitability: number;
  wildlife_potential: number;
  population: number;
  area: number;
  lack_of_tree_cover: number;
}

export interface SiteAssessmentResult {
  suitability: string;
  probability: number;
}

export interface CityProbability {
  City: string;
  Probability: number;
}

export interface PredictionResponse {
  prediction: number;
  probability: number;
}

export interface ApiError {
  message: string;
  status: number;
}

// Base URL for the API
const API_BASE_URL = "https://mojo-maniac-terraform-ai.hf.space";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// For compatibility with MapDashboard component
const terraformAPI = {
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
      const response = await fetchLocationsByState(state);
      // Add missing properties needed by MapDashboard
      return response.map((location) => ({
        ...location,
        coordinates: {
          lat: location.latitude || 0,
          lng: location.longitude || 0,
        },
        score: calculateSuitabilityScore(location),
      }));
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getStates: async (): Promise<string[]> => {
    try {
      const states = await fetchStates();
      // Return just the state names as strings
      return states.map((state) => state.name);
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

// Fetch all states
export const fetchStates = async (): Promise<State[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/states`);
    if (!response.ok) {
      throw new Error(`Failed to fetch states: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

// Fetch locations for a specific state
export const fetchLocationsByState = async (
  state: string
): Promise<Location[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${state}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch locations for ${state}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching locations for ${state}:`, error);
    throw error;
  }
};

// Calculate suitability score based on location data
export const calculateSuitabilityScore = (location: Location): number => {
  // This is a simplified calculation - adjust weights as needed
  const weights = {
    rainfall: 0.2,
    soil_suitability: 0.3,
    wildlife_potential: 0.2,
    lack_of_tree_cover: 0.3,
  };

  // Normalize rainfall (assuming 60 inches is optimal)
  const normalizedRainfall = Math.min(location.rainfall / 60, 1);

  // Calculate weighted score
  const score =
    (normalizedRainfall * weights.rainfall +
      location.soil_suitability * weights.soil_suitability +
      location.wildlife_potential * weights.wildlife_potential +
      location.lack_of_tree_cover * weights.lack_of_tree_cover) *
    100;

  // Return rounded score
  return Math.round(score);
};

// Assess site suitability based on input parameters
export const assessSiteSuitability = async (
  input: SiteAssessmentInput
): Promise<SiteAssessmentResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Failed to assess site: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error assessing site:", error);
    throw error;
  }
};

// Get city probabilities for a state
export const getCityProbabilities = async (
  state: string
): Promise<CityProbability[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${state}`);

    if (!response.ok) {
      throw new Error(
        `Failed to get city probabilities for ${state}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error getting city probabilities for ${state}:`, error);
    throw error;
  }
};

// For demo purposes - mock API responses when real API is not available
export const mockAssessSiteSuitability = (
  input: SiteAssessmentInput
): Promise<SiteAssessmentResult> => {
  return new Promise((resolve) => {
    // Calculate a mock probability based on input values
    const normalizedRainfall = Math.min(input.rainfall / 60, 1);
    let probability =
      normalizedRainfall * 0.2 +
      input.soil_suitability * 0.3 +
      input.wildlife_potential * 0.2 +
      input.lack_of_tree_cover * 0.3;

    // Adjust probability based on area and population
    if (input.area > 1000) probability += 0.1;
    if (input.population < 1000) probability += 0.1;

    // Cap probability between 0 and 1
    probability = Math.max(0, Math.min(1, probability));

    // Determine suitability rating
    let suitability = "Not Good";
    if (probability > 0.8) suitability = "Excellent";
    else if (probability > 0.6) suitability = "Good";
    else if (probability > 0.4) suitability = "Moderate";
    else if (probability > 0.2) suitability = "Poor";

    // Simulate API delay
    setTimeout(() => {
      resolve({
        suitability,
        probability,
      });
    }, 500);
  });
};

export const mockGetCityProbabilities = (
  state: string
): Promise<CityProbability[]> => {
  const mockData: Record<string, CityProbability[]> = {
    Alabama: [
      { City: "Mobile", Probability: 0.9986585378646851 },
      { City: "Birmingham", Probability: 0.9984055161476135 },
      { City: "Huntsville", Probability: 0.924875020980835 },
    ],
    California: [
      { City: "San Francisco", Probability: 0.9876543210987654 },
      { City: "Los Angeles", Probability: 0.8765432109876543 },
      { City: "San Diego", Probability: 0.7654321098765432 },
    ],
    "New York": [
      { City: "New York City", Probability: 0.6543210987654321 },
      { City: "Buffalo", Probability: 0.9123456789012345 },
      { City: "Albany", Probability: 0.8234567890123456 },
    ],
    Texas: [
      { City: "Austin", Probability: 0.7345678901234567 },
      { City: "Houston", Probability: 0.6456789012345678 },
      { City: "Dallas", Probability: 0.5567890123456789 },
    ],
    Florida: [
      { City: "Miami", Probability: 0.867890123456789 },
      { City: "Orlando", Probability: 0.7789012345678901 },
      { City: "Tampa", Probability: 0.6890123456789012 },
    ],
  };

  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Return the mock data for the requested state, or a default if not found
      resolve(
        mockData[state] || [
          { City: "Example City 1", Probability: 0.9 },
          { City: "Example City 2", Probability: 0.8 },
          { City: "Example City 3", Probability: 0.7 },
        ]
      );
    }, 500);
  });
};

export default terraformAPI;
