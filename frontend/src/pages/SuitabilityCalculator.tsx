"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  type SiteAssessmentInput,
  type SiteAssessmentResult,
  type CityProbability,
  getCityProbabilities,
  assessSiteSuitability,
} from "../services/api";
import { CheckCircle2, AlertTriangle, MapPin, BarChart2 } from "lucide-react";

export default function SuitabilityCalculatorPage() {
  // State for site assessment form
  const [siteInput, setSiteInput] = useState<SiteAssessmentInput>({
    rainfall: 60,
    soil_suitability: 0.6,
    wildlife_potential: 0,
    population: 0,
    area: 0,
    lack_of_tree_cover: 0,
  });

  // State for state name input
  const [stateName, setStateName] = useState<string>("");

  // State for results
  const [siteResult, setSiteResult] = useState<SiteAssessmentResult | null>(
    null
  );
  const [cityResults, setCityResults] = useState<CityProbability[] | null>(
    null
  );

  // Loading states
  const [isSiteLoading, setIsSiteLoading] = useState<boolean>(false);
  const [isCityLoading, setIsCityLoading] = useState<boolean>(false);

  // Handle input changes for site assessment
  const handleSiteInputChange = (
    field: keyof SiteAssessmentInput,
    value: number
  ) => {
    setSiteInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle slider changes
  const handleSliderChange = (
    field: keyof SiteAssessmentInput,
    values: number[]
  ) => {
    handleSiteInputChange(field, values[0]);
  };

  // Submit site assessment
  const handleSiteSubmit = async () => {
    setIsSiteLoading(true);
    try {
      // In a real app, use the actual API call
      // const result = await assessSiteSuitability(siteInput);
      const result = await assessSiteSuitability(siteInput);
      setSiteResult(result);
    } catch (error) {
      console.error("Error assessing site:", error);
      // Handle error
    } finally {
      setIsSiteLoading(false);
    }
  };

  // Submit state name for city probabilities
  const handleStateSubmit = async () => {
    if (!stateName.trim()) return;

    setIsCityLoading(true);
    try {
      // In a real app, use the actual API call
      // const results = await getCityProbabilities(stateName);
      const results = await getCityProbabilities(stateName);
      setCityResults(results);
    } catch (error) {
      console.error("Error getting city probabilities:", error);
      // Handle error
    } finally {
      setIsCityLoading(false);
    }
  };

  // Get color class based on probability
  const getProbabilityColorClass = (probability: number): string => {
    if (probability >= 0.8) return "text-emerald-600";
    if (probability >= 0.6) return "text-green-600";
    if (probability >= 0.4) return "text-yellow-600";
    if (probability >= 0.2) return "text-orange-600";
    return "text-red-600";
  };

  // Get background color class based on probability
  const getProbabilityBgClass = (probability: number): string => {
    if (probability >= 0.8) return "bg-emerald-50";
    if (probability >= 0.6) return "bg-green-50";
    if (probability >= 0.4) return "bg-yellow-50";
    if (probability >= 0.2) return "bg-orange-50";
    return "bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Reforestation Suitability Calculator
        </h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Use our AI-powered tools to assess the suitability of potential
          reforestation sites or explore the best cities for reforestation
          projects within a state.
        </p>

        <Tabs defaultValue="site-assessment" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger
              value="site-assessment"
              className="flex items-center gap-2"
            >
              <BarChart2 className="h-4 w-4" />
              Site Assessment
            </TabsTrigger>
            <TabsTrigger
              value="state-cities"
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              State Cities
            </TabsTrigger>
          </TabsList>

          {/* Site Assessment Tab */}
          <TabsContent value="site-assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Site Parameters</CardTitle>
                  <CardDescription>
                    Enter the environmental parameters of your potential
                    reforestation site to assess its suitability.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rainfall">
                        Rainfall (inches per year)
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="rainfall"
                          min={0}
                          max={120}
                          step={1}
                          value={[siteInput.rainfall]}
                          onValueChange={(values: number[]) =>
                            handleSliderChange("rainfall", values)
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={siteInput.rainfall}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSiteInputChange(
                              "rainfall",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="soil_suitability">
                        Soil Suitability (0-1)
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="soil_suitability"
                          min={0}
                          max={1}
                          step={0.01}
                          value={[siteInput.soil_suitability]}
                          onValueChange={(values: number[]) =>
                            handleSliderChange("soil_suitability", values)
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={siteInput.soil_suitability}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSiteInputChange(
                              "soil_suitability",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-20"
                          step="0.01"
                          min="0"
                          max="1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="wildlife_potential">
                        Wildlife Potential (0-1)
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="wildlife_potential"
                          min={0}
                          max={1}
                          step={0.01}
                          value={[siteInput.wildlife_potential]}
                          onValueChange={(values: number[]) =>
                            handleSliderChange("wildlife_potential", values)
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={siteInput.wildlife_potential}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSiteInputChange(
                              "wildlife_potential",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-20"
                          step="0.01"
                          min="0"
                          max="1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lack_of_tree_cover">
                        Lack of Tree Cover (0-1)
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="lack_of_tree_cover"
                          min={0}
                          max={1}
                          step={0.01}
                          value={[siteInput.lack_of_tree_cover]}
                          onValueChange={(values: number[]) =>
                            handleSliderChange("lack_of_tree_cover", values)
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={siteInput.lack_of_tree_cover}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSiteInputChange(
                              "lack_of_tree_cover",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-20"
                          step="0.01"
                          min="0"
                          max="1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="population">Population Count</Label>
                        <Input
                          id="population"
                          type="number"
                          value={siteInput.population}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSiteInputChange(
                              "population",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          min="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="area">Area (acres)</Label>
                        <Input
                          id="area"
                          type="number"
                          value={siteInput.area}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSiteInputChange(
                              "area",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSiteSubmit}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSiteLoading}
                  >
                    {isSiteLoading
                      ? "Calculating..."
                      : "Assess Site Suitability"}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Assessment Results</CardTitle>
                  <CardDescription>
                    AI-generated suitability assessment based on your site
                    parameters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {siteResult ? (
                    <div className="space-y-4">
                      <div
                        className={`p-4 rounded-lg ${getProbabilityBgClass(
                          siteResult.probability
                        )}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {siteResult.probability >= 0.4 ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                          )}
                          <h3 className="font-bold text-lg">
                            Suitability: {siteResult.suitability}
                          </h3>
                        </div>
                        <p className="text-gray-700">
                          This site has a{" "}
                          <span
                            className={`font-bold ${getProbabilityColorClass(
                              siteResult.probability
                            )}`}
                          >
                            {Math.round(siteResult.probability * 100)}%
                          </span>{" "}
                          probability of successful reforestation.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Recommendations:</h4>
                        {siteResult.probability >= 0.8 ? (
                          <p className="text-sm text-gray-600">
                            This site is excellent for reforestation. Consider
                            proceeding with your project and selecting native
                            tree species for optimal results.
                          </p>
                        ) : siteResult.probability >= 0.6 ? (
                          <p className="text-sm text-gray-600">
                            This site is good for reforestation. Consider
                            improving soil quality and selecting
                            drought-resistant tree species.
                          </p>
                        ) : siteResult.probability >= 0.4 ? (
                          <p className="text-sm text-gray-600">
                            This site has moderate potential. Consider
                            implementing irrigation systems and soil amendments
                            before planting.
                          </p>
                        ) : siteResult.probability >= 0.2 ? (
                          <p className="text-sm text-gray-600">
                            This site has poor potential. Consider alternative
                            locations or extensive site preparation before
                            reforestation.
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600">
                            This site is not recommended for reforestation.
                            Consider alternative land use or extensive
                            ecological restoration before attempting
                            reforestation.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <BarChart2 className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500">
                        Enter your site parameters and click "Assess Site
                        Suitability" to see results.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* State Cities Tab */}
          <TabsContent value="state-cities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Suitable Cities by State</CardTitle>
                <CardDescription>
                  Enter a state name to discover the most suitable cities for
                  reforestation projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="state-name">State Name</Label>
                    <Input
                      id="state-name"
                      placeholder="e.g. California, New York, Texas"
                      value={stateName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setStateName(e.target.value)
                      }
                    />
                  </div>
                  <div className="sm:self-end">
                    <Button
                      onClick={handleStateSubmit}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={isCityLoading || !stateName.trim()}
                    >
                      {isCityLoading ? "Searching..." : "Find Cities"}
                    </Button>
                  </div>
                </div>

                {cityResults && cityResults.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">
                      Top Cities in {stateName} for Reforestation
                    </h3>

                    <div className="space-y-3">
                      {cityResults.map((city, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${getProbabilityBgClass(
                            city.Probability
                          )}`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-emerald-600" />
                              <h4 className="font-medium">{city.City}</h4>
                            </div>
                            <div
                              className={`font-bold ${getProbabilityColorClass(
                                city.Probability
                              )}`}
                            >
                              {Math.round(city.Probability * 100)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Alert>
                      <AlertTitle>Recommendation</AlertTitle>
                      <AlertDescription>
                        {cityResults[0].Probability > 0.8 ? (
                          <p>
                            {cityResults[0].City} shows excellent potential for
                            reforestation projects with a{" "}
                            {Math.round(cityResults[0].Probability * 100)}%
                            probability of success. Consider prioritizing this
                            location.
                          </p>
                        ) : (
                          <p>
                            The cities in {stateName} show varying levels of
                            reforestation potential. Consider focusing on{" "}
                            {cityResults[0].City} first, as it has the highest
                            probability of success.
                          </p>
                        )}
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : cityResults && cityResults.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No cities found for "{stateName}". Please check the state
                      name and try again.
                    </p>
                  </div>
                ) : null}

                {!cityResults && !isCityLoading && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <MapPin className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500">
                      Enter a state name and click "Find Cities" to see the most
                      suitable cities for reforestation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
