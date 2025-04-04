import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  MapPin,
  BarChart2,
  Users,
  FileText,
  Calculator,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate("/signup");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center mr-2 group-hover:bg-emerald-700 transition-colors">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                TerraForm
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/map"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Map Explorer
            </Link>
            <Link
              to="/analysis"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Data Analysis
            </Link>
            <Link
              to="/calculator"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Suitability Calculator
            </Link>
            <Link
              to="/sites"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Site Rankings
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleLogin}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150"
            >
              Log In
            </Button>
            <Button
              onClick={handleGetStarted}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150 shadow-sm hover:shadow-md"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link
              to="/map"
              className="flex items-center p-3 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Map Explorer</span>
            </Link>
            <Link
              to="/analysis"
              className="flex items-center p-3 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Data Analysis</span>
            </Link>
            <Link
              to="/calculator"
              className="flex items-center p-3 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Suitability Calculator</span>
            </Link>
            <Link
              to="/sites"
              className="flex items-center p-3 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Site Rankings</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center p-3 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">About</span>
            </Link>
            <div className="pt-4 space-y-3">
              <Button
                variant="outline"
                onClick={handleLogin}
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150"
              >
                Log In
              </Button>
              <Button
                onClick={handleGetStarted}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150 shadow-sm hover:shadow-md"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
