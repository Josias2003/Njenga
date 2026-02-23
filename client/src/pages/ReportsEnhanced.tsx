import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ReportsEnhanced() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data for yield report
  const yieldData = [
    { date: 'Week 1', yield: 45, target: 50 },
    { date: 'Week 2', yield: 52, target: 50 },
    { date: 'Week 3', yield: 48, target: 50 },
    { date: 'Week 4', yield: 58, target: 50 },
  ];

  // Mock data for water usage
  const waterData = [
    { date: 'Mon', usage: 120, optimal: 100 },
    { date: 'Tue', usage: 115, optimal: 100 },
    { date: 'Wed', usage: 95, optimal: 100 },
    { date: 'Thu', usage: 110, optimal: 100 },
    { date: 'Fri', usage: 105, optimal: 100 },
    { date: 'Sat', usage: 130, optimal: 100 },
    { date: 'Sun', usage: 125, optimal: 100 },
  ];

  // Mock data for productivity
  const productivityData = [
    { name: 'Zone A', value: 85, color: '#00FFFF' },
    { name: 'Zone B', value: 92, color: '#EC4899' },
    { name: 'Zone C', value: 78, color: '#A855F7' },
  ];

  // KPI Cards
  const kpis = [
    {
      label: 'Total Yield',
      value: '203 kg',
      change: '+12%',
      trend: 'up',
      color: 'green',
    },
    {
      label: 'Water Efficiency',
      value: '94%',
      change: '+5%',
      trend: 'up',
      color: 'cyan',
    },
    {
      label: 'Crop Health Avg',
      value: '85%',
      change: '-2%',
      trend: 'down',
      color: 'pink',
    },
    {
      label: 'System Uptime',
      value: '99.8%',
      change: '+0.1%',
      trend: 'up',
      color: 'purple',
    },
  ];

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
            REPORTS & ANALYTICS
          </h1>
          <h2 className="font-orbitron text-2xl font-bold glow-text-pink mb-4">
            Performance Metrics & KPI Dashboard
          </h2>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Yield reports • Water usage tracking • Productivity analysis • Export data
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          {(['week', 'month', 'year'] as const).map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 font-mono font-bold uppercase text-sm transition-all ${
                timeRange === range
                  ? 'bg-cyan-600 text-black shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpis.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
              className={`p-4 border-2 ${
                kpi.color === 'green'
                  ? 'border-green-500'
                  : kpi.color === 'cyan'
                  ? 'border-cyan-400 glow-cyan'
                  : kpi.color === 'pink'
                  ? 'border-pink-500 glow-pink'
                  : 'border-purple-500 glow-purple'
              }`}
            >
              <p className="text-xs uppercase font-mono text-gray-500 mb-2">{kpi.label}</p>
              <p
                className={`text-3xl font-bold font-orbitron mb-2 ${
                  kpi.color === 'green'
                    ? 'text-green-400'
                    : kpi.color === 'cyan'
                    ? 'glow-text-cyan'
                    : kpi.color === 'pink'
                    ? 'glow-text-pink'
                    : 'text-purple-400'
                }`}
              >
                {kpi.value}
              </p>
              <div
                className={`text-xs font-bold ${
                  kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Yield Report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 border-2 border-cyan-400 glow-cyan"
          >
            <h3 className="font-orbitron text-lg font-bold glow-text-cyan mb-4">
              Yield Report
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #00ffff' }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="yield"
                  stroke="#00ffff"
                  strokeWidth={2}
                  dot={{ fill: '#00ffff', r: 4 }}
                  name="Actual Yield (kg)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#666"
                  strokeDasharray="5 5"
                  name="Target (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-3 font-mono">
              📊 Current yield is 4% above target. Excellent performance.
            </p>
          </motion.div>

          {/* Water Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 border-2 border-pink-500 glow-pink"
          >
            <h3 className="font-orbitron text-lg font-bold text-pink-400 mb-4">
              Water Usage Tracking
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ec4899' }} />
                <Legend />
                <Bar dataKey="usage" fill="#ec4899" name="Water Used (L)" />
                <Bar dataKey="optimal" fill="#666" name="Optimal (L)" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-3 font-mono">
              💧 Water efficiency: 94%. 6% less usage than optimal baseline.
            </p>
          </motion.div>
        </div>

        {/* Productivity & Export */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Productivity by Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 border-2 border-purple-500 glow-purple"
          >
            <h3 className="font-orbitron text-lg font-bold text-purple-400 mb-4">
              Productivity by Zone
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Export & Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2 p-6 border-2 border-green-500 overflow-hidden"
          >
            <div className="hud-corner-tl" style={{ borderColor: '#22C55E' }}></div>
            <div className="hud-corner-tr" style={{ borderColor: '#22C55E' }}></div>
            <div className="hud-corner-bl" style={{ borderColor: '#22C55E' }}></div>
            <div className="hud-corner-br" style={{ borderColor: '#22C55E' }}></div>

            <div className="relative z-10">
              <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: '#22C55E' }}>
                Export Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { format: 'PDF Report', icon: '📄' },
                  { format: 'Excel Data', icon: '📊' },
                  { format: 'CSV Export', icon: '📋' },
                  { format: 'JSON Data', icon: '⚙️' },
                ].map((item) => (
                  <motion.button
                    key={item.format}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-900/50 border border-gray-700 rounded hover:border-green-500 transition-all text-left"
                  >
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="font-mono text-sm font-bold text-green-400">{item.format}</p>
                  </motion.button>
                ))}
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs text-gray-500 font-mono mb-2">LAST EXPORTED</p>
                <p className="text-sm text-gray-300">2025-01-27 at 10:45 AM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="p-6 border-2 border-cyan-400 glow-cyan"
        >
          <h3 className="font-orbitron text-lg font-bold glow-text-cyan mb-4">
            Monthly Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { metric: 'Avg Temperature', value: '24.5°C', unit: 'Optimal' },
              { metric: 'Avg Humidity', value: '68%', unit: 'Good' },
              { metric: 'Total Water Used', value: '3,240 L', unit: 'Efficient' },
              { metric: 'Avg Light Level', value: '5,200 lux', unit: 'Sufficient' },
            ].map((item) => (
              <div key={item.metric} className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs text-gray-500 font-mono mb-1">{item.metric}</p>
                <p className="text-lg font-bold text-cyan-400 mb-1">{item.value}</p>
                <p className="text-xs text-green-400 font-mono">{item.unit}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
