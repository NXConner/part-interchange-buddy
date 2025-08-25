import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, ExternalLink, Copy, Settings } from 'lucide-react';
import { useState } from 'react';

interface CompatibleVehicle {
  year: string;
  make: string;
  model: string;
  confidence: 'high' | 'medium' | 'low';
  partNumber: string;
  notes?: string;
}

interface ResultsDisplayProps {
  searchQuery?: {
    vehicle: { year: string; make: string; model: string };
    part: { category: string; name: string; partNumber?: string };
  };
  results: CompatibleVehicle[];
}

export const ResultsDisplay = ({ searchQuery, results }: ResultsDisplayProps) => {
  const [copiedPartNumber, setCopiedPartNumber] = useState<string | null>(null);

  const copyPartNumber = (partNumber: string) => {
    navigator.clipboard.writeText(partNumber);
    setCopiedPartNumber(partNumber);
    setTimeout(() => setCopiedPartNumber(null), 2000);
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-warning-amber" />;
      case 'low':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-900/20 text-green-400 border-green-400/30';
      case 'medium':
        return 'bg-yellow-900/20 text-warning-amber border-warning-amber/30';
      case 'low':
        return 'bg-orange-900/20 text-orange-400 border-orange-400/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!searchQuery) {
    return (
      <Card className="p-8 bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)] border-border/50 text-center">
        <div className="text-muted-foreground">
          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select a vehicle and part to see interchange results</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)] border-border/50">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Interchange Results</h2>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <span className="font-medium">Vehicle:</span> {searchQuery.vehicle.year} {searchQuery.vehicle.make} {searchQuery.vehicle.model}
          </p>
          <p>
            <span className="font-medium">Part:</span> {searchQuery.part.name} 
            {searchQuery.part.category && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {searchQuery.part.category}
              </Badge>
            )}
          </p>
          {searchQuery.part.partNumber && (
            <p>
              <span className="font-medium">Part Number:</span> {searchQuery.part.partNumber}
            </p>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No interchangeable parts found</p>
          <p className="text-sm text-muted-foreground mt-2">
            This part may be unique to your vehicle or not in our database
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Found {results.length} compatible vehicle{results.length !== 1 ? 's' : ''}
          </p>
          
          {results.map((vehicle, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border/30 bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="flex items-center gap-1">
                      {getConfidenceIcon(vehicle.confidence)}
                      <Badge className={`text-xs ${getConfidenceColor(vehicle.confidence)}`}>
                        {vehicle.confidence} confidence
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Part Number:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono text-primary">
                      {vehicle.partNumber}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyPartNumber(vehicle.partNumber)}
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                    >
                      <Copy className={`h-3 w-3 ${copiedPartNumber === vehicle.partNumber ? 'text-green-400' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                  
                  {vehicle.notes && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {vehicle.notes}
                    </p>
                  )}
                </div>
                
                <Button size="sm" variant="outline" className="ml-4">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};