import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowRight, Users, Building, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">About TerraForm</h1>
            <p className="text-xl mb-8">
              We're on a mission to optimize reforestation efforts worldwide through advanced AI technology and
              environmental science.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                TerraForm was founded in 2020 by a team of environmental scientists, data engineers, and AI specialists
                who recognized the need for more strategic approaches to global reforestation efforts.
              </p>
              <p className="text-gray-600 mb-4">
                We observed that while many organizations were committed to planting trees, the selection of planting
                sites was often based on convenience or opportunity rather than scientific analysis of where trees would
                have the greatest ecological impact.
              </p>
              <p className="text-gray-600">
                Our AI system was developed to address this gap, providing data-driven insights to maximize the
                environmental benefits of reforestation projects worldwide.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            To harness the power of artificial intelligence and environmental science to optimize global reforestation
            efforts for maximum ecological impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Environmental Impact</h3>
                <p className="text-gray-600">
                  Maximize the ecological benefits of reforestation by identifying optimal planting locations based on
                  scientific analysis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Building className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Strategic Planning</h3>
                <p className="text-gray-600">
                  Provide organizations with data-driven insights to make informed decisions about their reforestation
                  initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Engagement</h3>
                <p className="text-gray-600">
                  Involve local communities in reforestation efforts and ensure projects provide social and economic
                  benefits alongside environmental ones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
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
                name: "Lionel Messi",
                role: "Founder & CEO",
                bio: "Environmental scientist with 15+ years of experience in forest ecology and conservation.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Cristiano Ronaldo",
                role: "CTO",
                bio: "AI specialist with a background in machine learning and environmental data analysis.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Neymar Jr.",
                role: "Head of Research",
                bio: "Expert in tropical forest ecosystems and biodiversity conservation.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Kylian Mbappé",
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

      {/* Partners & Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Partners & Recognition</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((partner) => (
              <div key={partner} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
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
              <span className="font-medium">Environmental Innovation Award 2023</span>
            </div>
            <div className="flex items-center">
              <Award className="h-8 w-8 text-emerald-600 mr-3" />
              <span className="font-medium">AI for Good Challenge Winner</span>
            </div>
            <div className="flex items-center">
              <Award className="h-8 w-8 text-emerald-600 mr-3" />
              <span className="font-medium">Climate Tech Breakthrough 2022</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Restoring Our Forests</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're an environmental organization, government agency, or company with sustainability goals,
            TerraForm can help you maximize the impact of your reforestation initiatives.
          </p>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
            Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

