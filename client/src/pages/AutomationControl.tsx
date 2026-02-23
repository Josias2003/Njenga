import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wind, Droplets, Thermometer, Edit2, Plus, Power } from "lucide-react";

const mockAutomationRules = [
  {
    id: 1,
    name: "Temperature Control",
    description: "Automatically control ventilation fan",
    trigger: "temperature",
    condition: "greaterThan",
    triggerValue: 30,
    triggerUnit: "°C",
    action: "Fan ON",
    isActive: true,
    lastTriggered: "2 hours ago",
    icon: Thermometer,
    color: "text-red-600",
  },
  {
    id: 2,
    name: "Irrigation Control",
    description: "Automatically trigger irrigation system",
    trigger: "soilMoisture",
    condition: "lessThan",
    triggerValue: 40,
    triggerUnit: "%",
    action: "Irrigation ON",
    isActive: true,
    lastTriggered: "30 minutes ago",
    icon: Droplets,
    color: "text-blue-600",
  },
  {
    id: 3,
    name: "Humidity Control",
    description: "Automatically control humidifier",
    trigger: "humidity",
    condition: "lessThan",
    triggerValue: 50,
    triggerUnit: "%",
    action: "Humidifier ON",
    isActive: false,
    lastTriggered: "Never",
    icon: Wind,
    color: "text-cyan-600",
  },
];

const mockDevices = [
  { id: 1, name: "Ventilation Fan", status: "off", lastAction: "Manual override - OFF", icon: Wind },
  { id: 2, name: "Irrigation Pump", status: "on", lastAction: "Automation triggered", icon: Droplets },
  { id: 3, name: "Humidifier", status: "off", lastAction: "Manual override - OFF", icon: Wind },
];

function AutomationRuleCard({
  rule,
}: {
  rule: (typeof mockAutomationRules)[number];
}) {
  const Icon = rule.icon;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Icon className={`w-5 h-5 ${rule.color}`} />
            </div>
            <div>
              <CardTitle className="text-base">{rule.name}</CardTitle>
              <CardDescription className="text-xs">{rule.description}</CardDescription>
            </div>
          </div>
          <Switch checked={rule.isActive} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Rule Logic */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
          <p className="text-sm font-mono text-foreground">
            <span className="font-semibold capitalize">{rule.trigger}</span>
            {" "}
            <span className="text-muted-foreground">
              {rule.condition === "greaterThan" && ">"}
              {rule.condition === "lessThan" && "<"}
              {rule.condition === "equals" && "="}
            </span>
            {" "}
            <span className="font-semibold">{rule.triggerValue}{rule.triggerUnit}</span>
            {" → "}
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {rule.action}
            </span>
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-muted-foreground">Last triggered</p>
            <p className="font-medium text-foreground">{rule.lastTriggered}</p>
          </div>
          <Badge variant={rule.isActive ? "default" : "secondary"}>
            {rule.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Edit2 className="w-3 h-3 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Automation Rule</DialogTitle>
                <DialogDescription>
                  Modify the trigger conditions and actions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Rule editing interface would go here
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" className="flex-1">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DeviceControlCard({
  device,
}: {
  device: (typeof mockDevices)[number];
}) {
  const Icon = device.icon;
  const [isOn, setIsOn] = useState(device.status === "on");

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <CardTitle className="text-base">{device.name}</CardTitle>
              <CardDescription className="text-xs">{device.lastAction}</CardDescription>
            </div>
          </div>
          <Switch checked={isOn} onCheckedChange={setIsOn} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant={isOn ? "default" : "secondary"}>
            {isOn ? "ON" : "OFF"}
          </Badge>
          <p className="text-xs text-muted-foreground">Manual Control</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AutomationControl() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Automation Control</h2>
        <p className="text-muted-foreground">
          Configure automation rules and manually control greenhouse devices
        </p>
      </div>

      {/* Manual Device Control */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Manual Device Control</h3>
          <Badge variant="outline">Override Mode</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDevices.map((device) => (
            <DeviceControlCard key={device.id} device={device} />
          ))}
        </div>
      </div>

      {/* Automation Rules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Automation Rules</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Automation Rule</DialogTitle>
                <DialogDescription>
                  Set up a new conditional automation rule
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Rule creation form would go here
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockAutomationRules.map((rule) => (
            <AutomationRuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      </div>

      {/* Rule Logic Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>How Automation Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/20">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Monitor Sensors</p>
                <p className="text-sm text-muted-foreground">
                  System continuously monitors sensor values in real-time
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-100 dark:bg-green-900/20">
                  <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Check Conditions</p>
                <p className="text-sm text-muted-foreground">
                  When sensor value matches the trigger condition, action is triggered
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-100 dark:bg-purple-900/20">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">3</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Execute Action</p>
                <p className="text-sm text-muted-foreground">
                  Device is automatically controlled (e.g., fan turns on)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-100 dark:bg-orange-900/20">
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">4</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">Manual Override</p>
                <p className="text-sm text-muted-foreground">
                  You can manually control devices at any time, overriding automation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Example Automation Scenarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="font-mono text-sm text-foreground">
              <span className="font-semibold">IF</span> temperature <span className="text-red-600">&gt; 30°C</span>
              {" "}
              <span className="font-semibold">THEN</span> Fan <span className="text-green-600">ON</span>
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="font-mono text-sm text-foreground">
              <span className="font-semibold">IF</span> soil moisture <span className="text-blue-600">&lt; 40%</span>
              {" "}
              <span className="font-semibold">THEN</span> Irrigation <span className="text-green-600">ON</span>
            </p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="font-mono text-sm text-foreground">
              <span className="font-semibold">IF</span> humidity <span className="text-cyan-600">&lt; 50%</span>
              {" "}
              <span className="font-semibold">THEN</span> Humidifier <span className="text-green-600">ON</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
