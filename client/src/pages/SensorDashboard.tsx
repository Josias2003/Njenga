import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Thermometer, Droplets, Sun, Wind, Zap } from "lucide-react";

// Mock sensor data
const mockSensorData = {
  temperature: {
    current: 28.5,
    unit: "°C",
    status: "normal",
    min: 15,
    max: 35,
    optimal: "24-28°C",
    icon: Thermometer,
    color: "text-red-600",
  },
  humidity: {
    current: 72,
    unit: "%",
    status: "normal",
    min: 40,
    max: 95,
    optimal: "60-80%",
    icon: Droplets,
    color: "text-blue-600",
  },
  soilMoisture: {
    current: 55,
    unit: "%",
    status: "warning",
    min: 30,
    max: 80,
    optimal: "60-75%",
    icon: Droplets,
    color: "text-green-600",
  },
  light: {
    current: 850,
    unit: "lux",
    status: "normal",
    min: 500,
    max: 2000,
    optimal: "800-1500 lux",
    icon: Sun,
    color: "text-yellow-600",
  },
  co2: {
    current: 420,
    unit: "ppm",
    status: "normal",
    min: 300,
    max: 1000,
    optimal: "400-600 ppm",
    icon: Wind,
    color: "text-gray-600",
  },
};

// Historical data for charts
const historicalData = [
  { time: "00:00", temperature: 22, humidity: 65, soilMoisture: 58 },
  { time: "04:00", temperature: 20, humidity: 70, soilMoisture: 62 },
  { time: "08:00", temperature: 24, humidity: 68, soilMoisture: 60 },
  { time: "12:00", temperature: 28, humidity: 72, soilMoisture: 55 },
  { time: "16:00", temperature: 30, humidity: 70, soilMoisture: 52 },
  { time: "20:00", temperature: 26, humidity: 75, soilMoisture: 58 },
  { time: "24:00", temperature: 23, humidity: 72, soilMoisture: 61 },
];

function StatusBadge({ status }: { status: string }) {
  const statusClass = {
    normal: "status-normal",
    warning: "status-warning",
    critical: "status-critical",
  }[status] || "status-normal";

  return (
    <span className={`status-badge ${statusClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function SensorCard({
  sensor,
  data,
}: {
  sensor: string;
  data: (typeof mockSensorData)[keyof typeof mockSensorData];
}) {
  const Icon = data.icon;

  return (
    <Card className="sensor-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <Icon className={`w-6 h-6 ${data.color}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground capitalize">{sensor}</p>
            <p className="text-xs text-muted-foreground">Zone A</p>
          </div>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-foreground">
          {data.current}
          <span className="text-lg text-muted-foreground ml-1">{data.unit}</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded p-2">
          <p className="text-muted-foreground">Min</p>
          <p className="font-semibold">{data.min}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded p-2">
          <p className="text-muted-foreground">Optimal</p>
          <p className="font-semibold">{data.optimal}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded p-2">
          <p className="text-muted-foreground">Max</p>
          <p className="font-semibold">{data.max}</p>
        </div>
      </div>
    </Card>
  );
}

export default function SensorDashboard() {
  const [selectedZone, setSelectedZone] = useState("Zone A");

  return (
    <div className="space-y-6">
      {/* Zone Selector */}
      <div className="flex gap-2">
        {["Zone A", "Zone B", "Zone C"].map((zone) => (
          <Button
            key={zone}
            variant={selectedZone === zone ? "default" : "outline"}
            onClick={() => setSelectedZone(zone)}
          >
            {zone}
          </Button>
        ))}
      </div>

      {/* Current Readings */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Current Readings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(mockSensorData).map(([key, data]) => (
            <SensorCard key={key} sensor={key} data={data} />
          ))}
        </div>
      </div>

      {/* Historical Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
          <CardDescription>Last 24 hours of sensor readings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="soilMoisture">Soil Moisture</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorTemp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="humidity" className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="humidity"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorHumidity)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="soilMoisture" className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="soilMoisture"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorMoisture)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Sensor readings outside optimal range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-200">
                  Soil Moisture Low
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Zone A moisture at 55% (optimal: 60-75%)
                </p>
              </div>
              <span className="status-badge status-warning">Warning</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
