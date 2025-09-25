import React, { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { RoleSelection } from './components/RoleSelection';
import { FarmerDashboard } from './components/FarmerDashboard';
import { ResearcherDashboard } from './components/ResearcherDashboard';
import { PolicyMakerDashboard } from './components/PolicyMakerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ChatbotScreen } from './components/ChatbotScreen';
import { InteractiveMap } from './components/InteractiveMap';
import { DataChartsScreen } from './components/DataChartsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RiskAssessmentScreen } from './components/RiskAssessmentScreen';
import { UserManagementScreen } from './components/UserManagementScreen';
import { SystemHealthScreen } from './components/SystemHealthScreen';
import { BottomNavigation } from './components/BottomNavigation';

type Screen = 
  | 'auth' 
  | 'role-selection' 
  | 'farmer-dashboard' 
  | 'researcher-dashboard' 
  | 'policy-maker-dashboard' 
  | 'admin-dashboard'
  | 'chatbot'
  | 'map'
  | 'data-charts'
  | 'notifications'
  | 'profile'
  | 'risk-assessment'
  | 'user-management'
  | 'system-health';

type UserRole = 'farmer' | 'researcher' | 'policy-maker' | 'admin' | '';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [userRole, setUserRole] = useState<UserRole>('');

  const handleLogin = (role: string) => {
    if (role === 'role-selection') {
      setCurrentScreen('role-selection');
    } else {
      setCurrentScreen('auth');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    switch (role) {
      case 'farmer':
        setCurrentScreen('farmer-dashboard');
        break;
      case 'researcher':
        setCurrentScreen('researcher-dashboard');
        break;
      case 'policy-maker':
        setCurrentScreen('policy-maker-dashboard');
        break;
      case 'admin':
        setCurrentScreen('admin-dashboard');
        break;
      default:
        setCurrentScreen('farmer-dashboard');
    }
  };

  const handleNavigate = (screen: string) => {
    // Handle 'back' navigation
    if (screen === 'back') {
      switch (currentScreen) {
        case 'chatbot':
        case 'map':
        case 'data-charts':
        case 'notifications':
        case 'profile':
        case 'risk-assessment':
        case 'user-management':
        case 'system-health':
          // Go back to appropriate dashboard
          switch (userRole) {
            case 'farmer':
              setCurrentScreen('farmer-dashboard');
              break;
            case 'researcher':
              setCurrentScreen('researcher-dashboard');
              break;
            case 'policy-maker':
              setCurrentScreen('policy-maker-dashboard');
              break;
            case 'admin':
              setCurrentScreen('admin-dashboard');
              break;
            default:
              setCurrentScreen('farmer-dashboard');
          }
          break;
        default:
          setCurrentScreen('auth');
      }
      return;
    }

    // Handle specific screen navigation
    switch (screen) {
      case 'farmer-dashboard':
      case 'researcher-dashboard':
      case 'policy-maker-dashboard':
      case 'admin-dashboard':
      case 'chatbot':
      case 'map':
      case 'data-charts':
      case 'notifications':
      case 'profile':
      case 'risk-assessment':
      case 'user-management':
      case 'system-health':
        setCurrentScreen(screen as Screen);
        break;
      default:
        // Handle role-specific navigation
        if (userRole) {
          switch (userRole) {
            case 'farmer':
              setCurrentScreen('farmer-dashboard');
              break;
            case 'researcher':
              setCurrentScreen('researcher-dashboard');
              break;
            case 'policy-maker':
              setCurrentScreen('policy-maker-dashboard');
              break;
            case 'admin':
              setCurrentScreen('admin-dashboard');
              break;
          }
        }
    }
  };

  const showBottomNavigation = () => {
    return userRole && !['auth', 'role-selection'].includes(currentScreen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;
      
      case 'role-selection':
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
      
      case 'farmer-dashboard':
        return <FarmerDashboard onNavigate={handleNavigate} />;
      
      case 'researcher-dashboard':
        return <ResearcherDashboard onNavigate={handleNavigate} />;
      
      case 'policy-maker-dashboard':
        return <PolicyMakerDashboard onNavigate={handleNavigate} />;
      
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      
      case 'chatbot':
        return <ChatbotScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      case 'map':
        return <InteractiveMap onNavigate={handleNavigate} />;
      
      case 'data-charts':
        return <DataChartsScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      case 'notifications':
        return <NotificationsScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      case 'risk-assessment':
        return <RiskAssessmentScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      case 'user-management':
        return <UserManagementScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      case 'system-health':
        return <SystemHealthScreen onNavigate={handleNavigate} userRole={userRole} />;
      
      default:
        return <AuthScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentScreen()}
      
      {showBottomNavigation() && (
        <BottomNavigation 
          activeScreen={currentScreen}
          userRole={userRole}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}