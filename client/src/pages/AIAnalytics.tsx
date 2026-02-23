import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Activity, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const mockAIInsights = {
  healthScore: {
    score: 85,
    trend: "up",
    recommendation: "Continue current watering schedule",
    factors: [
      { name: "Leaf Color", value: 90 },
      { name: "Stem Strength", value: 82 },
      { name: "Growth Rate", value: 78 },
      { name: "Disease Resistance", value: 85 },
    ],
  },
  diseaseRisks: [
    {
      disease: "Early Blight",
      risk: "Medium",
      confidence: 78,
      recommendation: "Increase ventilation and reduce leaf wetness",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    {
      disease: "Powdery Mildew",
      risk: "Low",
      confidence: 45,
      recommendation: "Monitor humidity levels",
      icon: Activity,
      color: "text-green-600",
    },
  ],
  yieldPrediction: {
    predicted: 2.3,
    unit: "tons",
    confidence: 85,
    factors: [
      { month: "Jan", predicted: 0.3, current: 0.28 },
      { month: "Feb", predicted: 0.8, current: 0.75 },
      { month: "Mar", predicted: 1.2, current: 1.15 },
      { month: "Apr", predicted: 2.3, current: 2.2 },
    ],
  },
};

function HealthScoreCard() {
  const { score, trend, recommendation, factors } = mockAIInsights.healthScore;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Crop Health Score</CardTitle>
            <CardDescription>AI-powered assessment of crop condition</CardDescription>
          </div>
          <div className="ai-label">
            <Zap className="w-3 h-3" />
            AI Recommendation
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 339.29} 339.29`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-foreground">{score}%</p>
              <p className="text-xs text-muted-foreground">Excellent</p>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="ai-recommendation">
          <p className="text-sm font-medium text-foreground mb-2">AI Recommendation</p>
          <p className="text-sm text-foreground">{recommendation}</p>
        </div>

        {/* Health Factors */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Health Factors</p>
          {factors.map((factor) => (
            <div key={factor.name}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">{factor.name}</p>
                <p className="text-sm font-medium">{factor.value}%</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DiseaseRiskCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Disease Risk Assessment</CardTitle>
            <CardDescription>Predicted disease threats based on conditions</CardDescription>
          </div>
          <div className="ai-label">
            <Zap className="w-3 h-3" />
            AI Recommendation
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAIInsights.diseaseRisks.map((disease) => {
          const Icon = disease.icon;
          const riskColor = {
            Low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200",
            Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200",
            High: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200",
          }[disease.risk] || "bg-gray-100 text-gray-800";

          return (
            <div
              key={disease.disease}
              className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${disease.color}`} />
                  <div>
                    <p className="font-medium text-foreground">{disease.disease}</p>
                    <p className="text-xs text-muted-foreground">
                      Confidence: {disease.confidence}%
                    </p>
                  </div>
                </div>
                <Badge className={riskColor}>{disease.risk} Risk</Badge>
              </div>

              <div className="ai-recommendation mb-3">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">
                  AI Recommendation
                </p>
                <p className="text-sm text-foreground">{disease.recommendation}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function YieldPredictionCard() {
  const { predicted, unit, confidence, factors } = mockAIInsights.yieldPrediction;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Yield Prediction</CardTitle>
            <CardDescription>Projected harvest based on current growth</CardDescription>
          </div>
          <div className="ai-label">
            <Zap className="w-3 h-3" />
            AI Recommendation
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prediction Display */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Predicted Yield</p>
              <p className="text-4xl font-bold text-foreground">
                {predicted}
                <span className="text-lg text-muted-foreground ml-2">{unit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Confidence: {confidence}%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400 opacity-20" />
          </div>
        </div>

        {/* Recommendation */}
        <div className="ai-recommendation">
          <p className="text-sm font-medium text-foreground mb-2">AI Recommendation</p>
          <p className="text-sm text-foreground">
            Maintain current conditions for optimal yield. Monitor soil moisture levels
            closely as they approach harvest.
          </p>
        </div>

        {/* Yield Projection Chart */}
        <div>
          <p className="font-medium text-foreground mb-4">Yield Projection</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={factors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="predicted" fill="#10b981" name="Predicted" />
              <Bar dataKey="current" fill="#3b82f6" name="Current" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AIAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">AI Crop Analytics</h2>
        <p className="text-muted-foreground">
          AI-powered insights for crop health, disease risks, and yield predictions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthScoreCard />
        <DiseaseRiskCard />
      </div>

      <YieldPredictionCard />

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Analysis</CardTitle>
          <CardDescription>Detailed crop growth metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { day: "Day 1", height: 10, leaves: 8 },
                { day: "Day 5", height: 15, leaves: 12 },
                { day: "Day 10", height: 22, leaves: 18 },
                { day: "Day 15", height: 30, leaves: 25 },
                { day: "Day 20", height: 38, leaves: 32 },
                { day: "Day 25", height: 45, leaves: 38 },
                { day: "Day 30", height: 52, leaves: 45 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="height"
                stroke="#10b981"
                name="Plant Height (cm)"
              />
              <Line
                type="monotone"
                dataKey="leaves"
                stroke="#3b82f6"
                name="Leaf Count"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
