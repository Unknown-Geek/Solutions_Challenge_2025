import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Layers,
  Filter,
  MapPin,
  Thermometer,
  Droplets,
  Mountain,
  Leaf,
  Info,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import terraformAPI, { Location } from "../services/api"; // Import Location type from services/api.ts
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

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

// Map control component to handle view updates
function MapViewControl({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

export default function MapDashboard() {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState("suitability");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [minArea, setMinArea] = useState(1000);
  const [minScore, setMinScore] = useState(70);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  // Memoize map center to prevent unnecessary rerenders
  const defaultCenter: [number, number] = useMemo(() => [20, 0], []);
  const defaultZoom = 2;

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      loadLocations(selectedState).finally(() => setLoading(false));
    } else {
      setLocations([]);
      setFilteredLocations([]);
      setMapCenter(defaultCenter);
      setMapZoom(defaultZoom);
    }
  }, [selectedState, defaultCenter]);

  // Apply filters to locations
  useEffect(() => {
    const topSitesData = locations.map((location) => ({
      ...location,
      name: `${location.name}, ${location.state}`,
      score: location.score ?? Math.round(Math.random() * 20 + 80), // Use score from API or fallback to random
      area: location.area ?? Math.round(Math.random() * 15000 + 5000), // Use area from API or fallback to random
      coordinates: location.coordinates ?? {
        lat: location.latitude ?? 0,
        lng: location.longitude ?? 0,
      },
    }));

    const filtered = topSitesData.filter((site) => {
      return site.area >= minArea && site.score >= minScore;
    });

    setFilteredLocations(filtered);
  }, [locations, minArea, minScore]);

  const loadStates = async () => {
    try {
      const statesData = await terraformAPI.getStates();
      setStates(statesData);
      // Clear any previous states error
      setApiErrors((prev) => ({ ...prev, states: null }));
    } catch (error) {
      console.error("Failed to load states:", error);
      setApiErrors((prev) => ({
        ...prev,
        states: "Unable to load states. Using sample data instead.",
      }));
      // Fallback to sample states for better UX
      setStates(["California", "Arizona", "New York", "Florida", "Texas"]);
    }
  };

  const loadLocations = async (state: string) => {
    setLoading(true);
    try {
      const locationsData = await terraformAPI.getLocations(state);
      setLocations(locationsData);
      // Clear any previous locations error
      setApiErrors((prev) => ({ ...prev, locations: null }));
    } catch (error) {
      console.error("Failed to load locations:", error);
      setApiErrors((prev) => ({
        ...prev,
        locations: `Unable to load locations for ${state}. Using sample data instead.`,
      }));
      // Fallback to generated sample locations for better UX
      const sampleLocations: Location[] = Array(5)
        .fill(0)
        .map((_, i) => ({
          id: `${i}`,
          name: `Sample Location ${i + 1}`,
          latitude: 37 + Math.random() * 10 - 5,
          longitude: -120 + Math.random() * 10 - 5,
          state: state,
          rainfall: 0,
          soil_suitability: 0,
          wildlife_potential: 0,
          population: 0,
          area: 0,
          lack_of_tree_cover: 0,
          coordinates: {
            lat: 37 + Math.random() * 10 - 5,
            lng: -120 + Math.random() * 10 - 5,
          },
          score: 0,
        }));
      setLocations(sampleLocations);
    } finally {
      setLoading(false);
    }
  };

  // Use filteredLocations for display
  const topSites = filteredLocations;

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
    if (site && site.coordinates) {
      setMapCenter([site.coordinates.lat, site.coordinates.lng]);
      setMapZoom(12);

      try {
        const prediction = await terraformAPI.getPrediction({
          latitude: site.coordinates.lat,
          longitude: site.coordinates.lng,
        });
        // Clear any previous prediction error
        setApiErrors((prev) => ({ ...prev, prediction: null }));
        // You can use the prediction data to update the site details
        console.log("Prediction for site:", prediction);
      } catch (error) {
        console.error("Failed to get prediction:", error);
        setApiErrors((prev) => ({
          ...prev,
          prediction: "Unable to get prediction from the server.",
        }));
      }
    }
  };

  // Update the layer state and potentially trigger map updates
  const handleLayerChange = (layer: string) => {
    setActiveLayer(layer);
    // Here you could update map visualization based on the selected layer
  };

  // Handle state selection
  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedSite(null);
  };

  // Handle filter changes
  const handleAreaChange = (value: number[]) => {
    setMinArea(value[0]);
  };

  const handleScoreChange = (value: number[]) => {
    setMinScore(value[0]);
  };

  const handleApplyFilters = () => {
    // Implement the filter application logic here
    console.log("Filters applied", { minArea, minScore });

    // Show feedback to user that filters were applied
    alert("Filters applied successfully!");
  };

  const handleExportCSV = () => {
    // This would actually generate and download CSV data in a real implementation
    console.log("Exporting CSV...");
    alert("CSV export feature will be available in the next update!");
  };

  const handleExportPDF = () => {
    // This would actually generate and download PDF in a real implementation
    console.log("Exporting PDF...");
    alert("PDF export feature will be available in the next update!");
  };

  const handleViewDetailedReport = (siteId: string) => {
    const site = topSites.find((s) => s.id === siteId);
    if (site) {
      // In a real implementation, this would navigate to a detailed report page
      navigate(`/sites/${siteId}/report`, {
        state: { siteData: site },
      });
    }
  };

  // Add error message banner
  const renderErrorBanner = () => {
    const errorMessages = Object.values(apiErrors).filter(Boolean);
    if (errorMessages.length === 0) return null;

    return (
      <Card className="bg-amber-50 border-amber-200 mb-4">
        <CardContent className="pt-4">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-600 mr-2 mt-0.5"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div>
              <h4 className="text-sm font-medium text-amber-800">
                Connection Issues
              </h4>
              <ul className="list-disc list-inside text-xs text-amber-700 mt-1 space-y-1">
                {errorMessages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Display error banner at the top */}
      {renderErrorBanner()}

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="suitability" onValueChange={handleLayerChange}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="suitability">Suitability</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
              </TabsList>

              <TabsContent value="suitability" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
                    <span>Overall Suitability</span>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span>Water Availability</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                    <span>Soil Quality</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                    <span>Biodiversity Impact</span>
                  </div>
                  <Switch />
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                    <span>Temperature</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                    <span>Precipitation</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mountain className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Elevation</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Leaf className="h-4 w-4 text-green-500 mr-2" />
                    <span>Existing Vegetation</span>
                  </div>
                  <Switch />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
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
                  <SelectItem value="amazon">Amazon Basin</SelectItem>
                  <SelectItem value="congo">Congo Rainforest</SelectItem>
                  <SelectItem value="borneo">Borneo</SelectItem>
                  <SelectItem value="ghats">Western Ghats</SelectItem>
                  <SelectItem value="sierra">Sierra Nevada</SelectItem>
                  <SelectItem value="boreal">Boreal Forests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Minimum Area (hectares)
              </label>
              <Slider
                defaultValue={[minArea]}
                value={[minArea]}
                onValueChange={handleAreaChange}
                max={50000}
                step={500}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>25,000</span>
                <span>50,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Minimum Suitability Score
              </label>
              <Slider
                defaultValue={[minScore]}
                value={[minScore]}
                onValueChange={handleScoreChange}
                max={100}
                step={5}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Climate Type</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select climate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Climate Types</SelectItem>
                  <SelectItem value="tropical">Tropical</SelectItem>
                  <SelectItem value="temperate">Temperate</SelectItem>
                  <SelectItem value="continental">Continental</SelectItem>
                  <SelectItem value="polar">Polar</SelectItem>
                  <SelectItem value="dry">Dry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleApplyFilters}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 duration-150 shadow-sm hover:shadow-md"
            >
              Apply Filters
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Map Area */}
      <div className="lg:col-span-3 space-y-6">
        <Card className="overflow-hidden">
          <div className="h-[600px] relative">
            {loading && (
              <div className="absolute inset-0 bg-white/80 z-[1001] flex items-center justify-center">
                <div className="text-lg font-medium text-gray-600">
                  Loading map data...
                </div>
              </div>
            )}
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <MapViewControl center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {!loading &&
                topSites.map(
                  (site) =>
                    site.coordinates && (
                      <Marker
                        key={site.id}
                        position={[site.coordinates.lat, site.coordinates.lng]}
                        icon={getMarkerIcon(site.score || 0)}
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
                            <p className="text-sm text-gray-600">
                              Area: {site.area} hectares
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    )
                )}
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

        {/* Top Sites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Available Reforestation Sites
                {loading && (
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 hover:bg-slate-100 active:bg-slate-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150"
                  >
                    Export <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleExportCSV}
                    className="cursor-pointer hover:bg-slate-100"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleExportPDF}
                    className="cursor-pointer hover:bg-slate-100"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Loading site data...</p>
              </div>
            ) : topSites.length === 0 ? (
              <div className="text-center py-8">
                <p>
                  No sites found matching your criteria. Try adjusting your
                  filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {topSites.map((site) => (
                  <div
                    key={site.id}
                    className={`p-4 rounded-lg border ${
                      selectedSite === site.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200"
                    } cursor-pointer`}
                    onClick={() => handleSiteSelect(site.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{site.name}</h3>
                        <div className="flex items-center mt-1 space-x-3">
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            Score: {site.score || 0}/100
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {site.area || 0} hectares
                          </span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>

                    {selectedSite === site.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium mb-2">
                          Site Details
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Climate:</p>
                            <p>Tropical</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Annual Rainfall:</p>
                            <p>{site.rainfall || 0}mm</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Soil Type:</p>
                            <p>Loamy ({(site.soil_suitability || 0) * 100}%)</p>
                          </div>
                          <div>
                            <p className="text-gray-500">
                              Biodiversity Impact:
                            </p>
                            <p>
                              {(site.wildlife_potential || 0) > 0.7
                                ? "Very High"
                                : (site.wildlife_potential || 0) > 0.5
                                ? "High"
                                : (site.wildlife_potential || 0) > 0.3
                                ? "Medium"
                                : "Low"}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 duration-150 shadow-sm hover:shadow-md"
                          onClick={() => handleViewDetailedReport(site.id)}
                        >
                          View Detailed Report
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
