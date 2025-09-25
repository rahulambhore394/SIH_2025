import React from 'react';
import { Button } from './ui/button';
import { 
  Home, 
  Map, 
  BarChart3, 
  MessageSquare, 
  User,
  Droplets,
  Users,
  Shield,
  Settings
} from 'lucide-react';

interface BottomNavigationProps {
  activeScreen: string;
  userRole: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ activeScreen, userRole, onNavigate }: BottomNavigationProps) {
  const getNavigationItems = () => {
    switch (userRole) {
      case 'farmer':
        return [
          { id: 'farmer-dashboard', label: 'Home', icon: Home },
          { id: 'map', label: 'Map', icon: Map },
          { id: 'data-charts', label: 'Trends', icon: BarChart3 },
          { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User }
        ];
      case 'researcher':
        return [
          { id: 'researcher-dashboard', label: 'Analytics', icon: BarChart3 },
          { id: 'map', label: 'Map', icon: Map },
          { id: 'data-charts', label: 'Data', icon: Droplets },
          { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User }
        ];
      case 'policy-maker':
        return [
          { id: 'policy-maker-dashboard', label: 'Overview', icon: Home },
          { id: 'map', label: 'Regional Map', icon: Map },
          { id: 'risk-assessment', label: 'Risks', icon: Shield },
          { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User }
        ];
      case 'admin':
        return [
          { id: 'admin-dashboard', label: 'Admin', icon: Settings },
          { id: 'user-management', label: 'Users', icon: Users },
          { id: 'system-health', label: 'System', icon: Shield },
          { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User }
        ];
      default:
        return [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'map', label: 'Map', icon: Map },
          { id: 'data', label: 'Data', icon: BarChart3 },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User }
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center h-16 w-16 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}