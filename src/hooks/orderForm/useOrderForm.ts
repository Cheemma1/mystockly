import { useStore } from "@/store/useAuthstore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { OrderForm } from "./interface";
import { getQueryClient } from "@/lib/reactQueryClient";

// Fetch order form by user ID
const fetchOrderForm = async (userId: string): Promise<OrderForm | null> => {
  try {
    const { data, error } = await supabase
      .from("order_forms")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching order form:", error);
    toast.error(error.message || "Error fetching order form");
    throw error;
  }
};

// Fetch order form by slug (for public page)
const fetchOrderFormBySlug = async (
  slug: string
): Promise<OrderForm | null> => {
  try {
    const { data, error } = await supabase
      .from("order_forms")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching order form by slug:", error);
    throw error;
  }
};

// Hook to get user's order form
export const useGetOrderFormQuery = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<OrderForm | null>({
    queryKey: ["orderForm", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchOrderForm(user.id);
    },
    enabled: !!user?.id,
  });

  return {
    orderForm: query.data,
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
};

// Hook to get order form by slug (for public page)
export const useGetOrderFormBySlugQuery = (slug: string) => {
  const query = useQuery<OrderForm | null>({
    queryKey: ["orderForm", "slug", slug],
    queryFn: async () => {
      if (!slug) return null;
      return fetchOrderFormBySlug(slug);
    },
    enabled: !!slug,
  });

  return {
    orderForm: query.data,
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
};

// Create order form
export const useCreateOrderFormMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      orderFormData: Omit<
        OrderForm,
        "id" | "created_at" | "updated_at" | "user_id"
      >
    ) => {
      if (!user?.id) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("order_forms")
        .insert([{ ...orderFormData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Order form created successfully!");
      queryClient.invalidateQueries({ queryKey: ["orderForm", user?.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error creating order form");
    },
  });

  return {
    createOrderForm: mutation.mutate,
    createOrderFormAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};

// Update order form
export const useUpdateOrderFormMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: {
      id: string;
      data: Partial<
        Omit<OrderForm, "id" | "user_id" | "created_at" | "updated_at">
      >;
    }) => {
      const { id, data } = params;

      const { data: updated, error } = await supabase
        .from("order_forms")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      toast.success("Order form updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["orderForm", user?.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error updating order form");
    },
  });

  return {
    updateOrderForm: mutation.mutate,
    updateOrderFormAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
