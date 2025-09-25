import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  ArrowLeft,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  MapPin,
  Droplets,
  CloudRain,
  Thermometer,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Users,
  Home,
  Factory
} from 'lucide-react';

interface RiskAssessmentScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

export function RiskAssessmentScreen({ onNavigate, userRole }: RiskAssessmentScreenProps) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeframe, setTimeframe] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock risk data
  const riskOverview = [
    { region: 'Marathwada', risk: 89, level: 'CRITICAL', population: 156000, wells: 234, color: '#ef4444' },
    { region: 'Vidarbha', risk: 67, level: 'HIGH', population: 89000, wells: 167, color: '#f59e0b' },
    { region: 'North Maharashtra', risk: 45, level: 'MEDIUM', population: 67000, wells: 123, color: '#eab308' },
    { region: 'Western Ghats', risk: 23, level: 'LOW', population: 34000, wells: 89, color: '#22c55e' },
    { region: 'Konkan', risk: 12, level: 'MINIMAL', population: 23000, wells: 45, color: '#10b981' }
  ];

  const historicalTrends = [
    { month: 'Jan', drought: 45, flood: 12, groundwater: 67 },
    { month: 'Feb', drought: 52, flood: 8, groundwater: 63 },
    { month: 'Mar', drought: 67, flood: 15, groundwater: 58 },
    { month: 'Apr', drought: 78, flood: 22, groundwater: 52 },
    { month: 'May', drought: 89, flood: 18, groundwater: 45 },
    { month: 'Jun', drought: 34, flood: 67, groundwater: 78 },
    { month: 'Jul', drought: 23, flood: 89, groundwater: 89 },
    { month: 'Aug', drought: 19, flood: 78, groundwater: 92 },
    { month: 'Sep', drought: 34, flood: 45, groundwater: 85 },
    { month: 'Oct', drought: 45, flood: 23, groundwater: 78 },
    { month: 'Nov', drought: 56, flood: 12, groundwater: 67 },
    { month: 'Dec', drought: 67, flood: 8, groundwater: 62 }
  ];

  const vulnerabilityFactors = [
    { factor: 'Rainfall Deficit', impact: 85, trend: 'increasing' },
    { factor: 'Groundwater Depletion', impact: 78, trend: 'stable' },
    { factor: 'Temperature Rise', impact: 67, trend: 'increasing' },
    { factor: 'Population Growth', impact: 56, trend: 'increasing' },
    { factor: 'Agricultural Stress', impact: 73, trend: 'decreasing' },
    { factor: 'Infrastructure Gap', impact: 45, trend: 'decreasing' }
  ];

  const emergencyResponse = [
    {
      scenario: 'Severe Drought (3-month)',
      probability: 34,
      impact: 'HIGH',
      recommendations: [
        'Activate emergency water supplies',
        'Implement water rationing protocols',
        'Deploy tanker services to affected areas',
        'Restrict non-essential water usage'
      ]
    },
    {
      scenario: 'Flash Flood Events',
      probability: 23,
      impact: 'MEDIUM',
      recommendations: [
        'Early warning system activation',
        'Evacuation route preparation',
        'Emergency shelter arrangements',
        'Drainage system monitoring'
      ]
    },
    {
      scenario: 'Groundwater Crisis',
      probability: 67,
      impact: 'HIGH',
      recommendations: [
        'Immediate bore well restrictions',
        'Alternative water source identification',
        'Community conservation programs',
        'Agricultural practice modifications'
      ]
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-700 bg-red-100 border-red-200';
      case 'HIGH': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'LOW': return 'text-green-700 bg-green-100 border-green-200';
      case 'MINIMAL': return 'text-blue-700 bg-blue-100 border-blue-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <div className="w-4 h-4 bg-yellow-400 rounded-full" />;
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
            <h1 className="font-semibold text-gray-900">Risk Assessment</h1>
            <p className="text-sm text-gray-600">Drought, Flood & Groundwater Risk Analysis</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-5 h-5" />
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="marathwada">Marathwada</SelectItem>
                    <SelectItem value="vidarbha">Vidarbha</SelectItem>
                    <SelectItem value="north-mh">North Maharashtra</SelectItem>
                    <SelectItem value="western-ghats">Western Ghats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Timeframe</label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Risk Alert */}
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>HIGH RISK ALERT:</strong> Marathwada region shows 89% drought probability. 
            Immediate action required for 156,000 people in critical zones.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="factors">Factors</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Regional Risk Assessment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span>Regional Risk Levels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskOverview.map((region, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <h4 className="font-medium">{region.region}</h4>
                        </div>
                        <Badge className={getRiskColor(region.level)}>
                          {region.level}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Risk Level</span>
                          <span className="font-semibold">{region.risk}%</span>
                        </div>
                        <Progress value={region.risk} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Users className="w-3 h-3 text-gray-600" />
                            <span className="font-medium">{region.population.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-gray-600">Population</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Droplets className="w-3 h-3 text-blue-600" />
                            <span className="font-medium">{region.wells}</span>
                          </div>
                          <p className="text-xs text-gray-600">Wells</p>
                        </div>
                        <div className="text-center">
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskOverview}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="risk"
                      >
                        {riskOverview.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {riskOverview.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.region}: {item.risk}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            {/* Historical Risk Trends */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Historical Risk Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="drought" 
                        stackId="1"
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.6}
                        name="Drought Risk"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="flood" 
                        stackId="1"
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6}
                        name="Flood Risk"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="groundwater" 
                        stackId="2"
                        stroke="#22c55e" 
                        fill="#22c55e" 
                        fillOpacity={0.4}
                        name="Groundwater Level"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Prediction Model */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">6-Month Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Drought Risk Forecast</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      AI model predicts 67% probability of severe drought conditions in Marathwada region.
                      Confidence level: 89%
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <CloudRain className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Monsoon Predictions</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Expected rainfall: 15% below normal. Western Ghats likely to receive adequate rainfall.
                      Confidence level: 76%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="factors" className="space-y-4">
            {/* Vulnerability Factors */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Vulnerability Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vulnerabilityFactors.map((factor, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{factor.factor}</span>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(factor.trend)}
                          <span className="text-sm font-bold">{factor.impact}%</span>
                        </div>
                      </div>
                      <Progress value={factor.impact} className="h-2" />
                      <p className="text-xs text-gray-600 mt-1 capitalize">
                        Trend: {factor.trend}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contributing Factors */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Impact Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnerabilityFactors}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="factor" 
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="impact" fill="#ef4444" name="Impact %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            {/* Emergency Response Plans */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Emergency Response Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyResponse.map((scenario, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{scenario.scenario}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{scenario.probability}% probability</Badge>
                          <Badge className={
                            scenario.impact === 'HIGH' ? 'bg-red-100 text-red-800' :
                            scenario.impact === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {scenario.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</p>
                        <ul className="space-y-1">
                          {scenario.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Allocation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resource Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">₹2.3M</div>
                    <p className="text-sm text-blue-700">Emergency Fund Required</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">34 Days</div>
                    <p className="text-sm text-green-700">Water Reserve Capacity</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">156</div>
                    <p className="text-sm text-yellow-700">Tankers Required</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">23</div>
                    <p className="text-sm text-purple-700">Emergency Shelters</p>
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