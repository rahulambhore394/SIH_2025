import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { 
  ArrowLeft,
  Bell,
  BellOff,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
  MailOpen,
  Filter,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare
} from 'lucide-react';

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
  category: string;
  source: string;
}

export function NotificationsScreen({ onNavigate, userRole }: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Mock notifications data based on user role
  const getNotificationsForRole = () => {
    const baseNotifications: Notification[] = [
      {
        id: 1,
        title: 'System Maintenance Scheduled',
        message: 'Routine maintenance will be performed tonight from 2 AM to 4 AM IST.',
        type: 'info',
        priority: 'medium',
        timestamp: '2 hours ago',
        read: false,
        category: 'System',
        source: 'HydroSense'
      },
      {
        id: 2,
        title: 'Data Quality Alert',
        message: 'Sensor MW-234 reporting inconsistent readings. Check required.',
        type: 'warning',
        priority: 'high',
        timestamp: '4 hours ago',
        read: true,
        category: 'Technical',
        source: 'Monitoring System'
      }
    ];

    if (userRole === 'farmer') {
      return [
        ...baseNotifications,
        {
          id: 3,
          title: 'Irrigation Recommendation',
          message: 'Reduce irrigation by 20%. Water table improved by 2.3m in your area.',
          type: 'info',
          priority: 'medium',
          timestamp: '6 hours ago',
          read: false,
          category: 'Irrigation',
          source: 'AI Assistant'
        },
        {
          id: 4,
          title: 'Government Subsidy Available',
          message: 'New drip irrigation subsidy (60% coverage) now available. Apply before March 31.',
          type: 'success',
          priority: 'high',
          timestamp: '1 day ago',
          read: true,
          category: 'Subsidies',
          source: 'Government Portal'
        },
        {
          id: 5,
          title: 'Water Level Critical Alert',
          message: 'Groundwater level dropped below 30m in your region. Immediate conservation needed.',
          type: 'alert',
          priority: 'high',
          timestamp: '2 days ago',
          read: false,
          category: 'Water Level',
          source: 'Early Warning System'
        },
        {
          id: 6,
          title: 'Weather Update',
          message: 'Light rainfall expected in next 2 days. Good for field preparation.',
          type: 'info',
          priority: 'low',
          timestamp: '3 days ago',
          read: true,
          category: 'Weather',
          source: 'IMD'
        }
      ];
    }

    if (userRole === 'researcher') {
      return [
        ...baseNotifications,
        {
          id: 7,
          title: 'Anomaly Detected',
          message: '12 unusual patterns detected in Marathwada region. Review recommended.',
          type: 'warning',
          priority: 'high',
          timestamp: '3 hours ago',
          read: false,
          category: 'Analysis',
          source: 'AI Detection'
        },
        {
          id: 8,
          title: 'Data Export Ready',
          message: 'Your requested DWLR dataset (2.4MB) is ready for download.',
          type: 'success',
          priority: 'medium',
          timestamp: '8 hours ago',
          read: true,
          category: 'Data Export',
          source: 'Data Center'
        },
        {
          id: 9,
          title: 'Model Update Available',
          message: 'LSTM forecasting model updated with improved 96.2% accuracy.',
          type: 'info',
          priority: 'medium',
          timestamp: '1 day ago',
          read: false,
          category: 'AI Models',
          source: 'Research Team'
        }
      ];
    }

    if (userRole === 'policy-maker') {
      return [
        ...baseNotifications,
        {
          id: 10,
          title: 'Drought Risk Assessment',
          message: 'High drought risk detected in 3 districts. Emergency measures recommended.',
          type: 'alert',
          priority: 'high',
          timestamp: '1 hour ago',
          read: false,
          category: 'Risk Assessment',
          source: 'Risk Engine'
        },
        {
          id: 11,
          title: 'Advisory Approval Pending',
          message: '5 water conservation advisories awaiting your approval for 2,340 farmers.',
          type: 'warning',
          priority: 'high',
          timestamp: '5 hours ago',
          read: false,
          category: 'Advisories',
          source: 'Admin Panel'
        },
        {
          id: 12,
          title: 'Regional Report Generated',
          message: 'Monthly groundwater status report for Maharashtra is ready for review.',
          type: 'success',
          priority: 'medium',
          timestamp: '12 hours ago',
          read: true,
          category: 'Reports',
          source: 'Report Generator'
        }
      ];
    }

    if (userRole === 'admin') {
      return [
        ...baseNotifications,
        {
          id: 13,
          title: 'Sensor Offline',
          message: 'Well MW-003 in Solapur has been offline for 2 hours. Battery level: 12%.',
          type: 'alert',
          priority: 'high',
          timestamp: '2 hours ago',
          read: false,
          category: 'Hardware',
          source: 'Network Monitor'
        },
        {
          id: 14,
          title: 'New User Registration',
          message: '3 new researcher accounts pending approval. Review required.',
          type: 'info',
          priority: 'medium',
          timestamp: '6 hours ago',
          read: true,
          category: 'User Management',
          source: 'User System'
        },
        {
          id: 15,
          title: 'System Performance Alert',
          message: 'CPU usage reached 85%. Consider scaling resources.',
          type: 'warning',
          priority: 'medium',
          timestamp: '8 hours ago',
          read: false,
          category: 'Performance',
          source: 'System Monitor'
        }
      ];
    }

    return baseNotifications;
  };

  const [notifications, setNotifications] = useState<Notification[]>(getNotificationsForRole());

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsUnread = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'alerts':
        return notifications.filter(n => n.type === 'alert' || n.type === 'warning');
      case 'system':
        return notifications.filter(n => n.category === 'System' || n.category === 'Technical');
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const alertCount = notifications.filter(n => n.type === 'alert' || n.type === 'warning').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-600">{unreadCount} unread messages</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Notification Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Push Notifications</span>
                </div>
                <Switch 
                  checked={pushEnabled}
                  onCheckedChange={setPushEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Email Notifications</span>
                </div>
                <Switch 
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-gray-600" /> : <VolumeX className="w-4 h-4 text-gray-600" />}
                  <span className="text-sm">Sound Alerts</span>
                </div>
                <Switch 
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="alerts">Alerts ({alertCount})</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {getFilteredNotifications().map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/30' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{notification.timestamp}</span>
                          </span>
                          <span>• {notification.source}</span>
                          <Badge variant="outline" className="text-xs">
                            {notification.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {notification.read ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsUnread(notification.id)}
                              className="h-6 px-2 text-xs"
                            >
                              <MailOpen className="w-3 h-3 mr-1" />
                              Unread
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 px-2 text-xs"
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {getFilteredNotifications().map((notification) => (
              <Card key={notification.id} className="border-blue-200 bg-blue-50/30">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Mark Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-3">
            {getFilteredNotifications().map((notification) => (
              <Card key={notification.id} className={`border-2 ${getTypeColor(notification.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" className="h-6 px-2 text-xs">
                            Take Action
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 px-2 text-xs"
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="system" className="space-y-3">
            {getFilteredNotifications().map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-2">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {getFilteredNotifications().length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-sm text-gray-600">You're all caught up! Check back later for updates.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}