import { motion } from 'framer-motion';
import { getStatusForSensor } from '@/lib/mockData';

interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  icon: React.ReactNode;
  color: 'cyan' | 'pink' | 'purple' | 'green';
}

export function SensorCard({
  label,
  value,
  unit,
  min,
  max,
  icon,
  color,
}: SensorCardProps) {
  const status = getStatusForSensor(value, min, max);
  const percentage = ((value - min) / (max - min)) * 100;

  const colorMap = {
    cyan: 'border-cyan-400 glow-cyan',
    pink: 'border-pink-500 glow-pink',
    purple: 'border-purple-500 glow-purple',
    green: 'border-green-500',
  };

  const glowTextMap = {
    cyan: 'glow-text-cyan',
    pink: 'glow-text-pink',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  const statusIndicatorMap = {
    optimal: 'status-indicator active',
    warning: 'status-indicator warning',
    critical: 'status-indicator critical',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative p-6 border-2 ${colorMap[color]} overflow-hidden group`}
    >
      {/* HUD Corners */}
      <div className="hud-corner-tl"></div>
      <div className="hud-corner-tr"></div>
      <div className="hud-corner-bl"></div>
      <div className="hud-corner-br"></div>

      {/* Background glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{icon}</div>
            <div className="font-orbitron font-bold text-sm uppercase tracking-wider">
              {label}
            </div>
          </div>
          <div className={statusIndicatorMap[status]}></div>
        </div>

        {/* Value Display */}
        <div className="mb-4">
          <motion.div
            key={Math.floor(value)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold font-orbitron ${glowTextMap[color]}`}
          >
            {value.toFixed(1)}
            <span className="text-lg ml-1 text-gray-400">{unit}</span>
          </motion.div>
        </div>

        {/* Range Info */}
        <div className="flex justify-between text-xs text-gray-500 mb-3 font-mono">
          <span>Min: {min.toFixed(1)}</span>
          <span>Max: {max.toFixed(1)}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-900 border border-gray-700 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${
              color === 'cyan'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-400'
                : color === 'pink'
                ? 'bg-gradient-to-r from-pink-500 to-pink-400'
                : color === 'purple'
                ? 'bg-gradient-to-r from-purple-500 to-purple-400'
                : 'bg-gradient-to-r from-green-500 to-green-400'
            }`}
          />
        </div>

        {/* Status Text */}
        <div className="mt-3 text-xs uppercase font-mono">
          <span
            className={
              status === 'optimal'
                ? 'text-green-400'
                : status === 'warning'
                ? 'text-yellow-400'
                : 'text-red-400'
            }
          >
            {status === 'optimal' && '✓ Optimal'}
            {status === 'warning' && '⚠ Warning'}
            {status === 'critical' && '✕ Critical'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
