export interface RecentOrder {
  id: string;
  customer_name: string;
  customer_phone?: string;
  total_amount: number;
  created_at: string;
  status: string;
}

export interface RecentCustomers {
  id: string;
  name: string;
  phone?: string;
  created_at: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalRevenue: number;
  ordersToday: number;
  recentOrders: RecentOrder[];
  salesThisWeek: number;
  pendingOrders: number;
  recentCustomers: RecentCustomers[];
}
