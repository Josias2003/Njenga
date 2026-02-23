import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { generateDecisions, Decision } from '@/lib/mockData';

// Generate mock time-series data
function generateTimeSeriesData() {
  const data = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    const timestamp = new Date(now - i * 3600000);
    data.push({
      time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: 20 + Math.sin(i / 5) * 5 + Math.random() * 3,
      humidity: 65 + Math.cos(i / 5) * 10 + Math.random() * 5,
      soilMoisture: 55 + Math.sin(i / 7) * 8 + Math.random() * 4,
      lightLevel: 4000 + Math.sin(i / 3) * 1500 + Math.random() * 500,
    });
  }
  return data;
}

function generateDecisionFrequency() {
  return [
    { name: 'Pump', frequency: 24 },
    { name: 'Fan', frequency: 18 },
    { name: 'Light', frequency: 12 },
    { name: 'Idle', frequency: 46 },
  ];
}

export default function AnalyticsPage() {
  const timeSeriesData = useMemo(() => generateTimeSeriesData(), []);
  const decisionFrequency = useMemo(() => generateDecisionFrequency(), []);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [decisions] = useState<Decision[]>(() => generateDecisions());

  const stats = useMemo(() => {
    const temps = timeSeriesData.map((d) => d.temperature);
    const humidities = timeSeriesData.map((d) => d.humidity);
    const moistures = timeSeriesData.map((d) => d.soilMoisture);
    const lights = timeSeriesData.map((d) => d.lightLevel);

    return {
      temperature: {
        min: Math.min(...temps).toFixed(1),
        max: Math.max(...temps).toFixed(1),
        avg: (temps.reduce((a, b) => a + b) / temps.length).toFixed(1),
      },
      humidity: {
        min: Math.min(...humidities).toFixed(1),
        max: Math.max(...humidities).toFixed(1),
        avg: (humidities.reduce((a, b) => a + b) / humidities.length).toFixed(1),
      },
      soilMoisture: {
        min: Math.min(...moistures).toFixed(1),
        max: Math.max(...moistures).toFixed(1),
        avg: (moistures.reduce((a, b) => a + b) / moistures.length).toFixed(1),
      },
      lightLevel: {
        min: Math.min(...lights).toFixed(1),
        max: Math.max(...lights).toFixed(1),
        avg: (lights.reduce((a, b) => a + b) / lights.length).toFixed(1),
      },
    };
  }, [timeSeriesData]);

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
            ANALYTICS DASHBOARD
          </h1>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Historical trends • Performance metrics • Decision patterns
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 font-mono font-bold uppercase text-sm transition-all ${
                timeRange === range
                  ? 'bg-cyan-600 text-black shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Temperature', unit: '°C', data: stats.temperature, color: 'cyan' },
            { label: 'Humidity', unit: '%', data: stats.humidity, color: 'pink' },
            { label: 'Soil Moisture', unit: '%', data: stats.soilMoisture, color: 'green' },
            { label: 'Light Level', unit: 'lux', data: stats.lightLevel, color: 'purple' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
              className={`p-4 border-2 ${
                stat.color === 'cyan'
                  ? 'border-cyan-400 glow-cyan'
                  : stat.color === 'pink'
                  ? 'border-pink-500 glow-pink'
                  : stat.color === 'green'
                  ? 'border-green-500'
                  : 'border-purple-500 glow-purple'
              }`}
            >
              <p className="text-xs uppercase font-mono text-gray-500 mb-2">{stat.label}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-600">Min</p>
                  <p className="text-lg font-bold text-cyan-400">{stat.data.min}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Avg</p>
                  <p className="text-lg font-bold text-green-400">{stat.data.avg}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Max</p>
                  <p className="text-lg font-bold text-pink-400">{stat.data.max}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Temperature & Humidity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 border-2 border-cyan-400 glow-cyan"
          >
            <h3 className="font-orbitron text-lg font-bold glow-text-cyan mb-4">
              Temperature & Humidity Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #00ffff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#00ffff"
                  dot={false}
                  name="Temperature (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#ec4899"
                  dot={false}
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Soil Moisture & Light */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 border-2 border-pink-500 glow-pink"
          >
            <h3 className="font-orbitron text-lg font-bold text-pink-400 mb-4">
              Soil Moisture & Light Levels
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ec4899' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="soilMoisture"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                  name="Soil Moisture (%)"
                />
                <Area
                  type="monotone"
                  dataKey="lightLevel"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.3}
                  name="Light Level (lux)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Decision Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 border-2 border-purple-500 glow-purple mb-8"
        >
          <h3 className="font-orbitron text-lg font-bold text-purple-400 mb-4">
            Actuator Activation Frequency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={decisionFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #a855f7' }}
              />
              <Bar dataKey="frequency" fill="#a855f7" name="Activations" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Decisions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 border-2 border-cyan-400 glow-cyan"
        >
          <h3 className="font-orbitron text-lg font-bold glow-text-cyan mb-4">
            Recent System Decisions
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {decisions.slice(0, 10).map((decision, idx) => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                className="p-3 bg-gray-900/50 border border-cyan-500/30 rounded"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-mono text-cyan-300">{decision.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{decision.reason}</p>
                  </div>
                  <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                    {decision.isAutomatic ? 'AUTO' : 'MANUAL'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
