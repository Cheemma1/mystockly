/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/store/useAuthstore";

import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Customer } from "./interface";
import { getQueryClient } from "@/lib/reactQueryClient";

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
    throw error;
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

//  ADD customer
export const useAddCustomerMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      customerData: Omit<Customer, "id" | "created_at" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("customers")
        .insert([{ ...customerData, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`${data.name} added`);
      queryClient.invalidateQueries({ queryKey: ["customers", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error adding customer");
    },
  });

  return {
    addCustomer: mutation.mutate,
    isAdding: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

//  Update customer
export const useUpdateCustomerMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: {
      id: string;
      data: Partial<
        Omit<Customer, "id" | "user_id" | "created_at" | "updated_at">
      >;
    }) => {
      const { id, data } = params;
      const { data: updated, error } = await supabase
        .from("customers")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      toast.success("Successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["customers", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err.message || "failed to update customer");
    },
  });

  return {
    updateCustomer: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// delete customer
export const useDeleteCustomerMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (error) throw error;
      return id;
    },

    onSuccess: () => {
      toast.success("Successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["customers", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err.message || "failed to delete customer");
    },
  });

  return {
    deleteCustomer: mutation.mutate,
    isDeleting: mutation.isPending,
  };
};
