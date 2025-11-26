/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/store/useAuthstore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/reactQueryClient";
import { Sale } from "./interface";

/* Fetch Sales */
const fetchSales = async (userId: string): Promise<Sale[]> => {
  const { data, error } = await supabase
    .from("sales")
    .select(
      `
      *,
      orders (
        customer_name,
        customer_email,
        customer_phone,
        order_items (
          product_name,
          quantity,
          unit_price
        )
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const useGetSalesQuery = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<Sale[]>({
    queryKey: ["sales", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchSales(user.id);
    },
    enabled: !!user?.id,
  });

  return {
    sales: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

/* Record Sale */
export const useRecordSaleMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (saleData: { order_id: string; amount: number }) => {
      if (!user?.id) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("sales")
        .insert([
          {
            order_id: saleData.order_id,
            amount: saleData.amount,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Sale recorded successfully");
      queryClient.invalidateQueries({ queryKey: ["sales", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error recording sale");
    },
  });

  return {
    recordSale: mutation.mutate,
    recordSaleAsync: mutation.mutateAsync,
    isRecording: mutation.isPending,
    error: mutation.error,
  };
};
