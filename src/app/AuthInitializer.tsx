"use client";
import { getQueryClient } from "@/lib/reactQueryClient";
import { useStore } from "@/store/useAuthstore";
import { supabase } from "@/utils/supabase/client";

import { useEffect } from "react";

export function AuthInitializer() {
  // This will run once in your app (placed in Providers/Layout) to sync auth state.

  const setUser = useStore((state) => state.setUser);
  // Extracts the `setUser` method from Zustand.
  //  this gets update global user state whenever Supabase session changes.

  useEffect(() => {
    const queryClient = getQueryClient();

    // Runs after component mounts.
    // Perfect for initializing auth state and setting up listeners.

    const init = async () => {
      // Helper function to fetch the current user on app load.
      const { data } = await supabase.auth.getUser();
      // Calls Supabase to get the current session user (if logged in).
      setUser(data?.user ?? null);
      //  Updates Zustand store with the user object, or null if no user.
    };

    init();
    //  Executes the initialization immediately when the component mounts.

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        //  Subscribes to Supabase auth state changes (sign in/out/refresh events).
        setUser(session?.user ?? null);
        //  Updates Zustand store with the new user (or null if signed out).
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        //  Invalidates React Query's "currentUser" cache so any user-dependent queries refetch.
      }
    );

    return () => {
      listener.subscription.unsubscribe();
      //  Cleanup: removes the auth listener when the component unmounts
      // to prevent memory leaks or duplicate listeners.
    };
  }, [setUser]);
  //  Effect depends on `setUser` (so it re-runs if the store method changes, though it usually won't).

  return null;
  //  This component doesn't render UI. It only sets up global auth state in the background.
}
