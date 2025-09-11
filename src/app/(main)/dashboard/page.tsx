"use client";

import { Users, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { Badge } from "@/components/ui/badge";
const DashboardPage = () => {
  const router = useRouter();

  const { stats, loading } = useDashboard();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const statsData = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,

      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Orders Today",
      value: stats.ordersToday,

      icon: ShoppingBag,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const quickActions = [
    {
      title: "Add New Customer",
      description: "Quickly add customer details",
      action: "Add Customer",
      path: "/customers",
    },
    {
      title: "Add Product",
      description: "Add new products to inventory",
      action: "Add Product",
      path: "/products",
    },
    {
      title: "View Sales",
      description: "Check sales performance",
      action: "View Sales",
      path: "/sales",
    },
    {
      title: "Generate Messages",
      description: "Create AI messages",
      action: "Create Message",
      path: "/templates",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className=" text-2xl md:text-3xl font-bold ">Welcome back! </h1>
        <p className="mt-1">
          Here&apos;s what&apos; happening in your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))
          : statsData.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {item.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {item.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${item.bgColor}`}>
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>
              Your most recent customer interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : stats.recentCustomers.length > 0 ? (
                stats.recentCustomers.map((customer) => (
                  <>
                    <div
                      key={customer.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {customer.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {customer.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-4 cursor-pointer"
                      onClick={() => router.push("/customers")}
                    >
                      View All Customers
                    </Button>
                  </>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">No customers yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to keep your business moving
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    {action.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Business Snapshot</CardTitle>
          <CardDescription>
            Key metrics for{" "}
            {new Date().toLocaleDateString("en-NG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600">
                {loading ? "..." : formatCurrency(stats.salesThisWeek)}
              </h3>
              <p className="text-sm text-gray-600">Sales This Week</p>
              <Badge variant="secondary" className="mt-2">
                Live data
              </Badge>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600">
                {loading ? "..." : stats.totalCustomers}
              </h3>
              <p className="text-sm text-gray-600">Total Customers</p>
              <Badge variant="secondary" className="mt-2">
                All time
              </Badge>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-600">
                {loading ? "..." : stats.recentOrders.length}
              </h3>
              <p className="text-sm text-gray-600">Recent Orders</p>
              <Badge variant="secondary" className="mt-2">
                Last 5 orders
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
