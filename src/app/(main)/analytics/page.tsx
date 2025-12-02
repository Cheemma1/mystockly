"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Package, Download } from "lucide-react";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TopCustomers from "./components/TopCustomers";

export default function AnalyticsPage() {
  const { sales, loading: salesLoading } = useGetSalesQuery();
  const { orders, loading: ordersLoading } = useGetOrdersQuery();
  const { customers, loading: customersLoading } = useGetCustomersQuery();
  const { isLoading: productsLoading } = useGetProductsQuery();

  const [topProducts, setTopProducts] = useState<
    Array<{ name: string; sales: number; orders: number; percentage: number }>
  >([]);
  const [topCustomers, setTopCustomers] = useState<
    Array<{ name: string; orders: number; spent: number; lastOrder: string }>
  >([]);

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

  // Process product and customer analytics
  useEffect(() => {
    if (orders.length > 0) {
      // Process product analytics
      const productSales = orders.reduce(
        (acc: Record<string, { sales: number; orders: number }>, order) => {
          order.order_items?.forEach((item) => {
            if (!acc[item.product_name]) {
              acc[item.product_name] = { sales: 0, orders: 0 };
            }
            acc[item.product_name].sales += Number(item.total_price);
            acc[item.product_name].orders += item.quantity;
          });
          return acc;
        },
        {}
      );

      const totalSales = Object.values(productSales).reduce(
        (sum, p) => sum + p.sales,
        0
      );
      const productAnalytics = Object.entries(productSales)
        .map(([name, data]) => ({
          name,
          sales: data.sales,
          orders: data.orders,
          percentage:
            totalSales > 0 ? Math.round((data.sales / totalSales) * 100) : 0,
        }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

      setTopProducts(productAnalytics);

      // Process customer analytics
      const customerAnalytics = orders.reduce(
        (
          acc: Record<
            string,
            { orders: number; spent: number; lastOrder: string }
          >,
          order
        ) => {
          const key = order.customer_name;
          if (!acc[key]) {
            acc[key] = { orders: 0, spent: 0, lastOrder: order.created_at };
          }
          acc[key].orders += 1;
          acc[key].spent += Number(order.total_amount);
          if (new Date(order.created_at) > new Date(acc[key].lastOrder)) {
            acc[key].lastOrder = order.created_at;
          }
          return acc;
        },
        {}
      );

      const customerAnalyticsArray = Object.entries(customerAnalytics)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.spent - a.spent)
        .slice(0, 5);

      setTopCustomers(customerAnalyticsArray);
    }
  }, [orders]);

  // Export analytics data to CSV
  const exportToCSV = () => {
    const csvData: string[] = [];

    // Add header
    csvData.push("MyStockly Analytics Report");
    csvData.push(`Generated on: ${new Date().toLocaleString()}`);
    csvData.push("");

    // Summary metrics
    csvData.push("SUMMARY METRICS");
    csvData.push("Metric,Value");
    csvData.push(`Total Revenue,${formatCurrency(totalRevenue)}`);
    csvData.push(`Total Orders,${totalOrders}`);
    csvData.push(`Average Order,${formatCurrency(averageOrder)}`);
    csvData.push(`Active Customers,${activeCustomers}`);
    csvData.push("");

    // Top Products
    csvData.push("TOP SELLING PRODUCTS");
    csvData.push("Rank,Product Name,Orders,Sales,Percentage");
    topProducts.forEach((product, index) => {
      csvData.push(
        `${index + 1},"${product.name}",${product.orders},${product.sales},${
          product.percentage
        }%`
      );
    });
    csvData.push("");

    // Top Customers
    csvData.push("TOP CUSTOMERS");
    csvData.push("Rank,Customer Name,Orders,Total Spent,Last Order");
    topCustomers.forEach((customer, index) => {
      csvData.push(
        `${index + 1},"${customer.name}",${customer.orders},${
          customer.spent
        },${new Date(customer.lastOrder).toLocaleDateString()}`
      );
    });
    csvData.push("");

    // Sales Trend (Last 7 Days)
    csvData.push("SALES TREND (LAST 7 DAYS)");
    csvData.push("Date,Sales");
    salesData.forEach((data) => {
      csvData.push(`${formatDate(data.date)},${data.sales}`);
    });
    csvData.push("");

    // Sales by Day of Week
    csvData.push("SALES BY DAY OF WEEK");
    csvData.push("Day,Sales");
    dailyStats.forEach((data) => {
      csvData.push(`${data.day},${data.sales}`);
    });

    // Create CSV blob and download
    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `mystockly-analytics-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Heading
          headingText="Analytics Dashboard"
          paraText="Track your business performance and insights"
        />

        <div className="flex gap-2">
          {/* <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select> */}
          <Button variant="outline" onClick={exportToCSV} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Export as CSV
          </Button>
        </div>
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

      {/* Top Products and Customers */}
      <TopCustomers
        topProducts={topProducts}
        topCustomers={topCustomers}
        loading={loading}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}
