import { useState } from 'react';
import { motion } from 'framer-motion';
import { RWANDA_CROPS, calculateGrowthStage } from '@/lib/mockData';

export default function Settings() {
  const [selectedCrop, setSelectedCrop] = useState(RWANDA_CROPS[0]);
  const [plantingDate, setPlantingDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const growthStage = calculateGrowthStage(new Date(plantingDate), selectedCrop);
  const daysSincePlanting = Math.floor(
    (Date.now() - new Date(plantingDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleReset = () => {
    setShowResetConfirm(false);
    // Reset logic would go here
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
            SYSTEM SETTINGS
          </h1>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Configuration • Crop management • System maintenance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Crop Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 border-2 border-cyan-400 glow-cyan"
          >
            <h2 className="font-orbitron text-xl font-bold glow-text-cyan mb-4">
              Crop Selection
            </h2>

            <div className="mb-4">
              <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                Select Crop (30 Rwanda Crops)
              </label>
              <select
                value={selectedCrop.id}
                onChange={(e) => {
                  const crop = RWANDA_CROPS.find((c) => c.id === parseInt(e.target.value));
                  if (crop) setSelectedCrop(crop);
                }}
                className="w-full px-3 py-2 bg-gray-900 border border-cyan-400 text-white font-mono text-sm rounded focus:outline-none focus:border-cyan-300"
              >
                {RWANDA_CROPS.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} ({crop.scientificName})
                  </option>
                ))}
              </select>
            </div>

            <div className="neon-line mb-4"></div>

            {/* Crop Details */}
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase font-mono text-gray-500 mb-1">Scientific Name</p>
                <p className="text-sm text-cyan-400">{selectedCrop.scientificName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs uppercase font-mono text-gray-500 mb-1">Temp Range</p>
                  <p className="text-sm text-cyan-400">
                    {selectedCrop.tempMin}°C - {selectedCrop.tempMax}°C
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-gray-500 mb-1">Humidity</p>
                  <p className="text-sm text-cyan-400">
                    {selectedCrop.humidityMin}% - {selectedCrop.humidityMax}%
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-gray-500 mb-1">Soil Moisture</p>
                  <p className="text-sm text-cyan-400">
                    {selectedCrop.soilMoistureMin}% - {selectedCrop.soilMoistureMax}%
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-gray-500 mb-1">Light Req.</p>
                  <p className="text-sm text-cyan-400">{selectedCrop.lightRequirement} lux</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Planting Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 border-2 border-pink-500 glow-pink"
          >
            <h2 className="font-orbitron text-xl font-bold text-pink-400 mb-4">
              Planting Configuration
            </h2>

            <div className="mb-4">
              <label className="block text-xs uppercase font-mono text-gray-500 mb-2">
                Planting Date
              </label>
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-pink-400 text-white font-mono text-sm rounded focus:outline-none focus:border-pink-300"
              />
            </div>

            <div className="neon-line-pink mb-4"></div>

            {/* Growth Stage Info */}
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase font-mono text-gray-500 mb-1">Current Growth Stage</p>
                <p className="text-lg font-bold font-orbitron text-pink-400">{growthStage}</p>
              </div>

              <div>
                <p className="text-xs uppercase font-mono text-gray-500 mb-1">Days Since Planting</p>
                <p className="text-lg font-bold font-orbitron text-cyan-400">{daysSincePlanting} days</p>
              </div>

              <div className="bg-gray-900 p-3 rounded border border-pink-500/30 mt-4">
                <p className="text-xs text-gray-400 mb-2">
                  <strong>Growth Stage Timeline:</strong>
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Germination: 0-14 days</li>
                  <li>• Seedling: 14-30 days</li>
                  <li>• Vegetative: 30-50 days</li>
                  <li>• Flowering: 50-70 days</li>
                  <li>• Fruiting: 70+ days</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Maintenance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-6 border-2 border-purple-500 glow-purple"
        >
          <h2 className="font-orbitron text-xl font-bold text-purple-400 mb-4">
            System Maintenance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-blue-500 text-blue-400 font-mono font-bold uppercase text-sm rounded hover:bg-blue-900/20 transition-all"
            >
              📊 Export Data
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-green-500 text-green-400 font-mono font-bold uppercase text-sm rounded hover:bg-green-900/20 transition-all"
            >
              ⚙️ Calibrate Sensors
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowResetConfirm(true)}
              className="p-4 border-2 border-red-500 text-red-400 font-mono font-bold uppercase text-sm rounded hover:bg-red-900/20 transition-all"
            >
              🔄 Reset System
            </motion.button>
          </div>

          {/* Reset Confirmation */}
          {showResetConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-red-900/30 border-2 border-red-500 rounded"
            >
              <p className="text-red-300 font-mono text-sm mb-3">
                ⚠️ Are you sure? This will clear all data and reconfigure the system.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-mono font-bold text-sm rounded hover:bg-red-500"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white font-mono font-bold text-sm rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-4 bg-gray-900/50 border border-gray-700 rounded text-center text-gray-500 text-xs font-mono"
        >
          <p>System Version 1.0 • Last Updated: {new Date().toLocaleString()}</p>
        </motion.div>
      </div>
    </div>
  );
}
