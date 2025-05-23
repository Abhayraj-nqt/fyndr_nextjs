import { onGetFindUsOptions } from "@/actions/others.action";
import { useQuery } from "@tanstack/react-query";

export const useFindUsOptions = () => {
  const QUERY_KEY = ["findUsOptions"];

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: onGetFindUsOptions,
  });

  return {
    findUsOptions: data?.data || [],
    isLoading,
    error,
  };
};
