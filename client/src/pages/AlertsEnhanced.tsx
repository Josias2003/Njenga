import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
  aiRecommendation: string;
  zone: string;
}

export default function AlertsEnhanced() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-1',
      title: 'High Humidity Detected',
      message: 'Humidity in Zone A has exceeded 85%. Risk of fungal disease.',
      severity: 'critical',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      aiRecommendation: 'Increase ventilation immediately. Activate exhaust fans.',
      zone: 'Zone A',
    },
    {
      id: 'alert-2',
      title: 'Soil Moisture Low',
      message: 'Soil moisture in Zone B is below optimal range (38%).',
      severity: 'warning',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      aiRecommendation: 'Activate irrigation system for 15 minutes.',
      zone: 'Zone B',
    },
    {
      id: 'alert-3',
      title: 'Temperature Optimal',
      message: 'Zone C temperature is within optimal range.',
      severity: 'info',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: true,
      aiRecommendation: 'Continue monitoring. No action required.',
      zone: 'Zone C',
    },
    {
      id: 'alert-4',
      title: 'Disease Risk Alert',
      message: 'Early Blight risk detected in Zone A (78% confidence).',
      severity: 'critical',
      timestamp: new Date(Date.now() - 45 * 60000),
      read: true,
      aiRecommendation: 'Apply preventive fungicide. Reduce leaf wetness.',
      zone: 'Zone A',
    },
    {
      id: 'alert-5',
      title: 'Light Level Low',
      message: 'Light levels in Zone B are 15% below optimal.',
      severity: 'warning',
      timestamp: new Date(Date.now() - 60 * 60000),
      read: true,
      aiRecommendation: 'Increase supplemental lighting duration by 2 hours.',
      zone: 'Zone B',
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(alerts[0]);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'info'>(
    'all'
  );

  const filteredAlerts = alerts.filter((alert) =>
    filterSeverity === 'all' ? true : alert.severity === filterSeverity
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-900/10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-900/10';
      case 'info':
        return 'border-blue-500 bg-blue-900/10';
      default:
        return 'border-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📌';
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const deleteAlert = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    if (selectedAlert?.id === id) {
      setSelectedAlert(updated[0] || null);
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
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
            ALERTS & NOTIFICATIONS
          </h1>
          <h2 className="font-orbitron text-2xl font-bold glow-text-pink mb-4">
            Real-Time System Monitoring
          </h2>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            Critical alerts • AI recommendations • Notification history
          </p>
        </motion.div>

        {/* Alert Statistics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Alerts', value: alerts.length, color: 'cyan' },
            {
              label: 'Critical',
              value: alerts.filter((a) => a.severity === 'critical').length,
              color: 'red',
            },
            {
              label: 'Warnings',
              value: alerts.filter((a) => a.severity === 'warning').length,
              color: 'yellow',
            },
            {
              label: 'Unread',
              value: alerts.filter((a) => !a.read).length,
              color: 'pink',
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className={`p-4 border-2 ${
                stat.color === 'cyan'
                  ? 'border-cyan-400 glow-cyan'
                  : stat.color === 'red'
                  ? 'border-red-500'
                  : stat.color === 'yellow'
                  ? 'border-yellow-500'
                  : 'border-pink-500 glow-pink'
              } text-center cursor-pointer`}
            >
              <p className="text-xs uppercase font-mono text-gray-500 mb-1">{stat.label}</p>
              <p
                className={`text-3xl font-bold font-orbitron ${
                  stat.color === 'cyan'
                    ? 'glow-text-cyan'
                    : stat.color === 'red'
                    ? 'text-red-400'
                    : stat.color === 'yellow'
                    ? 'text-yellow-400'
                    : 'glow-text-pink'
                }`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alert List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 p-6 border-2 border-cyan-400 glow-cyan"
          >
            <h2 className="font-orbitron text-xl font-bold glow-text-cyan mb-4">Alert Inbox</h2>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {(['all', 'critical', 'warning', 'info'] as const).map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterSeverity(filter)}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded transition-all ${
                    filterSeverity === filter
                      ? 'bg-cyan-600 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>

            {/* Alert Items */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredAlerts.map((alert) => (
                  <motion.button
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => {
                      setSelectedAlert(alert);
                      markAsRead(alert.id);
                    }}
                    className={`w-full text-left p-3 rounded border-2 transition-all ${
                      selectedAlert?.id === alert.id
                        ? 'border-cyan-400 bg-cyan-900/20'
                        : `${getSeverityColor(alert.severity)} hover:border-cyan-400`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                          <p className="font-mono font-bold text-sm truncate">{alert.title}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 truncate">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{timeAgo(alert.timestamp)}</p>
                      </div>
                      {!alert.read && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Alert Details */}
          {selectedAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 p-6 border-2 border-pink-500 glow-pink"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-4xl">{getSeverityIcon(selectedAlert.severity)}</span>
                  <div>
                    <h3 className="font-orbitron text-2xl font-bold glow-text-pink">
                      {selectedAlert.title}
                    </h3>
                    <p className={`text-sm font-mono font-bold mt-1 ${getSeverityTextColor(selectedAlert.severity)}`}>
                      {selectedAlert.severity.toUpperCase()} SEVERITY
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteAlert(selectedAlert.id)}
                  className="px-3 py-2 bg-red-600 text-white font-mono text-xs font-bold uppercase rounded hover:bg-red-500"
                >
                  Dismiss
                </motion.button>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-4">
                <p className="text-xs uppercase font-mono text-gray-500 mb-2">Alert Details</p>
                <p className="text-gray-300 text-sm mb-3">{selectedAlert.message}</p>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div className="bg-gray-900/50 border border-gray-700 rounded p-2">
                    <p className="text-gray-500">Zone</p>
                    <p className="font-mono font-bold text-cyan-400">{selectedAlert.zone}</p>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded p-2">
                    <p className="text-gray-500">Timestamp</p>
                    <p className="font-mono font-bold text-cyan-400">
                      {selectedAlert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-purple-900/20 border-2 border-purple-500 rounded p-4">
                <p className="text-xs uppercase font-mono font-bold text-purple-400 mb-2">
                  AI RECOMMENDATION
                </p>
                <p className="text-sm text-gray-300 mb-3">{selectedAlert.aiRecommendation}</p>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-3 py-2 bg-purple-600 text-white font-mono text-xs font-bold uppercase rounded hover:bg-purple-500"
                  >
                    Apply Action
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-3 py-2 border-2 border-purple-500 text-purple-400 font-mono text-xs font-bold uppercase rounded hover:bg-purple-900/20"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-6 border-2 border-green-500 overflow-hidden"
        >
          <div className="hud-corner-tl" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-tr" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-bl" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-br" style={{ borderColor: '#22C55E' }}></div>

          <div className="relative z-10">
            <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: '#22C55E' }}>
              Notification Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Critical Alerts', enabled: true },
                { label: 'Warning Alerts', enabled: true },
                { label: 'Info Alerts', enabled: false },
                { label: 'Email Notifications', enabled: true },
                { label: 'SMS Notifications', enabled: false },
                { label: 'Push Notifications', enabled: true },
              ].map((setting) => (
                <motion.div
                  key={setting.label}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-700 rounded cursor-pointer hover:border-green-500 transition-all"
                >
                  <span className="font-mono text-sm">{setting.label}</span>
                  <div
                    className={`w-10 h-6 rounded-full transition-all ${
                      setting.enabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-all ${
                        setting.enabled ? 'translate-x-4' : 'translate-x-0'
                      } mt-0.5 ml-0.5`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
