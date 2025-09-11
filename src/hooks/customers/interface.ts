/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/store/useAuthstore";
import { Customer } from "./useCustomers";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

const fetchCustomers = async (userId: string): Promise<Customer[]> => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    toast.error(error.message || "Error fetching customers");
    throw error; // let react-query handle error state
  }
};

export const useGetCustomersQuery = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<Customer[]>({
    queryKey: ["customers", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchCustomers(user.id);
    },
    enabled: !!user?.id,
  });

  return {
    customers: query.data ?? [],
    loading: query.isLoading,
    refetch: query.refetch,
    error: query.error,
  };
};
