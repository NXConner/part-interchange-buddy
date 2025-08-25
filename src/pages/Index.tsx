import { useState } from 'react';
import { VehicleSelector } from '@/components/VehicleSelector';
import { PartSearch } from '@/components/PartSearch';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import heroImage from '@/assets/hero-automotive.jpg';
import { Wrench } from 'lucide-react';

// Mock data for demonstration
const mockResults = [
  {
    year: '2001',
    make: 'Dodge',
    model: 'Ram 1500',
    confidence: 'high' as const,
    partNumber: 'STM-1001-A',
    notes: 'Direct interchange - same OEM part number'
  },
  {
    year: '1999',
    make: 'Dodge',
    model: 'Ram 2500',
    confidence: 'high' as const,
    partNumber: 'STM-1001-A',
    notes: 'Compatible with 5.2L and 5.9L engines'
  },
  {
    year: '2000',
    make: 'Dodge',
    model: 'Dakota',
    confidence: 'medium' as const,
    partNumber: 'STM-1001-B',
    notes: 'Different mounting but same electrical specs'
  },
  {
    year: '1998',
    make: 'Jeep',
    model: 'Grand Cherokee',
    confidence: 'medium' as const,
    partNumber: 'STM-1002-A',
    notes: 'Compatible with 5.2L engine only'
  }
];

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<{ year: string; make: string; model: string } | null>(null);
  const [searchedPart, setSearchedPart] = useState<{ category: string; name: string; partNumber?: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState<{
    vehicle: { year: string; make: string; model: string };
    part: { category: string; name: string; partNumber?: string };
  } | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleVehicleChange = (vehicle: { year: string; make: string; model: string }) => {
    setSelectedVehicle(vehicle);
  };

  const handlePartSearch = (part: { category: string; name: string; partNumber?: string }) => {
    setSearchedPart(part);
    
    if (selectedVehicle) {
      // In a real app, this would make an API call
      setSearchQuery({ vehicle: selectedVehicle, part });
      
      // For demo purposes, show mock results for starter motor searches
      if (part.name.toLowerCase().includes('starter')) {
        setResults(mockResults);
      } else {
        // Show fewer results for other parts
        setResults(mockResults.slice(0, 2));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Professional automotive workshop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wrench className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Parts Interchange Buddy
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cross-reference and find compatible parts across different vehicle years and models
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VehicleSelector onVehicleChange={handleVehicleChange} />
          <PartSearch onPartSearch={handlePartSearch} />
        </div>
        
        <ResultsDisplay searchQuery={searchQuery} results={results} />
        
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 rounded-lg bg-secondary/20 border border-border/30">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Comprehensive Database</h3>
            <p className="text-sm text-muted-foreground">
              Access millions of parts across thousands of vehicle models and years
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-secondary/20 border border-border/30">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Confidence Ratings</h3>
            <p className="text-sm text-muted-foreground">
              Each interchange match includes confidence levels to help you make informed decisions
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-secondary/20 border border-border/30">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Professional Tools</h3>
            <p className="text-sm text-muted-foreground">
              Built for mechanics, parts suppliers, and automotive professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;