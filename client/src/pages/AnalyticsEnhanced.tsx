import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CropHealth {
  score: number;
  trend: 'up' | 'down' | 'stable';
  factors: { name: string; value: number }[];
}

interface DiseaseRisk {
  name: string;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  recommendation: string;
}

interface YieldPrediction {
  predicted: number;
  unit: string;
  confidence: number;
  trend: number;
}

export default function AnalyticsEnhanced() {
  const [cropHealth] = useState<CropHealth>({
    score: 85,
    trend: 'up',
    factors: [
      { name: 'Leaf Color', value: 90 },
      { name: 'Stem Strength', value: 82 },
      { name: 'Growth Rate', value: 78 },
      { name: 'Disease Resistance', value: 85 },
    ],
  });

  const [diseaseRisks] = useState<DiseaseRisk[]>([
    {
      name: 'Early Blight',
      risk: 'medium',
      confidence: 78,
      recommendation: 'Increase ventilation and reduce leaf wetness',
    },
    {
      name: 'Powdery Mildew',
      risk: 'low',
      confidence: 45,
      recommendation: 'Monitor humidity levels closely',
    },
    {
      name: 'Leaf Spot',
      risk: 'low',
      confidence: 32,
      recommendation: 'Maintain proper spacing between plants',
    },
  ]);

  const [yieldPrediction] = useState<YieldPrediction>({
    predicted: 2.3,
    unit: 'tons',
    confidence: 85,
    trend: 12,
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'border-green-500 glow-green';
      case 'medium':
        return 'border-yellow-500';
      case 'high':
        return 'border-red-500';
      default:
        return 'border-cyan-400 glow-cyan';
    }
  };

  const getRiskTextColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-cyan-400';
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
            AI CROP ANALYTICS
          </h1>
          <h2 className="font-orbitron text-2xl font-bold glow-text-pink mb-4">
            Intelligent Crop Intelligence System
          </h2>
          <div className="neon-line mb-4"></div>
          <p className="text-gray-400 font-mono text-sm">
            AI-powered health assessment • Disease risk detection • Yield prediction
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Crop Health Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative p-6 border-2 border-cyan-400 glow-cyan overflow-hidden"
          >
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="relative z-10">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-orbitron font-bold text-sm uppercase tracking-wider">
                     AI Recommendation
                  </span>
                  <span className="text-xs text-cyan-400 font-mono">ACTIVE</span>
                </div>
                <h3 className="font-orbitron text-2xl font-bold glow-text-cyan">Crop Health</h3>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#1f2937"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#00FFFF"
                      strokeWidth="8"
                      strokeDasharray={`${(cropHealth.score / 100) * 339.29} 339.29`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold glow-text-cyan">{cropHealth.score}%</p>
                    <p className="text-xs text-gray-400">Excellent</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {cropHealth.factors.map((factor) => (
                  <div key={factor.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">{factor.name}</span>
                      <span className="text-cyan-400">{factor.value}%</span>
                    </div>
                    <div className="w-full bg-gray-900 border border-gray-700 h-1.5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                        style={{ width: `${factor.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Disease Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="relative p-6 border-2 border-pink-500 overflow-hidden">
              <div className="hud-corner-tl" style={{ borderColor: '#EC4899' }}></div>
              <div className="hud-corner-tr" style={{ borderColor: '#EC4899' }}></div>
              <div className="hud-corner-bl" style={{ borderColor: '#EC4899' }}></div>
              <div className="hud-corner-br" style={{ borderColor: '#EC4899' }}></div>

              <div className="relative z-10">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-orbitron font-bold text-sm uppercase tracking-wider">
                       AI Recommendation
                    </span>
                    <span className="text-xs text-pink-400 font-mono">ALERT</span>
                  </div>
                  <h3 className="font-orbitron text-xl font-bold" style={{ color: '#EC4899' }}>
                    Disease Risk Assessment
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {diseaseRisks.map((disease) => (
                    <motion.div
                      key={disease.name}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 border-2 ${getRiskColor(disease.risk)} rounded`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold uppercase">
                          {disease.name}
                        </span>
                        <span className={`text-xs font-bold uppercase ${getRiskTextColor(disease.risk)}`}>
                          {disease.risk}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{disease.recommendation}</p>
                      <div className="text-xs text-gray-500">
                        Confidence: {disease.confidence}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Yield Prediction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative p-6 border-2 border-purple-500 overflow-hidden mb-8"
        >
          <div className="hud-corner-tl" style={{ borderColor: '#A855F7' }}></div>
          <div className="hud-corner-tr" style={{ borderColor: '#A855F7' }}></div>
          <div className="hud-corner-bl" style={{ borderColor: '#A855F7' }}></div>
          <div className="hud-corner-br" style={{ borderColor: '#A855F7' }}></div>

          <div className="relative z-10">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-orbitron font-bold text-sm uppercase tracking-wider">
                   AI Recommendation
                </span>
                <span className="text-xs text-purple-400 font-mono">FORECAST</span>
              </div>
              <h3 className="font-orbitron text-2xl font-bold" style={{ color: '#A855F7' }}>
                Yield Prediction
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-gray-400 text-sm mb-4">
                  Based on current growth trajectory and environmental conditions, the AI predicts
                  optimal yield at harvest time.
                </p>
                <div className="bg-gray-900 border border-gray-700 rounded p-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold" style={{ color: '#A855F7' }}>
                      {yieldPrediction.predicted}
                    </span>
                    <span className="text-2xl text-gray-400">{yieldPrediction.unit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Confidence:</span>
                    <span className="text-sm font-bold text-purple-400">
                      {yieldPrediction.confidence}%
                    </span>
                    <span className="text-sm text-green-400 ml-auto">
                      +{yieldPrediction.trend}% vs target
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded p-4">
                <h4 className="font-mono text-xs font-bold uppercase mb-3 text-purple-400">
                  Recommendations
                </h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li>✓ Maintain current watering schedule</li>
                  <li>✓ Monitor soil nutrients weekly</li>
                  <li>✓ Increase light exposure gradually</li>
                  <li>✓ Check for pest activity daily</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-6 border-2 border-green-500 overflow-hidden"
        >
          <div className="hud-corner-tl" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-tr" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-bl" style={{ borderColor: '#22C55E' }}></div>
          <div className="hud-corner-br" style={{ borderColor: '#22C55E' }}></div>

          <div className="relative z-10">
            <h3 className="font-orbitron text-lg font-bold mb-4" style={{ color: '#22C55E' }}>
               AI INSIGHTS & RECOMMENDATIONS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs font-mono font-bold text-green-400 mb-2">OPTIMAL CONDITION</p>
                <p className="text-sm text-gray-300">
                  Current environmental parameters are within optimal range. Continue monitoring
                  temperature and humidity levels.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs font-mono font-bold text-yellow-400 mb-2">ACTION REQUIRED</p>
                <p className="text-sm text-gray-300">
                  Increase ventilation to reduce humidity and prevent fungal diseases. Adjust fan
                  settings.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs font-mono font-bold text-cyan-400 mb-2">GROWTH ANALYSIS</p>
                <p className="text-sm text-gray-300">
                  Plant height and leaf development are progressing ahead of schedule. Expected
                  harvest 3-5 days earlier.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded p-3">
                <p className="text-xs font-mono font-bold text-purple-400 mb-2">RESOURCE USAGE</p>
                <p className="text-sm text-gray-300">
                  Water and nutrient consumption is 8% below predicted levels. Efficiency is
                  excellent.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-xs font-mono"
        >
          <p>AI ANALYTICS SYSTEM v1.0 • Real-time analysis active • All predictions based on current data</p>
        </motion.div>
      </div>
    </div>
  );
}
