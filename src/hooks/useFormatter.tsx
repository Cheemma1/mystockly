import { useCallback } from "react";

const useFormatDate = () => {
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  return formatDate;
};

export default useFormatDate;
