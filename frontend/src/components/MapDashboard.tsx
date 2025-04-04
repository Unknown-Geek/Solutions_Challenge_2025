import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import terraformAPI from "../services/api";
import { Location } from "../types/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface SiteInfo {
  id: string;
  name: string;
  score: number;
  area: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function MapDashboard() {
  const [activeLayer, setActiveLayer] = useState("suitability");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      loadLocations(selectedState);
    }
  }, [selectedState]);

  const loadStates = async () => {
    try {
      const statesData = await terraformAPI.getStates();
      setStates(statesData);
    } catch (error) {
      console.error("Failed to load states:", error);
    }
  };

  const loadLocations = async (state: string) => {
    setLoading(true);
    try {
      const locationsData = await terraformAPI.getLocations(state);
      // Ensure proper type conversion between API Location and state Location
      const typedLocations: Location[] = locationsData.map((loc: any) => ({
        ...loc,
        latitude: typeof loc.latitude === "number" ? loc.latitude : 0,
        longitude: typeof loc.longitude === "number" ? loc.longitude : 0,
      }));
      setLocations(typedLocations);
    } catch (error) {
      console.error("Failed to load locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transform locations into top sites format
  const topSites: SiteInfo[] = locations.map((location) => ({
    id: location.id.toString(),
    name: `${location.name}, ${location.state || ""}`,
    score: Math.round(Math.random() * 20 + 80), // Temporary random score for demonstration
    area: `${Math.round(Math.random() * 15000 + 5000)} hectares`, // Temporary random area
    coordinates: {
      lat: location.latitude,
      lng: location.longitude,
    },
  }));

  const getMarkerColor = (score: number): string => {
    if (score >= 90) return "emerald";
    if (score >= 80) return "yellow";
    if (score >= 70) return "orange";
    return "red";
  };

  // Update marker styles based on active layer and score
  const getMarkerIcon = (score: number) => {
    const color = getMarkerColor(score);
    return L.divIcon({
      className: `bg-${color}-500 w-6 h-6 rounded-full border-2 border-white shadow-lg`,
      iconSize: [24, 24],
    });
  };

  const handleSiteSelect = async (siteId: string) => {
    setSelectedSite(siteId === selectedSite ? null : siteId);

    const site = topSites.find((s) => s.id === siteId);
    if (site) {
      setMapCenter([site.coordinates.lat, site.coordinates.lng]);
      setMapZoom(12);

      try {
        const prediction = await terraformAPI.getPrediction({
          latitude: site.coordinates.lat,
          longitude: site.coordinates.lng,
        });
        // You can use the prediction data to update the site details
        console.log("Prediction for site:", prediction);
      } catch (error) {
        console.error("Failed to get prediction:", error);
      }
    }
  };

  // Update the layer state and potentially trigger map updates
  const handleLayerChange = (layer: string) => {
    setActiveLayer(layer);
    // Here you could update map visualization based on the selected layer
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M3 10h18" />
              </svg>
              Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="suitability" onValueChange={handleLayerChange}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="suitability">Suitability</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 6H3" />
                <path d="M10 12H3" />
                <path d="M17 18H3" />
              </svg>
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select defaultValue="global">
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Minimum Score</label>
                <span className="text-sm text-gray-500">80</span>
              </div>
              <Slider defaultValue={[80]} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Area (hectares)</label>
                <span className="text-sm text-gray-500">Any</span>
              </div>
              <Slider defaultValue={[0, 100]} max={100} step={1} />
            </div>

            <Button className="w-full">Apply Filters</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Map Area */}
      <div className="lg:col-span-3 space-y-6">
        <Card className="overflow-hidden">
          <div className="h-[600px] relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {topSites.map((site) => (
                <Marker
                  key={site.id}
                  position={[site.coordinates.lat, site.coordinates.lng]}
                  icon={getMarkerIcon(site.score)}
                  eventHandlers={{
                    click: () => handleSiteSelect(site.id),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium">{site.name}</h3>
                      <p className="text-sm text-gray-600">
                        Score: {site.score}/100
                      </p>
                      <p className="text-sm text-gray-600">Area: {site.area}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {/* Layer controls based on activeLayer state */}
              {activeLayer === "environmental" && (
                // Add environmental layer overlays here when data is available
                <></>
              )}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-[1000]">
              <h4 className="text-sm font-medium mb-2">Legend</h4>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-xs">High Suitability (90-100)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-xs">Medium Suitability (80-89)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-xs">Low Suitability (70-79)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs">Not Suitable (Less than 70)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Available Reforestation Sites
                {loading && (
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Sort by Score</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Size</DropdownMenuItem>
                  <DropdownMenuItem>Export List</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSites.map((site) => (
                <div
                  key={site.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSite === site.id
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleSiteSelect(site.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{site.name}</h3>
                      <p className="text-sm text-gray-500">{site.area}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium text-white bg-${getMarkerColor(
                        site.score
                      )}-500`}
                    >
                      {site.score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
