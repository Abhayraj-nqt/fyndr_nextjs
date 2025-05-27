import {
  onGetBusinessTypes,
  onGetFindUsOptions,
} from "@/actions/others.action";
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

export const useBusinessTypes = () => {
  const QUERY_KEY = ["businessTypes"];

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: onGetBusinessTypes,
  });

  return {
    businessTypes: data?.data || [],
    isLoading,
    error,
  };
};
