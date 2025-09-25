import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  Mic,
  Paperclip,
  MoreHorizontal,
  ArrowLeft,
  Lightbulb,
  TrendingUp,
  Droplets,
  CloudRain
} from 'lucide-react';

interface ChatbotScreenProps {
  onNavigate: (screen: string) => void;
  userRole: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'suggestion' | 'data' | 'alert';
}

export function ChatbotScreen({ onNavigate, userRole }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message based on role
  useEffect(() => {
    const welcomeMessage = getWelcomeMessage(userRole);
    setMessages([{
      id: 1,
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, [userRole]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getWelcomeMessage = (role: string) => {
    switch (role) {
      case 'farmer':
        return "Hello! I'm your HydroSense AI assistant. I can help you with irrigation advice, water table updates, government subsidies, and best practices for water conservation. How can I assist you today?";
      case 'researcher':
        return "Welcome! I'm here to help you with data analysis, research queries, trend interpretation, and technical insights about groundwater patterns. What would you like to explore?";
      case 'policy-maker':
        return "Greetings! I can assist you with regional analysis, policy impact assessments, risk evaluations, and scenario planning for water resource management. How may I help?";
      case 'admin':
        return "Hello Admin! I can help you with system monitoring, user management queries, data source integration, and platform administration tasks. What do you need assistance with?";
      default:
        return "Hello! I'm your HydroSense AI assistant. How can I help you with groundwater management today?";
    }
  };

  const quickSuggestions = {
    farmer: [
      "When should I irrigate my crops?",
      "What's my current water table status?",
      "Are there any subsidies available?",
      "Best crops for water conservation?"
    ],
    researcher: [
      "Show me groundwater trends",
      "Anomalies detected this month?",
      "Export data for analysis",
      "Correlation with rainfall patterns"
    ],
    'policy-maker': [
      "Regional drought risk assessment",
      "Water conservation policy impact",
      "Emergency response recommendations",
      "Climate change projections"
    ],
    admin: [
      "System health status",
      "User activity summary",
      "Sensor network overview",
      "Data quality metrics"
    ]
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Role-specific responses
    if (userRole === 'farmer') {
      if (message.includes('irrigate') || message.includes('watering')) {
        return "Based on current conditions, I recommend reducing irrigation by 15%. Your water table has improved by 2.3m since last week due to recent rainfall. The soil moisture is at 68% - optimal for most crops. Next check recommended in 2 days.";
      }
      if (message.includes('subsidy') || message.includes('government')) {
        return "Good news! There are 3 active subsidy schemes: 1) Drip irrigation subsidy (60% coverage) 2) Solar pump subsidy (₹50,000) 3) Water conservation reward program. Would you like details on eligibility criteria?";
      }
      if (message.includes('crop') || message.includes('plant')) {
        return "For water conservation, I recommend: Drought-resistant varieties like pearl millet, sorghum, and chickpea. These crops use 40% less water while maintaining good yields. Cotton and sugarcane should be avoided in current conditions.";
      }
    }
    
    if (userRole === 'researcher') {
      if (message.includes('trend') || message.includes('analysis')) {
        return "Current trends show: 15% improvement in groundwater levels across 156 wells. Seasonal patterns indicate 23% deviation from historical averages. LSTM model predicts continued improvement over next 3 months with 87% confidence.";
      }
      if (message.includes('anomaly') || message.includes('detection')) {
        return "12 anomalies detected this month: 4 sudden drops (>3m), 3 unusual spikes, 5 irregular patterns. Most concerning: Well MW-234 dropped 5.2m in 2 days. Isolation Forest model flagged 89% as sensor-related issues.";
      }
      if (message.includes('export') || message.includes('data')) {
        return "Available datasets: Historical DWLR (2.4MB, 12,456 records), Rainfall correlation (890KB), Anomaly reports (1.2MB). Which format do you prefer? CSV, Excel, or JSON? I can also generate custom queries.";
      }
    }
    
    if (userRole === 'policy-maker') {
      if (message.includes('drought') || message.includes('risk')) {
        return "Current drought risk: Marathwada (HIGH - 89% probability), Vidarbha (MEDIUM - 45%), Western Ghats (LOW - 12%). Recommend immediate water supply measures for 156,000 people in critical zones. Emergency reserves at 34%.";
      }
      if (message.includes('policy') || message.includes('impact')) {
        return "Water conservation policy impact: 23% reduction in consumption, 156 farmers adopted efficient irrigation, ₹2.3M saved in subsidies. Recommend expanding to 5 more districts. ROI: 3.2x over 18 months.";
      }
      if (message.includes('climate') || message.includes('projection')) {
        return "Climate projections (6 months): 15% below normal rainfall, 2.3°C above average temperature. Groundwater depletion risk: HIGH. Recommend proactive measures: water banking, rainwater harvesting, crop pattern shifts.";
      }
    }
    
    if (userRole === 'admin') {
      if (message.includes('system') || message.includes('health')) {
        return "System status: 99.7% uptime, 245ms response time, 1,847 active connections. 3/5 sensors online, 1 in maintenance, 1 offline (battery). Storage: 78% full. All services operational. No critical alerts.";
      }
      if (message.includes('user') || message.includes('activity')) {
        return "User activity: 234 active farmers, 45 researchers, 12 policy makers. Peak usage: 2-4 PM. 5 pending registrations, 12 support tickets. Top feature: water table monitoring (67% usage). Average session: 12 minutes.";
      }
    }
    
    // Generic responses
    if (message.includes('weather') || message.includes('rain')) {
      return "Current weather: 28°C, 65% humidity, 12 km/h wind. 2.5mm rainfall recorded. Forecast: Partly cloudy with 40% chance of rain in next 2 days. Good conditions for field work.";
    }
    
    return "I understand your question. Based on the current data and your profile, let me provide you with relevant information. Could you be more specific about what aspect you'd like me to focus on?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">HydroSense AI</h1>
              <p className="text-xs text-green-600 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
              <div className={`rounded-2xl p-3 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <p className={`text-xs text-gray-500 mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp}
              </p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-2 mr-2 ${
              message.sender === 'user' ? 'order-2 bg-gray-300' : 'order-1 bg-blue-100'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-gray-600" />
              ) : (
                <Bot className="w-4 h-4 text-blue-600" />
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="bg-white border border-gray-200 rounded-2xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-1">
            <Lightbulb className="w-4 h-4" />
            <span>Quick suggestions</span>
          </h3>
          <div className="space-y-2">
            {quickSuggestions[userRole as keyof typeof quickSuggestions]?.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 px-3"
                onClick={() => handleQuickSuggestion(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="sm" className="mb-1">
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="resize-none border-gray-300 focus:border-blue-500"
            />
          </div>
          <Button variant="ghost" size="sm" className="mb-1">
            <Mic className="w-5 h-5" />
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 mb-1"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}