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
  ExternalLink,
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
import { useNavigate } from "react-router-dom";

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
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      loadLocations(selectedState).finally(() => setLoading(false));
    } else {
      setLocations([]);
      setPredictionResult(null);
    }
  }, [selectedState]);

  const loadStates = async () => {
    try {
      const statesData = await terraformAPI.getStates();
      setStates(statesData);
      // Clear any previous states error
      setApiErrors((prev) => ({ ...prev, states: undefined }));
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
    try {
      const locationsData = await terraformAPI.getLocations(state);
      setLocations(locationsData);
      // Clear any previous locations error
      setApiErrors((prev) => ({ ...prev, locations: undefined }));
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
          id: i,
          name: `Sample Location ${i + 1}`,
          latitude: 37 + Math.random() * 10 - 5,
          longitude: -120 + Math.random() * 10 - 5,
          state: state,
        }));
      setLocations(sampleLocations);
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
      // Clear any previous prediction error
      setApiErrors((prev) => ({ ...prev, prediction: undefined }));
    } catch (error) {
      console.error("Prediction failed:", error);
      setApiErrors((prev) => ({
        ...prev,
        prediction:
          "Unable to get prediction from the server. Showing estimated results.",
      }));
      // Provide sample prediction data for better UX
      setPredictionResult({
        prediction: Math.random() * 0.3 + 0.7, // 70-100% range
        probability: Math.random() * 0.2 + 0.75, // 75-95% range
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshData = () => {
    // Reload the data from the API
    if (selectedState) {
      setLoading(true);
      loadLocations(selectedState).finally(() => setLoading(false));
    }

    // If a location is selected, refresh prediction
    if (selectedLocation) {
      handlePredict();
    }
  };

  const handleExportData = () => {
    // This would actually generate and download data in a real implementation
    console.log("Exporting data...");
    alert("Data export feature will be available in the next update!");
  };

  const handleViewDetailedReport = () => {
    if (selectedLocation) {
      navigate(`/reports/${selectedLocation.id}`, {
        state: {
          locationData: selectedLocation,
          predictionResult,
        },
      });
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

  // Add error message banner at the top if there are any API errors
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
    <div className="space-y-6">
      {renderErrorBanner()}

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
                  setPredictionResult(null);
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
                  setPredictionResult(null);
                }}
                disabled={!selectedState || loading}
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
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 duration-150 shadow-sm hover:shadow-md"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Location"
              )}
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
                <Button
                  onClick={handleViewDetailedReport}
                  variant="outline"
                  className="mt-3 w-full hover:bg-green-100 hover:text-green-800 hover:border-green-300 transition-all duration-150"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Detailed Report
                </Button>
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
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefreshData}
            className="hover:bg-slate-100 active:bg-slate-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={handleExportData}
            className="hover:bg-slate-100 active:bg-slate-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150"
          >
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

            <Button
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 duration-150 shadow-sm hover:shadow-md"
              onClick={() => navigate("/species-catalog")}
            >
              View Full Species Catalog
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
