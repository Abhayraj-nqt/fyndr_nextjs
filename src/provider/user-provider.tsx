// src/providers/UserProvider.tsx
"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import { onGetAccount } from "@/actions/auth.actions";
import { USER_QUERY_KEY } from "@/hooks/auth";
import { GetAccountResponse } from "@/types/auth/auth.response";
import { useUserStore } from "@/zustand/stores/user.store";

interface UserProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that pre-fetches and initializes user data
 * This allows server components to trigger loading of user data
 * when the app first loads
 */
export default function UserProvider({ children }: UserProviderProps) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { userData, setUserData, setLoading, clearUserData } = useUserStore();
  const hasInitialized = useRef(false);

  // Prefetch user data when session is available
  useEffect(() => {
    const prefetchUserData = async () => {
      if (
        session?.user?.email &&
        session?.accessToken &&
        !userData &&
        !hasInitialized.current
      ) {
        hasInitialized.current = true;
        setLoading(true);

        try {
          // Check if data is already cached
          const cachedData: GetAccountResponse | undefined =
            queryClient.getQueryData([USER_QUERY_KEY]);

          if (cachedData) {
            setUserData(cachedData);
            setLoading(false);
            return;
          }

          // Prefetch and cache the user data
          const result = await queryClient.fetchQuery({
            queryKey: [USER_QUERY_KEY],
            queryFn: async () => {
              const { success, data, error } = await onGetAccount({
                payload: {
                  email: session.user.email!,
                  regMode: "classic",
                  accessToken: session.accessToken!,
                },
              });

              if (!success || !data) {
                throw new Error(
                  error?.details?.message || "Failed to fetch user data"
                );
              }

              return data;
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
          });

          if (result) {
            setUserData(result);
          }
        } catch (error) {
          console.error("Failed to prefetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      prefetchUserData();
    } else if (status === "unauthenticated") {
      clearUserData();
      queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] });
      hasInitialized.current = false;
    }
  }, [
    session,
    status,
    userData,
    setUserData,
    setLoading,
    clearUserData,
    queryClient,
  ]);

  return <>{children}</>;
}
