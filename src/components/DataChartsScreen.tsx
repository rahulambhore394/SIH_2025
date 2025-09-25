import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Eye,
  BarChart3,
  Activity,
  Droplets,
  CloudRain,
  Thermometer,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface DataChartsScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

export function DataChartsScreen({ onNavigate, userRole }: DataChartsScreenProps) {
  const [timeRange, setTimeRange] = useState('6months');
  const [dataType, setDataType] = useState('groundwater');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock data for different chart types
  const groundwaterTrends = [
    { month: 'Jan', current: 42.3, previous: 40.1, rainfall: 12, temperature: 25 },
    { month: 'Feb', current: 41.8, previous: 39.8, rainfall: 8, temperature: 27 },
    { month: 'Mar', current: 40.2, previous: 38.5, rainfall: 15, temperature: 30 },
    { month: 'Apr', current: 38.5, previous: 36.2, rainfall: 22, temperature: 33 },
    { month: 'May', current: 36.9, previous: 34.1, rainfall: 45, temperature: 35 },
    { month: 'Jun', current: 39.2, previous: 37.8, rainfall: 156, temperature: 32 },
    { month: 'Jul', current: 43.1, previous: 41.5, rainfall: 234, temperature: 29 },
    { month: 'Aug', current: 44.8, previous: 43.2, rainfall: 198, temperature: 28 },
    { month: 'Sep', current: 43.2, previous: 41.8, rainfall: 89, temperature: 30 },
    { month: 'Oct', current: 41.6, previous: 40.3, rainfall: 34, temperature: 28 },
    { month: 'Nov', current: 40.1, previous: 39.1, rainfall: 18, temperature: 26 },
    { month: 'Dec', current: 41.2, previous: 40.5, rainfall: 8, temperature: 24 }
  ];

  const regionalData = [
    { region: 'Pune', wells: 45, critical: 3, low: 12, normal: 30, avgLevel: 42.3 },
    { region: 'Nashik', wells: 38, critical: 1, low: 8, normal: 29, avgLevel: 45.1 },
    { region: 'Solapur', wells: 52, critical: 8, low: 18, normal: 26, avgLevel: 35.2 },
    { region: 'Kolhapur', wells: 29, critical: 0, low: 4, normal: 25, avgLevel: 48.7 },
    { region: 'Aurangabad', wells: 41, critical: 2, low: 11, normal: 28, avgLevel: 39.8 }
  ];

  const correlationData = [
    { rainfall: 12, groundwater: 42.3, temperature: 25 },
    { rainfall: 8, groundwater: 41.8, temperature: 27 },
    { rainfall: 15, groundwater: 40.2, temperature: 30 },
    { rainfall: 22, groundwater: 38.5, temperature: 33 },
    { rainfall: 45, groundwater: 36.9, temperature: 35 },
    { rainfall: 156, groundwater: 39.2, temperature: 32 },
    { rainfall: 234, groundwater: 43.1, temperature: 29 },
    { rainfall: 198, groundwater: 44.8, temperature: 28 },
    { rainfall: 89, groundwater: 43.2, temperature: 30 },
    { rainfall: 34, groundwater: 41.6, temperature: 28 },
    { rainfall: 18, groundwater: 40.1, temperature: 26 },
    { rainfall: 8, groundwater: 41.2, temperature: 24 }
  ];

  const pieChartData = [
    { name: 'Normal', value: 118, color: '#22c55e' },
    { name: 'Low', value: 53, color: '#eab308' },
    { name: 'Critical', value: 14, color: '#ef4444' }
  ];

  const weeklyData = [
    { day: 'Mon', alerts: 2, readings: 1247, quality: 94 },
    { day: 'Tue', alerts: 1, readings: 1251, quality: 96 },
    { day: 'Wed', alerts: 4, readings: 1243, quality: 92 },
    { day: 'Thu', alerts: 0, readings: 1256, quality: 98 },
    { day: 'Fri', alerts: 3, readings: 1248, quality: 95 },
    { day: 'Sat', alerts: 1, readings: 1234, quality: 97 },
    { day: 'Sun', alerts: 2, readings: 1241, quality: 94 }
  ];

  const getChartTitle = () => {
    switch (dataType) {
      case 'groundwater': return 'Groundwater Level Trends';
      case 'rainfall': return 'Rainfall Pattern Analysis';
      case 'temperature': return 'Temperature Variations';
      case 'correlation': return 'Multi-Parameter Correlation';
      default: return 'Data Analysis';
    }
  };

  const renderMainChart = () => {
    switch (dataType) {
      case 'groundwater':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={groundwaterTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="current" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
                name="Current Year"
              />
              <Area 
                type="monotone" 
                dataKey="previous" 
                stroke="#94a3b8" 
                fill="#94a3b8"
                fillOpacity={0.1}
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Previous Year"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'rainfall':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groundwaterTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="rainfall" fill="#06b6d4" name="Rainfall (mm)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groundwaterTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'correlation':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rainfall" name="Rainfall" unit="mm" fontSize={12} />
              <YAxis dataKey="groundwater" name="Groundwater" unit="m" fontSize={12} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Rainfall vs Groundwater" data={correlationData} fill="#8b5cf6" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">Data Analytics</h1>
            <p className="text-sm text-gray-600">Advanced Data Visualization & Insights</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Data Type</label>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groundwater">Groundwater</SelectItem>
                    <SelectItem value="rainfall">Rainfall</SelectItem>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="correlation">Correlation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                    <SelectItem value="solapur">Solapur</SelectItem>
                    <SelectItem value="kolhapur">Kolhapur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            {/* Main Chart */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>{getChartTitle()}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {timeRange.replace(/(\d+)(\w+)/, '$1 $2')}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {renderMainChart()}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Avg Improvement</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">+2.3m</span>
                  </div>
                  <p className="text-xs text-gray-600">Compared to last year</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Data Quality</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">96.2%</span>
                  </div>
                  <p className="text-xs text-gray-600">Sensor reliability</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="alerts" fill="#f59e0b" name="Alerts" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-4">
            {/* Regional Comparison */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  {pieChartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">District-wise Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {regionalData.map((region, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{region.region}</h4>
                        <span className="text-sm font-bold text-blue-600">{region.avgLevel}m avg</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{region.wells}</p>
                          <p className="text-xs text-gray-600">Total Wells</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-green-600">{region.normal}</p>
                          <p className="text-xs text-gray-600">Normal</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-yellow-600">{region.low}</p>
                          <p className="text-xs text-gray-600">Low</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-red-600">{region.critical}</p>
                          <p className="text-xs text-gray-600">Critical</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            {/* AI Insights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>AI-Generated Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Positive Trend Detected</p>
                        <p className="text-sm text-blue-700">Groundwater levels have improved by 15% across 78% of monitoring stations in the past quarter.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Seasonal Pattern Alert</p>
                        <p className="text-sm text-yellow-700">Summer depletion rates are 23% higher than historical averages. Consider water conservation measures.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Droplets className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Rainfall Correlation Strong</p>
                        <p className="text-sm text-green-700">96% correlation between monsoon rainfall and groundwater recharge rates indicates healthy aquifer response.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Correlation Matrix */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Parameter Correlations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">0.96</div>
                    <p className="text-sm text-gray-600">Rainfall vs Groundwater</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">-0.73</div>
                    <p className="text-sm text-gray-600">Temperature vs Water Level</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">0.84</div>
                    <p className="text-sm text-gray-600">Monsoon vs Annual Recharge</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">0.67</div>
                    <p className="text-sm text-gray-600">Irrigation vs Depletion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forecasting Accuracy */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">LSTM Forecasting Model</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Anomaly Detection (Isolation Forest)</span>
                    <span className="font-bold text-blue-600">96.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Assessment (Gradient Boosting)</span>
                    <span className="font-bold text-purple-600">91.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}