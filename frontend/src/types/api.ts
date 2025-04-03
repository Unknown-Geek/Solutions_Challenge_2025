export interface PredictionResponse {
  prediction: number;
  probability: number;
}

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
}

export interface ApiError {
  message: string;
  status: number;
}
