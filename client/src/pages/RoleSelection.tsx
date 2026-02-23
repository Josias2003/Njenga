import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Settings } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function RoleSelection() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "agronomist" | "admin" | null>(null);
  const selectRoleMutation = trpc.auth.selectRole.useMutation();

  const roles = [
    {
      id: "farmer",
      name: "Farmer",
      description: "Monitor greenhouse operations and receive alerts",
      icon: Leaf,
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      accentColor: "text-green-600 dark:text-green-400",
    },
    {
      id: "agronomist",
      name: "Agronomist",
      description: "Analyze crop health and provide recommendations",
      icon: Users,
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      accentColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "admin",
      name: "Administrator",
      description: "Manage system, users, and automation rules",
      icon: Settings,
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      accentColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  const handleSelectRole = async (role: "farmer" | "agronomist" | "admin") => {
    setSelectedRole(role);
    try {
      await selectRoleMutation.mutateAsync(role);
      setLocation("/dashboard");
    } catch (error) {
      console.error("Failed to select role:", error);
      setSelectedRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Njenga Greens</h1>
          <p className="text-lg text-muted-foreground">Smart Greenhouse Management System</p>
          <p className="text-muted-foreground mt-4">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            const isLoading = selectRoleMutation.isPending && selectedRole === role.id;

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all border-2 ${
                  isSelected ? "border-primary shadow-lg" : role.color
                }`}
                onClick={() => !isLoading && handleSelectRole(role.id as any)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${role.color}`}>
                    <Icon className={`w-6 h-6 ${role.accentColor}`} />
                  </div>
                  <CardTitle className="text-xl">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    disabled={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRole(role.id as any);
                    }}
                  >
                    {isLoading ? "Selecting..." : "Select Role"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-3">Role Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium text-green-600 dark:text-green-400 mb-2">Farmer</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ View sensor data</li>
                <li>✓ Receive alerts</li>
                <li>✓ View crop status</li>
                <li>✗ Modify automation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">Agronomist</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ View sensor data</li>
                <li>✓ AI recommendations</li>
                <li>✓ Crop analysis</li>
                <li>✗ System admin</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-purple-600 dark:text-purple-400 mb-2">Administrator</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Full system access</li>
                <li>✓ Manage users</li>
                <li>✓ Configure automation</li>
                <li>✓ View all data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
