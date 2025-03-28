import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { MapPin, Download, Filter, ArrowUpDown } from "lucide-react"

export default function SitesPage() {
  // Mock data for demonstration
  const sites = [
    {
      id: "site1",
      name: "Amazon Basin, Brazil",
      score: 92,
      area: "15,000 hectares",
      climate: "Tropical",
      rainfall: "2,500mm",
      soilType: "Loamy",
      biodiversity: "Very High",
      carbonSeq: "High",
      status: "Available",
    },
    {
      id: "site2",
      name: "Congo Rainforest, DRC",
      score: 89,
      area: "12,500 hectares",
      climate: "Tropical",
      rainfall: "2,200mm",
      soilType: "Loamy",
      biodiversity: "Very High",
      carbonSeq: "High",
      status: "Available",
    },
    {
      id: "site3",
      name: "Borneo Highlands, Indonesia",
      score: 87,
      area: "9,800 hectares",
      climate: "Tropical",
      rainfall: "2,800mm",
      soilType: "Peaty",
      biodiversity: "Very High",
      carbonSeq: "Very High",
      status: "Available",
    },
    {
      id: "site4",
      name: "Western Ghats, India",
      score: 85,
      area: "7,200 hectares",
      climate: "Tropical Monsoon",
      rainfall: "3,000mm",
      soilType: "Laterite",
      biodiversity: "High",
      carbonSeq: "Medium",
      status: "Under Review",
    },
    {
      id: "site5",
      name: "Sierra Nevada, USA",
      score: 82,
      area: "5,600 hectares",
      climate: "Mediterranean",
      rainfall: "750mm",
      soilType: "Sandy Loam",
      biodiversity: "Medium",
      carbonSeq: "Medium",
      status: "Available",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Site Rankings</h1>
            <p className="text-gray-600 max-w-3xl">
              Browse and compare potential reforestation sites ranked by suitability score. Each site is evaluated based
              on environmental factors, biodiversity impact, and carbon sequestration potential.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {sites.map((site) => (
            <Card key={site.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1 bg-gray-100 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{site.name}</h2>
                    <div className="flex items-center mb-4">
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        Score: {site.score}/100
                      </Badge>
                    </div>
                    <div className="flex items-start mb-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                      <span className="text-gray-600">{site.area}</span>
                    </div>
                    <div className="mt-4">
                      <Badge
                        variant="outline"
                        className={
                          site.status === "Available"
                            ? "border-green-200 text-green-800 bg-green-50"
                            : "border-amber-200 text-amber-800 bg-amber-50"
                        }
                      >
                        {site.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Climate Type</h3>
                      <p className="font-medium">{site.climate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Annual Rainfall</h3>
                      <p className="font-medium">{site.rainfall}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Soil Type</h3>
                      <p className="font-medium">{site.soilType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Biodiversity Impact</h3>
                      <p className="font-medium">{site.biodiversity}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Carbon Sequestration Potential</h3>
                        <p className="font-medium">{site.carbonSeq}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline">View Details</Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Select Site</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

