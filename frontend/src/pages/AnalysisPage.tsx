import DataAnalysisDashboard from "../components/DataAnalysisDashboard";

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Data Analysis Dashboard</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Analyze environmental data and reforestation potential across different regions. 
          Compare metrics and identify trends to make informed decisions.
        </p>
        
        <DataAnalysisDashboard />
      </div>
    </div>
  );
}
