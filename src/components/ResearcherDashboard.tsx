import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import { 
  BarChart3, 
  Download, 
  AlertTriangle, 
  TrendingUp,
  Database,
  FileSpreadsheet,
  Zap,
  Eye,
  Calendar,
  Settings,
  MessageSquare
} from 'lucide-react';

interface ResearcherDashboardProps {
  onNavigate: (screen: string) => void;
}

export function ResearcherDashboard({ onNavigate }: ResearcherDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('groundwater-level');

  // Mock historical groundwater data
  const groundwaterData = [
    { month: 'Jan', level: 42.3, rainfall: 12, temperature: 25 },
    { month: 'Feb', level: 41.8, rainfall: 8, temperature: 27 },
    { month: 'Mar', level: 40.2, rainfall: 15, temperature: 30 },
    { month: 'Apr', level: 38.5, rainfall: 22, temperature: 33 },
    { month: 'May', level: 36.9, rainfall: 45, temperature: 35 },
    { month: 'Jun', level: 39.2, rainfall: 156, temperature: 32 },
    { month: 'Jul', level: 43.1, rainfall: 234, temperature: 29 },
    { month: 'Aug', level: 44.8, rainfall: 198, temperature: 28 },
    { month: 'Sep', level: 43.2, rainfall: 89, temperature: 30 },
    { month: 'Oct', level: 41.6, rainfall: 34, temperature: 28 },
    { month: 'Nov', level: 40.1, rainfall: 18, temperature: 26 },
    { month: 'Dec', level: 41.2, rainfall: 8, temperature: 24 }
  ];

  // AI forecast data
  const forecastData = [
    { month: 'Jan 24', actual: 41.2, predicted: 41.5, confidence: 95 },
    { month: 'Feb 24', actual: null, predicted: 40.8, confidence: 89 },
    { month: 'Mar 24', actual: null, predicted: 39.2, confidence: 82 },
    { month: 'Apr 24', actual: null, predicted: 37.6, confidence: 78 },
    { month: 'May 24', actual: null, predicted: 36.1, confidence: 74 },
    { month: 'Jun 24', actual: null, predicted: 38.9, confidence: 71 }
  ];

  // Anomaly detection data
  const anomalies = [
    { id: 1, date: '2023-11-15', type: 'sudden_drop', severity: 'high', value: -5.2, location: 'Well ID: MW-234' },
    { id: 2, date: '2023-10-28', type: 'unusual_spike', severity: 'medium', value: +3.8, location: 'Well ID: MW-156' },
    { id: 3, date: '2023-10-12', type: 'irregular_pattern', severity: 'low', value: 2.1, location: 'Well ID: MW-089' },
    { id: 4, date: '2023-09-30', type: 'seasonal_deviation', severity: 'medium', value: -2.9, location: 'Well ID: MW-345' }
  ];

  // Data export options
  const exportOptions = [
    { name: 'Historical DWLR Data', format: 'CSV', size: '2.4 MB', records: '12,456' },
    { name: 'Rainfall Correlation Analysis', format: 'Excel', size: '890 KB', records: '3,245' },
    { name: 'Anomaly Detection Report', format: 'PDF', size: '1.2 MB', records: '89' },
    { name: 'AI Forecast Model Data', format: 'JSON', size: '345 KB', records: '156' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'sudden_drop': return '↓';
      case 'unusual_spike': return '↑';
      case 'irregular_pattern': return '~';
      case 'seasonal_deviation': return '◊';
      default: return '?';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Research Dashboard</h1>
            <p className="text-sm text-gray-600">Advanced Analytics & Data Insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('data-settings')}>
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('export-center')}>
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="forecasting">AI Forecast</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <Database className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold">1,247</p>
                  <p className="text-xs text-gray-600">Active wells</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <BarChart3 className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold">89.2%</p>
                  <p className="text-xs text-gray-600">Data quality</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold">+2.3m</p>
                  <p className="text-xs text-gray-600">Avg change</p>
                </CardContent>
              </Card>
            </div>

            {/* Historical Data Chart */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Historical Groundwater Levels</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedTimeframe('3months')}>
                      3M
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedTimeframe('6months')}>
                      6M
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedTimeframe('1year')}>
                      1Y
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={groundwaterData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="level" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        name="Water Level (m)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Groundwater Level</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Correlation Analysis */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Rainfall vs Groundwater Correlation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={groundwaterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="rainfall" fill="#06b6d4" name="Rainfall (mm)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-4">
            {/* AI Model Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>LSTM Forecast Model</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Model Accuracy</p>
                    <p className="text-xl font-bold text-green-600">94.2%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="text-xl font-bold text-gray-900">2 hours ago</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Model trained on 3 years of historical data from 1,247 monitoring wells.
                    Prediction confidence decreases with time horizon.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Forecast Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">6-Month Groundwater Level Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                        name="Actual"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#f59e0b' }}
                        name="Predicted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Actual</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Predicted</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Intervals */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Next Month Confidence</p>
                  <p className="text-2xl font-bold text-green-600">89%</p>
                  <p className="text-xs text-gray-500">High confidence prediction</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-1">6-Month Confidence</p>
                  <p className="text-2xl font-bold text-yellow-600">71%</p>
                  <p className="text-xs text-gray-500">Moderate confidence</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4">
            {/* Anomaly Summary */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-600">12</p>
                  <p className="text-xs text-gray-600">High severity</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <Eye className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-yellow-600">34</p>
                  <p className="text-xs text-gray-600">Medium severity</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <Calendar className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">89</p>
                  <p className="text-xs text-gray-600">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Detected Anomalies */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Recent Anomalies Detected</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {anomalies.map((anomaly) => (
                    <div key={anomaly.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getAnomalyIcon(anomaly.type)}</span>
                          <div>
                            <p className="font-medium text-sm capitalize">
                              {anomaly.type.replace('_', ' ')}
                            </p>
                            <p className="text-xs text-gray-600">{anomaly.location}</p>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Value change: {anomaly.value > 0 ? '+' : ''}{anomaly.value}m</span>
                        <span className="text-gray-500">{anomaly.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Model Performance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Isolation Forest Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Detection Accuracy</p>
                    <p className="text-xl font-bold text-green-600">96.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">False Positive Rate</p>
                    <p className="text-xl font-bold text-blue-600">2.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            {/* Export Options */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  <span>Data Export Center</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exportOptions.map((option, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{option.name}</h4>
                        <p className="text-xs text-gray-600">
                          {option.records} records • {option.size} • {option.format}
                        </p>
                      </div>
                      <Button size="sm" className="ml-3">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span>Monthly Report - December 2023</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Anomaly Analysis Q4 2023</span>
                    <span className="text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Seasonal Trend Analysis</span>
                    <span className="text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            onClick={() => onNavigate('data-charts')}
            variant="outline"
            className="h-14 flex flex-col items-center justify-center space-y-1"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Advanced Analytics</span>
          </Button>
        </div>
      </div>
    </div>
  );
}