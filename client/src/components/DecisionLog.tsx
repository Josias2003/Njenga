import { motion, AnimatePresence } from 'framer-motion';
import { Decision } from '@/lib/mockData';

interface DecisionLogProps {
  decisions: Decision[];
}

export function DecisionLog({ decisions }: DecisionLogProps) {
  const sortedDecisions = [...decisions].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative p-6 border-2 border-purple-500 glow-purple overflow-hidden"
    >
      {/* HUD Corners */}
      <div className="hud-corner-tl"></div>
      <div className="hud-corner-tr"></div>
      <div className="hud-corner-bl"></div>
      <div className="hud-corner-br"></div>

      <div className="relative z-10">
        <h3 className="font-orbitron text-xl font-bold text-purple-400 mb-4">
          Decision Log
        </h3>

        <div className="neon-line-pink mb-4"></div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {sortedDecisions.slice(0, 10).map((decision, index) => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-3 bg-gray-900/50 border border-purple-500/30 rounded hover:border-purple-500/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1">
                    <p className="text-sm font-mono text-purple-300">
                      {decision.action}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                      decision.isAutomatic
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-orange-900/50 text-orange-300'
                    }`}
                  >
                    {decision.isAutomatic ? 'AUTO' : 'MANUAL'}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-2">{decision.reason}</p>

                <div className="flex items-center justify-between">
                  {decision.actuatorType && (
                    <span className="text-xs font-mono text-cyan-400">
                      {decision.actuatorType}: {decision.actuatorAction}
                    </span>
                  )}
                  <span className="text-xs text-gray-600">
                    {decision.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            Showing {Math.min(10, sortedDecisions.length)} of{' '}
            {sortedDecisions.length} decisions
          </p>
        </div>
      </div>
    </motion.div>
  );
}
