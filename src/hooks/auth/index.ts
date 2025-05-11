// src/hooks/useUser.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { getAccountAPI } from "@/actions/auth.actions";
import { useUserStore } from "@/zustand/stores/user.store";

export const USER_QUERY_KEY = "userData";

export function useUser() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const {
    userData,
    setUserData,
    isLoading: storeLoading,
    setLoading,
  } = useUserStore();

  const {
    data: fetchedUserData,
    isLoading: queryLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: async () => {
      if (!session?.user?.email || !session?.accessToken) {
        return null;
      }

      const { success, data } = await getAccountAPI({
        email: session.user.email,
        regMode: "classic",
        accessToken: session.accessToken,
      });

      if (!success || !data) {
        throw new Error("Failed to fetch user data");
      }

      return data;
    },
    enabled: !!session?.user?.email && !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (fetchedUserData && !storeLoading) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData, setUserData, storeLoading]);

  // Update loading state
  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  // Invalidate user data when session changes
  useEffect(() => {
    if (!session) {
      useUserStore.getState().clearUserData();
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    }
  }, [session, queryClient]);

  return {
    user: userData || fetchedUserData,
    isLoading: queryLoading || storeLoading,
    error,
    refetch,
  };
}
