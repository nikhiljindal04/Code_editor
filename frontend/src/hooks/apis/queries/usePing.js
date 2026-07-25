import { pingApi } from "../../../apis/ping.js";
import { useQuery } from "@tanstack/react-query";

export const usePing = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: "ping",
    queryFn: pingApi,
    staleTime: 10000,
  });
  return { isLoading, isError, data, error };
};
