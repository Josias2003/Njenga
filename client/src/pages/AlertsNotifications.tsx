import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle2, Clock, Trash2, Bell } from "lucide-react";

const mockAlerts = [
  {
    id: 1,
    title: "Soil Moisture Low",
    description: "Zone A soil moisture dropped below 50% threshold",
    severity: "warning",
    type: "sensor",
    timestamp: new Date(Date.now() - 3600000),
    isRead: false,
    zone: "Zone A",
  },
  {
    id: 2,
    title: "Disease Risk Detected",
    description: "Early Blight detected in Zone A with medium confidence (78%)",
    severity: "critical",
    type: "ai",
    timestamp: new Date(Date.now() - 7200000),
    isRead: false,
    zone: "Zone A",
  },
  {
    id: 3,
    title: "Irrigation Activated",
    description: "Automatic irrigation triggered in Zone A due to low soil moisture",
    severity: "warning",
    type: "automation",
    timestamp: new Date(Date.now() - 86400000),
    isRead: true,
    zone: "Zone A",
  },
  {
    id: 4,
    title: "Temperature Warning",
    description: "Temperature in Zone B exceeded 32°C",
    severity: "warning",
    type: "sensor",
    timestamp: new Date(Date.now() - 172800000),
    isRead: true,
    zone: "Zone B",
  },
  {
    id: 5,
    title: "System Maintenance",
    description: "Scheduled maintenance completed successfully",
    severity: "warning",
    type: "system",
    timestamp: new Date(Date.now() - 259200000),
    isRead: true,
    zone: "System",
  },
];

const notificationSettings = [
  {
    id: 1,
    name: "Critical Alerts",
    description: "Receive notifications for critical system alerts",
    enabled: true,
    channels: ["email", "sms", "push"],
  },
  {
    id: 2,
    name: "Warning Alerts",
    description: "Receive notifications for warning-level alerts",
    enabled: true,
    channels: ["email", "push"],
  },
  {
    id: 3,
    name: "AI Recommendations",
    description: "Receive AI-generated crop recommendations",
    enabled: true,
    channels: ["email", "push"],
  },
  {
    id: 4,
    name: "Automation Triggers",
    description: "Receive notifications when automation rules are triggered",
    enabled: false,
    channels: ["email"],
  },
  {
    id: 5,
    name: "Daily Summary",
    description: "Receive daily summary of greenhouse status",
    enabled: true,
    channels: ["email"],
  },
];

function AlertCard({ alert }: { alert: (typeof mockAlerts)[number] }) {
  const severityStyles = {
    critical: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
  };

  const severityBadge = {
    critical: "status-critical",
    warning: "status-warning",
  };

  const Icon = alert.severity === "critical" ? AlertCircle : Clock;
  const baseClass = alert.isRead
    ? `opacity-60 ${severityStyles[alert.severity as keyof typeof severityStyles]}`
    : `ring-1 ring-offset-1 ring-primary ${severityStyles[alert.severity as keyof typeof severityStyles]}`;

  return (
    <div className={`p-4 border rounded-lg transition-all ${baseClass}`}>
      <div className="flex items-start gap-4">
        <Icon
          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
            alert.severity === "critical" ? "text-red-600" : "text-yellow-600"
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-foreground">{alert.title}</p>
            <Badge className={severityBadge[alert.severity as keyof typeof severityBadge]}>
              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex gap-3">
              <span>{alert.zone}</span>
              <span>•</span>
              <span>{alert.timestamp.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              {!alert.isRead && (
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  Mark as read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlertsNotifications() {
  const unreadAlerts = mockAlerts.filter((a) => !a.isRead);
  const [notificationPreferences, setNotificationPreferences] = useState(notificationSettings);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Alerts & Notifications</h2>
        <p className="text-muted-foreground">
          Manage your alerts and notification preferences
        </p>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="alerts">
            Alerts
            {unreadAlerts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{mockAlerts.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Unread</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">{unreadAlerts.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Critical</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  {mockAlerts.filter((a) => a.severity === "critical").length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Recent Alerts</h3>
              <Button variant="outline" size="sm">
                Clear All
              </Button>
            </div>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which alerts and notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationPreferences.map((pref) => (
                <div
                  key={pref.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{pref.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{pref.description}</p>
                    <div className="flex gap-2">
                      {pref.channels.map((channel) => (
                        <Badge key={channel} variant="secondary" className="text-xs">
                          {channel.charAt(0).toUpperCase() + channel.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Switch
                    checked={pref.enabled}
                    onCheckedChange={(checked) => {
                      setNotificationPreferences(
                        notificationPreferences.map((p) =>
                          p.id === pref.id ? { ...p, enabled: checked } : p
                        )
                      );
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">user@example.com</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">+254 7XX XXX XXX</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Browser notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Alert Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
              <CardDescription>
                Customize when alerts are triggered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Temperature Alert</label>
                <p className="text-sm text-muted-foreground">Alert when temperature exceeds 32°C</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Humidity Alert</label>
                <p className="text-sm text-muted-foreground">Alert when humidity falls below 40%</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Soil Moisture Alert</label>
                <p className="text-sm text-muted-foreground">Alert when soil moisture drops below 40%</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
