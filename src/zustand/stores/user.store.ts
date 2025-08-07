import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import { GetAccountResponse } from "@/types/auth/auth.response";

interface UserState {
  userData: GetAccountResponse | null;
  isLoading: boolean;
  error: Error | null;
  setUserData: (data: GetAccountResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        isLoading: false,
        error: null,
        setUserData: (data) => set({ userData: data }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        clearUserData: () => set({ userData: null, error: null }),
      }),
      {
        name: "user-storage",
        // Only store the userData in localStorage, not the loading or error states
        partialize: (state) => ({ userData: state.userData }),
      }
    ),
    {
      name: "user-storage",
    }
  )
);
