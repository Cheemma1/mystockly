import { IUserSignUp } from "@/interface";
import { getQueryClient } from "@/lib/reactQueryClient";
import { useStore } from "@/store/useAuthstore";
import { supabase } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  const setUser = useStore((s) => s.setUser);
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async ({ email, password, businessName }: IUserSignUp) => {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,

          data: {
            display_name: businessName,
          },
        },
      });
      if (error) throw new Error(error?.message);
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user ?? null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

// login
export function useLoginMutation() {
  const setUser = useStore((s) => s.setUser);
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user ?? null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// forgotpassword
export function useForgotPaswordMutation() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw new Error(error.message);
    },
  });
}

// updatepassword
export function useUpdatePaswordMutation() {
  const setUser = useStore((s) => s.setUser);
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) throw new Error(error.message);
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user ?? null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
