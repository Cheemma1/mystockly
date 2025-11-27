"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Package } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useGetSalesQuery } from "@/hooks/sales/useSales";
import { useGetOrdersQuery } from "@/hooks/orders/useOrder";
import { useGetCustomersQuery } from "@/hooks/customers/useCustomers";
import { useGetProductsQuery } from "@/hooks/products/useProducts";
import Heading from "../components/Heading";
import CardIcon from "../components/CardIcon";

export default function AnalyticsPage() {
  const { sales, loading: salesLoading } = useGetSalesQuery();
  const { orders, loading: ordersLoading } = useGetOrdersQuery();
  const { customers, loading: customersLoading } = useGetCustomersQuery();
  const { isLoading: productsLoading } = useGetProductsQuery();

  const loading =
    salesLoading || ordersLoading || customersLoading || productsLoading;

  // Calculate metrics
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrders = orders.length;
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const activeCustomers = customers.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Process sales data for chart (Last 7 days)
  const processSalesData = () => {
    if (!sales.length) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const dailySales = sales.reduce((acc: Record<string, number>, sale) => {
      const date = new Date(sale.created_at).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + sale.amount;
      return acc;
    }, {});

    return last7Days.map((date) => ({
      date,
      sales: dailySales[date] || 0,
    }));
  };

  const salesData = processSalesData();

  // Process daily stats (by day of week)
  const processDailyStats = () => {
    if (!sales.length) return [];

    const dayOfWeekStats = sales.reduce((acc: Record<string, number>, sale) => {
      const day = new Date(sale.created_at).toLocaleDateString("en-US", {
        weekday: "short",
      });
      acc[day] = (acc[day] || 0) + sale.amount;
      return acc;
    }, {});

    const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return daysOrder.map((day) => ({
      day,
      sales: dayOfWeekStats[day] || 0,
    }));
  };

  const dailyStats = processDailyStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Heading
          headingText="Analytics Dashboard"
          paraText="Track your business performance and insights"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardIcon
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          iconColor="#059669"
          iconBgColor="#ECFDF5"
          valueColor="#1F2937"
        />
        <CardIcon
          title="Total Orders"
          value={totalOrders}
          icon={Package}
          iconColor="#2563EB"
          iconBgColor="#EFF6FF"
          valueColor="#1F2937"
        />
        <CardIcon
          title="Average Order"
          value={formatCurrency(averageOrder)}
          icon={Calendar}
          iconColor="#7C3AED"
          iconBgColor="#F5F3FF"
          valueColor="#1F2937"
        />
        <CardIcon
          title="Active Customers"
          value={activeCustomers}
          icon={Users}
          iconColor="#EA580C"
          iconBgColor="#FFF7ED"
          valueColor="#1F2937"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : salesData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No sales data available
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `₦${(value / 1000).toFixed(0)}k`
                      }
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        formatCurrency(value),
                        "Sales",
                      ]}
                      labelFormatter={(label) => formatDate(label)}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#059669"
                      strokeWidth={2}
                      dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sales by Day of Week */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Day of Week</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : dailyStats.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No sales data available
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyStats}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="day"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `₦${(value / 1000).toFixed(0)}k`
                      }
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        formatCurrency(value),
                        "Sales",
                      ]}
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
