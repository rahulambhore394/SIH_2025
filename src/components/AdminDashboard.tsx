import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { 
  Settings,
  Users,
  Database,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Wifi,
  WifiOff,
  Server,
  HardDrive,
  MessageSquare,
  Cpu
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [autoApproval, setAutoApproval] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Mock system data
  const systemHealth = {
    uptime: '99.7%',
    responseTime: '245ms',
    activeConnections: 1847,
    dataPoints: '2.4M',
    storage: 78,
    cpu: 23,
    memory: 67
  };

  const sensors = [
    { id: 'MW-001', location: 'Pune District', status: 'online', lastUpdate: '2 min ago', batteryLevel: 87, dataQuality: 98 },
    { id: 'MW-002', location: 'Nashik Region', status: 'online', lastUpdate: '5 min ago', batteryLevel: 92, dataQuality: 95 },
    { id: 'MW-003', location: 'Solapur Area', status: 'offline', lastUpdate: '2 hours ago', batteryLevel: 12, dataQuality: 0 },
    { id: 'MW-004', location: 'Kolhapur Zone', status: 'maintenance', lastUpdate: '1 day ago', batteryLevel: 0, dataQuality: 0 },
    { id: 'MW-005', location: 'Aurangabad', status: 'online', lastUpdate: '1 min ago', batteryLevel: 76, dataQuality: 92 }
  ];

  const users = [
    { id: 1, name: 'Ramesh Patil', role: 'farmer', status: 'active', lastLogin: '2 hours ago', location: 'Pune' },
    { id: 2, name: 'Dr. Priya Sharma', role: 'researcher', status: 'active', lastLogin: '30 min ago', location: 'Mumbai' },
    { id: 3, name: 'Suresh Kumar', role: 'policy-maker', status: 'active', lastLogin: '1 hour ago', location: 'Nagpur' },
    { id: 4, name: 'Anita Desai', role: 'farmer', status: 'inactive', lastLogin: '3 days ago', location: 'Solapur' },
    { id: 5, name: 'Rajesh Singh', role: 'researcher', status: 'pending', lastLogin: 'Never', location: 'Pune' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'data_source', title: 'CGWB New Well Integration', requester: 'Dr. Sharma', priority: 'high', date: '2 hours ago' },
    { id: 2, type: 'user', title: 'New Researcher Registration', requester: 'Prof. Patel', priority: 'medium', date: '4 hours ago' },
    { id: 3, type: 'sensor', title: 'Sensor Calibration Update', requester: 'Field Team', priority: 'low', date: '1 day ago' },
    { id: 4, type: 'data_source', title: 'IMD Weather Station Link', requester: 'System', priority: 'high', date: '2 days ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': 
      case 'active': return 'bg-green-100 text-green-800';
      case 'offline': 
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': 
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4 text-green-600" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-red-600" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-600" />;
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
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
            <h1 className="text-lg font-semibold text-gray-900">System Administration</h1>
            <p className="text-sm text-gray-600">HydroSense Platform Management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              System Healthy
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* System Health */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">System Uptime</p>
                    <p className="text-xl font-bold text-green-600">{systemHealth.uptime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Response Time</p>
                    <p className="text-xl font-bold text-blue-600">{systemHealth.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Connections</p>
                    <p className="text-xl font-bold text-purple-600">{systemHealth.activeConnections}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Data Points Today</p>
                    <p className="text-xl font-bold text-orange-600">{systemHealth.dataPoints}</p>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Storage</span>
                    </div>
                    <span className="text-sm font-medium">{systemHealth.storage}%</span>
                  </div>
                  <Progress value={systemHealth.storage} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">CPU Usage</span>
                    </div>
                    <span className="text-sm font-medium">{systemHealth.cpu}%</span>
                  </div>
                  <Progress value={systemHealth.cpu} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Memory</span>
                    </div>
                    <span className="text-sm font-medium">{systemHealth.memory}%</span>
                  </div>
                  <Progress value={systemHealth.memory} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Sensors</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {sensors.filter(s => s.status === 'online').length}/{sensors.length}
                  </p>
                  <p className="text-sm text-gray-600">Online sensors</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Users</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                  <p className="text-sm text-gray-600">Active users</p>
                </CardContent>
              </Card>
            </div>

            {/* System Controls */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>System Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-approve data sources</p>
                      <p className="text-sm text-gray-600">Automatically approve verified sources</p>
                    </div>
                    <Switch 
                      checked={autoApproval}
                      onCheckedChange={setAutoApproval}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System alerts</p>
                      <p className="text-sm text-gray-600">Send notifications for system issues</p>
                    </div>
                    <Switch 
                      checked={alertsEnabled}
                      onCheckedChange={setAlertsEnabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            {/* Sensor Management */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span>Sensor Network ({sensors.length})</span>
                  </CardTitle>
                  <Button size="sm" onClick={() => onNavigate('add-sensor')}>
                    Add Sensor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sensors.map((sensor) => (
                    <div key={sensor.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(sensor.status)}
                          <div>
                            <p className="font-medium text-sm">{sensor.id}</p>
                            <p className="text-xs text-gray-600">{sensor.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(sensor.status)}>
                          {sensor.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Last Update</p>
                          <p className="font-medium">{sensor.lastUpdate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Battery</p>
                          <div className="flex items-center space-x-1">
                            <p className="font-medium">{sensor.batteryLevel}%</p>
                            <div className={`w-2 h-2 rounded-full ${
                              sensor.batteryLevel > 50 ? 'bg-green-500' :
                              sensor.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Data Quality</p>
                          <p className="font-medium">{sensor.dataQuality}%</p>
                        </div>
                      </div>

                      {sensor.status === 'offline' && (
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline">
                            Diagnose
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Reconnect
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sensor Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">3</p>
                  <p className="text-xs text-gray-600">Online</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-600">1</p>
                  <p className="text-xs text-gray-600">Offline</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-yellow-600">1</p>
                  <p className="text-xs text-gray-600">Maintenance</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            {/* User Management */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>User Management ({users.length})</span>
                  </CardTitle>
                  <Button size="sm" onClick={() => onNavigate('user-analytics')}>
                    View Analytics
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-600 capitalize">{user.role} • {user.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last login: {user.lastLogin}</span>
                        {user.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Stats */}
            <div className="grid grid-cols-4 gap-2">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-green-600">{users.filter(u => u.role === 'farmer').length}</p>
                  <p className="text-xs text-gray-600">Farmers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">{users.filter(u => u.role === 'researcher').length}</p>
                  <p className="text-xs text-gray-600">Researchers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-purple-600">{users.filter(u => u.role === 'policy-maker').length}</p>
                  <p className="text-xs text-gray-600">Policy Makers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-yellow-600">{users.filter(u => u.status === 'pending').length}</p>
                  <p className="text-xs text-gray-600">Pending</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            {/* Pending Approvals */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span>Pending Approvals ({pendingApprovals.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{approval.title}</p>
                          <p className="text-xs text-gray-600">
                            Requested by {approval.requester} • {approval.date}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(approval.priority)}>
                          {approval.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Review
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Approval Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-yellow-600">{pendingApprovals.length}</p>
                  <p className="text-xs text-gray-600">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">156</p>
                  <p className="text-xs text-gray-600">Approved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-600">23</p>
                  <p className="text-xs text-gray-600">Rejected</p>
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
            onClick={() => onNavigate('system-health')}
            variant="outline"
            className="h-14 flex flex-col items-center justify-center space-y-1"
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs">System Health</span>
          </Button>
        </div>
      </div>
    </div>
  );
}