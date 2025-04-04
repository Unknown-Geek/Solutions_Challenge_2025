export interface PredictionResponse {
  prediction: number;
  probability: number;
}

export interface Location {
  id: string | number; // Allow both string and number IDs
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  rainfall?: number;
  soil_suitability?: number;
  wildlife_potential?: number;
  population?: number;
  area?: number;
  lack_of_tree_cover?: number;
}

export interface ApiError {
  message: string;
  status: number;
}
