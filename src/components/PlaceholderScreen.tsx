import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Wrench } from 'lucide-react';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  onNavigate: (screen: string) => void;
}

export function PlaceholderScreen({ title, description, onNavigate }: PlaceholderScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">Feature in development</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Coming Soon:</strong> This feature is currently being developed and will be available in the next update.
                </p>
              </div>
              <Button onClick={() => onNavigate('back')} className="w-full max-w-xs">
                Go Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}