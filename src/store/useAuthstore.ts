// global user state
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/utils/supabase/client";

interface AuthUser {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useStore = create<AuthUser>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
