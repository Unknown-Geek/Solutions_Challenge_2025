import { Link } from "react-router-dom";
import { MapPin, BarChart2, Layers, FileText, ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#1E3A29] text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Optimizing Reforestation with AI
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              TerraForm identifies optimal locations for reforestation by analyzing environmental data, 
              helping organizations make science-based decisions for maximum ecological impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Explore Map <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-emerald-600 hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How TerraForm Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Analyzes satellite imagery, climate records, soil composition, and topographical information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Site Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Evaluates land areas based on restoration potential, soil quality, and ecological value.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Impact Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Predicts the impact of reforestation on ecosystems, biodiversity, and natural disaster prevention.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Strategic Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ranks potential sites and provides visual tools for stakeholders to make informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Interactive Map Visualization</h2>
              <p className="text-gray-600 mb-6">
                Explore potential reforestation sites with our interactive map. View environmental data layers, 
                site rankings, and detailed analysis for any location.
              </p>
              <Link to="/map">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Open Map Dashboard
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src="/placeholder.svg?height=400&width=600" 
                  alt="Map visualization preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg">
                    <p className="font-medium text-emerald-700">Map Visualization Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Reforestation Efforts?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join environmental organizations, government agencies, and companies already using TerraForm 
            to maximize the ecological impact of their reforestation initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
              Request a Demo
            </Button>
            <Button size="lg" variant="outline" className="bg-emerald-700 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
