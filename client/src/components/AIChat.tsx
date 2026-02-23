import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SensorReading, Crop } from '@/lib/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  sensors: SensorReading;
  crop?: Crop;
  isOpen: boolean;
  onClose: () => void;
}

// Mock AI responses for crop recommendations
const mockResponses = [
  'Based on current sensor readings, your soil moisture is optimal. Continue monitoring for the next 24 hours.',
  'I notice humidity levels are slightly elevated. Consider increasing ventilation to prevent fungal diseases.',
  'Temperature is within the ideal range for {crop}. Current growth stage appears to be progressing normally.',
  'Light levels are adequate for photosynthesis. The plant should continue developing well at this intensity.',
  'Soil moisture is approaching the lower threshold. Recommend activating irrigation system within the next 2 hours.',
  'Environmental conditions are excellent for {crop}. All parameters are within optimal ranges.',
  'Humidity is on the lower side. Recommend misting or increasing water vapor in the greenhouse.',
  'Temperature fluctuations detected. Ensure ventilation system is functioning properly to maintain stability.',
];

export function AIChat({ sensors, crop, isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI Greenhouse Assistant. I can help you optimize growing conditions for ${crop?.name || 'your crops'}. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    // Simple mock response generator
    let response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    if (crop) {
      response = response.replace('{crop}', crop.name);
    }

    // Add sensor-based context
    if (userMessage.toLowerCase().includes('temperature')) {
      response = `Current temperature is ${sensors.temperature.toFixed(1)}°C. ${response}`;
    } else if (userMessage.toLowerCase().includes('humidity')) {
      response = `Current humidity is ${sensors.humidity.toFixed(1)}%. ${response}`;
    } else if (userMessage.toLowerCase().includes('moisture')) {
      response = `Current soil moisture is ${sensors.soilMoisture.toFixed(1)}%. ${response}`;
    } else if (userMessage.toLowerCase().includes('light')) {
      response = `Current light level is ${sensors.lightLevel.toFixed(0)} lux. ${response}`;
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 w-96 h-96 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 glow-purple rounded-lg shadow-2xl flex flex-col z-50"
      >
        {/* Header */}
        <div className="p-4 border-b border-purple-500 flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-purple-400">AI Assistant</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded text-sm ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-200 border border-purple-500/30'
                }`}
              >
                <p className="font-mono text-xs">{msg.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800 px-3 py-2 rounded border border-purple-500/30">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-gray-400 text-sm font-mono"
                >
                  ⟳ Thinking...
                </motion.span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-500 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your greenhouse..."
            className="flex-1 px-3 py-2 bg-gray-900 border border-purple-500 text-white font-mono text-sm rounded focus:outline-none focus:border-purple-400"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-3 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
