import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Settings } from 'lucide-react';

interface PartSearchProps {
  onPartSearch: (part: { category: string; name: string; partNumber?: string }) => void;
}

const partCategories = [
  'Engine',
  'Transmission',
  'Electrical',
  'Suspension',
  'Brakes',
  'Cooling',
  'Fuel System',
  'Exhaust',
  'Body',
  'Interior'
];

const commonParts = {
  Engine: ['Starter Motor', 'Alternator', 'Water Pump', 'Oil Pump', 'Timing Belt', 'Spark Plugs'],
  Transmission: ['Transmission Filter', 'Torque Converter', 'Shift Solenoid', 'Transmission Mount'],
  Electrical: ['Battery', 'Ignition Coil', 'Fuel Injector', 'ECU', 'Wiring Harness'],
  Suspension: ['Shock Absorber', 'Strut', 'Ball Joint', 'Control Arm', 'Sway Bar'],
  Brakes: ['Brake Pads', 'Brake Rotors', 'Brake Caliper', 'Master Cylinder', 'Brake Lines'],
  Cooling: ['Radiator', 'Thermostat', 'Cooling Fan', 'Radiator Hose', 'Water Pump'],
  'Fuel System': ['Fuel Pump', 'Fuel Filter', 'Fuel Injector', 'Fuel Tank', 'Fuel Lines'],
  Exhaust: ['Catalytic Converter', 'Muffler', 'Exhaust Pipe', 'O2 Sensor', 'EGR Valve'],
  Body: ['Headlight', 'Taillight', 'Bumper', 'Mirror', 'Door Handle', 'Fender'],
  Interior: ['Seat', 'Dashboard', 'Steering Wheel', 'Door Panel', 'Console']
};

export const PartSearch = ({ onPartSearch }: PartSearchProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [customPartName, setCustomPartName] = useState('');

  const handleSearch = () => {
    const partName = selectedPart === 'custom' ? customPartName : selectedPart;
    
    if (selectedCategory && partName) {
      onPartSearch({
        category: selectedCategory,
        name: partName,
        partNumber: partNumber || undefined
      });
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)] border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Search Parts</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-input border-border/50 focus:ring-primary">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {partCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Part Name</Label>
            <Select value={selectedPart} onValueChange={setSelectedPart} disabled={!selectedCategory}>
              <SelectTrigger className="bg-input border-border/50 focus:ring-primary disabled:opacity-50">
                <SelectValue placeholder="Select part" />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory && commonParts[selectedCategory as keyof typeof commonParts]?.map((part) => (
                  <SelectItem key={part} value={part}>{part}</SelectItem>
                ))}
                <SelectItem value="custom">Custom Part Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedPart === 'custom' && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Custom Part Name</Label>
            <Input
              placeholder="Enter part name"
              value={customPartName}
              onChange={(e) => setCustomPartName(e.target.value)}
              className="bg-input border-border/50 focus:ring-primary"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Part Number (Optional)</Label>
          <Input
            placeholder="Enter part number"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            className="bg-input border-border/50 focus:ring-primary"
          />
        </div>

        <Button 
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-primary to-automotive-blue-dark hover:from-automotive-blue-light hover:to-primary transition-all duration-300 shadow-[var(--shadow-automotive)]"
          disabled={!selectedCategory || (!selectedPart || (selectedPart === 'custom' && !customPartName))}
        >
          <Search className="h-4 w-4 mr-2" />
          Search Interchangeable Parts
        </Button>
      </div>
    </Card>
  );
};