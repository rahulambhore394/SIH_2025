import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Droplets, Shield, Zap } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (role: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    // Mock authentication - in real app would validate credentials
    // For demo, redirect to role selection
    onLogin('role-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* App Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">HydroSense</h1>
          <p className="text-gray-600">Smart Groundwater Management</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Sign up to start monitoring groundwater'
                : 'Sign in to your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="farmer@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP (if returning user)</Label>
                  <Input
                    id="otp"
                    placeholder="123456"
                    type="text"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleAuth}
              className="w-full mt-6"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <div className="text-center mt-4">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:underline text-sm"
              >
                {isSignUp 
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              <Droplets className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Real-time Monitoring</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">AI Predictions</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600">Risk Alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
}