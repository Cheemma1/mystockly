export interface AIInsightsResponse {
  overallHealth: number;
  healthStatus: string;
  keyMetrics: {
    revenueGrowth: {
      percentage: number;
      trend: string;
      analysis: string;
    };
    customerRetention: {
      rate: number;
      risk: string;
      analysis: string;
    };
    inventoryEfficiency: {
      score: number;
      status: string;
      analysis: string;
    };
    profitability: {
      aovTrend: string;
      margin: string;
    };
  };
  criticalInsights: Array<{
    id: number;
    priority: string;
    category: string;
    insight: string;
    businessImpact: string;
    recommendation: string;
    actionSteps: string[];
    expectedOutcome: string;
    timeframe: string;
  }>;
  strategicRecommendations: Array<{
    category: string;
    strategy: string;
    rationale: string;
    implementation: string;
    expectedImpact: string;
    difficulty: string;
    timeline: string;
  }>;
  businessIntelligence: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface BusinessData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  currentWeekRevenue: number;
  prevWeekRevenue: number;
  todayRevenue: number;
  todayOrders: number;
  recentCustomers: number;
  inactiveCustomers: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  topProduct: string | null;
}
