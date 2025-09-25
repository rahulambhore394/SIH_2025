import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Map,
  Layers,
  ArrowLeft,
  MapPin,
  Droplets,
  CloudRain,
  Thermometer,
  AlertTriangle,
  Eye,
  Filter,
  Download,
  Maximize2,
  Settings,
  Navigation
} from 'lucide-react';

interface InteractiveMapProps {
  onNavigate: (screen: string) => void;
}

export function InteractiveMap({ onNavigate }: InteractiveMapProps) {
  const [activeLayer, setActiveLayer] = useState('groundwater');
  const [selectedWell, setSelectedWell] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(8);

  // Mock well data
  const wells = [
    { 
      id: 1, 
      lat: 18.5204, 
      lng: 73.8567, 
      level: 42.3, 
      status: 'normal', 
      location: 'Pune District',
      quality: 85,
      lastUpdate: '2 hours ago'
    },
    { 
      id: 2, 
      lat: 19.7515, 
      lng: 75.7139, 
      level: 38.1, 
      status: 'low', 
      location: 'Aurangabad',
      quality: 78,
      lastUpdate: '1 hour ago'
    },
    { 
      id: 3, 
      lat: 17.6599, 
      lng: 75.9064, 
      level: 29.8, 
      status: 'critical', 
      location: 'Solapur',
      quality: 62,
      lastUpdate: '30 min ago'
    },
    { 
      id: 4, 
      lat: 16.7050, 
      lng: 74.2433, 
      level: 45.6, 
      status: 'normal', 
      location: 'Kolhapur',
      quality: 92,
      lastUpdate: '15 min ago'
    },
    { 
      id: 5, 
      lat: 20.5937, 
      lng: 78.9629, 
      level: 33.2, 
      status: 'low', 
      location: 'Nagpur',
      quality: 73,
      lastUpdate: '45 min ago'
    }
  ];

  const layers = [
    { id: 'groundwater', name: 'Groundwater Levels', icon: Droplets, color: 'blue' },
    { id: 'rainfall', name: 'Rainfall Data', icon: CloudRain, color: 'cyan' },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, color: 'red' },
    { id: 'quality', name: 'Water Quality', icon: Eye, color: 'green' },
    { id: 'risk', name: 'Risk Areas', icon: AlertTriangle, color: 'orange' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'low': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerSize = (status: string) => {
    switch (status) {
      case 'critical': return 'w-6 h-6';
      case 'low': return 'w-5 h-5';
      default: return 'w-4 h-4';
    }
  };

  const renderMapOverlay = () => {
    if (activeLayer === 'rainfall') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/30 rounded-lg pointer-events-none">
          <div className="absolute top-8 left-8 text-white text-xs bg-blue-600 px-2 py-1 rounded">
            Rainfall: 45-120mm
          </div>
        </div>
      );
    }
    
    if (activeLayer === 'temperature') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-yellow-500/20 rounded-lg pointer-events-none">
          <div className="absolute top-8 left-8 text-white text-xs bg-red-600 px-2 py-1 rounded">
            Temp: 28-35°C
          </div>
        </div>
      );
    }
    
    if (activeLayer === 'risk') {
      return (
        <div className="absolute inset-0 rounded-lg pointer-events-none">
          <div className="absolute top-16 right-12 w-16 h-16 bg-red-500/40 rounded-full"></div>
          <div className="absolute bottom-20 left-16 w-12 h-12 bg-yellow-500/30 rounded-full"></div>
          <div className="absolute top-8 left-8 text-white text-xs bg-red-600 px-2 py-1 rounded">
            High Risk Areas
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">Interactive Map</h1>
            <p className="text-sm text-gray-600">Maharashtra Groundwater Network</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Layer Controls */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Map Layers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {layers.map((layer) => {
                const IconComponent = layer.icon;
                return (
                  <Button
                    key={layer.id}
                    variant={activeLayer === layer.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveLayer(layer.id)}
                    className="flex items-center space-x-1"
                  >
                    <IconComponent className="w-3 h-3" />
                    <span className="text-xs">{layer.name}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <Card className="relative">
          <CardContent className="p-0">
            <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
              {/* Base Map */}
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1722081797648-7a76e8c39935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjB3YXRlciUyMHJlc291cmNlc3xlbnwxfHx8fDE3NTg3OTQzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Satellite map of Maharashtra"
                className="w-full h-full object-cover"
              />
              
              {/* Layer Overlay */}
              {renderMapOverlay()}
              
              {/* Well Markers */}
              {wells.map((well) => (
                <div
                  key={well.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${20 + (well.id - 1) * 15}%`,
                    top: `${30 + (well.id % 2) * 20}%`,
                  }}
                  onClick={() => setSelectedWell(selectedWell === well.id ? null : well.id)}
                >
                  <div className={`${getMarkerSize(well.status)} ${getStatusColor(well.status)} rounded-full border-2 border-white shadow-lg animate-pulse`}>
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-black/70 px-1 rounded whitespace-nowrap">
                    {well.level}m
                  </div>
                </div>
              ))}
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button size="sm" variant="secondary" onClick={() => setZoomLevel(Math.min(12, zoomLevel + 1))}>
                  +
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setZoomLevel(Math.max(6, zoomLevel - 1))}>
                  -
                </Button>
                <Button size="sm" variant="secondary">
                  <Navigation className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <h4 className="text-xs font-medium text-gray-900">Groundwater Status</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Normal (&gt;40m)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Low (30-40m)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Critical (&lt;30m)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Well Details */}
        {selectedWell && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Well Details</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedWell(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                const well = wells.find(w => w.id === selectedWell);
                if (!well) return null;
                
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{well.location}</p>
                        <p className="text-sm text-gray-600">Well ID: MW-{well.id.toString().padStart(3, '0')}</p>
                      </div>
                      <Badge className={`${getStatusColor(well.status)} text-white capitalize`}>
                        {well.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Water Level</p>
                        <p className="font-medium">{well.level}m</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Quality Index</p>
                        <p className="font-medium">{well.quality}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Update</p>
                        <p className="font-medium">{well.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        View History
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Map Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-1"></div>
              <p className="text-lg font-bold text-green-600">{wells.filter(w => w.status === 'normal').length}</p>
              <p className="text-xs text-gray-600">Normal</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <p className="text-lg font-bold text-yellow-600">{wells.filter(w => w.status === 'low').length}</p>
              <p className="text-xs text-gray-600">Low</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-1"></div>
              <p className="text-lg font-bold text-red-600">{wells.filter(w => w.status === 'critical').length}</p>
              <p className="text-xs text-gray-600">Critical</p>
            </CardContent>
          </Card>
        </div>

        {/* Layer Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Current Layer: {layers.find(l => l.id === activeLayer)?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              {activeLayer === 'groundwater' && (
                <p>Showing real-time groundwater levels from 1,247 monitoring wells across Maharashtra. Data updated every 2 hours.</p>
              )}
              {activeLayer === 'rainfall' && (
                <p>24-hour rainfall accumulation from IMD weather stations. Blue areas indicate higher precipitation levels.</p>
              )}
              {activeLayer === 'temperature' && (
                <p>Current temperature distribution across the region. Red areas indicate higher temperatures affecting evapotranspiration.</p>
              )}
              {activeLayer === 'quality' && (
                <p>Water quality index based on pH, TDS, and contamination levels. Green indicates good quality water.</p>
              )}
              {activeLayer === 'risk' && (
                <p>Drought and flood risk assessment based on AI models. Red circles indicate high-risk areas requiring attention.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}