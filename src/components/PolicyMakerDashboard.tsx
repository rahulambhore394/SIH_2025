import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Map,
  AlertTriangle,
  FileText,
  Send,
  TrendingUp,
  TrendingDown,
  MapPin,
  Users,
  Zap,
  CloudRain,
  Thermometer,
  Bell,
  MessageSquare,
  Shield
} from 'lucide-react';

interface PolicyMakerDashboardProps {
  onNavigate: (screen: string) => void;
}

export function PolicyMakerDashboard({ onNavigate }: PolicyMakerDashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState('maharashtra');

  // Mock data for policy maker dashboard
  const regionalStats = {
    totalWells: 1247,
    criticalWells: 89,
    normalWells: 756,
    lowWells: 402,
    activeFarmers: 3420,
    pendingAdvisories: 12
  };

  const riskAreas = [
    { district: 'Marathwada', risk: 'high', wells: 156, population: 89000, action: 'Emergency water supply' },
    { district: 'Vidarbha', risk: 'medium', wells: 234, population: 156000, action: 'Monitoring increased' },
    { district: 'Western Ghats', risk: 'low', wells: 89, population: 67000, action: 'Normal operations' },
    { district: 'Konkan', risk: 'low', wells: 123, population: 98000, action: 'Normal operations' }
  ];

  const climateData = {
    temperature: { current: 32, change: '+2.3', period: 'vs last month' },
    rainfall: { current: 45, change: '-23%', period: 'below average' },
    humidity: { current: 67, change: '+5%', period: 'vs normal' },
    forecast: 'Drought conditions likely to persist for next 2 weeks'
  };

  const pendingAdvisories = [
    { id: 1, title: 'Water Conservation Alert - Pune District', priority: 'high', farms: 456, created: '2 hours ago' },
    { id: 2, title: 'Irrigation Schedule Update - Nashik', priority: 'medium', farms: 234, created: '4 hours ago' },
    { id: 3, title: 'Groundwater Recharge Notice - Solapur', priority: 'low', farms: 123, created: '1 day ago' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Regional Overview</h1>
            <p className="text-sm text-gray-600">Maharashtra Water Resources Department</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('reports')}>
              <FileText className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            <TabsTrigger value="advisories">Advisories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Regional Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Active Wells</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{regionalStats.totalWells}</p>
                  <p className="text-xs text-gray-600">
                    {regionalStats.criticalWells} critical, {regionalStats.normalWells} normal
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Active Farmers</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{regionalStats.activeFarmers}</p>
                  <p className="text-xs text-gray-600">
                    Registered in monitoring system
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map Preview */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Map className="w-5 h-5 text-purple-600" />
                    <span>Groundwater Status Map</span>
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => onNavigate('map')}>
                    Full Map
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1722081797648-7a76e8c39935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBtYXAlMjB3YXRlciUyMHJlc291cmNlc3xlbnwxfHx8fDE3NTg3OTQzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Satellite map of water resources"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Interactive Groundwater Map</p>
                      <p className="text-sm opacity-90">Tap to view full regional data</p>
                    </div>
                  </div>
                </div>
                
                {/* Map Legend */}
                <div className="flex justify-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Normal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Critical</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Climate Overview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <CloudRain className="w-5 h-5 text-blue-600" />
                  <span>Climate Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-1" />
                    <p className="text-lg font-bold">{climateData.temperature.current}°C</p>
                    <p className="text-xs text-gray-600">{climateData.temperature.change} {climateData.temperature.period}</p>
                  </div>
                  <div className="text-center">
                    <CloudRain className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-lg font-bold">{climateData.rainfall.current}mm</p>
                    <p className="text-xs text-gray-600">{climateData.rainfall.change} {climateData.rainfall.period}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-lg font-bold">{climateData.humidity.current}%</p>
                    <p className="text-xs text-gray-600">{climateData.humidity.change} {climateData.humidity.period}</p>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-800">{climateData.forecast}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            {/* Risk Areas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Risk Assessment by District</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskAreas.map((area, index) => (
                    <div key={index} className={`border rounded-lg p-3 ${getRiskColor(area.risk)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{area.district}</h4>
                        <Badge className={getRiskColor(area.risk)}>
                          {area.risk} risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>Wells: {area.wells}</div>
                        <div>Population: {area.population.toLocaleString()}</div>
                      </div>
                      <p className="text-xs font-medium">Action: {area.action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => onNavigate('emergency-response')}
                className="h-14 flex flex-col items-center justify-center space-y-1 bg-red-600 hover:bg-red-700"
              >
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs">Emergency Response</span>
              </Button>
              <Button 
                onClick={() => onNavigate('risk-analysis')}
                variant="outline"
                className="h-14 flex flex-col items-center justify-center space-y-1"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs">Detailed Analysis</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advisories" className="space-y-4">
            {/* Pending Advisories */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Send className="w-5 h-5 text-blue-600" />
                    <span>Pending Advisories ({pendingAdvisories.length})</span>
                  </CardTitle>
                  <Button size="sm" onClick={() => onNavigate('create-advisory')}>
                    Create New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingAdvisories.map((advisory) => (
                    <div key={advisory.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm leading-tight">{advisory.title}</h4>
                        <Badge className={getPriorityColor(advisory.priority)}>
                          {advisory.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{advisory.farms} farms affected</span>
                        <span>{advisory.created}</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Review & Send
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advisory Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">24</p>
                  <p className="text-xs text-gray-600">Sent this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-green-600">89%</p>
                  <p className="text-xs text-gray-600">Response rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-orange-600">2.3k</p>
                  <p className="text-xs text-gray-600">Farmers reached</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button 
            onClick={() => onNavigate('chatbot')}
            className="h-14 flex flex-col items-center justify-center space-y-1 bg-blue-600 hover:bg-blue-700"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Ask AI Assistant</span>
          </Button>
          <Button 
            onClick={() => onNavigate('risk-assessment')}
            variant="outline"
            className="h-14 flex flex-col items-center justify-center space-y-1"
          >
            <Shield className="w-5 h-5" />
            <span className="text-xs">Risk Assessment</span>
          </Button>
        </div>
      </div>
    </div>
  );
}