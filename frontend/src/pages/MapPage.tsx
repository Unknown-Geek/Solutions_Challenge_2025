import MapDashboard from "../components/MapDashboard";

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reforestation Map Explorer</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Explore potential reforestation sites across the globe. Use the filters to narrow down locations 
          based on climate conditions, soil quality, biodiversity impact, and more.
        </p>
        
        <MapDashboard />
      </div>
    </div>
  );
}
