// src/providers/UserProvider.tsx
"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { onGetAccount } from "@/actions/auth.actions";
import { USER_QUERY_KEY } from "@/hooks/auth";
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
  const { userData, setUserData } = useUserStore();

  // Prefetch user data when session is available
  useEffect(() => {
    const prefetchUserData = async () => {
      if (session?.user?.email && session?.accessToken && !userData) {
        try {
          // Prefetch and cache the user data
          await queryClient.prefetchQuery({
            queryKey: [USER_QUERY_KEY],
            queryFn: async () => {
              const { success, data } = await onGetAccount({
                payload: {
                  email: session.user.email,
                  regMode: "classic",
                  accessToken: session.accessToken!,
                },
              });

              if (success && data) {
                setUserData(data);
                return data;
              }
              return null;
            },
          });
        } catch (error) {
          console.error("Failed to prefetch user data:", error);
        }
      }
    };

    if (status === "authenticated") {
      prefetchUserData();
    }
  }, [session, status, userData, setUserData, queryClient]);

  return <>{children}</>;
}
