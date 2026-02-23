import { motion } from 'framer-motion';
import { useState } from 'react';
import { Actuator } from '@/lib/mockData';

interface ActuatorControlProps {
  actuators: Actuator[];
  onToggle: (actuatorId: string) => void;
  isManualMode: boolean;
}

const actuatorIcons = {
  PUMP: '💧',
  FAN: '🌬️',
  LIGHT: '💡',
};

const actuatorLabels = {
  PUMP: 'Water Pump',
  FAN: 'Ventilation',
  LIGHT: 'Grow Light',
};

export function ActuatorControl({
  actuators,
  onToggle,
  isManualMode,
}: ActuatorControlProps) {
  const [toggling, setToggling] = useState<string | null>(null);

  const handleToggle = (actuatorId: string) => {
    setToggling(actuatorId);
    setTimeout(() => {
      onToggle(actuatorId);
      setToggling(null);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative p-6 border-2 border-cyan-400 glow-cyan overflow-hidden"
    >
      {/* HUD Corners */}
      <div className="hud-corner-tl"></div>
      <div className="hud-corner-tr"></div>
      <div className="hud-corner-bl"></div>
      <div className="hud-corner-br"></div>

      <div className="relative z-10">
        <h3 className="font-orbitron text-xl font-bold glow-text-cyan mb-4">
          Actuator Control
        </h3>

        <div className="neon-line mb-4"></div>

        <div className="space-y-3">
          {actuators.map((actuator) => (
            <motion.div
              key={actuator.id}
              layout
              className="flex items-center justify-between p-3 bg-gray-900 border border-gray-700 rounded"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {actuatorIcons[actuator.type]}
                </span>
                <div>
                  <p className="font-mono text-sm font-bold text-gray-200">
                    {actuatorLabels[actuator.type]}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last: {actuator.lastToggled.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleToggle(actuator.id)}
                disabled={toggling === actuator.id || !isManualMode}
                className={`relative px-4 py-2 font-mono font-bold text-sm uppercase transition-all ${
                  actuator.status === 'ON'
                    ? 'bg-green-500 text-black shadow-lg shadow-green-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {toggling === actuator.id ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                  >
                    ⟳
                  </motion.span>
                ) : (
                  actuator.status
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {!isManualMode && (
          <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded text-xs text-yellow-400">
            ⚠ Automatic mode active. Switch to MANUAL to control actuators.
          </div>
        )}
      </div>
    </motion.div>
  );
}
