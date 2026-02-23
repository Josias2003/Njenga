import { motion } from 'framer-motion';
import { Crop } from '@/lib/mockData';
import { calculateGrowthStage } from '@/lib/mockData';

interface CropInfoCardProps {
  crop: Crop;
  plantingDate: Date;
}

export function CropInfoCard({ crop, plantingDate }: CropInfoCardProps) {
  const growthStage = calculateGrowthStage(plantingDate, crop);
  const daysSincePlanting = Math.floor(
    (Date.now() - plantingDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const stageColors = {
    Germination: 'text-blue-400',
    Seedling: 'text-cyan-400',
    Vegetative: 'text-green-400',
    Flowering: 'text-pink-400',
    Fruiting: 'text-orange-400',
  };

  const stageGlows = {
    Germination: 'glow-cyan',
    Seedling: 'glow-cyan',
    Vegetative: 'glow-purple',
    Flowering: 'glow-pink',
    Fruiting: 'glow-pink',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative p-6 border-2 border-pink-500 ${stageGlows[growthStage as keyof typeof stageGlows]} overflow-hidden`}
    >
      {/* HUD Corners */}
      <div className="hud-corner-tl"></div>
      <div className="hud-corner-tr"></div>
      <div className="hud-corner-bl"></div>
      <div className="hud-corner-br"></div>

      <div className="relative z-10">
        {/* Title */}
        <div className="mb-4">
          <h3 className="font-orbitron text-2xl font-bold glow-text-pink mb-1">
            {crop.name}
          </h3>
          <p className="text-sm text-gray-400 italic">{crop.scientificName}</p>
        </div>

        {/* Divider */}
        <div className="neon-line-pink mb-4"></div>

        {/* Growth Stage */}
        <div className="mb-4">
          <p className="text-xs uppercase font-mono text-gray-500 mb-2">Growth Stage</p>
          <motion.div
            key={growthStage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-xl font-bold font-orbitron ${stageColors[growthStage as keyof typeof stageColors]}`}
          >
            {growthStage}
          </motion.div>
        </div>

        {/* Days Since Planting */}
        <div className="mb-4">
          <p className="text-xs uppercase font-mono text-gray-500 mb-2">Days Since Planting</p>
          <motion.div
            key={daysSincePlanting}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold font-orbitron glow-text-cyan"
          >
            {daysSincePlanting} days
          </motion.div>
        </div>

        {/* Optimal Conditions */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-700">
          <div>
            <p className="text-xs uppercase font-mono text-gray-500 mb-1">Temp Range</p>
            <p className="text-sm font-mono text-cyan-400">
              {crop.tempMin}°C - {crop.tempMax}°C
            </p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-gray-500 mb-1">Humidity</p>
            <p className="text-sm font-mono text-cyan-400">
              {crop.humidityMin}% - {crop.humidityMax}%
            </p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-gray-500 mb-1">Soil Moisture</p>
            <p className="text-sm font-mono text-cyan-400">
              {crop.soilMoistureMin}% - {crop.soilMoistureMax}%
            </p>
          </div>
          <div>
            <p className="text-xs uppercase font-mono text-gray-500 mb-1">Light</p>
            <p className="text-sm font-mono text-cyan-400">
              {crop.lightRequirement} lux
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
