import { useState } from 'react';
import { motion } from 'framer-motion';

interface Crop {
  id: string;
  name: string;
  variety: string;
  zone: string;
  plantingDate: Date;
  expectedHarvestDate: Date;
  healthScore: number;
  status: 'planning' | 'growing' | 'harvesting' | 'completed';
}

export default function GreenhousesEnhanced() {
  const [crops] = useState<Crop[]>([
    {
      id: 'crop-1',
      name: 'Cherry Tomatoes',
      variety: 'Sungold',
      zone: 'Zone A',
      plantingDate: new Date('2024-12-01'),
      expectedHarvestDate: new Date('2025-03-15'),
      healthScore: 85,
      status: 'growing',
    },
    {
      id: 'crop-2',
      name: 'Butterhead Lettuce',
      variety: 'Bibb',
      zone: 'Zone B',
      plantingDate: new Date('2025-01-01'),
      expectedHarvestDate: new Date('2025-02-15'),
      healthScore: 92,
      status: 'growing',
    },
    {
      id: 'crop-3',
      name: 'Bell Peppers',
      variety: 'Red Beauty',
      zone: 'Zone C',
      plantingDate: new Date('2024-11-15'),
      expectedHarvestDate: new Date('2025-04-01'),
      healthScore: 78,
      status: 'growing',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'border-blue-500';
      case 'growing':
        return 'border-green-500';
      case 'harvesting':
        return 'border-yellow-500';
      case 'completed':
        return 'border-gray-500';
      default:
        return 'border-cyan-400';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-400';
    if (score >= 60) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  const daysToHarvest = (date: Date) => {
    const today = new Date();
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
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
            CROP MANAGEMENT
          </h1>
          <h2 className="font-orbitron text-2xl font-bold glow-text-pink mb-4">
            Greenhouse Operations & Lifecycle Tracking
          </h2>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Crop registration • Planting schedules • Harvest predictions • AI health monitoring
          </p>
        </motion.div>

        {/* Greenhouse Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative p-6 border-2 border-cyan-400 glow-cyan overflow-hidden mb-8"
        >
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-tr"></div>
          <div className="hud-corner-bl"></div>
          <div className="hud-corner-br"></div>

          <div className="relative z-10">
            <h3 className="font-orbitron text-2xl font-bold glow-text-cyan mb-4">
              Main Greenhouse
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">LOCATION</p>
                <p className="text-sm font-bold text-cyan-400">Rubavu, Busasamana</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">TOTAL AREA</p>
                <p className="text-sm font-bold text-cyan-400">500 m²</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">ZONES</p>
                <p className="text-sm font-bold text-cyan-400">3 Active</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">STATUS</p>
                <p className="text-sm font-bold text-green-400">OPERATIONAL</p>
              </div>
            </div>

            {/* Zone Layout */}
            <div>
              <p className="font-mono text-xs font-bold uppercase text-cyan-400 mb-3">
                Zone Layout
              </p>
              <div className="grid grid-cols-3 gap-3">
                {['Zone A', 'Zone B', 'Zone C'].map((zone) => (
                  <div
                    key={zone}
                    className="p-4 bg-gradient-to-br from-cyan-900/20 to-cyan-900/10 border-2 border-cyan-500/50 rounded text-center hover:border-cyan-400 transition-all cursor-pointer"
                  >
                    <p className="font-orbitron font-bold text-cyan-400">{zone}</p>
                    <p className="text-xs text-gray-400 mt-1">166.7 m²</p>
                    <p className="text-xs text-green-400 mt-2">1 Active Crop</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Crops Grid */}
        <div className="mb-8">
          <h3 className="font-orbitron text-2xl font-bold glow-text-pink mb-4">
            🤖 AI-Monitored Crops
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop, idx) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`relative p-6 border-2 ${getStatusColor(crop.status)} overflow-hidden hover:shadow-lg transition-all`}
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-tr"></div>
                <div className="hud-corner-bl"></div>
                <div className="hud-corner-br"></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-orbitron font-bold text-lg text-white">
                        {crop.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-mono">{crop.variety}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                        crop.status === 'growing'
                          ? 'bg-green-900/50 text-green-400'
                          : 'bg-gray-900/50 text-gray-400'
                      }`}
                    >
                      {crop.status}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-gray-400 mb-3">📍 {crop.zone}</p>

                  {/* Health Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-gray-500">🤖 AI Health Score</span>
                      <span className="text-sm font-bold text-cyan-400">{crop.healthScore}%</span>
                    </div>
                    <div className="w-full bg-gray-900 border border-gray-700 h-2 rounded">
                      <div
                        className={`h-full bg-gradient-to-r ${getHealthColor(crop.healthScore)} rounded`}
                        style={{ width: `${crop.healthScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2 text-xs mb-4 border-t border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Planted</span>
                      <span className="text-gray-300">
                        {crop.plantingDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expected Harvest</span>
                      <span className="text-gray-300">
                        {crop.expectedHarvestDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between bg-blue-900/30 p-2 rounded">
                      <span className="text-gray-500">Days to Harvest</span>
                      <span className="text-blue-400 font-bold">
                        {daysToHarvest(crop.expectedHarvestDate)} days
                      </span>
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <div className="bg-purple-900/20 border border-purple-500/50 rounded p-2 text-xs">
                    <p className="font-mono font-bold text-purple-400 mb-1">🤖 AI INSIGHT</p>
                    <p className="text-gray-300">
                      {crop.healthScore >= 80
                        ? 'Optimal conditions. Continue current schedule.'
                        : crop.healthScore >= 60
                        ? 'Monitor closely. Adjust watering schedule.'
                        : 'Action required. Review environmental parameters.'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-cyan-600 text-black font-mono text-xs font-bold uppercase rounded hover:bg-cyan-500 transition-all"
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 border border-cyan-400 text-cyan-400 font-mono text-xs font-bold uppercase rounded hover:bg-cyan-900/20 transition-all"
                    >
                      Edit
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Crop Lifecycle Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative p-6 border-2 border-green-500 overflow-hidden"
        >
          <div className="hud-corner-tl" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-tr" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-bl" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-br" style={{ borderColor: '#22C55E' }}></div>

          <div className="relative z-10">
            <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: '#22C55E' }}>
              Crop Lifecycle Stages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { stage: 'Planning', icon: '📋', desc: 'Prepare seeds and plan schedule' },
                { stage: 'Growing', icon: '🌱', desc: 'Monitor growth and maintain conditions' },
                { stage: 'Harvesting', icon: '🌾', desc: 'Harvest at peak ripeness' },
                { stage: 'Completed', icon: '✓', desc: 'Prepare for next cycle' },
              ].map((item) => (
                <div
                  key={item.stage}
                  className="bg-gray-900/50 border border-gray-700 rounded p-3 text-center hover:border-green-500 transition-all cursor-pointer"
                >
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="font-mono font-bold text-sm text-green-400 mb-1">{item.stage}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
