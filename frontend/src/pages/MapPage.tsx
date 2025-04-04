import { useState, useEffect } from "react";
import MapDashboard from "../components/MapDashboard";
import terraformAPI from "../services/api";
// Import Leaflet CSS at the page level to ensure it's loaded before the map
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapMounted, setMapMounted] = useState(false);

  useEffect(() => {
    // Check server health in background without blocking UI
    checkServerHealth();

    // Add a longer delay to ensure the DOM is fully ready for the map
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Set mapMounted after a brief additional delay to ensure proper initialization
      setTimeout(() => setMapMounted(true), 100);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const checkServerHealth = async () => {
    try {
      await terraformAPI.checkHealth();
      // Server is healthy, no need to update state
    } catch (err) {
      console.warn("Server health check failed:", err);
      setError(
        "Server connection issue detected. Map data may not be up-to-date."
      );
      // Still allow the component to render with a warning instead of blocking
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-6">
              Reforestation Map Explorer
            </h1>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Explore potential reforestation sites across the globe. Use the
              filters to narrow down locations based on climate conditions, soil
              quality, biodiversity impact, and more.
            </p>
          </div>

          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-6">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                {error}
              </p>
              <button
                onClick={checkServerHealth}
                className="mt-2 text-sm text-amber-800 underline hover:no-underline"
              >
                Retry Connection
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg">
              <div className="text-gray-500">Loading map interface...</div>
            </div>
          ) : (
            mapMounted && <MapDashboard />
          )}
        </div>
      </div>
    </div>
  );
}
