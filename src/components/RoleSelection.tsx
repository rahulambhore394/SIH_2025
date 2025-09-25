import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Users, 
  FlaskConical, 
  Building2, 
  Settings,
  Wheat,
  BarChart3,
  MapPin,
  Shield
} from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'farmer' | 'researcher' | 'policy-maker' | 'admin') => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: 'farmer' as const,
      title: 'Farmer',
      description: 'Monitor local water levels, get irrigation advice and alerts',
      icon: Wheat,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      features: ['Water table monitoring', 'Irrigation recommendations', 'Risk alerts', 'AI chatbot support']
    },
    {
      id: 'researcher' as const,
      title: 'Researcher',
      description: 'Access historical data, analyze trends and export reports',
      icon: FlaskConical,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      features: ['Historical DWLR data', 'Trend analysis', 'Data export (CSV)', 'Anomaly detection']
    },
    {
      id: 'policy-maker' as const,
      title: 'Policy Maker',
      description: 'Regional oversight, risk assessment and advisory management',
      icon: Building2,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      features: ['Regional maps', 'Risk heatmaps', 'Climate reports', 'Advisory management']
    },
    {
      id: 'admin' as const,
      title: 'System Admin',
      description: 'Manage sensors, users and approve data sources',
      icon: Settings,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      features: ['Sensor management', 'User administration', 'Data source approval', 'System monitoring']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose how you'll be using HydroSense</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card
                key={role.id}
                className={`${role.color} border-2 hover:shadow-lg transition-all duration-200 cursor-pointer`}
                onClick={() => onRoleSelect(role.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center border-2 ${role.color.replace('bg-', 'border-').replace('-50', '-300')}`}>
                      <IconComponent className={`w-6 h-6 ${role.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{role.title}</h3>
                        <div className="flex space-x-1">
                          {role.id === 'farmer' && <Wheat className="w-4 h-4 text-green-600" />}
                          {role.id === 'researcher' && <BarChart3 className="w-4 h-4 text-blue-600" />}
                          {role.id === 'policy-maker' && <MapPin className="w-4 h-4 text-purple-600" />}
                          {role.id === 'admin' && <Shield className="w-4 h-4 text-orange-600" />}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {role.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    variant="outline"
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 text-center">
            <strong>Demo Mode:</strong> All features are available for exploration with sample data
          </p>
        </div>
      </div>
    </div>
  );
}