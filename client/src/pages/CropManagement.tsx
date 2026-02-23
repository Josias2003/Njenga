import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Calendar, Leaf } from "lucide-react";

const mockCrops = [
  {
    id: 1,
    name: "Cherry Tomatoes",
    variety: "Sungold",
    zone: "Zone A",
    plantingDate: new Date("2024-12-01"),
    expectedHarvestDate: new Date("2025-03-15"),
    status: "growing",
    daysToHarvest: 48,
    healthScore: 85,
  },
  {
    id: 2,
    name: "Butterhead Lettuce",
    variety: "Bibb",
    zone: "Zone B",
    plantingDate: new Date("2025-01-01"),
    expectedHarvestDate: new Date("2025-02-15"),
    status: "growing",
    daysToHarvest: 20,
    healthScore: 92,
  },
  {
    id: 3,
    name: "Bell Peppers",
    variety: "Red Beauty",
    zone: "Zone C",
    plantingDate: new Date("2024-11-15"),
    expectedHarvestDate: new Date("2025-04-01"),
    status: "growing",
    daysToHarvest: 65,
    healthScore: 78,
  },
];

const mockGreenhouses = [
  {
    id: 1,
    name: "Main Greenhouse",
    location: "Rubavu, Busasamana",
    totalArea: 500,
    zones: 3,
    activeCrops: 3,
    status: "operational",
  },
];

function CropCard({ crop }: { crop: (typeof mockCrops)[number] }) {
  const statusColors = {
    planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200",
    growing: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200",
    harvesting: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200",
  };

  const daysRemaining = Math.max(0, crop.daysToHarvest);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-base">{crop.name}</CardTitle>
              <CardDescription className="text-xs">{crop.variety}</CardDescription>
            </div>
          </div>
          <Badge className={statusColors[crop.status as keyof typeof statusColors]}>
            {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{crop.zone}</span>
          <span className="font-medium text-foreground">{crop.zone}</span>
        </div>

        {/* Health Score */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Health Score</span>
            <span className="font-medium text-foreground">{crop.healthScore}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                crop.healthScore >= 80
                  ? "bg-green-500"
                  : crop.healthScore >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${crop.healthScore}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Planted</span>
            <span className="font-medium">{crop.plantingDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Expected Harvest</span>
            <span className="font-medium">{crop.expectedHarvestDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <span className="text-muted-foreground">Days to Harvest</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{daysRemaining} days</span>
          </div>
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
                <DialogTitle>Edit Crop</DialogTitle>
                <DialogDescription>Update crop details and timeline</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Crop editing form would go here</p>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CropManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Crop & Greenhouse Management</h2>
        <p className="text-muted-foreground">
          Manage your crops and greenhouse zones
        </p>
      </div>

      <Tabs defaultValue="crops" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="greenhouses">Greenhouses</TabsTrigger>
        </TabsList>

        <TabsContent value="crops" className="space-y-4">
          {/* Add Crop Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Crop
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Crop</DialogTitle>
                <DialogDescription>
                  Add a new crop to your greenhouse
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const cropName = formData.get("cropName");
                  const greenhouse = formData.get("greenhouse");
                  console.log("Registering crop:", cropName, "in greenhouse:", greenhouse);
                  // Add submission logic here (e.g., API call)
                }}
              >
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium">Crop Name</span>
                    <input
                      name="cropName"
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">Greenhouse</span>
                    <input
                      name="greenhouse"
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                      required
                    />
                  </label>
                  <Button type="submit">Register Crop</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Crop Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{mockCrops.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Growing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {mockCrops.filter((c) => c.status === "growing").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Ready to Harvest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockCrops.filter((c) => c.daysToHarvest <= 7).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Crops List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Active Crops</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCrops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </div>

          {/* Crop Lifecycle */}
          <Card>
            <CardHeader>
              <CardTitle>Crop Lifecycle</CardTitle>
              <CardDescription>Stages of crop development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Planning</p>
                    <p className="text-sm text-muted-foreground">Prepare seeds and plan planting schedule</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20">
                      <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Growing</p>
                    <p className="text-sm text-muted-foreground">Monitor growth and maintain optimal conditions</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                      <span className="text-yellow-600 dark:text-yellow-400 font-semibold">3</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Harvesting</p>
                    <p className="text-sm text-muted-foreground">Harvest produce at peak ripeness</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-900/20">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">4</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Completed</p>
                    <p className="text-sm text-muted-foreground">Harvest finished, prepare for next cycle</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="greenhouses" className="space-y-4">
          {/* Add Greenhouse Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Greenhouse
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Greenhouse</DialogTitle>
                <DialogDescription>
                  Add a new greenhouse to your farm
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Greenhouse registration form would go here</p>
            </DialogContent>
          </Dialog>

          {/* Greenhouses List */}
          <div className="grid grid-cols-1 gap-4">
            {mockGreenhouses.map((gh) => (
              <Card key={gh.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{gh.name}</CardTitle>
                      <CardDescription>{gh.location}</CardDescription>
                    </div>
                    <Badge variant="default">Operational</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Area</p>
                      <p className="text-lg font-semibold">{gh.totalArea} m²</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Zones</p>
                      <p className="text-lg font-semibold">{gh.zones}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Crops</p>
                      <p className="text-lg font-semibold text-green-600">{gh.activeCrops}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className="mt-1">Operational</Badge>
                    </div>
                  </div>

                  {/* Zone Layout */}
                  <div>
                    <p className="font-medium text-foreground mb-3">Zone Layout</p>
                    <div className="grid grid-cols-3 gap-3">
                      {["Zone A", "Zone B", "Zone C"].map((zone) => (
                        <div
                          key={zone}
                          className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center"
                        >
                          <p className="font-medium text-green-900 dark:text-green-200">{zone}</p>
                          <p className="text-xs text-green-700 dark:text-green-300">166.7 m²</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1">
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
