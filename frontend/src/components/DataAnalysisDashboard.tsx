import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { BarChart, LineChart, PieChart } from "./ui/chart";
import {
  BarChart2,
  LineChartIcon,
  PieChartIcon,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Thermometer,
  Droplets,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import terraformAPI from "../services/api";
import { Location, PredictionResponse } from "../types/api";

export default function DataAnalysisDashboard() {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [predictionResult, setPredictionResult] =
    useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

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
    try {
      const locationsData = await terraformAPI.getLocations(state);
      setLocations(locationsData);
    } catch (error) {
      console.error("Failed to load locations:", error);
    }
  };

  const handlePredict = async () => {
    if (!selectedLocation) return;

    setLoading(true);
    try {
      const result = await terraformAPI.getPrediction({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        // Add any other required prediction parameters
      });
      setPredictionResult(result);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const climateData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [22, 23, 25, 27, 28, 29, 30, 30, 29, 27, 25, 23],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Precipitation (mm)",
        data: [150, 170, 180, 190, 210, 250, 270, 280, 260, 220, 190, 160],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const suitabilityData = {
    labels: [
      "Amazon Basin",
      "Congo Rainforest",
      "Borneo Highlands",
      "Western Ghats",
      "Sierra Nevada",
    ],
    datasets: [
      {
        label: "Overall Suitability Score",
        data: [92, 89, 87, 85, 82],
        backgroundColor: "rgb(16, 185, 129)",
      },
    ],
  };

  const impactData = {
    labels: [
      "Carbon Sequestration",
      "Biodiversity",
      "Water Conservation",
      "Soil Health",
      "Climate Resilience",
    ],
    datasets: [
      {
        label: "Impact Score",
        data: [85, 92, 78, 88, 76],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
        ],
        borderColor: [
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(139, 92, 246)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* AI Prediction Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI Reforestation Analysis</CardTitle>
          <CardDescription>
            Get AI-powered predictions for reforestation potential at specific
            locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                value={selectedState}
                onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedLocation(null);
                }}
              >
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

              <Select
                value={selectedLocation?.id.toString()}
                onValueChange={(value) => {
                  const location = locations.find(
                    (loc) => loc.id.toString() === value
                  );
                  setSelectedLocation(location || null);
                }}
                disabled={!selectedState}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem
                      key={location.id}
                      value={location.id.toString()}
                    >
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handlePredict}
              disabled={!selectedLocation || loading}
              className="w-full md:w-auto"
            >
              {loading ? "Analyzing..." : "Analyze Location"}
            </Button>

            {predictionResult && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  Analysis Results
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Reforestation Potential
                    </p>
                    <p className="text-lg font-medium text-green-700">
                      {(predictionResult.prediction * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Confidence Score</p>
                    <p className="text-lg font-medium text-green-700">
                      {(predictionResult.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="global">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="amazon">Amazon Basin</SelectItem>
              <SelectItem value="congo">Congo Rainforest</SelectItem>
              <SelectItem value="borneo">Borneo Highlands</SelectItem>
              <SelectItem value="ghats">Western Ghats</SelectItem>
              <SelectItem value="sierra">Sierra Nevada</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Suitable Area</CardDescription>
            <CardTitle className="text-3xl">1.2M ha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-emerald-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>12% increase</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Compared to previous year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Suitability Score</CardDescription>
            <CardTitle className="text-3xl">87/100</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-emerald-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>5% increase</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Compared to previous year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Potential Carbon Sequestration</CardDescription>
            <CardTitle className="text-3xl">45M tons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-emerald-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>8% increase</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Compared to previous year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Biodiversity Impact Score</CardDescription>
            <CardTitle className="text-3xl">92/100</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>2% decrease</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Compared to previous year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="climate">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="climate" className="flex items-center">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Climate Data
          </TabsTrigger>
          <TabsTrigger value="suitability" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Suitability
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Impact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="climate">
          <Card>
            <CardHeader>
              <CardTitle>Climate Data Analysis</CardTitle>
              <CardDescription>
                Temperature and precipitation patterns for the selected region
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Temperature</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Precipitation</span>
                </div>
              </div>
              <LineChart
                data={climateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: false,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suitability">
          <Card>
            <CardHeader>
              <CardTitle>Reforestation Suitability by Region</CardTitle>
              <CardDescription>
                Comparison of overall suitability scores across top regions
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <BarChart
                data={suitabilityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Ecological Impact Analysis</CardTitle>
              <CardDescription>
                Breakdown of potential ecological benefits from reforestation
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="w-[350px] h-[350px]">
                <PieChart
                  data={impactData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Soil Composition Analysis</CardTitle>
            <CardDescription>
              Breakdown of soil types and their suitability for reforestation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Loamy Soil</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sandy Soil</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Clay Soil</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Chalky Soil</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Peaty Soil</span>
                  <span className="text-sm font-medium">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: "58%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Species Recommendation</CardTitle>
            <CardDescription>
              Tree species most suitable for the selected region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-emerald-700 font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium">
                    Mahogany (Swietenia macrophylla)
                  </h4>
                  <p className="text-sm text-gray-500">
                    Native hardwood with excellent carbon sequestration
                    properties
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-emerald-700 font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium">
                    Brazil Nut (Bertholletia excelsa)
                  </h4>
                  <p className="text-sm text-gray-500">
                    Provides habitat for wildlife and sustainable income for
                    communities
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-emerald-700 font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Kapok Tree (Ceiba pentandra)</h4>
                  <p className="text-sm text-gray-500">
                    Fast-growing with extensive root systems for soil
                    stabilization
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-emerald-700 font-medium">4</span>
                </div>
                <div>
                  <h4 className="font-medium">
                    Rubber Tree (Hevea brasiliensis)
                  </h4>
                  <p className="text-sm text-gray-500">
                    Economically valuable and adaptable to various soil
                    conditions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
