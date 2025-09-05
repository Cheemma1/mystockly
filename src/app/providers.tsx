"use client";
import { getQueryClient } from "@/lib/reactQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import type * as React from "react";
import { AuthInitializer } from "./AuthInitializer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
    </QueryClientProvider>
  );
}
