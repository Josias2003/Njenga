import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/Analytics";
import AnalyticsEnhanced from "./pages/AnalyticsEnhanced";
import Greenhouses from "./pages/Greenhouses";
import GreenhousesEnhanced from "./pages/GreenhousesEnhanced";
import AlertsEnhanced from "./pages/AlertsEnhanced";
import ReportsEnhanced from "./pages/ReportsEnhanced";
import Settings from "./pages/Settings";
import Login from "./pages/login";
import { Navigation } from "./components/Navigation";
import { AIChat } from "./components/AIChat";
import { useState, useEffect } from "react";
import { createMockGreenhouse } from "./lib/mockData";

function Router() {
  const [location] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mockGreenhouse = createMockGreenhouse('gh-1', 'Main Greenhouse');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 font-orbitron text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/login" component={(props: any) => (
          <Login {...props} onLoginSuccess={() => setIsAuthenticated(true)} />
        )} />
        <Route component={() => (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        )} />
      </Switch>
    );
  }

  return (
    <>
      <Navigation
        currentPage={location}
        onAIChatOpen={() => setIsChatOpen(true)}
        onLogout={handleLogout}
      />
      <div className="pt-20">
        <Switch>
          <Route path={"/"} component={Dashboard} />
          <Route path={"/analytics"} component={AnalyticsEnhanced} />
          <Route path={"/greenhouses"} component={GreenhousesEnhanced} />
          <Route path={"/alerts"} component={AlertsEnhanced} />
          <Route path={"/reports"} component={ReportsEnhanced} />
          <Route path={"/settings"} component={Settings} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <AIChat
        sensors={mockGreenhouse.currentSensors}
        crop={mockGreenhouse.currentCrop}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;