import { useState, useEffect } from "react";
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
      setLocations(locationsData);
    } catch (error) {
      console.error("Failed to load locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transform locations into top sites format
  const topSites = locations.map((location) => ({
    id: location.id.toString(),
    name: `${location.name}, ${location.state}`,
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
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Minimum Area (hectares)
              </label>
              <Slider defaultValue={[1000]} max={50000} step={500} />
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
              <Slider defaultValue={[70]} max={100} step={5} />
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
                  <SelectItem value="dry">Dry</SelectItem>
                  <SelectItem value="temperate">Temperate</SelectItem>
                  <SelectItem value="continental">Continental</SelectItem>
                  <SelectItem value="polar">Polar</SelectItem>
                </SelectContent>
              </Select>
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
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    Export <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                          Score: {site.score}/100
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {site.area}
                        </span>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>

                  {selectedSite === site.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium mb-2">Site Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Climate:</p>
                          <p>Tropical</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Annual Rainfall:</p>
                          <p>2,500mm</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Soil Type:</p>
                          <p>Loamy</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Biodiversity Impact:</p>
                          <p>Very High</p>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3 w-full">
                        View Detailed Report
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
