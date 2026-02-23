import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createMockGreenhouses, Greenhouse } from '@/lib/mockData';

export default function Greenhouses() {
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>(() => createMockGreenhouses());
  const [selectedId, setSelectedId] = useState(greenhouses[0]?.id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');

  const selectedGreenhouse = greenhouses.find((gh) => gh.id === selectedId);

  const handleAddGreenhouse = () => {
    if (newName.trim()) {
      const newGh = {
        id: `gh-${Date.now()}`,
        name: newName,
        location: 'Kigali, Rwanda',
        mode: 'AUTO' as const,
        currentCrop: undefined,
        plantingDate: new Date(),
        currentSensors: {
          temperature: 22,
          humidity: 65,
          soilMoisture: 55,
          lightLevel: 4500,
          timestamp: new Date(),
        },
        actuators: [],
      };
      setGreenhouses([...greenhouses, newGh]);
      setNewName('');
      setShowAddForm(false);
      setSelectedId(newGh.id);
    }
  };

  const handleDeleteGreenhouse = (id: string) => {
    const filtered = greenhouses.filter((gh) => gh.id !== id);
    setGreenhouses(filtered);
    if (selectedId === id && filtered.length > 0) {
      setSelectedId(filtered[0].id);
    }
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
            GREENHOUSE MANAGEMENT
          </h1>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Multi-site monitoring • Comparative analytics • Unified control
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Greenhouse List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 border-2 border-cyan-400 glow-cyan"
          >
            <h2 className="font-orbitron text-xl font-bold glow-text-cyan mb-4">
              Your Greenhouses
            </h2>

            <div className="space-y-2 mb-4">
              <AnimatePresence>
                {greenhouses.map((gh) => (
                  <motion.button
                    key={gh.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => setSelectedId(gh.id)}
                    className={`w-full text-left p-3 rounded transition-all ${
                      selectedId === gh.id
                        ? 'bg-cyan-600 text-black border-2 border-cyan-400'
                        : 'bg-gray-900 border border-gray-700 text-gray-300 hover:border-cyan-400'
                    }`}
                  >
                    <p className="font-mono font-bold">{gh.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{gh.location}</p>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <div className="neon-line mb-4"></div>

            {/* Add Greenhouse */}
            <AnimatePresence>
              {showAddForm ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Greenhouse name"
                    className="w-full px-3 py-2 bg-gray-900 border border-cyan-400 text-white font-mono text-sm rounded focus:outline-none focus:border-cyan-300"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddGreenhouse()}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddGreenhouse}
                      className="flex-1 px-3 py-2 bg-green-600 text-white font-mono text-sm rounded hover:bg-green-500"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setNewName('');
                      }}
                      className="flex-1 px-3 py-2 bg-gray-700 text-white font-mono text-sm rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full px-3 py-2 bg-cyan-600 text-black font-mono font-bold text-sm rounded hover:bg-cyan-500"
                >
                  + Add Greenhouse
                </button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Selected Greenhouse Details */}
          {selectedGreenhouse && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 p-6 border-2 border-pink-500 glow-pink"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-orbitron text-2xl font-bold glow-text-pink">
                    {selectedGreenhouse.name}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{selectedGreenhouse.location}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteGreenhouse(selectedGreenhouse.id)}
                  className="px-4 py-2 bg-red-600 text-white font-mono text-sm rounded hover:bg-red-500"
                >
                  Delete
                </motion.button>
              </div>

              <div className="neon-line-pink mb-6"></div>

              {/* Current Status */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase font-mono text-gray-500 mb-2">System Mode</p>
                  <p className="text-lg font-bold font-orbitron text-cyan-400">
                    {selectedGreenhouse.mode}
                  </p>
                </div>

                {selectedGreenhouse.currentCrop && (
                  <div>
                    <p className="text-xs uppercase font-mono text-gray-500 mb-2">Current Crop</p>
                    <p className="text-lg font-bold font-orbitron text-pink-400">
                      {selectedGreenhouse.currentCrop.name}
                    </p>
                    <p className="text-sm text-gray-400 italic">
                      {selectedGreenhouse.currentCrop.scientificName}
                    </p>
                  </div>
                )}

                {/* Sensor Summary */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500">Temperature</p>
                    <p className="text-lg font-bold text-cyan-400">
                      {selectedGreenhouse.currentSensors.temperature.toFixed(1)}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Humidity</p>
                    <p className="text-lg font-bold text-pink-400">
                      {selectedGreenhouse.currentSensors.humidity.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Soil Moisture</p>
                    <p className="text-lg font-bold text-green-400">
                      {selectedGreenhouse.currentSensors.soilMoisture.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Light Level</p>
                    <p className="text-lg font-bold text-purple-400">
                      {selectedGreenhouse.currentSensors.lightLevel.toFixed(0)} lux
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Comparative Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-6 border-2 border-purple-500 glow-purple"
        >
          <h2 className="font-orbitron text-xl font-bold text-purple-400 mb-4">
            Comparative Analytics
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-purple-500">
                  <th className="text-left py-2 px-3 text-purple-300">Greenhouse</th>
                  <th className="text-center py-2 px-3 text-cyan-300">Temp</th>
                  <th className="text-center py-2 px-3 text-pink-300">Humidity</th>
                  <th className="text-center py-2 px-3 text-green-300">Moisture</th>
                  <th className="text-center py-2 px-3 text-purple-300">Light</th>
                  <th className="text-center py-2 px-3 text-yellow-300">Mode</th>
                </tr>
              </thead>
              <tbody>
                {greenhouses.map((gh) => (
                  <motion.tr
                    key={gh.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-700 hover:bg-gray-900/50"
                  >
                    <td className="py-3 px-3 text-gray-300">{gh.name}</td>
                    <td className="py-3 px-3 text-center text-cyan-400">
                      {gh.currentSensors.temperature.toFixed(1)}°C
                    </td>
                    <td className="py-3 px-3 text-center text-pink-400">
                      {gh.currentSensors.humidity.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center text-green-400">
                      {gh.currentSensors.soilMoisture.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center text-purple-400">
                      {(gh.currentSensors.lightLevel / 1000).toFixed(1)}k
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          gh.mode === 'AUTO'
                            ? 'bg-cyan-900/50 text-cyan-300'
                            : 'bg-pink-900/50 text-pink-300'
                        }`}
                      >
                        {gh.mode}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
