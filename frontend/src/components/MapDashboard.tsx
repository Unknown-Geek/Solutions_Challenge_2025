import { useState } from "react";
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

export default function MapDashboard() {
  const [selectedLayer, setActiveLayer] = useState("suitability");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  // Mock data for demonstration
  const topSites = [
    {
      id: "site1",
      name: "Amazon Basin, Brazil",
      score: 92,
      area: "15,000 hectares",
    },
    {
      id: "site2",
      name: "Congo Rainforest, DRC",
      score: 89,
      area: "12,500 hectares",
    },
    {
      id: "site3",
      name: "Borneo Highlands, Indonesia",
      score: 87,
      area: "9,800 hectares",
    },
    {
      id: "site4",
      name: "Western Ghats, India",
      score: 85,
      area: "7,200 hectares",
    },
    {
      id: "site5",
      name: "Sierra Nevada, USA",
      score: 82,
      area: "5,600 hectares",
    },
  ];

  const handleSiteSelect = (siteId: string) => {
    setSelectedSite(siteId === selectedSite ? null : siteId);
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
            <Tabs defaultValue="suitability" onValueChange={setActiveLayer}>
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
          <div className="h-[600px] bg-gray-200 relative">
            <img
              src="/placeholder.svg?height=600&width=1000"
              alt="Interactive map visualization"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg">
                <p className="font-medium text-emerald-700">
                  Interactive Map Visualization
                </p>
                <p className="text-sm text-gray-600">
                  This would be an interactive map with the selected layers and
                  filters applied
                </p>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 flex flex-col gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8">
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
                  <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9Z" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                </svg>
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
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
                  <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9Z" />
                  <path d="M9 12h6" />
                </svg>
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
              <h4 className="text-sm font-medium mb-2">Legend</h4>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-xs">High Suitability</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-xs">Medium Suitability</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs">Low Suitability</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-xs">Not Suitable</span>
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
                Top Reforestation Sites
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
