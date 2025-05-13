import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AccountResponse } from "@/types/api-response/auth.response";

interface UserState {
  userData: AccountResponse | null;
  isLoading: boolean;
  error: Error | null;
  setUserData: (data: AccountResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
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
  )
);
