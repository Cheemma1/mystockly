import { useQuery } from "@tanstack/react-query";
import { AIInsightsResponse, BusinessData } from "./interface";

// Fetch AI insights from API
const fetchAIInsights = async (
  businessData: BusinessData
): Promise<AIInsightsResponse> => {
  const response = await fetch("/api/generate-insights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ businessData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || "Failed to generate insights");
  }

  return response.json();
};

export const useGetAIInsights = (businessData: BusinessData | null) => {
  const query = useQuery<AIInsightsResponse>({
    queryKey: ["ai-insights", businessData],
    queryFn: async () => {
      if (!businessData) throw new Error("Business data is required");
      return fetchAIInsights(businessData);
    },
    enabled: !!businessData,
    staleTime: 24 * 60 * 60 * 1000, // Consider data fresh for 1 day (24 hours)
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 1 day
    retry: 1, // Only retry once on failure
  });

  return {
    insights: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
