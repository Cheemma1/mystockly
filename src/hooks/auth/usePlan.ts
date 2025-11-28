import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { useStore } from "@/store/useAuthstore";

export interface PlanLimits {
  maxCustomers: number | null; // null means unlimited
  maxOrders: number | null; // null means unlimited
  maxAIMessages: number | null; // null means unlimited
  maxOrderForms: number;
  hasAdvancedAnalytics: boolean;
  hasOrderStatusTracking: boolean;
  //   hasMultiUserManagement: boolean;
  //   hasCustomOrderFields: boolean;
  hasPrioritySupport: boolean;
  //   hasAutomatedNotifications: boolean;
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    maxCustomers: 50,
    maxOrders: 20,
    maxAIMessages: 5,
    maxOrderForms: 1,
    hasAdvancedAnalytics: false,
    hasOrderStatusTracking: false,
    // hasMultiUserManagement: false,
    // hasCustomOrderFields: false,
    hasPrioritySupport: false,
  },
  pro: {
    maxCustomers: 300,
    maxOrders: null, // unlimited
    maxAIMessages: null, // unlimited
    maxOrderForms: 5,
    hasAdvancedAnalytics: true,
    hasOrderStatusTracking: true,
    // hasMultiUserManagement: false,
    // hasCustomOrderFields: false,
    hasPrioritySupport: false,
  },
  enterprise: {
    maxCustomers: null,
    maxOrders: null, // unlimited
    maxAIMessages: null, // unlimited
    maxOrderForms: 999, // unlimited (using high number)
    hasAdvancedAnalytics: true,
    hasOrderStatusTracking: true,
    // hasMultiUserManagement: true,
    // hasCustomOrderFields: true,
    hasPrioritySupport: true,
    // hasAutomatedNotifications: true,
  },
};

export const usePlan = () => {
  const user = useStore((s) => s.user);
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [loading, setLoading] = useState(true);
  const [orderCount, setOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [aiMessageCount, setAIMessageCount] = useState(0);
  const [orderFormCount, setOrderFormCount] = useState(0);

  const fetchUserPlan = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch user profile to get plan
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("plan")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setCurrentPlan(profile?.plan || "free");

      // Fetch order count
      const { count: ordersCount, error: ordersError } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (ordersError) throw ordersError;
      setOrderCount(ordersCount || 0);

      // Fetch customer count
      const { count: customersCount, error: customersError } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (customersError) throw customersError;
      setCustomerCount(customersCount || 0);

      // Fetch AI message count (this month)
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: aiCount, error: aiError } = await supabase
        .from("ai_messages") // Adjust table name if different
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfMonth.toISOString());

      if (aiError) throw aiError;
      setAIMessageCount(aiCount || 0);

      // Fetch order form count
      const { count: formsCount, error: formsError } = await supabase
        .from("order_forms") // Adjust table name if different
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (formsError) throw formsError;
      setOrderFormCount(formsCount || 0);
    } catch (error) {
      console.error("Error fetching plan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPlan();
  }, [user]);

  const limits = PLAN_LIMITS[currentPlan] || PLAN_LIMITS.free;

  const canCreateOrder = () => {
    if (limits.maxOrders === null) return true; // unlimited
    return orderCount < limits.maxOrders;
  };

  const canAddCustomer = () => {
    if (limits.maxCustomers === null) return true; // unlimited
    return customerCount < limits.maxCustomers;
  };

  const canUseAIMessage = () => {
    if (limits.maxAIMessages === null) return true; // unlimited
    return aiMessageCount < limits.maxAIMessages;
  };

  const canCreateOrderForm = () => {
    return orderFormCount < limits.maxOrderForms;
  };

  const getOrdersRemaining = () => {
    if (limits.maxOrders === null) return null; // unlimited
    return Math.max(0, limits.maxOrders - orderCount);
  };

  const getCustomersRemaining = () => {
    if (limits.maxCustomers === null) return null; // unlimited
    return Math.max(0, limits.maxCustomers - customerCount);
  };

  const getAIMessagesRemaining = () => {
    if (limits.maxAIMessages === null) return null; // unlimited
    return Math.max(0, limits.maxAIMessages - aiMessageCount);
  };

  const getOrderFormsRemaining = () => {
    return Math.max(0, limits.maxOrderForms - orderFormCount);
  };

  return {
    currentPlan,
    loading,
    limits,
    orderCount,
    customerCount,
    aiMessageCount,
    orderFormCount,
    canCreateOrder: canCreateOrder(),
    canAddCustomer: canAddCustomer(),
    canUseAIMessage: canUseAIMessage(),
    canCreateOrderForm: canCreateOrderForm(),
    ordersRemaining: getOrdersRemaining(),
    customersRemaining: getCustomersRemaining(),
    aiMessagesRemaining: getAIMessagesRemaining(),
    orderFormsRemaining: getOrderFormsRemaining(),
    refetch: fetchUserPlan,
  };
};
