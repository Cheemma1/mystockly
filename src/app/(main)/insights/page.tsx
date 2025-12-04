// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   Lightbulb,
//   Target,
//   Users,
//   DollarSign,
//   ShoppingCart,
//   Package,
//   Calendar,
//   ArrowUpRight,
//   ArrowDownRight,
//   Sparkles,
// } from "lucide-react";
// import { useGetSalesQuery } from "@/hooks/sales/useSales";
// import { useGetOrdersQuery } from "@/hooks/orders/useOrder";
// import { useGetCustomersQuery } from "@/hooks/customers/useCustomers";
// import { useGetProductsQuery } from "@/hooks/products/useProducts";
// import Heading from "../components/Heading";
// import { Badge } from "@/components/ui/badge";

// interface Insight {
//   id: string;
//   type: "success" | "warning" | "info" | "opportunity";
//   title: string;
//   description: string;
//   action?: string;
//   impact: "high" | "medium" | "low";
// }

// interface GrowthMetric {
//   label: string;
//   value: string;
//   change: number;
//   trend: "up" | "down" | "neutral";
//   icon: React.ElementType;
// }

// interface Strategy {
//   title: string;
//   description: string;
// }

// export default function InsightsPage() {
//   const { sales, loading: salesLoading } = useGetSalesQuery();
//   const { orders, loading: ordersLoading } = useGetOrdersQuery();
//   const { customers, loading: customersLoading } = useGetCustomersQuery();
//   const { products, loading: productsLoading } = useGetProductsQuery();

//   const [insights, setInsights] = useState<Insight[]>([]);
//   const [growthMetrics, setGrowthMetrics] = useState<GrowthMetric[]>([]);
//   const [aiStrategies, setAiStrategies] = useState<{
//     sales: Strategy[];
//     retention: Strategy[];
//     revenue: Strategy[];
//   }>({ sales: [], retention: [], revenue: [] });
//   const [generatingInsights, setGeneratingInsights] = useState(false);

//   const loading =
//     salesLoading || ordersLoading || customersLoading || productsLoading;

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Generate AI-powered insights using Gemini
//   useEffect(() => {
//     const generateAIInsights = async () => {
//       if (!loading && sales.length > 0 && orders.length > 0) {
//         setGeneratingInsights(true);

//         // Calculate metrics for insights
//         const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
//         const avgOrderValue = totalRevenue / orders.length;

//         // Revenue insights
//         const last7DaysSales = sales.filter((sale) => {
//           const saleDate = new Date(sale.created_at);
//           const weekAgo = new Date();
//           weekAgo.setDate(weekAgo.getDate() - 7);
//           return saleDate >= weekAgo;
//         });

//         const prev7DaysSales = sales.filter((sale) => {
//           const saleDate = new Date(sale.created_at);
//           const twoWeeksAgo = new Date();
//           twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
//           const weekAgo = new Date();
//           weekAgo.setDate(weekAgo.getDate() - 7);
//           return saleDate >= twoWeeksAgo && saleDate < weekAgo;
//         });

//         const currentWeekRevenue = last7DaysSales.reduce(
//           (sum, sale) => sum + sale.amount,
//           0
//         );
//         const prevWeekRevenue = prev7DaysSales.reduce(
//           (sum, sale) => sum + sale.amount,
//           0
//         );

//         // Customer insights
//         const recentCustomers = customers.filter((customer) => {
//           const customerDate = new Date(customer.created_at);
//           const monthAgo = new Date();
//           monthAgo.setDate(monthAgo.getDate() - 30);
//           return customerDate >= monthAgo;
//         });

//         // Product insights
//         const productSales = orders.reduce(
//           (acc: Record<string, number>, order) => {
//             order.order_items?.forEach((item) => {
//               acc[item.product_name] =
//                 (acc[item.product_name] || 0) + item.quantity;
//             });
//             return acc;
//           },
//           {}
//         );

//         const topProduct = Object.entries(productSales).sort(
//           ([, a], [, b]) => b - a
//         )[0];

//         // Low stock alert
//         const lowStockProducts = products.filter(
//           (product) => product.stock_quantity < 10 && product.stock_quantity > 0
//         );

//         // Inactive customers
//         const inactiveCustomers = customers.filter((customer) => {
//           const lastOrder = orders
//             .filter((o) => o.customer_name === customer.name)
//             .sort(
//               (a, b) =>
//                 new Date(b.created_at).getTime() -
//                 new Date(a.created_at).getTime()
//             )[0];

//           if (!lastOrder) return false;

//           const daysSinceLastOrder =
//             (new Date().getTime() - new Date(lastOrder.created_at).getTime()) /
//             (1000 * 60 * 60 * 24);
//           return daysSinceLastOrder > 30;
//         });

//         // Prepare data for AI
//         const businessData = {
//           totalRevenue: formatCurrency(totalRevenue),
//           totalOrders: orders.length,
//           totalCustomers: customers.length,
//           avgOrderValue: formatCurrency(avgOrderValue),
//           currentWeekRevenue: formatCurrency(currentWeekRevenue),
//           prevWeekRevenue: formatCurrency(prevWeekRevenue),
//           recentCustomers: recentCustomers.length,
//           inactiveCustomers: inactiveCustomers.length,
//           lowStockProducts: lowStockProducts.length,
//           topProduct: topProduct
//             ? `${topProduct[0]} (${topProduct[1]} units)`
//             : null,
//         };

//         try {
//           // Call Gemini API
//           const response = await fetch("/api/generate-insights", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ businessData }),
//           });

//           if (!response.ok) {
//             throw new Error("Failed to generate insights");
//           }

//           const data = await response.json();

//           if (data.insights) {
//             setInsights(data.insights);
//           }

//           if (data.strategies) {
//             setAiStrategies(data.strategies);
//           }
//         } catch (error) {
//           console.error("Error generating AI insights:", error);
//           // Fallback to basic insights if API fails
//           setInsights([
//             {
//               id: "error",
//               type: "warning",
//               title: "Unable to Generate AI Insights",
//               description:
//                 "Could not connect to AI service. Please check your API key configuration.",
//               impact: "high",
//             },
//           ]);
//         } finally {
//           setGeneratingInsights(false);
//         }

//         // Calculate growth metrics
//         const metrics: GrowthMetric[] = [
//           {
//             label: "Revenue Growth",
//             value: formatCurrency(currentWeekRevenue),
//             change:
//               prevWeekRevenue > 0
//                 ? ((currentWeekRevenue - prevWeekRevenue) / prevWeekRevenue) *
//                   100
//                 : 0,
//             trend:
//               currentWeekRevenue > prevWeekRevenue
//                 ? "up"
//                 : currentWeekRevenue < prevWeekRevenue
//                 ? "down"
//                 : "neutral",
//             icon: DollarSign,
//           },
//           {
//             label: "New Customers",
//             value: recentCustomers.length.toString(),
//             change: 15,
//             trend: "up",
//             icon: Users,
//           },
//           {
//             label: "Orders This Week",
//             value: last7DaysSales.length.toString(),
//             change:
//               prev7DaysSales.length > 0
//                 ? ((last7DaysSales.length - prev7DaysSales.length) /
//                     prev7DaysSales.length) *
//                   100
//                 : 0,
//             trend:
//               last7DaysSales.length > prev7DaysSales.length
//                 ? "up"
//                 : last7DaysSales.length < prev7DaysSales.length
//                 ? "down"
//                 : "neutral",
//             icon: ShoppingCart,
//           },
//           {
//             label: "Avg Order Value",
//             value: formatCurrency(avgOrderValue),
//             change: 8,
//             trend: "up",
//             icon: TrendingUp,
//           },
//         ];

//         setGrowthMetrics(metrics);
//       }
//     };

//     generateAIInsights();
//   }, [sales, orders, customers, products, loading]);

//   const getInsightIcon = (type: string) => {
//     switch (type) {
//       case "success":
//         return TrendingUp;
//       case "warning":
//         return AlertTriangle;
//       case "opportunity":
//         return Lightbulb;
//       default:
//         return Sparkles;
//     }
//   };

//   const getInsightColor = (type: string) => {
//     switch (type) {
//       case "success":
//         return "text-green-600 bg-green-50 border-green-200";
//       case "warning":
//         return "text-orange-600 bg-orange-50 border-orange-200";
//       case "opportunity":
//         return "text-blue-600 bg-blue-50 border-blue-200";
//       default:
//         return "text-purple-600 bg-purple-50 border-purple-200";
//     }
//   };

//   const getImpactBadge = (impact: string) => {
//     const colors = {
//       high: "bg-red-100 text-red-800",
//       medium: "bg-yellow-100 text-yellow-800",
//       low: "bg-green-100 text-green-800",
//     };
//     return colors[impact as keyof typeof colors];
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <Sparkles className="h-8 w-8 text-blue-600" />
//         <Heading
//           headingText="AI-Powered Business Insights"
//           paraText="Personalized recommendations powered by Gemini AI"
//         />
//       </div>

//       {/* Growth Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {growthMetrics.map((metric, index) => {
//           const Icon = metric.icon;
//           return (
//             <Card key={index}>
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
//                     <p className="text-2xl font-bold text-gray-900">
//                       {metric.value}
//                     </p>
//                     <div className="flex items-center gap-1 mt-2">
//                       {metric.trend === "up" ? (
//                         <ArrowUpRight className="h-4 w-4 text-green-600" />
//                       ) : metric.trend === "down" ? (
//                         <ArrowDownRight className="h-4 w-4 text-red-600" />
//                       ) : null}
//                       <span
//                         className={`text-sm font-medium ${
//                           metric.trend === "up"
//                             ? "text-green-600"
//                             : metric.trend === "down"
//                             ? "text-red-600"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         {metric.change > 0 ? "+" : ""}
//                         {metric.change.toFixed(1)}%
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         vs last week
//                       </span>
//                     </div>
//                   </div>
//                   <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
//                     <Icon className="h-6 w-6 text-blue-600" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* AI Insights */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Target className="h-5 w-5 text-blue-600" />
//             Actionable Insights
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading || generatingInsights ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3" />
//               <p className="text-gray-600">
//                 AI is analyzing your business data...
//               </p>
//             </div>
//           ) : insights.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//               <p>Not enough data yet. Keep adding sales and customers!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {insights.map((insight) => {
//                 const Icon = getInsightIcon(insight.type);
//                 return (
//                   <div
//                     key={insight.id}
//                     className={`p-4 rounded-lg border ${getInsightColor(
//                       insight.type
//                     )}`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="mt-1">
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h3 className="font-semibold">{insight.title}</h3>
//                           <Badge className={getImpactBadge(insight.impact)}>
//                             {insight.impact} impact
//                           </Badge>
//                         </div>
//                         <p className="text-sm mb-2">{insight.description}</p>
//                         {insight.action && (
//                           <div className="flex items-center gap-2 text-sm font-medium">
//                             <ArrowUpRight className="h-4 w-4" />
//                             <span>Recommended: {insight.action}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* AI-Generated Growth Strategies */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//           <Lightbulb className="h-6 w-6 text-blue-600" />
//           AI-Generated Growth Strategies
//         </h2>

//         {/* Increase Sales Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-green-600">
//               <TrendingUp className="h-5 w-5" />
//               How to Increase Sales
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {generatingInsights ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3" />
//                 <span className="text-gray-600">
//                   AI is generating personalized strategies...
//                 </span>
//               </div>
//             ) : aiStrategies.sales.length > 0 ? (
//               <div className="space-y-3">
//                 {aiStrategies.sales.map((strategy, index) => (
//                   <div
//                     key={index}
//                     className="p-3 bg-green-50 rounded-lg border border-green-200"
//                   >
//                     <h4 className="font-semibold text-sm mb-1">
//                       {index + 1}. {strategy.title}
//                     </h4>
//                     <p className="text-xs text-gray-600">
//                       {strategy.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 py-8">
//                 Add more sales data to get personalized strategies
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Retain Customers Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-blue-600">
//               <Users className="h-5 w-5" />
//               How to Retain Customers
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {generatingInsights ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" />
//                 <span className="text-gray-600">
//                   AI is generating personalized strategies...
//                 </span>
//               </div>
//             ) : aiStrategies.retention.length > 0 ? (
//               <div className="space-y-3">
//                 {aiStrategies.retention.map((strategy, index) => (
//                   <div
//                     key={index}
//                     className="p-3 bg-blue-50 rounded-lg border border-blue-200"
//                   >
//                     <h4 className="font-semibold text-sm mb-1">
//                       {index + 1}. {strategy.title}
//                     </h4>
//                     <p className="text-xs text-gray-600">
//                       {strategy.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 py-8">
//                 Add more customer data to get personalized strategies
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Make More Money Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-purple-600">
//               <DollarSign className="h-5 w-5" />
//               How to Make More Money
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {generatingInsights ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mr-3" />
//                 <span className="text-gray-600">
//                   AI is generating personalized strategies...
//                 </span>
//               </div>
//             ) : aiStrategies.revenue.length > 0 ? (
//               <div className="space-y-3">
//                 {aiStrategies.revenue.map((strategy, index) => (
//                   <div
//                     key={index}
//                     className="p-3 bg-purple-50 rounded-lg border border-purple-200"
//                   >
//                     <h4 className="font-semibold text-sm mb-1">
//                       {index + 1}. {strategy.title}
//                     </h4>
//                     <p className="text-xs text-gray-600">
//                       {strategy.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 py-8">
//                 Add more business data to get personalized strategies
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Target,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import { useGetSalesQuery } from "@/hooks/sales/useSales";
import { useGetOrdersQuery } from "@/hooks/orders/useOrder";
import { useGetCustomersQuery } from "@/hooks/customers/useCustomers";
import { useGetProductsQuery } from "@/hooks/products/useProducts";
import Heading from "../components/Heading";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AIInsightsResponse {
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

import { useGetAIInsights } from "@/hooks/insights/useInsights";
import { BusinessData } from "@/hooks/insights/interface";

export default function InsightsPage() {
  const { sales, loading: salesLoading } = useGetSalesQuery();
  const { orders, loading: ordersLoading } = useGetOrdersQuery();
  const { customers, loading: customersLoading } = useGetCustomersQuery();
  const { products, isLoading: productsLoading } = useGetProductsQuery();

  const [businessData, setBusinessData] = useState<BusinessData | null>(null);

  const loading =
    salesLoading || ordersLoading || customersLoading || productsLoading;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate business metrics
  useEffect(() => {
    if (!loading && sales.length > 0 && orders.length > 0) {
      const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
      const avgOrderValue = totalRevenue / orders.length;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todaySales = sales.filter((sale) => {
        const saleDate = new Date(sale.created_at);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
      });

      const last7DaysSales = sales.filter((sale) => {
        const saleDate = new Date(sale.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return saleDate >= weekAgo;
      });

      const prev7DaysSales = sales.filter((sale) => {
        const saleDate = new Date(sale.created_at);
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return saleDate >= twoWeeksAgo && saleDate < weekAgo;
      });

      const currentWeekRevenue = last7DaysSales.reduce(
        (sum, sale) => sum + sale.amount,
        0
      );
      const prevWeekRevenue = prev7DaysSales.reduce(
        (sum, sale) => sum + sale.amount,
        0
      );
      const todayRevenue = todaySales.reduce(
        (sum, sale) => sum + sale.amount,
        0
      );

      const recentCustomers = customers.filter((customer) => {
        const customerDate = new Date(customer.created_at);
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        return customerDate >= monthAgo;
      });

      const productSales = orders.reduce(
        (acc: Record<string, number>, order) => {
          order.order_items?.forEach((item) => {
            acc[item.product_name] =
              (acc[item.product_name] || 0) + item.quantity;
          });
          return acc;
        },
        {}
      );

      const topProduct = Object.entries(productSales).sort(
        ([, a], [, b]) => b - a
      )[0];

      const lowStockProducts = products.filter(
        (product) => product.stock_quantity < 10 && product.stock_quantity > 0
      );

      const outOfStockProducts = products.filter(
        (product) => product.stock_quantity === 0
      );

      const inactiveCustomers = customers.filter((customer) => {
        const lastOrder = orders
          .filter((o) => o.customer_name === customer.name)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )[0];

        if (!lastOrder) return false;

        const daysSinceLastOrder =
          (new Date().getTime() - new Date(lastOrder.created_at).getTime()) /
          (1000 * 60 * 60 * 24);
        return daysSinceLastOrder > 30;
      });

      setBusinessData({
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        avgOrderValue,
        currentWeekRevenue,
        prevWeekRevenue,
        todayRevenue,
        todayOrders: todaySales.length,
        recentCustomers: recentCustomers.length,
        inactiveCustomers: inactiveCustomers.length,
        lowStockProducts: lowStockProducts.length,
        outOfStockProducts: outOfStockProducts.length,
        topProduct: topProduct
          ? `${topProduct[0]} (${topProduct[1]} units)`
          : null,
      });
    }
  }, [sales, orders, customers, products, loading]);

  // Use React Query hook to fetch AI insights
  const {
    insights: aiData,
    isLoading: generatingInsights,
    isError,
    error,
  } = useGetAIInsights(businessData);

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600 bg-green-50";
    if (health >= 60) return "text-blue-600 bg-blue-50";
    if (health >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getPriorityColor = (priority: string) => {
    return priority === "High"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-green-100 text-green-800";
    if (difficulty === "Moderate") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (loading || generatingInsights) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
        <p className="text-gray-600 text-lg">
          AI is analyzing your business data...
        </p>
        <p className="text-gray-500 text-sm mt-2">
          This may take a few moments
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to Generate Insights
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          {error instanceof Error
            ? error.message
            : "Failed to generate insights"}
        </p>
      </div>
    );
  }

  if (!aiData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Sparkles className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Not Enough Data
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Add more sales, customers, and products to get AI-powered insights
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Sparkles className="h-8 w-8 text-blue-600" />
        <Heading
          headingText="AI Business Intelligence"
          paraText="Professional analytics powered by Gemini AI"
        />
      </div>

      {/* Overall Health Score */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Business Health Score
              </h3>
              <p className="text-sm text-gray-600">
                Overall performance assessment
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${getHealthColor(
                aiData.overallHealth
              )}`}
            >
              <span className="text-3xl font-bold">{aiData.overallHealth}</span>
              <span className="text-lg">/100</span>
            </div>
          </div>
          <Progress value={aiData.overallHealth} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            Status: <span className="font-semibold">{aiData.healthStatus}</span>
          </p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {aiData.keyMetrics.revenueGrowth.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              {aiData.keyMetrics.revenueGrowth.analysis}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer Retention</p>
                <p className="text-2xl font-bold text-gray-900">
                  {aiData.keyMetrics.customerRetention.rate}%
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              {aiData.keyMetrics.customerRetention.analysis}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inventory Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">
                  {aiData.keyMetrics.inventoryEfficiency.score}%
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              {aiData.keyMetrics.inventoryEfficiency.analysis}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profitability</p>
                <p className="text-lg font-bold text-gray-900">
                  {aiData.keyMetrics.profitability.aovTrend}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              {aiData.keyMetrics.profitability.margin}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-600" />
            Critical Insights & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiData.criticalInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority} Priority
                    </Badge>
                    <Badge variant="outline">{insight.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {insight.timeframe}
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">
                  {insight.insight}
                </h4>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    💰 Business Impact
                  </p>
                  <p className="text-sm text-blue-800">
                    {insight.businessImpact}
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    ✅ Recommendation
                  </p>
                  <p className="text-sm text-gray-700">
                    {insight.recommendation}
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    📋 Action Steps
                  </p>
                  <ul className="space-y-1">
                    {insight.actionSteps.map((step, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-sm font-medium text-green-900 mb-1">
                    🎯 Expected Outcome
                  </p>
                  <p className="text-sm text-green-800">
                    {insight.expectedOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {aiData.strategicRecommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{rec.category}</Badge>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(rec.difficulty)}>
                      {rec.difficulty}
                    </Badge>
                    <Badge variant="secondary">{rec.timeline}</Badge>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">
                  {rec.strategy}
                </h4>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Why: </span>
                    <span className="text-gray-600">{rec.rationale}</span>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700">How: </span>
                    <span className="text-gray-600">{rec.implementation}</span>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded p-2 mt-2">
                    <span className="font-medium text-purple-900">
                      Expected Impact:{" "}
                    </span>
                    <span className="text-purple-800">
                      {rec.expectedImpact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Business Intelligence (SWOT)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {aiData.businessIntelligence.strengths.map((item, idx) => (
                  <li key={idx} className="text-sm text-green-800 flex gap-2">
                    <span className="text-green-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Weaknesses
              </h4>
              <ul className="space-y-2">
                {aiData.businessIntelligence.weaknesses.map((item, idx) => (
                  <li key={idx} className="text-sm text-red-800 flex gap-2">
                    <span className="text-red-600">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Opportunities
              </h4>
              <ul className="space-y-2">
                {aiData.businessIntelligence.opportunities.map((item, idx) => (
                  <li key={idx} className="text-sm text-blue-800 flex gap-2">
                    <span className="text-blue-600">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Threats
              </h4>
              <ul className="space-y-2">
                {aiData.businessIntelligence.threats.map((item, idx) => (
                  <li key={idx} className="text-sm text-orange-800 flex gap-2">
                    <span className="text-orange-600">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
