/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/store/useAuthstore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/reactQueryClient";
import { Order, OrderItem } from "./interface";

/* Fetch Orders */
const fetchOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        product_name,
        quantity,
        unit_price,
        total_price
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const useGetOrdersQuery = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<Order[]>({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchOrders(user.id);
    },
    enabled: !!user?.id, // only fetch when logged in
  });

  return {
    orders: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

/*Create Order*/
export const useCreateOrderMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderData: {
      customer_name: string;
      customer_email?: string;
      customer_phone?: string;
      customer_id?: string;
      items: Omit<OrderItem, "id">[];
      //   payment_ref?: string;
    }) => {
      if (!user?.id) throw new Error("User not logged in");

      const totalAmount = orderData.items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );

      // Create main order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: orderData.customer_name,
            customer_email: orderData.customer_email,
            customer_phone: orderData.customer_phone,
            customer_id: orderData.customer_id,
            total_amount: totalAmount,
            // payment_ref: orderData.payment_ref,
            status: "pending",
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map((item) => ({
        ...item,
        order_id: order.id,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: (order, variables) => {
      toast.success(
        `Order for ${variables.customer_name} created successfully.`
      );
      queryClient.invalidateQueries({ queryKey: ["orders", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error creating order");
    },
  });

  return {
    createOrder: mutation.mutate,

    isCreating: mutation.isPending,
    error: mutation.error,
  };
};

/* Update Order Status */
export const useUpdateOrderStatusMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: { orderId: string; status: string }) => {
      const { orderId, status } = params;
      if (!user?.id) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Order status updated to ${data.status}`);
      queryClient.invalidateQueries({ queryKey: ["orders", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error updating order status");
    },
  });

  return {
    updateOrderStatus: mutation.mutate,
    updateOrderStatusAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
