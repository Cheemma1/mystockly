import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { useStore } from "@/store/useAuthstore";
import { IProfile } from "./interface";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/reactQueryClient";

const fetchProfile = async (userId: string): Promise<IProfile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const useGetProfileQuery = () => {
  const user = useStore((s) => s.user);

  const query = useQuery<IProfile>({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return fetchProfile(user.id);
    },
    enabled: !!user?.id,
  });

  return {
    profile: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useUpdateProfileMutation = () => {
  const user = useStore((s) => s.user);
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (profileData: Partial<IProfile>) => {
      if (!user?.id) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          ...profileData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Error updating profile");
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
