import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Car } from 'lucide-react';

interface VehicleSelectorProps {
  onVehicleChange: (vehicle: { year: string; make: string; model: string }) => void;
}

const years = Array.from({ length: 35 }, (_, i) => (2024 - i).toString());
const makes = ['Dodge', 'Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'GMC', 'Ram'];
const models = {
  Dodge: ['Ram 1500', 'Ram 2500', 'Ram 3500', 'Challenger', 'Charger', 'Durango'],
  Ford: ['F-150', 'F-250', 'F-350', 'Mustang', 'Explorer', 'Escape'],
  Chevrolet: ['Silverado 1500', 'Silverado 2500', 'Camaro', 'Equinox', 'Tahoe'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Ridgeline'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Titan'],
  GMC: ['Sierra 1500', 'Sierra 2500', 'Acadia', 'Terrain', 'Yukon'],
  Ram: ['1500', '2500', '3500', 'ProMaster']
};

export const VehicleSelector = ({ onVehicleChange }: VehicleSelectorProps) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handleSelectionChange = (type: 'year' | 'make' | 'model', value: string) => {
    let newYear = selectedYear;
    let newMake = selectedMake;
    let newModel = selectedModel;

    if (type === 'year') {
      newYear = value;
      setSelectedYear(value);
    } else if (type === 'make') {
      newMake = value;
      setSelectedMake(value);
      setSelectedModel(''); // Reset model when make changes
      newModel = '';
    } else if (type === 'model') {
      newModel = value;
      setSelectedModel(value);
    }

    if (newYear && newMake && newModel) {
      onVehicleChange({ year: newYear, make: newMake, model: newModel });
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)] border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Car className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Select Vehicle</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year" className="text-sm font-medium text-muted-foreground">Year</Label>
          <Select value={selectedYear} onValueChange={(value) => handleSelectionChange('year', value)}>
            <SelectTrigger className="bg-input border-border/50 focus:ring-primary">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="make" className="text-sm font-medium text-muted-foreground">Make</Label>
          <Select value={selectedMake} onValueChange={(value) => handleSelectionChange('make', value)}>
            <SelectTrigger className="bg-input border-border/50 focus:ring-primary">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model" className="text-sm font-medium text-muted-foreground">Model</Label>
          <Select 
            value={selectedModel} 
            onValueChange={(value) => handleSelectionChange('model', value)}
            disabled={!selectedMake}
          >
            <SelectTrigger className="bg-input border-border/50 focus:ring-primary disabled:opacity-50">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {selectedMake && models[selectedMake as keyof typeof models]?.map((model) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};