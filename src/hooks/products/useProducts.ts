import { useStore } from "@/store/useAuthstore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Product } from "./interface";
import { getQueryClient } from "@/lib/reactQueryClient";

// Fetch products
const fetchProducts = async (userId: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    toast.error(error.message || "Error fetching products");
    throw error;
  }
};

export const useGetProductsQuery = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<Product[]>({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchProducts(user.id);
    },
    enabled: !!user?.id,
  });

  return {
    products: query.data ?? [],
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
};

/* Add product */
export const useAddProductMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      productData: Omit<Product, "id" | "created_at" | "updated_at" | "user_id">
    ) => {
      if (!user?.id) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("product")
        .insert([{ ...productData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`${data.name} added successfully`);
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error adding product");
    },
  });

  return {
    addProduct: mutation.mutate,
    isAdding: mutation.isPending,
    error: mutation.error,
  };
};

/*  Update product  */
export const useUpdateProductMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: { id: string; data: Partial<Product> }) => {
      const { id, data } = params;

      const { data: updated, error } = await supabase
        .from("product")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: (data) => {
      toast.success(`${data.name} updated successfully`);
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error updating product");
    },
  });

  return {
    updateProduct: mutation.mutate,
    updateProductAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};

/* Delete product */
export const useDeleteProductMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error("User not logged in");

      const { error } = await supabase
        .from("product")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error deleting product");
    },
  });

  return {
    deleteProduct: mutation.mutate,
    isDeleting: mutation.isPending,
  };
};
