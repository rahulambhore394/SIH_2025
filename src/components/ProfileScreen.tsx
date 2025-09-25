import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft,
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Award,
  Activity,
  Download,
  Eye,
  EyeOff,
  Trash2,
  Save
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

export function ProfileScreen({ onNavigate, userRole }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  // Mock user data based on role
  const getUserData = () => {
    switch (userRole) {
      case 'farmer':
        return {
          name: 'Rahul Ambhore',
          email: 'rahul.ambhore@gmail.com',
          phone: '+91 98765 43210',
          role: 'Farmer',
          location: 'Pune, Maharashtra',
          joinDate: 'January 2023',
          farmSize: '25 acres',
          crops: 'Sugarcane, Wheat, Cotton',
          experience: '15 years',
          wellsMonitored: 3,
          averageWaterLevel: '42.3m',
          lastActive: '2 hours ago',
          completedTasks: 34,
          achievements: ['Water Conservation Champion', 'Early Adopter', 'Data Quality Contributor']
        };
      case 'researcher':
        return {
          name: 'Dr. Rahul Ambhore',
          email: 'rahul.ambhore@university.edu',
          phone: '+91 98765 12345',
          role: 'Researcher',
          location: 'Mumbai, Maharashtra',
          joinDate: 'March 2022',
          institution: 'IIT Bombay',
          specialization: 'Hydrogeology',
          experience: '8 years',
          projectsActive: 5,
          publicationsCount: 23,
          lastActive: '30 minutes ago',
          completedAnalyses: 156,
          achievements: ['Research Excellence', 'Data Pioneer', 'AI Model Contributor']
        };
      case 'policy-maker':
        return {
          name: 'Rahul Ambhore',
          email: 'rahul.ambhore@gov.mh.in',
          phone: '+91 98765 67890',
          role: 'Policy Maker',
          location: 'Nagpur, Maharashtra',
          joinDate: 'September 2021',
          department: 'Water Resources Department',
          designation: 'Joint Secretary',
          experience: '12 years',
          regionsManaged: 15,
          policiesImplemented: 8,
          lastActive: '1 hour ago',
          advisoriesIssued: 89,
          achievements: ['Policy Innovation', 'Regional Leader', 'Crisis Management Expert']
        };
      case 'admin':
        return {
          name: 'Rahul Ambhore',
          email: 'rahul.ambhore@hydrosense.gov.in',
          phone: '+91 98765 00000',
          role: 'System Administrator',
          location: 'Mumbai, Maharashtra',
          joinDate: 'June 2021',
          department: 'IT Operations',
          designation: 'Senior Admin',
          experience: '10 years',
          usersManaged: 3420,
          systemUptime: '99.7%',
          lastActive: 'Online now',
          issuesResolved: 267,
          achievements: ['System Guardian', 'Security Expert', 'Performance Optimizer']
        };
      default:
        return {
          name: 'Rahul Ambhore',
          email: 'rahul.ambhore@example.com',
          phone: '+91 98765 43210',
          role: 'User',
          location: 'Maharashtra',
          joinDate: 'January 2023',
          lastActive: '1 hour ago',
          achievements: []
        };
    }
  };

  const [userData, setUserData] = useState(getUserData());

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleStats = () => {
    switch (userRole) {
      case 'farmer':
        return [
          { label: 'Wells Monitored', value: userData.wellsMonitored, icon: MapPin },
          { label: 'Avg Water Level', value: userData.averageWaterLevel, icon: Activity },
          { label: 'Tasks Completed', value: userData.completedTasks, icon: Award }
        ];
      case 'researcher':
        return [
          { label: 'Active Projects', value: userData.projectsActive, icon: Briefcase },
          { label: 'Publications', value: userData.publicationsCount, icon: Award },
          { label: 'Analyses Done', value: userData.completedAnalyses, icon: Activity }
        ];
      case 'policy-maker':
        return [
          { label: 'Regions Managed', value: userData.regionsManaged, icon: MapPin },
          { label: 'Policies Implemented', value: userData.policiesImplemented, icon: Shield },
          { label: 'Advisories Issued', value: userData.advisoriesIssued, icon: Bell }
        ];
      case 'admin':
        return [
          { label: 'Users Managed', value: userData.usersManaged, icon: User },
          { label: 'System Uptime', value: userData.systemUptime, icon: Activity },
          { label: 'Issues Resolved', value: userData.issuesResolved, icon: Award }
        ];
      default:
        return [];
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
            <h1 className="font-semibold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-600">Manage your account and preferences</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xl">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                  <Badge variant="outline" className="capitalize">
                    {userData.role}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userData.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
                <p className="text-xs text-gray-600">{userData.lastActive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role-specific Stats */}
        <div className="grid grid-cols-3 gap-3">
          {getRoleStats().map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <IconComponent className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        {userData.achievements && userData.achievements.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userData.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="bg-yellow-50 text-yellow-800">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      ) : (
                        <p className="text-sm text-gray-900 mt-1">{userData.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <p className="text-sm text-gray-900 mt-1">{userData.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      ) : (
                        <p className="text-sm text-gray-900 mt-1">{userData.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={userData.location}
                          onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                        />
                      ) : (
                        <p className="text-sm text-gray-900 mt-1">{userData.location}</p>
                      )}
                    </div>
                  </div>

                  {userRole === 'farmer' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="farmSize">Farm Size</Label>
                        {isEditing ? (
                          <Input
                            id="farmSize"
                            value={userData.farmSize}
                            onChange={(e) => setUserData(prev => ({ ...prev, farmSize: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-gray-900 mt-1">{userData.farmSize}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="crops">Primary Crops</Label>
                        {isEditing ? (
                          <Input
                            id="crops"
                            value={userData.crops}
                            onChange={(e) => setUserData(prev => ({ ...prev, crops: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-gray-900 mt-1">{userData.crops}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {userRole === 'researcher' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="institution">Institution</Label>
                        {isEditing ? (
                          <Input
                            id="institution"
                            value={userData.institution}
                            onChange={(e) => setUserData(prev => ({ ...prev, institution: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-gray-900 mt-1">{userData.institution}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="specialization">Specialization</Label>
                        {isEditing ? (
                          <Input
                            id="specialization"
                            value={userData.specialization}
                            onChange={(e) => setUserData(prev => ({ ...prev, specialization: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-gray-900 mt-1">{userData.specialization}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {isEditing && (
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">App Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-600">Use dark theme for the app</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive alerts and updates</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-sync Data</p>
                      <p className="text-sm text-gray-600">Automatically sync with servers</p>
                    </div>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                        <SelectItem value="utc">UTC (UTC+0:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative mt-2">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      className="mt-2"
                    />
                  </div>

                  <Button className="w-full">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Data & Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="w-5 h-5 mr-3" />
            Help & Support
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}