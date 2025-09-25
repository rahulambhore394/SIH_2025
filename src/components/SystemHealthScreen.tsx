import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { 
  ArrowLeft,
  Server,
  Database,
  Wifi,
  Cpu,
  HardDrive,
  Memory,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  RefreshCw,
  Download,
  Settings,
  Monitor,
  Globe,
  Radio,
  Battery
} from 'lucide-react';

interface SystemHealthScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

export function SystemHealthScreen({ onNavigate, userRole }: SystemHealthScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock system data
  const systemOverview = {
    uptime: '99.7%',
    responseTime: '245ms',
    activeConnections: 1847,
    dataProcessed: '12.4GB',
    alertsToday: 3,
    lastUpdate: currentTime.toLocaleTimeString()
  };

  const serverMetrics = [
    { name: 'API Server', status: 'healthy', cpu: 45, memory: 67, disk: 34, uptime: '99.8%' },
    { name: 'Database Server', status: 'healthy', cpu: 32, memory: 78, disk: 56, uptime: '99.9%' },
    { name: 'Analytics Engine', status: 'warning', cpu: 78, memory: 89, disk: 45, uptime: '98.5%' },
    { name: 'File Storage', status: 'healthy', cpu: 23, memory: 45, disk: 89, uptime: '99.7%' },
    { name: 'Monitoring Service', status: 'healthy', cpu: 12, memory: 34, disk: 23, uptime: '100%' }
  ];

  const networkStatus = [
    { endpoint: 'CGWB API', status: 'online', latency: 156, reliability: 98.7 },
    { endpoint: 'IMD Weather API', status: 'online', latency: 234, reliability: 97.2 },
    { endpoint: 'OpenWeatherMap', status: 'online', latency: 89, reliability: 99.1 },
    { endpoint: 'NASA POWER API', status: 'degraded', latency: 567, reliability: 85.3 },
    { endpoint: 'CPCB Water Quality', status: 'online', latency: 123, reliability: 96.8 }
  ];

  const sensorNetwork = [
    { id: 'MW-001', location: 'Pune District', status: 'online', battery: 87, lastData: '2 min ago', quality: 98 },
    { id: 'MW-002', location: 'Nashik District', status: 'online', battery: 92, lastData: '1 min ago', quality: 96 },
    { id: 'MW-003', location: 'Solapur District', status: 'offline', battery: 12, lastData: '2 hours ago', quality: 0 },
    { id: 'MW-004', location: 'Kolhapur District', status: 'online', battery: 76, lastData: '3 min ago', quality: 94 },
    { id: 'MW-005', location: 'Aurangabad District', status: 'maintenance', battery: 45, lastData: '1 day ago', quality: 0 }
  ];

  const performanceData = [
    { time: '00:00', cpu: 23, memory: 45, network: 67, response: 245 },
    { time: '04:00', cpu: 18, memory: 42, network: 78, response: 189 },
    { time: '08:00', cpu: 67, memory: 78, network: 89, response: 345 },
    { time: '12:00', cpu: 89, memory: 87, network: 92, response: 567 },
    { time: '16:00', cpu: 78, memory: 82, network: 85, response: 423 },
    { time: '20:00', cpu: 45, memory: 67, network: 76, response: 289 }
  ];

  const alertsData = [
    { time: '14:30', type: 'warning', message: 'High CPU usage on Analytics Engine (78%)', severity: 'medium' },
    { time: '13:45', type: 'error', message: 'Sensor MW-003 offline - Battery level critical', severity: 'high' },
    { time: '12:20', type: 'info', message: 'Scheduled maintenance completed on File Storage', severity: 'low' },
    { time: '11:15', type: 'warning', message: 'NASA POWER API response time increased (567ms)', severity: 'medium' },
    { time: '10:30', type: 'success', message: 'Database backup completed successfully', severity: 'low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online': return 'text-green-700 bg-green-100';
      case 'warning':
      case 'degraded': return 'text-yellow-700 bg-yellow-100';
      case 'error':
      case 'offline': return 'text-red-700 bg-red-100';
      case 'maintenance': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
      case 'offline': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
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
            <h1 className="font-semibold text-gray-900">System Health</h1>
            <p className="text-sm text-gray-600">Real-time system monitoring & diagnostics</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">{systemOverview.uptime}</div>
              <p className="text-sm text-gray-600">System Uptime</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-600">{systemOverview.responseTime}</div>
              <p className="text-sm text-gray-600">Response Time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Wifi className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-600">{systemOverview.activeConnections}</div>
              <p className="text-sm text-gray-600">Active Connections</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Database className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-600">{systemOverview.dataProcessed}</div>
              <p className="text-sm text-gray-600">Data Processed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-600">{systemOverview.alertsToday}</div>
              <p className="text-sm text-gray-600">Alerts Today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-gray-900">{systemOverview.lastUpdate}</div>
              <p className="text-sm text-gray-600">Last Update</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="servers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="space-y-4">
            {/* Server Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span>Server Infrastructure</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serverMetrics.map((server, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Monitor className="w-4 h-4 text-gray-600" />
                          <h4 className="font-medium">{server.name}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(server.status)}
                          <Badge className={getStatusColor(server.status)}>
                            {server.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-600">CPU</span>
                            <span className="font-medium">{server.cpu}%</span>
                          </div>
                          <Progress value={server.cpu} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-600">Memory</span>
                            <span className="font-medium">{server.memory}%</span>
                          </div>
                          <Progress value={server.memory} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-600">Disk</span>
                            <span className="font-medium">{server.disk}%</span>
                          </div>
                          <Progress value={server.disk} className="h-2" />
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium text-green-600">{server.uptime}</div>
                          <p className="text-xs text-gray-600">Uptime</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            {/* Network Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span>External API Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkStatus.map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Radio className="w-4 h-4 text-gray-600" />
                          <h4 className="font-medium">{endpoint.endpoint}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(endpoint.status)}
                          <Badge className={getStatusColor(endpoint.status)}>
                            {endpoint.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{endpoint.latency}ms</div>
                          <p className="text-xs text-gray-600">Latency</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{endpoint.reliability}%</div>
                          <p className="text-xs text-gray-600">Reliability</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            {/* Sensor Network */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-purple-600" />
                  <span>Sensor Network Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensorNetwork.map((sensor, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Radio className="w-4 h-4 text-gray-600" />
                          <div>
                            <h4 className="font-medium">{sensor.id}</h4>
                            <p className="text-sm text-gray-600">{sensor.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(sensor.status)}
                          <Badge className={getStatusColor(sensor.status)}>
                            {sensor.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-1">
                              <Battery className="w-3 h-3 text-gray-600" />
                              <span className="text-gray-600">Battery</span>
                            </div>
                            <span className="font-medium">{sensor.battery}%</span>
                          </div>
                          <Progress 
                            value={sensor.battery} 
                            className={`h-2 ${sensor.battery < 20 ? 'bg-red-100' : ''}`} 
                          />
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium text-blue-600">{sensor.quality}%</div>
                          <p className="text-xs text-gray-600">Data Quality</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{sensor.lastData}</div>
                          <p className="text-xs text-gray-600">Last Data</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {/* Performance Charts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  <span>System Performance (24h)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="CPU Usage (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Memory Usage (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="network" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Network Usage (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">API Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="response" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        name="Response Time (ms)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertsData.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'error' ? 'bg-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'success' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}></div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-600">{alert.time}</p>
                      </div>
                      
                      <Badge variant="outline" className={`text-xs ${
                        alert.severity === 'high' ? 'text-red-700 bg-red-50' :
                        alert.severity === 'medium' ? 'text-yellow-700 bg-yellow-50' :
                        'text-green-700 bg-green-50'
                      }`}>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}