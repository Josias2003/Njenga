import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SensorCard } from '@/components/SensorCard';
import { CropInfoCard } from '@/components/CropInfoCard';
import { ActuatorControl } from '@/components/ActuatorControl';
import { DecisionLog } from '@/components/DecisionLog';
import { SystemModeToggle } from '@/components/SystemModeToggle';

import {
  createMockGreenhouse,
  generateSensorReading,
  generateDecisions,
  generateActuators,
  Greenhouse,
  Decision,
  Actuator,
} from '@/lib/mockData';

export default function Dashboard() {
  const [greenhouse, setGreenhouse] = useState<Greenhouse>(() =>
    createMockGreenhouse('gh-1', 'Main Greenhouse')
  );
  const [mode, setMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [decisions, setDecisions] = useState<Decision[]>(() => generateDecisions());
  const [actuators, setActuators] = useState<Actuator[]>(() => generateActuators());
  const [userRole, setUserRole] = useState<'farmer' | 'agronomist' | 'admin'>('farmer');

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGreenhouse((prev) => ({
        ...prev,
        currentSensors: generateSensorReading(
          prev.currentCrop?.tempMin || 20,
          prev.currentCrop?.humidityMin || 60,
          prev.currentCrop?.soilMoistureMin || 50,
          prev.currentCrop?.lightRequirement || 5000
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update decisions periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDecisions((prev) => {
        const newDecisions = generateDecisions();
        return newDecisions;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleModeChange = (newMode: 'AUTO' | 'MANUAL') => {
    setMode(newMode);
  };

  const handleActuatorToggle = (actuatorId: string) => {
    setActuators((prev) =>
      prev.map((act) =>
        act.id === actuatorId
          ? { ...act, status: act.status === 'ON' ? 'OFF' : 'ON', lastToggled: new Date() }
          : act
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Role Badge */}
      <div className="fixed top-24 right-4 z-30 px-4 py-2 border-2 border-cyan-400 glow-cyan rounded font-mono text-sm uppercase">
        <span className="glow-text-cyan">Role: {userRole}</span>
      </div>
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-orbitron text-5xl font-bold glow-text-cyan mb-2">
            NJENGA GREENS
          </h1>
          <h2 className="font-orbitron text-2xl font-bold glow-text-pink mb-4">
            Smart Greenhouse Monitoring System
          </h2>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Real-time environmental control • Automated crop management • Advanced analytics
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Left Column - Sensors */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <SensorCard
              label="Temperature"
              value={greenhouse.currentSensors.temperature}
              unit="°C"
              min={greenhouse.currentCrop?.tempMin || 15}
              max={greenhouse.currentCrop?.tempMax || 30}
              icon="🌡️"
              color="cyan"
            />
            <SensorCard
              label="Humidity"
              value={greenhouse.currentSensors.humidity}
              unit="%"
              min={greenhouse.currentCrop?.humidityMin || 40}
              max={greenhouse.currentCrop?.humidityMax || 80}
              icon="💨"
              color="pink"
            />
            <SensorCard
              label="Soil Moisture"
              value={greenhouse.currentSensors.soilMoisture}
              unit="%"
              min={greenhouse.currentCrop?.soilMoistureMin || 40}
              max={greenhouse.currentCrop?.soilMoistureMax || 70}
              icon="🌱"
              color="green"
            />
            <SensorCard
              label="Light Level"
              value={greenhouse.currentSensors.lightLevel}
              unit="lux"
              min={0}
              max={greenhouse.currentCrop?.lightRequirement || 6000}
              icon="💡"
              color="purple"
            />
          </div>

          {/* Right Column - Crop Info & Mode */}
          <div className="lg:col-span-2 space-y-4">
            {greenhouse.currentCrop && (
              <CropInfoCard
                crop={greenhouse.currentCrop}
                plantingDate={greenhouse.plantingDate || new Date()}
              />
            )}
            <SystemModeToggle mode={mode} onModeChange={handleModeChange} />
          </div>
        </div>

        {/* Bottom Row - Controls & Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActuatorControl
            actuators={actuators}
            onToggle={handleActuatorToggle}
            isManualMode={mode === 'MANUAL'}
          />
          <DecisionLog decisions={decisions} />
        </div>

        {/* Footer with Role Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-500 text-xs font-mono">NJENGA GREENS DASHBOARD v1.0 • Real-time monitoring active • All systems operational</p>
            <div className="flex gap-2">
              {(['farmer', 'agronomist', 'admin'] as const).map((role) => (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserRole(role)}
                  className={`px-3 py-1 font-mono text-xs uppercase border-2 transition-all ${userRole === role ? 'border-cyan-400 bg-cyan-600 text-black' : 'border-gray-600 text-gray-400 hover:border-cyan-400'}`}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
