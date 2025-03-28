import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin, BarChart2, Users, FileText } from 'lucide-react';
import { Button } from "./ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center mr-2">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TerraForm</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/map" className="text-gray-600 hover:text-emerald-600 font-medium">
              Map Explorer
            </Link>
            <Link to="/analysis" className="text-gray-600 hover:text-emerald-600 font-medium">
              Data Analysis
            </Link>
            <Link to="/sites" className="text-gray-600 hover:text-emerald-600 font-medium">
              Site Rankings
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 font-medium">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Log In
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
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
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Map Explorer</span>
            </Link>
            <Link 
              to="/analysis" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Data Analysis</span>
            </Link>
            <Link 
              to="/sites" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">Site Rankings</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="h-5 w-5 mr-3 text-emerald-600" />
              <span className="font-medium">About</span>
            </Link>
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full border-emerald-600 text-emerald-600">
                Log In
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
