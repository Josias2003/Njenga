import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Droplets, Zap } from "lucide-react";

const yieldData = [
  { month: "January", yield: 2.1, target: 2.5 },
  { month: "February", yield: 2.3, target: 2.5 },
  { month: "March", yield: 2.8, target: 2.5 },
  { month: "April", yield: 3.1, target: 2.5 },
  { month: "May", yield: 2.9, target: 2.5 },
  { month: "June", yield: 3.2, target: 2.5 },
];

const waterUsageData = [
  { week: "Week 1", usage: 450, target: 500 },
  { week: "Week 2", usage: 480, target: 500 },
  { week: "Week 3", usage: 420, target: 500 },
  { week: "Week 4", usage: 510, target: 500 },
];

const productivityData = [
  { name: "Zone A", value: 35, fill: "#10b981" },
  { name: "Zone B", value: 30, fill: "#3b82f6" },
  { name: "Zone C", value: 35, fill: "#f59e0b" },
];

const kpiData = [
  {
    title: "Total Yield",
    value: "15.4 tons",
    change: "+12%",
    period: "Last 6 months",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Water Efficiency",
    value: "92%",
    change: "+5%",
    period: "vs target",
    icon: Droplets,
    color: "text-blue-600",
  },
  {
    title: "Energy Usage",
    value: "1,240 kWh",
    change: "-8%",
    period: "Last month",
    icon: Zap,
    color: "text-yellow-600",
  },
  {
    title: "Crop Health",
    value: "85%",
    change: "+3%",
    period: "Average score",
    icon: TrendingUp,
    color: "text-purple-600",
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive reports on yield, water usage, and productivity
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-semibold">{kpi.change}</span> {kpi.period}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="yield" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="yield">Yield Report</TabsTrigger>
          <TabsTrigger value="water">Water Usage</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
        </TabsList>

        <TabsContent value="yield" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yield Report</CardTitle>
              <CardDescription>
                Monthly yield production vs target (tons)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yield" fill="#10b981" name="Actual Yield" />
                  <Bar dataKey="target" fill="#d1d5db" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">15.4 tons</p>
                <p className="text-xs text-green-600 mt-1">+12% vs last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2.57 tons</p>
                <p className="text-xs text-muted-foreground mt-1">Per month average</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Target Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">103%</p>
                <p className="text-xs text-green-600 mt-1">Above target</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Yield Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20">
                    <span className="text-green-600 dark:text-green-400 text-sm font-semibold">✓</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Exceeding Targets</p>
                  <p className="text-sm text-muted-foreground">Current yield is 3% above monthly targets</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">→</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consistent Growth</p>
                  <p className="text-sm text-muted-foreground">Yield has been increasing month-over-month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Usage Report</CardTitle>
              <CardDescription>
                Weekly water consumption vs target (liters)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={waterUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="#3b82f6"
                    name="Actual Usage"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#d1d5db"
                    name="Target"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,860 L</p>
                <p className="text-xs text-green-600 mt-1">92% of target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">465 L</p>
                <p className="text-xs text-muted-foreground mt-1">Per week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Excellent</p>
                <p className="text-xs text-green-600 mt-1">Below target usage</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Water Conservation Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Badge>Tip 1</Badge>
                </div>
                <div>
                  <p className="text-sm text-foreground">Use drip irrigation for more efficient water delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Badge>Tip 2</Badge>
                </div>
                <div>
                  <p className="text-sm text-foreground">Monitor soil moisture to avoid overwatering</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Badge>Tip 3</Badge>
                </div>
                <div>
                  <p className="text-sm text-foreground">Schedule irrigation during cooler hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productivity by Zone</CardTitle>
              <CardDescription>
                Crop productivity distribution across zones
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
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
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productivityData.map((zone, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{zone.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{zone.value}%</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${zone.value}%`,
                        backgroundColor: zone.fill,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Productivity Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Crops per Zone</span>
                  <span className="font-semibold text-foreground">1 crop/zone</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Average Health Score</span>
                  <span className="font-semibold text-foreground">85%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Harvest Success Rate</span>
                  <span className="font-semibold text-foreground">95%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Resource Utilization</span>
                  <span className="font-semibold text-foreground">88%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
