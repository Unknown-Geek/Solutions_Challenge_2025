import { Routes, Route } from 'react-router-dom';
 import Layout from "./components/Layout"
 import HomePage from "./pages/HomePage"
 import MapPage from "./pages/MapPage"
 import AnalysisPage from "./pages/AnalysisPage"
 import SitesPage from "./pages/SitesPage"
 import AboutPage from "./pages/AboutPage"
 import SuitabilityCalculatorPage from "./pages/SuitabilityCalculator"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="calculator" element={<SuitabilityCalculatorPage />} />
        <Route path="sites" element={<SitesPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
