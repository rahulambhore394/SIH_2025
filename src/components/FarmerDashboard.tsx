import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Droplets, 
  TrendingDown, 
  AlertTriangle, 
  MessageSquare,
  Bell,
  Navigation,
  CloudRain,
  Thermometer,
  Wind,
  Sun,
  Calendar
} from 'lucide-react';

interface FarmerDashboardProps {
  onNavigate: (screen: string) => void;
}

export function FarmerDashboard({ onNavigate }: FarmerDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for farmer dashboard
  const waterTableData = {
    currentDepth: 45.2,
    lastWeekDepth: 47.8,
    status: 'moderate',
    trend: 'improving'
  };

  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    precipitation: 2.5,
    forecast: 'Partly cloudy with chance of rain'
  };

  const irrigationAdvice = {
    recommendation: 'Reduce irrigation by 20%',
    reason: 'Recent rainfall and improving groundwater levels',
    nextCheck: '2 days',
    efficiency: 78
  };

  const alerts = [
    { id: 1, type: 'info', message: 'Groundwater levels improving in your area', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'Consider crop rotation for better water efficiency', time: '1 day ago' },
    { id: 3, type: 'success', message: 'Government subsidy approved for drip irrigation', time: '2 days ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'improving' ? 
      <TrendingDown className="w-4 h-4 text-green-600 rotate-180" /> :
      <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Good morning, Ramesh</h1>
            <p className="text-sm text-gray-600">Farm Location: Pune, Maharashtra</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('map')}>
              <Navigation className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Water Table Status */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span>Water Table Status</span>
              </CardTitle>
              <Badge className={getStatusColor(waterTableData.status)}>
                {waterTableData.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{waterTableData.currentDepth}m</p>
                  <p className="text-sm text-gray-600">Current depth</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(waterTableData.trend)}
                    <span className="text-sm text-green-600">+2.6m from last week</span>
                  </div>
                  <p className="text-xs text-gray-500">Trend: {waterTableData.trend}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1677907564161-7279d5aac75f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91bmR3YXRlciUyMG1vbml0b3JpbmclMjB3ZWxsfGVufDF8fHx8MTc1ODc5NDM3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Groundwater monitoring well"
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <p className="text-xs text-blue-800">Local monitoring well - Updated 2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <span>Weather Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span className="text-sm">{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudRain className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{weatherData.precipitation}mm</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span className="text-sm">{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{weatherData.windSpeed} km/h</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{weatherData.forecast}</p>
          </CardContent>
        </Card>

        {/* Irrigation Advice */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1655048425771-daa9087aaa00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBpcnJpZ2F0aW9uJTIwZmllbGR8ZW58MXx8fHwxNzU4Nzk0MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Irrigation"
                className="w-5 h-5 rounded object-cover"
              />
              <span>Smart Irrigation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-medium text-green-800 mb-1">{irrigationAdvice.recommendation}</p>
                <p className="text-sm text-green-700">{irrigationAdvice.reason}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Water efficiency</span>
                  <span>{irrigationAdvice.efficiency}%</span>
                </div>
                <Progress value={irrigationAdvice.efficiency} className="h-2" />
                <p className="text-xs text-gray-600 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Next recommendation in {irrigationAdvice.nextCheck}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Alerts & Updates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => onNavigate('chatbot')}
            className="h-14 flex flex-col items-center justify-center space-y-1 bg-blue-600 hover:bg-blue-700"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Ask AI Assistant</span>
          </Button>
          <Button 
            onClick={() => onNavigate('data-charts')}
            variant="outline"
            className="h-14 flex flex-col items-center justify-center space-y-1"
          >
            <TrendingDown className="w-5 h-5" />
            <span className="text-xs">View Trends</span>
          </Button>
        </div>
      </div>
    </div>
  );
}