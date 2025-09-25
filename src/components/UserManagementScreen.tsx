import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ArrowLeft,
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Check,
  X,
  Shield,
  Clock,
  Mail,
  Phone,
  MapPin,
  Activity,
  AlertCircle,
  Settings,
  Key,
  UserCheck,
  UserX
} from 'lucide-react';

interface UserManagementScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  location: string;
  joinDate: string;
  lastActive: string;
  permissions: string[];
  verified: boolean;
}

export function UserManagementScreen({ onNavigate, userRole }: UserManagementScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Mock user data
  const users: User[] = [
    {
      id: 1,
      name: 'Rahul Ambhore',
      email: 'rahul.ambhore@gmail.com',
      phone: '+91 98765 43210',
      role: 'farmer',
      status: 'active',
      location: 'Pune, Maharashtra',
      joinDate: '2023-01-15',
      lastActive: '2 hours ago',
      permissions: ['view_data', 'export_reports'],
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@iit.edu',
      phone: '+91 98765 12345',
      role: 'researcher',
      status: 'active',
      location: 'Mumbai, Maharashtra',
      joinDate: '2022-03-10',
      lastActive: '30 minutes ago',
      permissions: ['view_data', 'export_reports', 'advanced_analytics'],
      verified: true
    },
    {
      id: 3,
      name: 'Suresh Kumar',
      email: 'suresh.kumar@gov.mh.in',
      phone: '+91 98765 67890',
      role: 'policy-maker',
      status: 'active',
      location: 'Nagpur, Maharashtra',
      joinDate: '2021-09-20',
      lastActive: '1 hour ago',
      permissions: ['view_data', 'approve_advisories', 'policy_tools'],
      verified: true
    },
    {
      id: 4,
      name: 'Amit Patel',
      email: 'amit.patel@gmail.com',
      phone: '+91 98765 11111',
      role: 'farmer',
      status: 'pending',
      location: 'Solapur, Maharashtra',
      joinDate: '2024-01-10',
      lastActive: 'Never',
      permissions: [],
      verified: false
    },
    {
      id: 5,
      name: 'Dr. Anjali Desai',
      email: 'anjali.desai@university.edu',
      phone: '+91 98765 22222',
      role: 'researcher',
      status: 'inactive',
      location: 'Nashik, Maharashtra',
      joinDate: '2023-05-15',
      lastActive: '2 weeks ago',
      permissions: ['view_data'],
      verified: true
    },
    {
      id: 6,
      name: 'Mahesh Jadhav',
      email: 'mahesh.jadhav@gmail.com',
      phone: '+91 98765 33333',
      role: 'farmer',
      status: 'active',
      location: 'Kolhapur, Maharashtra',
      joinDate: '2023-08-22',
      lastActive: '5 hours ago',
      permissions: ['view_data', 'export_reports'],
      verified: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'bg-blue-100 text-blue-800';
      case 'researcher': return 'bg-purple-100 text-purple-800';
      case 'policy-maker': return 'bg-orange-100 text-orange-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} user ${userId}`);
    // In a real app, this would make API calls
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const activityData = [
    { metric: 'Total Users', value: 3420, change: '+12%', trend: 'up' },
    { metric: 'Active Today', value: 856, change: '+5%', trend: 'up' },
    { metric: 'Pending Approvals', value: 23, change: '-8%', trend: 'down' },
    { metric: 'Support Tickets', value: 12, change: '+3%', trend: 'up' }
  ];

  const recentActivity = [
    { action: 'New farmer registration', user: 'Amit Patel', time: '2 hours ago', status: 'pending' },
    { action: 'Password reset request', user: 'Dr. Priya Sharma', time: '4 hours ago', status: 'completed' },
    { action: 'Role change request', user: 'Mahesh Jadhav', time: '6 hours ago', status: 'approved' },
    { action: 'Account deactivation', user: 'Old User', time: '1 day ago', status: 'completed' },
    { action: 'Bulk data export', user: 'Dr. Anjali Desai', time: '2 days ago', status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-600">Manage users, roles, and permissions</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activityData.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <p className="text-sm text-gray-600">{item.metric}</p>
                  <div className={`text-xs mt-1 ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">All Users</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="farmer">Farmers</SelectItem>
                        <SelectItem value="researcher">Researchers</SelectItem>
                        <SelectItem value="policy-maker">Policy Makers</SelectItem>
                        <SelectItem value="admin">Administrators</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Users ({filteredUsers.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="" />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                                <span>{user.name}</span>
                                {user.verified && (
                                  <UserCheck className="w-4 h-4 text-green-600" />
                                )}
                              </h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center space-x-1">
                                  <Mail className="w-3 h-3" />
                                  <span>{user.email}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{user.phone}</span>
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Badge className={getRoleColor(user.role)}>
                                {user.role.replace('-', ' ')}
                              </Badge>
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{user.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Last active: {user.lastActive}</span>
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {user.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleUserAction('approve', user.id)}
                                    className="h-7 px-2 bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="w-3 h-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUserAction('reject', user.id)}
                                    className="h-7 px-2 text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-3 h-3 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              
                              <Button 
                                size="sm"
                                variant="ghost"
                                onClick={() => handleUserAction('edit', user.id)}
                                className="h-7 px-2"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              
                              <Button 
                                size="sm"
                                variant="ghost"
                                onClick={() => handleUserAction('delete', user.id)}
                                className="h-7 px-2 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {user.permissions.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-600 mb-1">Permissions:</p>
                              <div className="flex flex-wrap gap-1">
                                {user.permissions.map((permission, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {permission.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'pending' ? 'bg-yellow-500' :
                        activity.status === 'approved' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}></div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">
                          User: {activity.user} • {activity.time}
                        </p>
                      </div>
                      
                      <Badge variant="outline" className={`text-xs ${
                        activity.status === 'pending' ? 'text-yellow-700 bg-yellow-50' :
                        activity.status === 'approved' ? 'text-green-700 bg-green-50' :
                        'text-blue-700 bg-blue-50'
                      }`}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Logs */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-gray-600">[2024-01-20 14:30:15] INFO: User login successful - rahul.ambhore@gmail.com</div>
                  <div className="text-green-600">[2024-01-20 14:25:42] SUCCESS: Password reset completed - priya.sharma@iit.edu</div>
                  <div className="text-yellow-600">[2024-01-20 14:20:18] WARN: Multiple failed login attempts - amit.patel@gmail.com</div>
                  <div className="text-blue-600">[2024-01-20 14:15:33] INFO: New user registration - amit.patel@gmail.com</div>
                  <div className="text-red-600">[2024-01-20 14:10:45] ERROR: API rate limit exceeded - researcher_bulk_export</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {/* User Management Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span>User Management Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-approve researcher accounts</p>
                      <p className="text-sm text-gray-600">Automatically approve accounts from verified institutions</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require email verification</p>
                      <p className="text-sm text-gray-600">Users must verify email before accessing features</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Send welcome emails</p>
                      <p className="text-sm text-gray-600">Automatically send welcome emails to new users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable bulk operations</p>
                      <p className="text-sm text-gray-600">Allow bulk user actions (approve, delete, modify)</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Password Policy</label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                        <SelectItem value="complex">Complex (12+ chars, symbols, mixed case)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Session Timeout</label>
                    <Select defaultValue="24h">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="8h">8 Hours</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="7d">7 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Failed Login Attempts Limit</label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Attempts</SelectItem>
                        <SelectItem value="5">5 Attempts</SelectItem>
                        <SelectItem value="10">10 Attempts</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
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