import { supabase } from "@/utils/supabase/client";
import { DashboardStats } from "./interface";
import { useStore } from "@/store/useAuthstore";
import { useQuery } from "@tanstack/react-query";

// This function fetches all your dashboard stats from Supabase in parallel.
const fetchDashboardStats = async (userId: string): Promise<DashboardStats> => {
  const today = new Date().toISOString().split("T")[0]; // Get today’s date (YYYY-MM-DD)

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  // Fetch everything at once using Promise.all for better performance
  const [
    { count: totalCustomers },
    { data: recentCustomers },
    { data: salesData },
    { data: weekSales },
    { count: ordersToday },
    { count: pendingOrders },
    { data: recentOrders },
  ] = await Promise.all([
    // fetcch customers count
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),

    // recent customers
    supabase
      .from("customers")
      .select("id, name, phone, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),

    // total revenue from sales
    supabase.from("sales").select("amount").eq("user_id", userId),

    // Fetch this week's sales
    supabase
      .from("sales")
      .select("amount")
      .eq("user_id", userId)
      .gte("created_at", weekAgo.toISOString()),

    // toadys order
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lt("created_at", `${today}T23:59:59.999Z`),

    // pending order
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "pending"),

    // recent order
    supabase
      .from("orders")
      .select(
        "id, customer_name, customer_phone, total_amount, created_at, status"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Sum up total revenue from salesData
  const totalRevenue = salesData?.reduce((sum, s) => sum + s.amount, 0) ?? 0;

  // Sum up this week's sales
  const salesThisWeek = weekSales?.reduce((sum, s) => sum + s.amount, 0) ?? 0;

  // Return the dashboard stats object
  return {
    totalCustomers: totalCustomers ?? 0,
    totalRevenue,
    ordersToday: ordersToday ?? 0,
    recentOrders: recentOrders ?? [],
    salesThisWeek,
    pendingOrders: pendingOrders ?? 0,
    recentCustomers: recentCustomers ?? [],
  };
};

export const useDashboard = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<DashboardStats>({
    queryKey: ["dashboard", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error();
      return fetchDashboardStats(user.id);
    },
    enabled: !user?.id,
  });

  // Return the data in the same shape as our original useDashboard
  return {
    stats: query.data ?? {
      totalCustomers: 0,
      totalRevenue: 0,
      ordersToday: 0,
      recentOrders: [],
      salesThisWeek: 0,
      pendingOrders: 0,
      recentCustomers: [],
    },

    loading: query.isLoading,
    refetch: query.refetch,
  };
};
