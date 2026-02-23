/**
 * Mock data generators for the greenhouse dashboard prototype
 */

export interface SensorReading {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
  timestamp: Date;
}

export interface Actuator {
  id: string;
  type: 'PUMP' | 'FAN' | 'LIGHT';
  status: 'ON' | 'OFF';
  lastToggled: Date;
}

export interface Decision {
  id: string;
  action: string;
  reason: string;
  actuatorType?: 'PUMP' | 'FAN' | 'LIGHT';
  actuatorAction?: 'ON' | 'OFF';
  isAutomatic: boolean;
  timestamp: Date;
}

export interface Crop {
  id: number;
  name: string;
  scientificName: string;
  tempMin: number;
  tempMax: number;
  humidityMin: number;
  humidityMax: number;
  soilMoistureMin: number;
  soilMoistureMax: number;
  lightRequirement: number;
}

export interface Greenhouse {
  id: string;
  name: string;
  location: string;
  mode: 'AUTO' | 'MANUAL';
  currentCrop?: Crop;
  plantingDate?: Date;
  currentSensors: SensorReading;
  actuators: Actuator[];
}

// Rwanda Crops Database
export const RWANDA_CROPS: Crop[] = [
  {
    id: 1,
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    tempMin: 18,
    tempMax: 28,
    humidityMin: 50,
    humidityMax: 80,
    soilMoistureMin: 40,
    soilMoistureMax: 70,
    lightRequirement: 5000,
  },
  {
    id: 2,
    name: 'Maize',
    scientificName: 'Zea mays',
    tempMin: 16,
    tempMax: 30,
    humidityMin: 45,
    humidityMax: 75,
    soilMoistureMin: 50,
    soilMoistureMax: 80,
    lightRequirement: 6000,
  },
  {
    id: 3,
    name: 'Beans',
    scientificName: 'Phaseolus vulgaris',
    tempMin: 15,
    tempMax: 27,
    humidityMin: 50,
    humidityMax: 75,
    soilMoistureMin: 45,
    soilMoistureMax: 65,
    lightRequirement: 4500,
  },
  {
    id: 4,
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    tempMin: 12,
    tempMax: 24,
    humidityMin: 50,
    humidityMax: 80,
    soilMoistureMin: 60,
    soilMoistureMax: 85,
    lightRequirement: 4000,
  },
  {
    id: 5,
    name: 'Cassava',
    scientificName: 'Manihot esculenta',
    tempMin: 18,
    tempMax: 32,
    humidityMin: 40,
    humidityMax: 70,
    soilMoistureMin: 35,
    soilMoistureMax: 60,
    lightRequirement: 5500,
  },
  {
    id: 6,
    name: 'Banana',
    scientificName: 'Musa spp.',
    tempMin: 18,
    tempMax: 30,
    humidityMin: 60,
    humidityMax: 85,
    soilMoistureMin: 50,
    soilMoistureMax: 75,
    lightRequirement: 5000,
  },
  {
    id: 7,
    name: 'Avocado',
    scientificName: 'Persea americana',
    tempMin: 15,
    tempMax: 28,
    humidityMin: 50,
    humidityMax: 75,
    soilMoistureMin: 40,
    soilMoistureMax: 65,
    lightRequirement: 5500,
  },
  {
    id: 8,
    name: 'Coffee',
    scientificName: 'Coffea arabica',
    tempMin: 15,
    tempMax: 24,
    humidityMin: 60,
    humidityMax: 80,
    soilMoistureMin: 50,
    soilMoistureMax: 70,
    lightRequirement: 4500,
  },
  {
    id: 9,
    name: 'Tea',
    scientificName: 'Camellia sinensis',
    tempMin: 13,
    tempMax: 25,
    humidityMin: 60,
    humidityMax: 85,
    soilMoistureMin: 55,
    soilMoistureMax: 75,
    lightRequirement: 4000,
  },
  {
    id: 10,
    name: 'Citrus',
    scientificName: 'Citrus spp.',
    tempMin: 15,
    tempMax: 28,
    humidityMin: 50,
    humidityMax: 75,
    soilMoistureMin: 45,
    soilMoistureMax: 65,
    lightRequirement: 5500,
  },
];

export function generateSensorReading(
  baseTemp: number = 22,
  baseHumidity: number = 65,
  baseMoisture: number = 55,
  baseLight: number = 4500
): SensorReading {
  return {
    temperature: baseTemp + (Math.random() - 0.5) * 4,
    humidity: Math.max(30, Math.min(95, baseHumidity + (Math.random() - 0.5) * 8)),
    soilMoisture: Math.max(20, Math.min(90, baseMoisture + (Math.random() - 0.5) * 10)),
    lightLevel: baseLight + (Math.random() - 0.5) * 1000,
    timestamp: new Date(),
  };
}

export function generateActuators(): Actuator[] {
  return [
    {
      id: 'pump-1',
      type: 'PUMP',
      status: Math.random() > 0.5 ? 'ON' : 'OFF',
      lastToggled: new Date(Date.now() - Math.random() * 3600000),
    },
    {
      id: 'fan-1',
      type: 'FAN',
      status: Math.random() > 0.5 ? 'ON' : 'OFF',
      lastToggled: new Date(Date.now() - Math.random() * 3600000),
    },
    {
      id: 'light-1',
      type: 'LIGHT',
      status: Math.random() > 0.5 ? 'ON' : 'OFF',
      lastToggled: new Date(Date.now() - Math.random() * 3600000),
    },
  ];
}

export function generateDecisions(): Decision[] {
  const actions = [
    'Activated pump to increase soil moisture',
    'Turned on fan to reduce humidity',
    'Activated grow lights for optimal photosynthesis',
    'Deactivated pump as soil moisture is optimal',
    'Adjusted ventilation based on temperature',
    'Activated cooling system due to high temperature',
    'Manual override: pump turned off',
    'System detected optimal growth conditions',
    'Activated irrigation cycle',
    'Humidity levels normalized',
  ];

  return Array.from({ length: 10 }, (_, i) => ({
    id: `decision-${i}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    reason: 'Automated decision based on crop requirements and sensor data',
    actuatorType: ['PUMP', 'FAN', 'LIGHT'][Math.floor(Math.random() * 3)] as any,
    actuatorAction: Math.random() > 0.5 ? 'ON' : 'OFF',
    isAutomatic: Math.random() > 0.3,
    timestamp: new Date(Date.now() - i * 600000),
  }));
}

export function createMockGreenhouse(id: string, name: string): Greenhouse {
  const crop = RWANDA_CROPS[Math.floor(Math.random() * RWANDA_CROPS.length)];
  return {
    id,
    name,
    location: 'Kigali, Rwanda',
    mode: 'AUTO',
    currentCrop: crop,
    plantingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    currentSensors: generateSensorReading(
      crop.tempMin + (crop.tempMax - crop.tempMin) / 2,
      crop.humidityMin + (crop.humidityMax - crop.humidityMin) / 2,
      crop.soilMoistureMin + (crop.soilMoistureMax - crop.soilMoistureMin) / 2,
      crop.lightRequirement
    ),
    actuators: generateActuators(),
  };
}

export function createMockGreenhouses(): Greenhouse[] {
  return [
    createMockGreenhouse('gh-1', 'Main Greenhouse'),
    createMockGreenhouse('gh-2', 'Secondary Greenhouse'),
    createMockGreenhouse('gh-3', 'Experimental Greenhouse'),
  ];
}

export function calculateGrowthStage(plantingDate: Date, crop: Crop): string {
  const daysSincePlanting = Math.floor((Date.now() - plantingDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSincePlanting < 14) return 'Germination';
  if (daysSincePlanting < 30) return 'Seedling';
  if (daysSincePlanting < 50) return 'Vegetative';
  if (daysSincePlanting < 70) return 'Flowering';
  return 'Fruiting';
}

export function getStatusForSensor(
  value: number,
  min: number,
  max: number
): 'optimal' | 'warning' | 'critical' {
  const range = max - min;
  const threshold = range * 0.1;
  
  if (value < min - threshold || value > max + threshold) {
    return 'critical';
  }
  if (value < min || value > max) {
    return 'warning';
  }
  return 'optimal';
}
