import { motion } from 'framer-motion';
import { useState } from 'react';

interface SystemModeToggleProps {
  mode: 'AUTO' | 'MANUAL';
  onModeChange: (mode: 'AUTO' | 'MANUAL') => void;
}

export function SystemModeToggle({ mode, onModeChange }: SystemModeToggleProps) {
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  const handleToggle = () => {
    const newMode = mode === 'AUTO' ? 'MANUAL' : 'AUTO';
    if (newMode === 'MANUAL') {
      setIsWarningVisible(true);
      setTimeout(() => setIsWarningVisible(false), 3000);
    }
    onModeChange(newMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Warning Banner */}
      {isWarningVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-16 left-0 right-0 p-3 bg-red-900/80 border-2 border-red-500 rounded text-red-300 text-sm font-mono text-center z-50"
        >
          ⚠ MANUAL MODE ACTIVATED - System automation disabled
        </motion.div>
      )}

      <div className="p-6 border-2 border-pink-500 glow-pink overflow-hidden relative">
        {/* HUD Corners */}
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-tr"></div>
        <div className="hud-corner-bl"></div>
        <div className="hud-corner-br"></div>

        <div className="relative z-10">
          <p className="text-xs uppercase font-mono text-gray-500 mb-3">System Mode</p>

          <div className="flex items-center justify-between mb-4">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'AUTO' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-3xl font-bold font-orbitron ${
                mode === 'AUTO' ? 'glow-text-cyan' : 'glow-text-pink'
              }`}
            >
              {mode}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggle}
              className={`relative px-6 py-3 font-mono font-bold uppercase transition-all rounded ${
                mode === 'AUTO'
                  ? 'bg-cyan-600 text-black shadow-lg shadow-cyan-500/50 hover:bg-cyan-500'
                  : 'bg-pink-600 text-white shadow-lg shadow-pink-500/50 hover:bg-pink-500'
              }`}
            >
              Switch Mode
            </motion.button>
          </div>

          <div className="neon-line mb-4"></div>

          {/* Mode Description */}
          <div className="space-y-2">
            <div className="text-xs">
              <p className="text-gray-500 uppercase font-mono mb-1">Current Status</p>
              {mode === 'AUTO' ? (
                <p className="text-cyan-400 font-mono">
                  ✓ Automated decisions based on crop requirements
                </p>
              ) : (
                <p className="text-pink-400 font-mono">
                  ✓ Manual control enabled - operator intervention required
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
