import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Users,
  Building,
  Globe,
  Award,
  Github,
  ExternalLink,
  Code,
  Database,
  Cpu,
  Server,
  CloudCog,
  Map,
  Leaf,
  LineChart,
  Sparkles,
  BarChart2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">About TerraForm</h1>
            <p className="text-xl mb-8">
              We're tackling climate change through innovation, using AI to
              optimize reforestation efforts worldwide by analyzing
              environmental data and identifying the most effective planting
              locations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Unknown-Geek/Solutions_Challenge_2025"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-emerald-100 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://drive.google.com/drive/folders/1QRdsxq642mSc6cnubDvMkRRlzdBLnh6y?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-emerald-100 transition-colors"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                <span>Demo Video</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Site Selection</h3>
                <p className="text-gray-600">
                  Identifies the best reforestation sites using satellite
                  images, soil quality data, and climate analysis to maximize
                  ecological impact.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Predictive Modeling</h3>
                <p className="text-gray-600">
                  Uses AI to forecast the impact of reforestation on
                  biodiversity, carbon sequestration, and natural disaster
                  prevention.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Customizable Prioritization
                </h3>
                <p className="text-gray-600">
                  Allows stakeholders to prioritize sites based on specific
                  goals and objectives, from carbon capture to biodiversity
                  enhancement.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Interactive Visualization
                </h3>
                <p className="text-gray-600">
                  Converts complex ecological data into user-friendly,
                  interactive visuals that help stakeholders make informed
                  decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Adaptive System</h3>
                <p className="text-gray-600">
                  Updates recommendations dynamically based on changing
                  environmental conditions, ensuring reforestation efforts
                  remain optimally effective.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CloudCog className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Analytics</h3>
                <p className="text-gray-600">
                  Leverages advanced machine learning to analyze environmental
                  factors and predict reforestation success rates with high
                  accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                TerraForm was born out of a recognition that while many
                organizations were committed to planting trees, the selection of
                planting sites was often based on convenience rather than
                scientific analysis.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of environmental scientists, data engineers, and AI
                specialists came together to develop a solution that would
                maximize the ecological impact of reforestation efforts
                worldwide.
              </p>
              <p className="text-gray-600">
                By combining satellite imagery, climate data, soil analysis, and
                advanced AI, we've created a platform that helps organizations
                make data-driven decisions about where to focus their
                reforestation initiatives for greatest environmental benefit.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="TerraForm team working in the field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            To harness the power of artificial intelligence and environmental
            science to optimize global reforestation efforts for maximum
            ecological impact in the fight against climate change.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Environmental Impact</h3>
                <p className="text-gray-600">
                  Maximize the ecological benefits of reforestation by
                  identifying optimal planting locations based on scientific
                  analysis and environmental data.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Building className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Strategic Planning</h3>
                <p className="text-gray-600">
                  Provide organizations with data-driven insights to make
                  informed decisions about their reforestation initiatives and
                  resource allocation.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Engagement</h3>
                <p className="text-gray-600">
                  Involve local communities in reforestation efforts and ensure
                  projects provide social and economic benefits alongside
                  environmental ones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Technology Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-bold">Frontend</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Figma (Design & Prototyping)</li>
                <li>• React.js (UI Development)</li>
                <li>• Tailwind CSS (Styling)</li>
                <li>• Leaflet.js (Interactive Maps)</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Server className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-bold">Backend</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js (Server & API)</li>
                <li>• Firebase (Authentication)</li>
                <li>• Express (REST API)</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Cpu className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-bold">AI & Data</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Google Gemini API</li>
                <li>• Google Earth Engine</li>
                <li>• OpenCV (Image Processing)</li>
                <li>• GDAL (Geospatial Data)</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-bold">Infrastructure</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Google Cloud IDX</li>
                <li>• Vercel (Frontend Hosting)</li>
                <li>• Render (Backend Hosting)</li>
                <li>• GitHub Actions (CI/CD)</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/map">
              <Button className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 duration-150 shadow-md hover:shadow-lg">
                Explore Our Interactive Map{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How TerraForm Works
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-emerald-200"></div>

              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-16 md:ml-0 md:mr-12 md:w-1/2 md:text-right md:pr-8 pt-1">
                    <h3 className="text-xl font-bold mb-2">Data Collection</h3>
                    <p className="text-gray-600">
                      Aggregates satellite imagery, climate records, soil data,
                      and topographical information from various sources.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pl-8"></div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pr-8"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-8 pt-1">
                    <h3 className="text-xl font-bold mb-2">AI Processing</h3>
                    <p className="text-gray-600">
                      Analyzes environmental factors using machine learning
                      models to identify areas with optimal conditions for tree
                      growth.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-16 md:ml-0 md:mr-12 md:w-1/2 md:text-right md:pr-8 pt-1">
                    <h3 className="text-xl font-bold mb-2">Site Ranking</h3>
                    <p className="text-gray-600">
                      Identifies and prioritizes areas for reforestation based
                      on potential ecological impact, sustainability, and
                      feasibility.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pl-8"></div>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pr-8"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-8 pt-1">
                    <h3 className="text-xl font-bold mb-2">Visualization</h3>
                    <p className="text-gray-600">
                      Displays results through an intuitive UI with interactive
                      maps and detailed analytics to support decision-making.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Improvements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Future Improvements
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            We're continuously enhancing TerraForm to provide even more powerful
            tools for reforestation planning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Advanced ML Models</h3>
                <p className="text-gray-600">
                  Implement deep learning-based predictive analytics for more
                  accurate forecasting of reforestation outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">
                  IoT Sensor Integration
                </h3>
                <p className="text-gray-600">
                  Collect real-time environmental data through connected sensors
                  to provide up-to-the-minute analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">GIS Mapping & Drones</h3>
                <p className="text-gray-600">
                  Use GIS tools and drones for data collection, monitoring, and
                  remote seed dispersal in hard-to-reach areas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team - Commented out for now
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            TerraForm brings together experts in environmental science, artificial intelligence, data engineering, and
            conservation to create innovative solutions for global reforestation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Founder & CEO",
                bio: "Environmental scientist with 15+ years of experience in forest ecology and conservation.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Maya Rodriguez",
                role: "CTO",
                bio: "AI specialist with a background in machine learning and environmental data analysis.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Okafor",
                role: "Head of Research",
                bio: "Expert in tropical forest ecosystems and biodiversity conservation.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Priya Sharma",
                role: "Director of Partnerships",
                bio: "Experienced in building collaborations between tech companies and environmental organizations.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-emerald-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Partners & Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Partners & Recognition
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((partner) => (
              <div
                key={partner}
                className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center"
              >
                <img
                  src={`/placeholder.svg?height=80&width=160`}
                  alt={`Partner organization ${partner}`}
                  className="max-h-12"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-emerald-600 mr-3" />
              <span className="font-medium">
                Environmental Innovation Award 2023
              </span>
            </div>
            <div className="flex items-center">
              <Award className="h-8 w-8 text-emerald-600 mr-3" />
              <span className="font-medium">AI for Good Challenge Winner</span>
            </div>
            <div className="flex items-center">
              <Award className="h-8 w-8 text-emerald-600 mr-3" />
              <span className="font-medium">
                Climate Tech Breakthrough 2022
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Restoring Our Forests
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're an environmental organization, government agency, or
            company with sustainability goals, TerraForm can help you maximize
            the impact of your reforestation initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-100 active:bg-gray-200 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 duration-150 shadow-md hover:shadow-lg"
            >
              Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:text-white bg-white/90 hover:bg-white/20 active:bg-white/30 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 duration-150 shadow-md hover:shadow-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
